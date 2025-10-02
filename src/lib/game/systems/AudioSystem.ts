import * as THREE from 'three';

/**
 * Calmer, more balanced audio system using WebAudio:
 * - Engine synth: triangle wave + subtle sub, low-pass shaped
 * - Subtle wind/road noise tied to speed
 * - Gentle collision thump via band-passed noise
 * - Mix bus with master compressor to avoid harsh peaks
 */
export default class AudioSystem {
  private listener: THREE.AudioListener;
  private ctx: AudioContext;

  // Buses
  private engineBus: GainNode;
  private effectsBus: GainNode;
  private musicBus: GainNode;
  private mixBus: GainNode;
  private masterComp: DynamicsCompressorNode;

  // Engine synth
  private engineOsc?: OscillatorNode; // main (triangle)
  private engineFilter?: BiquadFilterNode;
  private engineAmp?: GainNode;
  private subOsc?: OscillatorNode; // low rumble
  private subAmp?: GainNode;
  private engineStarted = false;

  // Ambience (wind/road)
  private windSource?: AudioBufferSourceNode;
  private windGain?: GainNode;
  private windFilter?: BiquadFilterNode;
  private ambienceStarted = false;

  // Cached buffer(s)
  private noiseBuffer?: AudioBuffer;
  
  // Horror mode ambient
  private horrorAmbient?: OscillatorNode;
  private horrorFilter?: BiquadFilterNode;
  private horrorGain?: GainNode;
  private horrorDrone?: OscillatorNode;
  private horrorDroneGain?: GainNode;
  private horrorActive = false;

  constructor(private camera: THREE.Camera) {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ctx = (this.listener as any).context as AudioContext;

    // Create buses
    this.engineBus = this.ctx.createGain();
    this.engineBus.gain.value = 0.45; // calm default; scaled by settings

    this.effectsBus = this.ctx.createGain();
    this.effectsBus.gain.value = 0.5;

    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.value = 0.35;

    this.mixBus = this.ctx.createGain();
    this.mixBus.gain.value = 1.0;

    this.masterComp = this.ctx.createDynamicsCompressor();
    // Gentle mastering-like compression
    this.masterComp.threshold.value = -24; // dB
    this.masterComp.knee.value = 30;
    this.masterComp.ratio.value = 6;
    this.masterComp.attack.value = 0.003;
    this.masterComp.release.value = 0.25;

    // Wire graph: channels -> mix -> compressor -> listener
    this.engineBus.connect(this.mixBus);
    this.effectsBus.connect(this.mixBus);
    this.musicBus.connect(this.mixBus);
    this.mixBus.connect(this.masterComp).connect(this.listener.gain);
  }

  /** Ensure AudioContext is running (must be called from a user gesture). */
  public async resume() {
    if (this.ctx.state !== 'running') {
      try {
        await this.ctx.resume();
      } catch {
        // ignore
      }
    }
    // kick off ambience once the context is running
    this.startAmbienceIfNeeded();
  }

  /** Update volumes from settings (0..1). Master is set on listener gain. */
  public updateFromSettings(s: { audio: { master: number; engine: number; effects: number; music?: number } }) {
    // listener.gain is a THREE wrapper GainNode
    this.listener.gain.gain.value = THREE.MathUtils.clamp(s.audio.master, 0, 1);
    // Apply a mild internal trim so even 1.0 stays calm
    this.engineBus.gain.value = THREE.MathUtils.clamp(s.audio.engine * 0.85, 0, 1);
    this.effectsBus.gain.value = THREE.MathUtils.clamp(s.audio.effects * 0.85, 0, 1);
    const music = s.audio.music ?? 0.5;
    this.musicBus.gain.value = THREE.MathUtils.clamp(music * 0.8, 0, 1);
  }

  /**
   * Drive the engine and ambience.
   * throttle: 0..1, speed: m/s, maxSpeed: m/s
   */
  public setEngine(throttle: number, speed: number, maxSpeed: number) {
    if (!this.engineStarted) this.startEngineIfNeeded();
    if (!this.engineOsc || !this.engineFilter || !this.engineAmp || !this.subOsc || !this.subAmp) return;

    const speedRatio = Math.max(0, Math.min(1, maxSpeed > 0 ? speed / maxSpeed : 0));
    const t = this.ctx.currentTime;

    // Smooth, lower register engine tone
    const base = 60; // idle
    const hi = 420; // top
    const freq = base + hi * (0.55 * speedRatio + 0.45 * throttle); // ~60..480Hz
    this.engineOsc.frequency.setTargetAtTime(freq, t, 0.03);

    // Sub rumble (very subtle)
    const subFreq = Math.max(35, Math.min(95, freq * 0.5));
    this.subOsc.frequency.setTargetAtTime(subFreq, t, 0.05);

    // Filter opens gently with speed
    const cutoff = 700 + 1400 * speedRatio; // 700..2100 Hz
    this.engineFilter.frequency.setTargetAtTime(cutoff, t, 0.06);

    // Amplitude stays controlled and calm
    const body = 0.05 + 0.28 * (0.6 * throttle + 0.4 * speedRatio);
    this.engineAmp.gain.setTargetAtTime(body, t, 0.05);
    const sub = 0.01 + 0.06 * (0.5 * throttle + 0.5 * speedRatio);
    this.subAmp.gain.setTargetAtTime(sub, t, 0.08);

    // Wind/road ambience
    if (this.windGain && this.windFilter) {
      const wind = 0.0 + 0.18 * speedRatio; // subtle ceiling
      this.windGain.gain.setTargetAtTime(wind, t, 0.2);
      // Slightly raise color with speed
      const windCut = 400 + 800 * speedRatio;
      this.windFilter.frequency.setTargetAtTime(windCut, t, 0.2);
    }
  }

  /** One-shot, soft collision noise; strength 0..1 rough scale. */
  public playCollision(strength = 0.5) {
    if (!this.noiseBuffer) this.noiseBuffer = this.createNoiseBuffer(1.0);
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const band = this.ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 900;
    band.Q.value = 0.8;
    const g = this.ctx.createGain();
    const t = this.ctx.currentTime;
    const vol = Math.max(0.05, Math.min(1, strength));
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.5 * vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    src.connect(band).connect(g).connect(this.effectsBus);
    src.start();
    src.stop(t + 0.3);
  }

  private startEngineIfNeeded() {
    if (this.engineStarted) return;
    this.engineStarted = true;

    // Main engine
    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'triangle'; // softer than saw
    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 1200;
    this.engineFilter.Q.value = 0.6;
    this.engineAmp = this.ctx.createGain();
    this.engineAmp.gain.value = 0.001; // fade-in via setEngine

    // Subtle sub rumble
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subAmp = this.ctx.createGain();
    this.subAmp.gain.value = 0.0;

    // Wire engine chain
    this.engineOsc.connect(this.engineFilter).connect(this.engineAmp).connect(this.engineBus);
    this.subOsc.connect(this.subAmp).connect(this.engineBus);
    this.engineOsc.start();
    this.subOsc.start();

    // Also ensure ambience is running
    this.startAmbienceIfNeeded();
  }

  private startAmbienceIfNeeded() {
    if (this.ambienceStarted) return;
    if (!this.noiseBuffer) this.noiseBuffer = this.createNoiseBuffer(1.0);

    this.windSource = this.ctx.createBufferSource();
    this.windSource.buffer = this.noiseBuffer;
    this.windSource.loop = true;

    // Color the noise to be smoother (lowpass) and remove rumble (HPF via bandpass-like)
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.value = 600;
    this.windFilter.Q.value = 0.0001;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.0; // will be modulated by speed

    this.windSource.connect(this.windFilter).connect(this.windGain).connect(this.effectsBus);
    try {
      this.windSource.start();
      this.ambienceStarted = true;
    } catch {
      // ignore if already started
    }
  }

  private createNoiseBuffer(lengthSeconds = 1.0) {
    const length = Math.floor(this.ctx.sampleRate * lengthSeconds);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // White noise, later filtered; use slight DC blocking by zero-mean
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Enable horror ambient sounds: deep drones, eerie whispers, unsettling tones
   */
  public enableHorrorAmbient() {
    if (this.horrorActive) return;
    this.horrorActive = true;

    // Deep ominous drone (very low frequency)
    this.horrorDrone = this.ctx.createOscillator();
    this.horrorDrone.type = 'sine';
    this.horrorDrone.frequency.value = 35; // Deep sub-bass
    this.horrorDroneGain = this.ctx.createGain();
    this.horrorDroneGain.gain.value = 0;
    this.horrorDrone.connect(this.horrorDroneGain).connect(this.musicBus);
    this.horrorDrone.start();

    // Fade in drone slowly
    const t = this.ctx.currentTime;
    this.horrorDroneGain.gain.setTargetAtTime(0.12, t, 2.0);

    // Eerie high-pitched ambient (like distant whispers)
    this.horrorAmbient = this.ctx.createOscillator();
    this.horrorAmbient.type = 'triangle';
    this.horrorAmbient.frequency.value = 1800;
    
    this.horrorFilter = this.ctx.createBiquadFilter();
    this.horrorFilter.type = 'bandpass';
    this.horrorFilter.frequency.value = 2200;
    this.horrorFilter.Q.value = 8;
    
    this.horrorGain = this.ctx.createGain();
    this.horrorGain.gain.value = 0;

    this.horrorAmbient.connect(this.horrorFilter).connect(this.horrorGain).connect(this.musicBus);
    this.horrorAmbient.start();

    // Fade in whispers slowly with modulation
    this.horrorGain.gain.setTargetAtTime(0.035, t, 3.0);

    // Modulate the ambient for unsettling feeling
    this.animateHorrorAmbient();
  }

  /**
   * Disable horror ambient sounds
   */
  public disableHorrorAmbient() {
    if (!this.horrorActive) return;
    this.horrorActive = false;

    const t = this.ctx.currentTime;

    // Fade out
    if (this.horrorGain) {
      this.horrorGain.gain.setTargetAtTime(0, t, 1.0);
    }
    if (this.horrorDroneGain) {
      this.horrorDroneGain.gain.setTargetAtTime(0, t, 1.5);
    }

    // Stop after fade
    setTimeout(() => {
      try { this.horrorAmbient?.stop(); } catch {}
      try { this.horrorDrone?.stop(); } catch {}
      this.horrorAmbient?.disconnect();
      this.horrorDrone?.disconnect();
      this.horrorFilter?.disconnect();
      this.horrorGain?.disconnect();
      this.horrorDroneGain?.disconnect();
      this.horrorAmbient = undefined;
      this.horrorDrone = undefined;
      this.horrorFilter = undefined;
      this.horrorGain = undefined;
      this.horrorDroneGain = undefined;
    }, 2000);
  }

  /**
   * Create random eerie sound effects (whispers, creaks, distant screams)
   */
  public playHorrorEffect(type: 'whisper' | 'creak' | 'distant-scream' | 'heartbeat' = 'whisper') {
    const t = this.ctx.currentTime;

    if (type === 'whisper') {
      // Reversed, filtered noise burst (like backwards speech)
      if (!this.noiseBuffer) this.noiseBuffer = this.createNoiseBuffer(0.3);
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      src.playbackRate.value = 0.5; // Slowed down
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1500 + Math.random() * 1000;
      filter.Q.value = 12;
      
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.15, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      
      src.connect(filter).connect(g).connect(this.musicBus);
      src.start(t);
      src.stop(t + 0.6);
    } else if (type === 'creak') {
      // Low frequency sine sweep (door creak)
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.8);
      
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.08, t + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      
      osc.connect(g).connect(this.effectsBus);
      osc.start(t);
      osc.stop(t + 1.0);
    } else if (type === 'distant-scream') {
      // High pitched FM synthesis (distant scream)
      const carrier = this.ctx.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.value = 800;
      
      const mod = this.ctx.createOscillator();
      mod.type = 'sine';
      mod.frequency.value = 12;
      
      const modGain = this.ctx.createGain();
      modGain.gain.value = 200;
      
      mod.connect(modGain).connect(carrier.frequency);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 500;
      
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.05, t + 0.2);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      
      carrier.connect(filter).connect(g).connect(this.musicBus);
      carrier.start(t);
      mod.start(t);
      carrier.stop(t + 1.6);
      mod.stop(t + 1.6);
    } else if (type === 'heartbeat') {
      // Double thump (heartbeat)
      for (let i = 0; i < 2; i++) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 60;
        
        const g = this.ctx.createGain();
        const startTime = t + i * 0.15;
        g.gain.setValueAtTime(0, startTime);
        g.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
        
        osc.connect(g).connect(this.effectsBus);
        osc.start(startTime);
        osc.stop(startTime + 0.12);
      }
    }
  }

  private animateHorrorAmbient() {
    if (!this.horrorActive || !this.horrorAmbient || !this.horrorFilter || !this.horrorGain) return;

    const t = this.ctx.currentTime;
    
    // Slowly modulate frequency for unsettling feeling
    const newFreq = 1600 + Math.sin(t * 0.3) * 400 + Math.random() * 200;
    this.horrorAmbient.frequency.setTargetAtTime(newFreq, t, 2.0);
    
    // Modulate filter
    const filterFreq = 2000 + Math.sin(t * 0.5) * 600;
    this.horrorFilter.frequency.setTargetAtTime(filterFreq, t, 1.5);
    
    // Subtle volume pulse
    const vol = 0.03 + Math.sin(t * 0.2) * 0.01;
    this.horrorGain.gain.setTargetAtTime(vol, t, 1.0);
    
    // Modulate drone
    if (this.horrorDrone) {
      const droneFreq = 33 + Math.sin(t * 0.1) * 5;
      this.horrorDrone.frequency.setTargetAtTime(droneFreq, t, 3.0);
    }

    // Continue animation
    if (this.horrorActive) {
      setTimeout(() => this.animateHorrorAmbient(), 500);
    }
  }

  public destroy() {
    // Stop horror ambient
    this.disableHorrorAmbient();

    // Stop engine
    try { this.engineOsc?.stop(); } catch {}
    try { this.subOsc?.stop(); } catch {}
    this.engineOsc?.disconnect();
    this.subOsc?.disconnect();
    this.engineFilter?.disconnect();
    this.engineAmp?.disconnect();
    this.subAmp?.disconnect();

    // Stop ambience
    try { this.windSource?.stop(); } catch {}
    this.windSource?.disconnect();
    this.windFilter?.disconnect();
    this.windGain?.disconnect();

    // Buses
    this.engineBus.disconnect();
    this.effectsBus.disconnect();
    this.musicBus.disconnect();
    this.mixBus.disconnect();
    this.masterComp.disconnect();

    // Detach listener (do not close context; Three.js shares it)
    this.camera.remove(this.listener);
  }
}

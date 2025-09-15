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

  public destroy() {
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

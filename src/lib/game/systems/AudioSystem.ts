import * as THREE from 'three';

/**
 * Minimal audio system: attaches a THREE.AudioListener to the camera and
 * synthesizes an engine tone (oscillator + filter) plus simple collision noise.
 * Volumes are controlled via per-channel gains and a master gain on the listener.
 */
export default class AudioSystem {
  private listener: THREE.AudioListener;
  private ctx: AudioContext;

  // Gains
  private engineBus: GainNode;
  private effectsBus: GainNode;

  // Engine synth
  private engineOsc?: OscillatorNode;
  private engineFilter?: BiquadFilterNode;
  private engineAmp?: GainNode; // per-frame modulation without touching channel gain
  private engineStarted = false;

  // Cached buffers
  private noiseBuffer?: AudioBuffer;

  constructor(private camera: THREE.Camera) {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    // three.js exposes the WebAudio context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ctx = (this.listener as any).context as AudioContext;

    // Channel buses connect to the listener master gain
    this.engineBus = this.ctx.createGain();
    this.engineBus.gain.value = 0.7; // default; will be overridden by settings
    this.engineBus.connect(this.listener.gain);

    this.effectsBus = this.ctx.createGain();
    this.effectsBus.gain.value = 0.8;
    this.effectsBus.connect(this.listener.gain);
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
  }

  /** Update volumes from settings (0..1). Master is set on listener gain. */
  public updateFromSettings(s: { audio: { master: number; engine: number; effects: number } }) {
    // listener.gain is a THREE wrapper GainNode
    this.listener.gain.gain.value = THREE.MathUtils.clamp(s.audio.master, 0, 1);
    this.engineBus.gain.value = THREE.MathUtils.clamp(s.audio.engine, 0, 1);
    this.effectsBus.gain.value = THREE.MathUtils.clamp(s.audio.effects, 0, 1);
  }

  /**
   * Drive the engine sound.
   * speed: m/s, maxSpeed: m/s, throttle: 0..1
   */
  public setEngine(throttle: number, speed: number, maxSpeed: number) {
    if (!this.engineStarted) this.startEngineIfNeeded();
    if (!this.engineOsc || !this.engineFilter || !this.engineAmp) return;

    const speedRatio = Math.max(0, Math.min(1, maxSpeed > 0 ? speed / maxSpeed : 0));
    // Frequency sweeps from idle to high
    const freq = 70 + speedRatio * 430 + throttle * 220; // ~70..720 Hz
    this.engineOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.03);

    // Filter opens a bit with speed
    const cutoff = 600 + speedRatio * 1800; // 600..2400 Hz
    this.engineFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.05);

    // Amplitude based on mix of throttle and speed
    const amp = 0.08 + 0.55 * (0.6 * throttle + 0.4 * speedRatio);
    this.engineAmp.gain.setTargetAtTime(amp, this.ctx.currentTime, 0.05);
  }

  /** One-shot collision noise; strength 0..1 rough scale. */
  public playCollision(strength = 0.5) {
    if (!this.noiseBuffer) this.noiseBuffer = this.createNoiseBuffer();
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const g = this.ctx.createGain();
    const t = this.ctx.currentTime;
    const vol = Math.max(0.05, Math.min(1, strength));
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.7 * vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    src.connect(g).connect(this.effectsBus);
    src.start();
    src.stop(t + 0.25);
  }

  private startEngineIfNeeded() {
    if (this.engineStarted) return;
    this.engineStarted = true;
    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 1200;
    this.engineAmp = this.ctx.createGain();
    this.engineAmp.gain.value = 0.001;

    this.engineOsc.connect(this.engineFilter).connect(this.engineAmp).connect(this.engineBus);
    this.engineOsc.start();
  }

  private createNoiseBuffer() {
    const length = Math.floor(this.ctx.sampleRate * 0.2);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      // White noise, slightly decaying
      data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    }
    return buffer;
  }

  public destroy() {
    try {
      this.engineOsc?.stop();
    } catch {
      // ignore
    }
    this.engineOsc?.disconnect();
    this.engineFilter?.disconnect();
    this.engineAmp?.disconnect();
    // Detach listener
    this.camera.remove(this.listener);
    // Do not close AudioContext (shared); let browser manage lifecycle
  }
}

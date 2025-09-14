import * as THREE from 'three';

export interface Checkpoint {
  position: THREE.Vector3; // center
  radius: number; // trigger radius
}

export default class LapSystem {
  private checkpoints: Checkpoint[] = [];
  private currentIndex = 0;
  private lapStart = performance.now();
  public currentLapMs = 0;
  public bestLapMs: number | null = null;

  constructor(points: Checkpoint[]) {
    this.checkpoints = points;
  }

  update(nowMs: number, carPos: THREE.Vector3) {
    this.currentLapMs = nowMs - this.lapStart;
    const cp = this.checkpoints[this.currentIndex];
    if (!cp) return;
    if (carPos.distanceTo(cp.position) <= cp.radius) {
      // Advance
      this.currentIndex++;
      if (this.currentIndex >= this.checkpoints.length) {
        // Finish lap
        const lap = this.currentLapMs;
        if (this.bestLapMs === null || lap < this.bestLapMs) this.bestLapMs = lap;
        this.lapStart = nowMs;
        this.currentLapMs = 0;
        this.currentIndex = 0;
      }
    }
  }

  getHudTimes() {
    return { current: this.currentLapMs, best: this.bestLapMs };
  }
}

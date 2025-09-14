import * as THREE from 'three';

export interface ScoreData {
  total: number;
  distance: number;
  combo: number;
  lastScoreTime: number;
}

export default class ScoreSystem {
  private score = 0;
  private distance = 0;
  private combo = 0;
  private lastScoreTime = 0;
  private comboDecayTime = 3000; // 3 seconds without scoring resets combo
  private lastPosition = new THREE.Vector3();
  private startTime = 0;

  constructor() {
    this.startTime = performance.now();
    this.lastScoreTime = this.startTime;
  }

  public update(deltaTime: number, carPosition: THREE.Vector3, carSpeed: number) {
    const currentTime = performance.now();
    
    // Calculate distance traveled
    const distanceDelta = carPosition.distanceTo(this.lastPosition);
    this.distance += distanceDelta;
    this.lastPosition.copy(carPosition);

    // Award points for distance traveled
    if (distanceDelta > 0) {
      const distancePoints = Math.floor(distanceDelta * 10); // 10 points per meter
      this.addScore(distancePoints, 'distance');
    }

    // Award points for maintaining high speed
    if (carSpeed > 20) { // Above 72 km/h
      const speedBonus = Math.floor((carSpeed - 20) * 2); // Bonus points for high speed
      this.addScore(speedBonus, 'speed');
    }

    // Decay combo if no scoring for a while
    if (currentTime - this.lastScoreTime > this.comboDecayTime) {
      this.combo = 0;
    }
  }

  public addScore(points: number, type: string = 'general') {
    const currentTime = performance.now();
    
    // Increase combo if scoring frequently
    if (currentTime - this.lastScoreTime < 1000) { // Within 1 second
      this.combo = Math.min(this.combo + 1, 10); // Max combo of 10
    } else {
      this.combo = Math.max(1, this.combo);
    }

    // Apply combo multiplier
    const multipliedPoints = points * this.combo;
    this.score += multipliedPoints;
    this.lastScoreTime = currentTime;

    return multipliedPoints;
  }

  public addObstacleAvoidanceBonus() {
    // Bonus for successfully avoiding obstacles
    const bonus = this.addScore(50, 'avoidance');
    return bonus;
  }

  public addNearMissBonus() {
    // Bonus for close calls with obstacles
    const bonus = this.addScore(25, 'nearmiss');
    return bonus;
  }

  public subtractCollisionPenalty() {
    // Penalty for collisions
    this.score = Math.max(0, this.score - 100);
    this.combo = 0; // Reset combo on collision
  }

  public getScoreData(): ScoreData {
    return {
      total: this.score,
      distance: this.distance,
      combo: this.combo,
      lastScoreTime: this.lastScoreTime
    };
  }

  public reset() {
    this.score = 0;
    this.distance = 0;
    this.combo = 0;
    this.lastScoreTime = performance.now();
    this.lastPosition.set(0, 0, 0);
  }
}
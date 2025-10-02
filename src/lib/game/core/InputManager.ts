export default class InputManager {
  private keys = new Set<string>();
  private keydown = (e: KeyboardEvent) => this.keys.add(e.code);
  private keyup = (e: KeyboardEvent) => this.keys.delete(e.code);
  
  // Mobile/touch input state
  private mobileThrottle = 0; // 0..1
  private mobileBrake = 0; // 0..1
  private mobileSteer = 0; // -1..1
  private mobileHandbrake = false;
  private mobileBoost = false;

  constructor(private el: HTMLElement | Window) {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }

  isDown(code: string) {
    // Check keyboard first
    if (this.keys.has(code)) return true;
    
    // Check mobile inputs and map to keyboard codes
    if (code === 'ArrowUp' || code === 'KeyW') {
      return this.mobileThrottle > 0;
    }
    if (code === 'ArrowDown' || code === 'KeyS') {
      return this.mobileBrake > 0;
    }
    if (code === 'Space') {
      return this.mobileHandbrake;
    }
    if (code === 'ShiftLeft' || code === 'ShiftRight') {
      return this.mobileBoost;
    }
    
    return false;
  }
  
  // Get steering value (supports both keyboard and mobile)
  getSteerValue(): number {
    // Mobile steering has priority
    if (Math.abs(this.mobileSteer) > 0.01) {
      return this.mobileSteer;
    }
    
    // Keyboard steering (binary: -1, 0, or 1)
    // Left = POSITIVE (counter-clockwise in Three.js), Right = NEGATIVE (clockwise)
    const left = this.keys.has('ArrowLeft') || this.keys.has('KeyA');
    const right = this.keys.has('ArrowRight') || this.keys.has('KeyD');
    if (left && !right) return 1;  // Left arrow = turn left = positive
    if (right && !left) return -1; // Right arrow = turn right = negative
    return 0;
  }
  
  // Mobile input setters (called from MobileControls component)
  setMobileThrottle(value: number) {
    this.mobileThrottle = Math.max(0, Math.min(1, value));
  }
  
  setMobileBrake(value: number) {
    this.mobileBrake = Math.max(0, Math.min(1, value));
  }
  
  setMobileSteer(value: number) {
    this.mobileSteer = Math.max(-1, Math.min(1, value));
  }
  
  setMobileHandbrake(pressed: boolean) {
    this.mobileHandbrake = pressed;
  }
  
  setMobileBoost(pressed: boolean) {
    this.mobileBoost = pressed;
  }

  destroy() {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }
}

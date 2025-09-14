export default class InputManager {
  private keys = new Set<string>();
  private keydown = (e: KeyboardEvent) => this.keys.add(e.code);
  private keyup = (e: KeyboardEvent) => this.keys.delete(e.code);

  constructor(private el: HTMLElement | Window) {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }

  isDown(code: string) {
    return this.keys.has(code);
  }

  destroy() {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }
}

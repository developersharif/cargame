import GameMode from './GameMode';

export default class CloudyMode extends GameMode {
  setupEnvironment(): void {
    // TODO: overcast lighting, fog
  }
  updateEnvironment(time: number): void {
    void time;
  }
}

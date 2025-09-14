export default abstract class GameMode {
  abstract setupEnvironment(): void;
  abstract updateEnvironment(time: number): void;
}

export type GameState = { t: number; players: Record<string, { x: number; y: number; z: number }> };

export default class StateSync {
  private localState: GameState = { t: 0, players: {} };
  private remoteStates = new Map<string, GameState[]>(); // buffer per player

  syncLocalState(state: GameState) { this.localState = state; }

  pushRemoteState(playerId: string, state: GameState) {
    const buf = this.remoteStates.get(playerId) ?? [];
    buf.push(state);
    if (buf.length > 10) buf.shift();
    this.remoteStates.set(playerId, buf);
  }

  getInterpolatedState(playerId: string, atTime: number): GameState | undefined {
    const buf = this.remoteStates.get(playerId);
    if (!buf || buf.length < 2) return buf?.[0];
    const a = buf[buf.length - 2];
    const b = buf[buf.length - 1];
    const t = (atTime - a.t) / Math.max(1, b.t - a.t);
    const lerp = (v1: number, v2: number) => v1 + (v2 - v1) * Math.min(Math.max(t, 0), 1);
    const pa = a.players[playerId];
    const pb = b.players[playerId];
    if (!pa || !pb) return undefined;
    return {
      t: atTime,
      players: {
        [playerId]: { x: lerp(pa.x, pb.x), y: lerp(pa.y, pb.y), z: lerp(pa.z, pb.z) }
      }
    };
  }
}

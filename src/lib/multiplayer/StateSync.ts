export interface GameState {
  playerId: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  speed: number;
  timestamp: number;
  lapCount: number;
  lastCheckpoint: number;
}

export interface InterpolationBuffer {
  states: Map<string, GameState[]>;
  maxStates: number;
}

export class StateSync {
  private localState: GameState | null = null;
  private remoteStates: Map<string, GameState> = new Map();
  private interpolationBuffer: InterpolationBuffer = {
    states: new Map(),
    maxStates: 10
  };
  private onStateCallback?: (playerId: string, state: GameState) => void;

  constructor() {
    console.log('StateSync initialized');
  }

  setLocalState(state: GameState): void {
    this.localState = state;
  }

  getLocalState(): GameState | null {
    return this.localState;
  }

  updateRemoteState(playerId: string, state: GameState): void {
    this.remoteStates.set(playerId, state);
    
    // Add to interpolation buffer
    if (!this.interpolationBuffer.states.has(playerId)) {
      this.interpolationBuffer.states.set(playerId, []);
    }
    
    const playerStates = this.interpolationBuffer.states.get(playerId)!;
    playerStates.push(state);
    
    // Keep only the most recent states
    if (playerStates.length > this.interpolationBuffer.maxStates) {
      playerStates.shift();
    }

    // Notify callback
    if (this.onStateCallback) {
      this.onStateCallback(playerId, state);
    }
  }

  getInterpolatedState(playerId: string): GameState | null {
    const playerStates = this.interpolationBuffer.states.get(playerId);
    if (!playerStates || playerStates.length === 0) {
      return this.remoteStates.get(playerId) || null;
    }

    // Simple interpolation - just return the latest state for now
    return playerStates[playerStates.length - 1];
  }

  getAllRemoteStates(): Map<string, GameState> {
    return this.remoteStates;
  }

  reconcileStates(): void {
    // Basic reconciliation - remove old states
    const now = Date.now();
    const maxAge = 5000; // 5 seconds

    for (const [playerId, state] of this.remoteStates.entries()) {
      if (now - state.timestamp > maxAge) {
        this.remoteStates.delete(playerId);
        this.interpolationBuffer.states.delete(playerId);
      }
    }
  }

  onStateUpdate(callback: (playerId: string, state: GameState) => void): void {
    this.onStateCallback = callback;
  }

  clearRemoteStates(): void {
    this.remoteStates.clear();
    this.interpolationBuffer.states.clear();
  }

  removePlayer(playerId: string): void {
    this.remoteStates.delete(playerId);
    this.interpolationBuffer.states.delete(playerId);
  }
}

export default StateSync;

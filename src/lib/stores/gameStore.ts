import { writable } from 'svelte/store';

export type GameState = 'menu' | 'loading' | 'playing' | 'paused' | 'finished';

export interface LeaderboardEntry {
  playerId: string;
  time: number;
}

export const gameStore = writable({
  state: 'menu' as GameState,
  leaderboard: [] as LeaderboardEntry[]
});

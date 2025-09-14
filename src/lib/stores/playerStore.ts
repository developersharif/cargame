import { writable } from 'svelte/store';

export interface Player {
  id: string;
  name: string;
  color: string;
}

export const playerStore = writable<Player | null>(null);

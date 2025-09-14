import { writable } from 'svelte/store';

export interface PeerInfo { id: string; nickname?: string }

export const multiplayerStore = writable({
  isHost: false,
  roomId: null as string | null,
  connectedPeers: [] as PeerInfo[],
  latency: new Map<string, number>()
});

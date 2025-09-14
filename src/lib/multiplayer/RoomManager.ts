import { database, isFirebaseAvailable } from '../config/firebase';
import {
  ref,
  push,
  set,
  onValue,
  off,
  remove,
  get,
  update,
  onDisconnect,
  serverTimestamp
} from 'firebase/database';

export interface Player {
  id: string;
  name: string;
  status: 'ready' | 'not-ready' | 'loading' | 'racing' | 'finished';
  isHost: boolean;
  joinedAt: number;
}

export interface Room {
  id: string;
  hostId: string;
  hostName: string;
  hostPeerId?: string;
  players: Record<string, Player>;
  status: 'waiting' | 'starting' | 'racing' | 'finished';
  maxPlayers: number;
  createdAt: number;
  updatedAt: number;
  raceStartAt?: number;
}

export class RoomManager {
  private currentRoom: Room | null = null;
  private playerId: string = '';
  private playerName: string = '';
  private roomUnsubscribe: (() => void) | null = null;
  private onPlayerJoinCallback?: (player: Player) => void;
  private onPlayerLeaveCallback?: (playerId: string) => void;
  private onRoomErrorCallback?: (error: Error) => void;
  private lastPlayerIds: Set<string> = new Set();

  constructor() {
    // Persist a stable playerId across navigations
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('playerId');
      if (saved) {
        this.playerId = saved;
      } else {
        this.playerId = Math.random().toString(36).substring(2, 15);
        try { localStorage.setItem('playerId', this.playerId); } catch {}
      }
    } else {
      this.playerId = Math.random().toString(36).substring(2, 15);
    }
    console.log('RoomManager initialized with player ID:', this.playerId);
  }

  setPlayerName(name: string): void {
    this.playerName = name;
  }

  async createRoom(hostName: string): Promise<string> {
    if (!isFirebaseAvailable() || !database) {
      throw new Error('Firebase is not available');
    }

    try {
      this.playerName = hostName;
      
      const roomData = {
        hostId: this.playerId,
        hostName: hostName,
        players: {
          [this.playerId]: {
            id: this.playerId,
            name: hostName,
            status: 'not-ready' as const,
            isHost: true,
            joinedAt: Date.now()
          }
        },
        status: 'waiting' as const,
        maxPlayers: 4,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const roomsRef = ref(database, 'rooms');
      const newRoomRef = push(roomsRef);
      
      if (!newRoomRef.key) {
        throw new Error('Failed to generate room ID');
      }

      const roomWithId = {
        id: newRoomRef.key,
        ...roomData
      };

      await set(newRoomRef, roomWithId);

      // Do NOT attach onDisconnect to remove entire room for host.
      // This can race with route changes/navigation and cause the room to vanish.
      // We rely on explicit leaveRoom() to remove the room when host leaves.
      
      this.currentRoom = roomWithId;
      
      console.log('Room created successfully with ID:', newRoomRef.key);
      return newRoomRef.key;

    } catch (error) {
      console.error('Failed to create room:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('permission')) {
          throw new Error('Firebase permission denied. Please check database rules.');
        } else if (error.message.includes('network')) {
          throw new Error('Network error. Please check your internet connection.');
        } else {
          throw new Error(`Room creation failed: ${error.message}`);
        }
      }
      
      throw new Error('Unknown error occurred while creating room');
    }
  }

  async joinRoom(roomId: string, playerName: string): Promise<void> {
    if (!isFirebaseAvailable() || !database) {
      throw new Error('Firebase is not available');
    }

    try {
      this.playerName = playerName;
      
      const roomRef = ref(database, `rooms/${roomId}`);
      const snapshot = await get(roomRef);
      
      if (!snapshot.exists()) {
        throw new Error('Room not found');
      }

      const room = snapshot.val();
      
      if (room.status !== 'waiting') {
        throw new Error('Room is not accepting new players');
      }

      const currentPlayerCount = Object.keys(room.players).length;
      if (currentPlayerCount >= room.maxPlayers) {
        throw new Error('Room is full');
      }

      const newPlayer: Player = {
        id: this.playerId,
        name: playerName,
        status: 'not-ready',
        isHost: false,
        joinedAt: Date.now()
      };

  const playerPath = ref(database, `rooms/${roomId}/players/${this.playerId}`);
  await set(playerPath, newPlayer);
  await update(roomRef, { updatedAt: Date.now() });
      this.currentRoom = { ...room, players: { ...room.players, [this.playerId]: newPlayer }, updatedAt: Date.now() };

      // Auto-remove this player if connection drops
      try {
        onDisconnect(playerPath).remove();
      } catch (e) {
        // ignore if unavailable
      }
      
      console.log('Successfully joined room:', roomId);

    } catch (error) {
      console.error('Failed to join room:', error);
      throw error;
    }
  }

  getCurrentRoom(): Room | null {
    return this.currentRoom;
  }

  async fetchRoom(roomId: string): Promise<Room | null> {
    if (!isFirebaseAvailable() || !database) return null;
    try {
      const roomRef = ref(database, `rooms/${roomId}`);
      const snap = await get(roomRef);
      if (!snap.exists()) return null;
      return snap.val() as Room;
    } catch (e) {
      console.error('fetchRoom error', e);
      return null;
    }
  }

  getPlayerId(): string {
    return this.playerId;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  isHost(): boolean {
    return this.currentRoom?.hostId === this.playerId;
  }

  async leaveRoom(): Promise<void> {
    if (!this.currentRoom || !isFirebaseAvailable() || !database) {
      return;
    }

    try {
      // Unsubscribe listeners
      if (this.roomUnsubscribe) {
        this.roomUnsubscribe();
        this.roomUnsubscribe = null;
      }

      const roomId = this.currentRoom.id;
      const roomRef = ref(database, `rooms/${roomId}`);

      if (this.currentRoom.hostId === this.playerId) {
        // Host leaving: delete entire room
        await remove(roomRef);
      } else {
        // Guest leaving: remove only the player entry
        const playerRef = ref(database, `rooms/${roomId}/players/${this.playerId}`);
        await remove(playerRef);

        // Update room timestamp
        await update(roomRef, { updatedAt: Date.now() });
      }

      this.currentRoom = null;
      this.lastPlayerIds.clear();
    } catch (error) {
      console.error('Failed to leave room:', error);
      throw error;
    }
  }

  onRoomUpdate(callback: (room: Room | null) => void): void {
    if (!this.currentRoom || !isFirebaseAvailable() || !database) return;

    const roomRef = ref(database, `rooms/${this.currentRoom.id}`);

    // Clean previous listener
    if (this.roomUnsubscribe) {
      this.roomUnsubscribe();
      this.roomUnsubscribe = null;
    }

    const unsubscribe = onValue(
      roomRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          this.currentRoom = null;
          callback(null);
          return;
        }

        const newRoom = snapshot.val() as Room;
        const prevPlayers = new Set(this.lastPlayerIds);
        const nextPlayers = new Set(Object.keys(newRoom.players || {}));

        // Compute joins
        for (const id of nextPlayers) {
          if (!prevPlayers.has(id) && this.onPlayerJoinCallback) {
            const p = newRoom.players[id];
            if (p) this.onPlayerJoinCallback(p);
          }
        }
        // Compute leaves
        for (const id of prevPlayers) {
          if (!nextPlayers.has(id) && this.onPlayerLeaveCallback) {
            this.onPlayerLeaveCallback(id);
          }
        }

        this.lastPlayerIds = nextPlayers;
        this.currentRoom = newRoom;
        callback(newRoom);
      },
      (error) => {
        console.error('Room listener error:', error);
        if (this.onRoomErrorCallback) this.onRoomErrorCallback(error as any);
      }
    );

    this.roomUnsubscribe = unsubscribe;
  }

  onPlayerJoin(callback: (player: Player) => void): void {
    this.onPlayerJoinCallback = callback;
  }

  onPlayerLeave(callback: (playerId: string) => void): void {
    this.onPlayerLeaveCallback = callback;
  }

  onRoomError(callback: (error: Error) => void): void {
    this.onRoomErrorCallback = callback;
  }

  async startGame(): Promise<void> {
    if (!this.currentRoom || !isFirebaseAvailable() || !database) return;
    const roomRef = ref(database, `rooms/${this.currentRoom.id}`);
    await update(roomRef, { status: 'racing', updatedAt: Date.now(), raceStartAt: serverTimestamp() as any });
    this.currentRoom = { ...this.currentRoom, status: 'racing', updatedAt: Date.now() };
  }

  async setHostPeerId(peerId: string): Promise<void> {
    if (!this.currentRoom || !isFirebaseAvailable() || !database) return;
    const roomRef = ref(database, `rooms/${this.currentRoom.id}`);
    await update(roomRef, { hostPeerId: peerId, updatedAt: Date.now() });
    this.currentRoom = { ...this.currentRoom, hostPeerId: peerId, updatedAt: Date.now() } as any;
  }

  // Lightweight subscription that doesn't depend on joinRoom/currentRoom
  subscribeToRoom(
    roomId: string,
    callback: (room: Room | null) => void,
    onError?: (error: Error) => void
  ): () => void {
    if (!isFirebaseAvailable() || !database) return () => {};
    const roomRef = ref(database, `rooms/${roomId}`);
    const unsub = onValue(
      roomRef,
      (snap) => {
        if (!snap.exists()) { callback(null); return; }
        callback(snap.val() as Room);
      },
      (err) => {
        console.error('subscribeToRoom error:', err);
        onError?.(err as any);
      }
    );
    return unsub;
  }
}

export default RoomManager;

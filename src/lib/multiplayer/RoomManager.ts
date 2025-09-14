export interface RoomData {
  id: string;
  host: string;
  players: { id: string; name?: string }[];
  settings: Record<string, unknown>;
  status: 'waiting' | 'racing' | 'finished';
  createdAt: number;
}

export default class RoomManager {
  async createRoom(hostId: string): Promise<RoomData> {
    // TODO: integrate Firebase
    return {
      id: crypto.randomUUID(),
      host: hostId,
      players: [{ id: hostId }],
      settings: {},
      status: 'waiting',
      createdAt: Date.now()
    };
  }

  async joinRoom(roomId: string, playerId: string): Promise<void> {
    // TODO: integrate Firebase
    void roomId;
    void playerId;
  }
}

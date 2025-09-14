import Peer, { DataConnection } from 'peerjs';

export type Player = { id: string; name?: string };
export type GameStatePacket = unknown; // replace with compressed state

export default class PeerManager {
  private peer?: Peer;
  private connections = new Map<string, DataConnection>();
  private onJoin?: (player: Player) => void;
  private onLeave?: (playerId: string) => void;
  private onData?: (data: any) => void;

  constructor(private roomId: string) {}

  async createRoom(): Promise<string> {
    this.peer = new Peer();
    this.peer.on('connection', (conn) => this.attachConnection(conn));
    await new Promise<void>((resolve) => this.peer!.on('open', () => resolve()));
    return this.peer!.id;
  }

  async joinRoom(hostId: string): Promise<void> {
    this.peer = new Peer();
    await new Promise<void>((resolve) => this.peer!.on('open', () => resolve()));
    const conn = this.peer.connect(hostId);
    this.attachConnection(conn);
  }

  broadcast(data: GameStatePacket) {
    this.connections.forEach((c) => c.open && c.send(data));
  }

  onPlayerJoin(cb: (player: Player) => void) { this.onJoin = cb; }
  onPlayerLeave(cb: (id: string) => void) { this.onLeave = cb; }
  onDataReceived(cb: (data: any) => void) { this.onData = cb; }

  private attachConnection(conn: DataConnection) {
    conn.on('open', () => {
      this.connections.set(conn.peer, conn);
      this.onJoin?.({ id: conn.peer });
    });
    conn.on('data', (d) => this.onData?.(d));
    conn.on('close', () => {
      this.connections.delete(conn.peer);
      this.onLeave?.(conn.peer);
    });
    conn.on('error', () => {
      this.connections.delete(conn.peer);
      this.onLeave?.(conn.peer);
    });
  }
}

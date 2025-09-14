import { browser } from '$app/environment';

export interface PeerInfo {
  id: string;
  playerId: string;
  latency: number;
  status: 'connected' | 'disconnected';
}

export class PeerManager {
  private peer: any = null;
  private connections: Map<string, any> = new Map();
  private isHost: boolean = false;
  private onPlayerJoinCallback?: (player: any) => void;
  private onPlayerLeaveCallback?: (playerId: string) => void;
  private onDataReceivedCallback?: (data: any, senderId: string) => void;

  constructor() {
    console.log('PeerManager created');
  }

  async initializeHost(): Promise<void> {
    if (!browser) return;
    
    try {
      const PeerJS = await import('peerjs');
      this.peer = new PeerJS.default();
      this.isHost = true;
      
      this.peer.on('open', (id: string) => {
        console.log('Host peer initialized with ID:', id);
      });

      this.peer.on('connection', (conn: any) => {
        this.handleNewConnection(conn);
      });
    } catch (error) {
      console.error('Failed to initialize host:', error);
    }
  }

  async initializeGuest(): Promise<void> {
    if (!browser) return;
    
    try {
      const PeerJS = await import('peerjs');
      this.peer = new PeerJS.default();
      this.isHost = false;
      
      this.peer.on('open', (id: string) => {
        console.log('Guest peer initialized with ID:', id);
      });
    } catch (error) {
      console.error('Failed to initialize guest:', error);
    }
  }

  private handleNewConnection(conn: any): void {
    this.connections.set(conn.peer, conn);
    
    conn.on('data', (data: any) => {
      if (this.onDataReceivedCallback) {
        this.onDataReceivedCallback(data, conn.peer);
      }
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      if (this.onPlayerLeaveCallback) {
        this.onPlayerLeaveCallback(conn.peer);
      }
    });

    if (this.onPlayerJoinCallback) {
      this.onPlayerJoinCallback({ id: conn.peer });
    }
  }

  getConnectedPeers(): string[] {
    return Array.from(this.connections.keys());
  }

  onPlayerJoin(callback: (player: any) => void): void {
    this.onPlayerJoinCallback = callback;
  }

  onPlayerLeave(callback: (playerId: string) => void): void {
    this.onPlayerLeaveCallback = callback;
  }

  onDataReceived(callback: (data: any, senderId: string) => void): void {
    this.onDataReceivedCallback = callback;
  }

  disconnect(): void {
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.connections.clear();
  }
}

export default PeerManager;

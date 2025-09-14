export type WsEvent =
  | { t: 'open' }
  | { t: 'close' }
  | { t: 'players'; list: Array<{ id: string; name: string }> }
  | { t: 'state'; id: string; p: [number, number, number]; q: [number, number, number, number] }
  | { t: 'lb'; list: Array<{ id: string; name: string; z: number; rank: number }> }
  | { t: 'winner'; id: string; name: string }
  | { t: 'restart'; startAt: number };

export default class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private roomId: string;
  private playerId: string;
  private name: string;
  private reconnectDelay = 1000;
  private handlers: Array<(ev: WsEvent) => void> = [];
  private closed = false;

  constructor(url: string, roomId: string, playerId: string, name: string) {
    this.url = url;
    this.roomId = roomId;
    this.playerId = playerId;
    this.name = name || 'Anonymous';
  }

  connect() {
    this.closed = false;
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.emit({ t: 'open' });
      this.send({ t: 'join', roomId: this.roomId, playerId: this.playerId, name: this.name });
    };
    this.ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (!data || !data.t) return;
        this.emit(data);
      } catch {}
    };
    this.ws.onclose = () => {
      this.emit({ t: 'close' });
      if (!this.closed) {
        setTimeout(() => this.connect(), this.reconnectDelay);
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, 8000);
      }
    };
    this.ws.onerror = () => {
      // ignore; close will handle reconnection
    };
  }

  private emit(ev: WsEvent) {
    for (const h of this.handlers) {
      try { h(ev); } catch {}
    }
  }

  close() {
    this.closed = true;
    try { this.ws?.close(); } catch {}
  }

  on(handler: (ev: WsEvent) => void) {
    this.handlers.push(handler);
  }

  send(obj: any) {
    try { this.ws?.readyState === 1 && this.ws.send(JSON.stringify(obj)); } catch {}
  }

  sendState(p: [number, number, number], q: [number, number, number, number]) {
    this.send({ t: 'state', p, q });
  }

  sendLeaderboard(list: Array<{ id: string; name: string; z: number; rank: number }>) {
    this.send({ t: 'lb', list });
  }
}

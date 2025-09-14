import { WebSocketServer } from 'ws';

const PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 8787;
const wss = new WebSocketServer({ port: PORT });

// rooms: roomId -> Map<playerId, { ws, name, lastState?, lastSeen }>
const rooms = new Map();

function getPlayersList(roomId) {
  const room = rooms.get(roomId);
  if (!room) return [];
  return Array.from(room.entries()).map(([id, v]) => ({ id, name: v.name || 'Anonymous' }));
}

function broadcast(roomId, data, exceptId) {
  const room = rooms.get(roomId);
  if (!room) return;
  const msg = JSON.stringify(data);
  for (const [pid, entry] of room.entries()) {
    if (exceptId && pid === exceptId) continue;
    try { entry.ws.readyState === 1 && entry.ws.send(msg); } catch {}
  }
}

wss.on('connection', (ws) => {
  let roomId = null;
  let playerId = null;

  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw.toString()); } catch { return; }

    if (data.t === 'join') {
      roomId = data.roomId;
      playerId = data.playerId;
      const name = data.name || 'Anonymous';
      if (!rooms.has(roomId)) rooms.set(roomId, new Map());
      const room = rooms.get(roomId);
      room.set(playerId, { ws, name, lastSeen: Date.now() });
      // Send current players to the new client
      ws.send(JSON.stringify({ t: 'players', list: getPlayersList(roomId) }));
      // Notify others
      broadcast(roomId, { t: 'players', list: getPlayersList(roomId) }, playerId);
      return;
    }

    if (!roomId || !playerId) return;

    if (data.t === 'state') {
      // Relay to others in the same room
      broadcast(roomId, { t: 'state', id: playerId, p: data.p, q: data.q }, playerId);
      return;
    }

    if (data.t === 'lb') {
      // Relay leaderboard list
      broadcast(roomId, { t: 'lb', list: data.list }, playerId);
      return;
    }

    if (data.t === 'winner') {
      // Announce winner to all
      broadcast(roomId, { t: 'winner', id: data.id, name: data.name });
      return;
    }

    if (data.t === 'restart') {
      // Start a new round with a shared start time
      broadcast(roomId, { t: 'restart', startAt: data.startAt });
      return;
    }
  });

  ws.on('close', () => {
    if (!roomId || !playerId) return;
    const room = rooms.get(roomId);
    if (!room) return;
    room.delete(playerId);
    broadcast(roomId, { t: 'players', list: getPlayersList(roomId) });
    if (room.size === 0) rooms.delete(roomId);
  });

  ws.on('error', () => {
    // handled by close
  });
});

console.log(`[ws-server] listening on ws://localhost:${PORT}`);

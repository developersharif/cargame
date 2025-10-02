<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import MultiplayerEngine from '$lib/game/core/MultiplayerEngine';
  import type { MPPlayerInfo } from '$lib/game/core/MultiplayerEngine';
  import RoomManager from '$lib/multiplayer/RoomManager';
  import WebSocketClient from '$lib/multiplayer/WebSocketClient';
  import MobileControls from '$lib/components/MobileControls.svelte';
  import { base } from '$app/paths';
  import { Trophy, Home } from 'lucide-svelte';

  let container: HTMLDivElement | null = null;
  let engine: MultiplayerEngine | null = null;
  let countdown = 3;
  let speed = 0;
  let winnerName: string | null = null;
  let leaderboard: Array<{ id: string; name: string; z: number; rank: number }> = [];
  let canRestart = false;
  let muted = false;

  let rm: RoomManager;
  let ws: WebSocketClient | null = null;
  $: roomId = $page.params.roomId;

  onMount(() => {
    rm = new RoomManager();
    ws = null;
    const name = localStorage.getItem('playerName') || 'Anonymous';
    if (!container) return;

    (async () => {
      // Prefer fetching room first to avoid join failures when status is already 'racing'
      let room = await rm.fetchRoom(roomId);
      if (!room) {
        // As a fallback, try to join (e.g., direct link while room is waiting)
        try {
          await rm.joinRoom(roomId, name);
          room = await rm.fetchRoom(roomId);
        } catch {
          // ignore
        }
      }

      if (!room) {
        alert('Room not found or no longer available.');
        history.back();
        return;
      }

      const localId = rm.getPlayerId();
      const isInRoom = !!room.players?.[localId];
      if (!isInRoom && room.status === 'waiting') {
        try {
          await rm.joinRoom(roomId, name);
          room = (await rm.fetchRoom(roomId)) || room;
        } catch {
          // ignore join errors; proceed as spectator
        }
      }

      const infos: MPPlayerInfo[] = Object.values(room.players || {}).map((p) => ({
        id: p.id,
        name: p.name || 'Anonymous',
        isLocal: p.id === localId,
      }));

      // Initialize WebSocket client
      const wsUrl = (import.meta as any).env?.VITE_WS_URL || `ws://localhost:8787`;
      ws = new WebSocketClient(wsUrl, room.id, localId, name);
      ws.connect();

      engine = new MultiplayerEngine(container, infos);
      const startAt = typeof room.raceStartAt === 'number' ? room.raceStartAt : undefined;
      engine.init(startAt);

      // Networking: broadcast local state and apply remote updates
      const sendInterval = setInterval(() => {
        if (!engine || !ws) return;
        const { p, q } = engine.getLocalTransform();
        ws.sendState(p, q);
      }, 66);

      ws?.on((msg) => {
        if (!engine) return;
        if (msg.t === 'state') {
          engine.applyRemoteTransform(msg.id, msg.p, msg.q);
        } else if (msg.t === 'players') {
          // Sync players with server authoritative membership
          const currentIds = new Set(engine.getPlayerIds());
          const listedIds = new Set(msg.list.map((p) => p.id));
          // add
          msg.list.forEach((p) => {
            if (!currentIds.has(p.id)) {
              engine.addPlayer({ id: p.id, name: p.name, isLocal: p.id === localId });
            }
          });
          // remove
          currentIds.forEach((id) => {
            if (!listedIds.has(id)) engine.removePlayer(id);
          });
        } else if (msg.t === 'lb') {
          leaderboard = msg.list;
        } else if (msg.t === 'winner') {
          if (!winnerName) {
            winnerName = msg.name || 'Unknown';
            canRestart = true;
          }
        } else if (msg.t === 'restart') {
          // Reset for replay with synchronized countdown
          winnerName = null;
          canRestart = false;
          engine.resetForReplay(msg.startAt);
        }
      });

      const id = setInterval(() => {
        if (engine) {
          countdown = engine.getCountdown();
          speed = Math.round(engine.currentSpeed * 3.6);
          const winnerId = engine.getWinnerId();
          if (winnerId && !winnerName) {
            winnerName = infos.find((i) => i.id === winnerId)?.name || 'Unknown';
            // Freeze locally and announce to others
            ws?.send({ t: 'winner', id: winnerId, name: winnerName });
            canRestart = true;
          }

          // Update leaderboard and broadcast periodically
          const states = engine.getPlayerStates();
          const sorted = states.sort((a, b) => b.z - a.z).map((s, i) => ({ ...s, rank: i + 1 }));
          leaderboard = sorted;
          ws?.sendLeaderboard(sorted);
        }
      }, 100);
      // Keep a lightweight room subscription (reserved for future room data like raceStartAt changes)
      cleanupRoom = rm.subscribeToRoom(room.id, () => {});
      cleanupId = id;
      cleanupNet = sendInterval;
    })();
  });

  let cleanupId: any = null;
  let cleanupNet: any = null;
  let cleanupRoom: any = null;
  onDestroy(() => {
    engine?.destroy();
    engine = null;
    if (cleanupId) clearInterval(cleanupId);
    if (cleanupNet) clearInterval(cleanupNet);
    if (cleanupRoom) cleanupRoom();
    ws?.close();
  });

  // Mobile control handlers
  function handleMobileThrottle(value: number) {
    engine?.['input']?.setMobileThrottle(value);
  }

  function handleMobileBrake(value: number) {
    engine?.['input']?.setMobileBrake(value);
  }

  function handleMobileSteer(value: number) {
    engine?.['input']?.setMobileSteer(value);
  }

  function handleMobileHandbrake(pressed: boolean) {
    engine?.['input']?.setMobileHandbrake(pressed);
  }

  function handleMobileBoost(pressed: boolean) {
    engine?.['input']?.setMobileBoost(pressed);
  }
</script>

<div class="game-root" bind:this={container}></div>

<!-- Mobile Controls -->
<MobileControls
  onThrottle={handleMobileThrottle}
  onBrake={handleMobileBrake}
  onSteer={handleMobileSteer}
  onHandbrake={handleMobileHandbrake}
  onBoost={handleMobileBoost}
/>

<div class="hud">
  <a class="home-btn" href={`${base}/`} aria-label="Home" title="Home" style="pointer-events:auto">
    <Home size={18} />
    <span>Home</span>
  </a>
  {#if countdown > 0}
    <div class="countdown">{countdown}</div>
  {:else if winnerName}
    <div class="winner icon-text">
      <Trophy size={20} />
      Winner: {winnerName}
    </div>
  {/if}
  <div class="speed">{speed} km/h</div>
  <div class="audio-controls" style="pointer-events:auto">
    <button
      class="mute-btn"
      aria-pressed={muted}
      on:click={() => {
        muted = !muted;
        engine?.setMuted(muted);
      }}>{muted ? 'Unmute' : 'Mute'}</button
    >
  </div>
  <div class="leaderboard">
    <div class="lb-title">Participants</div>
    {#each leaderboard as p}
      <div class="lb-row">
        <span class="rank">{p.rank}.</span>
        <span class="name">{p.name}</span>
      </div>
    {/each}
  </div>
</div>

{#if winnerName && canRestart}
  <div class="restart">
    <button
      class="restart-btn"
      on:click={() => {
        const startAt = Date.now() + 3000; // 3s countdown for replay
        ws?.send({ t: 'restart', startAt });
        engine?.resetForReplay(startAt);
        winnerName = null;
        canRestart = false;
      }}>Restart Race</button
    >
  </div>
{/if}

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .game-root {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
  }
  .hud {
    position: fixed;
    top: 12px;
    left: 12px;
    right: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    color: #fff;
    z-index: 10;
    pointer-events: none;
  }
  .leaderboard {
    position: fixed;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.55);
    padding: 8px 12px;
    border-radius: 6px;
    min-width: 180px;
    max-width: 40vw;
  }
  .lb-title {
    font-weight: 700;
    margin-bottom: 6px;
  }
  .lb-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .lb-row .rank {
    width: 24px;
    text-align: right;
    opacity: 0.85;
  }
  .lb-row .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
  }
  .countdown {
    font-size: 2.2rem;
    background: rgba(0, 0, 0, 0.6);
    padding: 6px 12px;
    border-radius: 8px;
  }
  .winner {
    font-size: 1.6rem;
    background: rgba(0, 0, 0, 0.6);
    padding: 6px 12px;
    border-radius: 8px;
    color: #ffd700;
  }
  .speed {
    background: rgba(0, 0, 0, 0.55);
    padding: 6px 10px;
    border-radius: 6px;
    font-weight: 700;
  }
  .restart {
    position: fixed;
    bottom: 16px;
    right: 16px;
    pointer-events: auto;
  }
  .restart-btn {
    background: #ff9800;
    color: #fff;
    border: none;
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
  }
  .restart-btn:hover {
    background: #fb8c00;
  }

  .audio-controls {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
  }
  .home-btn {
    position: fixed;
    right: 16px;
    bottom: 64px; /* keep clear of Restart button at bottom-right */
    z-index: 20;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.25);
    font-weight: 700;
    pointer-events: auto;
  }
  .home-btn:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  .mute-btn {
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
  }
  .mute-btn[aria-pressed='true'] {
    background: rgba(255, 0, 0, 0.55);
  }
</style>

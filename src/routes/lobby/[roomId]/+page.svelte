<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { isFirebaseAvailable } from '$lib/config/firebase.js';
  import RoomManager, { type Room, type Player } from '$lib/multiplayer/RoomManager.js';
  import PeerManager from '$lib/multiplayer/PeerManager.js';

  $: roomId = $page.params.roomId;

  let roomManager: RoomManager;
  let peerManager: PeerManager;
  let roomData: Room | null = null;
  let isHost = false;
  // derive reactively so navigating to /lobby/create works reliably
  $: isCreating = roomId === 'create';
  let playerName = '';
  let isConnecting = false;
  let errorMessage = '';
  let connectedPeers: string[] = [];
  let copied = false;
  let copiedLink = false;
  let navigatingToGame = false;

  onMount(async () => {
    playerName = localStorage.getItem('playerName') || 'Anonymous';

    if (!isFirebaseAvailable()) {
      errorMessage = 'Firebase not configured. Multiplayer is unavailable.';
      return;
    }

    roomManager = new RoomManager();
    isConnecting = true;

    try {
      if (isCreating) {
        await createRoom();
      } else {
        await joinExistingRoom();
      }
    } catch (error) {
      console.error('Room operation failed:', error);
      errorMessage = error instanceof Error ? error.message : 'Failed to connect to room';
    } finally {
      isConnecting = false;
    }
  });

  onDestroy(() => {
    if (peerManager) {
      peerManager.disconnect();
    }
    // Don't tear down the room when we're transitioning into the game
    if (roomManager && !navigatingToGame) {
      roomManager.leaveRoom();
    }
  });

  async function createRoom() {
    try {
      const createdRoomId = await roomManager.createRoom(playerName);
      roomData = roomManager.getCurrentRoom();
      isHost = true;

      // Set up peer manager for hosting
      peerManager = new PeerManager();
      await peerManager.initializeHost();
      const hostPeerId = peerManager.getPeerId();
      if (hostPeerId) {
        await roomManager.setHostPeerId(hostPeerId);
      }

      console.log('Room created:', createdRoomId);

      // Set up peer event listeners
      setupPeerListeners();

      // Subscribe to realtime room changes
      setupRoomListeners();

      // Update URL to actual room ID
      goto(`/lobby/${createdRoomId}`, { replaceState: true });
    } catch (error) {
      throw new Error(
        'Failed to create room: ' + (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }

  async function joinExistingRoom() {
    try {
      if (!roomId || roomId === 'create') {
        // If route param isn't a valid room id, treat it as create flow or show a friendly error
        throw new Error('Invalid room link. Please create a new room or check the room ID.');
      }
      await roomManager.joinRoom(roomId, playerName);
      roomData = roomManager.getCurrentRoom();

      if (!roomData) {
        throw new Error('Room not found or no longer available');
      }

      // Set up peer manager for joining
      peerManager = new PeerManager();
      await peerManager.initializeGuest();

      console.log('Joined room:', roomData.id);

      // Set up peer event listeners
      setupPeerListeners();

      // Subscribe to realtime room changes
      setupRoomListeners();
    } catch (error) {
      throw new Error(
        'Failed to join room: ' + (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }

  function setupPeerListeners() {
    if (!peerManager) return;

    peerManager.onPlayerJoin((player) => {
      console.log('Player joined:', player);
      connectedPeers = peerManager.getConnectedPeers();
    });

    peerManager.onPlayerLeave((playerId) => {
      console.log('Player left:', playerId);
      connectedPeers = peerManager.getConnectedPeers();
    });

    peerManager.onDataReceived((data, senderId) => {
      console.log('Received data from', senderId, ':', data);
      // Handle game data here
    });
  }

  function setupRoomListeners() {
    if (!roomManager) return;

    roomManager.onPlayerJoin((player) => {
      console.log('Realtime join:', player);
    });

    roomManager.onPlayerLeave((playerId) => {
      console.log('Realtime leave:', playerId);
    });

    roomManager.onRoomError((err) => {
      console.error('Room error:', err);
    });

    roomManager.onRoomUpdate((room) => {
      roomData = room;
      // Guests: if host peer id is present, connect to host
      if (room && !isHost && room.hostPeerId) {
        try {
          peerManager?.connectToHost(room.hostPeerId);
        } catch {}
      }
      // If the host starts the game, navigate guests automatically
      if (room && room.status === 'racing') {
        // Prevent leaveRoom on destroy when transitioning to game
        navigatingToGame = true;
        goto(`/game/multiplayer/${room?.id}`);
      }
    });
  }

  function generatePlayerId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  function copyRoomId() {
    if (roomData?.id) {
      navigator.clipboard.writeText(roomData.id);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    }
  }

  function copyRoomLink() {
    if (roomData?.id) {
      const url = `${location.origin}/lobby/${roomData.id}`;
      navigator.clipboard.writeText(url);
      copiedLink = true;
      setTimeout(() => (copiedLink = false), 1500);
    }
  }

  async function startGame() {
    if (isHost && roomData) {
      // Mark navigation intent first to avoid leaveRoom during reactive listener navigation
      navigatingToGame = true;
      // Update room status so guests (and host) get signaled via realtime listener
      await roomManager.startGame();
      // Direct navigate as well (host), in case listener latency occurs
      goto(`/game/multiplayer/${roomData.id}`);
    }
  }

  function leaveRoom() {
    if (roomManager) {
      roomManager.leaveRoom();
    }
    goto('/');
  }

  // Require at least one peer (host + 1 player = 2 total) to start
  $: canStartGame = isHost && roomData && Object.keys(roomData.players).length >= 2;
</script>

<svelte:head>
  <title>
    {isCreating ? 'Creating Room' : `Room ${roomId}`} - Speed Racers
  </title>
</svelte:head>

<div class="lobby-container">
  {#if errorMessage}
    <div class="error-screen">
      <div class="error-icon">❌</div>
      <h2>Connection Failed</h2>
      <p>{errorMessage}</p>
      <button class="btn-primary" on:click={() => goto('/')}> Back to Menu </button>
    </div>
  {:else if isConnecting}
    <div class="loading-screen">
      <div class="loading-spinner"></div>
      <h2>{isCreating ? 'Creating Room...' : 'Joining Room...'}</h2>
      <p>Setting up multiplayer connection</p>
    </div>
  {:else if roomData}
    <div class="lobby-content">
      <div class="room-header">
        <h1>🏁 Racing Lobby</h1>
        <div class="room-info">
          <div class="room-id">
            <span class="label">Room ID:</span>
            <div class="id-container">
              <span class="room-code">{roomData.id}</span>
              <button class="copy-btn" on:click={copyRoomId} title="Copy Room ID">
                {copied ? '✅' : '📋'}
              </button>
            </div>
          </div>
          <div class="status-badge {roomData.status}">
            {roomData.status === 'waiting'
              ? '⏳ Waiting'
              : roomData.status === 'racing'
                ? '🏁 Racing'
                : '🏆 Finished'}
          </div>
        </div>
      </div>

      <div class="players-section">
        <h3>Players ({Object.keys(roomData.players).length}/4)</h3>
        <div class="players-list">
          {#each Object.values(roomData.players) as player}
            <div class="player-card {player.isHost ? 'host' : ''}">
              <div class="player-avatar">
                {player.isHost ? '👑' : '🏎️'}
              </div>
              <div class="player-info">
                <span class="player-name">{player.name || 'Anonymous'}</span>
                <span class="player-role">
                  {player.isHost ? 'Host' : 'Player'}
                </span>
              </div>
              <div class="connection-status">
                {connectedPeers.includes(player.id) || player.isHost ? '🟢' : '🔴'}
              </div>
            </div>
          {/each}

          <!-- Empty slots -->
          {#each Array(4 - Object.keys(roomData.players).length) as _, i}
            <div class="player-card empty">
              <div class="player-avatar">👤</div>
              <div class="player-info">
                <span class="player-name">Waiting for player...</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="game-settings">
        <h3>Game Settings</h3>
        <div class="settings-grid">
          <div class="setting-item">
            <span class="label">Track:</span>
            <span>Default Track</span>
          </div>
          <div class="setting-item">
            <span class="label">Mode:</span>
            <span>Sunny</span>
          </div>
          <div class="setting-item">
            <span class="label">Max Players:</span>
            <span>{roomData.maxPlayers}</span>
          </div>
        </div>
      </div>

      <div class="lobby-actions">
        {#if isHost}
          <button class="btn-primary start-btn" on:click={startGame} disabled={!canStartGame}>
            {canStartGame ? '🚀 Start Race' : 'Waiting for Players...'}
          </button>
        {:else}
          <div class="waiting-message">
            <span class="pulse-dot"></span>
            Waiting for host to start the race...
          </div>
        {/if}

        <button class="btn-secondary" on:click={leaveRoom}> Leave Room </button>
      </div>

      {#if isHost && Object.keys(roomData.players).length === 1}
        <div class="share-section">
          <h4>Invite Friends</h4>
          <p>Share this room with your friends so they can join:</p>
          <div class="share-text">
            <div><strong>ID:</strong> {roomData.id}</div>
            <div style="margin-top: .5rem; word-break: break-all;">
              <strong>Link:</strong>
              {location.origin}/lobby/{roomData.id}
            </div>
          </div>
          <div class="lobby-actions" style="margin-top: 1rem;">
            <button class="btn-secondary" on:click={copyRoomId}
              >{copied ? '✅ ID Copied' : 'Copy ID'}</button
            >
            <button class="btn-secondary" on:click={copyRoomLink}
              >{copiedLink ? '✅ Link Copied' : 'Copy Link'}</button
            >
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .lobby-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-screen,
  .loading-screen {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 3rem;
    max-width: 400px;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .lobby-content {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .room-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .room-header h1 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
  }

  .room-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .room-id .label {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }

  .id-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .room-code {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
    font-family: monospace;
    font-size: 1.1rem;
  }

  .copy-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .copy-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .status-badge.waiting {
    background: rgba(255, 193, 7, 0.8);
    color: #333;
  }

  .status-badge.racing {
    background: rgba(40, 167, 69, 0.8);
  }

  .status-badge.finished {
    background: rgba(108, 117, 125, 0.8);
  }

  .players-section {
    margin-bottom: 2rem;
  }

  .players-section h3 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .players-list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .player-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .player-card.host {
    background: rgba(255, 193, 7, 0.2);
    border: 2px solid rgba(255, 193, 7, 0.5);
  }

  .player-card.empty {
    opacity: 0.5;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    background: transparent;
  }

  .player-avatar {
    font-size: 2rem;
    width: 50px;
    text-align: center;
  }

  .player-info {
    flex: 1;
  }

  .player-name {
    display: block;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .player-role {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .connection-status {
    font-size: 1.2rem;
  }

  .game-settings {
    margin-bottom: 2rem;
  }

  .game-settings h3 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .setting-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
  }

  .setting-item .label {
    display: block;
    font-size: 0.8rem;
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }

  .lobby-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(238, 90, 36, 0.6);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .waiting-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .pulse-dot {
    width: 12px;
    height: 12px;
    background: #ff6b6b;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .share-section {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 2px dashed rgba(255, 255, 255, 0.2);
  }

  .share-section h4 {
    margin-bottom: 0.5rem;
    color: #ffd700;
  }

  .share-section p {
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .share-text {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 1rem;
    border-radius: 10px;
    font-family: monospace;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    .lobby-container {
      padding: 1rem;
    }

    .lobby-content {
      padding: 1.5rem;
    }

    .room-header h1 {
      font-size: 2rem;
    }

    .room-info {
      flex-direction: column;
      gap: 1rem;
    }

    .players-list {
      grid-template-columns: 1fr;
    }

    .settings-grid {
      grid-template-columns: 1fr;
    }

    .lobby-actions {
      flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
    }
  }
</style>

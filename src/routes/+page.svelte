<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isFirebaseAvailable } from '$lib/config/firebase.js';

  let roomId = '';
  let showJoinRoom = false;
  let showCreateRoom = false;
  let playerName = '';
  let firebaseEnabled = false;

  onMount(() => {
    firebaseEnabled = isFirebaseAvailable();
    // Load saved player name
    playerName = localStorage.getItem('playerName') || '';
  });

  function startSinglePlayer() {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
    }
    goto('/game');
  }

  function createRoom() {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      goto('/lobby/create');
    }
  }

  function joinRoom() {
    if (roomId.trim() && playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      goto(`/lobby/${roomId.trim()}`);
    }
  }

  function openSettings() {
    goto('/settings');
  }

  function toggleJoinRoom() {
    showJoinRoom = !showJoinRoom;
    showCreateRoom = false;
  }

  function toggleCreateRoom() {
    showCreateRoom = !showCreateRoom;
    showJoinRoom = false;
  }
</script>

<svelte:head>
  <title>3D Multiplayer Racing Game</title>
</svelte:head>

<div class="container">
  <div class="hero">
    <div class="logo">🏎️</div>
    <h1>Speed Racers</h1>
    <p class="subtitle">Experience the thrill of high-speed racing in stunning 3D</p>
  </div>

  <div class="player-info">
    <label for="playerName">Your Name</label>
    <input
      id="playerName"
      type="text"
      placeholder="Enter your racing name"
      bind:value={playerName}
      maxlength="20"
    />
  </div>

  <div class="game-modes">
    <!-- Single Player -->
    <div class="mode-card single-player">
      <div class="mode-icon">🎮</div>
      <h3>Single Player</h3>
      <p>Practice your skills and master the tracks</p>
      <button class="primary-btn" on:click={startSinglePlayer} disabled={!playerName.trim()}>
        Start Racing
      </button>
    </div>

    <!-- Multiplayer -->
    <div class="mode-card multiplayer">
      <div class="mode-icon">🌐</div>
      <h3>Multiplayer</h3>
      <p>Race against friends in real-time</p>

      {#if !firebaseEnabled}
        <div class="offline-notice">
          <small>Multiplayer requires Firebase configuration</small>
        </div>
      {:else}
        <div class="multiplayer-options">
          <button class="secondary-btn" on:click={toggleCreateRoom} disabled={!playerName.trim()}>
            Create Room
          </button>
          <button class="secondary-btn" on:click={toggleJoinRoom} disabled={!playerName.trim()}>
            Join Room
          </button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Join Room Modal -->
  {#if showJoinRoom}
    <div class="modal-overlay" on:click={() => (showJoinRoom = false)}>
      <div class="modal" on:click|stopPropagation>
        <h3>Join Room</h3>
        <p>Enter the room ID shared by your friend</p>
        <input
          type="text"
          placeholder="Room ID (e.g., ABC123)"
          bind:value={roomId}
          class="room-input"
          maxlength="10"
        />
        <div class="modal-actions">
          <button class="cancel-btn" on:click={() => (showJoinRoom = false)}> Cancel </button>
          <button
            class="primary-btn"
            on:click={joinRoom}
            disabled={!roomId.trim() || !playerName.trim()}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Create Room Modal -->
  {#if showCreateRoom}
    <div class="modal-overlay" on:click={() => (showCreateRoom = false)}>
      <div class="modal" on:click|stopPropagation>
        <h3>Create Room</h3>
        <p>Start a new multiplayer race and invite friends</p>
        <div class="room-preview">
          <span>👤 Host: {playerName || 'Anonymous'}</span>
          <span>🏁 Ready to race!</span>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" on:click={() => (showCreateRoom = false)}> Cancel </button>
          <button class="primary-btn" on:click={createRoom} disabled={!playerName.trim()}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  {/if}

  <div class="footer-actions">
    <button class="settings-btn" on:click={openSettings}> ⚙️ Settings </button>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
  }

  .container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      repeat;
    pointer-events: none;
    opacity: 0.1;
  }

  .hero {
    text-align: center;
    margin-bottom: 3rem;
    z-index: 1;
  }

  .logo {
    font-size: 4rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  h1 {
    font-size: 3.5rem;
    margin: 0 0 1rem 0;
    font-weight: 700;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 300;
  }

  .player-info {
    margin-bottom: 3rem;
    z-index: 1;
  }

  .player-info label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  .player-info input {
    width: 300px;
    padding: 1rem;
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-size: 1rem;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .player-info input:focus {
    outline: none;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 1);
  }

  .game-modes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin-bottom: 3rem;
    z-index: 1;
  }

  .mode-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
  }

  .mode-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .mode-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .mode-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .mode-card p {
    margin: 0 0 1.5rem 0;
    opacity: 0.8;
    line-height: 1.5;
  }

  .primary-btn {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 150px;
    box-shadow: 0 4px 15px rgba(238, 90, 36, 0.4);
  }

  .primary-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(238, 90, 36, 0.6);
  }

  .primary-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .secondary-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.25rem;
  }

  .secondary-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  .secondary-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .multiplayer-options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .offline-notice {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
  }

  .offline-notice small {
    opacity: 0.7;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }

  .modal {
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 2rem;
    border-radius: 20px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .modal h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .modal p {
    margin: 0 0 1.5rem 0;
    opacity: 0.7;
  }

  .room-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
    box-sizing: border-box;
  }

  .room-input:focus {
    outline: none;
    border-color: #667eea;
  }

  .room-preview {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .cancel-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cancel-btn:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }

  .footer-actions {
    z-index: 1;
  }

  .settings-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .settings-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .player-info input {
      width: 100%;
      max-width: 300px;
    }

    .game-modes {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .mode-card {
      padding: 1.5rem;
    }

    .modal {
      margin: 1rem;
      padding: 1.5rem;
    }

    .modal-actions {
      flex-direction: column;
    }
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }
  }
</style>

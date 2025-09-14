<script lang="ts">
  import { goto } from '$app/navigation';
  let roomId = '';

  function startSinglePlayer() {
    goto('/game');
  }
  function joinLobby() {
    if (roomId.trim()) goto(`/lobby/${roomId.trim()}`);
  }
  function openSettings() {
    goto('/settings');
  }
</script>

<h1>3D Multiplayer Racing</h1>
<div class="menu">
  <button on:click={startSinglePlayer}>Start Single Player</button>

  <div class="row">
    <input placeholder="Room ID" bind:value={roomId} />
    <button on:click={joinLobby} disabled={!roomId.trim()}>Join Lobby</button>
  </div>

  <button on:click={openSettings}>Settings</button>
</div>

<style>
  .menu {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 420px;
  }
  .row {
    display: flex;
    gap: 0.5rem;
  }
  input {
    flex: 1;
    padding: 0.5rem;
  }
  button {
    padding: 0.6rem 0.9rem;
  }
  h1 {
    margin-bottom: 1rem;
  }
  :global(body) {
    font-family:
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      'Helvetica Neue',
      Arial,
      'Noto Sans',
      'Apple Color Emoji',
      'Segoe UI Emoji';
    margin: 1rem;
  }
  @media (prefers-color-scheme: dark) {
    :global(body) {
      background: #0b0b0b;
      color: #eee;
    }
    input {
      background: #222;
      color: #eee;
      border: 1px solid #333;
    }
    button {
      background: #222;
      color: #eee;
      border: 1px solid #333;
    }
  }
</style>

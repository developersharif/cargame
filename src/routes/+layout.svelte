<script lang="ts"></script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>3D Multiplayer Racing</title>
</svelte:head>

<slot />

<style>
  :global(.icon-wrapper) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :global(.icon-button) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.icon-text) {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>

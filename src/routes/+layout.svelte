<script lang="ts">
  import carThumb from '$assets/images/car-thumb.png';
  const title = '3D Multiplayer Racing';
  const description =
    'Speed Racers — Experience the thrill of high-speed 3D racing in single-player and multiplayer modes.';
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <!-- Open Graph / Social Preview -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={carThumb} />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={carThumb} />
</svelte:head>

<slot />

<footer class="site-footer" aria-label="Site footer">
  <div class="footer-inner">
    <span
      >Made © 2025 <a href="https://www.linkedin.com/in/developersharif" target="_blank">Sharif</a
      >. Built with SvelteKit + Three.js.</span
    >
  </div>
</footer>

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

  .site-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .site-footer .footer-inner {
    margin: 0.5rem;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.35);
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.8rem;
    line-height: 1.2;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  /* Make only the link interactive and style it */
  .site-footer a {
    pointer-events: auto;
    color: #fff;
    text-decoration: underline;
  }
</style>

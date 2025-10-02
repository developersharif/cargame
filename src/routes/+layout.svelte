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

<!-- Animated Background -->
<div class="page-background">
  <div class="gradient-bg"></div>
  <div class="animated-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>
    <div class="shape shape-5"></div>
  </div>
</div>

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
  .page-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .gradient-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 35%, #24243e 100%);
    animation: gradientShift 20s ease infinite;
  }

  @keyframes gradientShift {
    0%,
    100% {
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 35%, #24243e 100%);
    }
    33% {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 35%, #0f3460 100%);
    }
    66% {
      background: linear-gradient(135deg, #2d1b69 0%, #1e3a5f 35%, #1a1a2e 100%);
    }
  }

  .animated-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .shape {
    position: absolute;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
    border-radius: 50%;
    filter: blur(60px);
    animation: float 20s ease-in-out infinite;
  }

  .shape-1 {
    width: 400px;
    height: 400px;
    top: -200px;
    left: -200px;
    animation-delay: 0s;
    animation-duration: 25s;
  }

  .shape-2 {
    width: 500px;
    height: 500px;
    top: 50%;
    right: -250px;
    animation-delay: -5s;
    animation-duration: 30s;
  }

  .shape-3 {
    width: 300px;
    height: 300px;
    bottom: -150px;
    left: 30%;
    animation-delay: -10s;
    animation-duration: 20s;
    background: linear-gradient(135deg, rgba(244, 92, 67, 0.3), rgba(255, 107, 107, 0.3));
  }

  .shape-4 {
    width: 450px;
    height: 450px;
    top: 20%;
    left: 40%;
    animation-delay: -15s;
    animation-duration: 35s;
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(162, 155, 254, 0.2));
  }

  .shape-5 {
    width: 350px;
    height: 350px;
    bottom: 10%;
    right: 20%;
    animation-delay: -20s;
    animation-duration: 28s;
    background: linear-gradient(135deg, rgba(251, 207, 232, 0.2), rgba(217, 4, 155, 0.2));
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(50px, 100px) rotate(90deg);
    }
    50% {
      transform: translate(-30px, 200px) rotate(180deg);
    }
    75% {
      transform: translate(-100px, 100px) rotate(270deg);
    }
  }

  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }

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

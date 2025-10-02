<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import GameEngine from '$lib/game/core/GameEngine';
  import MobileControls from '$lib/components/MobileControls.svelte';
  import { settings } from '$lib/stores/settingsStore';
  import { get } from 'svelte/store';
  import { base } from '$app/paths';

  let container: HTMLDivElement | null = null;
  let engine: GameEngine | null = null;
  let speed = 0;
  let lapCurrent = 0;
  let lapBest: number | null = null;
  let muted = false;
  let prevMaster = 0.8;
  let boost = 1; // 0..1
  let score = 0;
  let distance = 0;
  let combo = 0;

  onMount(() => {
    // Prevent scrolling during game
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    if (!container) return;
    engine = new GameEngine(container);
    engine.init();
    const id = setInterval(() => {
      if (engine) {
        speed = Math.round(engine.currentSpeed * 3.6);
        const hud = engine.getLapHud?.();
        if (hud) {
          lapCurrent = hud.current;
          lapBest = hud.best ?? null;
        }
        // Use engine API when present
        // @ts-ignore old builds may not have this method yet
        if (engine.getBoostLevel) boost = engine.getBoostLevel();
        // @ts-ignore Get score data
        if (engine.getScore) {
          const scoreData = engine.getScore();
          score = scoreData.total;
          distance = Math.round(scoreData.distance);
          combo = scoreData.combo;
        }
      }
    }, 100);
    return () => {
      clearInterval(id);
      engine?.destroy();
    };
  });

  onDestroy(() => {
    engine?.destroy();
    engine = null;

    // Restore scrolling when leaving game page
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  });
  function toggleMute() {
    const s = get(settings);
    if (s.audio.master > 0) {
      prevMaster = s.audio.master;
      settings.update((v) => ({ ...v, audio: { ...v.audio, master: 0 } }));
      muted = true;
    } else {
      settings.update((v) => ({ ...v, audio: { ...v.audio, master: prevMaster || 0.8 } }));
      muted = false;
    }
  }
  export function formatMs(ms: number) {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  }

  // Dynamic speed color based on velocity
  function getSpeedColor(speed: number): string {
    if (speed <= 20) return '#00ff00'; // Green for low speed
    if (speed <= 40) return '#7fff00'; // Lime green
    if (speed <= 60) return '#ffff00'; // Yellow
    if (speed <= 80) return '#ff7f00'; // Orange
    if (speed <= 120) return '#ff4500'; // Red orange
    if (speed <= 160) return '#ff0000'; // Red for high speed
    return '#ff00ff'; // Magenta for extreme speed
  }

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
  <a class="home-btn" href={`${base}/`} aria-label="Home" title="Home" style="pointer-events:auto"
    >Home</a
  >
  <div class="score-section">
    <div class="score">Score: {score.toLocaleString()}</div>
    <div class="distance">Distance: {distance}m</div>
    {#if combo > 1}
      <div class="combo">Combo: x{combo}</div>
    {/if}
  </div>
  <div class="speed">{speed} km/h</div>
  <div class="laps">
    <div>Lap: {formatMs(lapCurrent)}</div>
    <div>Best: {lapBest === null ? '--' : formatMs(lapBest)}</div>
  </div>
  <div class="help">
    W/S or ↑/↓: Throttle/Brake • A/D or ←/→: Steer • Space: Handbrake • Shift: Boost • R: Reset
  </div>
  <button
    class="mute"
    on:click|stopPropagation={toggleMute}
    aria-label="Toggle mute"
    title="Toggle mute"
  >
    {muted ? 'Unmute' : 'Mute'}
  </button>
  <div class="boost">
    <div class="bar">
      <div class="fill" style={`width:${Math.round(boost * 100)}%`}></div>
    </div>
  </div>

  <!-- Dynamic Speed Indicator -->
  <div class="speed-indicator">
    <div class="speed-bar">
      <div
        class="speed-fill"
        style={`width:${Math.min((speed / 200) * 100, 100)}%; background: ${getSpeedColor(speed)}`}
      ></div>
    </div>
    <div class="speed-text">{speed} km/h</div>
  </div>
</div>

<style>
  .game-root {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .hud {
    position: fixed;
    top: 12px;
    left: 12px;
    right: 12px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    color: #fff;
    pointer-events: none;
    z-index: 1000;
  }
  .hud .speed {
    background: rgba(0, 0, 0, 0.55);
    padding: 6px 10px;
    border-radius: 4px;
    font-weight: 700;
  }
  .hud .home-btn {
    position: fixed;
    right: 16px;
    bottom: 16px;
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
  .hud .home-btn:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  .hud .score-section {
    background: rgba(0, 0, 0, 0.6);
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 140px;
  }
  .hud .score {
    font-weight: 700;
    color: #00e1ff;
    font-size: 1.1rem;
  }
  .hud .distance {
    font-size: 0.9rem;
    color: #ccc;
  }
  .hud .combo {
    font-weight: 700;
    color: #ff6b35;
    font-size: 1rem;
    animation: pulse 0.5s ease-in-out infinite alternate;
  }
  @keyframes pulse {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }
  .hud .help {
    margin-left: auto;
    background: rgba(0, 0, 0, 0.35);
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  .hud .laps {
    background: rgba(0, 0, 0, 0.45);
    padding: 6px 10px;
    border-radius: 4px;
    display: flex;
    gap: 10px;
  }
  .hud .mute {
    margin-left: 8px;
    pointer-events: auto; /* allow clicking */
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
  }
  .hud .boost {
    position: fixed;
    left: 12px;
    bottom: 16px;
    width: 220px;
    pointer-events: none;
    display: none; /* Hide boost bar to remove cyan gradient */
  }
  .hud .boost .bar {
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 4px;
    width: 100%;
    height: 10px;
    overflow: hidden;
  }
  .hud .boost .fill {
    background: linear-gradient(90deg, #00e1ff, #00ffa3);
    height: 100%;
    width: 0%;
  }

  /* Dynamic Speed Indicator */
  .hud .speed-indicator {
    position: fixed;
    left: 12px;
    bottom: 16px; /* Move down to boost bar position */
    width: 240px;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .hud .speed-indicator .speed-bar {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    width: 100%;
    height: 12px;
    overflow: hidden;
    margin-bottom: 4px;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .hud .speed-indicator .speed-fill {
    height: 100%;
    transition:
      width 0.2s ease-out,
      background 0.3s ease-out;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    position: relative;
  }

  .hud .speed-indicator .speed-text {
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
    letter-spacing: 1px;
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    .hud .help {
      display: none; /* Hide keyboard controls on mobile */
    }

    .hud .speed-indicator {
      width: 180px;
      padding: 6px;
    }

    .hud .score-section {
      font-size: 0.9rem;
      min-width: 120px;
      padding: 6px 10px;
    }

    .hud .score {
      font-size: 1rem;
    }

    .hud {
      gap: 8px;
    }
  }

  @media (max-width: 480px) {
    .hud .speed-indicator {
      width: 150px;
      padding: 5px;
    }

    .hud .speed-indicator .speed-text {
      font-size: 0.9rem;
    }

    .hud .score-section {
      font-size: 0.85rem;
      min-width: 110px;
      padding: 5px 8px;
    }
  }
</style>

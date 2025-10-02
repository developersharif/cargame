<script lang="ts">
  import { settings } from '$lib/stores/settingsStore';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { Home, Monitor, Volume2, Gamepad2, Palette, Moon, Sun, Cloud } from 'lucide-svelte';

  $: s = $settings;

  function goHome() {
    goto(`${base}/`);
  }

  function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      settings.set({
        graphics: {
          quality: 'medium',
          shadows: true,
          reflections: true,
          particles: true,
          antialiasing: true,
          resolution: 1.0,
        },
        audio: {
          master: 0.7,
          effects: 0.65,
          music: 0.45,
          engine: 0.65,
          spatial: true,
        },
        controls: {
          sensitivity: 1.0,
        },
        gameplay: {
          difficulty: 'normal',
          assists: {
            autoBreak: false,
            steeringAssist: true,
            stabilization: true,
          },
          camera: 'chase',
          gameMode: 'sunny',
        },
      });
    }
  }
</script>

<svelte:head>
  <title>Settings - Speed Racers</title>
</svelte:head>

<div class="settings-container">
  <!-- Header -->
  <div class="settings-header">
    <button class="home-btn" on:click={goHome} title="Back to Home">
      <Home size={24} />
      <span>Home</span>
    </button>
    <h1>⚙️ Settings</h1>
    <button class="reset-btn" on:click={resetSettings} title="Reset to Defaults">
      Reset All
    </button>
  </div>

  <!-- Settings Grid -->
  <div class="settings-grid">
    <!-- Graphics Settings -->
    <div class="settings-card">
      <div class="card-header">
        <Monitor size={24} />
        <h2>Graphics</h2>
      </div>

      <div class="setting-item">
        <label for="quality">Quality Preset</label>
        <select
          id="quality"
          bind:value={s.graphics.quality}
          on:change={(e) =>
            settings.update((v) => ({
              ...v,
              graphics: { ...v.graphics, quality: (e.target as HTMLSelectElement).value as any },
            }))}
        >
          <option value="low">🔋 Low - Best Performance</option>
          <option value="medium">⚡ Medium - Balanced</option>
          <option value="high">✨ High - Quality</option>
          <option value="ultra">💎 Ultra - Maximum Quality</option>
        </select>
        <p class="hint">Higher quality settings may reduce performance on slower devices</p>
      </div>

      <div class="setting-item">
        <label for="shadows">Shadows</label>
        <div class="toggle-wrapper">
          <input
            id="shadows"
            type="checkbox"
            bind:checked={s.graphics.shadows}
            on:change={(e) =>
              settings.update((v) => ({
                ...v,
                graphics: { ...v.graphics, shadows: (e.target as HTMLInputElement).checked },
              }))}
          />
          <span class="toggle-label">{s.graphics.shadows ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>

      <div class="setting-item">
        <label for="antialiasing">Anti-aliasing</label>
        <div class="toggle-wrapper">
          <input
            id="antialiasing"
            type="checkbox"
            bind:checked={s.graphics.antialiasing}
            on:change={(e) =>
              settings.update((v) => ({
                ...v,
                graphics: { ...v.graphics, antialiasing: (e.target as HTMLInputElement).checked },
              }))}
          />
          <span class="toggle-label">{s.graphics.antialiasing ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>

      <div class="setting-item">
        <label for="resolution">Render Resolution</label>
        <div class="slider-wrapper">
          <input
            id="resolution"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            bind:value={s.graphics.resolution}
            on:input={(e) =>
              settings.update((v) => ({
                ...v,
                graphics: {
                  ...v.graphics,
                  resolution: Number((e.target as HTMLInputElement).value),
                },
              }))}
          />
          <span class="slider-value">{Math.round(s.graphics.resolution * 100)}%</span>
        </div>
        <p class="hint">Lower values improve performance, higher values improve clarity</p>
      </div>
    </div>

    <!-- Audio Settings -->
    <div class="settings-card">
      <div class="card-header">
        <Volume2 size={24} />
        <h2>Audio</h2>
      </div>

      <div class="setting-item">
        <label for="master">Master Volume</label>
        <div class="slider-wrapper">
          <input
            id="master"
            type="range"
            min="0"
            max="1"
            step="0.05"
            bind:value={s.audio.master}
            on:input={(e) =>
              settings.update((v) => ({
                ...v,
                audio: { ...v.audio, master: Number((e.target as HTMLInputElement).value) },
              }))}
          />
          <span class="slider-value">{Math.round(s.audio.master * 100)}%</span>
        </div>
      </div>

      <div class="setting-item">
        <label for="engine">Engine Sound</label>
        <div class="slider-wrapper">
          <input
            id="engine"
            type="range"
            min="0"
            max="1"
            step="0.05"
            bind:value={s.audio.engine}
            on:input={(e) =>
              settings.update((v) => ({
                ...v,
                audio: { ...v.audio, engine: Number((e.target as HTMLInputElement).value) },
              }))}
          />
          <span class="slider-value">{Math.round(s.audio.engine * 100)}%</span>
        </div>
      </div>

      <div class="setting-item">
        <label for="effects">Sound Effects</label>
        <div class="slider-wrapper">
          <input
            id="effects"
            type="range"
            min="0"
            max="1"
            step="0.05"
            bind:value={s.audio.effects}
            on:input={(e) =>
              settings.update((v) => ({
                ...v,
                audio: { ...v.audio, effects: Number((e.target as HTMLInputElement).value) },
              }))}
          />
          <span class="slider-value">{Math.round(s.audio.effects * 100)}%</span>
        </div>
      </div>

      <div class="setting-item">
        <label for="music">Ambient Music</label>
        <div class="slider-wrapper">
          <input
            id="music"
            type="range"
            min="0"
            max="1"
            step="0.05"
            bind:value={s.audio.music}
            on:input={(e) =>
              settings.update((v) => ({
                ...v,
                audio: { ...v.audio, music: Number((e.target as HTMLInputElement).value) },
              }))}
          />
          <span class="slider-value">{Math.round(s.audio.music * 100)}%</span>
        </div>
      </div>
    </div>

    <!-- Controls Settings -->
    <div class="settings-card">
      <div class="card-header">
        <Gamepad2 size={24} />
        <h2>Controls</h2>
      </div>

      <div class="setting-item">
        <label for="sensitivity">Steering Sensitivity</label>
        <div class="slider-wrapper">
          <input
            id="sensitivity"
            type="range"
            min="0.4"
            max="2"
            step="0.05"
            bind:value={s.controls.sensitivity}
            on:input={(e) =>
              settings.update((v) => ({
                ...v,
                controls: {
                  ...v.controls,
                  sensitivity: Number((e.target as HTMLInputElement).value),
                },
              }))}
          />
          <span class="slider-value">{s.controls.sensitivity.toFixed(2)}x</span>
        </div>
        <p class="hint">Higher values make the car turn faster for the same input</p>
      </div>

      <div class="controls-info">
        <h4>🎮 Controls Guide</h4>
        <div class="controls-list">
          <div class="control-row">
            <span class="key">↑ / W</span>
            <span>Accelerate</span>
          </div>
          <div class="control-row">
            <span class="key">↓ / S</span>
            <span>Brake / Reverse</span>
          </div>
          <div class="control-row">
            <span class="key">← / A</span>
            <span>Turn Left</span>
          </div>
          <div class="control-row">
            <span class="key">→ / D</span>
            <span>Turn Right</span>
          </div>
          <div class="control-row">
            <span class="key">Space</span>
            <span>Handbrake</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gameplay Settings -->
    <div class="settings-card featured">
      <div class="card-header">
        <Palette size={24} />
        <h2>Game Modes</h2>
      </div>

      <div class="setting-item">
        <label for="gameMode">Environment Mode</label>
        <select
          id="gameMode"
          bind:value={s.gameplay.gameMode}
          on:change={(e) =>
            settings.update((v) => ({
              ...v,
              gameplay: { ...v.gameplay, gameMode: (e.target as HTMLSelectElement).value as any },
            }))}
        >
          <option value="sunny">☀️ Sunny</option>
          <option value="cloudy">☁️ Cloudy</option>
          <option value="horror">🌙 Horror</option>
        </select>
      </div>

      <div class="mode-previews">
        <div class="mode-preview" class:active={s.gameplay.gameMode === 'sunny'}>
          <div class="mode-icon sunny">
            <Sun size={32} />
          </div>
          <h4>☀️ Sunny Mode</h4>
          <p>
            Beautiful clear day with bright sunlight and realistic weather. Perfect for high-speed
            racing with excellent visibility.
          </p>
          <ul>
            <li>🌤️ Clear blue skies</li>
            <li>☀️ Natural lighting</li>
            <li>🌄 Scenic environment</li>
          </ul>
        </div>

        <div class="mode-preview" class:active={s.gameplay.gameMode === 'cloudy'}>
          <div class="mode-icon cloudy">
            <Cloud size={32} />
          </div>
          <h4>☁️ Cloudy Mode</h4>
          <p>
            Overcast weather with dynamic rain, volumetric clouds, and lightning. Challenge yourself
            with reduced visibility.
          </p>
          <ul>
            <li>🌧️ Heavy rainfall</li>
            <li>⚡ Lightning strikes</li>
            <li>☁️ Volumetric clouds</li>
          </ul>
        </div>

        <div class="mode-preview" class:active={s.gameplay.gameMode === 'horror'}>
          <div class="mode-icon horror">
            <Moon size={32} />
          </div>
          <h4>🌙 Horror Mode</h4>
          <p>
            Terrifying dark atmosphere with blood moon, eerie sounds, and supernatural elements.
            Race through the darkness if you dare!
          </p>
          <ul>
            <li>🩸 Blood moon</li>
            <li>👻 Shadow figures</li>
            <li>🔦 Flickering lights</li>
            <li>🎵 Horror sounds</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="settings-footer">
    <p>💾 Settings are automatically saved to your browser</p>
  </div>
</div>

<style>
  .settings-container {
    min-height: 100vh;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .settings-header h1 {
    font-size: 2.5rem;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .home-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .home-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }

  .reset-btn {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 107, 107, 0.2);
    border: 2px solid rgba(255, 107, 107, 0.4);
    border-radius: 12px;
    color: #ff6b6b;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .reset-btn:hover {
    background: rgba(255, 107, 107, 0.3);
    border-color: rgba(255, 107, 107, 0.6);
    transform: translateY(-2px);
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .settings-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .settings-card:hover {
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .settings-card.featured {
    grid-column: 1 / -1;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }

  .card-header h2 {
    font-size: 1.5rem;
    margin: 0;
    color: white;
  }

  .setting-item {
    margin-bottom: 1.5rem;
  }

  .setting-item label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .setting-item select {
    width: 100%;
    padding: 0.875rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .setting-item select:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .setting-item select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  .slider-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .slider-wrapper input[type='range'] {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }

  .slider-wrapper input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .slider-wrapper input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
  }

  .slider-wrapper input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .slider-value {
    min-width: 60px;
    text-align: right;
    font-weight: 600;
    color: #667eea;
    font-size: 1.1rem;
  }

  .toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .toggle-wrapper input[type='checkbox'] {
    width: 50px;
    height: 26px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 13px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toggle-wrapper input[type='checkbox']:checked {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
  }

  .toggle-wrapper input[type='checkbox']::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
  }

  .toggle-wrapper input[type='checkbox']:checked::before {
    left: 26px;
  }

  .toggle-label {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
  }

  .hint {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.5rem;
    font-style: italic;
  }

  .controls-info {
    background: rgba(102, 126, 234, 0.1);
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 12px;
    padding: 1.25rem;
    margin-top: 1.5rem;
  }

  .controls-info h4 {
    margin: 0 0 1rem 0;
    color: white;
    font-size: 1.1rem;
  }

  .controls-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .control-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.95rem;
  }

  .control-row .key {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    font-weight: 700;
    min-width: 80px;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .mode-previews {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .mode-preview {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .mode-preview:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }

  .mode-preview.active {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  }

  .mode-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .mode-icon.sunny {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .mode-icon.cloudy {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  .mode-icon.horror {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  }

  .mode-preview h4 {
    margin: 0 0 0.75rem 0;
    font-size: 1.2rem;
    color: white;
  }

  .mode-preview p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }

  .mode-preview ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mode-preview ul li {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }

  .settings-footer {
    text-align: center;
    padding: 2rem 0;
    color: rgba(255, 255, 255, 0.5);
    border-top: 2px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    .settings-container {
      padding: 1rem;
    }

    .settings-header h1 {
      font-size: 1.75rem;
    }

    .settings-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .settings-card {
      padding: 1.5rem;
    }

    .home-btn span {
      display: none;
    }

    .mode-previews {
      grid-template-columns: 1fr;
    }
  }
</style>

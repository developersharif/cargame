<script lang="ts">
  import { settings } from '$lib/stores/settingsStore';
  $: s = $settings;
</script>

<h2>Settings</h2>
<section>
  <label>
    Quality
    <select
      bind:value={s.graphics.quality}
      on:change={(e) =>
        settings.update((v) => ({
          ...v,
          graphics: { ...v.graphics, quality: (e.target as HTMLSelectElement).value as any },
        }))}
    >
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
      <option value="ultra">ultra</option>
    </select>
  </label>
</section>

<section>
  <label>
    Steering sensitivity
    <input
      type="range"
      min="0.4"
      max="2"
      step="0.05"
      bind:value={s.controls.sensitivity}
      on:input={(e) =>
        settings.update((v) => ({
          ...v,
          controls: { ...v.controls, sensitivity: Number((e.target as HTMLInputElement).value) },
        }))}
    />
    <span>{s.controls.sensitivity.toFixed(2)}x</span>
  </label>
  <p style="opacity:0.8;margin-top:6px;">
    Higher values increase how fast the car turns for the same input.
  </p>
</section>

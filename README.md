# 3D Multiplayer Car Racing (SvelteKit + Three.js)

A scalable, multiplayer 3D car racing game built with SvelteKit, Three.js, WebRTC (PeerJS), and Firebase.

## Quick Start

- Node.js 20+
- pnpm or npm

Install dependencies and start dev server:

```bash
npm ci || npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

- Push to `main`. CI builds and publishes `build/` via Pages.
- For user/organization pages or non-standard repo names, base path is auto-derived from `GITHUB_REPOSITORY`.

## Project Structure

```
src/
├─ lib/
│  ├─ game/
│  │  ├─ core/ (GameEngine, Physics, Input)
│  │  ├─ entities/ (Car, Track, Environment)
│  │  ├─ systems/ (Render, Audio, Collision, Network)
│  │  └─ modes/ (GameMode, Sunny, Cloudy, Horror)
│  ├─ multiplayer/ (PeerManager, RoomManager, StateSync)
│  ├─ stores/ (gameStore, settingsStore, playerStore, multiplayerStore)
│  ├─ utils/ (ObjectPool, ResourceManager, AssetLoader, math)
│  └─ config/ (maps, cars, difficulties)
├─ routes/
│  ├─ +layout.svelte
│  ├─ +page.svelte (menu)
│  ├─ game/+page.svelte
│  ├─ lobby/[roomId]/+page.svelte
│  └─ settings/+page.svelte
└─ assets/
   ├─ models/ textures/ sounds/ maps/
```

## Notes on State Management

- Primary: Svelte stores for reactivity and SSR compatibility.
- Optional: Zustand-like pattern can be emulated but Svelte stores are preferred in SvelteKit.

## Memory Safety & Performance

- ResourceManager ensures Three.js resources are disposed.
- ObjectPool for particles and short-lived objects.
- Instancing and frustum culling where possible.
- Interpolation buffers for network smoothing.

## LICENSE

MIT

## AI Coding Agent Guide for this repo

This repo is a SvelteKit + Three.js racing game with single-player and a lightweight multiplayer mode (Firebase rooms + WebSocket relay). Use these notes to make correct, fast changes.

Architecture (where things live)

- Single-player: `src/routes/game/+page.svelte` mounts `GameEngine` (`src/lib/game/core/GameEngine.ts`). Track is “infinite” along Z; collisions via `CollisionSystem`; audio via `AudioSystem`; cleanup uses `ResourceManager.disposeScene` in `destroy()`.
- Multiplayer: Lobby uses Firebase Realtime DB via `RoomManager` (`src/lib/multiplayer/RoomManager.ts`). The actual race uses `MultiplayerEngine` (`src/lib/game/core/MultiplayerEngine.ts`) and a simple WebSocket relay client `WebSocketClient` (`src/lib/multiplayer/WebSocketClient.ts`). Server is `server/ws-server.js`.
- Stores and settings: Svelte stores in `src/lib/stores/*`. Graphics/audio settings drive renderer and audio (see `settingsStore.ts`). Path aliases: `$lib`, `$assets` (see `vite.config.ts`).

How to run (dev/test/build)

- Dev app: `npm run dev` (SvelteKit/Vite).
- Local multiplayer: in another terminal run `npm run ws-server` (defaults to ws://localhost:8787) and set `VITE_WS_URL=ws://localhost:8787` in `.env`.
- Typecheck/lint/tests: `npm run check` (fails on warnings), `npm run lint`, `npm run test` (Vitest).
- Build/preview: `npm run build` then `npm run preview`. Postbuild writes `build/404.html` for GitHub Pages.

Configuration and env

- Firebase is optional and used only for room management. If missing, single-player still works; multiplayer UI shows disabled. Env vars read in `src/lib/config/firebase.ts` (must be prefixed `VITE_`). See `FIREBASE_SETUP.md`.
- WebSocket relay URL read from `VITE_WS_URL` (see multiplayer page). For production, use wss://.
- GitHub Pages base path is set in `svelte.config.js` (defaults to `/cargame`); override with `BASE_PATH` when forking.

Multiplayer protocol (what to change together)

- Client events: see union in `WebSocketClient.ts` (`t: 'players' | 'state' | 'lb' | 'winner' | 'restart'`).
- Server relays by room in `server/ws-server.js`. When adding a message type, update both files and the handler in `src/routes/game/multiplayer/[roomId]/+page.svelte`.
- Start timing: race countdown sync uses `raceStartAt` from Firebase (server timestamp) when available.

Project conventions

- Engines take a DOM container and append a Three.js canvas. Always call `destroy()` on unmount; see routes for patterns (Svelte `onDestroy`).
- Resource cleanup: prefer `ResourceManager.disposeScene(scene)` and dispose renderer/AudioSystem explicitly.
- Settings integration: read `settings` store (steering sensitivity, shadows, resolution) and apply at init and on subscription.
- SSR: some pages opt-out (e.g., `src/routes/lobby/[roomId]/+page.ts` has `export const ssr = false;`).
- Deprecated PeerJS: `PeerManager.ts` exists but current flow uses the WebSocket relay; don’t reintroduce PeerJS unless reworking the stack.

Typical change points (examples)

- Add HUD data in single-player: extend `GameEngine` getters (`getLapHud`, `getScore`) and read in `game/+page.svelte`’s interval.
- Add a WS message: define shape in `WebSocketClient.ts`, handle in multiplayer page, relay in `ws-server.js`.
- Add room metadata: extend `Room` in `RoomManager.ts`, write to `rooms/{id}` in Firebase, and read in lobby page.

Quality gates to run before PR

- `npm run check` (no warnings), `npm run lint`, `npm run test`, and a quick manual spin: dev server + ws-server + join a room and start a race.

Gotchas

- Forgetting `VITE_` prefix means envs won’t be exposed to the client.
- On GitHub Pages, wrong base path breaks asset/routing; keep `BASE_PATH` or default `/cargame`.
- Always remove listeners/intervals on unmount in Svelte pages; see multiplayer page cleanup.

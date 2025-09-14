# 3D Multiplayer Car Racing (SvelteKit + Three.js)

A scalable, multiplayer 3D car racing game built with SvelteKit, Three.js, WebRTC (PeerJS), and Firebase.

## Features

- **🏎️ 3D Racing**: Three.js-powered 3D car physics and rendering
- **🌐 Multiplayer**: Real-time P2P multiplayer using PeerJS and Firebase
- **🎮 Game Modes**: Sunny, Cloudy, and Horror environments
- **📱 Responsive**: Works on desktop and mobile devices
- **🚀 Fast Deployment**: GitHub Pages ready with automated CI/CD

## Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm

### Local Development

1. **Clone and Install**:

   ```bash
   git clone <repository-url>
   cd multiplayer-race-game
   npm ci
   ```

2. **Set up Firebase** (for multiplayer):

   - Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md)
   - Copy `.env.example` to `.env` and add your Firebase config

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

## Multiplayer Setup

### Firebase Configuration

The game uses Firebase Realtime Database for room management and PeerJS for P2P connections. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions.

### Environment Variables

Create a `.env` file (copy from `.env.example`) with your Firebase configuration:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Single Player Mode

The game works without Firebase configuration - multiplayer features will be disabled and you can play in single-player mode.

## Deploy to GitHub Pages

### Automatic Deployment

1. **Set up Firebase secrets** in your GitHub repository:

   - Go to Settings > Secrets and variables > Actions
   - Add all Firebase environment variables as secrets

2. **Push to main branch**:

   ```bash
   git push origin main
   ```

3. **GitHub Actions will automatically**:
   - Build the project
   - Run tests and linting
   - Deploy to GitHub Pages

### Manual Deployment

```bash
npm run deploy
```

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
│  └─ config/ (maps, cars, difficulties, firebase)
├─ routes/
│  ├─ +layout.svelte
│  ├─ +page.svelte (menu)
│  ├─ game/+page.svelte
│  ├─ lobby/[roomId]/+page.svelte
│  └─ settings/+page.svelte
└─ assets/
   ├─ models/ textures/ sounds/ maps/
```

## How Multiplayer Works

### Architecture

1. **Room Discovery**: Firebase Realtime Database stores room information
2. **P2P Connections**: PeerJS establishes direct connections between players
3. **State Synchronization**: Custom StateSync handles interpolation and prediction
4. **Fallback**: Single-player mode when Firebase is unavailable

### Key Components

- **RoomManager**: Creates and manages game rooms in Firebase
- **PeerManager**: Handles P2P connections and data transmission
- **StateSync**: Interpolates game state and handles lag compensation

### Network Features

- Delta compression for efficient data transfer
- Client-side prediction with server reconciliation
- Automatic latency compensation
- Graceful handling of player disconnections

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check TypeScript
- `npm run lint` - Lint code
- `npm run test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages (manual)

### Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- Automated testing with Vitest
- Pre-commit hooks for quality assurance

## Notes on State Management

- Primary: Svelte stores for reactivity and SSR compatibility.
- Optional: Zustand-like pattern can be emulated but Svelte stores are preferred in SvelteKit.

## Memory Safety & Performance

- ResourceManager ensures Three.js resources are disposed.
- ObjectPool for particles and short-lived objects.
- Instancing and frustum culling where possible.
- Interpolation buffers for network smoothing.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

- 📖 [Firebase Setup Guide](./FIREBASE_SETUP.md)
- 🐛 [Report Issues](../../issues)
- 💬 [Discussions](../../discussions)

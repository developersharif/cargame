// Autho: sharif
import * as THREE from 'three';
import PhysicsEngine from './PhysicsEngine';
import InputManager from './InputManager';
import RenderSystem from '../systems/RenderSystem';
import ChaseCamera from '../systems/ChaseCamera';
import AudioSystem from '../systems/AudioSystem';
import Environment from '../entities/Environment';
import Track from '../entities/Track';
import Car from '../entities/Car';
import { settings } from '$lib/stores/settingsStore';
import { get } from 'svelte/store';
import CollisionSystem from '../systems/CollisionSystem';

export interface MPPlayerInfo {
  id: string;
  name: string;
  isLocal: boolean;
}

export default class MultiplayerEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  private physics: PhysicsEngine;
  private input: InputManager;
  private renderSystem: RenderSystem;
  private chaseCamera: ChaseCamera;
  private environment?: Environment;
  private track!: Track;
  private audio?: AudioSystem;
  private collision!: CollisionSystem;
  private running = false;
  private disposeBag: Array<() => void> = [];

  // Players
  private players: Map<string, { info: MPPlayerInfo; car: Car; label: THREE.Sprite } > = new Map();
  private localId: string;
  private countdown = 3; // seconds
  private countdownStartAt: number | null = null; // epoch ms when countdown started
  private raceStarted = false;
  private finishZ = 600; // simple finish line z position
  private winnerId: string | null = null;
  private frozen = false;
  private finishGate?: THREE.Group;
  private finishGateBannerMat?: THREE.MeshBasicMaterial;
  private throttleInput = 0;
  private muted = false;

  public currentSpeed = 0; // for local HUD

  constructor(private container: HTMLElement, playerInfos: MPPlayerInfo[]) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    this.camera.position.set(0, 8, 15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.clock = new THREE.Clock();
    this.physics = new PhysicsEngine();
    this.input = new InputManager(container);
    this.renderSystem = new RenderSystem(this.scene, this.camera, this.renderer);
    this.chaseCamera = new ChaseCamera(this.camera);

    const local = playerInfos.find(p => p.isLocal);
    this.localId = local ? local.id : playerInfos[0]?.id;

    // Create players map entries with placeholder cars; actual init in init()
    playerInfos.forEach((p) => {
      // placeholder; real car is created in init
      // label created in init too
      // Stored here to know ordering
      this.players.set(p.id, { info: p, car: null as unknown as Car, label: null as any });
    });
  }

  public init(startAtEpochMs?: number) {
    // Renderer & audio
    const s = get(settings);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, s.graphics.resolution));
    this.renderer.shadowMap.enabled = !!s.graphics.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.updateSize();
    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.updateSize);
    this.disposeBag.push(() => window.removeEventListener('resize', this.updateSize));

    // Environment & track
    this.environment = new Environment(this.renderer);
    this.environment.setup(this.scene);
    this.scene.add(this.environment.group);

    this.track = new Track();
    this.scene.add(this.track.group);

  // Collisions against static obstacles
  this.collision = new CollisionSystem(this.track.obstacles);

  // Finish gate visual (non-blocking)
  this.createOrUpdateFinishGate();

    // Create cars for all players
    const ids = Array.from(this.players.keys());
    ids.forEach((id) => {
      const car = new Car({
        mass: 1200,
        maxSpeed: 40,
        acceleration: 32,
        braking: 60,
        handling: 2.2,
        drag: 0.8,
        lateralGrip: 8.0,
        reverseScale: 0.45,
        handbrakeGrip: 0.2,
        boost: { multiplier: 1.35, capacity: 6, drain: 0.45, regen: 0.22 }
      });
      // Position assigned by grid after all cars are created
      car.setPosition(0, 0, 0);
      car.setHeading(0);
      this.scene.add(car.group);

      const label = this.createNameLabel(this.players.get(id)!.info.name);
      car.group.add(label);
      label.position.set(0, 1.8, 0); // closer to car roof

      this.players.set(id, { ...this.players.get(id)!, car, label });
    });
    // Arrange on a side-by-side grid before the race starts
    this.relineUpGrid();

    // Audio
    this.audio = new AudioSystem(this.camera);
    this.applySettingsToAudio();
    const unsub = settings.subscribe(() => this.applySettingsToAudio());
    this.disposeBag.push(() => unsub());

    // Try to resume audio on first user gesture
    const resumeOnce = async () => {
      await this.audio?.resume();
      window.removeEventListener('keydown', resumeOnce, true);
      window.removeEventListener('pointerdown', resumeOnce, true);
      this.disposeBag = this.disposeBag.filter((fn) => fn !== removeResumeOnce);
    };
    const removeResumeOnce = () => {
      window.removeEventListener('keydown', resumeOnce, true);
      window.removeEventListener('pointerdown', resumeOnce, true);
    };
    window.addEventListener('keydown', resumeOnce, true);
    window.addEventListener('pointerdown', resumeOnce, true);
    this.disposeBag.push(removeResumeOnce);

    // Follow local player's car
    const localCar = this.players.get(this.localId)!.car;
    this.chaseCamera.update(0, localCar.group);

    // Start loop & countdown
    this.running = true;
    this.clock.start();
    this.loop();

    // Countdown sync: if a start time is provided (server timestamp), align timers
    if (startAtEpochMs) {
      this.countdownStartAt = startAtEpochMs;
    } else {
      this.countdownStartAt = Date.now();
    }
  }

  private loop = () => {
    if (!this.running) return;
    const dt = this.clock.getDelta();
    this.update(dt);
    this.render();
    requestAnimationFrame(this.loop);
  };

  private update(deltaTime: number) {
    if (this.frozen) return;
    this.physics.update(deltaTime);

    // Only local player can apply inputs; others are AI-idle until networking sync is added
    const local = this.players.get(this.localId)!;

    // Countdown tick based on wall-clock so all clients display the same
    if (!this.raceStarted && this.countdownStartAt) {
      const elapsed = (Date.now() - this.countdownStartAt) / 1000;
      this.countdown = Math.max(0, 3 - Math.floor(elapsed));
      if (elapsed >= 3) {
        this.raceStarted = true;
      }
    }

    // Apply inputs only after countdown
    if (this.raceStarted) {
      const throttle = Number(this.input.isDown('ArrowUp') || this.input.isDown('KeyW'));
      const brake = Number(this.input.isDown('ArrowDown') || this.input.isDown('KeyS'));
      const handbrake = this.input.isDown('Space');
      const boost = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight');
      const steerLeft = Number(this.input.isDown('ArrowLeft') || this.input.isDown('KeyA'));
      const steerRight = Number(this.input.isDown('ArrowRight') || this.input.isDown('KeyD'));
      const steering = THREE.MathUtils.clamp(steerLeft - steerRight, -1, 1);
      local.car.setInputs({ throttle, brake, steering, handbrake, boost });
      this.throttleInput = throttle;
    } else {
      local.car.setInputs({ throttle: 0, brake: 1, steering: 0, handbrake: true, boost: false });
      this.throttleInput = 0;
    }

  // Update all cars; follow local
    this.players.forEach(({ car }) => car.update(deltaTime));
    this.currentSpeed = local.car.getSpeed();
    this.chaseCamera.update(deltaTime, local.car.group);

  // Resolve simple car-to-car collisions (local against others only) to prevent overlap
  this.resolveLocalCarCollisions();

  // Audio: engine for local player
  this.audio?.setEngine(this.throttleInput, this.currentSpeed, local.car.config.maxSpeed);

    // Update track/environment with the local car progression
    this.track.update(local.car.group.position.z);
    this.environment?.update(local.car.group.position.z);

    // Show finish gate banner fade-in when approaching; does not affect physics
    if (this.finishGate && this.finishGateBannerMat) {
      const d = this.finishZ - local.car.group.position.z;
      if (d <= 0) {
        this.finishGateBannerMat.opacity = 1.0;
        this.finishGate.visible = true;
      } else if (d < 160) {
        const t = 1 - d / 160; // fade in over last 160m
        this.finishGateBannerMat.opacity = THREE.MathUtils.clamp(0.12 + 0.88 * t, 0.12, 1);
        this.finishGate.visible = true;
      } else {
        this.finishGateBannerMat.opacity = 0.12;
        this.finishGate.visible = false; // keep scene clean when far away
      }
    }

    const camPos = this.camera.position;
    this.players.forEach(({ car, label }) => {
      if (!label) return;
      const d = camPos.distanceTo(car.group.position);
      const minD = 8; // start scaling after this distance
      const maxD = 45; // far distance
      const t = THREE.MathUtils.clamp((d - minD) / (maxD - minD), 0, 1);
      const scaleMul = THREE.MathUtils.lerp(1.0, 0.65, t);
      const base = label.userData?.baseScale || { w: 1.05, h: 0.35 };
      label.scale.set(base.w * scaleMul, base.h * scaleMul, 1);
      const mat = label.material as THREE.SpriteMaterial;
      if (mat) mat.opacity = THREE.MathUtils.lerp(1.0, 0.85, t);
    });

    // Collisions for local player vs track obstacles (authoritative locally)
    const p = local.car.group.position;
    const halfX = 0.6; // matches chassis width ~1.2
    const halfZ = 1.2; // matches chassis length ~2.4
    const carAabb = { minX: p.x - halfX, maxX: p.x + halfX, minZ: p.z - halfZ, maxZ: p.z + halfZ } as any;
    const beforeVel = local.car.getVelocityRef().clone();
    const collided = this.collision.resolve(p, local.car.getVelocityRef(), carAabb);
    if (collided) {
      const afterVel = local.car.getVelocityRef();
      const delta = beforeVel.clone().sub(afterVel);
      const impact = THREE.MathUtils.clamp(delta.length() * 0.1, 0, 1);
      this.audio?.playCollision(impact);
    }

    // Keep car within X track bounds (allow infinite Z)
    const boundsX = 25;
    if (Math.abs(p.x) > boundsX) {
      p.x = THREE.MathUtils.clamp(p.x, -boundsX, boundsX);
    }

    // Detect finish once; first to cross finishZ wins
    if (!this.winnerId) {
      for (const [id, p] of this.players) {
        if (p.car.group.position.z >= this.finishZ) {
          this.winnerId = id;
          break;
        }
      }
    }
  }

  private render() {
    this.renderSystem.render();
  }

  private resolveLocalCarCollisions() {
    const local = this.players.get(this.localId);
    if (!local) return;
    const lp = local.car.group.position;
    const lv = local.car.getVelocityRef();
    const radius = 0.7; // approx car half-width for circle proxy
    const minDist = radius * 2;
    const minDistSq = minDist * minDist;
    const tmp = new THREE.Vector3();
    let totalImpact = 0;
    this.players.forEach((other, id) => {
      if (id === this.localId) return;
      const op = other.car.group.position;
      tmp.copy(op).sub(lp);
      // Only consider XZ plane distance
      const dx = tmp.x;
      const dz = tmp.z;
      const distSq = dx * dx + dz * dz;
      if (distSq > 0 && distSq < minDistSq) {
        const dist = Math.sqrt(distSq) || 1e-6;
        const n = new THREE.Vector3(dx / dist, 0, dz / dist); // from local -> other
        const penetration = minDist - dist;
        // Push local away along -n
        lp.addScaledVector(n, -penetration);
        // Remove/reflect velocity component along the collision normal
        const vn = lv.dot(n);
        if (vn > 0) {
          // moving towards other; reflect and dampen
          const restitution = 0.2; // quite soft to keep calm
          lv.addScaledVector(n, -(1 + restitution) * vn);
          totalImpact += Math.abs(vn);
        }
      }
    });
    if (totalImpact > 0) {
      const impactNorm = THREE.MathUtils.clamp(totalImpact * 0.15, 0, 1);
      this.audio?.playCollision(impactNorm);
    }
  }

  private updateSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    // Update render system if it exposes updateSize
    if (this.renderSystem.updateSize) {
      this.renderSystem.updateSize(w, h);
    }
  };

  public destroy() {
    this.running = false;
    this.clock.stop();
    this.disposeBag.forEach((fn) => fn());
    this.environment?.dispose(this.scene);
    this.renderer.dispose();
    this.input.destroy();
    this.audio?.destroy();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  public getCountdown() { return Math.max(0, this.countdown); }
  public hasStarted() { return this.raceStarted; }
  public getWinnerId() { return this.winnerId; }
  public freeze() { this.frozen = true; }
  public unfreeze() { this.frozen = false; }
  public setMuted(m: boolean) { this.muted = m; this.applySettingsToAudio(); }

  public resetForReplay(startAtEpochMs?: number) {
    // Reset cars to grid, countdown and winner
    this.winnerId = null;
    this.raceStarted = false;
    this.frozen = false;
    // Reset car positions/velocities
    this.players.forEach((p) => {
      p.car.reset(new THREE.Vector3(0, 0, 0), 0);
    });
    this.relineUpGrid();
    // Reset finish gate visibility/opacity
    if (this.finishGate && this.finishGateBannerMat) {
      this.finishGate.position.set(0, 0, this.finishZ);
      this.finishGate.visible = false;
      this.finishGateBannerMat.opacity = 0.12;
    }
    // Restart countdown
    this.countdownStartAt = startAtEpochMs || Date.now();
    this.countdown = 3;
  }

  // Networking helpers
  public getLocalId(): string { return this.localId; }
  public getLocalTransform(): { p: [number, number, number]; q: [number, number, number, number] } {
    const local = this.players.get(this.localId)!;
    const pos = local.car.group.position;
    const q = local.car.group.quaternion;
    return { p: [pos.x, pos.y, pos.z], q: [q.x, q.y, q.z, q.w] };
  }

  public applyRemoteTransform(id: string, p: [number, number, number], q: [number, number, number, number]) {
    const player = this.players.get(id);
    if (!player || id === this.localId) return;
    const targetPos = new THREE.Vector3(p[0], p[1], p[2]);
    const targetQuat = new THREE.Quaternion(q[0], q[1], q[2], q[3]);
    player.car.group.position.lerp(targetPos, 0.35);
    player.car.group.quaternion.slerp(targetQuat, 0.35);
  }

  // Dynamic player management
  public getPlayerIds(): string[] { return Array.from(this.players.keys()); }

  public addPlayer(info: MPPlayerInfo) {
    if (this.players.has(info.id)) return;
    const car = new Car({
      mass: 1200,
      maxSpeed: 40,
      acceleration: 32,
      braking: 60,
      handling: 2.2,
      drag: 0.8,
      lateralGrip: 8.0,
      reverseScale: 0.45,
      handbrakeGrip: 0.2,
      boost: { multiplier: 1.35, capacity: 6, drain: 0.45, regen: 0.22 }
    });
    car.setPosition(0, 0, 0);
    car.setHeading(0);
    this.scene.add(car.group);
    const label = this.createNameLabel(info.name);
    car.group.add(label);
    label.position.set(0, 1.8, 0); // closer to car roof
    this.players.set(info.id, { info, car, label });
    if (!this.raceStarted) this.relineUpGrid();
  }

  public removePlayer(id: string) {
    const entry = this.players.get(id);
    if (!entry) return;
    // Remove from scene
    try { this.scene.remove(entry.car.group); } catch (e) {
      void e; // ignore
    }
    this.players.delete(id);
    if (!this.raceStarted) this.relineUpGrid();
  }

  public getPlayerStates(): Array<{ id: string; name: string; z: number }> {
    const list: Array<{ id: string; name: string; z: number }> = [];
    this.players.forEach((p, id) => {
      list.push({ id, name: p.info.name, z: p.car.group.position.z });
    });
    return list;
  }

  private relineUpGrid() {
    // Arrange cars in a side-by-side grid near the start line with safe spacing
    const ids = Array.from(this.players.keys());
    const maxCols = 4; // up to 4 cars per row
    const cols = Math.min(maxCols, Math.max(2, Math.ceil(Math.sqrt(ids.length))));
    const colSpacing = 2.8; // > car width to avoid overlap
    const rowSpacing = 5.4; // extra space to reduce rear-end bumps at start
    const startZ = -8; // start slightly behind origin for runway
    ids.forEach((id, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const totalWidth = (cols - 1) * colSpacing;
      const x = -totalWidth / 2 + col * colSpacing;
      // slight stagger per row to increase visibility and space
      const z = startZ - row * rowSpacing - (row % 2 ? 0.6 : 0);
      const p = this.players.get(id)!;
      p.car.setPosition(x, 0, z);
      p.car.setHeading(0);
    });
  }

  private applySettingsToAudio() {
    const s = get(settings);
    if (!this.audio) return;
    if (this.muted) {
      this.audio.updateFromSettings({
        audio: {
          master: 0,
          engine: s.audio.engine,
          effects: s.audio.effects,
          music: s.audio.music,
          spatial: s.audio.spatial
        }
      } as any);
    } else {
      this.audio.updateFromSettings(s as any);
    }
  }

  private createNameLabel(text: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 96; // a bit taller for tail
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padX = 18;
  // const padY = 10; // reserved for vertical padding if we tighten layout
    const bubbleW = canvas.width - padX * 2;
    const bubbleH = 56; // bubble body height
    const tailH = 12;   // tail height
    const radius = 12;
    const bubbleX = padX;
    const bubbleY = (canvas.height - bubbleH - tailH) / 2; // center body; tail below

    // Determine font size to fit within bubbleW
    let fontSize = 22; // smaller, professional baseline
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    do {
      ctx.font = `700 ${fontSize}px system-ui,-apple-system,Segoe UI,Roboto,sans-serif`;
      const width = ctx.measureText(text).width;
      if (width <= bubbleW - padX || fontSize <= 13) break;
      fontSize -= 1;
    } while (fontSize > 13);

    // Draw rounded rect bubble
    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      const rr = Math.min(r, h / 2, w / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    // Background with subtle shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    drawRoundedRect(bubbleX, bubbleY, bubbleW, bubbleH, radius);
    ctx.fillStyle = 'rgba(20,20,24,0.68)';
    ctx.fill();
    ctx.restore();

    // Tail (triangle) centered at bottom of bubble
    const tailX = bubbleX + bubbleW / 2;
    const tailTopY = bubbleY + bubbleH - 1;
    ctx.beginPath();
    ctx.moveTo(tailX - 10, tailTopY);
    ctx.lineTo(tailX + 10, tailTopY);
    ctx.lineTo(tailX, tailTopY + tailH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(20,20,24,0.68)';
    ctx.fill();

    // Thin stroke for definition
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    drawRoundedRect(bubbleX, bubbleY, bubbleW, bubbleH, radius);
    ctx.stroke();

    // Text
    ctx.fillStyle = '#fff';
    ctx.fillText(text, canvas.width / 2, bubbleY + bubbleH / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    // Compact base size; per-frame scaling will adjust
    const baseW = 1.05;
    const baseH = 0.35;
    sprite.scale.set(baseW, baseH, 1);
    (sprite as any).userData = { ...(sprite as any).userData, baseScale: { w: baseW, h: baseH } };
    return sprite;
  }

  private createOrUpdateFinishGate() {
    // Build a simple arch gate with two posts and a checkered banner; purely visual
    const gate = new THREE.Group();
    const postMat = new THREE.MeshBasicMaterial({ color: 0x22262a });
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x2a2f34 });

    // Dimensions
    const halfSpan = 12; // posts at +-12m (fits within track boundsX=25)
    const postW = 0.6, postD = 0.8, postH = 4.2;
    const beamH = 0.5, beamD = 0.7;

    // Posts
    const postGeo = new THREE.BoxGeometry(postW, postH, postD);
    const leftPost = new THREE.Mesh(postGeo, postMat);
    const rightPost = new THREE.Mesh(postGeo, postMat);
    leftPost.position.set(-halfSpan, postH / 2, 0);
    rightPost.position.set(halfSpan, postH / 2, 0);
    gate.add(leftPost, rightPost);

    // Top beam
    const beamGeo = new THREE.BoxGeometry(halfSpan * 2 + postW, beamH, beamD);
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, postH + beamH / 2, 0);
    gate.add(beam);

    // Checkered banner hanging below the beam
    const bannerW = halfSpan * 2 - 2; // a bit inset from posts
    const bannerH = 1.8;
    const bannerGeo = new THREE.PlaneGeometry(bannerW, bannerH);
    if (!this.finishGateBannerMat) {
      const tex = this.makeFinishBannerTexture(20, 4);
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
      this.finishGateBannerMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        side: THREE.DoubleSide
      });
    }
    // Ensure the texture has the FINISH text if material existed from an older session
    else {
      const newTex = this.makeFinishBannerTexture(20, 4);
      newTex.wrapS = newTex.wrapT = THREE.ClampToEdgeWrapping;
      newTex.needsUpdate = true;
      this.finishGateBannerMat.map = newTex;
      this.finishGateBannerMat.needsUpdate = true;
    }
    const banner = new THREE.Mesh(bannerGeo, this.finishGateBannerMat);
    banner.rotation.y = Math.PI; // ensure texture faces camera similarly on both sides
    banner.position.set(0, postH - bannerH / 2, 0);
    gate.add(banner);

    // Place gate
    gate.position.set(0, 0, this.finishZ);
    gate.visible = false;

    // Replace old gate if any
    if (this.finishGate) {
      try { this.scene.remove(this.finishGate); } catch (e) {
        void e; // ignore error
      }
    }
    this.finishGate = gate;
    this.scene.add(gate);
  }

  private makeCheckerTexture(cols = 8, rows = 2): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const cw = canvas.width / cols;
    const ch = canvas.height / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const black = (r + c) % 2 === 0;
        ctx.fillStyle = black ? '#111' : '#eee';
        ctx.fillRect(c * cw, r * ch, cw, ch);
      }
    }
    return new THREE.CanvasTexture(canvas);
  }

  private makeFinishBannerTexture(cols = 20, rows = 4): THREE.CanvasTexture {
    // Create a high-res checker background with bold 'FINISH' text
    const canvas = document.createElement('canvas');
    canvas.width = 1024; // wide banner
    canvas.height = 256; // banner height
    const ctx = canvas.getContext('2d')!;
    // Checker background
    const cw = canvas.width / cols;
    const ch = canvas.height / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const black = (r + c) % 2 === 0;
        ctx.fillStyle = black ? '#111' : '#eee';
        ctx.fillRect(c * cw, r * ch, cw, ch);
      }
    }
    // Semi-transparent dark overlay for readability
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // FINISH text
    const text = 'FINISH';
    // Compute font size to fit width with padding
    let fontSize = 180;
    const padX = 40;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    do {
      ctx.font = `900 ${fontSize}px system-ui,-apple-system,Segoe UI,Roboto,sans-serif`;
      const w = ctx.measureText(text).width;
      if (w <= canvas.width - padX * 2 || fontSize <= 72) break;
      fontSize -= 4;
    } while (fontSize > 72);
    // Draw with shadow and stroke for contrast
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.lineWidth = Math.max(6, Math.floor(fontSize * 0.06));
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    ctx.fillStyle = '#ffffff';
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 6; // a bit lower aesthetically
    ctx.strokeText(text, cx, cy);
    ctx.fillText(text, cx, cy);
    ctx.restore();
    return new THREE.CanvasTexture(canvas);
  }
}

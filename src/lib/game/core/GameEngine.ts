import * as THREE from 'three';
import PhysicsEngine from './PhysicsEngine';
import InputManager from './InputManager';
import RenderSystem from '../systems/RenderSystem';
import ChaseCamera from '../systems/ChaseCamera';
import { ResourceManager } from '$lib/utils/ResourceManager';
import Car from '../entities/Car';
import Track from '../entities/Track';
import { get } from 'svelte/store';
import { settings } from '$lib/stores/settingsStore';
import CollisionSystem from '../systems/CollisionSystem';
import LapSystem from '../systems/LapSystem';
import AudioSystem from '../systems/AudioSystem';
import ScoreSystem from '../systems/ScoreSystem';
import EffectsSystem from '../systems/EffectsSystem';
import Environment from '../entities/Environment';

export default class GameEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private clock: THREE.Clock;
  private physics: PhysicsEngine;
  private input: InputManager;
  private renderSystem: RenderSystem;
  private chaseCamera: ChaseCamera;
  private running = false;
  private disposeBag: Array<() => void> = [];
  private car!: Car;
  private track!: Track;
  private collision!: CollisionSystem;
  private lap!: LapSystem;
  private score!: ScoreSystem;
  private effects!: EffectsSystem;
  private audio?: AudioSystem;
  private unsubSettings?: () => void;
  private throttleInput = 0;
  private steerSensitivity = 1;
  private environment?: Environment;

  public currentSpeed = 0;

  constructor(private container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);
    
    // Create renderer with explicit WebGL context settings
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Full screen size
    // Don't set clear color - let the beautiful sky dome handle background rendering
    
    this.clock = new THREE.Clock();
    this.physics = new PhysicsEngine();
    this.input = new InputManager(container);
    this.renderSystem = new RenderSystem(this.scene, this.camera, this.renderer);
    this.chaseCamera = new ChaseCamera(this.camera);
  }

  public init() {
    // Configure renderer first
    const s = get(settings);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, s.graphics.resolution));
    this.renderer.shadowMap.enabled = !!s.graphics.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Don't override clear color - let Environment handle the beautiful sky
    
    // Attach renderer to DOM
    this.updateSize();
    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.updateSize);
    this.disposeBag.push(() => window.removeEventListener('resize', this.updateSize));

    // Create beautiful environment first (this will set up the sky)
    this.environment = new Environment(this.renderer);
    this.environment.setup(this.scene);
    this.scene.add(this.environment.group);

  // Track and car
    this.track = new Track();
    this.scene.add(this.track.group);

    this.car = new Car({
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
    this.car.setPosition(0, 0.0, 0);
    this.car.setHeading(0);
    this.scene.add(this.car.group);
    
    // Set initial camera position to see the scene properly
    this.camera.position.set(0, 8, 15);
    this.camera.lookAt(0, 0, 0);
    
    // Initialize chase camera to follow the car immediately  
    this.chaseCamera.update(0, this.car.group);
    
  this.collision = new CollisionSystem(this.track.obstacles);

    // Initialize score system
    this.score = new ScoreSystem();

    // Initialize effects system
    this.effects = new EffectsSystem(this.scene, this.camera);

    // Audio
    this.audio = new AudioSystem(this.camera);
    // Apply initial settings and subscribe for changes
    this.applySettingsToAudio();
    const unsub = settings.subscribe(() => this.applySettingsToAudio());
    this.unsubSettings = () => unsub();
    // Try to resume audio on first key interaction (user gesture requirement)
    const resume = async () => {
      await this.audio?.resume();
      window.removeEventListener('keydown', resume, true);
      this.disposeBag = this.disposeBag.filter((fn) => fn !== removeResume);
    };
    const removeResume = () => window.removeEventListener('keydown', resume, true);
    window.addEventListener('keydown', resume, true);
    this.disposeBag.push(removeResume);

    // Simple checkpoints for infinite mode - distance-based laps
    this.lap = new LapSystem([
      { position: new THREE.Vector3(0, 0, 100), radius: 5 },
      { position: new THREE.Vector3(0, 0, 200), radius: 5 },
      { position: new THREE.Vector3(0, 0, 300), radius: 5 },
      { position: new THREE.Vector3(0, 0, 400), radius: 5 }
    ]);

    // Start loop
    this.running = true;
    this.clock.start();
    this.loop();
  }

  private loop = () => {
    if (!this.running) return;
    const dt = this.clock.getDelta();
    this.update(dt);
    this.render();
    requestAnimationFrame(this.loop);
  };

  public update(deltaTime: number) {
    this.physics.update(deltaTime);

    // Read input
  const throttle = Number(this.input.isDown('ArrowUp') || this.input.isDown('KeyW'));
  const brake = Number(this.input.isDown('ArrowDown') || this.input.isDown('KeyS'));
  const handbrake = this.input.isDown('Space');
  const boost = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight');
    const steerLeft = Number(this.input.isDown('ArrowLeft') || this.input.isDown('KeyA'));
    const steerRight = Number(this.input.isDown('ArrowRight') || this.input.isDown('KeyD'));
    const steering = THREE.MathUtils.clamp((steerLeft - steerRight) * this.steerSensitivity, -1, 1);
  this.car.setInputs({ throttle, brake, steering, handbrake, boost });
  this.throttleInput = throttle;
    this.car.update(deltaTime);
    this.currentSpeed = this.car.getSpeed();

    // Camera follow
    this.chaseCamera.update(deltaTime, this.car.group);

    // Update infinite track based on car position
    this.track.update(this.car.group.position.z);
    
    // Update infinite environment
    this.environment?.update(this.car.group.position.z);

    // Update score system
    this.score.update(deltaTime, this.car.group.position, this.currentSpeed);

    // Update effects system
    this.effects.update(deltaTime);

    // Create boost effect when boosting
    const isBoosting = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight');
    if (isBoosting && this.throttleInput > 0) {
      this.effects.createBoostEffect(this.car.group.position);
    }

  // Collisions: approximate car as a 1x2 box (matching placeholder mesh)
  const p = this.car.group.position;
  const halfX = 0.6; // matches chassis width ~1.2
  const halfZ = 1.2; // matches chassis length ~2.4
  const carAabb = { minX: p.x - halfX, maxX: p.x + halfX, minZ: p.z - halfZ, maxZ: p.z + halfZ };
  const beforeVel = this.car.getVelocityRef().clone();
  const collided = this.collision.resolve(p, this.car.getVelocityRef(), carAabb as any);
  if (collided) {
    const afterVel = this.car.getVelocityRef();
    const delta = beforeVel.clone().sub(afterVel);
    const impact = THREE.MathUtils.clamp(delta.length() * 0.1, 0, 1);
    this.audio?.playCollision(impact);
    
    // Score penalty for collision and create collision effect
    this.score.subtractCollisionPenalty();
    this.effects.createCollisionEffect(this.car.group.position, impact);
  }

    // Only check X bounds to keep car on track, allow infinite Z movement
    const boundsX = 25; // Allow wider X movement
    if (Math.abs(p.x) > boundsX) {
      p.x = THREE.MathUtils.clamp(p.x, -boundsX, boundsX);
    }
    // Remove Z bounds for infinite forward movement
    
    if (this.input.isDown('KeyR')) {
      this.car.reset(new THREE.Vector3(0, 0, 0), 0);
    }

    // Laps
    this.lap.update(performance.now(), this.car.group.position);

    // Audio: engine
    this.audio?.setEngine(this.throttleInput, this.currentSpeed, this.car.config.maxSpeed);

    // Camera boost visual
    const boostLevel = this.getBoostLevel?.() ?? 0;
    this.chaseCamera.setBoostVisual(1 - boostLevel < 0.001 ? 0 : (this.throttleInput > 0 ? 1 - boostLevel * 0.2 : 0));
  }

  public render() {
    this.renderSystem.render();
  }

  private updateSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderSystem.updateSize?.(w, h);
  };

  public destroy() {
    this.running = false;
    this.clock.stop();
    this.disposeBag.forEach((fn) => fn());
    this.unsubSettings?.();
  this.environment?.dispose(this.scene);
  ResourceManager.disposeScene(this.scene);
    this.renderer.dispose();
    this.input.destroy();
    this.audio?.destroy();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  public getLapHud() {
    const t = this.lap.getHudTimes();
    return t;
  }

  public getBoostLevel() {
    // Gracefully handle absence
    return (this.car as any)?.getBoostLevel ? (this.car as any).getBoostLevel() : 0;
  }

  public getScore() {
    return this.score.getScoreData();
  }

  private applySettingsToAudio() {
    const s = get(settings);
    this.steerSensitivity = s?.controls?.sensitivity ?? 1;
    this.audio?.updateFromSettings(s as any);
  }
}

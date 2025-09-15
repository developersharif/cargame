import * as THREE from 'three';

export interface CarConfig {
  mass: number;
  maxSpeed: number;
  acceleration: number;
  braking: number;
  handling: number; // steering response
  drag: number; // linear damping
  lateralGrip: number; // per-second damping of lateral velocity
  reverseScale: number; // reverse speed/accel scale (0..1)
  handbrakeGrip: number; // multiplier for grip while handbrake held (0..1)
  boost?: {
    multiplier: number; // scales accel and max forward speed when active
    capacity: number; // total capacity in seconds at full drain (normalized to 1 internally)
    drain: number; // per-second drain of normalized charge while active (0..1/s)
    regen: number; // per-second regen of normalized charge while inactive (0..1/s)
  };
}

export default class Car {
  public readonly group: THREE.Group = new THREE.Group();
  private visuals: THREE.Group = new THREE.Group();
  private velocity = new THREE.Vector3();
  private heading = 0; // radians, 0 = +Z
  private steering = 0; // -1..1
  private throttle = 0; // 0..1
  private brake = 0; // 0..1
  private handbrake = false;
  private boost = false;
  private boostCharge = 1; // 0..1
  private tmp = new THREE.Vector3();
  private wheels: { fl: THREE.Group; fr: THREE.Group; rl: THREE.Group; rr: THREE.Group } | null = null;
  private headlights: THREE.Mesh[] = [];
  private brakelights: THREE.Mesh[] = [];
  // Light sources to cast illumination in scene
  private headlightSpots: THREE.SpotLight[] = [];
  private tailLightPoints: THREE.PointLight[] = [];
  private reverseLights: THREE.Mesh[] = [];
  private reverseLightPoints: THREE.PointLight[] = [];
  private prevForwardSpeed = 0; // for detecting deceleration

  constructor(public config: CarConfig, color = 0x2196f3) {
  // Visual container (allows body roll/pitch without affecting physics root)
  this.group.add(this.visuals);

    // Enhanced car paint material with realistic properties
    const paintMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1.5,
      transparent: false
    });
    
    // Create clearcoat effect for car paint
    const clearcoatCanvas = document.createElement('canvas');
    clearcoatCanvas.width = clearcoatCanvas.height = 256;
    const clearCtx = clearcoatCanvas.getContext('2d')!;
    const clearGrad = clearCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    clearGrad.addColorStop(0, 'rgba(255,255,255,0.8)');
    clearGrad.addColorStop(1, 'rgba(255,255,255,0.3)');
    clearCtx.fillStyle = clearGrad;
    clearCtx.fillRect(0, 0, 256, 256);
    
    const clearcoatTexture = new THREE.CanvasTexture(clearcoatCanvas);
    paintMaterial.map = clearcoatTexture;

  // Chassis with enhanced materials
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.36, 2.5), paintMaterial);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    chassis.position.y = 0.32;
  this.visuals.add(chassis);

    // Glass material for cabin
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xaddcff,
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.3,
      envMapIntensity: 2.0
    });

  // Cabin/top with glass material
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.3, 1.0), glassMaterial);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    cabin.position.set(0, 0.57, -0.1);
  this.visuals.add(cabin);

    // Simple hood and bumpers to improve silhouette
    const blackTrim = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.7 });
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.08, 0.8), paintMaterial);
  // Front is +Z; place hood toward +Z
  hood.position.set(0, 0.48, 0.9);
    hood.castShadow = true;
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.18, 0.24), blackTrim);
  frontBumper.position.set(0, 0.26, 1.28);
    frontBumper.castShadow = true;
  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.18, 0.24), blackTrim);
  rearBumper.position.set(0, 0.26, -1.28);
    rearBumper.castShadow = true;
    const sideSkirtL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 1.8), blackTrim);
    sideSkirtL.position.set(-0.65, 0.23, 0);
    const sideSkirtR = sideSkirtL.clone();
    sideSkirtR.position.x = 0.65;
    this.visuals.add(hood, frontBumper, rearBumper, sideSkirtL, sideSkirtR);

    // Enhanced wheels with realistic materials
    const makeWheel = () => {
      const g = new THREE.Group();
      
      // High-performance tire material
      const tyreMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.95,
        metalness: 0.0,
        normalScale: new THREE.Vector2(0.8, 0.8)
      });
      
      // Create tire with sidewall details
      const tyre = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.16, 24),
        tyreMaterial
      );
      tyre.castShadow = true;
      tyre.receiveShadow = true;
      tyre.rotation.z = Math.PI / 2;
      
      // Premium alloy rim material
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 0.95,
        roughness: 0.05,
        envMapIntensity: 2.0
      });
      
      // Multi-spoke alloy rim
      const rimBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.18, 16),
        rimMaterial
      );
      rimBase.rotation.z = Math.PI / 2;
      rimBase.castShadow = true;
      
      // Brake disc
      const discMaterial = new THREE.MeshStandardMaterial({
        color: 0x404040,
        metalness: 0.8,
        roughness: 0.3
      });
      const brakeDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32),
        discMaterial
      );
      brakeDisc.rotation.z = Math.PI / 2;
      brakeDisc.position.z = -0.05;
      brakeDisc.castShadow = true;
      
      g.add(tyre, rimBase, brakeDisc);
      return g;
    };
    const fl = new THREE.Group();
    const fr = new THREE.Group();
    const rl = new THREE.Group();
    const rr = new THREE.Group();
    const wfl = makeWheel();
    const wfr = makeWheel();
    const wrl = makeWheel();
    const wrr = makeWheel();
    fl.add(wfl);
    fr.add(wfr);
    rl.add(wrl);
    rr.add(wrr);
    const track = 0.7; // half-width offset from center
    const wb = 1.2; // half-length from center
    fl.position.set(-track, 0.28, -wb);
    fr.position.set(track, 0.28, -wb);
    rl.position.set(-track, 0.28, wb);
    rr.position.set(track, 0.28, wb);
    this.visuals.add(fl, fr, rl, rr);
    this.wheels = { fl, fr, rl, rr };

    // Enhanced lighting with realistic materials
    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 3,
      metalness: 0.1,
      roughness: 0.0,
      transparent: true,
      opacity: 0.9
    });
    
    const brakelightMaterial = new THREE.MeshStandardMaterial({
      color: 0x660000,
      emissive: 0xff2020,
      emissiveIntensity: 0,
      metalness: 0.0,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    // Enhanced headlight design
  const headL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 8), headlightMaterial);
    const headR = headL.clone();
  // Place headlights at the front (+Z)
  headL.position.set(-0.32, 0.29, 1.25);
  headR.position.set(0.32, 0.29, 1.25);
    
    // LED-style brake lights
    const brakeL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.02), brakelightMaterial.clone());
    const brakeR = brakeL.clone();
  // Place brake lights at the rear (-Z)
  brakeL.position.set(-0.34, 0.3, -1.25);
  brakeR.position.set(0.34, 0.3, -1.25);
    
    this.visuals.add(headL, headR, brakeL, brakeR);
    this.headlights = [headL, headR];
    this.brakelights = [brakeL, brakeR];

    // Reverse lights (white), initially off
    const reverseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0,
      metalness: 0.0,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });
  const revL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.02), reverseMat);
    const revR = revL.clone();
  // Reverse lights are also at rear (-Z)
  revL.position.set(-0.12, 0.26, -1.26);
  revR.position.set(0.12, 0.26, -1.26);
    this.visuals.add(revL, revR);
    this.reverseLights = [revL, revR];

    // Actual light sources for better look & feel
    // Headlight spotlights
    const makeHeadSpot = (anchor: THREE.Object3D) => {
      const spot = new THREE.SpotLight(0xffffff, 1.2, 12, THREE.MathUtils.degToRad(25), 0.35, 1.2);
      spot.castShadow = true;
      // Slightly forward from the headlight mesh; aim forward (+Z)
      spot.position.copy(anchor.position).add(new THREE.Vector3(0, 0, 0.05));
      spot.target.position.set(anchor.position.x, anchor.position.y - 0.05, anchor.position.z + 4);
      this.visuals.add(spot, spot.target);
      return spot;
    };
    const spotL = makeHeadSpot(headL);
    const spotR = makeHeadSpot(headR);
    this.headlightSpots = [spotL, spotR];

    // Tail/brake point lights (soft red glow)
    const makeTailPoint = (pos: THREE.Vector3) => {
      const p = new THREE.PointLight(0xff2211, 0.2, 4, 1.8);
      p.position.copy(pos);
      this.visuals.add(p);
      return p;
    };
    this.tailLightPoints = [
      makeTailPoint(brakeL.position.clone()),
      makeTailPoint(brakeR.position.clone())
    ];

    // Reverse point lights (white), off by default
    const makeReversePoint = (pos: THREE.Vector3) => {
      const p = new THREE.PointLight(0xffffff, 0.0, 4, 2.0);
      p.position.copy(pos);
      this.visuals.add(p);
      return p;
    };
    this.reverseLightPoints = [
      makeReversePoint(revL.position.clone()),
      makeReversePoint(revR.position.clone())
    ];
  }

  setPosition(x: number, y: number, z: number) {
    this.group.position.set(x, y, z);
  }

  setHeading(rad: number) {
    this.heading = rad;
    this.group.rotation.y = rad;
  }

  setInputs({ throttle, brake, steering, handbrake = false, boost = false }: { throttle: number; brake: number; steering: number; handbrake?: boolean; boost?: boolean }) {
    this.throttle = THREE.MathUtils.clamp(throttle, 0, 1);
    this.brake = THREE.MathUtils.clamp(brake, 0, 1);
    this.steering = THREE.MathUtils.clamp(steering, -1, 1);
    this.handbrake = !!handbrake;
    this.boost = !!boost;
  }

  getSpeed() {
    return this.velocity.length();
  }

  // Returns a mutable reference for systems (e.g., collisions) to adjust velocity
  getVelocityRef() {
    return this.velocity;
  }

  getHeading() {
    return this.heading;
  }

  getBoostLevel() {
    return this.boostCharge;
  }

  reset(position: THREE.Vector3, heading = 0) {
    this.group.position.copy(position);
    this.heading = heading;
    this.group.rotation.y = heading;
    this.velocity.set(0, 0, 0);
  }

  update(dt: number) {
    const cfg = this.config;
    const boostCfg = {
      multiplier: 1.25,
      capacity: 5,
      drain: 0.5, // per second of normalized charge
      regen: 0.2
    };
    if (cfg.boost) {
      boostCfg.multiplier = cfg.boost.multiplier ?? boostCfg.multiplier;
      boostCfg.capacity = cfg.boost.capacity ?? boostCfg.capacity;
      boostCfg.drain = cfg.boost.drain ?? boostCfg.drain;
      boostCfg.regen = cfg.boost.regen ?? boostCfg.regen;
    }

    // Charge changes (normalized 0..1). Active only while throttle > 0, not handbraking.
    const canBoost = this.throttle > 0.05 && !this.handbrake;
    const boostActive = this.boost && this.boostCharge > 0.001 && canBoost;
    if (boostActive) {
      this.boostCharge = Math.max(0, this.boostCharge - boostCfg.drain * dt);
    } else {
      this.boostCharge = Math.min(1, this.boostCharge + boostCfg.regen * dt);
    }

  // Update heading from steering scaled by speed. Limit steering at high speeds for stability.
  const speedRatio = Math.min(1, this.getSpeed() / cfg.maxSpeed);
  const highSpeedLimit = THREE.MathUtils.lerp(1, 0.45, speedRatio); // full at low speed, 45% at high
  const effectiveSteer = this.steering * highSpeedLimit;
  const steerAmount = effectiveSteer * cfg.handling * (0.5 + 0.5 * speedRatio);
    this.heading += steerAmount * dt;
    this.group.rotation.y = this.heading;

    // Forward direction (local +Z)
    const forward = this.tmp.set(Math.sin(this.heading), 0, Math.cos(this.heading)).normalize();

    // Acceleration and braking
  const accelMul = boostActive ? boostCfg.multiplier : 1;
  const accel = cfg.acceleration * accelMul * this.throttle;
    const brakeDecel = cfg.braking * this.brake;

  // Decompose velocity into forward/lateral components
  const forwardComponent = this.velocity.dot(forward); // signed speed along forward (+ forward, - reverse)
  let vForward = forward.clone().multiplyScalar(forwardComponent);
  let vLateral = this.velocity.clone().sub(vForward);

    // Throttle applies forward accel
    if (accel > 0) {
      vForward.add(forward.clone().multiplyScalar(accel * dt));
    }

    // Braking or reverse behavior
    if (this.brake > 0) {
      const forwardThreshold = 0.2; // m/s threshold to consider as moving forward
      if (forwardComponent > forwardThreshold) {
        // Moving forward: brake reduces forward speed
        const newLen = Math.max(0, forwardComponent - brakeDecel * dt);
        vForward.copy(forward).multiplyScalar(newLen);
      } else {
        // Stopped or moving backward: engage reverse acceleration
        const reverseAccel = cfg.acceleration * cfg.reverseScale * this.brake;
        vForward.add(forward.clone().multiplyScalar(-reverseAccel * dt));
        // Limit reverse speed
        const maxReverse = cfg.maxSpeed * cfg.reverseScale;
        const revAlongForward = vForward.dot(forward); // negative when reversing
        if (-revAlongForward > maxReverse) {
          vForward.copy(forward).multiplyScalar(-maxReverse);
        }
      }
    }

    // Lateral grip (damp side slip), reduced when handbrake is held
    const effectiveGrip = cfg.lateralGrip * (this.handbrake ? cfg.handbrakeGrip : 1);
    const gripFactor = Math.max(0, 1 - effectiveGrip * dt);
    vLateral.multiplyScalar(gripFactor);

    // Recombine
    this.velocity.copy(vForward.add(vLateral));

    // Drag
    this.velocity.multiplyScalar(Math.max(0, 1 - cfg.drag * dt));

    // Clamp speed
  const speed = this.velocity.length();
  const forwardSpeed = this.velocity.dot(forward);
    const maxSpeedForward = cfg.maxSpeed * (boostActive ? boostCfg.multiplier : 1);
    if (forwardSpeed >= 0 && speed > maxSpeedForward) {
      this.velocity.multiplyScalar(maxSpeedForward / speed);
    } else if (forwardSpeed < 0) {
      const maxReverse = cfg.maxSpeed * cfg.reverseScale;
      if (Math.abs(forwardSpeed) > maxReverse) {
        // clamp reverse by scaling along forward axis
        const vFor = forward.clone().multiplyScalar(forwardSpeed);
        const vLat = this.velocity.clone().sub(vFor);
        const clampedFor = forward.clone().multiplyScalar(-maxReverse);
        this.velocity.copy(clampedFor.add(vLat));
      }
    }

    // Update position
  this.group.position.addScaledVector(this.velocity, dt);

  // Store deceleration for light logic
  const decel = (this.prevForwardSpeed - forwardComponent) / Math.max(1e-6, dt);
  this.prevForwardSpeed = forwardComponent;

  // Visuals: steer front wheels and rotate them based on forward speed
    if (this.wheels) {
      const steerAngle = THREE.MathUtils.degToRad(25) * this.steering;
      this.wheels.fl.rotation.y = steerAngle;
      this.wheels.fr.rotation.y = steerAngle;
      // spin: project velocity on local forward
      const forward = this.tmp.set(Math.sin(this.heading), 0, Math.cos(this.heading)).normalize();
      const forwardSpeed = this.velocity.dot(forward);
      const spin = (forwardSpeed / (2 * Math.PI * 0.28)) * 2 * Math.PI * dt; // circumference r=0.28
      for (const w of [this.wheels.fl, this.wheels.fr, this.wheels.rl, this.wheels.rr]) {
        // cylinders rotated on Z, spin around X
        w.children.forEach((c) => (c.rotation.x -= spin));
      }

      // simple suspension compression: move wheel groups a bit based on accel/brake
      const lat = this.velocity.clone().sub(forward.clone().multiplyScalar(forwardSpeed));
      const accel = (forwardSpeed - 0) / Math.max(1e-6, dt); // approx, since we don't store previous speed
      const pitch = THREE.MathUtils.clamp((-accel) * 0.0008, -0.06, 0.06); // nose up on accel, down on brake
      const roll = THREE.MathUtils.clamp(-lat.x * 0.02, -0.1, 0.1); // roll opposite to lateral slip
      // Smooth toward target
      this.visuals.rotation.x += (pitch - this.visuals.rotation.x) * Math.min(1, 8 * dt);
      this.visuals.rotation.z += (roll - this.visuals.rotation.z) * Math.min(1, 8 * dt);
      // wheel compression
      const compFront = THREE.MathUtils.clamp(pitch * 0.6, -0.08, 0.08);
      const compRear = THREE.MathUtils.clamp(-pitch * 0.6, -0.08, 0.08);
      this.wheels.fl.position.y = 0.28 + compFront;
      this.wheels.fr.position.y = 0.28 + compFront;
      this.wheels.rl.position.y = 0.28 + compRear;
      this.wheels.rr.position.y = 0.28 + compRear;
    }

  // Tail/brake lights: keep a dim tail glow; ramp up when braking, hard decel, or reversing
  const baseTail = 0.6;
  const isHardDecel = decel > 6.0; // m/s^2 threshold
  const reversingForTail = forwardComponent < -0.2; // brighten red while backing up
  const braking = this.brake > 0.1 || isHardDecel || reversingForTail;
  const targetBrakeEmissive = braking ? 3.8 : baseTail;
    for (const m of this.brakelights) {
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetBrakeEmissive, Math.min(1, 12 * dt));
    }
    // Sync tail light point lights: dim glow baseline, brighter on brake
    const targetTailLight = braking ? 1.1 : 0.18;
    this.tailLightPoints.forEach((p) => (p.intensity = THREE.MathUtils.lerp(p.intensity, targetTailLight, Math.min(1, 10 * dt))));

    // Reverse lights: on when moving significantly backward and not braking hard
    const reversing = forwardComponent < -0.4 && this.brake < 0.2;
    const revTarget = reversing ? 2.0 : 0.0;
    for (const m of this.reverseLights) {
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, revTarget, Math.min(1, 10 * dt));
    }
    this.reverseLightPoints.forEach((p) => (p.intensity = THREE.MathUtils.lerp(p.intensity, reversing ? 0.8 : 0.0, Math.min(1, 10 * dt))));
  }
}

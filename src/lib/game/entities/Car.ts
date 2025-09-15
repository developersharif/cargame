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

    // Create realistic car materials
    const createCarPaintMaterial = (baseColor: number) => {
      const material = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: 0.95,
        roughness: 0.08,
        envMapIntensity: 2.2
      });
      return material;
    };

    const paintMaterial = createCarPaintMaterial(color);
    
    // Create realistic body components
    this.createBodyPanels(paintMaterial);
    this.createWindows();
    this.createGrille();
    this.createDetails();
    this.createRealisticWheels();
    this.createLightingSystem();
  }

  private createBodyPanels(paintMaterial: THREE.MeshStandardMaterial) {
    // Main chassis with curved surfaces
    const chassisGeometry = new THREE.BoxGeometry(1.24, 0.36, 2.6);
    // Round the chassis edges
    chassisGeometry.parameters.widthSegments = 3;
    chassisGeometry.parameters.heightSegments = 2;
    chassisGeometry.parameters.depthSegments = 4;
    
    const chassis = new THREE.Mesh(chassisGeometry, paintMaterial);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    chassis.position.y = 0.32;
    this.visuals.add(chassis);

    // Hood with realistic curves
    const hoodGeometry = new THREE.BoxGeometry(1.1, 0.08, 0.9);
    const hood = new THREE.Mesh(hoodGeometry, paintMaterial);
    hood.position.set(0, 0.52, 0.95);
    hood.castShadow = true;
    hood.receiveShadow = true;
    this.visuals.add(hood);

    // Doors with panel lines
    const createDoor = (side: number) => {
      const doorGeometry = new THREE.BoxGeometry(0.04, 0.28, 0.8);
      const door = new THREE.Mesh(doorGeometry, paintMaterial);
      door.position.set(side * 0.64, 0.38, 0.1);
      door.castShadow = true;
      door.receiveShadow = true;
      return door;
    };
    
    const doorLeft = createDoor(-1);
    const doorRight = createDoor(1);
    this.visuals.add(doorLeft, doorRight);

    // Fenders
    const fenderMaterial = paintMaterial.clone();
    const createFender = (x: number, z: number) => {
      const fenderGeometry = new THREE.BoxGeometry(0.18, 0.22, 0.6);
      const fender = new THREE.Mesh(fenderGeometry, fenderMaterial);
      fender.position.set(x, 0.36, z);
      fender.castShadow = true;
      fender.receiveShadow = true;
      return fender;
    };
    
    // Front and rear fenders
    this.visuals.add(
      createFender(-0.68, 0.9),   // front left
      createFender(0.68, 0.9),    // front right
      createFender(-0.68, -0.9),  // rear left
      createFender(0.68, -0.9)    // rear right
    );

    // Bumpers with realistic design
    const blackTrim = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      metalness: 0.3, 
      roughness: 0.8 
    });
    
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.2, 0.28), blackTrim);
    frontBumper.position.set(0, 0.26, 1.32);
    frontBumper.castShadow = true;
    frontBumper.receiveShadow = true;
    
    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.2, 0.28), blackTrim);
    rearBumper.position.set(0, 0.26, -1.32);
    rearBumper.castShadow = true;
    rearBumper.receiveShadow = true;
    
    this.visuals.add(frontBumper, rearBumper);

    // Side skirts
    const createSideSkirt = (side: number) => {
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 1.8), blackTrim);
      skirt.position.set(side * 0.66, 0.22, 0);
      skirt.castShadow = true;
      skirt.receiveShadow = true;
      return skirt;
    };
    
    this.visuals.add(createSideSkirt(-1), createSideSkirt(1));
  }

  private createWindows() {
    // Realistic glass material
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x87ceeb,
      metalness: 0.0,
      roughness: 0.0,
      transparent: true,
      opacity: 0.25,
      envMapIntensity: 3.0
    });

    // Main cabin/windshield
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.32, 1.1), glassMaterial);
    cabin.position.set(0, 0.58, -0.05);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    this.visuals.add(cabin);

    // Window frames (chrome/black trim)
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.2
    });

    // A-pillars
    const createAPillar = (side: number) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.08), frameMaterial);
      pillar.position.set(side * 0.52, 0.58, 0.46);
      pillar.castShadow = true;
      return pillar;
    };
    
    this.visuals.add(createAPillar(-1), createAPillar(1));
  }

  private createGrille() {
    // Chrome/black grille material
    const grilleMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.7,
      roughness: 0.3
    });

    // Main grille
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 0.05), grilleMaterial);
    grille.position.set(0, 0.32, 1.28);
    grille.castShadow = true;
    grille.receiveShadow = true;
    this.visuals.add(grille);

    // Grille bars
    for (let i = 0; i < 6; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.02), grilleMaterial);
      bar.position.set(-0.3 + i * 0.12, 0.32, 1.3);
      bar.castShadow = true;
      this.visuals.add(bar);
    }
  }

  private createDetails() {
    // Chrome material for trim
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 2.5
    });

    // Black plastic material
    const plasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.1,
      roughness: 0.9
    });

    // Side mirrors
    const createMirror = (side: number) => {
      const mirrorBase = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.1), plasticMaterial);
      mirrorBase.position.set(side * 0.65, 0.55, 0.35);
      
      const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), chromeMaterial);
      mirrorGlass.position.set(side * 0.68, 0.55, 0.35);
      
      mirrorBase.castShadow = true;
      mirrorGlass.castShadow = true;
      
      return [mirrorBase, mirrorGlass];
    };
    
    const [mirrorBaseL, mirrorGlassL] = createMirror(-1);
    const [mirrorBaseR, mirrorGlassR] = createMirror(1);
    this.visuals.add(mirrorBaseL, mirrorGlassL, mirrorBaseR, mirrorGlassR);

    // Door handles
    const createDoorHandle = (side: number) => {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.08), chromeMaterial);
      handle.position.set(side * 0.64, 0.4, 0.2);
      handle.castShadow = true;
      return handle;
    };
    
    this.visuals.add(createDoorHandle(-1), createDoorHandle(1));

    // License plates
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.7
    });
    
    const frontPlate = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.02), plateMaterial);
    frontPlate.position.set(0, 0.22, 1.35);
    frontPlate.castShadow = true;
    
    const rearPlate = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.02), plateMaterial);
    rearPlate.position.set(0, 0.22, -1.35);
    rearPlate.castShadow = true;
    
    this.visuals.add(frontPlate, rearPlate);

    // Windshield wipers
    const wiperMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.4,
      roughness: 0.6
    });
    
    const createWiper = (side: number) => {
      const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.25), wiperMaterial);
      wiper.position.set(side * 0.15, 0.75, 0.3);
      wiper.castShadow = true;
      return wiper;
    };
    
    this.visuals.add(createWiper(-1), createWiper(1));
  }

  private createRealisticWheels() {
    // Realistic tire material with texture
    const createTireMaterial = () => {
      const material = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.95,
        metalness: 0.0
      });
      
      // Create simple tire tread texture
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, 128, 128);
      
      // Add tread pattern
      ctx.strokeStyle = '#0f0f0f';
      ctx.lineWidth = 2;
      for (let i = 0; i < 128; i += 8) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(128, i);
        ctx.stroke();
      }
      
      const treadTexture = new THREE.CanvasTexture(canvas);
      treadTexture.wrapS = treadTexture.wrapT = THREE.RepeatWrapping;
      treadTexture.repeat.set(4, 4);
      material.map = treadTexture;
      
      return material;
    };

    const tireMaterial = createTireMaterial();

    // Premium alloy rim material
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd0d0d0,
      metalness: 0.95,
      roughness: 0.08,
      envMapIntensity: 2.2
    });

    // Brake system materials
    const discMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.2
    });

    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3333,
      metalness: 0.3,
      roughness: 0.7
    });

    const makeWheel = () => {
      const wheelGroup = new THREE.Group();
      
      // Main tire
      const tire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 0.2, 24),
        tireMaterial
      );
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      tire.receiveShadow = true;
      
      // Rim with spokes
      const rimBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.22, 16),
        rimMaterial
      );
      rimBase.rotation.z = Math.PI / 2;
      rimBase.castShadow = true;
      
      // Spokes
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const spoke = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.24, 0.02),
          rimMaterial
        );
        spoke.position.set(Math.cos(angle) * 0.08, Math.sin(angle) * 0.08, 0);
        spoke.rotation.z = angle;
        spoke.castShadow = true;
        rimBase.add(spoke);
      }
      
      // Brake disc
      const brakeDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.02, 32),
        discMaterial
      );
      brakeDisc.rotation.z = Math.PI / 2;
      brakeDisc.position.z = -0.08;
      brakeDisc.castShadow = true;
      
      // Brake caliper
      const caliper = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.12, 0.04),
        caliperMaterial
      );
      caliper.position.set(0, 0.2, -0.05);
      caliper.castShadow = true;
      
      wheelGroup.add(tire, rimBase, brakeDisc, caliper);
      return wheelGroup;
    };

    // Create wheel assemblies
    const wheels = {
      fl: new THREE.Group(),
      fr: new THREE.Group(),
      rl: new THREE.Group(),
      rr: new THREE.Group()
    };

    Object.values(wheels).forEach(wheelGroup => {
      const wheel = makeWheel();
      wheelGroup.add(wheel);
    });

    // Position wheels
    const track = 0.72; // half-width
    const wheelbase = 1.25; // half-length
    
    wheels.fl.position.set(-track, 0.32, wheelbase);
    wheels.fr.position.set(track, 0.32, wheelbase);
    wheels.rl.position.set(-track, 0.32, -wheelbase);
    wheels.rr.position.set(track, 0.32, -wheelbase);

    this.visuals.add(wheels.fl, wheels.fr, wheels.rl, wheels.rr);
    this.wheels = wheels;
  }

  private createLightingSystem() {
    // Enhanced lighting materials
    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 4.0,
      metalness: 0.1,
      roughness: 0.0,
      transparent: true,
      opacity: 0.95
    });
    
    const brakelightMaterial = new THREE.MeshStandardMaterial({
      color: 0x880000,
      emissive: 0xff2020,
      emissiveIntensity: 0,
      metalness: 0.0,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9
    });

    // Modern LED headlights
    const createHeadlight = (side: number) => {
      const headlightGroup = new THREE.Group();
      
      // Main lens
      const lens = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 8),
        headlightMaterial
      );
      
      // LED ring detail
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.07, 0.09, 16),
        headlightMaterial.clone()
      );
      ring.position.z = 0.01;
      
      headlightGroup.add(lens, ring);
      headlightGroup.position.set(side * 0.35, 0.32, 1.28);
      
      return { group: headlightGroup, lens };
    };

    const leftHead = createHeadlight(-1);
    const rightHead = createHeadlight(1);
    
    this.visuals.add(leftHead.group, rightHead.group);
    this.headlights = [leftHead.lens, rightHead.lens];

    // Modern LED taillights
    const createTaillight = (side: number) => {
      const taillightGroup = new THREE.Group();
      
      // Main brake light
      const brakeLight = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.15, 0.03),
        brakelightMaterial.clone()
      );
      
      // Turn signal (amber)
      const turnSignal = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.06, 0.02),
        new THREE.MeshStandardMaterial({
          color: 0xff8800,
          emissive: 0xff8800,
          emissiveIntensity: 0,
          transparent: true,
          opacity: 0.8
        })
      );
      turnSignal.position.set(side * 0.1, 0.05, 0.01);
      
      taillightGroup.add(brakeLight, turnSignal);
      taillightGroup.position.set(side * 0.38, 0.32, -1.28);
      
      return { group: taillightGroup, brake: brakeLight, turn: turnSignal };
    };

    const leftTail = createTaillight(-1);
    const rightTail = createTaillight(1);
    
    this.visuals.add(leftTail.group, rightTail.group);
    this.brakelights = [leftTail.brake, rightTail.brake];

    // Reverse lights
    const reverseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0,
      metalness: 0.0,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });

    const createReverseLight = (side: number) => {
      const reverse = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.08, 0.02),
        reverseMaterial.clone()
      );
      reverse.position.set(side * 0.15, 0.25, -1.29);
      return reverse;
    };

    const revLeft = createReverseLight(-1);
    const revRight = createReverseLight(1);
    
    this.visuals.add(revLeft, revRight);
    this.reverseLights = [revLeft, revRight];

    // Light sources for scene illumination
    // Headlight spotlights with realistic parameters
    const createHeadlightSpot = (position: THREE.Vector3) => {
      const spot = new THREE.SpotLight(0xffffff, 1.5, 15, THREE.MathUtils.degToRad(30), 0.3, 1.0);
      spot.position.copy(position).add(new THREE.Vector3(0, 0, 0.1));
      spot.target.position.copy(position).add(new THREE.Vector3(0, -0.1, 5));
      spot.castShadow = true;
      spot.shadow.mapSize.width = 1024;
      spot.shadow.mapSize.height = 1024;
      this.visuals.add(spot, spot.target);
      return spot;
    };

    this.headlightSpots = [
      createHeadlightSpot(leftHead.group.position),
      createHeadlightSpot(rightHead.group.position)
    ];

    // Tail light point lights
    const createTailPoint = (position: THREE.Vector3) => {
      const point = new THREE.PointLight(0xff2211, 0.25, 5, 1.5);
      point.position.copy(position);
      this.visuals.add(point);
      return point;
    };

    this.tailLightPoints = [
      createTailPoint(leftTail.group.position),
      createTailPoint(rightTail.group.position)
    ];

    // Reverse light point lights
    const createReversePoint = (position: THREE.Vector3) => {
      const point = new THREE.PointLight(0xffffff, 0.0, 5, 2.0);
      point.position.copy(position);
      this.visuals.add(point);
      return point;
    };

    this.reverseLightPoints = [
      createReversePoint(revLeft.position),
      createReversePoint(revRight.position)
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

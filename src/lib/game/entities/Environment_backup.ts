import * as THREE from 'three';

export default class Environment {
  public group = new THREE.Group();
  private envRT?: THREE.WebGLRenderTarget;
  private pmrem?: THREE.PMREMGenerator;
  private groundSegments: THREE.Mesh[] = [];
  private segmentSize = 200;
  private lastPlayerZ = 0;

  constructor(private renderer: THREE.WebGLRenderer) {}

    }

  private addRaceTrackProps(): void {EE.Scene) {
    // Enhanced sky gradient and atmospheric effects
    const skyTop = new THREE.Color(0x87CEEB);
    const skyBottom = new THREE.Color(0x6495ED);
    scene.background = skyTop.clone();
    scene.fog = new THREE.Fog(0xc0d6e8, 80, 400);

    // Professional lighting setup with multiple light sources
    const hemi = new THREE.HemisphereLight(0x87CEEB, 0x2c5530, 0.4);
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    
    // Primary sun light with enhanced shadows
    const sunLight = new THREE.DirectionalLight(0xfff8dc, 3.0);
    sunLight.position.set(100, 150, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.setScalar(8192); // Higher quality shadows
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 1000;
    sunLight.shadow.camera.left = -200;
    sunLight.shadow.camera.right = 200;
    sunLight.shadow.camera.top = 200;
    sunLight.shadow.camera.bottom = -200;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.radius = 12;
    
    // Secondary fill light for better illumination
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 1.0);
    fillLight.position.set(-50, 100, -50);
    fillLight.castShadow = false;
    
    // Warm accent light for atmosphere
    const accentLight = new THREE.PointLight(0xffd700, 0.5, 100);
    accentLight.position.set(50, 20, 0);
    
    this.group.add(hemi, ambient, sunLight, fillLight, accentLight);

    // Professional asphalt ground with realistic textures - Create initial segments
    this.createGroundSegments(0);

    // Enhanced road markings with glow effects
    this.addRoadMarkings();

    // Beautiful environment props
    this.addRaceTrackProps();

    // Trees and lamp posts are now generated infinitely with track segments
    // See Track.ts addSegmentTrees() and addSegmentLampPosts() methods
    
    // Add professional environment ambiance
    this.addProfessionalEnvironment(scene);
  }

  // Update environment based on player position
  public update(playerZ: number) {
    const moved = Math.abs(playerZ - this.lastPlayerZ);
    if (moved > this.segmentSize / 2) {
      this.updateGroundSegments(playerZ);
      this.lastPlayerZ = playerZ;
    }
  }

  private createGroundSegments(centerZ: number) {
    // Create separate road and surrounding terrain for visual separation
    const asphaltMaterial = this.createAsphaltMaterial();
    const grassMaterial = this.createGrassMaterial();
    
    // Create 3 segments: behind, current, ahead
    for (let i = -1; i <= 1; i++) {
      const segmentZ = centerZ + i * this.segmentSize;
      
      // Create the main road (narrower, clearly defined)
      const road = new THREE.Mesh(
        new THREE.PlaneGeometry(25, this.segmentSize, 16, 32), // 25 units wide road
        asphaltMaterial
      );
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0.01, segmentZ); // Slightly elevated for clear separation
      road.receiveShadow = true;
      this.group.add(road);
      this.groundSegments.push(road);
      
      // Create grass/dirt surroundings on both sides
      const leftSide = new THREE.Mesh(
        new THREE.PlaneGeometry(75, this.segmentSize, 8, 32), // 75 units wide each side
        grassMaterial
      );
      leftSide.rotation.x = -Math.PI / 2;
      leftSide.position.set(-50, 0, segmentZ); // Position to the left of road
      leftSide.receiveShadow = true;
      this.group.add(leftSide);
      this.groundSegments.push(leftSide);
      
      const rightSide = new THREE.Mesh(
        new THREE.PlaneGeometry(75, this.segmentSize, 8, 32), // 75 units wide each side
        grassMaterial
      );
      rightSide.rotation.x = -Math.PI / 2;
      rightSide.position.set(50, 0, segmentZ); // Position to the right of road
      rightSide.receiveShadow = true;
      this.group.add(rightSide);
      this.groundSegments.push(rightSide);
    }
  }

  private updateGroundSegments(playerZ: number) {
    // Remove old segments that are too far behind
    this.groundSegments = this.groundSegments.filter(segment => {
      if (Math.abs(segment.position.z - playerZ) > this.segmentSize * 2) {
        this.group.remove(segment);
        return false;
      }
      return true;
    });

    // Add new segments ahead if needed
    const maxZ = Math.max(...this.groundSegments.map(s => s.position.z));
    const minZ = Math.min(...this.groundSegments.map(s => s.position.z));

    if (playerZ + this.segmentSize > maxZ) {
      // Need to add segment ahead
      const newZ = maxZ + this.segmentSize;
      const asphaltMaterial = this.createAsphaltMaterial();
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(this.segmentSize, this.segmentSize, 32, 32),
        asphaltMaterial
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.z = newZ;
      ground.receiveShadow = true;
      this.group.add(ground);
      this.groundSegments.push(ground);
    }

    if (playerZ - this.segmentSize < minZ) {
      // Need to add segment behind (for reverse driving)
      const newZ = minZ - this.segmentSize;
      const asphaltMaterial = this.createAsphaltMaterial();
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(this.segmentSize, this.segmentSize, 32, 32),
        asphaltMaterial
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.z = newZ;
      ground.receiveShadow = true;
      this.group.add(ground);
      this.groundSegments.push(ground);
    }
  }

  private createAsphaltMaterial(): THREE.Material {
    // Create very black realistic asphalt texture (like real pitch road)
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Very dark black asphalt base (like fresh pitch)
    ctx.fillStyle = '#0a0a0a'; // Much darker than before
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Add realistic asphalt aggregate - very small and subtle
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 1.2 + 0.3; // Even smaller aggregate
      const brightness = Math.random() * 25 + 15; // Much darker range (15-40)
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add very subtle tar streaks - almost black
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#050505'; // Nearly black streaks
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const w = Math.random() * 40 + 15;
      const h = Math.random() * 2 + 0.5; // Very thin streaks
      ctx.fillRect(x, y, w, h);
    }
    
    // Add very subtle crack lines
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
      ctx.lineTo(Math.random() * 1024, Math.random() * 1024);
      ctx.stroke();
    }
    
    const diffuseTexture = new THREE.CanvasTexture(canvas);
    diffuseTexture.wrapS = diffuseTexture.wrapT = THREE.RepeatWrapping;
    diffuseTexture.repeat.set(2, 2); // Keep realistic scale
    diffuseTexture.anisotropy = 16;
    
    // Create normal map for bump detail
    const normalCanvas = document.createElement('canvas');
    normalCanvas.width = normalCanvas.height = 256;
    const nCtx = normalCanvas.getContext('2d')!;
    nCtx.fillStyle = '#8080ff'; // Neutral normal
    nCtx.fillRect(0, 0, 256, 256);
    
    // Add surface bumps
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 2 + 1;
      const intensity = Math.random() * 30 + 110;
      nCtx.fillStyle = `rgb(128, 128, ${intensity})`;
      nCtx.beginPath();
      nCtx.arc(x, y, size, 0, Math.PI * 2);
      nCtx.fill();
    }
    
    const normalTexture = new THREE.CanvasTexture(normalCanvas);
    normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.repeat.set(2, 2); // Match diffuse texture repeat

    return new THREE.MeshStandardMaterial({
      map: diffuseTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.6, 0.6), // Subtle bumps for asphalt
      roughness: 0.85, // Less rough for wet-looking asphalt
      metalness: 0.0,
      envMapIntensity: 0.1, // Very subtle reflections like wet asphalt
      color: 0x080808 // Even darker tint
    });
  }

  private createGrassMaterial(): THREE.Material {
    // Create natural grass/dirt texture for surroundings
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Natural green-brown base
    ctx.fillStyle = '#2d4a2d';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add grass texture variation
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 2 + 0.5;
      const green = Math.random() * 60 + 40; // 40-100
      const red = green * 0.6; // Slightly brown tint
      const blue = green * 0.4;
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add dirt patches
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#4a3a2a';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 20 + 10;
      const h = Math.random() * 20 + 10;
      ctx.fillRect(x, y, w, h);
    }
    
    const grassTexture = new THREE.CanvasTexture(canvas);
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(4, 4); // Larger repeat for natural variation
    grassTexture.anisotropy = 8;
    
    return new THREE.MeshStandardMaterial({
      map: grassTexture,
      roughness: 0.9,
      metalness: 0.0,
      color: 0x4a5a3a // Natural grass color tint
    });
  }

  private addRoadMarkings(): void {
    // Enhanced center line with better visibility
    const centerLineMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      roughness: 0.6,
      metalness: 0.0,
      emissive: 0x222200 // More visible glow
    });
    
    // More visible dashed center line
    for (let i = -15; i <= 15; i++) {
      const dash = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.02, 5), // Wider and taller dashes
        centerLineMaterial
      );
      dash.position.set(0, 0.02, i * 10);
      dash.receiveShadow = true;
      this.group.add(dash);
    }
    
    // Clear road edge boundaries
    const boundaryMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.0,
      emissive: 0x111111 // Slight glow for visibility
    });
    
    // Left road edge
    for (let i = -15; i <= 15; i++) {
      const leftEdge = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.02, 8),
        boundaryMaterial
      );
      leftEdge.position.set(-12, 0.02, i * 10); // Clear road boundary
      leftEdge.receiveShadow = true;
      this.group.add(leftEdge);
    }
    
    // Right road edge  
    for (let i = -15; i <= 15; i++) {
      const rightEdge = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.02, 8),
        boundaryMaterial
      );
      rightEdge.position.set(12, 0.02, i * 10); // Clear road boundary
      rightEdge.receiveShadow = true;
      this.group.add(rightEdge);
    }
  }
    
    // Side boundaries
    const boundaryMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.0
    });
    
    const leftBoundary = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.01, 800),
      boundaryMaterial
    );
    leftBoundary.position.set(-15, 0.01, 0);
    leftBoundary.receiveShadow = true;
    this.group.add(leftBoundary);
    
    const rightBoundary = leftBoundary.clone();
    rightBoundary.position.set(15, 0.01, 0);
    this.group.add(rightBoundary);
  }

  private addRaceTrackProps(): void {
    // Concrete barriers
    const barrierMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.8,
      metalness: 0.1,
      normalScale: new THREE.Vector2(0.3, 0.3)
    });
    
    // Create barrier sections
    for (let i = 0; i < 20; i++) {
      const barrier = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1.2, 0.3),
        barrierMaterial
      );
      barrier.position.set(-25 + Math.random() * 6, 0.6, -80 + i * 8);
      barrier.castShadow = true;
      barrier.receiveShadow = true;
      this.group.add(barrier);
      
      // Right side barriers
      const rightBarrier = barrier.clone();
      rightBarrier.position.set(25 - Math.random() * 6, 0.6, -80 + i * 8);
      this.group.add(rightBarrier);
    }
    
    // Tire barriers for corners
    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.9,
      metalness: 0.0
    });
    
    for (let i = 0; i < 30; i++) {
      const tire = new THREE.Mesh(
        new THREE.TorusGeometry(0.6, 0.2, 8, 16),
        tireMaterial
      );
      const angle = (i / 30) * Math.PI * 2;
      const radius = 45;
      tire.position.set(
        Math.cos(angle) * radius,
        0.2,
        Math.sin(angle) * radius
      );
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      tire.receiveShadow = true;
      this.group.add(tire);
    }
    
    // Grandstand structure
    const grandstandMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b6b6b,
      roughness: 0.6,
      metalness: 0.2
    });
    
    const grandstand = new THREE.Mesh(
      new THREE.BoxGeometry(30, 8, 4),
      grandstandMaterial
    );
    grandstand.position.set(-60, 4, 0);
    grandstand.castShadow = true;
    grandstand.receiveShadow = true;
    this.group.add(grandstand);
    
    // Street lights
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0x404040,
      roughness: 0.3,
      metalness: 0.8
    });
    
    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffcc,
      emissive: 0xffffcc,
      emissiveIntensity: 2
    });
    
    for (let i = 0; i < 8; i++) {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 8),
        poleMaterial
      );
      pole.position.set(-35, 4, -60 + i * 20);
      pole.castShadow = true;
      this.group.add(pole);
      
      const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.3),
        lightMaterial
      );
      light.position.set(-35, 7.5, -60 + i * 20);
      this.group.add(light);
      
      // Add point light for illumination
      const pointLight = new THREE.PointLight(0xffffcc, 1, 20);
      pointLight.position.copy(light.position);
      pointLight.castShadow = true;
      this.group.add(pointLight);
    }
  }

  private addRealisticTrees(): void {
    const treeCount = 120;
    
    // More detailed trunk geometry
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 3, 8);
    const crownGeo = new THREE.SphereGeometry(1.5, 8, 6);
    
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3728,
      roughness: 0.95,
      metalness: 0.0,
      normalScale: new THREE.Vector2(0.8, 0.8)
    });
    
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5016,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.9
    });
    
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMaterial, treeCount);
    const crowns = new THREE.InstancedMesh(crownGeo, leafMaterial, treeCount);
    
    trunks.castShadow = true;
    crowns.castShadow = true;
    trunks.receiveShadow = true;
    crowns.receiveShadow = true;
    
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < treeCount; i++) {
      const radius = 150 + Math.random() * 100;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.8 + Math.random() * 0.4;
      
      // Trunk
      matrix.makeScale(scale, scale, scale);
      matrix.setPosition(x, 1.5 * scale, z);
      trunks.setMatrixAt(i, matrix);
      
      // Crown
      matrix.makeScale(scale, scale, scale);
      matrix.setPosition(x, 3.2 * scale, z);
      crowns.setMatrixAt(i, matrix);
    }
    
    trunks.instanceMatrix.needsUpdate = true;
    crowns.instanceMatrix.needsUpdate = true;
    this.group.add(trunks, crowns);
  }

  // Add professional environment ambiance
  private addProfessionalEnvironment(scene: THREE.Scene): void {
    // Professional HDRI environment
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const ectx = envCanvas.getContext('2d')!;
    
    // Create stunning sky gradient
    const skyGrad = ectx.createLinearGradient(0, 0, 0, envCanvas.height);
    skyGrad.addColorStop(0, '#87CEEB');  // Sky blue
    skyGrad.addColorStop(0.3, '#B0E0E6'); // Powder blue
    skyGrad.addColorStop(0.7, '#4682B4'); // Steel blue
    skyGrad.addColorStop(1, '#1E3A8A');   // Blue 800
    ectx.fillStyle = skyGrad;
    ectx.fillRect(0, 0, envCanvas.width, envCanvas.height);
    
    // Add radiant sun with halo
    ectx.beginPath();
    const sunX = envCanvas.width * 0.7;
    const sunY = envCanvas.height * 0.25;
    
    // Sun halo
    const haloGrad = ectx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 60);
    haloGrad.addColorStop(0, 'rgba(255, 250, 205, 0.8)');
    haloGrad.addColorStop(0.5, 'rgba(255, 250, 205, 0.3)');
    haloGrad.addColorStop(1, 'rgba(255, 250, 205, 0)');
    ectx.fillStyle = haloGrad;
    ectx.arc(sunX, sunY, 60, 0, Math.PI * 2);
    ectx.fill();
    
    // Sun disc
    ectx.beginPath();
    ectx.fillStyle = '#FFF8DC';
    ectx.arc(sunX, sunY, 25, 0, Math.PI * 2);
    ectx.fill();
    
    // Add atmospheric clouds
    ectx.globalAlpha = 0.4;
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * envCanvas.width;
      const y = envCanvas.height * 0.6 + Math.random() * envCanvas.height * 0.3;
      const radius = 30 + Math.random() * 40;
      
      const cloudGrad = ectx.createRadialGradient(x, y, 0, x, y, radius);
      cloudGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ectx.fillStyle = cloudGrad;
      ectx.beginPath();
      ectx.arc(x, y, radius, 0, Math.PI * 2);
      ectx.fill();
    }
    
    const envTex = new THREE.CanvasTexture(envCanvas);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.pmrem.compileEquirectangularShader();
    const env = this.pmrem.fromEquirectangular(envTex);
    this.envRT = env.texture as unknown as THREE.WebGLRenderTarget;
    scene.environment = env.texture;
  }

  updateCSM(camera: THREE.PerspectiveCamera): void {
    // CSM disabled for compatibility - using standard directional light shadows instead
    // This still provides excellent shadow quality with the enhanced directional light setup
  }

  dispose(scene: THREE.Scene) {
    scene.environment = null;
    // CSM disposal removed since we're not using it
    if (this.envRT) {
      (this.envRT as any).dispose?.();
      this.envRT = undefined;
    }
    this.pmrem?.dispose();
  }
}

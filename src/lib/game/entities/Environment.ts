import * as THREE from 'three';

export default class Environment {
  public group = new THREE.Group();
  private envRT?: THREE.WebGLRenderTarget;
  private pmrem?: THREE.PMREMGenerator;
  private groundSegments: THREE.Mesh[] = [];
  private segmentSize = 200;
  private lastPlayerZ = 0;
  private skyDome?: THREE.Mesh;

  constructor(private renderer: THREE.WebGLRenderer) {}

  setup(scene: THREE.Scene) {
    // Create beautiful realistic sky with clouds and gradients
    this.createBeautifulSky(scene);
    scene.fog = new THREE.Fog(0xc0d6e8, 80, 400);

    // Professional lighting setup with multiple light sources
    const hemi = new THREE.HemisphereLight(0x87CEEB, 0x2c5530, 0.4);
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    
    // Primary sun light with enhanced shadows
    const sunLight = new THREE.DirectionalLight(0xfff8dc, 3.0);
    sunLight.position.set(100, 150, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.setScalar(4096); // Reduced for performance
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 1000;
    sunLight.shadow.camera.left = -200;
    sunLight.shadow.camera.right = 200;
    sunLight.shadow.camera.top = 200;
    sunLight.shadow.camera.bottom = -200;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.radius = 8; // Reduced for performance
    
    // Secondary fill light for better illumination
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.8);
    fillLight.position.set(-50, 100, -50);
    fillLight.castShadow = false;
    
    this.group.add(hemi, ambient, sunLight, fillLight);

    // Create separated road and surroundings
    this.createGroundSegments(0);

    // Add enhanced road markings
    this.addRoadMarkings();

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
        // Dispose of geometry and materials for performance
        segment.geometry?.dispose();
        if (Array.isArray(segment.material)) {
          segment.material.forEach(mat => mat.dispose());
        } else {
          segment.material?.dispose();
        }
        return false;
      }
      return true;
    });

    // Add new segments ahead of player
    const playerSegment = Math.floor(playerZ / this.segmentSize);
    const neededSegments = [];
    
    for (let i = playerSegment - 1; i <= playerSegment + 2; i++) {
      const segmentZ = i * this.segmentSize;
      const exists = this.groundSegments.some(seg => 
        Math.abs(seg.position.z - segmentZ) < this.segmentSize / 2
      );
      
      if (!exists) {
        neededSegments.push(segmentZ);
      }
    }
    
    // Create needed segments
    neededSegments.forEach(segmentZ => {
      this.createSingleGroundSegment(segmentZ);
    });
  }

  private createSingleGroundSegment(segmentZ: number) {
    const asphaltMaterial = this.createAsphaltMaterial();
    const grassMaterial = this.createGrassMaterial();
    
    // Create the main road
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(25, this.segmentSize, 16, 32),
      asphaltMaterial
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, segmentZ);
    road.receiveShadow = true;
    this.group.add(road);
    this.groundSegments.push(road);
    
    // Create grass sides
    const leftSide = new THREE.Mesh(
      new THREE.PlaneGeometry(75, this.segmentSize, 8, 32),
      grassMaterial
    );
    leftSide.rotation.x = -Math.PI / 2;
    leftSide.position.set(-50, 0, segmentZ);
    leftSide.receiveShadow = true;
    this.group.add(leftSide);
    this.groundSegments.push(leftSide);
    
    const rightSide = new THREE.Mesh(
      new THREE.PlaneGeometry(75, this.segmentSize, 8, 32),
      grassMaterial
    );
    rightSide.rotation.x = -Math.PI / 2;
    rightSide.position.set(50, 0, segmentZ);
    rightSide.receiveShadow = true;
    this.group.add(rightSide);
    this.groundSegments.push(rightSide);
  }

  private createAsphaltMaterial(): THREE.Material {
    // Create very black realistic asphalt texture (like real pitch road)
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512; // Reduced size for performance
    const ctx = canvas.getContext('2d')!;
    
    // Very dark black asphalt base (like fresh pitch)
    ctx.fillStyle = '#0a0a0a'; // Much darker than before
    ctx.fillRect(0, 0, 512, 512);
    
    // Add realistic asphalt aggregate - very small and subtle
    for (let i = 0; i < 3000; i++) { // Reduced for performance
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 1.2 + 0.3;
      const brightness = Math.random() * 25 + 15; // Much darker range (15-40)
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add very subtle tar streaks - almost black
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#050505'; // Nearly black streaks
    for (let i = 0; i < 100; i++) { // Reduced for performance
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 40 + 15;
      const h = Math.random() * 2 + 0.5;
      ctx.fillRect(x, y, w, h);
    }
    
    const diffuseTexture = new THREE.CanvasTexture(canvas);
    diffuseTexture.wrapS = diffuseTexture.wrapT = THREE.RepeatWrapping;
    diffuseTexture.repeat.set(2, 2);
    diffuseTexture.anisotropy = 8; // Reduced for performance

    return new THREE.MeshStandardMaterial({
      map: diffuseTexture,
      roughness: 0.85, // Less rough for wet-looking asphalt
      metalness: 0.0,
      envMapIntensity: 0.1,
      color: 0x080808 // Even darker tint
    });
  }

  private createGrassMaterial(): THREE.Material {
    // Create natural grass/dirt texture for surroundings
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256; // Smaller for performance
    const ctx = canvas.getContext('2d')!;
    
    // Natural green-brown base
    ctx.fillStyle = '#2d4a2d';
    ctx.fillRect(0, 0, 256, 256);
    
    // Add grass texture variation
    for (let i = 0; i < 1000; i++) { // Reduced for performance
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 2 + 0.5;
      const green = Math.random() * 60 + 40; // 40-100
      const red = green * 0.6; // Slightly brown tint
      const blue = green * 0.4;
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const grassTexture = new THREE.CanvasTexture(canvas);
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(4, 4);
    grassTexture.anisotropy = 4; // Reduced for performance
    
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

  // Create beautiful realistic sky with clouds and atmosphere
  private createBeautifulSky(scene: THREE.Scene): void {
    // Create realistic sky dome instead of flat background - make it very large
    const skyGeometry = new THREE.SphereGeometry(2000, 64, 32);
    
    // Create beautiful sky material with clouds and gradients optimized for sphere
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 2048; // Higher resolution for better quality
    skyCanvas.height = 1024;
    const ctx = skyCanvas.getContext('2d')!;
    
    // Create stunning multi-layer sky gradient - adjusted for spherical mapping
    const skyGradient = ctx.createLinearGradient(0, 0, 0, skyCanvas.height);
    skyGradient.addColorStop(0, '#87CEEB');     // Light sky blue at horizon
    skyGradient.addColorStop(0.2, '#B0E0E6');  // Powder blue
    skyGradient.addColorStop(0.4, '#87CEFA');  // Light sky blue
    skyGradient.addColorStop(0.6, '#4682B4');  // Steel blue
    skyGradient.addColorStop(0.8, '#2E4B87');  // Deep blue
    skyGradient.addColorStop(1, '#1E3A8A');    // Navy blue at zenith
    
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);
    
    // Add realistic volumetric clouds
    this.addRealisticClouds(ctx, skyCanvas.width, skyCanvas.height);
    
    // Add sun with realistic atmospheric scattering
    this.addAtmosphericSun(ctx, skyCanvas.width, skyCanvas.height);
    
    // Add distant atmospheric haze
    this.addAtmosphericHaze(ctx, skyCanvas.width, skyCanvas.height);
    
    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    skyTexture.wrapS = THREE.RepeatWrapping;
    skyTexture.wrapT = THREE.ClampToEdgeWrapping;
    skyTexture.flipY = false; // Important for sky dome
    skyTexture.generateMipmaps = false; // Avoid mipmap issues
    skyTexture.minFilter = THREE.LinearFilter;
    skyTexture.magFilter = THREE.LinearFilter;
    
    const skyMaterial = new THREE.MeshBasicMaterial({
      map: skyTexture,
      side: THREE.BackSide,
      depthWrite: false, // Don't write to depth buffer
      depthTest: false,  // Don't test depth
      fog: false        // Don't apply fog to sky
    });
    
    const skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
    skyDome.name = 'SkyDome';
    skyDome.position.set(0, 0, 0); // Center at origin
    skyDome.renderOrder = -1; // Render first
    this.skyDome = skyDome;
    scene.add(skyDome);
    
    // Also set scene background as fallback to ensure beautiful sky shows
    scene.background = skyTexture;
  }

  private addRealisticClouds(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Add realistic cumulus clouds with proper shading - distributed across the sky
    ctx.globalAlpha = 0.8;
    
    // Create cloud layers at different altitudes and better distributed
    const cloudLayers = [
      { yStart: height * 0.05, yEnd: height * 0.25, size: 80, density: 25, opacity: 0.9, color: '#FFFFFF' },
      { yStart: height * 0.15, yEnd: height * 0.35, size: 60, density: 30, opacity: 0.7, color: '#F8F8FF' },
      { yStart: height * 0.25, yEnd: height * 0.45, size: 40, density: 35, opacity: 0.5, color: '#E6E6FA' }
    ];
    
    cloudLayers.forEach(layer => {
      for (let i = 0; i < layer.density; i++) {
        const x = Math.random() * width;
        const y = layer.yStart + Math.random() * (layer.yEnd - layer.yStart);
        
        // Create cloud with multiple puffs for realistic shape
        const cloudSize = layer.size + Math.random() * 20;
        const puffs = 5 + Math.random() * 5;
        
        ctx.globalAlpha = layer.opacity * (0.7 + Math.random() * 0.3);
        
        for (let p = 0; p < puffs; p++) {
          const puffX = x + (Math.random() - 0.5) * cloudSize;
          const puffY = y + (Math.random() - 0.5) * cloudSize * 0.3;
          const puffSize = cloudSize * (0.3 + Math.random() * 0.4);
          
          // Cloud highlight (bright side)
          const highlightGrad = ctx.createRadialGradient(
            puffX - puffSize * 0.2, puffY - puffSize * 0.2, 0,
            puffX, puffY, puffSize
          );
          highlightGrad.addColorStop(0, layer.color);
          highlightGrad.addColorStop(0.6, `${layer.color}88`);
          highlightGrad.addColorStop(1, 'transparent');
          
          ctx.fillStyle = highlightGrad;
          ctx.beginPath();
          ctx.arc(puffX, puffY, puffSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Cloud shadow (adds depth)
          ctx.globalAlpha *= 0.4;
          const shadowGrad = ctx.createRadialGradient(
            puffX + puffSize * 0.2, puffY + puffSize * 0.2, 0,
            puffX, puffY, puffSize * 0.8
          );
          shadowGrad.addColorStop(0, '#D3D3D3');
          shadowGrad.addColorStop(0.5, '#D3D3D355');
          shadowGrad.addColorStop(1, 'transparent');
          
          ctx.fillStyle = shadowGrad;
          ctx.beginPath();
          ctx.arc(puffX + puffSize * 0.1, puffY + puffSize * 0.1, puffSize * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    
    ctx.globalAlpha = 1.0;
  }

  private addAtmosphericSun(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const sunX = width * 0.75;  // Position sun in upper right
    const sunY = height * 0.15;
    
    // Create realistic atmospheric scattering around sun
    const atmosphereGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 200);
    atmosphereGrad.addColorStop(0, 'rgba(255, 250, 205, 0.8)');   // Warm yellow center
    atmosphereGrad.addColorStop(0.2, 'rgba(255, 245, 180, 0.6)'); // Warm glow
    atmosphereGrad.addColorStop(0.4, 'rgba(255, 220, 150, 0.4)'); // Orange tint
    atmosphereGrad.addColorStop(0.6, 'rgba(255, 200, 120, 0.2)'); // Subtle orange
    atmosphereGrad.addColorStop(0.8, 'rgba(200, 180, 140, 0.1)'); // Atmospheric haze
    atmosphereGrad.addColorStop(1, 'transparent');
    
    ctx.fillStyle = atmosphereGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 200, 0, Math.PI * 2);
    ctx.fill();
    
    // Add bright sun disc with corona effect
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 25);
    sunGrad.addColorStop(0, '#FFFACD');    // Light cream center
    sunGrad.addColorStop(0.3, '#FFF8DC');  // Cornsilk
    sunGrad.addColorStop(0.7, '#FFFFE0');  // Light yellow
    sunGrad.addColorStop(1, 'rgba(255, 255, 224, 0.5)');
    
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Add sun rays/corona
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const rayLength = 40 + Math.random() * 20;
      const rayWidth = 1 + Math.random() * 2;
      
      ctx.strokeStyle = 'rgba(255, 250, 205, 0.3)';
      ctx.lineWidth = rayWidth;
      ctx.beginPath();
      ctx.moveTo(sunX + Math.cos(angle) * 30, sunY + Math.sin(angle) * 30);
      ctx.lineTo(sunX + Math.cos(angle) * rayLength, sunY + Math.sin(angle) * rayLength);
      ctx.stroke();
    }
  }

  private addAtmosphericHaze(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Add realistic atmospheric perspective/haze near horizon
    const hazeGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
    hazeGrad.addColorStop(0, 'transparent');
    hazeGrad.addColorStop(0.3, 'rgba(200, 220, 255, 0.1)');
    hazeGrad.addColorStop(0.6, 'rgba(180, 210, 255, 0.2)');
    hazeGrad.addColorStop(0.8, 'rgba(160, 200, 255, 0.3)');
    hazeGrad.addColorStop(1, 'rgba(140, 190, 255, 0.4)');
    
    ctx.fillStyle = hazeGrad;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
    
    // Add some distant mountain silhouettes for depth
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#4682B4';
    
    // Create mountain range silhouette
    ctx.beginPath();
    ctx.moveTo(0, height * 0.85);
    for (let x = 0; x <= width; x += 20) {
      const mountainHeight = height * (0.75 + Math.sin(x * 0.01) * 0.1 + Math.random() * 0.05);
      ctx.lineTo(x, mountainHeight);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    
    ctx.globalAlpha = 1.0;
  }

  // Add professional environment ambiance
  private addProfessionalEnvironment(scene: THREE.Scene): void {
    // Enhanced HDRI environment for reflections
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ectx = envCanvas.getContext('2d')!;
    
    // Create environment map that matches our beautiful sky
    const envGrad = ectx.createLinearGradient(0, 0, 0, envCanvas.height);
    envGrad.addColorStop(0, '#87CEEB');
    envGrad.addColorStop(0.2, '#B0E0E6');
    envGrad.addColorStop(0.5, '#4682B4');
    envGrad.addColorStop(0.8, '#2E4B87');
    envGrad.addColorStop(1, '#1E3A8A');
    ectx.fillStyle = envGrad;
    ectx.fillRect(0, 0, envCanvas.width, envCanvas.height);
    
    // Add sun position that matches the sky
    const sunX = envCanvas.width * 0.75;
    const sunY = envCanvas.height * 0.15;
    
    // Sun halo for environment reflections
    const haloGrad = ectx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 40);
    haloGrad.addColorStop(0, 'rgba(255, 250, 205, 0.8)');
    haloGrad.addColorStop(0.5, 'rgba(255, 250, 205, 0.3)');
    haloGrad.addColorStop(1, 'rgba(255, 250, 205, 0)');
    ectx.fillStyle = haloGrad;
    ectx.beginPath();
    ectx.arc(sunX, sunY, 40, 0, Math.PI * 2);
    ectx.fill();
    
    // Sun disc for environment
    ectx.beginPath();
    ectx.fillStyle = '#FFF8DC';
    ectx.arc(sunX, sunY, 15, 0, Math.PI * 2);
    ectx.fill();
    
    // Apply environment texture for realistic reflections
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
  }

  dispose(scene: THREE.Scene) {
    scene.environment = null;
    
    // Dispose of sky dome
    if (this.skyDome) {
      scene.remove(this.skyDome);
      this.skyDome.geometry?.dispose();
      if (Array.isArray(this.skyDome.material)) {
        this.skyDome.material.forEach(mat => mat.dispose());
      } else {
        this.skyDome.material?.dispose();
      }
      this.skyDome = undefined;
    }
    
    if (this.envRT) {
      (this.envRT as any).dispose?.();
      this.envRT = undefined;
    }
    this.pmrem?.dispose();
  }
}
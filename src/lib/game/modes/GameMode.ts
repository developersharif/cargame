import * as THREE from 'three';

export interface GameModeConfig {
  name: string;
  description: string;
  fog: {
    color: number;
    near: number;
    far: number;
  };
  lighting: {
    ambient: { color: number; intensity: number };
    hemisphere: { skyColor: number; groundColor: number; intensity: number };
    directional: Array<{
      color: number;
      intensity: number;
      position: THREE.Vector3;
      castShadow: boolean;
      shadowBias?: number;
    }>;
  };
  sky: {
    topColor: number;
    middleColor: number;
    bottomColor: number;
    exponent: number;
  };
  postProcessing?: {
    vignette?: { intensity: number; smoothness: number };
    colorGrading?: { tint: number; contrast: number; brightness: number };
  };
  atmosphere?: {
    particles?: { type: 'rain' | 'snow' | 'fog' | 'leaves'; density: number };
    wind?: THREE.Vector3;
    volumetricLight?: boolean;
  };
}

export default abstract class GameMode {
  protected scene!: THREE.Scene;
  protected renderer!: THREE.WebGLRenderer;
  protected config!: GameModeConfig;
  protected lights: THREE.Light[] = [];
  protected skyDome?: THREE.Mesh;
  protected particleSystem?: THREE.Points;
  protected animationTime = 0;

  abstract getConfig(): GameModeConfig;

  public initialize(scene: THREE.Scene, renderer: THREE.WebGLRenderer): void {
    this.scene = scene;
    this.renderer = renderer;
    this.config = this.getConfig();
    
    // Use requestAnimationFrame to prevent blocking
    requestAnimationFrame(() => {
      this.setupEnvironment();
    });
  }

  protected setupEnvironment(): void {
    // Setup fog
    this.scene.fog = new THREE.Fog(
      this.config.fog.color,
      this.config.fog.near,
      this.config.fog.far
    );

    // Setup lighting
    this.setupLighting();

    // Setup sky
    this.setupSky();

    // Setup atmosphere effects
    this.setupAtmosphere();
  }

  protected setupLighting(): void {
    // Clear existing lights
    this.lights.forEach(light => this.scene.remove(light));
    this.lights = [];

    // Ambient light
    const ambient = new THREE.AmbientLight(
      this.config.lighting.ambient.color,
      this.config.lighting.ambient.intensity
    );
    this.lights.push(ambient);

    // Hemisphere light
    const hemisphere = new THREE.HemisphereLight(
      this.config.lighting.hemisphere.skyColor,
      this.config.lighting.hemisphere.groundColor,
      this.config.lighting.hemisphere.intensity
    );
    this.lights.push(hemisphere);

    // Directional lights
    this.config.lighting.directional.forEach(lightConfig => {
      const light = new THREE.DirectionalLight(
        lightConfig.color,
        lightConfig.intensity
      );
      light.position.copy(lightConfig.position);
      light.castShadow = lightConfig.castShadow;

      if (lightConfig.castShadow) {
        light.shadow.mapSize.setScalar(2048);
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 1000;
        light.shadow.camera.left = -200;
        light.shadow.camera.right = 200;
        light.shadow.camera.top = 200;
        light.shadow.camera.bottom = -200;
        light.shadow.bias = lightConfig.shadowBias || -0.0001;
        light.shadow.radius = 4;
      }

      this.lights.push(light);
    });

    // Add all lights to scene
    this.lights.forEach(light => this.scene.add(light));
  }

  protected setupSky(): void {
    // Remove old sky if exists
    if (this.skyDome) {
      this.scene.remove(this.skyDome);
      this.skyDome.geometry.dispose();
      (this.skyDome.material as THREE.Material).dispose();
    }

    // Create sky dome with gradient shader
    const skyGeometry = new THREE.SphereGeometry(800, 32, 15);
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(this.config.sky.topColor) },
        middleColor: { value: new THREE.Color(this.config.sky.middleColor) },
        bottomColor: { value: new THREE.Color(this.config.sky.bottomColor) },
        exponent: { value: this.config.sky.exponent }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 middleColor;
        uniform vec3 bottomColor;
        uniform float exponent;
        varying vec3 vWorldPosition;
        
        void main() {
          float h = normalize(vWorldPosition).y;
          float t = pow(max(h, 0.0), exponent);
          
          // Three-tone gradient: bottom -> middle -> top
          vec3 color;
          if (h < 0.0) {
            color = bottomColor;
          } else if (h < 0.3) {
            float blend = h / 0.3;
            color = mix(bottomColor, middleColor, blend);
          } else {
            float blend = (h - 0.3) / 0.7;
            color = mix(middleColor, topColor, blend);
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false
    });

    this.skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
    this.scene.add(this.skyDome);
  }

  protected setupAtmosphere(): void {
    if (!this.config.atmosphere?.particles) return;

    const particleConfig = this.config.atmosphere.particles;
    const particleCount = particleConfig.density;

    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Initialize particles in a volume around the player
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = Math.random() * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      // Different velocities based on particle type
      switch (particleConfig.type) {
        case 'rain':
          velocities[i3] = 0;
          velocities[i3 + 1] = -20 - Math.random() * 10;
          velocities[i3 + 2] = 0;
          break;
        case 'snow':
          velocities[i3] = (Math.random() - 0.5) * 2;
          velocities[i3 + 1] = -2 - Math.random() * 3;
          velocities[i3 + 2] = (Math.random() - 0.5) * 2;
          break;
        case 'fog':
          velocities[i3] = (Math.random() - 0.5) * 0.5;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.5;
          break;
        case 'leaves':
          velocities[i3] = (Math.random() - 0.5) * 3;
          velocities[i3 + 1] = -1 - Math.random() * 2;
          velocities[i3 + 2] = (Math.random() - 0.5) * 3;
          break;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Create particle material
    const material = new THREE.PointsMaterial({
      color: this.getParticleColor(particleConfig.type),
      size: this.getParticleSize(particleConfig.type),
      transparent: true,
      opacity: this.getParticleOpacity(particleConfig.type),
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  protected getParticleColor(type: string): number {
    switch (type) {
      case 'rain': return 0x88aacc;
      case 'snow': return 0xffffff;
      case 'fog': return 0xcccccc;
      case 'leaves': return 0xff8844;
      default: return 0xffffff;
    }
  }

  protected getParticleSize(type: string): number {
    switch (type) {
      case 'rain': return 0.5;
      case 'snow': return 2.0;
      case 'fog': return 8.0;
      case 'leaves': return 1.5;
      default: return 1.0;
    }
  }

  protected getParticleOpacity(type: string): number {
    switch (type) {
      case 'rain': return 0.6;
      case 'snow': return 0.8;
      case 'fog': return 0.3;
      case 'leaves': return 0.7;
      default: return 0.5;
    }
  }

  public updateEnvironment(time: number, playerPosition: THREE.Vector3): void {
    this.animationTime = time;

    // Update sky position to follow player
    if (this.skyDome) {
      this.skyDome.position.copy(playerPosition);
    }

    // Update particles
    this.updateParticles(time, playerPosition);

    // Custom per-mode updates
    this.customUpdate(time, playerPosition);
  }

  protected updateParticles(deltaTime: number, playerPosition: THREE.Vector3): void {
    if (!this.particleSystem) return;

    const geometry = this.particleSystem.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const velocities = geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      // Update position based on velocity
      positions[i] += velocities[i] * deltaTime;
      positions[i + 1] += velocities[i + 1] * deltaTime;
      positions[i + 2] += velocities[i + 2] * deltaTime;

      // Reset particles that go out of bounds (relative to player)
      const dx = positions[i] - playerPosition.x;
      const dy = positions[i + 1];
      const dz = positions[i + 2] - playerPosition.z;

      if (Math.abs(dx) > 100 || dy < 0 || Math.abs(dz) > 100) {
        positions[i] = playerPosition.x + (Math.random() - 0.5) * 200;
        positions[i + 1] = 50 + Math.random() * 50;
        positions[i + 2] = playerPosition.z + (Math.random() - 0.5) * 200;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  }

  protected customUpdate(time: number, playerPosition: THREE.Vector3): void {
    // Override in subclasses for mode-specific animations
    void time;
    void playerPosition;
  }

  public dispose(): void {
    // Use requestAnimationFrame for smooth disposal
    requestAnimationFrame(() => {
      // Clean up lights
      this.lights.forEach(light => {
        this.scene.remove(light);
      });
      this.lights = [];
    });
  }

  private disposeSync(): void {
    // Synchronous cleanup for immediate disposal needs
    this.lights.forEach(light => {
      this.scene.remove(light);
    });
    this.lights = [];

    // Clean up sky (sync)
    if (this.skyDome) {
      this.scene.remove(this.skyDome);
      this.skyDome.geometry.dispose();
      (this.skyDome.material as THREE.Material).dispose();
      this.skyDome = undefined;
    }

    // Clean up particles (sync)
    if (this.particleSystem) {
      this.scene.remove(this.particleSystem);
      this.particleSystem.geometry.dispose();
      (this.particleSystem.material as THREE.Material).dispose();
      this.particleSystem = undefined;
    }
  }
}

import * as THREE from 'three';
import GameMode, { type GameModeConfig } from './GameMode';

export default class SunnyMode extends GameMode {
  private sunMesh?: THREE.Mesh;
  private lensFlares: THREE.Sprite[] = [];

  getConfig(): GameModeConfig {
    return {
      name: 'Sunny',
      description: 'Photorealistic clear day with natural sunlight and atmospheric depth',
      fog: {
        color: 0xb8cfe0, // More realistic atmospheric haze
        near: 100,
        far: 500 // Extended for realism
      },
      lighting: {
        ambient: {
          color: 0xe8f0f8, // Slightly cool ambient for realism
          intensity: 0.4 // Reduced for more contrast
        },
        hemisphere: {
          skyColor: 0x5fa3d6, // More muted realistic sky blue
          groundColor: 0x3d5940, // Natural ground reflection
          intensity: 0.6
        },
        directional: [
          {
            color: 0xfff5e6, // Warm natural sunlight
            intensity: 2.2, // Reduced from 3.0 for realism
            position: new THREE.Vector3(100, 150, 50),
            castShadow: true,
            shadowBias: -0.0001
          },
          {
            color: 0x7da9cd, // Cooler fill light
            intensity: 0.5, // Reduced for subtlety
            position: new THREE.Vector3(-50, 100, -50),
            castShadow: false
          }
        ]
      },
      sky: {
        topColor: 0x004d7a, // Deeper realistic sky blue
        middleColor: 0x5fa3d6, // Natural mid-sky
        bottomColor: 0xd4e8f0, // Realistic horizon haze
        exponent: 1.2 // More gradual transition
      },
      postProcessing: {
        vignette: { intensity: 0.12, smoothness: 0.85 },
        colorGrading: { tint: 0xfff8f0, contrast: 1.08, brightness: 1.05 }
      }
      // No particles in sunny mode for clean realistic look
    };
  }

  protected setupEnvironment(): void {
    super.setupEnvironment();
    this.createSun();
    // Lens flares disabled for more realistic look
    // this.createLensFlares();
  }

  private createSun(): void {
    // Create photorealistic sun with natural glow
    const sunGeometry = new THREE.SphereGeometry(35, 32, 32);
    const sunMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        sunColor: { value: new THREE.Color(0xfff4e6) }, // Natural sun color
        glowColor: { value: new THREE.Color(0xfff8f0) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 sunColor;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        
        void main() {
          // Natural sun core with subtle variation
          vec3 color = sunColor;
          
          // Subtle atmospheric glow
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          rim = pow(rim, 1.5);
          color = mix(color, glowColor, rim * 0.5);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.FrontSide
    });

    this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    this.sunMesh.position.set(300, 200, -400);
    this.scene.add(this.sunMesh);

    // Add subtle sun glow sprite
    const glowTexture = this.createGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xfff5e6, // More natural glow color
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.35 // More subtle
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(150, 150, 1); // Smaller for realism
    glowSprite.position.copy(this.sunMesh.position);
    this.scene.add(glowSprite);
  }

  private createGlowTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 200, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 150, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private createLensFlares(): void {
    // Create lens flare effects for realistic sun glare
    const flareTexture = this.createFlareTexture();
    
    const flareConfigs = [
      { size: 40, distance: 0.1, opacity: 0.8, color: 0xffffaa },
      { size: 60, distance: 0.3, opacity: 0.5, color: 0xffaa88 },
      { size: 30, distance: 0.5, opacity: 0.6, color: 0xffff88 },
      { size: 50, distance: 0.7, opacity: 0.4, color: 0x88aaff },
      { size: 25, distance: 0.9, opacity: 0.5, color: 0xffffcc }
    ];

    flareConfigs.forEach(config => {
      const flareMaterial = new THREE.SpriteMaterial({
        map: flareTexture,
        color: config.color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: config.opacity
      });
      
      const flare = new THREE.Sprite(flareMaterial);
      flare.scale.set(config.size, config.size, 1);
      flare.userData.distance = config.distance;
      
      this.lensFlares.push(flare);
      this.scene.add(flare);
    });
  }

  private createFlareTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  protected customUpdate(time: number, playerPosition: THREE.Vector3): void {
    // Sun stays in fixed position in sky
    if (this.sunMesh) {
      const material = this.sunMesh.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
    }

    // Update lens flares (simulate camera lens effects)
    // Note: In a real implementation, you'd calculate based on sun position relative to camera
    this.lensFlares.forEach(flare => {
      const distance = flare.userData.distance;
      // Simple horizontal distribution for demonstration
      flare.position.set(
        playerPosition.x + (distance - 0.5) * 100,
        playerPosition.y + 50,
        playerPosition.z - 200
      );
    });
  }

  public dispose(): void {
    super.dispose();

    // Clean up sun
    if (this.sunMesh) {
      this.scene.remove(this.sunMesh);
      this.sunMesh.geometry.dispose();
      (this.sunMesh.material as THREE.Material).dispose();
      this.sunMesh = undefined;
    }

    // Clean up lens flares
    this.lensFlares.forEach(flare => {
      this.scene.remove(flare);
      const material = flare.material as THREE.SpriteMaterial;
      material.map?.dispose();
      material.dispose();
    });
    this.lensFlares = [];
  }
}

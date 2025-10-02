import * as THREE from 'three';
import GameMode, { type GameModeConfig } from './GameMode';

export default class CloudyMode extends GameMode {
  private cloudLayers: THREE.Mesh[] = [];
  private lightningFlash?: THREE.PointLight;
  private nextLightning = 0;

  getConfig(): GameModeConfig {
    return {
      name: 'Cloudy',
      description: 'Overcast weather with dynamic clouds, occasional rain, and realistic atmospheric lighting',
      fog: {
        color: 0x9eb3c2,
        near: 40,
        far: 250
      },
      lighting: {
        ambient: {
          color: 0xb0c4d4,
          intensity: 0.6
        },
        hemisphere: {
          skyColor: 0x9eb3c2,
          groundColor: 0x6b7a85,
          intensity: 0.5
        },
        directional: [
          {
            color: 0xd4e4f0,
            intensity: 1.2,
            position: new THREE.Vector3(50, 120, 30),
            castShadow: true,
            shadowBias: -0.0003
          },
          {
            color: 0xa8b8c8,
            intensity: 0.4,
            position: new THREE.Vector3(-40, 80, -40),
            castShadow: false
          }
        ]
      },
      sky: {
        topColor: 0x7a8a9a,
        middleColor: 0x9eb3c2,
        bottomColor: 0xb8c8d8,
        exponent: 0.8
      },
      postProcessing: {
        vignette: { intensity: 0.3, smoothness: 0.7 },
        colorGrading: { tint: 0x9eb3c2, contrast: 0.9, brightness: 0.95 }
      },
      atmosphere: {
        particles: { type: 'rain', density: 1500 }, // Optimized from 2000
        wind: new THREE.Vector3(-2, 0, -1),
        volumetricLight: true
      }
    };
  }

  protected setupEnvironment(): void {
    super.setupEnvironment();
    this.createCloudLayers();
    this.createLightningEffect();
  }

  private createCloudLayers(): void {
    // Create multiple layers of volumetric clouds for depth
    const cloudLayerConfigs = [
      { y: 80, scale: 1.0, opacity: 0.4, speed: 0.3 },
      { y: 100, scale: 1.2, opacity: 0.3, speed: 0.5 },
      { y: 120, scale: 1.5, opacity: 0.25, speed: 0.7 }
    ];

    cloudLayerConfigs.forEach(config => {
      const cloudGeometry = new THREE.PlaneGeometry(400, 400, 32, 32);
      const cloudMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          cloudiness: { value: 0.6 },
          opacity: { value: config.opacity }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float cloudiness;
          uniform float opacity;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          // Improved Perlin-like noise function
          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }
          
          float smoothNoise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            
            float a = noise(i);
            float b = noise(i + vec2(1.0, 0.0));
            float c = noise(i + vec2(0.0, 1.0));
            float d = noise(i + vec2(1.0, 1.0));
            
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }
          
          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            
            for (int i = 0; i < 5; i++) {
              value += amplitude * smoothNoise(p * frequency);
              frequency *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }
          
          void main() {
            vec2 uv = vUv * 4.0;
            uv += time * 0.02;
            
            float cloud = fbm(uv);
            cloud = smoothstep(1.0 - cloudiness, 1.0, cloud);
            
            // Add some variation
            float detail = fbm(uv * 2.0 + time * 0.01) * 0.3;
            cloud = mix(cloud, cloud + detail, 0.5);
            
            vec3 cloudColor = vec3(0.85, 0.90, 0.95);
            float alpha = cloud * opacity;
            
            gl_FragColor = vec4(cloudColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending
      });

      const cloudLayer = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloudLayer.rotation.x = -Math.PI / 2;
      cloudLayer.position.y = config.y;
      cloudLayer.scale.setScalar(config.scale);
      cloudLayer.userData.speed = config.speed;

      this.cloudLayers.push(cloudLayer);
      this.scene.add(cloudLayer);
    });
  }

  private createLightningEffect(): void {
    // Create a point light for lightning flashes
    this.lightningFlash = new THREE.PointLight(0xaaccff, 0, 300);
    this.lightningFlash.position.set(0, 100, 0);
    this.scene.add(this.lightningFlash);
    this.nextLightning = 5 + Math.random() * 10; // First lightning in 5-15 seconds
  }

  protected customUpdate(time: number, playerPosition: THREE.Vector3): void {
    // Animate cloud layers
    this.cloudLayers.forEach((layer, index) => {
      const material = layer.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time * layer.userData.speed;
      
      // Move clouds with player but add parallax effect
      layer.position.x = playerPosition.x * (0.9 - index * 0.1);
      layer.position.z = playerPosition.z * (0.9 - index * 0.1);
    });

    // Lightning effect
    if (this.lightningFlash && time > this.nextLightning) {
      this.triggerLightning(playerPosition);
      this.nextLightning = time + 8 + Math.random() * 15; // Next lightning in 8-23 seconds
    }

    // Fade out lightning
    if (this.lightningFlash && this.lightningFlash.intensity > 0) {
      this.lightningFlash.intensity *= 0.85;
      if (this.lightningFlash.intensity < 0.1) {
        this.lightningFlash.intensity = 0;
      }
    }
  }

  private triggerLightning(playerPosition: THREE.Vector3): void {
    if (!this.lightningFlash) return;

    // Random position around player
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    
    this.lightningFlash.position.set(
      playerPosition.x + Math.cos(angle) * distance,
      80 + Math.random() * 40,
      playerPosition.z + Math.sin(angle) * distance
    );
    
    this.lightningFlash.intensity = 15 + Math.random() * 10;
  }

  public dispose(): void {
    super.dispose();

    // Clean up cloud layers
    this.cloudLayers.forEach(layer => {
      this.scene.remove(layer);
      layer.geometry.dispose();
      (layer.material as THREE.Material).dispose();
    });
    this.cloudLayers = [];

    // Clean up lightning
    if (this.lightningFlash) {
      this.scene.remove(this.lightningFlash);
      this.lightningFlash = undefined;
    }
  }
}

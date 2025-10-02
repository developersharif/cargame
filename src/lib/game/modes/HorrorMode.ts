import * as THREE from 'three';
import GameMode, { type GameModeConfig } from './GameMode';

export default class HorrorMode extends GameMode {
  private flickeringLights: THREE.PointLight[] = [];
  private ghostlyFog?: THREE.Mesh;
  private shadowFigures: THREE.Mesh[] = [];
  private ambientPulse = 0;
  private bloodMoon?: THREE.Mesh;

  getConfig(): GameModeConfig {
    return {
      name: 'Horror',
      description: 'Terrifying dark atmosphere with limited visibility, eerie lighting, and supernatural elements',
      fog: {
        color: 0x0d0d15,
        near: 5,
        far: 60
      },
      lighting: {
        ambient: {
          color: 0x1a1a28,
          intensity: 0.08
        },
        hemisphere: {
          skyColor: 0x0d0d15,
          groundColor: 0x050508,
          intensity: 0.12
        },
        directional: [
          {
            color: 0x8b1a3a,
            intensity: 0.25,
            position: new THREE.Vector3(30, 80, 20),
            castShadow: true,
            shadowBias: -0.0005
          }
        ]
      },
      sky: {
        topColor: 0x050508,
        middleColor: 0x0d0d15,
        bottomColor: 0x1a0d15,
        exponent: 1.8
      },
      postProcessing: {
        vignette: { intensity: 0.8, smoothness: 0.5 },
        colorGrading: { tint: 0x1a1a2e, contrast: 1.2, brightness: 0.7 }
      },
      atmosphere: {
        particles: { type: 'fog', density: 2000 }, // Optimized from 3000
        wind: new THREE.Vector3(0.5, 0, 0.5),
        volumetricLight: true
      }
    };
  }

  protected setupEnvironment(): void {
    super.setupEnvironment();
    this.createBloodMoon();
    this.createFlickeringLights();
    this.createGhostlyFog();
    this.createShadowFigures();
  }

  private createBloodMoon(): void {
    // Create a large, ominous blood-red moon
    const moonGeometry = new THREE.SphereGeometry(40, 32, 32);
    const moonMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        moonColor: { value: new THREE.Color(0x8b0000) },
        glowColor: { value: new THREE.Color(0xff4444) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 moonColor;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
        }
        
        void main() {
          // Moon surface with craters
          float crater = noise(vPosition * 2.0 + time * 0.01);
          crater = smoothstep(0.6, 0.7, crater) * 0.3;
          
          vec3 color = moonColor * (1.0 - crater);
          
          // Add atmospheric glow
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          rim = pow(rim, 2.0);
          color = mix(color, glowColor, rim * 0.5);
          
          // Pulsing effect
          float pulse = sin(time * 0.5) * 0.1 + 0.9;
          color *= pulse;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.FrontSide
    });

    this.bloodMoon = new THREE.Mesh(moonGeometry, moonMaterial);
    this.bloodMoon.position.set(-200, 150, -300);
    this.scene.add(this.bloodMoon);
  }

  private createFlickeringLights(): void {
    // Create eerie flickering point lights along the track
    const lightPositions = [
      { x: -15, z: 50 },
      { x: 15, z: 100 },
      { x: -15, z: 150 },
      { x: 15, z: 200 },
      { x: -15, z: 250 },
      { x: 15, z: 300 }
    ];

    lightPositions.forEach(pos => {
      const light = new THREE.PointLight(0xff6622, 3, 30);
      light.position.set(pos.x, 3, pos.z);
      light.castShadow = true;
      light.shadow.mapSize.setScalar(512);
      light.userData.baseIntensity = 3;
      light.userData.flickerSpeed = 0.5 + Math.random() * 2;
      light.userData.flickerPhase = Math.random() * Math.PI * 2;

      this.flickeringLights.push(light);
      this.scene.add(light);

      // Add realistic Victorian-style lamp post
      const lampGroup = new THREE.Group();
      lampGroup.position.copy(light.position);
      lampGroup.position.y = 0;

      // Base
      const baseGeom = new THREE.CylinderGeometry(0.4, 0.5, 0.3, 12);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.7,
        roughness: 0.4,
        envMapIntensity: 0.3
      });
      const base = new THREE.Mesh(baseGeom, baseMat);
      base.position.y = 0.15;
      base.castShadow = true;
      lampGroup.add(base);

      // Main pole (tapered, weathered)
      const poleGeom = new THREE.CylinderGeometry(0.12, 0.15, 4.5, 12);
      const poleMat = new THREE.MeshStandardMaterial({
        color: 0x0f0f0f,
        metalness: 0.5,
        roughness: 0.7,
        envMapIntensity: 0.2
      });
      const pole = new THREE.Mesh(poleGeom, poleMat);
      pole.position.y = 2.55;
      pole.castShadow = true;
      lampGroup.add(pole);

      // Decorative neck
      const neckGeom = new THREE.CylinderGeometry(0.18, 0.15, 0.4, 12);
      const neck = new THREE.Mesh(neckGeom, poleMat);
      neck.position.y = 5.0;
      lampGroup.add(neck);

      // Lantern housing (hexagonal cage)
      const housingGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.8, 6);
      const housingMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8
      });
      const housing = new THREE.Mesh(housingGeom, housingMat);
      housing.position.y = 5.6;
      lampGroup.add(housing);

      // Glass panes (dirty, yellowish)
      const glassGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.7, 6);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x332211,
        metalness: 0,
        roughness: 0.4,
        transparent: true,
        opacity: 0.3,
        transmission: 0.6
      });
      const glass = new THREE.Mesh(glassGeom, glassMat);
      glass.position.y = 5.6;
      lampGroup.add(glass);

      // Top cap (pyramid)
      const capGeom = new THREE.ConeGeometry(0.4, 0.4, 6);
      const cap = new THREE.Mesh(capGeom, baseMat);
      cap.position.y = 6.2;
      lampGroup.add(cap);

      // Glowing filament bulb (realistic old bulb)
      const bulbGeometry = new THREE.SphereGeometry(0.18, 16, 16);
      const bulbMaterial = new THREE.MeshStandardMaterial({
        color: 0xffaa44,
        emissive: 0xff8822,
        emissiveIntensity: 3,
        transparent: true,
        opacity: 0.9
      });
      const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
      bulb.position.y = 5.6;
      lampGroup.add(bulb);

      // Store reference to bulb for flickering effect
      light.userData.bulb = bulb;

      this.scene.add(lampGroup);
    });
  }

  private createGhostlyFog(): void {
    // Create animated ghostly fog that moves across the ground
    const fogGeometry = new THREE.PlaneGeometry(200, 200, 64, 64);
    const fogMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        fogColor: { value: new THREE.Color(0x3a2a4a) },
        opacity: { value: 0.6 }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vHeight;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Animated waves in the fog
          float wave1 = sin(pos.x * 0.5 + time) * 0.3;
          float wave2 = cos(pos.y * 0.3 + time * 0.7) * 0.2;
          pos.z += wave1 + wave2;
          
          vHeight = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 fogColor;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vHeight;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for(int i = 0; i < 4; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vec2 uv1 = vUv * 2.5 + time * 0.08;
          vec2 uv2 = vUv * 1.8 + time * 0.05;
          
          float n1 = fbm(uv1);
          float n2 = fbm(uv2 + vec2(100.0));
          
          float combined = (n1 + n2) * 0.5;
          combined = smoothstep(0.25, 0.75, combined);
          
          // Wispy tendrils
          float tendrils = smoothstep(0.4, 0.8, n1) * smoothstep(0.3, 0.7, n2);
          
          float alpha = combined * opacity * 0.7;
          alpha += tendrils * opacity * 0.4;
          alpha *= smoothstep(-0.6, 0.4, vHeight);
          
          // Darken fog color for more ominous feel
          vec3 darkFog = fogColor * 0.7;
          
          gl_FragColor = vec4(darkFog, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending
    });

    this.ghostlyFog = new THREE.Mesh(fogGeometry, fogMaterial);
    this.ghostlyFog.rotation.x = -Math.PI / 2;
    this.ghostlyFog.position.y = 0.5;
    this.scene.add(this.ghostlyFog);
  }

  private createShadowFigures(): void {
    // Create mysterious shadow figures that appear in the distance
    const figureGeometry = new THREE.CylinderGeometry(0.5, 0.3, 2.5, 8);
    const figureMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.7
    });

    for (let i = 0; i < 8; i++) {
      const figure = new THREE.Mesh(figureGeometry, figureMaterial.clone());
      const angle = (i / 8) * Math.PI * 2;
      const distance = 40 + Math.random() * 20;
      
      figure.position.set(
        Math.cos(angle) * distance,
        1.25,
        Math.sin(angle) * distance
      );
      
      figure.userData.angle = angle;
      figure.userData.distance = distance;
      figure.userData.visible = false;
      figure.visible = false;

      this.shadowFigures.push(figure);
      this.scene.add(figure);
    }
  }

  protected customUpdate(time: number, playerPosition: THREE.Vector3): void {
    this.ambientPulse = time;

    // Animate blood moon
    if (this.bloodMoon) {
      const material = this.bloodMoon.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
      
      // Moon follows player at fixed distance
      this.bloodMoon.position.x = playerPosition.x - 200;
      this.bloodMoon.position.z = playerPosition.z - 300;
    }

    // Flicker lights with dramatic, unsettling patterns
    this.flickeringLights.forEach(light => {
      const flicker = Math.sin(time * light.userData.flickerSpeed + light.userData.flickerPhase);
      const jitter = Math.sin(time * 15.7 + light.userData.flickerPhase * 3) * 0.15;
      const random = Math.random() * 0.2;
      
      // More dramatic flickering
      let intensity = light.userData.baseIntensity * (0.5 + flicker * 0.3 + jitter + random);
      
      // Occasionally stutter or die completely
      if (Math.random() < 0.003) {
        intensity = Math.random() < 0.7 ? 0 : light.userData.baseIntensity * 0.2;
        setTimeout(() => {
          // Sometimes stay off longer for dread
          if (light && Math.random() > 0.3) {
            light.intensity = light.userData.baseIntensity;
          }
        }, 50 + Math.random() * 600);
      }
      
      light.intensity = Math.max(0, intensity);
      
      // Sync bulb emissive with light intensity
      if (light.userData.bulb) {
        const bulbMat = light.userData.bulb.material as THREE.MeshStandardMaterial;
        bulbMat.emissiveIntensity = 1 + (light.intensity / light.userData.baseIntensity) * 3;
        bulbMat.opacity = 0.7 + (light.intensity / light.userData.baseIntensity) * 0.3;
      }

      // Move lights with player progression
      if (light.position.z < playerPosition.z - 100) {
        light.position.z += 300;
      }
    });

    // Animate ghostly fog
    if (this.ghostlyFog) {
      const material = this.ghostlyFog.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
      
      // Follow player
      this.ghostlyFog.position.x = playerPosition.x;
      this.ghostlyFog.position.z = playerPosition.z;
    }

    // Animate shadow figures
    this.shadowFigures.forEach((figure) => {
      // Randomly show/hide figures
      if (Math.random() < 0.002 && !figure.userData.visible) {
        figure.userData.visible = true;
        figure.visible = true;
        (figure.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      if (figure.userData.visible) {
        const material = figure.material as THREE.MeshBasicMaterial;
        
        // Fade in
        if (material.opacity < 0.7) {
          material.opacity += 0.02;
        }
        
        // Slowly move towards player
        const dx = playerPosition.x - figure.position.x;
        const dz = playerPosition.z - figure.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        if (distance > 15) {
          figure.position.x += (dx / distance) * 0.05;
          figure.position.z += (dz / distance) * 0.05;
        }
        
        // Disappear if too close
        if (distance < 10) {
          material.opacity -= 0.05;
          if (material.opacity <= 0) {
            figure.userData.visible = false;
            figure.visible = false;
            
            // Respawn at new location
            const angle = Math.random() * Math.PI * 2;
            const dist = 50 + Math.random() * 30;
            figure.position.set(
              playerPosition.x + Math.cos(angle) * dist,
              1.25,
              playerPosition.z + Math.sin(angle) * dist
            );
          }
        }
        
        // Look at player
        figure.lookAt(playerPosition.x, figure.position.y, playerPosition.z);
      }
    });

    // Pulse ambient light for unsettling effect
    const ambientLight = this.lights.find(l => l instanceof THREE.AmbientLight) as THREE.AmbientLight;
    if (ambientLight) {
      const pulse = Math.sin(time * 0.3) * 0.03 + 0.97;
      ambientLight.intensity = 0.15 * pulse;
    }
  }

  public dispose(): void {
    super.dispose();

    // Clean up blood moon
    if (this.bloodMoon) {
      this.scene.remove(this.bloodMoon);
      this.bloodMoon.geometry.dispose();
      (this.bloodMoon.material as THREE.Material).dispose();
      this.bloodMoon = undefined;
    }

    // Clean up flickering lights
    this.flickeringLights.forEach(light => {
      this.scene.remove(light);
    });
    this.flickeringLights = [];

    // Clean up ghostly fog
    if (this.ghostlyFog) {
      this.scene.remove(this.ghostlyFog);
      this.ghostlyFog.geometry.dispose();
      (this.ghostlyFog.material as THREE.Material).dispose();
      this.ghostlyFog = undefined;
    }

    // Clean up shadow figures
    this.shadowFigures.forEach(figure => {
      this.scene.remove(figure);
      figure.geometry.dispose();
      (figure.material as THREE.Material).dispose();
    });
    this.shadowFigures = [];
  }
}

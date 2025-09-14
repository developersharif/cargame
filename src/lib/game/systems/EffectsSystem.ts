import * as THREE from 'three';

export default class EffectsSystem {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private particleGroups: THREE.Group[] = [];
  private screenShakeIntensity = 0;
  private screenShakeDecay = 0.95;
  private originalCameraPosition = new THREE.Vector3();

  constructor(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.camera = camera;
  }

  public update(deltaTime: number) {
    // Update particles
    this.updateParticles(deltaTime);

    // Update screen shake
    this.updateScreenShake(deltaTime);

    // Clean up old particle groups
    this.cleanupParticles();
  }

  public createCollisionEffect(position: THREE.Vector3, intensity: number = 1) {
    // Create sparks effect
    this.createSparks(position, intensity);
    
    // Create dust/debris effect
    this.createDebris(position, intensity);

    // Trigger screen shake
    this.addScreenShake(intensity * 0.5);
  }

  public createBoostEffect(position: THREE.Vector3) {
    // Create blue/cyan particles trailing behind the car
    const particleCount = 20;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a cone behind the car
      positions[i * 3] = position.x + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = position.y + Math.random() * 0.5;
      positions[i * 3 + 2] = position.z - Math.random() * 3;

      // Blue/cyan colors
      colors[i * 3] = 0.2 + Math.random() * 0.3; // R
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i * 3 + 2] = 1.0; // B

      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(particles);
    (group as any).startTime = performance.now();
    (group as any).duration = 1000; // 1 second
    (group as any).type = 'boost';

    this.scene.add(group);
    this.particleGroups.push(group);
  }

  private createSparks(position: THREE.Vector3, intensity: number) {
    const particleCount = Math.floor(20 * intensity);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start at collision point
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      // Random velocities for sparks
      velocities[i * 3] = (Math.random() - 0.5) * 10;
      velocities[i * 3 + 1] = Math.random() * 5 + 2;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Orange/yellow spark colors
      colors[i * 3] = 1.0; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5; // G
      colors[i * 3 + 2] = 0.0; // B
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const particles = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(particles);
    (group as any).startTime = performance.now();
    (group as any).duration = 1500; // 1.5 seconds
    (group as any).type = 'sparks';

    this.scene.add(group);
    this.particleGroups.push(group);
  }

  private createDebris(position: THREE.Vector3, intensity: number) {
    const particleCount = Math.floor(15 * intensity);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = position.x + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = position.y + Math.random() * 0.5;
      positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 0.5;

      // Debris velocities (slower than sparks)
      velocities[i * 3] = (Math.random() - 0.5) * 3;
      velocities[i * 3 + 1] = Math.random() * 2 + 1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 3;

      // Dust/debris colors (grays and browns)
      const gray = 0.3 + Math.random() * 0.4;
      colors[i * 3] = gray;
      colors[i * 3 + 1] = gray * 0.8;
      colors[i * 3 + 2] = gray * 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });

    const particles = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(particles);
    (group as any).startTime = performance.now();
    (group as any).duration = 2000; // 2 seconds
    (group as any).type = 'debris';

    this.scene.add(group);
    this.particleGroups.push(group);
  }

  private updateParticles(deltaTime: number) {
    const currentTime = performance.now();

    this.particleGroups.forEach(group => {
      const elapsed = currentTime - (group as any).startTime;
      const duration = (group as any).duration;
      const progress = elapsed / duration;

      if (progress >= 1) return; // Will be cleaned up

      const particles = group.children[0] as THREE.Points;
      const geometry = particles.geometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const velocities = geometry.attributes.velocity?.array as Float32Array;

      if (velocities) {
        // Update particle positions based on velocity
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i] * deltaTime;
          positions[i + 1] += velocities[i + 1] * deltaTime;
          positions[i + 2] += velocities[i + 2] * deltaTime;

          // Apply gravity to Y velocity
          velocities[i + 1] -= 9.8 * deltaTime;
        }

        geometry.attributes.position.needsUpdate = true;
      }

      // Fade out particles over time
      const material = particles.material as THREE.PointsMaterial;
      material.opacity = 1 - progress;
    });
  }

  private addScreenShake(intensity: number) {
    this.screenShakeIntensity = Math.max(this.screenShakeIntensity, intensity);
  }

  private updateScreenShake(deltaTime: number) {
    if (this.screenShakeIntensity > 0) {
      // Apply random offset to camera
      const shakeX = (Math.random() - 0.5) * this.screenShakeIntensity;
      const shakeY = (Math.random() - 0.5) * this.screenShakeIntensity;
      const shakeZ = (Math.random() - 0.5) * this.screenShakeIntensity;

      // Store original position if not already stored
      if (this.originalCameraPosition.length() === 0) {
        this.originalCameraPosition.copy(this.camera.position);
      }

      // Apply shake
      this.camera.position.add(new THREE.Vector3(shakeX, shakeY, shakeZ));

      // Decay shake intensity
      this.screenShakeIntensity *= this.screenShakeDecay;

      if (this.screenShakeIntensity < 0.001) {
        this.screenShakeIntensity = 0;
      }
    }
  }

  private cleanupParticles() {
    const currentTime = performance.now();
    
    this.particleGroups = this.particleGroups.filter(group => {
      const elapsed = currentTime - (group as any).startTime;
      const duration = (group as any).duration;

      if (elapsed >= duration) {
        this.scene.remove(group);
        return false;
      }
      return true;
    });
  }

  public dispose() {
    this.particleGroups.forEach(group => {
      this.scene.remove(group);
    });
    this.particleGroups = [];
  }
}
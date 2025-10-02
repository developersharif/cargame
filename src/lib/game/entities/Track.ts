import * as THREE from 'three';
import type { ObstacleBox } from '../systems/CollisionSystem';

export default class Track {
  public readonly group = new THREE.Group();
  public readonly obstacles: ObstacleBox[] = [];
  private segments: THREE.Group[] = [];
  private segmentLength = 100; // Length of each track segment
  private currentSegment = 0;
  private maxSegments = 5; // Keep 5 segments loaded at a time
  
  // Shared geometries and materials for performance
  private static sharedConeGeometry: THREE.ConeGeometry;
  private static sharedConeMaterial: THREE.MeshStandardMaterial;
  private static sharedBarrierGeometry: THREE.BoxGeometry;
  private static sharedBarrierMaterial: THREE.MeshStandardMaterial;
  private static sharedTrunkGeometry: THREE.CylinderGeometry;
  private static sharedTrunkMaterial: THREE.MeshStandardMaterial;
  private static sharedCrownGeometry: THREE.SphereGeometry;
  private static sharedLeafMaterial: THREE.MeshStandardMaterial;
  private static sharedPoleGeometry: THREE.CylinderGeometry;
  private static sharedPoleMaterial: THREE.MeshStandardMaterial;
  private static sharedLampGeometry: THREE.SphereGeometry;
  private static sharedLampMaterial: THREE.MeshStandardMaterial;
  
  constructor() {
    // Initialize shared resources once
    this.initializeSharedResources();
    
    // Generate initial segments
    for (let i = 0; i < this.maxSegments; i++) {
      this.generateSegment(i);
    }
  }
  
  private initializeSharedResources() {
    if (!Track.sharedConeGeometry) {
      Track.sharedConeGeometry = new THREE.ConeGeometry(0.3, 0.8, 8);
      Track.sharedConeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        roughness: 0.7,
        metalness: 0.0
      });
      
      Track.sharedBarrierGeometry = new THREE.BoxGeometry(3, 1.2, 0.4);
      Track.sharedBarrierMaterial = new THREE.MeshStandardMaterial({
        color: 0xe0e0e0,
        roughness: 0.8,
        metalness: 0.1
      });
      
      Track.sharedTrunkGeometry = new THREE.CylinderGeometry(0.15, 0.25, 3, 8);
      Track.sharedTrunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a3728,
        roughness: 0.95,
        metalness: 0.0
      });
      
      Track.sharedCrownGeometry = new THREE.SphereGeometry(1.5, 8, 6);
      Track.sharedLeafMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5016,
        roughness: 0.9,
        metalness: 0.0,
        transparent: true,
        opacity: 0.9
      });
      
      Track.sharedPoleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
      Track.sharedPoleMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.3,
        metalness: 0.8
      });
      
      Track.sharedLampGeometry = new THREE.SphereGeometry(0.5, 8, 6);
      Track.sharedLampMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0x333311,
        roughness: 0.1,
        metalness: 0.1
      });
    }
  }
  
  // Update track based on player position
  public update(playerZ: number) {
    const playerSegment = Math.floor(playerZ / this.segmentLength);
    
    // Only update if player has moved to a new segment
    if (playerSegment <= this.currentSegment) {
      return;
    }
    
    // Generate new segments ahead if needed
    while (playerSegment + 2 > this.currentSegment) {
      this.currentSegment++;
      this.generateSegment(this.currentSegment + 2);
    }
    
    // Remove old segments behind player (improved performance)
    this.segments.forEach((segment, index) => {
      if (segment && index < playerSegment - 2) {
        this.group.remove(segment);
        // Dispose of geometries and materials to prevent memory leaks
        segment.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
        this.segments[index] = null!;
        
        // Efficiently remove obstacles for this segment
        const segmentStartZ = index * this.segmentLength;
        const segmentEndZ = (index + 1) * this.segmentLength;
        // Remove obstacles in this segment by splicing out matching indices
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obs = this.obstacles[i];
          const obsZ = (obs.aabb.minZ + obs.aabb.maxZ) / 2;
          if (obsZ >= segmentStartZ && obsZ <= segmentEndZ) {
            this.obstacles.splice(i, 1);
          }
        }
      }
    });
  }
  
  private generateSegment(segmentIndex: number) {
    const segment = new THREE.Group();
    const startZ = segmentIndex * this.segmentLength;
    
    // Generate random obstacles for this segment
    this.createSegmentObstacles(segment, startZ);
    
    this.segments[segmentIndex] = segment;
    this.group.add(segment);
  }
  
  private createSegmentObstacles(segment: THREE.Group, startZ: number): void {
    // Reduce object counts for better performance
    // Generate fewer cones (2-3 instead of 3-6)
    const numCones = 2 + Math.floor(Math.random() * 2); 
    for (let i = 0; i < numCones; i++) {
      const cone = new THREE.Mesh(Track.sharedConeGeometry, Track.sharedConeMaterial);
      
      const x = (Math.random() - 0.5) * 18; // Slightly smaller range
      const z = startZ + Math.random() * this.segmentLength;
      
      cone.position.set(x, 0.4, z);
      cone.castShadow = true;
      cone.receiveShadow = true;
      segment.add(cone);
      
      // Add collision for this cone
      this.obstacles.push({
        aabb: {
          minX: x - 0.25,
          maxX: x + 0.25,
          minZ: z - 0.25,
          maxZ: z + 0.25
        }
      });
    }
    
    // Reduce barrier frequency (20% chance instead of 30%)
    if (Math.random() < 0.2) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const barrier = new THREE.Mesh(Track.sharedBarrierGeometry, Track.sharedBarrierMaterial);
      
      const x = side * 18;
      const z = startZ + Math.random() * this.segmentLength;
      
      barrier.position.set(x, 0.6, z);
      barrier.castShadow = true;
      barrier.receiveShadow = true;
      segment.add(barrier);
      
      // Add collision
      this.obstacles.push({
        aabb: {
          minX: x - 1.5,
          maxX: x + 1.5,
          minZ: z - 0.2,
          maxZ: z + 0.2
        }
      });
    }
    
    // Reduce tree and lamp generation frequency
    this.addSegmentTrees(segment, startZ);
    this.addSegmentLampPosts(segment, startZ);
  }
  
  private addSegmentTrees(segment: THREE.Group, startZ: number): void {
    // Significantly reduce tree count (2-4 instead of 4-9)
    const numTrees = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numTrees; i++) {
      // Use shared geometries and materials
      const trunk = new THREE.Mesh(Track.sharedTrunkGeometry, Track.sharedTrunkMaterial);
      const crown = new THREE.Mesh(Track.sharedCrownGeometry, Track.sharedLeafMaterial);
      
      // Position trees further from track to separate road from surroundings
      const side = Math.random() < 0.5 ? -1 : 1;
      const distance = 30 + Math.random() * 25; // 30-55 units from center (further away)
      const x = side * distance;
      const z = startZ + Math.random() * this.segmentLength;
      const scale = 0.8 + Math.random() * 0.4;
      
      trunk.position.set(x, 1.5 * scale, z);
      trunk.scale.setScalar(scale);
      trunk.castShadow = false; // Disable shadows for performance
      trunk.receiveShadow = false;
      
      crown.position.set(x, 3.2 * scale, z);
      crown.scale.setScalar(scale);
      crown.castShadow = false; // Disable shadows for performance
      crown.receiveShadow = false;
      
      segment.add(trunk, crown);
      
      // Add collision for tree trunk
      this.obstacles.push({
        aabb: {
          minX: x - 0.3 * scale,
          maxX: x + 0.3 * scale,
          minZ: z - 0.3 * scale,
          maxZ: z + 0.3 * scale
        }
      });
    }
  }
  
  private addSegmentLampPosts(segment: THREE.Group, startZ: number): void {
    // Reduce lamp post frequency (25% chance instead of 40%)
    if (Math.random() < 0.25) {
      const numLamps = 1 + Math.floor(Math.random() * 2); // 1-2 lamp posts per segment (was 1-3)
      
      for (let i = 0; i < numLamps; i++) {
        // Use shared geometries and materials
        const pole = new THREE.Mesh(Track.sharedPoleGeometry, Track.sharedPoleMaterial);
        const lamp = new THREE.Mesh(Track.sharedLampGeometry, Track.sharedLampMaterial);
        
        // Position lamp posts closer to road for better separation
        const side = Math.random() < 0.5 ? -1 : 1;
        const x = side * (12 + Math.random() * 3); // 12-15 units from center (closer to road)
        const z = startZ + (i + 1) * (this.segmentLength / (numLamps + 1));
        
        pole.position.set(x, 4, z);
        pole.castShadow = false; // Disable shadows for performance
        pole.receiveShadow = false;
        
        lamp.position.set(x, 7.5, z);
        lamp.castShadow = false; // Disable shadows for performance
        
        // Reduce point light intensity and range for performance
        const pointLight = new THREE.PointLight(0xffffcc, 0.3, 15); // Reduced intensity and range
        pointLight.position.set(x, 7.5, z);
        pointLight.castShadow = false; // Disable shadow casting for performance
        
        segment.add(pole, lamp, pointLight);
        
        // Add collision for lamp post pole
        this.obstacles.push({
          aabb: {
            minX: x - 0.15,
            maxX: x + 0.15,
            minZ: z - 0.15,
            maxZ: z + 0.15
          }
        });
      }
    }
  }
}

import * as THREE from 'three';

export interface AABB2D {
  minX: number; minZ: number; maxX: number; maxZ: number;
}

export interface ObstacleBox {
  aabb: AABB2D;
}

export default class CollisionSystem {
  constructor(private obstacles: ObstacleBox[]) {}

  // Resolve car vs static boxes; returns true if any collision
  resolve(position: THREE.Vector3, velocity: THREE.Vector3, carAabb: AABB2D): boolean {
    let collided = false;
    const minMove = new THREE.Vector2();
    const carCenter = new THREE.Vector2(
      (carAabb.minX + carAabb.maxX) * 0.5,
      (carAabb.minZ + carAabb.maxZ) * 0.5
    );
    const half = new THREE.Vector2(
      (carAabb.maxX - carAabb.minX) * 0.5,
      (carAabb.maxZ - carAabb.minZ) * 0.5
    );

    for (const obs of this.obstacles) {
      const oCenter = new THREE.Vector2(
        (obs.aabb.minX + obs.aabb.maxX) * 0.5,
        (obs.aabb.minZ + obs.aabb.maxZ) * 0.5
      );
      const oHalf = new THREE.Vector2(
        (obs.aabb.maxX - obs.aabb.minX) * 0.5,
        (obs.aabb.maxZ - obs.aabb.minZ) * 0.5
      );

      const dx = carCenter.x - oCenter.x;
      const dz = carCenter.y - oCenter.y;
      const px = half.x + oHalf.x - Math.abs(dx);
      const pz = half.y + oHalf.y - Math.abs(dz);
      if (px > 0 && pz > 0) {
        // penetration on both axes -> collision
        collided = true;
        if (px < pz) {
          // push along X
          const sx = Math.sign(dx) || 1;
          minMove.set(px * sx, 0);
          position.x += minMove.x;
          carCenter.x += minMove.x;
          // damp velocity along X
          velocity.x *= -0.2; // slight bounce
        } else {
          // push along Z
          const sz = Math.sign(dz) || 1;
          minMove.set(0, pz * sz);
          position.z += minMove.y;
          carCenter.y += minMove.y;
          velocity.z *= -0.2;
        }
      }
    }
    return collided;
  }
}

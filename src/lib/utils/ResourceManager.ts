import * as THREE from 'three';

export class ResourceManager {
  static disposeMaterial(mat: THREE.Material | THREE.Material[] | undefined) {
    if (!mat) return;
    const disposeOne = (m: THREE.Material) => {
      // @ts-expect-error - some materials may have custom dispose paths
      if (m.map) (m.map as THREE.Texture).dispose?.();
      m.dispose();
    };
    if (Array.isArray(mat)) mat.forEach(disposeOne);
    else disposeOne(mat);
  }

  static disposeObject(obj: THREE.Object3D) {
    obj.traverse((child: any) => {
      if (child.geometry) child.geometry.dispose?.();
      if (child.material) ResourceManager.disposeMaterial(child.material);
      if (child instanceof THREE.InstancedMesh) child.dispose?.();
      if (child instanceof THREE.Mesh && child.userData?.dispose) child.userData.dispose();
    });
  }

  static disposeScene(scene: THREE.Scene) {
    scene.traverse((child) => {
      // dispose geometries/materials
      // @ts-ignore
      if (child.geometry) child.geometry.dispose?.();
      // @ts-ignore
      if (child.material) ResourceManager.disposeMaterial(child.material);
    });
  }
}

export class ObjectPool<T> {
  private pool: T[] = [];
  constructor(private factory: () => T, private reset?: (obj: T) => void) {}
  acquire(): T {
    return this.pool.pop() ?? this.factory();
  }
  release(obj: T) {
    this.reset?.(obj);
    this.pool.push(obj);
  }
  size() {
    return this.pool.length;
  }
}

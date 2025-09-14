import * as THREE from 'three';

export class AssetLoader {
  private textureLoader = new THREE.TextureLoader();
  private cache = new Map<string, any>();

  async loadTexture(url: string): Promise<THREE.Texture> {
    if (this.cache.has(url)) return this.cache.get(url);
    const tex = await new Promise<THREE.Texture>((resolve, reject) => {
      this.textureLoader.load(url, resolve, undefined, reject);
    });
    this.cache.set(url, tex);
    return tex;
  }

  dispose(url?: string) {
    if (url) {
      const res = this.cache.get(url);
      if (res && 'dispose' in res && typeof res.dispose === 'function') res.dispose();
      this.cache.delete(url);
      return;
    }
    this.cache.forEach((res) => {
      if (res && 'dispose' in res && typeof res.dispose === 'function') res.dispose();
    });
    this.cache.clear();
  }
}

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class RenderSystem {
  private composer: EffectComposer;
  private renderPass: RenderPass;
  private bloom: UnrealBloomPass;
  private useComposer: boolean = true;

  constructor(
    private scene: THREE.Scene,
    private camera: THREE.PerspectiveCamera,
    private renderer: THREE.WebGLRenderer
  ) {
    // Configure renderer for high quality
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Handle different Three.js versions
    try {
      // Modern Three.js (r152+)
      (this.renderer as any).outputColorSpace = 'srgb';
    } catch {
      try {
        // Older Three.js versions
        (this.renderer as any).outputEncoding = (THREE as any).sRGBEncoding || 3001;
      } catch {
        console.warn('Could not set output color space/encoding');
      }
    }
    
    try {
      // Try to set up post-processing
      this.composer = new EffectComposer(this.renderer);
      
      // Base render pass
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);
      
      // Simple bloom effect
      const size = new THREE.Vector2();
      this.renderer.getSize(size);
      this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.5, 1.0, 0.2);
      this.composer.addPass(this.bloom);
      
      this.useComposer = true;
    } catch (error) {
      console.warn('Post-processing setup failed, falling back to direct rendering:', error);
      this.useComposer = false;
    }
  }

  render() {
    // Use direct rendering for better compatibility
    this.renderer.render(this.scene, this.camera);
  }

  updateSize(w: number, h: number) {
    try {
      if (this.useComposer && this.composer) {
        this.composer.setSize(w, h);
        this.bloom?.setSize(w, h);
      }
    } catch (error) {
      console.warn('Post-processing resize failed:', error);
    }
  }
}

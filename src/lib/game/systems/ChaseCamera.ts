import * as THREE from 'three';

export default class ChaseCamera {
  private targetPos = new THREE.Vector3();
  private targetLook = new THREE.Vector3();
  private current = new THREE.Vector3();
  private baseFov = 60;
  private boostVisual = 0; // 0..1

  constructor(private camera: THREE.PerspectiveCamera, private offset = new THREE.Vector3(0, 2, -4)) {}

  update(dt: number, follow: THREE.Object3D) {
    // Compute desired camera position based on follow heading
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, follow.rotation.y, 0));
    const desiredOffset = this.offset.clone().applyQuaternion(q);
    this.targetPos.copy(follow.position).add(desiredOffset);
    this.targetLook.copy(follow.position).add(new THREE.Vector3(0, 0.7, 0));

    // Smooth move
    const lerpFactor = 1 - Math.pow(0.001, dt); // exponential smoothing
    this.current.lerp(this.targetPos, lerpFactor);
    if (this.current.lengthSq() === 0) this.current.copy(this.targetPos); // init

    // Subtle camera shake and FOV kick based on boostVisual
    const shake = 0.03 * this.boostVisual;
    if (shake > 0) {
      this.camera.position.set(
        this.current.x + (Math.random() - 0.5) * shake,
        this.current.y + (Math.random() - 0.5) * shake * 0.5,
        this.current.z + (Math.random() - 0.5) * shake
      );
    } else {
      this.camera.position.copy(this.current);
    }
    this.camera.lookAt(this.targetLook);

    // FOV smoothing
    const targetFov = this.baseFov + 6 * this.boostVisual; // widen up to +6 deg
    this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, 10 * dt);
    this.camera.updateProjectionMatrix();
  }

  /** External control to set boost intensity for visuals (0..1). */
  setBoostVisual(v: number) {
    this.boostVisual = THREE.MathUtils.clamp(v, 0, 1);
  }
}

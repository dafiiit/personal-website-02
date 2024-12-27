import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export const createParticles = (
  geometry: THREE.BufferGeometry,
  scene: THREE.Scene,
  world: CANNON.World,
  particles: Array<{ mesh: THREE.Mesh; body: CANNON.Body }>,
  scale: number
) => {
  const material = new THREE.MeshPhongMaterial({
    color: 0xefb314,
    emissive: 0xefb314,
    emissiveIntensity: 0.0,
    shininess: 500,
    specular: 0xffffff
  });

  // Create a grid-based sampling approach
  const bbox = new THREE.Box3().setFromBufferAttribute(
    geometry.attributes.position as THREE.BufferAttribute
  );
  const size = new THREE.Vector3();
  bbox.getSize(size);

  // Define grid size
  const gridStep = scale * 3; // Adjust this value to control density
  const positions: number[] = [];

  // Sample points using raycasting for better distribution
  const raycaster = new THREE.Raycaster();
  const textMesh = new THREE.Mesh(geometry);

  // Create grid of points
  for (let x = bbox.min.x; x <= bbox.max.x; x += gridStep) {
    for (let y = bbox.min.y; y <= bbox.max.y; y += gridStep) {
      // Cast ray from front to back
      const origin = new THREE.Vector3(x, y, bbox.max.z + 1);
      raycaster.set(origin, new THREE.Vector3(0, 0, -1));
      const intersects = raycaster.intersectObject(textMesh);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        positions.push(point.x, point.y, point.z);
      }
    }
  }

  // Create particles at sampled positions
  for (let i = 0; i < positions.length; i += 3) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(scale * 1.8, 12, 12),
      material
    );

    // Position particles higher up
    const x = positions[i];
    const y = positions[i + 1] + 40; // Start much higher
    const z = positions[i + 2];

    particle.position.set(x, y, z);
    particle.castShadow = true;
    particle.receiveShadow = true;

    const shape = new CANNON.Sphere(scale * 1.8);
    const body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(x, y, z),
      shape: shape,
      linearDamping: 0.1,
      angularDamping: 0.1,
      restitution: 0.8
    });

    // Add more energetic initial rotation
    body.angularVelocity.set(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5
    );

    scene.add(particle);
    world.addBody(body);
    particles.push({ mesh: particle, body });
  }
};

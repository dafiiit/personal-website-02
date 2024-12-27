import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export const setupScene = (container: HTMLDivElement) => {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  container.appendChild(renderer.domElement);

  // Adjust camera position for straight-on view
  camera.position.z = 100;  // Move camera back to fit text
  camera.position.y = 0;    // Center vertically
  camera.position.x = 0;    // Center horizontally
  camera.lookAt(0, 0, 0);

  // Physics world setup with stronger gravity
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -150, 0),
  });

  // Add a spherical ground at the bottom of the screen
  const groundRadius = 75;
  const groundShape = new CANNON.Sphere(groundRadius);
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    position: new CANNON.Vec3(0, -groundRadius + 5, 0),
    restitution: 0.8
  });
  world.addBody(groundBody);

  // Visual representation of the ground (invisible but still physical)
  const groundGeometry = new THREE.SphereGeometry(groundRadius, 16, 16);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x303030,
    roughness: 0.0,
    metalness: 1.0,
    visible: false
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.position.copy(groundBody.position as any);
  scene.add(groundMesh);

  // Adjust lighting for better illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // Main key light
  const keyLight = new THREE.SpotLight(0xffffff, 3.5);
  keyLight.position.set(40, 60, 40);
  keyLight.angle = Math.PI / 4;
  keyLight.penumbra = 0.5;
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light
  const fillLight = new THREE.PointLight(0x9ca3af, 1.2);
  fillLight.position.set(-30, 30, -30);
  scene.add(fillLight);

  // Add rimlight (backlight) for edge definition
  const rimLight = new THREE.SpotLight(0xffffff, 4.5);
  rimLight.position.set(0, 30, -70);
  rimLight.angle = Math.PI / 6;
  rimLight.penumbra = 0.2;
  scene.add(rimLight);

  // Add dramatic spotlight from above
  const spotlight = new THREE.SpotLight(0xffffff, 6.0);
  spotlight.position.set(0, 120, 20);
  spotlight.angle = Math.PI / 6;
  spotlight.penumbra = 0.3;
  spotlight.decay = 1;
  spotlight.distance = 300;
  spotlight.castShadow = true;
  spotlight.shadow.bias = -0.0001;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;
  scene.add(spotlight);

  // Enable shadow mapping with better quality
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  return { scene, camera, renderer, world };
};

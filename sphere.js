// Constants
const NUM_SPHERES = 10;
const BOX_SIZE = 10;
const SPHERE_RADIUS = 0.5;

// Setup scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create box
const boxGeometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Create spheres
const spheres = [];
const sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < NUM_SPHERES; i++) {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(
    Math.random() * (BOX_SIZE - 2 * SPHERE_RADIUS) - (BOX_SIZE / 2 - SPHERE_RADIUS),
    Math.random() * (BOX_SIZE - 2 * SPHERE_RADIUS) - (BOX_SIZE / 2 - SPHERE_RADIUS),
    Math.random() * (BOX_SIZE - 2 * SPHERE_RADIUS) - (BOX_SIZE / 2 - SPHERE_RADIUS)
  );
  scene.add(sphere);
  spheres.push(sphere);
}

// Position the camera
camera.position.z = 20;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update sphere positions and handle collisions
  spheres.forEach(sphere => {
    sphere.position.x += Math.random() * 0.2 - 0.1;
    sphere.position.y += Math.random() * 0.2 - 0.1;
    sphere.position.z += Math.random() * 0.2 - 0.1;

    if (sphere.position.x < -BOX_SIZE / 2 + SPHERE_RADIUS || sphere.position.x > BOX_SIZE / 2 - SPHERE_RADIUS) {
      sphere.position.x -= Math.random() * 0.2 - 0.1;
    }
    if (sphere.position.y < -BOX_SIZE / 2 + SPHERE_RADIUS || sphere.position.y > BOX_SIZE / 2 - SPHERE_RADIUS) {
      sphere.position.y -= Math.random() * 0.2 - 0.1;
    }
    if (sphere.position.z < -BOX_SIZE / 2 + SPHERE_RADIUS || sphere.position.z > BOX_SIZE / 2 - SPHERE_RADIUS) {
      sphere.position.z -= Math.random() * 0.2 - 0.1;
    }
  });

  renderer.render(scene, camera);
}
animate();

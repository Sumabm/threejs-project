// 

// Setup scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cubes
const cubeSize = 1;
const spacing = 1.5;
const numCubes = 5;
const cubes = [];

for (let i = 0; i < numCubes; i++) {
  for (let j = 0; j < numCubes; j++) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set((i - numCubes / 2) * spacing, (j - numCubes / 2) * spacing, 0);
    cubes.push(cube);
    scene.add(cube);
  }
}

// Position the camera
camera.position.z = 10;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}
animate();


// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add planets
// const planetTextures = [
//     'star.jpg', 'venus.jpg', 'earth.jpg', 'mars.jpg', 
//     'jupiter.jpg', 'saturn.jpg', 'uranus.jpg', 'neptune.jpg'
// ];
const planetTextures = [
    'images/star.jpg', 'images/venus.jpg', 'images/earth.jpg', 'images/mars.jpg', 
    'images/jupiter.jpg', 'images/saturn.jpg', 'images/uranus.jpg', 'images/neptune.jpg'
];

const planetDistances = [10, 15, 20, 25, 30, 35, 40, 45];

for (let i = 0; i < planetTextures.length; i++) {
    const planetTexture = new THREE.TextureLoader().load(planetTextures[i]);
    const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
    const planetGeometry = new THREE.SphereGeometry(2, 40, 50);
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(planetDistances[i], 0, 0);
    scene.add(planet);
}

// Position camera
camera.position.z = 50;
// Update planet positions in orbit around the sun
function updatePlanetPositions() {
    const time = Date.now() * 0.0005; // Adjust speed of orbit
    const orbitRadius = 10; // Adjust the radius of the orbits
    
    scene.children.forEach(object => {
        if (object !== sun) {
            const angle = time * (1 - object.orbitSpeed); // Adjust orbit speed
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            object.position.set(x, 0, z);
        }
    });
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update planet positions in orbit
    updatePlanetPositions();

    // Rotate planets around their own axis
    scene.children.forEach(object => {
        if (object !== sun) {
            object.rotation.y += 0.01; // Adjust the rotation speed
        }
    });

    renderer.render(scene, camera);
}
animate();


// Render loop
function animate() {
    requestAnimationFrame(animate);
    // Rotate planets
    scene.children.forEach(object => {
        if (object !== sun) {
            object.rotation.y += 0.01;
        }
    });
    renderer.render(scene, camera);
}
animate();

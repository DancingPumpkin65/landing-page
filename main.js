// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000); // Aspect ratio matches the container's dimensions
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(500, 500); // Set size to match the container's dimensions

// Append renderer to the model-container div
const modelContainer = document.getElementById('model-container');
modelContainer.appendChild(renderer.domElement);

// OrbitControls for zoom and rotation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25;
controls.enableZoom = true; // Enable zoom
controls.enableRotate = true; // Enable rotation
controls.enablePan = false; // Disable panning

// Lighting
const light = new THREE.HemisphereLight(0xffffff, 0x555544);
light.position.set(0, 200, 0);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 200, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Load GLTF model
const loader = new THREE.GLTFLoader();
loader.load('img/test.gltf', function (gltf) {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
}, undefined, function (error) {
    console.error(error);
});

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}
animate();
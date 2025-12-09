const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700; // Increased count for density

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Spread out more
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material - Red Smoke
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xE50914, // Red
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate entire system slowly
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Wave effect
    particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.2;

    // Mouse parallax
    particlesMesh.rotation.y += mouseX * 0.00005;
    particlesMesh.rotation.x += mouseY * 0.00005;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

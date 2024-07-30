import * as THREE from "three";
// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width);
  cursor.y = -(event.clientY / sizes.height);
});
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

const clock = new THREE.Clock();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   mesh.rotation.y = elapsedTime;
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

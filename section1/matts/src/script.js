import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//* Textures
const textureLoader = new THREE.TextureLoader();
const doorTexture = textureLoader.load("/door.jpg");
const matcapTexture = textureLoader.load("/silver.png");
const purpleMatcapTexture = textureLoader.load("/purple.png");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial();
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
// material.wireframe = true;
// material.flatShading = true;
// 25:47
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
scene.add(sphere);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
scene.add(plane);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
scene.add(torus);
torus.position.x = 1.5;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
const clock = new THREE.Clock();
const tick = () => {
  console.log("tick");
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

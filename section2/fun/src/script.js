import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */

// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0);
// gui.add(ambientLight, "intensity", 0, 5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
// gui.add(directionalLight, "intensity", 0, 5).name("dir intensity");
// scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0x00a0ff, 0.4, 10);
gui.add(spotLight, "intensity").min(0).max(100).step(0.1);
gui.add(spotLight, "distance").min(0).max(100).step(0.1);
gui.add(spotLight, "angle").min(0).max(100).step(0.1);
gui.add(spotLight, "penumbra").min(0).max(100).step(0.1);
scene.add(spotLight);
// const hemiSphere = new THREE.HemisphereLight(0xff00000, 0x0000ff, 0);
// scene.add(hemiSphere);

// const pointLight = new THREE.PointLight(0xff9000, 2);
// scene.add(pointLight);
// const rectLight = new THREE.RectAreaLight(0x4e00ff, 0, 2, 2);
// scene.add(rectLight);
let musicStart = false;
document.addEventListener("click", function () {
  var music = document.getElementById("backgroundMusic");
  if (musicStart) {
    music.pause();
    musicStart = false;
    return;
  }
  console.log("works");
  musicStart = true;
  music.play();
});
/**
 *
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  /*if (musicStart) {
    spotLight.intensity = elapsedTime * 0.01;
    plane.rotation.z = elapsedTime * 0.5;
  }*/

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

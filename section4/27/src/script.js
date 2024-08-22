import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
// const flagTexture = textureLoader.load("/textures/flag.jpg");
// const baratheonTexture = textureLoader.load("/textures/baratheon.jpg");
// const starkTexture = textureLoader.load("/textures/stark.jpg");
// const targTexture = textureLoader.load("/textures/targaryen.jpg");

const ImageTextures = [
  { name: "flag.jpg", words: "Hear Me Roar" },
  { name: "baratheon.jpg", words: "Ours is the Fury" },
  { name: "stark.jpg", words: "Winter Is Coming" },
  { name: "targaryen.jpg", words: "Fire And Blood" },
  { name: "vale.jpg", words: "As High as Honour" },
  { name: "tyrell.jpg", words: "Growing Stronger" },
];

const textures = [];

ImageTextures.forEach((texture) => {
  textures.push({
    texture: textureLoader.load("/textures/" + texture.name),
    words: texture.words,
  });
});

//const textures = [flagTexture, baratheonTexture, starkTexture, targTexture];
/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.attributes.position.count;
const randoms = new Float32Array(count);
for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}
geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5), type: "vec2" },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uTexture: { value: textures[0] },
    uSpeed: { value: 3.0 },
  },
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
mesh.position.y = 0.2;
scene.add(mesh);
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
camera.position.set(0.25, -0.25, 1.5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// * Flag Switch
let currentIndex = 0;
const words = document.getElementById("words");
window.addEventListener("load", function () {
  alert("Double click to switch flags!");
  material.uniforms.uTexture.value = textures[currentIndex].texture;
  words.textContent = textures[currentIndex].words;
});
document.addEventListener("dblclick", function () {
  currentIndex = (currentIndex + 1) % textures.length;
  material.uniforms.uTexture.value = textures[currentIndex].texture;
  words.textContent = textures[currentIndex].words;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

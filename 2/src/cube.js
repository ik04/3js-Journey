import * as THREE from "three";

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
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
scene.add(mesh);
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
// scale
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
// rotation
// * kimberlock, stuck because of some shit, to fix change order
mesh.rotation.reorder("YXZ"); // * redorder first then do shit
// use use euler to rotate
mesh.rotation.x = Math.PI * 0.25; // full rotation
mesh.rotation.y = Math.PI * 0.25; // full rotation
// quaternion is a better implementation
/**
 * Sizes
 */
// ! issue with z axis
mesh.position.set(0.7, -0.6, -0.5);
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);
console.log(mesh.position.distanceTo(camera.position));
camera.lookAt(new THREE.Vector3(3, 0, 0));
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

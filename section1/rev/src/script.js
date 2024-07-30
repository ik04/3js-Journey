import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

// textures
// * traditional
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   texture.needsUpdate = true;
// };

// image.src = "/door.jpg";

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager); //* can load multiple textures
const texture = textureLoader.load("/diamond.jpg");
// *transforms
// texture.repeat.x = 2;
// texture.repeat.y = 2;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

// texture.rotation = Math.PI / 4;
// texture.center.x = 0.5;
// texture.center.y = 0.5;
// * filtering and mipmapping
texture.generateMipmaps = false;
texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const positionArr = new Float32Array(9);
// positionArr[0] = 0;
// positionArr[1] = 0;
// positionArr[2] = 0;

// positionArr[3] = 0;
// positionArr[4] = 1;
// positionArr[5] = 0;

// positionArr[6] = 1;
// positionArr[7] = 0;
// positionArr[8] = 0;

// const positionAttr = new THREE.BufferAttribute(positionArr, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionAttr);
const material = new THREE.MeshBasicMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
gui.add(mesh.position, "y", -3, 3, 0.01);
gui.add(material, "wireframe");

const params = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 2 });
  },
};
// gui.addColor(params, "color").onChange(() => {
//   material.color.set(params.color);
// });
gui.add(params, "spin");

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
camera.position.z = 3;
// camera.position.x = 2;
// camera.position.y = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 });
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 0 });
// ? gsap not working

const tick = () => {
  console.log("tick");
  const elapseTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

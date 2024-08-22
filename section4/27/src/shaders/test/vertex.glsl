uniform vec2 uFrequency;
uniform float uTime;
uniform float uSpeed;
attribute float aRandom;
varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * uFrequency.x - uTime * uSpeed) * 0.1 + sin(2.0 * modelPosition.x * uFrequency.x - uTime * uSpeed) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime ) * 0.02 + sin(2.0 * modelPosition.y * uFrequency.y - uTime ) * 0.02;
    modelPosition.z = elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}
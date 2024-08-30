float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
varying vec2 vUv;
void main()
{
    gl_FragColor = vec4(vUv, 0.0, 1.0);
}
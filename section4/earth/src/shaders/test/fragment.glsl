varying vec2 vUv;
uniform sampler2D uTexture;
void main()
{
vec4 textureColor = texture2D(uTexture, vUv);
float b = textureColor.r;
if(b<0.5){
 b = 0.0;
 }else{
 b = 1.0;
 }
vec4 earthBlue = vec4(b, 0.0, 0.0, 1.0);
gl_FragColor = earthBlue;
}
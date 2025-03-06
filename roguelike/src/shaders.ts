/** Collection of glsl fragment shaders for ease of use. */
export class Shaders {
    public static fragScanlines = `#ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    
    varying vec2 fragCoord;
    
    // Fork of "Fast CRT" by kbjwes77. https://shadertoy.com/view/WsVSzV
    // 2025-03-06 11:43:11
    // Original shader by default Shadertoy licence CC BY NC SA 3.0 Unported
    // Additional modifications by madmarcel (https://phaser.io/sandbox/ShtRd6RU)
    // Refactored and tweaked by r10z
    
    float curvature = 0.40;
    float scanlineDarkness = 0.35;
    
    void mainImage(out vec4 fragColor,in vec2 fragCoord)
    {
        // squared distance from center
        vec2 uv = fragCoord/resolution.xy;
        // distance (from) center
        vec2 dc = abs(0.5 - uv);
        dc *= dc;
        
        uv.x -= 0.5;
        // uv.x *= 1.0 + (dc.y * (0.3 * curvature));
        uv.x += 0.5;
        uv.y -= 0.5;
        // uv.y *= 1.0 + (dc.x * (0.4 * curvature));
        uv.y *= -1.0; // otherwise upside down
        uv.y += 0.5;
    
        if (uv.y > 1.0 || uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0)
        {
            fragColor = vec4(0.00, 0.000, 0.000, 1.0);
            return;
        }
            
        float apply = abs(sin(fragCoord.y) * scanlineDarkness);
        fragColor = vec4(mix(texture2D(iChannel0,uv).rgb, vec3(0.0) , apply), 1.0);
    }   
    
    void main(void)
    {
        mainImage(gl_FragColor, fragCoord.xy);
    }
    `
}
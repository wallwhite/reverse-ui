import { useEffect, useMemo, useRef } from 'react';

const createShader = (gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null => {
  const shader = gl.createShader(type);

  if (!shader) {
    console.error('Failed to create shader');

    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Failed to create shader: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);

    return null;
  }

  return shader;
};

const createBuffer = (
  gl: WebGL2RenderingContext,
  arr: Float32Array | Uint16Array | Uint32Array,
): WebGLBuffer | null => {
  const buffer = gl.createBuffer();
  const bufferType =
    arr instanceof Uint16Array || arr instanceof Uint32Array ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

  gl.bindBuffer(bufferType, buffer);
  gl.bufferData(bufferType, arr, gl.STATIC_DRAW);

  return buffer;
};

const ANIMATION_SOURCES = {
  wave: `
float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
opacity *= step(intro_offset, u_intro_time);
opacity *= clamp((1.0 - step(intro_offset + 0.1, u_intro_time)) * 1.25, 1.0, 1.25);
`,
  fade: `
float intro_progress = clamp(u_intro_time / u_animation_duration, 0.0, 1.0);
opacity *= intro_progress;
`,
  static: `
// No intro animation - static display
`,
};

type UniformValue = number | number[] | number[][];

interface Uniform {
  value: UniformValue;
  type: 'uniform1f' | 'uniform3f' | 'uniform1fv' | 'uniform3fv';
}

type Uniforms = Record<string, Uniform>;

interface DotsShaderProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  maxFps?: number;
  width?: number;
  height?: number;
  introAnimation?: 'wave' | 'fade' | 'static';
  animationRepeat?: 'once' | 'infinite';
  animationDuration?: number;
}

const DotsShader = ({
  colors = [[93, 227, 255]],
  opacities = [0.4, 0.4, 0.6, 0.6, 0.6, 0.8, 0.8, 0.8, 0.8, 1],
  totalSize = 3,
  dotSize = 1,
  maxFps = 30,
  width = 500,
  height = 500,
  introAnimation = 'wave',
  animationRepeat = 'once',
  animationDuration = 2,
}: DotsShaderProps) => {
  const source = ANIMATION_SOURCES[introAnimation];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const center = new Set(['x', 'y']);

  const fragmentSource = `#version 300 es
    precision mediump float;

    in vec2 fragCoord;

    uniform float u_time;
    uniform float u_intro_time;
    uniform float u_animation_duration;
    uniform float u_fade_multiplier;
    uniform float u_opacities[10];
    uniform vec3 u_colors[6];
    uniform float u_total_size;
    uniform float u_dot_size;
    uniform vec2 u_resolution;

    out vec4 fragColor;
    float PHI = 1.61803398874989484820459;
    float random(vec2 xy) {
      return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
    }

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    void main() {
      vec2 st = fragCoord.xy;

    ${center.has('x') ? 'st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));' : ''}
  ${center.has('y') ? 'st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));' : ''}

  float opacity = step(0.0, st.x);
  opacity *= step(0.0, st.y);

  vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

  float frequency = 5.0;
  float show_offset = random(st2);
  // Without the +1.0 the first column is all the same opacity
  float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
  opacity *= u_opacities[int(rand * 10.0)];
  opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
  opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

  vec3 color = u_colors[int(show_offset * 6.0)];

  ${source}

  // Apply fade multiplier for infinite animation cycles
  opacity *= u_fade_multiplier;

  fragColor = vec4(color, opacity);
  fragColor.rgb *= fragColor.a;
}
`;

  const uniforms: Uniforms = useMemo(() => {
    const expandedColors =
      colors.length === 2
        ? [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]]
        : colors.length === 3
          ? [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]]
          : [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];

    return {
      u_colors: {
        value: expandedColors.map((color) => [color[0] / 255, color[1] / 255, color[2] / 255]),
        type: 'uniform3fv',
      },
      u_opacities: {
        value: opacities,
        type: 'uniform1fv',
      },
      u_total_size: {
        value: totalSize,
        type: 'uniform1f',
      },
      u_dot_size: {
        value: dotSize,
        type: 'uniform1f',
      },
      u_animation_duration: {
        value: animationDuration,
        type: 'uniform1f',
      },
    };
  }, [colors, opacities, totalSize, dotSize, animationDuration]);

  useEffect(() => {
    const windowDpr = window.devicePixelRatio;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const glCanvas = document.createElement('canvas');
    const dpr = Math.max(1, Math.min(windowDpr ?? 1, 2));
    let raf: number;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    glCanvas.width = canvas.offsetWidth * dpr;
    glCanvas.height = canvas.offsetHeight * dpr;

    const gl = glCanvas.getContext('webgl2');
    const ctx2d = canvas.getContext('2d');

    if (!gl || !ctx2d) {
      return;
    }

    const vertexShader = createShader(
      gl,
      gl.VERTEX_SHADER,
      `#version 300 es

      precision mediump float;

      in vec2 coordinates;

      uniform vec2 u_resolution;

      out vec2 fragCoord;

      void main(void) {
        gl_Position = vec4(coordinates, 0.0, 1.0);
        fragCoord = (coordinates + 1.0) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
    );

    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const glProgram = gl.createProgram();

    if (!glProgram) return;

    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
      throw `Failed to compile WebGL program: \n\n${gl.getProgramInfoLog(glProgram)}`;
    }

    gl.useProgram(glProgram);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const positionsBuffer = createBuffer(gl, positions);

    const coordinatesAttrLocation = gl.getAttribLocation(glProgram, 'coordinates');

    gl.enableVertexAttribArray(coordinatesAttrLocation);
    gl.vertexAttribPointer(coordinatesAttrLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionAttrLocation = gl.getUniformLocation(glProgram, 'u_resolution');
    const timeAttrLocation = gl.getUniformLocation(glProgram, 'u_time');
    const introTimeAttrLocation = gl.getUniformLocation(glProgram, 'u_intro_time');
    const fadeMultiplierAttrLocation = gl.getUniformLocation(glProgram, 'u_fade_multiplier');
    const scrollAttrLocation = gl.getUniformLocation(glProgram, 'u_scroll');

    for (const key in uniforms) {
      if (!Object.prototype.hasOwnProperty.call(uniforms, key)) {
        continue;
      }

      const uniformLocation = gl.getUniformLocation(glProgram, key);
      const uniform = uniforms[key];

      switch (uniform.type) {
        case 'uniform1f': {
          gl.uniform1f(uniformLocation, uniform.value as number);
          break;
        }
        case 'uniform3f': {
          gl.uniform3f(uniformLocation, ...(uniform.value as [number, number, number]));
          break;
        }
        case 'uniform1fv': {
          gl.uniform1fv(uniformLocation, uniform.value as number[]);
          break;
        }
        case 'uniform3fv': {
          gl.uniform3fv(uniformLocation, (uniform.value as number[][]).flat());
          break;
        }
        default: {
          // Unknown uniform type, skip
          break;
        }
      }
    }

    gl.uniform2f(resolutionAttrLocation, canvas.width / dpr, canvas.height / dpr);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    let lastSecondPassed: number | null = null;
    let timePassed = 0;

    const run = (e: number): void => {
      if (!gl) {
        return;
      }

      const secondsPassed = e / 1e3;

      if (lastSecondPassed === null) {
        lastSecondPassed = secondsPassed;
      }

      if (maxFps !== Number.POSITIVE_INFINITY) {
        if (e - timePassed < 1000 / maxFps) {
          raf = window.requestAnimationFrame(run);

          return;
        }
        timePassed = e;
      }

      const time = secondsPassed - lastSecondPassed;

      // Calculate intro_time and fade_multiplier based on animation repeat mode
      let introTime = time;
      let fadeMultiplier = 1;

      if (animationRepeat === 'once') {
        introTime = Math.min(time, animationDuration);
      } else {
        // infinite: cycle with intro, hold, fade-out, and pause phases
        const holdTime = 0.5;
        const fadeOutTime = 0.5;
        const pauseTime = 0.3;
        const totalCycleDuration = animationDuration + holdTime + fadeOutTime + pauseTime;
        const cycleTime = time % totalCycleDuration;

        if (cycleTime < animationDuration) {
          // Phase 1: Intro animation
          introTime = cycleTime;
          fadeMultiplier = 1;
        } else if (cycleTime < animationDuration + holdTime) {
          // Phase 2: Hold at full opacity
          introTime = animationDuration;
          fadeMultiplier = 1;
        } else if (cycleTime < animationDuration + holdTime + fadeOutTime) {
          // Phase 3: Fade out
          introTime = animationDuration;
          const fadeProgress = (cycleTime - animationDuration - holdTime) / fadeOutTime;

          fadeMultiplier = 1 - fadeProgress;
        } else {
          // Phase 4: Pause (fully transparent)
          introTime = 0;
          fadeMultiplier = 0;
        }
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeAttrLocation, time);
      gl.uniform1f(introTimeAttrLocation, introTime);
      gl.uniform1f(fadeMultiplierAttrLocation, fadeMultiplier);
      gl.uniform1f(scrollAttrLocation, window.scrollY);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      ctx2d.drawImage(glCanvas, 0, 0);

      raf = window.requestAnimationFrame(run);
    };

    raf = window.requestAnimationFrame(run);

    const resizeObserver = new window.ResizeObserver(() => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      glCanvas.width = canvas.offsetWidth * dpr;
      glCanvas.height = canvas.offsetHeight * dpr;
      gl.uniform2f(resolutionAttrLocation, canvas.width / dpr, canvas.height / dpr);
    });

    resizeObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteProgram(glProgram);
        gl.deleteBuffer(positionsBuffer);
      }
    };
  }, [fragmentSource, uniforms, maxFps, animationRepeat, animationDuration]);

  return <canvas ref={canvasRef} style={{ width: `${width}px`, height: `${height}px` }} />;
};

export { DotsShader };

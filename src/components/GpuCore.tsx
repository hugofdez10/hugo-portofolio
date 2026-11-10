"use client";

import { useEffect, useRef } from "react";

/**
 * Physically inspired raymarched chrome sculpture, rendered using native WebGL2.
 * A separate CSS sculpture remains as a fallback for unsupported/reduced-motion devices.
 * The GPU layer is completely decorative, while links and content remain semantic HTML.
 */
const VERTEX = `#version 300 es
precision highp float;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uScroll;
uniform float uMobile;

out vec4 outputColor;

mat2 spin(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float torus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

vec2 scene(vec3 p) {
  // Slow mechanical movement, plus restrained pointer-driven rotation.
  vec3 q = p;
  q.yz = spin(-0.32 + uTime * 0.075 + uPointer.y * 0.27) * q.yz;
  q.xz = spin(0.14 + uTime * 0.055 + uPointer.x * 0.35) * q.xz;

  float chrome = length(q) - 0.89;
  chrome += 0.008 * sin(q.x * 17.0 + uTime * 0.35) * sin(q.z * 15.0);

  vec3 ringA = q;
  ringA.xy = spin(0.70) * ringA.xy;
  ringA.yz = spin(0.62 + uTime * 0.08) * ringA.yz;
  float orbitA = torus(ringA, vec2(1.22, 0.017));

  vec3 ringB = q;
  ringB.xy = spin(-0.82 + uTime * 0.065) * ringB.xy;
  ringB.yz = spin(-0.46) * ringB.yz;
  float orbitB = torus(ringB, vec2(1.31, 0.012));

  vec2 result = vec2(chrome, 0.0);
  if (orbitA < result.x) result = vec2(orbitA, 1.0);
  if (orbitB < result.x) result = vec2(orbitB, 2.0);
  return result;
}

vec3 normalAt(vec3 p) {
  const float e = 0.002;
  vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * scene(p + k.xyy * e).x +
    k.yyx * scene(p + k.yyx * e).x +
    k.yxy * scene(p + k.yxy * e).x +
    k.xxx * scene(p + k.xxx * e).x
  );
}

vec3 environment(vec3 r) {
  float horizon = smoothstep(-0.9, 0.75, r.y);
  vec3 sky = mix(vec3(0.008, 0.016, 0.028), vec3(0.085, 0.16, 0.22), horizon);
  float softbox = pow(max(dot(r, normalize(vec3(-0.7, 0.78, 0.55))), 0.0), 27.0);
  float top = pow(max(dot(r, normalize(vec3(0.23, 0.9, 0.41))), 0.0), 8.0);
  float blade = exp(-115.0 * pow(r.x * 0.83 + r.y * 0.39 - 0.17, 2.0));
  float purple = pow(max(dot(r, normalize(vec3(0.75, -0.24, 0.55))), 0.0), 17.0);
  return sky + softbox * vec3(1.42, 1.72, 1.93) +
         top * vec3(0.08, 0.28, 0.46) +
         blade * vec3(0.16, 0.62, 0.83) +
         purple * vec3(0.17, 0.10, 0.35);
}

void main() {
  float mobile = clamp(uMobile, 0.0, 1.0);
  vec2 center = mix(vec2(0.74, 0.52), vec2(0.79, 0.68), mobile);
  vec2 uv = (gl_FragCoord.xy - uResolution * center) / min(uResolution.x, uResolution.y) * 2.32;
  vec3 ro = vec3(0.0, 0.0, 3.55 + uScroll * 0.65);
  vec3 rd = normalize(vec3(uv, -2.62));

  float travel = 0.0;
  float material = -1.0;
  vec3 point = ro;
  for (int i = 0; i < 66; ++i) {
    point = ro + rd * travel;
    vec2 hit = scene(point);
    if (hit.x < 0.003) { material = hit.y; break; }
    travel += max(hit.x * 0.85, 0.008);
    if (travel > 8.0) break;
  }

  float distanceFromCenter = length(uv);
  float halo = exp(-distanceFromCenter * distanceFromCenter * 2.25) * 0.17;
  vec3 lightColor = vec3(0.06, 0.42, 0.68);
  vec3 color = lightColor * halo;
  float alpha = halo * 0.62;

  if (material >= 0.0) {
    vec3 n = normalAt(point);
    vec3 reflected = reflect(rd, n);
    float facing = max(dot(n, -rd), 0.0);
    float fresnel = pow(1.0 - facing, 4.0);
    float direct = pow(max(dot(n, normalize(vec3(-0.45, 0.8, 0.7))), 0.0), 16.0);

    if (material < 0.5) {
      vec3 chrome = environment(reflected);
      vec3 shadow = mix(vec3(0.008, 0.016, 0.027), vec3(0.12, 0.22, 0.28), facing * 0.65);
      color = chrome * (0.70 + fresnel * 1.15) + shadow * 0.40 +
              direct * vec3(0.22, 0.68, 0.92) + fresnel * vec3(0.08, 0.38, 0.64);
    } else {
      float radiance = 0.77 + 0.23 * sin(uTime * 1.4 + point.y * 4.0);
      vec3 ringTint = material < 1.5 ? vec3(0.24, 0.75, 1.0) : vec3(0.49, 0.45, 1.0);
      color = ringTint * (0.45 + 1.2 * facing) * radiance +
              environment(reflected) * 0.42 + fresnel * vec3(0.4, 0.9, 1.0);
    }

    color = color / (1.0 + color * 0.38);
    color = pow(color, vec3(0.88));
    alpha = 1.0;
  }

  float fade = 1.0 - smoothstep(0.28, 0.99, uScroll);
  outputColor = vec4(color, alpha * fade);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function GpuCore() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const visual = canvas?.parentElement;
    const hero = canvas?.closest<HTMLElement>(".cinematic-hero");
    if (!canvas || !visual || !hero) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(prefers-reduced-data: reduce)").matches
    ) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const vao = gl.createVertexArray();
    if (!vao) {
      gl.deleteProgram(program);
      return;
    }

    const uniforms = {
      resolution: gl.getUniformLocation(program, "uResolution"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      time: gl.getUniformLocation(program, "uTime"),
      scroll: gl.getUniformLocation(program, "uScroll"),
      mobile: gl.getUniformLocation(program, "uMobile"),
    };

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    let contextLost = false;
    let scroll = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const limit = window.matchMedia("(pointer: coarse)").matches ? 0.85 : 1.25;
      const dpr = Math.min(window.devicePixelRatio || 1, limit);
      width = Math.max(1, Math.round(bounds.width * dpr));
      height = Math.max(1, Math.round(bounds.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const onScroll = () => {
      const bounds = hero.getBoundingClientRect();
      scroll = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height)));
    };
    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointerY = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      visual.classList.remove("gpu-active");
    };

    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || contextLost || document.hidden || time - lastFrame < 33) return;
      lastFrame = time;
      smoothX += (pointerX - smoothX) * 0.035;
      smoothY += (pointerY - smoothY) * 0.035;
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(uniforms.resolution, width, height);
      gl.uniform2f(uniforms.pointer, smoothX, smoothY);
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform1f(uniforms.scroll, scroll);
      gl.uniform1f(uniforms.mobile, canvas.clientWidth < 760 ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const viewport = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 },
    );
    const resizeObserver = new ResizeObserver(resize);
    viewport.observe(hero);
    resizeObserver.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onContextLost);
    resize();
    onScroll();

    // The CSS fallback stays in place until the shaders are compiled and linked.
    visual.classList.add("gpu-active");
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      viewport.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      visual.classList.remove("gpu-active");
      if (!contextLost) {
        gl.deleteVertexArray(vao);
        gl.deleteProgram(program);
      }
    };
  }, []);

  return <canvas ref={ref} className="gpu-core" aria-hidden="true" />;
}

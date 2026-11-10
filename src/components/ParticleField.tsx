"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; z: number; size: number; phase: number };

/** Lightweight projected 3D particle field: no dependency, no information inside the canvas. */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const hero = canvas.closest<HTMLElement>(".cinematic-hero");
    if (reduceMotion.matches || !hero) return;

    const count = coarsePointer.matches ? 190 : 540;
    const particles: Particle[] = Array.from({ length: count }, (_, index) => {
      const t = (index + 0.5) / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = 0.75 + ((index * 17) % 37) / 110;
      return {
        x: Math.sin(inclination) * Math.cos(azimuth) * radius,
        y: Math.cos(inclination) * radius,
        z: Math.sin(inclination) * Math.sin(azimuth) * radius,
        size: index % 13 === 0 ? 1.6 : 0.65,
        phase: index * 0.67,
      };
    });

    let width = 0;
    let height = 0;
    let ratio = 1;
    let visible = true;
    let frame = 0;
    let scroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let lastFrame = 0;

    function resize() {
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function onScroll() {
      const bounds = hero!.getBoundingClientRect();
      scroll = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height)));
      hero!.style.setProperty("--scene-progress", String(scroll));
    }

    function onPointerMove(event: PointerEvent) {
      mouseX = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 0.65;
      mouseY = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 0.5;
    }

    function draw(now: number) {
      frame = requestAnimationFrame(draw);
      if (!visible || !ctx || !width || now - lastFrame < 24) return;
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      smoothX += (mouseX - smoothX) * 0.035;
      smoothY += (mouseY - smoothY) * 0.035;
      const mobile = width < 760;
      const centerX = width * (mobile ? 0.78 : 0.74);
      const centerY = height * (mobile ? 0.32 : 0.47);
      const radius = Math.min(width * (mobile ? 0.75 : 0.37), height * 0.43);
      const turn = now * 0.000075 + smoothX;
      const cosine = Math.cos(turn);
      const sine = Math.sin(turn);
      const pitch = smoothY * 0.38;
      const disperse = 1 + scroll * scroll * 2.3;
      const opacity = (1 - scroll) * (mobile ? 0.46 : 0.73);
      ctx.globalCompositeOperation = "screen";

      for (const point of particles) {
        const dx = point.x * cosine + point.z * sine;
        const dz = point.z * cosine - point.x * sine;
        const dy = point.y * Math.cos(pitch) - dz * Math.sin(pitch);
        const depth = point.y * Math.sin(pitch) + dz * Math.cos(pitch);
        const perspective = 1.1 / (1.5 - depth * 0.35);
        const x = centerX + dx * radius * perspective * disperse;
        const y = centerY + dy * radius * perspective * disperse;
        if (x < -15 || x > width + 15 || y < -15 || y > height + 15) continue;
        const alpha = (0.2 + (depth + 1) * 0.22) * opacity;
        const twinkle = 0.7 + Math.sin(now * 0.001 + point.phase) * 0.3;
        ctx.fillStyle = `rgba(126,218,255,${alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, point.size * perspective, 0, Math.PI * 2);
        ctx.fill();
        if (point.size > 1) {
          ctx.strokeStyle = `rgba(118,211,255,${alpha * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(x - 5, y);
          ctx.lineTo(x + 5, y);
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) ctx.clearRect(0, 0, width, height);
    }, { threshold: 0 });
    observer.observe(hero);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      hero.style.removeProperty("--scene-progress");
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-particle-field" aria-hidden="true" />;
}

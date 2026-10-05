"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Runs `cb` only while `el` is on screen. */
function whenVisible(el: Element, cb: (visible: boolean) => void) {
  const io = new IntersectionObserver(([e]) => cb(e.isIntersecting), {
    rootMargin: "100px",
  });
  io.observe(el);
  return () => io.disconnect();
}

/* ------------------------------------------------------------------ */
/* Hero flow field: glowing particle trails that swirl around the cursor */
/* ------------------------------------------------------------------ */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; px: number; py: number; life: number; speed: number };
    let ps: P[] = [];

    const spawn = (): P => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return { x, y, px: x, py: y, life: 80 + Math.random() * 220, speed: 0.6 + Math.random() * 1.4 };
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(900, (w * h) / 1400));
      ps = Array.from({ length: count }, spawn);
      ctx.fillStyle = cssVar("--bg", "#11130f");
      ctx.fillRect(0, 0, w, h);
    };

    // Cheap smooth pseudo-noise field
    const angle = (x: number, y: number) =>
      Math.sin(x * 0.0021 + t * 0.6) * 2.1 +
      Math.cos(y * 0.0027 - t * 0.4) * 2.1 +
      Math.sin((x + y) * 0.0013 + t * 0.25) * 1.4;

    const step = () => {
      t += 0.006;
      const bg = cssVar("--bg", "#11130f");
      const accent = cssVar("--blue", "#c3ee82");
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const p of ps) {
        let a = angle(p.x, p.y);
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 220 * 220) {
          // vortex around the cursor
          const f = 1 - Math.sqrt(d2) / 220;
          a = a * (1 - f) + (Math.atan2(dy, dx) + Math.PI / 2) * f;
        }
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(a) * p.speed;
        p.y += Math.sin(a) * p.speed;
        p.life -= 1;
        if (p.life < 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          Object.assign(p, spawn());
          continue;
        }
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
      }
      ctx.globalAlpha = 0.36;
      ctx.stroke();
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    if (reduced) {
      for (let i = 0; i < 160; i++) step();
      return;
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    const stop = whenVisible(canvas, (v) => {
      running = v;
      cancelAnimationFrame(raf);
      if (v) raf = requestAnimationFrame(step);
    });
    return () => {
      stop();
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Particle morph band: thousands of particles that assemble into words */
/* ------------------------------------------------------------------ */
const WORDS: Record<Locale, string[]> = {
  en: ["SOFTWARE", "PRODUCT", "AI", "AUTOMATION", "HUGO"],
  es: ["SOFTWARE", "PRODUCTO", "IA", "AUTOMATIZACIÓN", "HUGO"],
};

export function ParticleMorph({ locale }: { locale: Locale }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = wrap.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;
    const reduced = prefersReducedMotion();
    const words = WORDS[locale];

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let wordIndex = 0;
    let lastSwap = 0;
    let targets: [number, number][][] = [];
    const mouse = { x: -9999, y: -9999, down: false };
    type P = {
      x: number; y: number; vx: number; vy: number;
      tx: number; ty: number; s: number; c: number; free: boolean;
    };
    let ps: P[] = [];

    const sample = (word: string, gap: number): [number, number][] => {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d");
      if (!o) return [];
      let size = Math.min(h * 0.62, 260);
      const font = (s: number) => `900 ${s}px "Segoe UI", "Arial Black", Arial, sans-serif`;
      o.font = font(size);
      const max = w * 0.9;
      const measured = o.measureText(word).width;
      if (measured > max) size *= max / measured;
      o.font = font(size);
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#fff";
      o.fillText(word, w / 2, h / 2 + size * 0.04);
      const data = o.getImageData(0, 0, w, h).data;
      const pts: [number, number][] = [];
      for (let y = 0; y < h; y += gap)
        for (let x = 0; x < w; x += gap) if (data[(y * w + x) * 4 + 3] > 128) pts.push([x, y]);
      return pts;
    };

    const assign = (burst: boolean) => {
      const pts = targets[wordIndex];
      if (labelRef.current) labelRef.current.textContent = `0${wordIndex + 1} / ${words[wordIndex]}`;
      const order = ps.map((_, i) => i).sort(() => Math.random() - 0.5);
      order.forEach((pi, k) => {
        const p = ps[pi];
        if (k < pts.length) {
          [p.tx, p.ty] = pts[k];
          p.free = false;
        } else {
          p.free = true;
          p.tx = Math.random() * w;
          p.ty = Math.random() * h;
        }
        if (burst) {
          const a = Math.random() * Math.PI * 2;
          const f = 4 + Math.random() * 10;
          p.vx += Math.cos(a) * f;
          p.vy += Math.sin(a) * f;
        }
      });
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.round(box.clientWidth);
      h = Math.round(box.clientHeight);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 600 ? 4 : w < 1000 ? 5 : 6;
      targets = words.map((word) => sample(word, gap));
      const need = Math.min(4200, Math.max(...targets.map((t) => t.length)) + 260);
      while (ps.length < need)
        ps.push({
          x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0,
          tx: w / 2, ty: h / 2, s: Math.random() < 0.15 ? 2.2 : 1.5,
          c: Math.random(), free: false,
        });
      ps.length = need;
      assign(false);
    };

    const step = (now: number) => {
      if (!lastSwap) lastSwap = now;
      if (now - lastSwap > 3400) {
        lastSwap = now;
        wordIndex = (wordIndex + 1) % words.length;
        assign(true);
      }
      const bg = cssVar("--bg", "#11130f");
      const accent = cssVar("--blue", "#c3ee82");
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";
      const time = now * 0.001;
      for (const p of ps) {
        const k = p.free ? 0.0015 : 0.045;
        p.vx += (p.tx - p.x) * k;
        p.vy += (p.ty - p.y) * k;
        if (p.free) {
          p.vx += Math.sin(time + p.c * 20) * 0.05;
          p.vy += Math.cos(time * 0.8 + p.c * 20) * 0.05;
        }
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const R = mouse.down ? 220 : 110;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = ((R - d) / R) * (mouse.down ? 9 : 3.2);
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.x += p.vx;
        p.y += p.vy;
        const speed = Math.min(1, Math.abs(p.vx) + Math.abs(p.vy));
        ctx.globalAlpha = p.free ? 0.25 : 0.55 + speed * 0.45;
        ctx.fillStyle = speed > 0.6 || p.c > 0.85 ? "#f4ffe4" : accent;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
      mouse.down = false;
    };
    const onDown = () => {
      mouse.down = true;
    };
    const onUp = () => {
      mouse.down = false;
    };

    resize();
    if (reduced) {
      wordIndex = words.length - 1;
      assign(false);
      ps.forEach((p) => {
        p.x = p.tx;
        p.y = p.ty;
      });
      step(1);
      return;
    }

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    const stop = whenVisible(canvas, (v) => {
      running = v;
      cancelAnimationFrame(raf);
      if (v) raf = requestAnimationFrame(step);
    });
    return () => {
      stop();
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [locale]);

  return (
    <section className="morph-band" aria-label={WORDS[locale].join(" · ")}>
      <div className="container morph-head">
        <span className="eyebrow">
          <span className="blue-dot" />
          {locale === "es" ? "Lo que hago" : "What I do"}
        </span>
        <span className="morph-hint">
          {locale === "es"
            ? "mueve el cursor · mantén pulsado para dispersar"
            : "move your cursor · press and hold to scatter"}
        </span>
      </div>
      <div className="morph-stage" ref={wrap}>
        <canvas ref={ref} aria-hidden="true" />
        <span className="morph-label" ref={labelRef} aria-hidden="true" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page-wide micro-interactions                                        */
/* ------------------------------------------------------------------ */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

export function GlobalEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // 1. Cursor light that follows the pointer across the page
    if (finePointer) {
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      glow.setAttribute("aria-hidden", "true");
      document.body.appendChild(glow);
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      let gx = x;
      let gy = y;
      let raf = 0;
      const move = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
      };
      const loop = () => {
        gx += (x - gx) * 0.12;
        gy += (y - gy) * 0.12;
        glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
        raf = requestAnimationFrame(loop);
      };
      window.addEventListener("pointermove", move, { passive: true });
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", move);
        glow.remove();
      });
    }

    // 2. Magnetic buttons
    if (finePointer) {
      document
        .querySelectorAll<HTMLElement>(".button, .nav-github, .contact-social, .hero-talk")
        .forEach((el) => {
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
          };
          const leave = () => {
            el.style.transform = "";
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
    }

    // 3. 3D tilt + spotlight on project cards
    document
      .querySelectorAll<HTMLElement>(".featured-card, .project-card, .stack-group, .process-step")
      .forEach((card) => {
        const visual = card.querySelector<HTMLElement>(".project-visual");
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
          if (visual && e.pointerType === "mouse") {
            const q = visual.getBoundingClientRect();
            const px = (e.clientX - q.left) / q.width - 0.5;
            const py = (e.clientY - q.top) / q.height - 0.5;
            visual.style.setProperty("--ry", `${px * 10}deg`);
            visual.style.setProperty("--rx", `${-py * 10}deg`);
          }
        };
        const leave = () => {
          visual?.style.setProperty("--ry", "0deg");
          visual?.style.setProperty("--rx", "0deg");
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

    // 4. Decode / scramble effect on eyebrows as they scroll in
    const scramble = (node: Text) => {
      const final = node.textContent ?? "";
      if (!final.trim()) return;
      let frame = 0;
      const total = 22;
      const tick = () => {
        frame++;
        const revealed = Math.floor((frame / total) * final.length);
        node.textContent = final
          .split("")
          .map((ch, i) =>
            i < revealed || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0],
          )
          .join("");
        if (frame < total) requestAnimationFrame(tick);
        else node.textContent = final;
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const text = [...entry.target.childNodes].reverse().find(
            (n): n is Text => n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim(),
          );
          if (text) scramble(text);
        }),
      { threshold: 0.6 },
    );
    document.querySelectorAll(".eyebrow, .featured-meta > span:first-child").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // 5. Staggered reveal for sections below the fold
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("fx-in");
          reveal.unobserve(entry.target);
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll<HTMLElement>(
        ".section-intro, .featured-card, .project-card, .compact-project, .process-step, .timeline-item, .stack-group, .about-grid > *, .lab-item",
      )
      .forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("fx-pre");
          reveal.observe(el);
        }
      });
    cleanups.push(() => reveal.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

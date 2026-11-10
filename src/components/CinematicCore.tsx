"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative, zero-dependency metallic core.
 * Pointer movement updates CSS variables without React rerenders.
 * Motion is disabled on touch/reduced-motion devices; content remains semantic HTML.
 */
export function CinematicCore() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !fine.matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
        element.style.setProperty("--core-ry", `${Math.max(-18, Math.min(18, x * 28))}deg`);
        element.style.setProperty("--core-rx", `${Math.max(-18, Math.min(18, -y * 28))}deg`);
        element.style.setProperty("--light-x", `${Math.max(10, Math.min(90, 50 + x * 65))}%`);
        element.style.setProperty("--light-y", `${Math.max(10, Math.min(90, 40 + y * 65))}%`);
      });
    };
    const reset = () => {
      element.style.setProperty("--core-ry", "0deg");
      element.style.setProperty("--core-rx", "0deg");
      element.style.setProperty("--light-x", "50%");
      element.style.setProperty("--light-y", "40%");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="cinematic-core" ref={ref} aria-hidden="true">
      <div className="core-halo" />
      <div className="core-grid" />
      <div className="core-assembly">
        <div className="core-ring core-ring-one" />
        <div className="core-ring core-ring-two" />
        <div className="core-ring core-ring-three" />
        <div className="core-sphere">
          <span className="core-sphere-etch" />
          <span className="core-sphere-glint" />
        </div>
        <div className="core-equator" />
      </div>
      <div className="core-baseline" />
      <span className="core-coordinate core-coordinate-top">HF—001 / SYSTEM ACTIVE</span>
      <span className="core-coordinate core-coordinate-bottom">51° / 006° — DIGITAL MATTER</span>
    </div>
  );
}

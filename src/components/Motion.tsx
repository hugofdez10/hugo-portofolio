"use client";

import { useEffect } from "react";

/**
 * Progressive motion layer. Without JS (or with reduced motion) everything is
 * simply visible; with JS, `[data-reveal]` elements fade in on scroll,
 * `[data-count]` numbers count up and `.card` gets a cursor spotlight.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const countUp = (el: HTMLElement) => {
      const match = (el.dataset.count ?? "").match(/^(\D*)(\d+)(.*)$/);
      if (!match || reduced) return;
      const [, prefix, digits, suffix] = match;
      const target = Number(digits);
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const show = (el: HTMLElement) => {
      el.classList.add("is-visible");
      el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
      observer.unobserve(el);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) show(entry.target as HTMLElement);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    // Fast scrolls and anchor jumps can skip an element entirely; reveal
    // anything that has already passed above the viewport.
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        document
          .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
          .forEach((el) => {
            if (el.getBoundingClientRect().bottom < 0) show(el);
          }),
      );
    };
    if (!reduced) {
      root.classList.add("motion-ready");
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => observer.observe(el));
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    } else {
      counters.forEach((el) => (el.textContent = el.dataset.count ?? ""));
    }

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
  return null;
}

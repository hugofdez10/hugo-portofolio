"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const NAME = "HUGO FERNÁNDEZ";
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+<>/=";
/** Hexagonal frame and the HF ligature (the H's right stem is the F's stem). */
const HEX = "M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z";
const STROKES = [
  "M15 15 V33",
  "M15 24 H24",
  "M24 15 V33",
  "M24 15 H34",
  "M24 24 H31",
];
const MONOGRAM = STROKES.join(" ");

/**
 * Animated lockup: the hexagon draws itself, the HF strokes write in one by
 * one, a gradient comet orbits the frame, a scanline sweeps the mark, an RGB
 * glitch fires every few seconds and the name decodes from random glyphs.
 * Hovering replays the decode and speeds everything up.
 */
export function Logo({ tagline }: { tagline: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ref = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${ref(name)})`;
  const [name, setName] = useState(NAME);
  const timer = useRef<number | undefined>(undefined);

  const decode = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(timer.current);
    const frames = 22;
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame++;
      const settled = Math.floor((frame / frames) * NAME.length);
      setName(
        [...NAME]
          .map((c, i) =>
            c === " " || i < settled
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame >= frames) {
        window.clearInterval(timer.current);
        setName(NAME);
      }
    }, 40);
  }, []);

  useEffect(() => {
    const start = window.setTimeout(decode, 650);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer.current);
    };
  }, [decode]);

  return (
    <svg
      className="logo"
      viewBox="0 0 224 48"
      aria-hidden="true"
      onMouseEnter={decode}
    >
      <defs>
        <linearGradient id={ref("accent")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6ff3ff" />
          <stop offset="0.5" stopColor="#8b7bff" />
          <stop offset="1" stopColor="#ff5ecf" />
        </linearGradient>
        <linearGradient id={ref("scan")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ff3ff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#6ff3ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={ref("sheen")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={ref("glow")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={ref("clip")}>
          <path d={HEX} />
        </clipPath>
        <mask
          id={ref("sheen-mask")}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="224"
          height="48"
        >
          <rect
            className="logo-sheen-band"
            x="18"
            y="0"
            width="36"
            height="48"
            fill={url("sheen")}
          />
        </mask>
      </defs>

      <g className="logo-mark">
        <path className="logo-hex-fill" d={HEX} fill={url("accent")} />
        <path className="logo-hex" d={HEX} pathLength={100} />
        <path className="logo-pulse" d={HEX} stroke={url("accent")} />
        <circle className="logo-orbit" cx="24" cy="24" r="16.5" />
        <path
          className="logo-comet"
          d={HEX}
          pathLength={100}
          stroke={url("accent")}
          filter={url("glow")}
        />
        <g clipPath={url("clip")}>
          <rect
            className="logo-scan"
            x="0"
            y="-14"
            width="48"
            height="14"
            fill={url("scan")}
          />
        </g>
        <path className="logo-glitch logo-glitch-a" d={MONOGRAM} />
        <path className="logo-glitch logo-glitch-b" d={MONOGRAM} />
        {STROKES.map((d, n) => (
          <path
            key={d}
            className="logo-stroke"
            d={d}
            pathLength={1}
            style={{ animationDelay: `${0.35 + n * 0.12}s` }}
          />
        ))}
        <rect
          className="logo-cursor"
          x="32"
          y="30.5"
          width="3"
          height="3"
          fill={url("accent")}
        />
      </g>

      <g className="logo-type">
        <text className="logo-name" x="58" y="26">
          {name}
        </text>
        <text
          className="logo-name logo-name-sheen"
          x="58"
          y="26"
          fill={url("accent")}
          mask={url("sheen-mask")}
        >
          {name}
        </text>
        <text className="logo-tag" x="58.5" y="39">
          {tagline}
        </text>
      </g>
    </svg>
  );
}

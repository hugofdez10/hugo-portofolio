"use client";

import { useEffect } from "react";
import Image from "next/image";
import { animate, useReducedMotion, useScroll, motion } from "motion/react";

export function DesignMotion() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (reduced) return;
    const controls = animate(
      ".hero-content > *",
      { y: [18, 0] },
      { duration: 0.7, delay: (i) => i * 0.07 },
    );
    return () => controls.stop();
  }, [reduced]);

  return (
    <motion.div
      aria-hidden="true"
      className="reading-progress"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function HeroArtwork() {
  return (
    <figure className="hero-artwork hero-portrait">
      <Image
        src="/images/hugo-portrait-new.jpg"
        alt="Hugo Fernández Díez"
        fill
        priority
        quality={95}
        sizes="(max-width: 760px) 100vw, 36vw"
      />
      <figcaption className="portrait-caption">
        <span>HUGO FERNÁNDEZ DÍEZ</span>
        <span>SOFTWARE / PRODUCT</span>
      </figcaption>
    </figure>
  );
}

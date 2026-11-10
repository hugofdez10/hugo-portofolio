"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const chapters = [
  { id: "top", number: "01", en: "Origin", es: "Origen" },
  { id: "proof", number: "02", en: "Impact", es: "Impacto" },
  { id: "work", number: "03", en: "Work", es: "Proyectos" },
  { id: "hackathons", number: "04", en: "Intelligence", es: "Inteligencia" },
  { id: "experience", number: "05", en: "Journey", es: "Trayectoria" },
  { id: "contact", number: "06", en: "Contact", es: "Contacto" },
];

export function ChapterRail({ locale }: { locale: Locale }) {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.46;
        const current = chapters.reduce((result, chapter) => {
          const element = document.getElementById(chapter.id);
          return element && element.getBoundingClientRect().top <= line ? chapter.id : result;
        }, "top");
        setActive((previous) => previous === current ? previous : current);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="chapter-rail" aria-label={locale === "es" ? "Navegación por capítulos" : "Chapter navigation"}>
      <span className="chapter-rail-heading">SCENE INDEX</span>
      <div className="chapter-rail-track">
        <span className="chapter-rail-progress" style={{ transform: "scaleY(" + progress + ")" }} aria-hidden="true" />
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={"#" + chapter.id}
            aria-current={active === chapter.id ? "location" : undefined}
            className={active === chapter.id ? "chapter-rail-item is-active" : "chapter-rail-item"}
            title={chapter[locale]}
          >
            <span className="chapter-rail-dot" aria-hidden="true" />
            <span className="chapter-rail-number">{chapter.number}</span>
            <span className="chapter-rail-name">{chapter[locale]}</span>
          </a>
        ))}
      </div>
      <span className="chapter-rail-bottom">HF / 2026</span>
    </nav>
  );
}

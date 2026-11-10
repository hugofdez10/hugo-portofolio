"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Boxes,
  TerminalSquare,
  Grid2X2,
} from "lucide-react";
import { projects } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

type Filter = "all" | "independent" | "academic";
const selections: { key: Filter; es: string; en: string }[] = [
  { key: "all", es: "Todos", en: "All" },
  { key: "independent", es: "Personales", en: "Independent" },
  { key: "academic", es: "Académicos", en: "Academic" },
];

const labProjects = projects.filter((project) => project.kind !== "company");

function LabArtwork({ slug, number }: { slug: string; number: number }) {
  const isEstate = slug === "gestidomus";
  const isBarber = slug === "samoset-barbershop";
  const isProductivity = slug === "hugos-productivity";
  const isAir = slug === "deustoair";
  return (
    <div className={"lab-art lab-art-" + slug} aria-hidden="true">
      <span className="lab-art-scan">EXPERIMENT / {String(number).padStart(3, "0")}</span>
      <svg viewBox="0 0 520 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={"lab-gradient-" + slug} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isBarber ? "#f1b98b" : isProductivity ? "#9a9fff" : "#a1e9ff"} stopOpacity=".9" />
            <stop offset="100%" stopColor={isBarber ? "#c77d6a" : isProductivity ? "#675eb8" : "#196ca2"} stopOpacity=".18" />
          </linearGradient>
        </defs>
        <g stroke="currentColor" opacity=".09" strokeWidth=".7">
          {Array.from({ length: 13 }, (_, i) => <path key={"v" + i} d={"M" + (20 + i * 40) + " 15 V285"} />)}
          {Array.from({ length: 7 }, (_, i) => <path key={"h" + i} d={"M15 " + (35 + i * 40) + " H505"} />)}
        </g>
        {isEstate ? (
          <g transform="translate(175 48)">
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i} transform={"translate(" + (i * 24) + " " + (i * -13) + ")"}>
                <path d="M0 90 L76 46 L160 92 L82 138 Z" fill={"url(#lab-gradient-" + slug + ")"} stroke="#9ee1ff" strokeOpacity=".62" strokeWidth="1" />
                <path d="M0 90 L82 138 V172 L0 124 Z" fill="#103955" stroke="#68b5e1" strokeOpacity=".35" />
                <path d="M82 138 L160 92 V127 L82 172 Z" fill="#122f4a" stroke="#68b5e1" strokeOpacity=".35" />
              </g>
            ))}
            <path d="M38 45 V8 H126" fill="none" stroke="#75e0ff" strokeOpacity=".5"/>
          </g>
        ) : isBarber ? (
          <g transform="translate(260 150)">
            {Array.from({ length: 8 }, (_, i) => {
              const rotation = i * 45;
              return <ellipse key={i} cx="0" cy="-80" rx="35" ry="90" transform={"rotate(" + rotation + ")"} fill="none" stroke={"url(#lab-gradient-" + slug + ")"} strokeWidth={i % 2 ? "1" : "2"} opacity=".7"/>;
            })}
            <circle r="53" fill="#160f13" stroke="#f3b994" strokeOpacity=".55" />
            <path d="M-15 20 L0 -30 L15 20 M-23 3 H23" stroke="#f5c6a7" strokeWidth="2" fill="none"/>
          </g>
        ) : isProductivity ? (
          <g transform="translate(260 151)">
            <circle r="112" fill="#11102a" stroke="#a2a9ff" strokeOpacity=".25" />
            {Array.from({ length: 24 }, (_, i) => <path key={i} d="M0 -113 V-103" transform={"rotate(" + (i * 15) + ")"} stroke="#a6b2ff" strokeOpacity=".45" />)}
            <circle r="83" fill="none" stroke="#a2a9ff" strokeWidth="1.7" />
            <path d="M0 -67 A67 67 0 1 1 -58 33" fill="none" stroke="#bdbfff" strokeWidth="7" strokeLinecap="round" />
            <path d="M0 0 V-45 M0 0 L33 24" stroke="#f6f4ff" strokeWidth="4" strokeLinecap="round" />
            <circle r="7" fill="#dde5ff" />
          </g>
        ) : isAir ? (
          <g transform="translate(260 150)">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={"M-182 " + (-72 + i * 22) + " C-90 " + (-128 + i * 28) + " 10 " + (110 - i * 26) + " 182 " + (-45 + i * 18)}
                stroke={"url(#lab-gradient-" + slug + ")"} strokeOpacity={0.2 + i * 0.08} strokeWidth="1.8" fill="none"/>
            ))}
            <circle cx="0" cy="0" r="17" stroke="#b2f1ff" strokeWidth="1.4" fill="none"/>
            <circle cx="0" cy="0" r="5" fill="#b2f1ff"/>
          </g>
        ) : (
          <g transform="translate(164 57) rotate(-16 100 100)">
            {Array.from({ length: 64 }, (_, i) => {
              const row = Math.floor(i / 8), col = i % 8, dark = (row + col) % 2;
              return <rect key={i} x={col * 23} y={row * 23} width="23" height="23" fill={dark ? "#25485d" : "#12202e"} stroke="#96caff" strokeOpacity=".13"/>;
            })}
            <path d="M80 142 Q50 120 68 90 Q73 80 89 74 L110 95 L100 117 L122 142 Z" fill="#b3e5fa" stroke="#e2f7ff" />
            <circle cx="76" cy="96" r="3" fill="#12202e"/>
          </g>
        )}
      </svg>
      <span className="lab-art-index">HF / LAB — 0{number}</span>
    </div>
  );
}

export function LabSection({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const es = locale === "es";
  const visible = labProjects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <section className="lab-section" id="lab" aria-labelledby="lab-heading">
      <div className="container">
        <div className="cinematic-section-kicker">
          <span>05 / THE LAB</span>
          <span>PERSONAL PROJECTS / EXPERIMENTS</span>
        </div>
        <div className="lab-heading" data-reveal>
          <div>
            <p className="lab-eyebrow">{es ? "LA CURIOSIDAD COMO MOTOR" : "CURIOSITY AS AN ENGINE"}</p>
            <h2 id="lab-heading">{es ? <>NUNCA DEJO<br/><em>DE CREAR.</em></> : <>ALWAYS<br/><em>BUILDING.</em></>}</h2>
          </div>
          <p>{es
            ? "No todos los proyectos empiezan con un cliente. Algunos empiezan con una pregunta, una idea absurda o la necesidad de aprender algo nuevo."
            : "Not every project starts with a client. Some start with a question, a wild idea, or the need to learn something new."}</p>
        </div>

        <div className="lab-toolbar">
          <span className="lab-toolbar-label"><Grid2X2 size={15}/>{es ? "ARCHIVO DE PROYECTOS" : "PROJECT ARCHIVE"} / {String(visible.length).padStart(2, "0")}</span>
          <div className="lab-filters" role="group" aria-label={es ? "Filtrar proyectos" : "Filter projects"}>
            {selections.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={filter === item.key}
                className={filter === item.key ? "lab-filter is-active" : "lab-filter"}
                onClick={() => setFilter(item.key)}
              >{item[locale]}</button>
            ))}
          </div>
        </div>

        <div className="lab-gallery" aria-live="polite">
          {visible.map((project) => {
            const originalIndex = labProjects.findIndex((item) => item.slug === project.slug) + 1;
            const href = project.url ?? project.repository;
            return (
              <article className="lab-project" key={project.slug}>
                <div className="lab-project-stage">
                  <LabArtwork slug={project.slug} number={originalIndex} />
                  <div className="lab-project-stage-tags">
                    <span>{project.kind === "academic" ? (es ? "ACADÉMICO" : "ACADEMIC") : (es ? "PERSONAL" : "INDEPENDENT")}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
                <div className="lab-project-details">
                  <div className="lab-project-meta"><span>EXPERIMENT / {String(originalIndex).padStart(2,"0")}</span><span>{project.category[locale]}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.description[locale]}</p>
                  <div className="lab-project-stack">{project.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <div className="lab-project-actions">
                    {href ? <a href={href} target="_blank" rel="noopener noreferrer">
                      {project.url ? (es ? "EXPLORAR PROYECTO" : "EXPLORE PROJECT") : (es ? "VER CÓDIGO" : "VIEW CODE")}
                      <ArrowUpRight size={16}/>
                    </a> : <span className="lab-unlisted">{es ? "PROYECTO EN ARCHIVO" : "ARCHIVED PROJECT"} <Boxes size={14}/></span>}
                    {project.url && project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={"GitHub: " + project.name}><Github size={17}/></a>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <Link href={locale === "es" ? "/es/#experience" : "/en/#experience"} className="lab-next-link">
          <span><TerminalSquare size={19}/> {es ? "¿QUIÉN HAY DETRÁS?" : "THE PERSON BEHIND THE CODE"}</span>
          <ArrowRight size={19}/>
        </Link>
      </div>
    </section>
  );
}

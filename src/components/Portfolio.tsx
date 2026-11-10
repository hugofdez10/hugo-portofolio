import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { gipuzkoa360 } from "@/data/hackathons";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Motion } from "./Motion";
import { CinematicCore } from "./CinematicCore";
import { GpuCore } from "./GpuCore";
import { IntelligenceVisual } from "./IntelligenceVisual";
import { ChapterRail } from "./ChapterRail";
import { LabSection } from "./LabSection";
import { JourneySection } from "./JourneySection";
import { FinaleSection } from "./FinaleSection";
import { ParticleField } from "./ParticleField";
import { ProjectVisual } from "./ProjectVisual";
import { CommandPalette } from "./CommandPalette";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
/** Stagger index consumed by the CSS animations. */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-head" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = projects.filter((p) => p.kind === "company");
  return (
    <>
      <Navigation locale={locale} />
      <Motion />
      <CommandPalette locale={locale} />
      <ChapterRail locale={locale} />
      <main>
        <section className="cinematic-hero" id="top">
          <div className="cinematic-hero-visual"><CinematicCore /><GpuCore /><ParticleField /></div>
          <div className="container cinematic-hero-inner">
            <div className="cinematic-hero-meta">
              <span>HF® / PORTFOLIO — 2026</span>
              <span>{locale === "es" ? "INGENIERÍA CREATIVA" : "CREATIVE ENGINEERING"}</span>
            </div>
            <div className="cinematic-hero-copy">
              <span className="cinematic-overline">
                <span className="cinematic-live-dot" /> {t.availability}
              </span>
              <h1 aria-label="Hugo Fernández Díez">
                <span>BEYOND</span>
                <span>THE <em>INTERFACE.</em></span>
              </h1>
              <div className="cinematic-hero-bottom">
                <div>
                  <p className="cinematic-name">HUGO FERNÁNDEZ DÍEZ <span>/ FULL-STACK & AI</span></p>
                  <p className="cinematic-description">
                    {locale === "es"
                      ? "Convierto problemas reales en productos digitales. Desarrollo software, diseño experiencias y experimento con inteligencia artificial."
                      : "I turn real problems into digital products. I build software, design experiences and experiment with artificial intelligence."}
                  </p>
                </div>
                <div className="cinematic-hero-actions">
                  <Link className="cinematic-primary-link" href={`/${locale}/#work`}>
                    {t.explore} <ArrowUpRight size={19} />
                  </Link>
                  <Link className="cinematic-secondary-link" href={`/${locale}/#contact`}>
                    {t.contactCta} <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="cinematic-hero-footer">
              <span>01 / 07 — THE AWAKENING</span>
              <span>{locale === "es" ? "DESLIZA PARA EXPLORAR ↓" : "SCROLL TO EXPLORE ↓"}</span>
            </div>
          </div>
        </section>

        <section className="cinematic-proof" id="proof" aria-label={locale === "es" ? "Resultados" : "Results"}>
          <div className="container">
            <div className="cinematic-section-kicker"><span>02 / THE PROOF</span><span>EST. 2026</span></div>
            <p className="cinematic-proof-intro">
              {locale === "es" ? "NO SOLO IDEAS." : "NOT JUST IDEAS."}
              <strong>{locale === "es" ? " PRODUCTOS REALES." : " REAL PRODUCTS."}</strong>
            </p>
            <dl className="cinematic-metrics" data-reveal>
              {t.metrics.map(([value, label], index) => (
                <div className="cinematic-metric" key={label}>
                  <span className="cinematic-metric-index">0{index + 1}</span>
                  <dt data-count={value}>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="cinematic-bridge" aria-hidden="true">
          <span>DESIGN / BUILD / SHIP / REPEAT</span>
          <span>DESIGN / BUILD / SHIP / REPEAT</span>
        </div>

        <section className="section container cinematic-work" id="work">
          <div className="cinematic-section-kicker"><span>03 / SELECTED WORK</span><span>{locale === "es" ? "PROYECTOS / IMPACTO" : "PROJECTS / IMPACT"}</span></div>
          <SectionHead eyebrow={t.workEyebrow} title={t.workTitle} />
          <div className="featured">
            {featured.map((project, index) => (
              <article
                className="panel card cinematic-project-card"
                key={project.slug}
                data-reveal
                style={order(index)}
              >
                <ProjectVisual variant={index === 0 ? "housing" : "shuttle"} />
                <div className="cinematic-project-content">
                  <div className="cinematic-project-topline">
                    <span className="label label-company">{project.label[locale]}</span>
                    <span className="cinematic-project-number">PROJECT / 0{index + 1}</span>
                  </div>
                  <div className="cinematic-project-copy">
                    <span className="cinematic-project-kicker">{project.category[locale]} / {project.year}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description[locale]}</p>
                    <p className="card-stack">{project.stack.slice(0, 4).join(" · ")}</p>
                  </div>
                  <div className="links">
                    {project.caseStudy && (
                      <Link href={`/${locale}/work/${project.slug}`}>
                        {t.caseStudy} <ArrowRight size={16} />
                      </Link>
                    )}
                    {project.url && (
                      <a href={project.url} {...external}>
                        {t.visit} <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cinematic-intelligence" id="hackathons">
          <div className="container">
            <div className="cinematic-section-kicker">
              <span>04 / THE INTELLIGENCE</span>
              <span>GIPUZKOA AI HACKATHON — 2026</span>
            </div>
            <div className="cinematic-intelligence-heading" data-reveal>
              <div>
                <p className="cinematic-intelligence-overline">{t.hackathonsEyebrow} / {gipuzkoa360.event}</p>
                <h2>{locale === "es" ? "EL FUTURO ES" : "THE FUTURE IS"}<br/><em>{locale === "es" ? "UN SISTEMA." : "A SYSTEM."}</em></h2>
              </div>
              <div className="cinematic-intelligence-award">
                <span>TOP</span>
                <strong>03</strong>
                <span>60+ TEAMS</span>
              </div>
            </div>
            <div className="cinematic-intelligence-grid">
              <IntelligenceVisual />
              <div className="cinematic-intelligence-story" data-reveal>
                <span className="cinematic-intelligence-id">PROJECT / 003 — AI SYSTEMS</span>
                <h3>{gipuzkoa360.name}</h3>
                <p>{gipuzkoa360.summary[locale]}</p>
                <p className="cinematic-intelligence-team">{gipuzkoa360.team[locale]}</p>
                <div className="cinematic-intelligence-links">
                  <a href={gipuzkoa360.demo} {...external}>{t.demo}<ArrowUpRight size={17}/></a>
                  <a href={gipuzkoa360.repository} {...external}>{t.code}<ArrowUpRight size={17}/></a>
                </div>
                <span className="cinematic-intelligence-note">{locale === "es" ? "Visualización conceptual de 88 nodos municipales; no es un mapa geográfico." : "Conceptual visualization of 88 municipal nodes; not a geographic map."}</span>
              </div>
            </div>
          </div>
        </section>

        <LabSection locale={locale} />
        <JourneySection locale={locale} />
        <FinaleSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

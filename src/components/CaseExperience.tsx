import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock, Layers3, MapPin, ChevronDown, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects, type Project } from "@/data/projects";
import { copy, type Locale } from "@/lib/i18n";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function CaseExperience({ project, locale }: { project: Project; locale: Locale }) {
  const t = copy[locale];
  if (!project.caseStudy) return null;
  const isHousing = project.slug === "housing-management";
  const es = locale === "es";
  const next = projects.find((item) => item.caseStudy && item.slug !== project.slug);
  const sections = [
    { index: "01", tag: "CONTEXT", title: t.challenge, body: project.caseStudy.challenge[locale] },
    { index: "02", tag: "STRATEGY", title: t.approach, body: project.caseStudy.approach[locale] },
    { index: "03", tag: "ENGINEERING", title: t.build, body: project.caseStudy.build[locale] },
    { index: "04", tag: "RESULT", title: t.outcome, body: project.caseStudy.outcome[locale] },
    { index: "05", tag: "REFLECTION", title: t.lessons, body: project.caseStudy.lessons[locale] },
  ];

  return (
    <>
      <Navigation locale={locale} path={"/work/" + project.slug} />
      <CommandPalette locale={locale} />
      <main className={"case-cinematic case-cinematic-" + project.slug}>
        <header className="case-cinematic-header">
          <div className="container">
            <Link className="case-cinematic-back" href={"/" + locale + "/#work"}><ArrowLeft size={16}/>{t.back}</Link>
            <div className="case-cinematic-topline">
              <span>HF® / SELECTED WORK</span>
              <span>CASE STUDY / {project.year}</span>
            </div>
            <div className="case-cinematic-heading">
              <div>
                <span className="case-cinematic-category">{project.category[locale]} / {project.context[locale]}</span>
                <h1>{project.name}</h1>
              </div>
              <div className="case-cinematic-number">0{isHousing ? "1" : "2"}</div>
            </div>
            <div className="case-cinematic-subheading">
              <p>{project.description[locale]}</p>
              <a href="#case-overview" className="case-cinematic-scroll" aria-label={es ? "Ir a la descripción" : "Jump to overview"}>
                <ChevronDown size={18}/>{es ? "EXPLORAR SISTEMA" : "EXPLORE SYSTEM"}
              </a>
            </div>
          </div>
          <div className="case-cinematic-cover">
            <div className="container case-cinematic-cover-inner">
              <ProjectVisual variant={isHousing ? "housing" : "shuttle"}/>
              <span className="case-cinematic-cover-note">{es ? "VISUALIZACIÓN CONCEPTUAL DEL SISTEMA" : "CONCEPTUAL SYSTEM VISUALIZATION"}</span>
            </div>
          </div>
        </header>

        <section className="case-cinematic-overview" id="case-overview">
          <div className="container">
            <div className="cinematic-section-kicker">
              <span>PROJECT / OVERVIEW</span><span>REAL-WORLD SOFTWARE</span>
            </div>
            <div className="case-cinematic-overview-grid">
              <div className="case-cinematic-overview-message">
                <span className="case-cinematic-overline">{es ? "DEL PROBLEMA AL PRODUCTO" : "FROM PROBLEM TO PRODUCT"}</span>
                <h2>{es ? <>SOFTWARE<br/><em>CON IMPACTO.</em></> : <>SOFTWARE<br/><em>WITH IMPACT.</em></>}</h2>
                <p>{isHousing
                  ? (es ? "Un sistema de gestión diseñado a partir de necesidades reales del equipo de alojamiento." : "A management system designed around the real needs of a seasonal staff housing team.")
                  : (es ? "Una reserva de transporte sencilla para sustituir la coordinación manual por WhatsApp." : "A simple transportation booking experience to replace manual coordination through WhatsApp.")}</p>
              </div>
              <div className="case-cinematic-overview-specs">
                <div><span>CLIENT / CONTEXT</span><strong>Enchanted Parks — NY, USA</strong></div>
                <div><span>YEAR</span><strong>{project.year}</strong></div>
                <div><span>STATUS</span><strong>{project.label[locale]}</strong></div>
                <div><span>FOCUS</span><strong>{project.category[locale]}</strong></div>
                <div>
                  <span>LINKS</span>
                  <div className="case-cinematic-overview-links">
                    {project.url && <a href={project.url} {...external}>{project.urlLabel?.[locale] ?? t.visit}<ExternalLink size={14}/></a>}
                    {!project.repository && <span><Lock size={13}/>{t.privateRepo}</span>}
                    {project.repository && <a href={project.repository} {...external}>GITHUB<ArrowUpRight size={14}/></a>}
                  </div>
                </div>
              </div>
            </div>
            <div className="case-cinematic-highlights">
              <div><span className="case-highlight-label">{isHousing ? "75" : "~200"}</span><span>{isHousing ? (es ? "CABAÑAS" : "CABINS") : (es ? "TRABAJADORES" : "WORKERS")}</span></div>
              <div><span className="case-highlight-label">{isHousing ? "200" : "01"}</span><span>{isHousing ? (es ? "RESIDENTES" : "RESIDENTS") : (es ? "FLUJO DE RESERVAS" : "BOOKING FLOW")}</span></div>
              <div><span className="case-highlight-label">2026</span><span>{es ? "ENTREGADO A LA EMPRESA" : "DELIVERED TO COMPANY"}</span></div>
            </div>
          </div>
        </section>

        <section className="case-cinematic-story" aria-label={es ? "Historia del proyecto" : "Project story"}>
          <div className="container case-cinematic-story-grid">
            <aside className="case-cinematic-story-sidebar">
              <div className="case-cinematic-story-sticky">
                <span className="case-cinematic-overline">THE PROCESS / 01—05</span>
                <h2>{es ? "DE LA IDEA<br/>AL IMPACTO." : "FROM IDEA<br/>TO IMPACT."}</h2>
                <nav aria-label={es ? "Etapas del proyecto" : "Project chapters"}>
                  {sections.map((section) => <a href={"#case-chapter-" + section.index} key={section.index}><span>{section.index}</span>{section.title}<ArrowRight size={13}/></a>)}
                </nav>
              </div>
            </aside>
            <div className="case-cinematic-story-chapters">
              {sections.map((section) => (
                <article className="case-cinematic-chapter" id={"case-chapter-" + section.index} key={section.index} data-reveal>
                  <div className="case-cinematic-chapter-meta"><span>{section.index} / 05</span><span>{section.tag}</span></div>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  <div className="case-cinematic-chapter-rule" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-cinematic-tech">
          <div className="container">
            <div className="cinematic-section-kicker"><span>ENGINEERING / TOOLKIT</span><span>STACK 2026</span></div>
            <div className="case-cinematic-tech-header"><Layers3 size={24}/><h2>{es ? "DETRÁS DEL SISTEMA." : "UNDER THE HOOD."}</h2></div>
            <div className="case-cinematic-tech-grid">
              {project.stack.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><ArrowUpRight size={16}/></div>)}
            </div>
          </div>
        </section>

        {project.screenshot && (
          <section className="case-cinematic-screenshot">
            <div className="container">
              <div className="cinematic-section-kicker"><span>REAL PRODUCT / INTERFACE</span><span>{es ? "DATOS PRIVADOS OCULTOS" : "PRIVATE DATA REDACTED"}</span></div>
              <div className="case-cinematic-screen-frame">
                <div className="case-cinematic-screen-bar">
                  <span className="case-screen-dots"><i/><i/><i/></span>
                  <span>{project.name.toUpperCase()} / INTERFACE</span>
                  <span>HF®</span>
                </div>
                <Image src={project.screenshot.src} alt={project.screenshot.alt[locale]}
                  width={project.screenshot.width} height={project.screenshot.height}
                  sizes="(max-width: 1200px) 95vw, 1200px"/>
              </div>
            </div>
          </section>
        )}

        <section className="case-cinematic-next">
          <div className="container">
            <div className="cinematic-section-kicker"><span>NEXT / DISCOVER</span><span>CONTINUE EXPLORING</span></div>
            {next && <Link href={"/" + locale + "/work/" + next.slug} className="case-cinematic-next-link">
              <div>
                <span>{t.nextCase}</span>
                <strong>{next.name}</strong>
              </div>
              <span className="case-cinematic-next-arrow"><ArrowUpRight size={30}/></span>
            </Link>}
            <Link href={"/" + locale + "/#contact"} className="case-cinematic-return">
              <MapPin size={15}/>{es ? "CONSTRUIR ALGO JUNTOS" : "BUILD SOMETHING TOGETHER"} <ArrowRight size={16}/>
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

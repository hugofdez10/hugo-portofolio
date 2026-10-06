import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import {
  featuredProjects,
  labProjects,
  mainProjects,
  secondaryProjects,
  type Project,
} from "@/data/projects";
import { experience } from "@/data/experience";
import { stack } from "@/data/stack";
import { socials } from "@/data/socials";
import { existsSync } from "node:fs";
import path from "node:path";
import { Navigation } from "./Navigation";
import { ProjectVisual } from "./ProjectVisual";
import { Terminal } from "./Terminal";
import { DesignMotion, HeroArtwork } from "./DesignMotion";
import { GlobalEffects, HeroField, ParticleMorph } from "./Effects";
import { Hackathons } from "./Hackathons";

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-intro">
      <span className="eyebrow">
        <span className="blue-dot" />
        {eyebrow}
      </span>
      <div className="section-intro-row">
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function FeaturedCard({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  const t = copy[locale];
  return (
    <article className="featured-card">
      <div className="featured-content">
        <div className="featured-meta">
          <span>
            {String(index + 1).padStart(2, "0")} / {t.featured}
          </span>
          <span>
            {project.year} · {project.status[locale]}
          </span>
        </div>
        <div>
          <p className="project-context">{project.context[locale]}</p>
          <h3>{project.name}</h3>
          <p className="project-category">{project.category[locale]}</p>
          <p className="project-description">{project.description[locale]}</p>
          <ul className="highlight-list">
            {project.highlights[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <Tags items={project.stack} />
          <div className="project-actions">
            <Link
              href={`/${locale}/work/${project.slug}`}
              className="text-link"
            >
              {t.viewCase} <ArrowUpRight size={18} />
            </Link>
            {project.url && (
              <a
                className="subtle-link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.visit} <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/${locale}/work/${project.slug}`}
        className="featured-visual-link"
        aria-label={`${t.viewCase}: ${project.name}`}
      >
        <ProjectVisual
          variant={index === 0 ? "housing" : "shuttle"}
          title={project.name}
          screenshot={
            project.screenshot && {
              src: project.screenshot.src,
              alt: project.screenshot.alt[locale],
              label: project.screenshot.label[locale],
            }
          }
        />
      </Link>
    </article>
  );
}

function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = copy[locale];
  return (
    <article className="project-card">
      <div className="card-top">
        <span>
          {project.year} / {project.status[locale]}
        </span>
        <MoveUpRight size={18} />
      </div>
      <div>
        <p className="project-context">{project.context[locale]}</p>
        <h3>{project.name}</h3>
        <p className="project-category">{project.category[locale]}</p>
        <p className="project-description">{project.description[locale]}</p>
      </div>
      <div>
        <Tags items={project.stack} />
        <a
          className="text-link"
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
        >
          {locale === "es" ? "Ver código en GitHub" : "View code on GitHub"}{" "}
          <Github size={16} />
        </a>
        {project.url && (
          <a
            className="text-link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.visit} <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const cvAvailable = existsSync(
    path.join(process.cwd(), "public", "cv-hugo-fernandez-diez.pdf"),
  );
  return (
    <>
      <Navigation locale={locale} />
      <DesignMotion />
      <GlobalEffects />
      <main>
        <section className="hero" id="top">
          <HeroField />
          <div className="hero-glow" />
          <div className="container hero-inner">
            <div className="hero-content">
              <div className="availability">
                <span className="pulse-dot" />
                {t.availability}
              </div>
              <p className="hero-kicker">{t.heroKicker}</p>
              <h1>
                <span>Hugo</span>
                <br />
                <span>
                  Fernández Díez<span className="hero-period">.</span>
                </span>
              </h1>
              <p className="hero-statement">{t.heroTitle}</p>
              <p className="hero-body">{t.heroBody}</p>
              <div className="hero-actions">
                <Link
                  href={`/${locale}/#work`}
                  className="button button-primary"
                >
                  {t.explore} <ArrowDown size={17} />
                </Link>
                <a
                  href={socials.github}
                  className="button button-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <ArrowUpRight size={17} />
                </a>
                {cvAvailable && (
                  <a
                    href="/cv-hugo-fernandez-diez.pdf"
                    download
                    className="button button-secondary"
                  >
                    {t.download} <ArrowDown size={17} />
                  </a>
                )}
                <a href={socials.email} className="hero-talk">
                  {t.talk} <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <HeroArtwork />
            <div className="hero-command" aria-hidden="true">
              <div>
                <span className="terminal-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>hugo@portfolio ~</span>
              </div>
              <p>
                <span>$</span> whoami
              </p>
              <p>
                {locale === "en"
                  ? "Software developer"
                  : "Desarrollador de software"}
                <br />
                Computer Engineering @ Deusto
                <br />
                {locale === "en"
                  ? "Building useful things_"
                  : "Construyendo cosas útiles_"}
              </p>
              <small>
                STATUS: BUILDING <span>●</span>
              </small>
            </div>
            <div className="hero-bottom">
              <div className="hero-disciplines">
                <span>SOFTWARE</span>
                <span>PRODUCT</span>
                <span>AI</span>
                <span>AUTOMATION</span>
              </div>
              <span className="hero-scroll">
                {t.scroll} <ArrowDown size={14} />
              </span>
            </div>
          </div>
        </section>

        <ParticleMorph locale={locale} />

        <section className="metrics-band" aria-label="Profile highlights">
          <div className="container metrics-grid">
            {t.metrics.map(([value, label]) => (
              <div className="metric" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <SectionIntro
              eyebrow={t.workEyebrow}
              title={t.workTitle}
              body={t.workIntro}
            />
            <div className="featured-list">
              {featuredProjects.map((project, index) => (
                <FeaturedCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  index={index}
                />
              ))}
            </div>
            {featuredProjects.length > 0 && (
              <div className="subsection-heading">
                <div>
                  <span className="eyebrow">/ 03—04</span>
                  <h3>{t.moreWork}</h3>
                  <p>{t.moreWorkBody}</p>
                </div>
              </div>
            )}
            <div className="project-grid">
              {mainProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                />
              ))}
            </div>
            <div className="compact-projects">
              {secondaryProjects.map((project) => (
                <article className="compact-project" key={project.slug}>
                  <span className="compact-index">
                    {project.year} / {project.status[locale]}
                  </span>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description[locale]}</p>
                    <Tags items={project.stack} />
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.visit}: ${project.name}`}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <SectionIntro
              eyebrow={t.processEyebrow}
              title={t.processTitle}
              body={t.processIntro}
            />
            <div className="process-grid">
              {t.process.map(([title, description], index) => (
                <div className="process-step" key={title}>
                  <span className="process-number">0{index + 1}</span>
                  <div className="process-line" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="container">
            <SectionIntro
              eyebrow={t.experienceEyebrow}
              title={t.experienceTitle}
              body={t.experienceIntro}
            />
            <div className="timeline">
              {experience.map((item) => (
                <div className="timeline-item" key={item.period}>
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-main">
                    <div className="timeline-title">
                      <h3>{item.place[locale]}</h3>
                      <span>
                        <MapPin size={14} />
                        {item.location[locale]}
                      </span>
                    </div>
                    <div className="timeline-roles">
                      {item.roles.map((role) => (
                        <div key={role.title.en}>
                          <h4>{role.title[locale]}</h4>
                          <p>{role.description[locale]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section stack-section" id="stack">
          <div className="container">
            <SectionIntro
              eyebrow={t.stackEyebrow}
              title={t.stackTitle}
              body={t.stackIntro}
            />
            <div className="stack-grid">
              {stack.map((group) => (
                <div className="stack-group" key={group.label.en}>
                  <span className="stack-label">{group.label[locale]}</span>
                  <div>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section ai-section">
          <div className="container ai-layout">
            <div>
              <span className="eyebrow">
                <span className="blue-dot" />
                {t.aiEyebrow}
              </span>
              <h2>{t.aiTitle}</h2>
              <p className="ai-body">{t.aiBody}</p>
              <p className="ai-note">{t.aiNote}</p>
            </div>
            <div className="ai-workflow">
              <div className="workflow-top">
                <span>HUGO / DEVELOPMENT LOOP</span>
                <span>↗</span>
              </div>
              <div className="workflow-steps">
                {t.aiSteps.map((step, i) => (
                  <div key={step}>
                    <span>0{i + 1}</span>
                    <strong>{step}</strong>
                    <ArrowRight size={17} />
                  </div>
                ))}
              </div>
              <div className="workflow-bottom">
                HUMAN JUDGMENT <span>×</span> MODERN TOOLS
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <SectionIntro eyebrow={t.aboutEyebrow} title={t.aboutTitle} />
            <div className="about-grid">
              <div className="about-copy">
                <p>{t.aboutP1}</p>
                <p>{t.aboutP2}</p>
                <div className="about-aside">
                  <span>WHEN I’M NOT BUILDING</span>
                  <p>{t.aboutSmall}</p>
                </div>
              </div>
              <div className="about-facts">
                <div>
                  <span>01 / {t.education}</span>
                  <h3>{t.educationBody}</h3>
                  <p>{t.educationMeta}</p>
                </div>
                <div>
                  <span>02 / {t.international}</span>
                  <h3>Canada ↗ United States ↗ Spain</h3>
                  <p>{t.internationalBody}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Hackathons locale={locale} />

        {labProjects.length > 0 && (
          <section className="section lab-section" id="lab">
            <div className="container">
              <SectionIntro
                eyebrow={t.labEyebrow}
                title={t.labTitle}
                body={t.labIntro}
              />
              <div className="lab-list">
                {labProjects.map((project) => (
                  <div className="lab-item" key={project.slug}>
                    <div>
                      <span>{project.status[locale]}</span>
                      <h3>{project.name}</h3>
                      <p>{project.description[locale]}</p>
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.visit}: ${project.name}`}
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="contact-section" id="contact">
          <div className="container">
            <span className="eyebrow">
              <span className="blue-dot" />
              {t.contactEyebrow}
            </span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
            <div className="contact-actions">
              {cvAvailable && (
                <a
                  className="button button-secondary"
                  href="/cv-hugo-fernandez-diez.pdf"
                  download="CV_Hugo_Fernandez_Diez.pdf"
                >
                  {t.download} <ArrowDown size={18} />
                </a>
              )}
              <a className="button button-light" href={socials.email}>
                {t.email} <Mail size={18} />
              </a>
              <a
                className="contact-social"
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ArrowUpRight size={17} />
              </a>
              <a
                className="contact-social"
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight size={17} />
              </a>
            </div>
            <a className="email-address" href={socials.email}>
              hugofdezdiez@gmail.com
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link href={`/${locale}`} className="brand">
              HF<span>.</span>
            </Link>
            <p>
              Hugo Fernández Díez
              <br />
              Computer Engineering · Software · AI · Product
            </p>
          </div>
          <div>
            <span>LOCATION</span>
            <p>Bilbao / Santander, Spain</p>
          </div>
          <div>
            <span>CONNECT</span>
            <a href={socials.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={socials.email}>
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Hugo Fernández Díez</span>
          <span>{t.footerLine}</span>
          <Terminal locale={locale} />
        </div>
      </footer>
    </>
  );
}

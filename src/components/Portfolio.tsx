import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, Rocket } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { gipuzkoa360, siteRegret } from "@/data/hackathons";
import { stack } from "@/data/stack";
import { cvPath, socials } from "@/data/socials";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Motion } from "./Motion";
import { CircuitField, ComputeScene, PixelEdge } from "./HeroArt";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
/** Stagger index consumed by the CSS animations. */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

function SectionHead({
  number,
  eyebrow,
  title,
  dim,
}: {
  number: string;
  eyebrow: string;
  title: string;
  dim: string;
}) {
  return (
    <div className="section-head" data-reveal>
      <span className="eyebrow">
        {number} — {eyebrow}
      </span>
      <h2>
        {title} <span className="dim">{dim}</span>
      </h2>
    </div>
  );
}

function Rows({
  prefix,
  start = 0,
  items,
}: {
  prefix: string;
  start?: number;
  items: {
    key: string;
    name: string;
    meta: string;
    end: string;
    href?: string;
  }[];
}) {
  return (
    <ul className="rows" data-reveal>
      {items.map((item, index) => {
        const content = (
          <>
            <span className="row-number">
              {prefix}.{start + index + 1}
            </span>
            <span className="row-name">{item.name}</span>
            <span className="row-meta">{item.meta}</span>
            <span className="row-end">
              {item.end}
              {item.href && <ArrowUpRight size={14} />}
            </span>
          </>
        );
        return (
          <li key={item.key} style={order(index)}>
            {item.href ? (
              <a href={item.href} {...external}>
                {content}
              </a>
            ) : (
              <div>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SiteRegretMedia({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { video } = siteRegret;
  if (video?.youtubeId)
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
        title={t.videoTitle}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  if (video?.src)
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={siteRegret.image}
        aria-label={t.videoTitle}
      >
        <source src={video.src} type="video/mp4" />
      </video>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={siteRegret.image}
      alt={siteRegret.imageAlt[locale]}
      loading="lazy"
    />
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = projects.filter((p) => p.kind === "company");
  const more = projects.filter((p) => p.kind !== "company");
  return (
    <>
      <Navigation locale={locale} />
      <Motion />
      <main>
        <section className="hero" id="top">
          <div className="sky" aria-hidden="true">
            <CircuitField />
            <ComputeScene />
          </div>
          <div className="container hero-inner">
            <span className="availability intro" style={order(0)}>
              <span className="status-dot" />
              {t.availability}
            </span>
            <h1 aria-label="Hugo Fernández Díez">
              {["Hugo", "Fernández", "Díez"].map((word, index) => (
                <span className="word" key={word} aria-hidden="true">
                  <span style={order(index + 1)}>{word}</span>
                </span>
              ))}
            </h1>
            <p className="hero-role intro" style={order(4)}>
              {t.role}
            </p>
            <p className="hero-body intro" style={order(5)}>
              {t.heroBody}
            </p>
            <div className="hero-actions intro" style={order(6)}>
              <Link href={`/${locale}/#work`} className="button button-light">
                {t.explore} <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/#contact`}
                className="button button-glass"
              >
                {t.contactCta}
              </Link>
            </div>
          </div>
          <PixelEdge />
        </section>

        <section className="container proof">
          <dl className="metrics" data-reveal>
            {t.metrics.map(([value, label], index) => (
              <div key={label} className="metric" style={order(index)}>
                <dt data-count={value}>{value}</dt>
                <dd>
                  <strong>{label}</strong>
                  <span>{t.metricNotes[index]}</span>
                </dd>
              </div>
            ))}
            <div className="metric metric-honor" style={order(2)}>
              <dt data-count={t.hackathonMetric.value}>
                {t.hackathonMetric.value}
              </dt>
              <dd>
                <Link
                  href={`/${locale}/#hackathons`}
                  className="metric-link"
                >
                  <strong>{t.hackathonMetric.label}</strong>
                  <span>{t.hackathonMetric.note}</span>
                </Link>
              </dd>
            </div>
          </dl>
          <p className="proof-line" data-reveal>
            {t.heroDim}
          </p>
        </section>

        <section className="section container" id="hackathons">
          <SectionHead
            number="1.0"
            eyebrow={t.hackathonsEyebrow}
            title={t.hackathonsTitle}
            dim={t.hackathonsDim}
          />
          <article className="panel card hackathon nasa" data-reveal>
            <div className="card-top">
              <span className="card-number">1.1</span>
              <span className="label label-nasa">
                <Rocket size={12} aria-hidden="true" />
                {siteRegret.badge[locale]}
              </span>
              <span className="card-event">{siteRegret.event}</span>
            </div>
            <h3>{siteRegret.name}</h3>
            <p className="recognition">{siteRegret.question[locale]}</p>
            <div className="nasa-media">
              <figure className="media-frame">
                <div className="media-window">
                  <SiteRegretMedia locale={locale} />
                </div>
                <figcaption>
                  {siteRegret.video ? t.videoCaption : t.imageCaption}
                </figcaption>
              </figure>
              <ul className="highlights">
                {siteRegret.highlights[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <dl className="facts">
              <div>
                <dt>{t.solves}</dt>
                <dd>{siteRegret.summary[locale]}</dd>
              </div>
              <div>
                <dt>{t.team}</dt>
                <dd>
                  {siteRegret.teamName} · {siteRegret.teamMembers[locale]}
                </dd>
              </div>
              <div>
                <dt>{t.contribution}</dt>
                <dd>{siteRegret.contribution[locale]}</dd>
              </div>
              <div>
                <dt>{t.tech}</dt>
                <dd>{siteRegret.stack.join(" · ")}</dd>
              </div>
            </dl>
            <div className="links">
              <a href={siteRegret.demo} {...external}>
                {t.demo} <ArrowUpRight size={14} />
              </a>
              <a href={siteRegret.story} {...external}>
                {t.story} <ArrowUpRight size={14} />
              </a>
              <a href={siteRegret.repository} {...external}>
                {t.code} <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
          <article className="panel card hackathon" data-reveal>
            <div className="card-top">
              <span className="card-number">1.2</span>
              <span className="label label-award">
                <Award size={12} aria-hidden="true" />
                {gipuzkoa360.badge[locale]}
              </span>
              <span className="card-event">{gipuzkoa360.event}</span>
            </div>
            <h3>{gipuzkoa360.name}</h3>
            <p className="recognition">{gipuzkoa360.recognition[locale]}</p>
            <figure className="final-photo">
              <div className="media-window">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gipuzkoa360.final.image}
                  alt={gipuzkoa360.final.alt[locale]}
                  width={1600}
                  height={1200}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span className="eyebrow">{gipuzkoa360.final.label[locale]}</span>
                <p>{gipuzkoa360.final.caption[locale]}</p>
                <ul className="audience">
                  {gipuzkoa360.final.audience[locale].map((who) => (
                    <li key={who}>{who}</li>
                  ))}
                </ul>
                <div className="insight">
                  <strong>{gipuzkoa360.final.insight.value}</strong>
                  <span>{gipuzkoa360.final.insight.text[locale]}</span>
                </div>
              </figcaption>
            </figure>
            <dl className="facts">
              <div>
                <dt>{t.solves}</dt>
                <dd>{gipuzkoa360.summary[locale]}</dd>
              </div>
              <div>
                <dt>{t.team}</dt>
                <dd>
                  {gipuzkoa360.teamName} · {gipuzkoa360.teamMembers[locale]}
                </dd>
              </div>
              <div>
                <dt>{t.contribution}</dt>
                <dd>{gipuzkoa360.contribution[locale]}</dd>
              </div>
            </dl>
            <div className="links">
              <a href={gipuzkoa360.demo} {...external}>
                {t.demo} <ArrowUpRight size={14} />
              </a>
              <a href={gipuzkoa360.repository} {...external}>
                {t.code} <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
          <p className="footnote" data-reveal>
            {t.upcoming}
          </p>
        </section>

        <section className="section container" id="work">
          <SectionHead
            number="2.0"
            eyebrow={t.workEyebrow}
            title={t.workTitle}
            dim={t.workDim}
          />
          <div className="featured">
            {featured.map((project, index) => (
              <article
                className="panel card"
                key={project.slug}
                data-reveal
                style={order(index)}
              >
                <div className="card-top">
                  <span className="card-number">2.{index + 1}</span>
                  <span className="label label-company">
                    {project.label[locale]}
                  </span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description[locale]}</p>
                <p className="card-stack">
                  {project.stack.slice(0, 3).join(" · ")}
                </p>
                <div className="links">
                  {project.caseStudy && (
                    <Link href={`/${locale}/work/${project.slug}`}>
                      {t.caseStudy} <ArrowRight size={14} />
                    </Link>
                  )}
                  {project.url && (
                    <a href={project.url} {...external}>
                      {t.visit} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <h3 className="list-title" data-reveal>
            {t.more}
          </h3>
          <Rows
            prefix="2"
            start={featured.length}
            items={more.map((project) => ({
              key: project.slug,
              name: project.name,
              meta: project.category[locale],
              end: project.year,
              href: project.url ?? project.repository,
            }))}
          />
        </section>

        <section className="section container" id="experience">
          <SectionHead
            number="3.0"
            eyebrow={t.experienceEyebrow}
            title={t.experienceTitle}
            dim={t.experienceDim}
          />
          <Rows
            prefix="3"
            items={experience.map((item) => ({
              key: item.title.en,
              name: item.title[locale],
              meta: item.place[locale],
              end: item.period[locale],
            }))}
          />
          <h3 className="list-title" data-reveal>
            {t.education}
          </h3>
          <Rows
            prefix="3"
            start={experience.length}
            items={education.map((item) => ({
              key: item.title.en,
              name: item.title[locale],
              meta: item.place[locale],
              end: item.period,
            }))}
          />
          <h3 className="list-title" data-reveal>
            {t.stackLabel}
          </h3>
          <ul className="stack-line" data-reveal>
            {stack.map((item, index) => (
              <li key={item} style={order(index)}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="section container contact" id="contact">
          <div className="panel contact-panel" data-reveal>
            <span className="eyebrow">4.0 — {t.contactEyebrow}</span>
            <h2>
              {t.contactTitle} <span className="dim">{t.contactDim}</span>
            </h2>
            <p>{t.contactBody}</p>
            <div className="hero-actions">
              <a className="button button-dark" href={socials.email}>
                {t.email} <ArrowRight size={16} />
              </a>
              <a className="button button-ghost" href={cvPath} {...external}>
                {t.download} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { gipuzkoa360 } from "@/data/hackathons";
import { stack } from "@/data/stack";
import { cvPath, socials } from "@/data/socials";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Motion } from "./Motion";

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

function Rows({
  items,
}: {
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

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = projects.filter((p) => p.kind === "company");
  const more = projects.filter((p) => p.kind !== "company");
  return (
    <>
      <Navigation locale={locale} />
      <Motion />
      <main>
        <section className="hero container" id="top">
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
            <Link href={`/${locale}/#contact`} className="button button-ghost">
              {t.contactCta}
            </Link>
          </div>
          <dl className="metrics intro" style={order(7)} data-reveal>
            {t.metrics.map(([value, label]) => (
              <div key={label}>
                <dt data-count={value}>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section container" id="work">
          <SectionHead eyebrow={t.workEyebrow} title={t.workTitle} />
          <div className="featured">
            {featured.map((project, index) => (
              <article
                className="panel card"
                key={project.slug}
                data-reveal
                style={order(index)}
              >
                <span className="label label-company">
                  {project.label[locale]}
                </span>
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
            items={more.map((project) => ({
              key: project.slug,
              name: project.name,
              meta: project.category[locale],
              end: project.year,
              href: project.url ?? project.repository,
            }))}
          />
        </section>

        <section className="section container" id="hackathons">
          <SectionHead
            eyebrow={t.hackathonsEyebrow}
            title={t.hackathonsTitle}
          />
          <article className="panel card hackathon" data-reveal>
            <div className="card-top">
              <span className="label label-award">Top 3</span>
              <span className="card-event">{gipuzkoa360.event}</span>
            </div>
            <h3>{gipuzkoa360.name}</h3>
            <p>{gipuzkoa360.summary[locale]}</p>
            <p className="card-stack">{gipuzkoa360.team[locale]}</p>
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

        <section className="section container" id="experience">
          <SectionHead
            eyebrow={t.experienceEyebrow}
            title={t.experienceTitle}
          />
          <Rows
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
          <div data-reveal>
            <span className="eyebrow">{t.contactEyebrow}</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
            <div className="hero-actions">
              <a className="button button-light" href={socials.email}>
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

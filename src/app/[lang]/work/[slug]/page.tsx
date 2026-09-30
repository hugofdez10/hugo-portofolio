import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/data/projects";
import { copy, isLocale, locales, siteUrl } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.filter((p) => p.caseStudy).map((p) => ({ lang, slug: p.slug })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = projects.find((p) => p.slug === slug && p.caseStudy);
  if (!project) return {};
  return {
    metadataBase: new URL(siteUrl),
    title: `${project.name} — ${project.category[lang]}`,
    description: project.description[lang],
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, es: `/es/work/${slug}` },
    },
    openGraph: {
      title: `${project.name} — Hugo Fernández Díez`,
      description: project.description[lang],
    },
  };
}
export default async function CasePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = projects.find((p) => p.slug === slug && p.caseStudy);
  if (!project || !project.caseStudy) notFound();
  const t = copy[lang];
  const sections = [
    ["01", t.challenge, project.caseStudy.challenge[lang]],
    ["02", t.approach, project.caseStudy.approach[lang]],
    ["03", t.build, project.caseStudy.build[lang]],
    ["04", t.outcome, project.caseStudy.outcome[lang]],
    ["05", t.lessons, project.caseStudy.lessons[lang]],
  ];
  const next = projects.find((p) => p.caseStudy && p.slug !== slug)!;
  return (
    <>
      <Navigation locale={lang} path={`/work/${slug}`} />
      <main className="case-main">
        <section className="case-hero">
          <div className="container">
            <Link className="back-link" href={`/${lang}/#work`}>
              <ArrowLeft size={15} />
              {t.back}
            </Link>
            <span className="eyebrow">
              <span className="blue-dot" />
              CASE STUDY / {project.year}
            </span>
            <h1>{project.name}</h1>
            <p>{project.description[lang]}</p>
            <div className="case-meta">
              <span>{project.category[lang]}</span>
              <span>{project.context[lang]}</span>
              <span>{project.status[lang]}</span>
            </div>
          </div>
        </section>
        <div className="case-visual">
          <ProjectVisual
            variant={slug === "housing-management" ? "housing" : "shuttle"}
            title={project.name}
            screenshot={
              project.screenshot && {
                src: project.screenshot.src,
                alt: project.screenshot.alt[lang],
                label: project.screenshot.label[lang],
              }
            }
          />
        </div>
        <section className="case-body">
          <div className="container case-body-grid">
            <aside className="case-side">
              <span className="eyebrow">/ {t.tech.toUpperCase()}</span>
              <div className="tags">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
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
            </aside>
            <div className="case-sections">
              {sections.map(([number, heading, body]) => (
                <section className="case-section" key={number}>
                  <span>
                    {number} / {heading.toUpperCase()}
                  </span>
                  <div>
                    <h2>{heading}</h2>
                    <p>{body}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
        <section className="case-next">
          <div className="container">
            <Link href={`/${lang}/work/${next.slug}`}>
              <span>{next.name}</span>
              <ArrowRight size={30} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

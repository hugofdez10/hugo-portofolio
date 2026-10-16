import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
      <main className="case">
        <div className="container">
          <Link className="back-link" href={`/${lang}/#work`}>
            <ArrowLeft size={15} />
            {t.back}
          </Link>
          <header className="case-hero">
            <span className="eyebrow">
              {t.caseStudy} · {project.year}
            </span>
            <h1>{project.name}</h1>
            <p>{project.description[lang]}</p>
            <div className="case-meta">
              <span className="label label-company">{project.label[lang]}</span>
              <span>{project.category[lang]}</span>
              <span>{project.context[lang]}</span>
            </div>
          </header>
          {project.screenshot && (
            <div className="panel case-shot">
              <Image
                src={project.screenshot.src}
                alt={project.screenshot.alt[lang]}
                width={project.screenshot.width}
                height={project.screenshot.height}
                sizes="(max-width: 1100px) 92vw, 1040px"
                priority
              />
            </div>
          )}
          <div className="case-grid">
            <aside className="panel case-side">
              <span className="eyebrow">{t.tech}</span>
              <ul className="tags">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="project-links">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.urlLabel?.[lang] ?? t.visit}{" "}
                    <ArrowUpRight size={14} />
                  </a>
                )}
                <span className="muted-link">
                  <Lock size={13} aria-hidden="true" /> {t.privateRepo}
                </span>
              </div>
            </aside>
            <div className="case-sections">
              {sections.map(([number, heading, body]) => (
                <section className="case-section" key={number}>
                  <span className="case-number">{number}</span>
                  <div>
                    <h2>{heading}</h2>
                    <p>{body}</p>
                  </div>
                </section>
              ))}
            </div>
          </div>
          <Link className="panel case-next" href={`/${lang}/work/${next.slug}`}>
            <div>
              <span className="eyebrow">{t.nextCase}</span>
              <strong>{next.name}</strong>
            </div>
            <ArrowRight size={22} />
          </Link>
        </div>
      </main>
      <Footer locale={lang} />
    </>
  );
}

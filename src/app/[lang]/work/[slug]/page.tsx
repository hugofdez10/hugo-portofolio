import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseExperience } from "@/components/CaseExperience";
import { projects } from "@/data/projects";
import { isLocale, locales, siteUrl } from "@/lib/i18n";

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
  return <CaseExperience project={project} locale={lang} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/Portfolio";
import { copy, isLocale, locales, siteUrl } from "@/lib/i18n";
import { socials } from "@/data/socials";

type Props = { params: Promise<{ lang: string }> };
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    title:
      lang === "en"
        ? "Hugo Fernández Díez — Software Developer & Computer Engineering"
        : "Hugo Fernández Díez — Desarrollo de software e Ingeniería Informática",
    description:
      lang === "en"
        ? "Computer Engineering student at Universidad de Deusto building software, digital products and AI-powered tools for real-world needs."
        : "Estudiante de Ingeniería Informática en la Universidad de Deusto. Creo software, productos digitales y herramientas con IA para necesidades reales.",
    openGraph: {
      locale: lang === "en" ? "en_US" : "es_ES",
      url: `${siteUrl}/${lang}`,
    },
  };
}
export default async function LocalePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Hugo Fernández Díez",
      url: `${siteUrl}/${lang}`,
      email: "hugofdezdiez@gmail.com",
      sameAs: [socials.github, socials.linkedin],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universidad de Deusto",
      },
      knowsAbout: [
        "Software Development",
        "Computer Engineering",
        "Web Development",
        "AI-assisted development",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Hugo Fernández Díez",
      url: siteUrl,
      inLanguage: ["en", "es"],
      description: copy[lang].heroTitle,
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Portfolio locale={lang} />
    </>
  );
}

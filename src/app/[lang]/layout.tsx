import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, siteUrl } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hugo Fernández Díez — Software Developer & Computer Engineering",
    template: "%s | Hugo Fernández Díez",
  },
  description:
    "Computer Engineering student at Universidad de Deusto building software, digital products and AI-powered tools for real-world needs.",
  authors: [{ name: "Hugo Fernández Díez" }],
  creator: "Hugo Fernández Díez",
  openGraph: {
    type: "website",
    siteName: "Hugo Fernández Díez",
    title: "Hugo Fernández Díez — Software · Product · AI",
    description: "Software built for real problems.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Fernández Díez — Software · Product · AI",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}

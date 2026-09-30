"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/i18n";

export default function LocaleNotFound() {
  const locale = usePathname().startsWith("/es") ? "es" : "en";
  const t = copy[locale];
  return (
    <main className="not-found">
      <div className="container">
        <span className="eyebrow">404 / NOT FOUND</span>
        <h1>{t.notFound}</h1>
        <p>{t.notFoundBody}</p>
        <Link className="button button-primary" href={`/${locale}`}>
          {t.home} →
        </Link>
      </div>
    </main>
  );
}

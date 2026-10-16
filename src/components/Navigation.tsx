"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { cvPath } from "@/data/socials";

export function Navigation({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[locale];
  function rememberLanguagePosition(target: Locale) {
    sessionStorage.setItem(
      "portfolio-language-scroll",
      JSON.stringify({
        pathname: `/${target}${path}`,
        y: window.scrollY,
      }),
    );
  }
  useEffect(() => {
    document.documentElement.lang = locale;
    const saved = sessionStorage.getItem("portfolio-language-scroll");
    if (saved) {
      sessionStorage.removeItem("portfolio-language-scroll");
      try {
        const position = JSON.parse(saved);
        if (
          position.pathname === window.location.pathname &&
          Number.isFinite(position.y)
        ) {
          window.scrollTo({ top: position.y, behavior: "instant" });
        }
      } catch {
        /* Ignore an invalid saved position. */
      }
    }
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);
  const links = [
    ["work", t.nav.work],
    ["hackathons", t.nav.hackathons],
    ["experience", t.nav.experience],
    ["contact", t.nav.contact],
  ];
  const languageLink = (target: Locale) => (
    <Link
      className={locale === target ? "active" : ""}
      href={`/${target}${path}`}
      scroll={false}
      onClick={(event) => {
        if (locale === target) event.preventDefault();
        else rememberLanguagePosition(target);
        setOpen(false);
      }}
      lang={target}
      aria-current={locale === target ? "page" : undefined}
    >
      {target.toUpperCase()}
    </Link>
  );
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link
          className="brand"
          href={`/${locale}`}
          aria-label="Hugo Fernández Díez — home"
        >
          <span className="brand-mark">HF</span>
        </Link>
        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(([id, label]) => (
            <Link
              key={id}
              href={`/${locale}/#${id}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language">
            {languageLink("en")}
            {languageLink("es")}
          </div>
          <a
            className="button button-ghost nav-cv"
            href={cvPath}
            download="CV_Hugo_Fernandez_Diez.pdf"
          >
            <Download size={14} aria-hidden="true" /> {t.download}
          </a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

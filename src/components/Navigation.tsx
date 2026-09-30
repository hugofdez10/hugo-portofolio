"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { socials } from "@/data/socials";

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);
  const links = [
    ["work", t.nav.work],
    ["experience", t.nav.experience],
    ["about", t.nav.about],
    ["stack", t.nav.stack],
    ["contact", t.nav.contact],
  ];
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link
          className="brand"
          href={`/${locale}`}
          aria-label="Hugo Fernández Díez — home"
        >
          HF<span>.</span>
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
          <div className="mobile-nav-extra">
            <a href={socials.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language">
            <Link
              className={locale === "en" ? "active" : ""}
              href={`/en${path}`}
              scroll={false}
              onClick={(event) => {
                if (locale === "en") event.preventDefault();
                else rememberLanguagePosition("en");
                setOpen(false);
              }}
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              className={locale === "es" ? "active" : ""}
              href={`/es${path}`}
              scroll={false}
              onClick={(event) => {
                if (locale === "es") event.preventDefault();
                else rememberLanguagePosition("es");
                setOpen(false);
              }}
              lang="es"
              aria-current={locale === "es" ? "page" : undefined}
            >
              ES
            </Link>
          </div>
          <a
            className="nav-github"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

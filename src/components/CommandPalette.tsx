"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Command, Search, X } from "lucide-react";
import { projects } from "@/data/projects";
import { socials, cvPath } from "@/data/socials";
import type { Locale } from "@/lib/i18n";

type Item = { id: string; title: string; subtitle: string; keywords: string; href: string; external?: boolean };

export function CommandPalette({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const es = locale === "es";
  const base = `/${locale}/`;

  const items: Item[] = [
    { id: "work", title: es ? "Explorar proyectos" : "Explore projects", subtitle: "01 / WORK", keywords: "work proyectos projects", href: `${base}#work` },
    { id: "hackathons", title: "Gipuzkoa AI / Top 3", subtitle: "02 / HACKATHONS", keywords: "ai hackathon gipuzkoa 360 awards", href: `${base}#hackathons` },
    { id: "lab", title: es ? "Laboratorio y experimentos" : "Lab and experiments", subtitle: "05 / THE LAB", keywords: "lab experimentos prototipos proyectos personales", href: `${base}#lab` },
    { id: "experience", title: es ? "Experiencia y tecnologías" : "Experience and skills", subtitle: "03 / ABOUT", keywords: "experience stack skills estudios education tecnologías", href: `${base}#experience` },
    { id: "contact", title: es ? "Contactar con Hugo" : "Contact Hugo", subtitle: "04 / CONTACT", keywords: "contact mail contacto email", href: `${base}#contact` },
    ...projects.filter((project) => project.caseStudy).map((project) => ({
      id: project.slug,
      title: project.name,
      subtitle: "CASE STUDY / 2026",
      keywords: `${project.name} ${project.stack.join(" ")} project proyecto`,
      href: `/${locale}/work/${project.slug}`,
    })),
    { id: "cv", title: es ? "Descargar currículum" : "Download résumé", subtitle: "DOCUMENT / PDF", keywords: "cv curriculum resume pdf descargar download", href: cvPath, external: true },
    { id: "github", title: "GitHub", subtitle: "SOCIAL / CODE", keywords: "github code repos repository", href: socials.github, external: true },
    { id: "linkedin", title: "LinkedIn", subtitle: "SOCIAL / NETWORK", keywords: "linkedin connect profile", href: socials.linkedin, external: true },
  ];
  const filtered = items.filter((item) => {
    const needle = query.trim().toLocaleLowerCase();
    return !needle || `${item.title} ${item.subtitle} ${item.keywords}`.toLocaleLowerCase().includes(needle);
  });
  const active = Math.min(selected, Math.max(0, filtered.length - 1));

  function close() {
    setOpen(false);
    setQuery("");
    setSelected(0);
    trigger.current?.focus();
  }
  function launch(item: Item) {
    close();
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else router.push(item.href);
  }
  useEffect(() => {
    const show = () => {
      trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
      setQuery("");
      setSelected(0);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else show();
      } else if (event.key === "Escape" && open) {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("hf:command", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hf:command", show);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled), a[href]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", trap);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title" ref={dialog}>
        <div className="command-heading">
          <span id="command-title"><Command size={15} /> HF / {es ? "CENTRO DE CONTROL" : "CONTROL CENTER"}</span>
          <button onClick={close} className="command-close" aria-label={es ? "Cerrar" : "Close"}><X size={18}/></button>
        </div>
        <div className="command-search">
          <Search size={20} aria-hidden="true"/>
          <input
            ref={input}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setSelected(0); }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") { event.preventDefault(); setSelected((active + 1) % Math.max(1, filtered.length)); }
              if (event.key === "ArrowUp") { event.preventDefault(); setSelected((active - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length)); }
              if (event.key === "Enter" && filtered[active]) { event.preventDefault(); launch(filtered[active]); }
            }}
            placeholder={es ? "Buscar proyectos, habilidades, enlaces..." : "Search projects, skills, links..."}
            aria-label={es ? "Buscar comandos" : "Search commands"}
            autoComplete="off"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="command-results" role="listbox" aria-label={es ? "Resultados" : "Results"}>
          {filtered.length ? filtered.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={active === index}
              className={active === index ? "command-result is-selected" : "command-result"}
              onMouseEnter={() => setSelected(index)}
              onClick={() => launch(item)}
            >
              <span className="command-result-text">
                <span className="command-result-title">{item.title}</span>
                <span className="command-result-meta">{item.subtitle}</span>
              </span>
              {item.external ? <ArrowUpRight size={18}/> : <ArrowRight size={18}/>}
            </button>
          )) : (
            <p className="command-empty">{es ? "No hay resultados para esa búsqueda." : "No results for that search."}</p>
          )}
        </div>
        <div className="command-foot">
          <span>↑↓ {es ? "NAVEGAR" : "NAVIGATE"}</span>
          <span>↵ {es ? "ABRIR" : "OPEN"}</span>
          <span>ESC {es ? "CERRAR" : "CLOSE"}</span>
        </div>
      </section>
    </div>
  );
}

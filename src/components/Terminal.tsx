"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { socials } from "@/data/socials";

type Entry = { command: string; response: string };
export function Terminal({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = copy[locale];
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function run(raw: string) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    const messages: Record<string, string> = {
      help: "help · whoami · about · projects · stack · github · contact · clear",
      whoami:
        "Hugo Fernández Díez\nComputer Engineering @ Deusto\nSoftware / Product / AI\nCurrently building…",
      about:
        locale === "en"
          ? "I turn real problems into useful software."
          : "Convierto problemas reales en software útil.",
      projects:
        locale === "en" ? "Opening selected work…" : "Abriendo proyectos…",
      stack:
        "Next.js · TypeScript · React · PostgreSQL · Supabase · Java · C/C++",
      github: "github.com/hugofdez10",
      contact: "hugofdezdiez@gmail.com",
    };
    setHistory((value) => [
      ...value,
      {
        command,
        response:
          messages[command] ||
          (locale === "en"
            ? "Unknown command. Type help."
            : "Comando desconocido. Escribe help."),
      },
    ]);
    setInput("");
    if (command === "projects" || command === "stack") {
      setOpen(false);
      document
        .getElementById(command === "projects" ? "work" : "stack")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    if (command === "github")
      window.open(socials.github, "_blank", "noopener,noreferrer");
    if (command === "contact") {
      setOpen(false);
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <>
      <button
        className="terminal-trigger"
        onClick={() => setOpen(true)}
        type="button"
        aria-haspopup="dialog"
      >
        <span>&gt;_</span> {t.terminal}
      </button>
      {open && (
        <div
          className="terminal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            className="terminal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio terminal"
          >
            <div className="terminal-top">
              <span className="terminal-dots">
                <i />
                <i />
                <i />
              </span>
              <span>hugo@portfolio ~</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
              >
                <X size={18} />
              </button>
            </div>
            <div
              className="terminal-body"
              onClick={() => inputRef.current?.focus()}
            >
              <p className="terminal-welcome">
                HUGO OS — v1.0
                <br />
                {t.terminalHint}
              </p>
              {history.map((entry, i) => (
                <div className="terminal-entry" key={i}>
                  <span className="terminal-prompt">~ $</span> {entry.command}
                  <pre>{entry.response}</pre>
                </div>
              ))}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  run(input);
                }}
              >
                <label htmlFor="terminal-input">~ $</label>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                />
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

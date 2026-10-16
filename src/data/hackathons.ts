import type { Locale } from "@/lib/i18n";

/** Gipuzkoa AI Hackathon 2026 — the team's Urban Challenge project. */
export const gipuzkoa360: {
  name: string;
  event: string;
  summary: Record<Locale, string>;
  team: Record<Locale, string>;
  demo: string;
  repository: string;
} = {
  name: "Gipuzkoa 360",
  event: "Gipuzkoa AI Hackathon 2026 · Urban Challenge",
  summary: {
    en: "An AI agent that analyses access to healthcare across Gipuzkoa’s 88 municipalities using official open data.",
    es: "Un agente de IA que analiza el acceso sanitario en los 88 municipios de Gipuzkoa con datos abiertos oficiales.",
  },
  team: {
    en: "With Asier Comba and Oier Duñabeitia",
    es: "Con Asier Comba y Oier Duñabeitia",
  },
  demo: "https://asier-comba.github.io/Guipuzkoa360/demo.html",
  repository: "https://github.com/Asier-Comba/Guipuzkoa360",
};

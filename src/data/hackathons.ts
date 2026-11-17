import type { Locale } from "@/lib/i18n";

/**
 * Gipuzkoa AI Hackathon 2026 — the team's Urban Challenge project.
 * "Top 3" is the shortlist that qualified the team for the in-person final;
 * it is not a placing in the final itself.
 */
export const gipuzkoa360: {
  name: string;
  event: string;
  badge: Record<Locale, string>;
  recognition: Record<Locale, string>;
  summary: Record<Locale, string>;
  teamName: string;
  teamMembers: Record<Locale, string>;
  contribution: Record<Locale, string>;
  final: {
    image: string;
    alt: Record<Locale, string>;
    label: Record<Locale, string>;
    caption: Record<Locale, string>;
    audience: Record<Locale, string[]>;
    insight: { value: string; text: Record<Locale, string> };
  };
  demo: string;
  repository: string;
} = {
  name: "GIPUZKOA 360",
  event: "Gipuzkoa AI Hackathon 2026 · Urban Challenge",
  badge: {
    en: "Top 3 · Selected for the final",
    es: "Top 3 · Seleccionados para la final",
  },
  recognition: {
    en: "With QuemandoTokens, our project GIPUZKOA 360 was selected among the top three of more than 60 teams at the Gipuzkoa AI Hackathon 2026, qualifying us for the in-person final.",
    es: "Con QuemandoTokens, nuestro proyecto GIPUZKOA 360 fue seleccionado entre los tres mejores de más de 60 equipos del Gipuzkoa AI Hackathon 2026, clasificándonos para la final presencial.",
  },
  summary: {
    en: "An AI agent that analyses access to healthcare across Gipuzkoa’s 88 municipalities using official open data.",
    es: "Un agente de IA que analiza el acceso sanitario en los 88 municipios de Gipuzkoa con datos abiertos oficiales.",
  },
  teamName: "QuemandoTokens",
  teamMembers: {
    en: "With Asier Comba and Oier Duñabeitia",
    es: "Con Asier Comba y Oier Duñabeitia",
  },
  contribution: {
    en: "QA, testing and integration.",
    es: "QA, pruebas e integración.",
  },
  final: {
    image: "/images/gipuzkoa360/final-presentacion.webp",
    alt: {
      en: "The QuemandoTokens team on stage presenting GIPUZKOA 360 in front of a seated audience, with the slide “The minutes in between” on the screen",
      es: "El equipo QuemandoTokens en el escenario presentando GIPUZKOA 360 ante el público, con la diapositiva «The minutes in between» en pantalla",
    },
    label: { en: "The final", es: "La final" },
    caption: {
      en: "We presented GIPUZKOA 360 on stage to around a hundred people.",
      es: "Presentamos GIPUZKOA 360 en el escenario ante un centenar de personas.",
    },
    audience: {
      en: ["MIT Media Lab researchers", "Companies", "Government"],
      es: ["Investigadores del MIT Media Lab", "Empresas", "Gobierno"],
    },
    insight: {
      value: "−35 min",
      text: {
        en: "Moving a medical appointment by 15 minutes can cut the full round trip by 35 minutes — the example we showed on stage (an illustrative scenario, not a measured saving).",
        es: "Mover una cita médica 15 minutos puede acortar el trayecto completo en 35 minutos: el ejemplo que mostramos en el escenario (escenario ilustrativo, no un ahorro medido).",
      },
    },
  },
  demo: "https://asier-comba.github.io/Guipuzkoa360/demo.html",
  repository: "https://github.com/Asier-Comba/Guipuzkoa360",
};

/**
 * NASA International Space Apps Challenge 2026 (Bilbao) — SITE REGRET.
 * No placing is claimed; the entry is shown for the work itself.
 * `video` stays undefined until the 30-second presentation is added:
 * either a file in /public/videos or a YouTube id.
 */
export const siteRegret: {
  name: string;
  event: string;
  badge: Record<Locale, string>;
  question: Record<Locale, string>;
  summary: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  teamName: string;
  teamMembers: Record<Locale, string>;
  contribution: Record<Locale, string>;
  stack: string[];
  image: string;
  imageAlt: Record<Locale, string>;
  video?: { src?: string; youtubeId?: string };
  demo: string;
  story: string;
  repository: string;
} = {
  name: "SITE REGRET",
  event: "NASA Space Apps Challenge 2026 · Bilbao",
  badge: {
    en: "NASA Space Apps · Lunar Landing Site Navigator",
    es: "NASA Space Apps · Lunar Landing Site Navigator",
  },
  question: {
    en: "How far can we trust that one lunar landing site beats another when the terrain used to compute it is uncertain?",
    es: "¿Hasta qué punto podemos confiar en que un lugar de alunizaje es mejor que otro si el relieve con el que se calculó tiene incertidumbre?",
  },
  summary: {
    en: "A web app that compares two candidate sites at the lunar south pole (Connecting Ridge ROI 4 and ROI 6) across 120 precomputed scenarios with NASA LOLA terrain and JPL SPICE ephemerides, and shows when the choice holds, ties or flips — and how much a wrong choice would cost (the regret).",
    es: "Una web que compara dos emplazamientos candidatos del polo sur lunar (Connecting Ridge ROI 4 y ROI 6) en 120 escenarios precalculados con relieve LOLA de la NASA y efemérides JPL SPICE, y muestra cuándo la elección se mantiene, empata o se invierte, y cuánto costaría equivocarse (el regret).",
  },
  highlights: {
    en: [
      "8 views: dashboard, terrain explorer, Sun/Earth timeline, A/B comparator, regret lab, evidence and a 7-scene story mode",
      "Every figure is read from a verified data package (SHA-256), never recomputed in the browser",
      "63 unit tests, 47 browser tests and a WCAG A/AA accessibility audit; Spanish and English",
    ],
    es: [
      "8 vistas: panel, explorador del relieve, línea temporal Sol/Tierra, comparador A/B, laboratorio de regret, evidencia y modo historia en 7 escenas",
      "Cada cifra sale de un paquete de datos verificado (SHA-256); el navegador no recalcula nada",
      "63 tests unitarios, 47 tests de navegador y auditoría de accesibilidad WCAG A/AA; en español e inglés",
    ],
  },
  teamName: "QuemandoTokens",
  teamMembers: {
    en: "With Asier Comba, Oier Duñabeitia and Aritz González",
    es: "Con Asier Comba, Oier Duñabeitia y Aritz González",
  },
  contribution: {
    en: "Web app development: interface, data contract, visualisations, testing and deployment.",
    es: "Desarrollo de la aplicación web: interfaz, contrato de datos, visualizaciones, pruebas y despliegue.",
  },
  stack: ["Next.js", "TypeScript", "Vitest", "Playwright", "NASA LOLA", "JPL SPICE"],
  image: "/images/site-regret/connecting-ridge-ab.webp",
  imageAlt: {
    en: "Orbital image of Connecting Ridge near the lunar south pole with candidate sites A and B marked",
    es: "Imagen orbital de Connecting Ridge, cerca del polo sur lunar, con los sitios candidatos A y B marcados",
  },
  video: { youtubeId: "pEx1xSSeDHc" },
  demo: "https://site-regret.vercel.app",
  story: "https://site-regret.vercel.app/historia/",
  repository: "https://github.com/QuemandoTokenss/NASA-2026",
};

import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;
export type Project = {
  slug: string;
  name: string;
  year: string;
  category: Localized;
  context: Localized;
  description: Localized;
  highlights: Record<Locale, string[]>;
  stack: string[];
  status: Localized;
  url?: string;
  repository: string;
  screenshot?: { src: string; alt: Localized; label: Localized };
  tier: "featured" | "main" | "secondary" | "lab";
  caseStudy?: {
    challenge: Localized;
    approach: Localized;
    build: Localized;
    outcome: Localized;
    lessons: Localized;
  };
};

// Public project repositories verified against github.com/hugofdez10.
export const projects: Project[] = [
  {
    slug: "hugos-productivity",
    name: "Hugo's Productivity",
    year: "2026",
    tier: "main",
    category: {
      en: "Personal productivity PWA",
      es: "PWA de productividad personal",
    },
    context: { en: "Independent project", es: "Proyecto propio" },
    description: {
      en: "An installable app for tasks, routines, calendars and reminders, with local storage, Supabase sync and background push notifications.",
      es: "Una app instalable para organizar tareas, rutinas, calendario y recordatorios, con almacenamiento local, sincronización con Supabase y notificaciones push en segundo plano.",
    },
    highlights: {
      en: ["Installable PWA", "Cloud sync", "Push reminders"],
      es: ["PWA instalable", "Sincronización en la nube", "Recordatorios push"],
    },
    stack: ["JavaScript", "HTML", "CSS", "PWA", "Supabase", "PostgreSQL"],
    status: { en: "PERSONAL APP", es: "APP PERSONAL" },
    url: "https://hugos-productivity.vercel.app",
    repository: "https://github.com/hugofdez10/HugosProductivity",
  },
  {
    slug: "samoset-barbershop",
    name: "Samoset Barbershop",
    year: "2026",
    tier: "main",
    category: { en: "Barbershop website", es: "Web de barbería" },
    context: { en: "Business website", es: "Web para negocio" },
    description: {
      en: "A responsive landing page presenting services, pricing and work through optimized videos, with booking links to WhatsApp.",
      es: "Una landing adaptable para presentar servicios, precios y trabajos mediante vídeos optimizados, con reservas directamente por WhatsApp.",
    },
    highlights: {
      en: ["Responsive design", "Optimized videos", "WhatsApp booking"],
      es: ["Diseño adaptable", "Vídeos optimizados", "Reservas por WhatsApp"],
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: { en: "BUSINESS WEBSITE", es: "WEB DE NEGOCIO" },
    repository: "https://github.com/hugofdez10/samoset-barbershop",
  },
  {
    slug: "deustoair",
    name: "DeustoAir",
    year: "2026",
    tier: "main",
    category: {
      en: "Air quality · client–server",
      es: "Calidad del aire · cliente-servidor",
    },
    context: {
      en: "Universidad de Deusto · academic fork",
      es: "Universidad de Deusto · fork académico",
    },
    description: {
      en: "A Programming IV project in development for managing and querying air-quality data. Its planned architecture combines C administration and server modules, a C++ client and SQLite.",
      es: "Proyecto de Programación IV en desarrollo para gestionar y consultar datos de calidad del aire. Su arquitectura prevista combina administración y servidor en C, cliente en C++ y SQLite.",
    },
    highlights: {
      en: ["Academic collaboration", "Client–server architecture"],
      es: ["Colaboración académica", "Arquitectura cliente-servidor"],
    },
    stack: ["C", "C++", "SQLite", "TCP/IP"],
    status: { en: "IN DEVELOPMENT", es: "EN DESARROLLO" },
    repository: "https://github.com/hugofdez10/DeustoAir",
  },
  {
    slug: "deustochess",
    name: "DeustoChess",
    year: "2025",
    tier: "main",
    category: { en: "Chess · Java", es: "Ajedrez · Java" },
    context: { en: "University project", es: "Proyecto universitario" },
    description: {
      en: "A Java chess project with its source code available on GitHub, developed in an Eclipse project structure.",
      es: "Un proyecto de ajedrez en Java con el código fuente disponible en GitHub y una estructura de proyecto para Eclipse.",
    },
    highlights: { en: ["Java source code"], es: ["Código fuente en Java"] },
    stack: ["Java", "Eclipse"],
    status: { en: "UNIVERSITY", es: "UNIVERSIDAD" },
    repository: "https://github.com/hugofdez10/DeustoChess",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.tier === "featured",
);
export const mainProjects = projects.filter(
  (project) => project.tier === "main",
);
export const secondaryProjects = projects.filter(
  (project) => project.tier === "secondary",
);
export const labProjects = projects.filter((project) => project.tier === "lab");

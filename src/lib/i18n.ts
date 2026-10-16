export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const alternate = (locale: Locale): Locale =>
  locale === "en" ? "es" : "en";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const copy = {
  en: {
    nav: {
      work: "Projects",
      hackathons: "Hackathon",
      experience: "Experience",
      contact: "Contact",
      menu: "Open menu",
      close: "Close menu",
    },
    availability: "Available for internships",
    role: "Computer Engineering · Full-stack web development",
    heroBody:
      "Third-year student at Deusto. In summer 2026 I built and delivered two internal apps for Enchanted Parks (USA), now used by about 200 workers.",
    explore: "See projects",
    contactCta: "Contact",
    download: "CV",
    metrics: [
      ["2", "apps in production"],
      ["~200", "real users"],
      ["Top 3", "Gipuzkoa AI Hackathon"],
    ],
    workEyebrow: "Projects",
    workTitle: "Selected work.",
    more: "More projects",
    caseStudy: "Case study",
    code: "Code",
    visit: "Web",
    hackathonsEyebrow: "Hackathon",
    hackathonsTitle: "Top 3 out of 60+ teams.",
    upcoming:
      "Also registered for NASA Space Apps and the HPE CDS Tech Challenge.",
    demo: "Demo",
    experienceEyebrow: "Experience",
    experienceTitle: "Where I’ve worked.",
    education: "Education",
    stackLabel: "Stack",
    contactEyebrow: "Contact",
    contactTitle: "Let’s build something useful.",
    contactBody:
      "Looking for a development internship. Bilbao, Santander or remote.",
    email: "Send an email",
    rights: "All rights reserved.",
    back: "Back to projects",
    challenge: "The challenge",
    approach: "The approach",
    build: "What I built",
    outcome: "Outcome",
    lessons: "What it taught me",
    tech: "Technology",
    privateRepo: "Private repository",
    nextCase: "Next case",
    notFound: "This page has not shipped.",
    notFoundBody: "The link may have changed. The work is still here.",
    home: "Back home",
  },
  es: {
    nav: {
      work: "Proyectos",
      hackathons: "Hackathon",
      experience: "Experiencia",
      contact: "Contacto",
      menu: "Abrir menú",
      close: "Cerrar menú",
    },
    availability: "Disponible para prácticas",
    role: "Ingeniería Informática · Desarrollo web full-stack",
    heroBody:
      "Estudiante de 3.º en Deusto. En verano de 2026 desarrollé y entregué dos apps internas para Enchanted Parks (EE. UU.) que usan unos 200 trabajadores.",
    explore: "Ver proyectos",
    contactCta: "Contacto",
    download: "CV",
    metrics: [
      ["2", "apps en producción"],
      ["~200", "usuarios reales"],
      ["Top 3", "Gipuzkoa AI Hackathon"],
    ],
    workEyebrow: "Proyectos",
    workTitle: "Trabajo seleccionado.",
    more: "Más proyectos",
    caseStudy: "Caso de estudio",
    code: "Código",
    visit: "Web",
    hackathonsEyebrow: "Hackathon",
    hackathonsTitle: "Top 3 de más de 60 equipos.",
    upcoming:
      "También inscrito en NASA Space Apps y en el HPE CDS Tech Challenge.",
    demo: "Demo",
    experienceEyebrow: "Experiencia",
    experienceTitle: "Dónde he trabajado.",
    education: "Formación",
    stackLabel: "Stack",
    contactEyebrow: "Contacto",
    contactTitle: "Construyamos algo útil.",
    contactBody:
      "Busco prácticas de desarrollo. Bilbao, Santander o en remoto.",
    email: "Enviar un email",
    rights: "Todos los derechos reservados.",
    back: "Volver a proyectos",
    challenge: "El problema",
    approach: "El enfoque",
    build: "Lo que construí",
    outcome: "Resultado",
    lessons: "Lo aprendido",
    tech: "Tecnologías",
    privateRepo: "Repositorio privado",
    nextCase: "Siguiente caso",
    notFound: "Esta página aún no existe.",
    notFoundBody:
      "Puede que el enlace haya cambiado. Los proyectos siguen aquí.",
    home: "Volver al inicio",
  },
} as const;

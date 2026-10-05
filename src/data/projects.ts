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
    slug: "housing-management",
    name: "Housing Management",
    year: "2026",
    tier: "featured",
    category: {
      en: "Housing operations platform",
      es: "Plataforma de gestión de alojamiento",
    },
    context: {
      en: "The Great Escape · New York, USA",
      es: "The Great Escape · Nueva York, EE. UU.",
    },
    description: {
      en: "An operational web app built during my work in the United States to bring housing, occupancy, arrivals and incidents into one place for the team.",
      es: "Una aplicación web operativa creada durante mi trabajo en Estados Unidos para reunir alojamiento, ocupación, llegadas e incidencias en un solo lugar para el equipo.",
    },
    highlights: {
      en: ["Real housing workflows", "Occupancy overview", "Incidents and arrivals"],
      es: ["Flujos reales de alojamiento", "Vista de ocupación", "Incidencias y llegadas"],
    },
    stack: ["Next.js", "React", "Operations"],
    status: { en: "DEPLOYED TOOL", es: "HERRAMIENTA DESPLEGADA" },
    url: "https://housing-management-system-jade.vercel.app/",
    repository: "https://github.com/hugofdez10/Housing-Management-System",
    screenshot: {
      src: "/images/housing-management-redacted.png",
      alt: {
        en: "Housing Management dashboard with private data redacted",
        es: "Panel de Housing Management con los datos privados ocultos",
      },
      label: {
        en: "HOUSING / REAL PRODUCT VIEW",
        es: "HOUSING / VISTA REAL DEL PRODUCTO",
      },
    },
    caseStudy: {
      challenge: {
        en: "Staff housing for a seasonal team means many residents, rooms, arrivals and incidents changing every week. The housing team needed one reliable place to see who lives where and what needs attention.",
        es: "El alojamiento de un equipo de temporada implica muchos residentes, habitaciones, llegadas e incidencias que cambian cada semana. El equipo de housing necesitaba un único lugar fiable para ver quién vive dónde y qué requiere atención.",
      },
      approach: {
        en: "I worked as a Resident Assistant at the same time, so I designed the app around the real daily workflow of the housing team: occupancy first, then residents, assignments and issues.",
        es: "Al trabajar a la vez como Resident Assistant, diseñé la app alrededor del flujo diario real del equipo de housing: primero la ocupación y después residentes, asignaciones e incidencias.",
      },
      build: {
        en: "Built with Next.js, TypeScript, Tailwind CSS and shadcn/ui on top of Supabase and PostgreSQL, deployed on Vercel and delivered in iterative releases with progress reports.",
        es: "Construida con Next.js, TypeScript, Tailwind CSS y shadcn/ui sobre Supabase y PostgreSQL, desplegada en Vercel y entregada en versiones iterativas con informes de progreso.",
      },
      outcome: {
        en: "A deployed internal tool that gives the housing team an occupancy overview and a clear record of arrivals and incidents in one place.",
        es: "Una herramienta interna desplegada que da al equipo de housing una vista de ocupación y un registro claro de llegadas e incidencias en un solo lugar.",
      },
      lessons: {
        en: "Building next to the people who use the tool makes priorities obvious. Short release cycles and real feedback mattered more than adding features.",
        es: "Construir junto a quienes usan la herramienta deja claras las prioridades. Los ciclos cortos de entrega y el feedback real importaron más que añadir funciones.",
      },
    },
  },
  {
    slug: "walmart-shuttle",
    name: "Walmart Shuttle",
    year: "2026",
    tier: "featured",
    category: {
      en: "Shuttle reservation tool",
      es: "Herramienta de reservas de lanzadera",
    },
    context: {
      en: "The Great Escape · New York, USA",
      es: "The Great Escape · Nueva York, EE. UU.",
    },
    description: {
      en: "A deployed booking tool for Walmart shuttle trips. When departures are scheduled, international staff can check pickup points and reserve a seat before the van leaves.",
      es: "Una herramienta de reservas desplegada para los viajes en lanzadera a Walmart. Cuando se programan salidas, el personal internacional puede consultar los puntos de recogida y reservar plaza antes de que salga la furgoneta.",
    },
    highlights: {
      en: ["Seasonal reservations", "Seats by group", "Pickup information"],
      es: ["Reservas por temporada", "Plazas por grupo", "Información de recogida"],
    },
    stack: ["Next.js", "React", "Booking systems"],
    status: { en: "DEPLOYED TOOL", es: "HERRAMIENTA DESPLEGADA" },
    url: "https://walmart-shuttle.vercel.app/",
    repository: "https://github.com/hugofdez10/walmart-shuttle",
    caseStudy: {
      challenge: {
        en: "Staff living in company housing depend on a van to get to Walmart. The housing supervisor needed a simple way to organise trips and seats instead of coordinating everything by message.",
        es: "El personal que vive en el alojamiento de la empresa depende de una furgoneta para ir a Walmart. El supervisor de housing necesitaba una forma sencilla de organizar viajes y plazas en lugar de coordinarlo todo por mensajes.",
      },
      approach: {
        en: "I kept the flow as short as possible: see the next departures, pick a seat, check where the pickup is. The supervisor controls the trips and capacity.",
        es: "Mantuve el flujo lo más corto posible: ver las próximas salidas, elegir plaza y consultar el punto de recogida. El supervisor controla los viajes y la capacidad.",
      },
      build: {
        en: "A Next.js and React web app deployed on Vercel, designed mobile-first so residents can book from their phones.",
        es: "Una aplicación web con Next.js y React desplegada en Vercel, pensada primero para móvil para que los residentes reserven desde el teléfono.",
      },
      outcome: {
        en: "A deployed booking tool that turns shuttle trips into scheduled departures with assigned seats and clear pickup information.",
        es: "Una herramienta de reservas desplegada que convierte los viajes en lanzadera en salidas programadas con plazas asignadas e información de recogida clara.",
      },
      lessons: {
        en: "Small tools that remove daily friction get adopted fastest. Clear information at the right moment matters more than complex features.",
        es: "Las herramientas pequeñas que eliminan fricción diaria son las que más rápido se adoptan. La información clara en el momento adecuado importa más que las funciones complejas.",
      },
    },
  },
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

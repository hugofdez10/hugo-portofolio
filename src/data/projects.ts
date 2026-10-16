import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;
export type Project = {
  slug: string;
  name: string;
  year: string;
  /** "company" = delivered to and used by a company; the rest are own or academic work. */
  kind: "company" | "independent" | "academic";
  category: Localized;
  context: Localized;
  description: Localized;
  stack: string[];
  label: Localized;
  url?: string;
  urlLabel?: Localized;
  /** Public repository. Omitted for private repositories. */
  repository?: string;
  screenshot?: { src: string; width: number; height: number; alt: Localized };
  caseStudy?: {
    challenge: Localized;
    approach: Localized;
    build: Localized;
    outcome: Localized;
    lessons: Localized;
  };
};

// Content mirrors the 2026 CV. Public repositories verified against github.com/hugofdez10.
export const projects: Project[] = [
  {
    slug: "housing-management",
    name: "Housing Management System",
    year: "2026",
    kind: "company",
    category: {
      en: "Staff housing platform",
      es: "Plataforma de gestión de alojamiento",
    },
    context: {
      en: "Enchanted Parks · Queensbury, NY",
      es: "Enchanted Parks · Queensbury, NY",
    },
    description: {
      en: "Housing for 200 residents and 75 cabins: assignments, incidents and occupancy reports.",
      es: "Gestión de 200 residentes y 75 cabañas: asignaciones, incidencias e informes de ocupación.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    label: { en: "Delivered to the company", es: "Entregado a la empresa" },
    url: "https://housing-management-system-jade.vercel.app/",
    urlLabel: { en: "Web (account required)", es: "Web (requiere cuenta)" },
    screenshot: {
      src: "/images/housing-management-redacted.png",
      width: 1746,
      height: 901,
      alt: {
        en: "Housing Management dashboard with private data redacted",
        es: "Panel de Housing Management con los datos privados ocultos",
      },
    },
    caseStudy: {
      challenge: {
        en: "Seasonal staff housing means 200 residents and 75 cabins with arrivals, moves and incidents changing every week. The Housing team was tracking it by hand and needed one reliable place to see who lives where and what needs attention.",
        es: "El alojamiento de personal de temporada supone 200 residentes y 75 cabañas con llegadas, mudanzas e incidencias que cambian cada semana. El equipo de Housing lo llevaba a mano y necesitaba un único lugar fiable para ver quién vive dónde y qué requiere atención.",
      },
      approach: {
        en: "I spotted the problem while working as a Resident Assistant and proposed solving it with our own software. Requirements came from weekly meetings with the people in charge, and I designed the data first: tables, relationships, roles and permissions.",
        es: "Detecté el problema mientras trabajaba como Resident Assistant y propuse resolverlo con software propio. Los requisitos salieron de reuniones semanales con los responsables y diseñé primero los datos: tablas, relaciones, roles y permisos.",
      },
      build: {
        en: "Built with AI-assisted development (Claude Code, Codex) on Next.js, TypeScript and Tailwind CSS over Supabase and PostgreSQL, deployed on Vercel. I directed the architecture, reviewed the output and tested each version by hand before release.",
        es: "Construida con desarrollo asistido por IA (Claude Code, Codex) sobre Next.js, TypeScript y Tailwind CSS con Supabase y PostgreSQL, desplegada en Vercel. Dirigí la arquitectura, revisé el resultado y probé cada versión a mano antes de publicarla.",
      },
      outcome: {
        en: "Delivered to the company together with Walmart Shuttle in about a month. Housing management now handles assignments, moves, incidents with photos and occupancy reports in a single tool.",
        es: "Entregada a la empresa junto a Walmart Shuttle en aproximadamente un mes. La dirección de Housing gestiona ahora asignaciones, mudanzas, incidencias con fotos e informes de ocupación en una sola herramienta.",
      },
      lessons: {
        en: "Building next to the people who use the tool makes priorities obvious. Short release cycles and real feedback mattered more than adding features.",
        es: "Construir junto a quienes usan la herramienta deja claras las prioridades. Los ciclos cortos de entrega y el feedback real importaron más que añadir funciones.",
      },
    },
  },
  {
    slug: "walmart-shuttle",
    name: "W&T Walmart Shuttle",
    year: "2026",
    kind: "company",
    category: {
      en: "Shuttle booking system",
      es: "Sistema de reservas de transporte",
    },
    context: {
      en: "Enchanted Parks · Queensbury, NY",
      es: "Enchanted Parks · Queensbury, NY",
    },
    description: {
      en: "Shuttle bookings used by about 200 workers, replacing WhatsApp.",
      es: "Reservas de transporte que usan unos 200 trabajadores, en lugar de WhatsApp.",
    },
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    label: { en: "Delivered to the company", es: "Entregado a la empresa" },
    url: "https://walmart-shuttle.vercel.app/",
    caseStudy: {
      challenge: {
        en: "Around 200 international workers depend on a weekly van to get to Walmart. Trips and seats were coordinated through WhatsApp, which meant overbooked vans, missed messages and a lot of manual work for the supervisor.",
        es: "Unos 200 trabajadores internacionales dependen de una furgoneta semanal para ir a Walmart. Los viajes y las plazas se coordinaban por WhatsApp, lo que suponía furgonetas llenas de más, mensajes perdidos y mucho trabajo manual para el supervisor.",
      },
      approach: {
        en: "I kept the flow as short as possible: see the next departures, pick a seat, check the pickup point. The supervisor controls shifts, capacity and passenger limits from an admin panel.",
        es: "Mantuve el flujo lo más corto posible: ver las próximas salidas, elegir plaza y consultar el punto de recogida. El supervisor controla turnos, capacidad y límite de pasajeros desde un panel de administración.",
      },
      build: {
        en: "A mobile-first Next.js and TypeScript app on Supabase, deployed on Vercel, built with AI-assisted development and tested manually before every release.",
        es: "Una app con Next.js y TypeScript sobre Supabase, pensada primero para móvil y desplegada en Vercel, construida con desarrollo asistido por IA y probada a mano antes de cada versión.",
      },
      outcome: {
        en: "It replaced WhatsApp coordination for about 200 workers. Its adoption turned into a paid developer role at the company.",
        es: "Sustituyó la coordinación por WhatsApp para unos 200 trabajadores. Su adopción dio lugar a un puesto remunerado de desarrollador en la empresa.",
      },
      lessons: {
        en: "Small tools that remove daily friction get adopted fastest. Clear information at the right moment matters more than complex features.",
        es: "Las herramientas pequeñas que eliminan fricción diaria son las que más rápido se adoptan. La información clara en el momento adecuado importa más que las funciones complejas.",
      },
    },
  },
  {
    slug: "gestidomus",
    name: "GestiDomus",
    year: "2026",
    kind: "independent",
    category: {
      en: "Property management SaaS",
      es: "SaaS de gestión inmobiliaria",
    },
    context: { en: "Independent project", es: "Proyecto propio" },
    description: {
      en: "Rental property management: properties, contracts, payments, incidents, PDF receipts, metrics and document storage.",
      es: "Administración de propiedades en alquiler: inmuebles, contratos, pagos, incidencias, recibos en PDF, métricas y almacenamiento documental.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
    ],
    label: { en: "SaaS", es: "SaaS" },
    url: "https://gestidomus-os.vercel.app/dashboard",
    urlLabel: { en: "Demo", es: "Demo" },
  },
  {
    slug: "samoset-barbershop",
    name: "Samoset Barbershop",
    year: "2026",
    kind: "independent",
    category: { en: "Local business website", es: "Web para negocio local" },
    context: { en: "Samoset, NY", es: "Samoset, NY" },
    description: {
      en: "Website for a barbershop: services and videos of their work, WhatsApp booking and an appointment admin panel.",
      es: "Web de una barbería: servicios y vídeos de trabajos, reservas por WhatsApp y panel de administración de citas.",
    },
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Vercel"],
    label: { en: "Web", es: "Web" },
    url: "https://samosetbarbershop.vercel.app/",
    repository: "https://github.com/hugofdez10/samoset-barbershop",
  },
  {
    slug: "hugos-productivity",
    name: "HugosProductivity",
    year: "2026",
    kind: "independent",
    category: { en: "Personal PWA", es: "PWA personal" },
    context: { en: "Independent project", es: "Proyecto propio" },
    description: {
      en: "Tasks, routines, calendar and reminders with Supabase sync and push notifications through a Service Worker.",
      es: "Tareas, rutinas, calendario y recordatorios con sincronización en Supabase y notificaciones push mediante Service Worker.",
    },
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Supabase",
      "Service Worker",
      "Vercel",
    ],
    label: { en: "PWA", es: "PWA" },
    repository: "https://github.com/hugofdez10/HugosProductivity",
  },
  {
    slug: "deustoair",
    name: "DeustoAir",
    year: "2026",
    kind: "academic",
    category: { en: "Team project", es: "Proyecto en equipo" },
    context: { en: "Universidad de Deusto", es: "Universidad de Deusto" },
    description: {
      en: "Air-quality data management and querying with a client–server architecture: users, measurements and a modular structure.",
      es: "Gestión y consulta de datos de calidad del aire con arquitectura cliente-servidor: usuarios, mediciones y organización modular.",
    },
    stack: ["C", "C++", "SQLite"],
    label: { en: "Academic", es: "Académico" },
    repository: "https://github.com/hugofdez10/DeustoAir",
  },
  {
    slug: "deustochess",
    name: "DeustoChess",
    year: "2025",
    kind: "academic",
    category: {
      en: "Object-oriented programming",
      es: "Programación orientada a objetos",
    },
    context: { en: "Universidad de Deusto", es: "Universidad de Deusto" },
    description: {
      en: "Chess in Java focused on OOP: modelling pieces and board, and the movement logic.",
      es: "Ajedrez en Java centrado en POO: modelado de piezas y tablero y lógica de movimientos.",
    },
    stack: ["Java"],
    label: { en: "Academic", es: "Académico" },
    repository: "https://github.com/hugofdez10/DeustoChess",
  },
];

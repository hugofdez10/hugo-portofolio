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
      work: "Work",
      experience: "Experience",
      about: "About",
      stack: "Stack",
      hackathons: "Hackathons",
      contact: "Contact",
      menu: "Open menu",
    },
    availability: "Open to internships & software opportunities",
    heroKicker: "SOFTWARE DEVELOPER / PRODUCT BUILDER",
    heroTitle: "I build software for problems that matter.",
    heroBody:
      "I’m Hugo, a Computer Engineering student at Universidad de Deusto. I turn real needs into useful products, from internal tools in New York to experiments built closer to home.",
    explore: "Explore my work",
    talk: "Let’s talk",
    download: "Download CV",
    scroll: "SCROLL TO EXPLORE",
    metrics: [
      ["03 / 04", "Computer Engineering year"],
      ["USA", "Work & Travel experience"],
      ["02", "Operational tools built in New York"],
      ["2026", "Building what comes next"],
    ],
    workEyebrow: "01 / SELECTED WORK",
    workTitle: "Built for use.",
    workIntro:
      "Projects shaped by actual workflows, personal needs and the curiosity to ship something useful.",
    featured: "FEATURED CASE STUDY",
    viewCase: "Read case study",
    visit: "Visit project",
    moreWork: "More things I’ve built",
    moreWorkBody:
      "Products, learning projects and experiments. Each one taught me something different.",
    processEyebrow: "02 / HOW I WORK",
    processTitle: "From problem to product.",
    processIntro:
      "The interesting part starts before the first line of code and continues after launch.",
    process: [
      [
        "Spot the problem",
        "Listen for what is slow, repetitive or frustrating.",
      ],
      [
        "Shape the solution",
        "Find the smallest useful version and map the workflow.",
      ],
      ["Build & ship", "Use software, data and AI where they add value."],
      ["Learn & iterate", "Put it in people’s hands, observe and improve."],
    ],
    experienceEyebrow: "03 / EXPERIENCE",
    experienceTitle: "Beyond the classroom.",
    experienceIntro:
      "Software work grew out of being close to the people and processes it could help.",
    stackEyebrow: "04 / TOOLKIT",
    stackTitle: "Tools I use to build.",
    stackIntro:
      "A working toolkit across application development, data and deployment. No percentage bars.",
    aiEyebrow: "05 / WORKFLOW",
    aiTitle: "Building with AI.",
    aiBody:
      "I use AI to explore ideas, reason about architecture, move through implementation and debug faster. Engineering fundamentals still make the decisions.",
    aiNote: "A development multiplier, grounded in understanding the software.",
    aiSteps: ["Explore", "Design", "Build", "Test", "Deploy", "Iterate"],
    aboutEyebrow: "06 / ABOUT",
    aboutTitle: "Curious about the whole product.",
    aboutP1:
      "I’m Hugo Fernández Díez, a Computer Engineering student at Universidad de Deusto. I like writing software, but I care just as much about finding the right problem and getting a useful solution into people’s hands.",
    aboutP2:
      "That has taken me from Java, C and C++ university projects to web applications for real operations while working in the United States. I’m especially interested in software engineering, automation and digital products.",
    aboutSmall:
      "Outside the editor: football, the gym, travel, and usually another side project.",
    international: "Across borders",
    internationalBody:
      "I studied at Spectrum Community School in Canada and spent three months working in Queensbury, New York. English: Cambridge B2, put to use in international teams and everyday life.",
    education: "Education",
    educationBody: "BSc Computer Engineering · Universidad de Deusto",
    educationMeta: "Bilbao · 2024–2028 expected · 3rd year",
    hackathonsEyebrow: "07 / TEAM & HACKATHONS",
    hackathonsBody:
      "My hackathon team. We build together, experiment with AI and turn challenges into working projects.",
    hackathonsList: "Competitions we’re registered for",
    hackathonsStatus: "Registered",
    hackathonsLink: "Explore event",
    labEyebrow: "08 / LAB",
    labTitle: "Always building.",
    labIntro: "Smaller tools, experiments and ideas along the way.",
    contactEyebrow: "09 / CONTACT",
    contactTitle: "Let’s build something useful.",
    contactBody:
      "Open to internships, software roles, collaborations and interesting problems.",
    email: "Email me",
    footerLine: "Built with curiosity, code & too many ideas.",
    terminal: "terminal",
    terminalHint: "Type help to see commands.",
    back: "Back to work",
    challenge: "The challenge",
    approach: "The approach",
    build: "What I built",
    outcome: "In practice",
    lessons: "What it taught me",
    tech: "Technology",
    notFound: "This page has not shipped.",
    notFoundBody: "The link may have changed. The work is still here.",
    home: "Back home",
  },
  es: {
    nav: {
      work: "Proyectos",
      experience: "Experiencia",
      about: "Sobre mí",
      stack: "Stack",
      hackathons: "Hackatones",
      contact: "Contacto",
      menu: "Abrir menú",
    },
    availability: "Abierto a prácticas y oportunidades de software",
    heroKicker: "DESARROLLADOR DE SOFTWARE / PRODUCT BUILDER",
    heroTitle: "Construyo software para problemas reales.",
    heroBody:
      "Soy Hugo, estudiante de Ingeniería Informática en la Universidad de Deusto. Convierto necesidades reales en productos útiles, desde herramientas internas en Nueva York hasta proyectos propios.",
    explore: "Ver proyectos",
    talk: "Hablemos",
    download: "Descargar CV",
    scroll: "DESLIZA PARA EXPLORAR",
    metrics: [
      ["03 / 04", "Curso de Ingeniería Informática"],
      ["EE. UU.", "Experiencia Work & Travel"],
      ["02", "Herramientas operativas en Nueva York"],
      ["2026", "Construyendo lo siguiente"],
    ],
    workEyebrow: "01 / PROYECTOS",
    workTitle: "Hechos para usarse.",
    workIntro:
      "Proyectos nacidos de procesos reales, necesidades propias y ganas de llevar las ideas a producción.",
    featured: "CASO DESTACADO",
    viewCase: "Leer caso",
    visit: "Visitar proyecto",
    moreWork: "Más cosas que he creado",
    moreWorkBody:
      "Productos, proyectos académicos y experimentos. Cada uno me ha enseñado algo distinto.",
    processEyebrow: "02 / CÓMO TRABAJO",
    processTitle: "Del problema al producto.",
    processIntro:
      "La parte interesante empieza antes del código y continúa después del lanzamiento.",
    process: [
      [
        "Detectar el problema",
        "Escuchar qué resulta lento, repetitivo o frustrante.",
      ],
      [
        "Definir la solución",
        "Buscar la versión útil más pequeña y entender el proceso.",
      ],
      [
        "Construir y publicar",
        "Usar software, datos e IA cuando aportan valor.",
      ],
      [
        "Aprender e iterar",
        "Ponerlo en manos de personas, observar y mejorar.",
      ],
    ],
    experienceEyebrow: "03 / EXPERIENCIA",
    experienceTitle: "Más allá del aula.",
    experienceIntro:
      "El trabajo de software nació de estar cerca de las personas y los procesos a los que podía ayudar.",
    stackEyebrow: "04 / HERRAMIENTAS",
    stackTitle: "Herramientas con las que construyo.",
    stackIntro:
      "Un conjunto práctico para aplicaciones, datos y despliegue. Sin barras de porcentajes.",
    aiEyebrow: "05 / PROCESO",
    aiTitle: "Construir con IA.",
    aiBody:
      "Uso IA para explorar ideas, pensar la arquitectura, avanzar en la implementación y depurar más rápido. Los fundamentos de ingeniería siguen guiando las decisiones.",
    aiNote: "Un multiplicador del desarrollo, apoyado en entender el software.",
    aiSteps: [
      "Explorar",
      "Diseñar",
      "Construir",
      "Probar",
      "Publicar",
      "Iterar",
    ],
    aboutEyebrow: "06 / SOBRE MÍ",
    aboutTitle: "Me interesa el producto completo.",
    aboutP1:
      "Soy Hugo Fernández Díez, estudiante de Ingeniería Informática en la Universidad de Deusto. Me gusta programar, pero también encontrar el problema adecuado y conseguir que una solución útil llegue a quienes la necesitan.",
    aboutP2:
      "Ese enfoque me ha llevado de proyectos universitarios en Java, C y C++ a aplicaciones web para procesos operativos reales mientras trabajaba en Estados Unidos. Me interesan especialmente la ingeniería de software, la automatización y los productos digitales.",
    aboutSmall:
      "Fuera del editor: fútbol, gimnasio, viajes y casi siempre otro proyecto paralelo.",
    international: "Experiencia internacional",
    internationalBody:
      "Estudié en Spectrum Community School, en Canadá, y pasé tres meses trabajando en Queensbury, Nueva York. Inglés: Cambridge B2, puesto en práctica en equipos internacionales y en el día a día.",
    education: "Formación",
    educationBody: "Grado en Ingeniería Informática · Universidad de Deusto",
    educationMeta: "Bilbao · 2024–2028 previsto · 3.er curso",
    hackathonsEyebrow: "07 / EQUIPO Y HACKATONES",
    hackathonsBody:
      "Mi equipo de hackatones. Construimos juntos, experimentamos con IA y convertimos retos en proyectos que funcionan.",
    hackathonsList: "Competiciones a las que estamos apuntados",
    hackathonsStatus: "Inscritos",
    hackathonsLink: "Ver evento",
    labEyebrow: "08 / LAB",
    labTitle: "Siempre construyendo.",
    labIntro:
      "Pequeñas herramientas, pruebas e ideas desarrolladas por el camino.",
    contactEyebrow: "09 / CONTACTO",
    contactTitle: "Construyamos algo útil.",
    contactBody:
      "Abierto a prácticas, puestos de software, colaboraciones y problemas interesantes.",
    email: "Escríbeme",
    footerLine: "Hecho con curiosidad, código y demasiadas ideas.",
    terminal: "terminal",
    terminalHint: "Escribe help para ver los comandos.",
    back: "Volver a proyectos",
    challenge: "El problema",
    approach: "El enfoque",
    build: "Lo que construí",
    outcome: "En la práctica",
    lessons: "Lo aprendido",
    tech: "Tecnologías",
    notFound: "Esta página aún no existe.",
    notFoundBody:
      "Puede que el enlace haya cambiado. Los proyectos siguen aquí.",
    home: "Volver al inicio",
  },
} as const;

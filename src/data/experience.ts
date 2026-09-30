import type { Locale } from "@/lib/i18n";

export const experience: {
  period: string;
  place: Record<Locale, string>;
  location: Record<Locale, string>;
  roles: {
    title: Record<Locale, string>;
    description: Record<Locale, string>;
  }[];
}[] = [
  {
    period: "2026",
    place: { en: "The Great Escape", es: "The Great Escape" },
    location: {
      en: "Queensbury, New York · USA",
      es: "Queensbury, Nueva York · EE. UU.",
    },
    roles: [
      {
        title: {
          en: "Software development / HR operations",
          es: "Desarrollo de software / operaciones de RR. HH.",
        },
        description: {
          en: "Paid internal development. Worked with Housing and HR in recurring meetings to design, build and deploy tools for their workflows.",
          es: "Desarrollo interno remunerado. Trabajé con Housing y RR. HH. en reuniones periódicas para diseñar, crear y desplegar herramientas para sus procesos.",
        },
      },
      {
        title: { en: "Resident Assistant", es: "Resident Assistant" },
        description: {
          en: "Supported housing and day-to-day life for an international workforce.",
          es: "Apoyé la gestión del alojamiento y la convivencia de trabajadores internacionales.",
        },
      },
      {
        title: { en: "Lifeguard", es: "Socorrista" },
        description: {
          en: "A summer role requiring responsibility, communication and calm decisions.",
          es: "Un trabajo de verano que exigía responsabilidad, comunicación y decisiones serenas.",
        },
      },
    ],
  },
  {
    period: "2024–25",
    place: { en: "Camargo swimming pools", es: "Piscinas de Camargo" },
    location: { en: "Cantabria · Spain", es: "Cantabria · España" },
    roles: [
      {
        title: { en: "Summer operations", es: "Operaciones de verano" },
        description: {
          en: "Public-facing and operational work during summer seasons.",
          es: "Atención al público y tareas operativas durante las temporadas de verano.",
        },
      },
    ],
  },
];

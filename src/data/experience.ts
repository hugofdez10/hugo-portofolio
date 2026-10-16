import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export const experience: {
  title: Localized;
  place: Localized;
  period: Localized;
}[] = [
  {
    title: { en: "App developer", es: "Desarrollador de aplicaciones" },
    place: {
      en: "Enchanted Parks · New York",
      es: "Enchanted Parks · Nueva York",
    },
    period: { en: "2026", es: "2026" },
  },
  {
    title: {
      en: "Resident Assistant & lifeguard",
      es: "Resident Assistant y socorrista",
    },
    place: {
      en: "Enchanted Parks · New York",
      es: "Enchanted Parks · Nueva York",
    },
    period: { en: "2026", es: "2026" },
  },
  {
    title: { en: "Customer service", es: "Atención al cliente" },
    place: { en: "Sport Studio · Cantabria", es: "Sport Studio · Cantabria" },
    period: { en: "2024 – 2025", es: "2024 – 2025" },
  },
];

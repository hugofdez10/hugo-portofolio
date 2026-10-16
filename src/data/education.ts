import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export const education: {
  title: Localized;
  place: Localized;
  period: string;
}[] = [
  {
    title: {
      en: "BSc Computer Engineering",
      es: "Grado en Ingeniería Informática",
    },
    place: { en: "Universidad de Deusto", es: "Universidad de Deusto" },
    period: "2024 – 2028",
  },
  {
    title: { en: "School year abroad", es: "Curso en el extranjero" },
    place: {
      en: "Spectrum Community School · Canada",
      es: "Spectrum Community School · Canadá",
    },
    period: "2021 – 2022",
  },
];

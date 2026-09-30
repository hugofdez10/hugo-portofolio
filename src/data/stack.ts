import type { Locale } from "@/lib/i18n";
export const stack: { label: Record<Locale, string>; items: string[] }[] = [
  {
    label: { en: "Languages", es: "Lenguajes" },
    items: [
      "Java",
      "Python",
      "C",
      "C++",
      "SQL",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
    ],
  },
  {
    label: { en: "Frontend", es: "Frontend" },
    items: ["React", "Next.js", "Tailwind CSS", "Responsive design"],
  },
  {
    label: { en: "Backend & data", es: "Backend y datos" },
    items: [
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "Authentication",
      "Row Level Security",
    ],
  },
  {
    label: { en: "Deployment & tools", es: "Despliegue y herramientas" },
    items: ["Git", "GitHub", "Vercel", "Netlify", "VS Code", "Linux"],
  },
  {
    label: { en: "AI workflow", es: "Flujo con IA" },
    items: [
      "ChatGPT",
      "Codex",
      "Claude",
      "Claude Code",
      "Gemini",
      "AI automation",
    ],
  },
];

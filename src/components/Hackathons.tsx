import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";

const events = [
  {
    name: "NASA Space Apps Challenge",
    location: "NASA / Space Apps",
    url: "https://www.spaceappschallenge.org/",
    description: {
      es: "Ciencia, tecnología y datos abiertos para resolver retos de la Tierra y el espacio.",
      en: "Science, technology and open data to tackle challenges on Earth and in space.",
    },
  },
  {
    name: "Gipuzkoa AI Hackathon",
    location: "Gipuzkoa",
    url: "https://gipuzkoa-ai-hackathon.com/",
    description: {
      es: "Agentes de inteligencia artificial y trabajo en equipo para afrontar retos urbanos reales.",
      en: "AI agents and teamwork to tackle real urban challenges.",
    },
  },
  {
    name: "HPE CDS Tech Challenge",
    location: "HPE / Madrid",
    url: "https://www.hpe.com/h22166/event/eventpage?cc=es&eventid=MgA4ADYAMgAwADIA&lang=es&locationIdx=0",
    description: {
      es: "Una competición tecnológica de HPE y CDS para convertir ideas en soluciones con impacto.",
      en: "A technology competition from HPE and CDS to turn ideas into solutions with impact.",
    },
  },
] as const;

export function Hackathons({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section
      className="section hackathons-section"
      id="quemando-tokens"
      aria-labelledby="quemando-tokens-title"
    >
      <div className="container">
        <div className="hackathons-heading">
          <div>
            <span className="eyebrow">
              <span className="blue-dot" />
              {t.hackathonsEyebrow}
            </span>
            <h2 id="quemando-tokens-title">
              Quemando Tokens<span>.</span>
            </h2>
            <p>{t.hackathonsBody}</p>
          </div>
          <div className="hackathons-logo">
            <Image
              src="/images/quemando-tokens-logo.png"
              alt={
                locale === "es"
                  ? "Quemando Tokens — logo del equipo"
                  : "Quemando Tokens — team logo"
              }
              width={2172}
              height={724}
              sizes="(max-width: 760px) 90vw, 45vw"
            />
          </div>
        </div>
        <div className="hackathons-caption">
          <span>{t.hackathonsList}</span>
          <span>03 / HACKATHONS</span>
        </div>
        <div className="hackathons-grid">
          {events.map((event, index) => (
            <article className="hackathon-card" key={event.name}>
              <div className="hackathon-meta">
                <span>0{index + 1}</span>
                <span className="hackathon-status">{t.hackathonsStatus}</span>
              </div>
              <h3>{event.name}</h3>
              <span className="hackathon-location">
                <MapPin size={14} aria-hidden="true" /> {event.location}
              </span>
              <p>{event.description[locale]}</p>
              <a
                className="text-link"
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.hackathonsLink}: ${event.name}`}
              >
                {t.hackathonsLink} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

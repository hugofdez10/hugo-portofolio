import { ArrowUpRight, BookOpen, Code2, Cpu, Globe2, MapPin, Sparkles } from "lucide-react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { stack } from "@/data/stack";
import type { Locale } from "@/lib/i18n";

export function JourneySection({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="journey-section" id="experience" aria-labelledby="journey-heading">
      <div className="container">
        <div className="cinematic-section-kicker">
          <span>06 / THE HUMAN</span>
          <span>THE PERSON BEHIND THE CODE</span>
        </div>
        <div className="journey-intro">
          <div className="journey-intro-copy" data-reveal>
            <p className="journey-kicker">{es ? "MÁS ALLÁ DEL CÓDIGO" : "BEYOND THE CODE"}</p>
            <h2 id="journey-heading">{es ? <>LO QUE ME<br/><em>MUEVE.</em></> : <>WHAT<br/><em>DRIVES ME.</em></>}</h2>
            <p className="journey-lead">{es
              ? "Soy Hugo, estudiante de Ingeniería Informática en Deusto. Me gusta encontrar problemas reales, entender a las personas que los sufren y construir software que haga su día a día más fácil."
              : "I'm Hugo, a Computer Engineering student at Deusto. I love finding real problems, understanding the people affected by them, and building software that makes their day a little easier."}</p>
            <p className="journey-secondary">{es
              ? "Entre Bilbao, Santander y una experiencia de trabajo en Estados Unidos, he aprendido que la mejor tecnología es la que termina utilizándose."
              : "Between Bilbao, Santander and a summer of work in the United States, I've learned that the best technology is the kind people actually use."}</p>
            <div className="journey-location"><MapPin size={14}/>{es ? "BILBAO / SANTANDER — ESPAÑA" : "BILBAO / SANTANDER — SPAIN"}</div>
          </div>
          <div className="journey-identity" aria-hidden="true">
            <div className="journey-identity-radar" />
            <div className="journey-identity-insignia">HF<span>®</span></div>
            <div className="journey-identity-grid" />
            <span className="journey-identity-tag top">SUBJECT / CREATIVE ENGINEER</span>
            <span className="journey-identity-tag bottom">HUMAN INTELLIGENCE / 001</span>
            <span className="journey-identity-line" />
          </div>
        </div>

        <div className="journey-body">
          <div className="journey-body-label">
            <span className="journey-body-index">PATH / 001</span>
            <h3>{es ? <>UNA TRAYECTORIA<br/>EN CONSTRUCCIÓN</> : <>A STORY STILL<br/>UNFOLDING</>}</h3>
            <p>{es ? "Cada experiencia cambia la forma en la que construyo." : "Every experience changes the way I build."}</p>
          </div>
          <div className="journey-timeline">
            <div className="journey-timeline-heading"><Cpu size={17}/><span>{es ? "EXPERIENCIA" : "EXPERIENCE"}</span></div>
            {experience.map((item, index) => (
              <article key={item.title.en} className="journey-event" data-reveal>
                <div className="journey-event-index">{String(index + 1).padStart(2,"0")}</div>
                <div>
                  <span className="journey-event-period">{item.period[locale]}</span>
                  <h4>{item.title[locale]}</h4>
                  <p>{item.place[locale]}</p>
                </div>
                <ArrowUpRight size={18} aria-hidden="true"/>
              </article>
            ))}
            <div className="journey-timeline-heading journey-timeline-heading-education"><BookOpen size={17}/><span>{es ? "FORMACIÓN" : "EDUCATION"}</span></div>
            {education.map((item, index) => (
              <article key={item.title.en} className="journey-event" data-reveal>
                <div className="journey-event-index">0{index + 1}</div>
                <div>
                  <span className="journey-event-period">{item.period}</span>
                  <h4>{item.title[locale]}</h4>
                  <p>{item.place[locale]}</p>
                </div>
                <ArrowUpRight size={18} aria-hidden="true"/>
              </article>
            ))}
          </div>
        </div>

        <div className="journey-stack" data-reveal>
          <div className="journey-stack-heading">
            <div><Code2 size={21} /><span>STACK / TOOLKIT</span></div>
            <p>{es ? "Herramientas distintas. La misma curiosidad." : "Different tools. The same curiosity."}</p>
          </div>
          <div className="journey-stack-list">
            {stack.map((tech, index) => (
              <span key={tech}><span className="journey-stack-number">{String(index + 1).padStart(2, "0")}</span>{tech}</span>
            ))}
          </div>
        </div>
        <div className="journey-signoff">
          <span><Globe2 size={15}/> BUILDING FROM ANYWHERE</span>
          <span><Sparkles size={15}/> {es ? "SIEMPRE APRENDIENDO" : "ALWAYS LEARNING"}</span>
        </div>
      </div>
    </section>
  );
}

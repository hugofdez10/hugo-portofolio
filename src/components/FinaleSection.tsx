import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Mail, Github, Linkedin } from "lucide-react";
import { socials, cvPath } from "@/data/socials";
import type { Locale } from "@/lib/i18n";

export function FinaleSection({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section className="finale-section" id="contact" aria-labelledby="finale-heading">
      <div className="container">
        <div className="cinematic-section-kicker">
          <span>07 / THE CONNECTION</span>
          <span>{es ? "EL SIGUIENTE CAPÍTULO" : "THE NEXT CHAPTER"}</span>
        </div>
        <div className="finale-inner">
          <div className="finale-symbol" aria-hidden="true">
            <div className="finale-ring finale-ring-outer"/>
            <div className="finale-ring finale-ring-mid"/>
            <div className="finale-ring finale-ring-inner"/>
            <div className="finale-symbol-core">HF</div>
            <span className="finale-symbol-dot dot-a"/>
            <span className="finale-symbol-dot dot-b"/>
            <span className="finale-symbol-dot dot-c"/>
          </div>

          <div className="finale-copy" data-reveal>
            <span className="finale-eyebrow">SYSTEM STATUS / READY FOR THE NEXT CHALLENGE</span>
            <h2 id="finale-heading">{es ? <>HAGAMOS ALGO<br/><em>QUE IMPORTE.</em></> : <>LET'S BUILD<br/><em>SOMETHING THAT MATTERS.</em></>}</h2>
            <p>{es
              ? "Las mejores ideas necesitan personas que se atrevan a construirlas. Si tienes un proyecto, una oportunidad o simplemente una conversación interesante, hablemos."
              : "The best ideas need people who dare to build them. If you have a project, an opportunity, or just an interesting conversation, let's talk."}</p>
            <div className="finale-primary-actions">
              <a href={socials.email} className="finale-email">
                <span><Mail size={18}/>{es ? "HABLEMOS" : "GET IN TOUCH"}</span>
                <ArrowUpRight size={22}/>
              </a>
              <a href={cvPath} className="finale-cv" download="CV_Hugo_Fernandez_Diez.pdf">
                <Download size={17}/>{es ? "DESCARGAR CV" : "DOWNLOAD CV"} <ArrowRight size={16}/>
              </a>
            </div>
            <div className="finale-secondary-actions">
              <a href={socials.github} target="_blank" rel="noopener noreferrer"><Github size={17}/> GITHUB <ArrowUpRight size={14}/></a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/> LINKEDIN <ArrowUpRight size={14}/></a>
              <Link href={"/" + locale + "/#top"}>{es ? "VOLVER AL INICIO" : "BACK TO TOP"} ↑</Link>
            </div>
          </div>
        </div>
        <div className="finale-outro" aria-hidden="true">
          <span>CONNECTION ESTABLISHED</span>
          <span>END OF TRANSMISSION / HF 2026</span>
        </div>
      </div>
    </section>
  );
}

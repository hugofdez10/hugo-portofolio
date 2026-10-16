import { Github, Linkedin, Mail } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";
import { socials } from "@/data/socials";

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="footer container">
      <span>© 2026 Hugo Fernández Díez. {t.rights}</span>
      <div className="footer-social">
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a href={socials.email} aria-label="Email">
          <Mail size={16} />
        </a>
      </div>
    </footer>
  );
}

# HF / Beyond the Interface

A bilingual, cinematic portfolio for **Hugo Fernández Díez**, built around real projects and human-readable case studies.

**Live:** https://hugofernandez-portofolio.vercel.app/es  
**English:** https://hugofernandez-portofolio.vercel.app/en

## Experience map

| Scene | What it shows |
|---|---|
| 01 — The Awakening | Hero with native WebGL2 chrome sculpture, particles and CSS fallback |
| 02 — The Proof | Verified impact figures and a kinetic typographic transition |
| 03 — Selected Work | Housing Management and Walmart Shuttle with bespoke system diagrams |
| 04 — The Intelligence | Gipuzkoa 360 and its conceptual 88-node data network |
| 05 — The Lab | Independent/academic experiments with filters and custom SVG artwork |
| 06 — The Human | About, career, education and engineering toolkit |
| 07 — The Connection | Animated HF symbol and contact/CV links |

The Housing Management and Walmart Shuttle case-study pages feature a cinematic hero, five narrative chapters, technology details, and real screenshots **only where supplied and safely redacted**.

## Technology

- Next.js App Router + TypeScript + React
- Tailwind CSS 4 with custom responsive cinema styles
- Native WebGL2 / GLSL shader for the reflective sphere
- SVG + CSS motion and a light 2D canvas particle field
- Optional synthesized UI sounds (Web Audio API, **off by default**)
- X-ray layout inspection mode and Ctrl/Cmd + K command palette
- No backend, external tracking, runtime AI credentials or database

The 3D artwork is decorative; headings, project details, navigation and links remain semantic HTML.

## Develop

```bash
npm ci
npm run dev
```

Open http://localhost:3000/es or http://localhost:3000/en.

## Quality gate

```bash
npm run lint
npm run typecheck
npm run build
```

GitHub Actions runs these on pull requests and pushes to `master`; Vercel builds the production site.

## Accessibility and performance

- Responsive layouts from large desktop to mobile
- `prefers-reduced-motion` support
- Lower particle count on touch devices; no GPU raymarch on small screens
- WebGL2 CSS fallback; decorative canvases are hidden from assistive technology
- Keyboard navigable portfolio, searchable command palette and accessible filter controls
- Data visualizations are **conceptual**, not literal geographic/operational maps

## Content edits

- `src/lib/i18n.ts` — bilingual interface copy.
- `src/data/projects.ts` — projects, public links and structured case-study content.
- `src/data/experience.ts` — work timeline.
- `src/data/education.ts` — education.
- `src/data/stack.ts` — engineering toolkit.
- `src/data/hackathons.ts` — Gipuzkoa 360 data.
- `src/data/socials.ts` — email, GitHub and LinkedIn.

Main components live in `src/components`. Design styles are split into `src/app/globals.css` and `src/app/cinematic-final.css`.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the exact public origin (no trailing slash) for canonical metadata, structured data, robots and sitemap. The application also supports Vercel's `VERCEL_URL` automatically.

Replace `public/cv-hugo-fernandez-diez.pdf` to update the CV.

### Security and content accuracy

Do **not** commit unredacted operational screenshots, employee identities, private usage logs or workplace records. Housing Management's screenshot is explicitly redacted, and the remaining original illustrations are labelled as conceptual visualizations.

Do not present an interactive scripted navigation system as generative AI. A production AI recruiter assistant, if added later, requires an authenticated/rate-limited server endpoint and an explicitly configured private API key.

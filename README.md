# Hugo Fernández Díez — Portfolio

Bilingual portfolio built with Next.js App Router, TypeScript and Tailwind CSS. Content is statically rendered, with a small client component for navigation and the terminal easter egg.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The default route redirects to English; Spanish lives at `/es`.

## Configure for production

Set `NEXT_PUBLIC_SITE_URL` to the final public origin, without a trailing slash. It is used by canonical links, structured data, `robots.txt` and the sitemap. On Vercel, `VERCEL_URL` is used automatically if the variable is absent. Local development falls back to `http://localhost:3000`.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

There is no CV download button until a real PDF is available. To enable it, add `public/cv-hugo-fernandez-diez.pdf`; the hero displays the link automatically on the next build. This avoids a broken download in the published site.

## Update content

- `src/lib/i18n.ts`: interface and page copy in English and Spanish.
- `src/data/projects.ts`: project details and case studies.
- `src/data/experience.ts`: work timeline.
- `src/data/stack.ts`: tools by category.
- `src/data/education.ts`: education data.
- `src/data/socials.ts`: contact links.

Project screenshots are configured through the optional `screenshot` field in `src/data/projects.ts`. Housing Management uses a redacted version of the supplied product capture in `public/images/`. Projects without supplied captures retain explicitly labelled conceptual workflow illustrations. Never add unredacted private operational records.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

The site uses no backend, database, live GitHub API or client-side analytics. The GitHub links work without an API dependency.

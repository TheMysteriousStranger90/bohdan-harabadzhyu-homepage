# Bohdan Harabadzhyu — personal homepage

Personal site of Bohdan Harabadzhyu (Bogdan Garabagiu), Full-Stack .NET Developer.
Built with [Next.js](https://nextjs.org/) (Pages Router), React 18, TypeScript and Chakra UI, deployed on Vercel.

- `/` — profile, contacts, about / education / skills / personal projects (EN / RU)
- `/arts` — poems and music (SoundCloud), `noindex`; every poem and track has a shareable link:
  `/arts?poem=3`, `/arts?track=2`

## Getting started

Requires Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (regenerates `robots.txt` / `sitemap.xml` first) |
| `npm run build` | Production build (regenerates `robots.txt` / `sitemap.xml` first) |
| `npm start` | Serve the production build |
| `npm run lint` / `lint:fix` | ESLint 9 (flat config in `eslint.config.mjs`) |
| `npm run type-check` | `tsc` for the app and for the e2e tests |
| `npm run test:e2e` | Playwright + axe smoke tests (needs a production build, see below) |

## Environment variables

All optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin, e.g. `https://example.com`. Used for the canonical URL, Open Graph URLs, JSON-LD, `robots.txt` and `sitemap.xml`. If unset, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used automatically; if neither exists the absolute URLs are **omitted** (never guessed). |
| `CSP_ENFORCE` | `true` switches the Content-Security-Policy from report-only to enforcing. |
| `CSP_REPORT_URI` | Optional `report-uri` endpoint appended to the CSP. |

## SEO and identity

`src/lib/site.ts` is the single source of truth: both spellings of the name, job title and the
official profile links (`sameAs`). `src/components/seo/HomeSeo.tsx` renders the title, description,
canonical, Open Graph / Twitter tags and the schema.org JSON-LD (`Person` + `WebSite`).
`scripts/generate-seo-files.mjs` writes `public/robots.txt` and `public/sitemap.xml` (generated, git-ignored).
The share image is `public/og-image.jpg` (1200×630).

When you add an official profile (LinkedIn, Microsoft Store developer page, …) put it in `PERSON_SAME_AS`.

## Content Security Policy

`next.config.mjs` sends a CSP in **report-only** mode, together with the other security headers.
Allowed third parties: SoundCloud (player iframe and widget API) and Vercel Analytics / Speed Insights.

To roll it out: deploy, open `/` and `/arts` (including a track) with the browser console open,
and check for "Content Security Policy" reports. When the console is clean, set `CSP_ENFORCE=true`.
(`'unsafe-inline'` is needed for scripts and styles while the site is on the Pages Router with
Chakra/emotion; moving to nonces would require the App Router.)

## Tests

```bash
npx playwright install chromium     # once
npm run build && npm run test:e2e   # starts `npm start` on port 3100 automatically
```

The suite (`tests/e2e`) covers the homepage, `/arts` navigation (deep links, keyboard, mobile drawer,
seek-slider keys), SEO metadata, security headers / CSP violations, and axe accessibility scans in the
dark and light themes. The SoundCloud widget is mocked, so tests need no network.
Set `NEXT_PUBLIC_SITE_URL` for the build to test the absolute-URL branch (CI does this).

Accessibility issues that are already known are listed in `tests/e2e/helpers.ts`
(`KNOWN_AXE_ISSUES`). Delete an entry when you fix it and the scan starts guarding that rule.

## Content

- Profile text: `src/data/translations.ts` (EN / RU)
- Projects list: `src/data/myInformation.ts`
- Poems: `src/assets/data/poems.json` — Tracks: `src/assets/data/tracks.json`

## CI

`.github/workflows/ci.yml` runs lint, type-check, build and the Playwright suite on every push / PR,
plus a weekly `npm audit` of production dependencies. Dependabot (`.github/dependabot.yml`) opens one
grouped PR per week for minor/patch updates.

## Author

Bohdan Harabadzhyu (Bogdan Garabagiu)

## License

MIT — see [LICENSE](./LICENSE).

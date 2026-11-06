/**
 * Generates public/robots.txt and public/sitemap.xml for the resolved site URL.
 * Runs automatically before `npm run dev` and `npm run build` (see package.json).
 *
 * /arts is intentionally NOT in the sitemap: it carries <meta name="robots" content="noindex">,
 * and robots.txt must keep it crawlable so crawlers can actually see that tag.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSiteUrl } from '../site-url.mjs';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(publicDir, { recursive: true });

const siteUrl = resolveSiteUrl();

const robots = ['User-agent: *', 'Allow: /', ''];
if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`, '');
writeFileSync(join(publicDir, 'robots.txt'), robots.join('\n'));

const sitemapPath = join(publicDir, 'sitemap.xml');
if (siteUrl) {
  writeFileSync(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`,
  );
  console.log(`[seo] robots.txt + sitemap.xml generated for ${siteUrl}`);
} else {
  rmSync(sitemapPath, { force: true });
  console.warn(
    '[seo] No site URL found (set NEXT_PUBLIC_SITE_URL). robots.txt written without a Sitemap line; sitemap.xml skipped.',
  );
}

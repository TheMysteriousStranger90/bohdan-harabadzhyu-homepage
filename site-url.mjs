/**
 * Resolve the public origin of the site (no trailing slash), or '' when unknown.
 *
 * Order:
 *   1. NEXT_PUBLIC_SITE_URL         – explicit override (set this for a custom domain)
 *   2. VERCEL_PROJECT_PRODUCTION_URL – provided automatically by Vercel at build time
 *   3. http://localhost:3000        – only when `allowLocalhost` is true (dev server)
 *
 * Returning '' makes the SEO code omit canonical / og:url / sitemap entries
 * instead of publishing a wrong host.
 */
export function resolveSiteUrl(env = process.env, { allowLocalhost = false } = {}) {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  let url = '';
  if (explicit) url = explicit;
  else if (vercel) url = `https://${vercel}`;
  else if (allowLocalhost) url = 'http://localhost:3000';

  return url.replace(/\/+$/, '');
}

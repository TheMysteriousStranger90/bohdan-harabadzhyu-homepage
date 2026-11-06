import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { resolveSiteUrl } from './site-url.mjs';

/**
 * Content-Security-Policy
 *
 * Ships as Report-Only by default so nothing can break silently. Violations show up
 * in the browser console (and at CSP_REPORT_URI, if set). Once the console is clean on
 * `/` and `/arts`, set CSP_ENFORCE=true to switch to the enforcing header.
 *
 * 'unsafe-inline' for scripts is required while the site uses the Pages Router:
 * Next.js inlines __NEXT_DATA__ and Chakra's color-mode script, and there are no nonces.
 * Third parties: SoundCloud (player iframe + widget API) and Vercel Analytics / Speed Insights.
 */
const buildCsp = ({ isDev, reportUri }) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://w.soundcloud.com https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com${isDev ? ' ws: wss:' : ''}`,
    'frame-src https://w.soundcloud.com',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    reportUri ? `report-uri ${reportUri}` : null,
  ]
    .filter(Boolean)
    .join('; ');

/** @param {string} phase */
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const enforceCsp = process.env.CSP_ENFORCE === 'true';
  const csp = buildCsp({ isDev, reportUri: process.env.CSP_REPORT_URI?.trim() });

  const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    {
      key: enforceCsp ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only',
      value: csp,
    },
  ];

  return {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_SITE_URL: resolveSiteUrl(process.env, { allowLocalhost: isDev }),
    },
    async headers() {
      return [{ source: '/:path*', headers: securityHeaders }];
    },
  };
};

export default nextConfig;

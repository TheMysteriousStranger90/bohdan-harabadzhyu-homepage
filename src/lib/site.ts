/**
 * Single source of truth for site identity / SEO metadata.
 *
 * SITE_URL is injected at build time by next.config.mjs (see site-url.mjs):
 * NEXT_PUBLIC_SITE_URL → Vercel production domain → '' (unknown).
 * When it is empty, absolute URLs (canonical, og:url, og:image, JSON-LD url) are omitted
 * rather than guessed.
 */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL ?? '';

export const SITE_NAME = 'Bohdan Harabadzhyu';
export const SITE_TITLE = 'Bohdan Harabadzhyu | Full-Stack .NET Developer';
export const SITE_DESCRIPTION =
  'Personal homepage of Bohdan Harabadzhyu (Bogdan Garabagiu), Full-Stack .NET Developer';

/** Both spellings of the name that appear publicly. */
export const PERSON_NAME = 'Bohdan Harabadzhyu';
export const PERSON_ALTERNATE_NAMES = ['Bogdan Garabagiu'] as const;
export const PERSON_JOB_TITLE = 'Full-Stack .NET Developer';

/** Official profiles — the same ones linked from the page. Used for schema.org `sameAs`. */
export const PERSON_SAME_AS = [
  'https://github.com/TheMysteriousStranger90',
  'https://www.youtube.com/@TheMysteriousStranger90',
  'https://t.me/TheMysteriousStranger90',
  'https://dev.to/themysteriousstranger90',
  'https://medium.com/@bohdan.harabadzhyu',
  'https://habr.com/ru/users/TheMysteriousStranger90/',
  'https://soundcloud.com/the_mysterious_stranger90',
] as const;

export const PERSON_KNOWS_ABOUT = [
  'C#',
  '.NET',
  'ASP.NET Core',
  'Entity Framework Core',
  'Angular',
  'TypeScript',
  'Blazor',
  'Avalonia UI',
  'Microservices',
  'REST APIs',
] as const;

export const PERSON_ALUMNI_OF = [
  'Admiral Makarov National University of Shipbuilding',
  'V.O. Sukhomlynskyi Mykolaiv National University',
] as const;

export const OG_IMAGE = { path: '/og-image.jpg', width: 1200, height: 630 } as const;

/** Absolute URL for a site path, or undefined when the site origin is unknown. */
export const absoluteUrl = (path = '/'): string | undefined =>
  SITE_URL ? `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}` : undefined;

/** schema.org graph: a WebSite and the Person it belongs to. */
export const buildJsonLd = () => {
  const home = absoluteUrl('/');
  const personId = home ? `${home}#person` : '#person';
  const image = absoluteUrl('/Photo.jpg');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: PERSON_NAME,
        alternateName: [...PERSON_ALTERNATE_NAMES],
        jobTitle: PERSON_JOB_TITLE,
        description: SITE_DESCRIPTION,
        ...(home && { url: home }),
        ...(image && { image }),
        knowsAbout: [...PERSON_KNOWS_ABOUT],
        alumniOf: PERSON_ALUMNI_OF.map((name) => ({
          '@type': 'CollegeOrUniversity',
          name,
        })),
        sameAs: [...PERSON_SAME_AS],
      },
      {
        '@type': 'WebSite',
        ...(home && { '@id': `${home}#website`, url: home }),
        name: SITE_NAME,
        inLanguage: ['en', 'ru'],
        about: { '@id': personId },
        author: { '@id': personId },
      },
    ],
  };
};

/**
 * JSON for an inline <script type="application/ld+json">. `<` is escaped so the payload can
 * never terminate the script element.
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');

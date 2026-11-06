import { expect, test } from '@playwright/test';
import { collectCspViolations, mockSoundCloud } from './helpers';

/**
 * The build under test decides which branch runs: with NEXT_PUBLIC_SITE_URL set (CI sets it)
 * absolute URLs must be present; without it they must be omitted rather than guessed.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '');

type Graph = Array<Record<string, unknown>>;

const readJsonLd = async (page: import('@playwright/test').Page) => {
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  return JSON.parse(raw ?? '{}') as { '@context': string; '@graph': Graph };
};

test.describe('SEO & identity', () => {
  test('homepage has description, Open Graph and Twitter tags', async ({ page }) => {
    await page.goto('/');
    const meta = (sel: string) => page.locator(`head meta[${sel}]`).first();

    await expect(meta('name="description"')).toHaveAttribute('content', /Bohdan Harabadzhyu.*Bogdan Garabagiu/);
    await expect(meta('property="og:type"')).toHaveAttribute('content', 'website');
    await expect(meta('property="og:title"')).toHaveAttribute('content', /Full-Stack \.NET Developer/);
    await expect(meta('property="og:site_name"')).toHaveAttribute('content', 'Bohdan Harabadzhyu');
    await expect(meta('name="twitter:title"')).toHaveAttribute('content', /Full-Stack \.NET Developer/);
  });

  test('canonical, og:url and og:image follow the site URL', async ({ page }) => {
    await page.goto('/');
    const canonical = page.locator('head link[rel="canonical"]');
    const ogUrl = page.locator('head meta[property="og:url"]');
    const ogImage = page.locator('head meta[property="og:image"]');
    const twitterCard = page.locator('head meta[name="twitter:card"]');

    if (SITE_URL) {
      await expect(canonical).toHaveAttribute('href', `${SITE_URL}/`);
      await expect(ogUrl).toHaveAttribute('content', `${SITE_URL}/`);
      await expect(ogImage).toHaveAttribute('content', `${SITE_URL}/og-image.jpg`);
      await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    } else {
      await expect(canonical).toHaveCount(0);
      await expect(ogUrl).toHaveCount(0);
      await expect(ogImage).toHaveCount(0);
      await expect(twitterCard).toHaveAttribute('content', 'summary');
    }
  });

  test('JSON-LD declares the Person with both name spellings and profiles', async ({ page }) => {
    await page.goto('/');
    const data = await readJsonLd(page);
    expect(data['@context']).toBe('https://schema.org');

    const person = data['@graph'].find(n => n['@type'] === 'Person')!;
    expect(person.name).toBe('Bohdan Harabadzhyu');
    expect(person.alternateName).toContain('Bogdan Garabagiu');
    expect(person.jobTitle).toBe('Full-Stack .NET Developer');
    expect(person.sameAs).toEqual(
      expect.arrayContaining([
        'https://github.com/TheMysteriousStranger90',
        'https://www.youtube.com/@TheMysteriousStranger90',
      ]),
    );
    if (SITE_URL) expect(person.url).toBe(`${SITE_URL}/`);
    else expect(person).not.toHaveProperty('url');

    const site = data['@graph'].find(n => n['@type'] === 'WebSite')!;
    expect(site.name).toBe('Bohdan Harabadzhyu');
    expect(site.author).toEqual({ '@id': person['@id'] });
  });

  test('OG image is served and is a JPEG', async ({ request }) => {
    const res = await request.get('/og-image.jpg');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/jpeg');
  });

  test('robots.txt allows crawling and points at the sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-agent: \*\s+Allow: \//);
    expect(body).not.toMatch(/Disallow:/); // /arts must stay crawlable so its noindex is seen
    if (SITE_URL) expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    else expect(body).not.toContain('Sitemap:');
  });

  test('sitemap.xml lists the homepage only', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    if (!SITE_URL) {
      expect(res.status()).toBe(404);
      return;
    }
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain(`<loc>${SITE_URL}/</loc>`);
    expect(body).not.toContain('/arts');
  });

  test('/arts is noindex', async ({ page }) => {
    await page.goto('/arts');
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('security headers', () => {
  test('CSP ships in report-only mode with the third parties the site needs', async ({ request }) => {
    const res = await request.get('/');
    const headers = res.headers();

    const csp = headers['content-security-policy-report-only'];
    expect(csp, 'report-only CSP header').toBeTruthy();
    expect(headers['content-security-policy']).toBeUndefined(); // not enforcing yet
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain('frame-src https://w.soundcloud.com');
    expect(csp).toMatch(/script-src [^;]*https:\/\/w\.soundcloud\.com/);
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'self'");

    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');
  });

  for (const path of ['/', '/arts', '/arts?track=1']) {
    test(`no CSP violations on ${path}`, async ({ page }) => {
      await mockSoundCloud(page);
      const violations = await collectCspViolations(page);
      await page.goto(path);
      await page.waitForTimeout(800);
      expect(await violations()).toEqual([]);
    });
  }
});

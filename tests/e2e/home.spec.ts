import { expect, test } from '@playwright/test';
import { expectNoSeriousA11yViolations, setTheme, type Theme } from './helpers';

test.describe('home page', () => {
  test('shows the name, role and contact links', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Bohdan Harabadzhyu | Full-Stack .NET Developer');
    await expect(page.getByText('Full-Stack .NET Developer').first()).toBeVisible();

    await expect(page.getByRole('link', { name: 'Email', exact: true })).toHaveAttribute(
      'href',
      /^mailto:.+@.+/,
    );
    await expect(page.getByRole('link', { name: 'Telegram', exact: true })).toHaveAttribute('href', /^https:\/\/t\.me\//);
    await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', /^https:\/\/github\.com\//);
  });

  test('every external link opens safely', async ({ page }) => {
    await page.goto('/');
    const external = page.locator('a[target="_blank"]');
    expect(await external.count()).toBeGreaterThan(0);
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('language toggle switches between EN and RU', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('ABOUT ME', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Toggle language' }).click();
    await expect(page.getByText('ОБО МНЕ', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Toggle language' }).click();
    await expect(page.getByText('ABOUT ME', { exact: true })).toBeVisible();
  });

  test('theme toggle changes the color mode', async ({ page }) => {
    await setTheme(page, 'dark');
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('profile photo leads to /arts', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Bohdan Harabadzhyu photo' }).click();
    await expect(page).toHaveURL(/\/arts$/);
  });

  for (const theme of ['dark', 'light'] satisfies Theme[]) {
    test(`has no serious accessibility violations (${theme} theme)`, async ({ page }) => {
      await setTheme(page, theme);
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expectNoSeriousA11yViolations(page, theme);
    });
  }
});

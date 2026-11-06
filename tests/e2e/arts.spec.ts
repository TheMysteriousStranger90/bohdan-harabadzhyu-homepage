import { expect, test } from '@playwright/test';
import poemsData from '../../src/assets/data/poems.json';
import tracksData from '../../src/assets/data/tracks.json';
import {
  FAKE_TRACK_DURATION_MS,
  expectNoSeriousA11yViolations,
  mockSoundCloud,
  setTheme,
  type Theme,
} from './helpers';

const { poems } = poemsData;
const { tracks } = tracksData;
const poem3 = poems[2];
const track2 = tracks[1];

test.beforeEach(async ({ page }) => {
  await mockSoundCloud(page);
});

test.describe('/arts navigation', () => {
  test('shows the first poem by default', async ({ page }) => {
    await page.goto('/arts');
    await expect(page.getByText(poems[0].title, { exact: true }).first()).toBeVisible();
  });

  test('sidebar items are real links with shareable URLs', async ({ page }) => {
    await page.goto('/arts');
    const link = page.getByRole('link', { name: poem3.title, exact: true });
    await expect(link).toHaveAttribute('href', `/arts?poem=${poem3.id}`);

    await page.getByRole('button', { name: 'MUSIC' }).click();
    await expect(page.getByRole('link', { name: track2.title, exact: true })).toHaveAttribute(
      'href',
      `/arts?track=${track2.id}`,
    );
  });

  test('deep link /arts?poem=N opens that poem', async ({ page }) => {
    await page.goto(`/arts?poem=${poem3.id}`);
    await expect(page.getByRole('link', { name: poem3.title, exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    // first line of the first stanza is rendered in the poem card
    const firstLine = poem3.stanzas[0].split('\n').find(l => l.trim())!;
    await expect(page.getByText(firstLine.trim(), { exact: false }).first()).toBeVisible();
  });

  test('deep link /arts?track=N opens that track', async ({ page }) => {
    await page.goto(`/arts?track=${track2.id}`);
    await expect(page.getByRole('link', { name: track2.title, exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(page.getByRole('slider', { name: 'Seek' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play' })).toBeEnabled();
  });

  test('unknown or malformed ids fall back to the first poem', async ({ page }) => {
    for (const query of ['poem=999', 'poem=abc', 'track=999', 'poem=-1']) {
      await page.goto(`/arts?${query}`);
      await expect(
        page.getByRole('link', { name: poems[0].title, exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });

  test('keyboard: sidebar is reachable with Tab and activated with Enter', async ({ page }) => {
    await page.goto('/arts');
    await page.getByRole('button', { name: 'POEMS' }).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: poems[0].title, exact: true })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: poems[1].title, exact: true })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(new RegExp(`/arts\\?poem=${poems[1].id}$`));
    await expect(page.getByRole('link', { name: poems[1].title, exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('keyboard: section headers toggle with Space and hide their links', async ({ page }) => {
    await page.goto('/arts');
    const header = page.getByRole('button', { name: 'POEMS' });
    const firstLink = page.getByRole('link', { name: poems[0].title, exact: true });

    await expect(header).toHaveAttribute('aria-expanded', 'true');
    await header.focus();
    await page.keyboard.press('Space');
    await expect(header).toHaveAttribute('aria-expanded', 'false');
    await expect(firstLink).toBeHidden();

    await page.keyboard.press('Space');
    await expect(header).toHaveAttribute('aria-expanded', 'true');
    await expect(firstLink).toBeVisible();
  });

  test('mobile: drawer links navigate and close the drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/arts');
    await page.getByRole('button', { name: 'Open poems list' }).click();

    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();
    await drawer.getByRole('button', { name: 'MUSIC' }).click();
    await drawer.getByRole('link', { name: track2.title, exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`/arts\\?track=${track2.id}$`));
    await expect(drawer).toBeHidden();
    await expect(page.getByRole('slider', { name: 'Seek' })).toBeVisible();
  });

  test('mobile: drawer keeps opening after repeated track/poem selections', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/arts');

    const toggle = page.getByRole('button', { name: 'Open poems list' });
    const drawer = page.getByRole('dialog');

    const ensureSectionExpanded = async (name: 'POEMS' | 'MUSIC') => {
      const section = drawer.getByRole('button', { name });
      if ((await section.getAttribute('aria-expanded')) !== 'true') {
        await section.click();
      }
    };

    const sequence = [
      { type: 'track' as const, id: tracks[1].id, title: tracks[1].title },
      { type: 'track' as const, id: tracks[2].id, title: tracks[2].title },
      { type: 'poem' as const, id: poems[2].id, title: poems[2].title },
      { type: 'track' as const, id: tracks[0].id, title: tracks[0].title },
      { type: 'poem' as const, id: poems[1].id, title: poems[1].title },
    ];

    for (const step of sequence) {
      await toggle.click();
      await expect(drawer).toBeVisible();

      if (step.type === 'track') {
        await ensureSectionExpanded('MUSIC');
        await drawer.getByRole('link', { name: step.title, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/arts\\?track=${step.id}$`));
        const playButton = page.getByRole('button', { name: 'Play' });
        await expect(playButton).toBeEnabled();
        await playButton.click();
        await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
      } else {
        await ensureSectionExpanded('POEMS');
        await drawer.getByRole('link', { name: step.title, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/arts\\?poem=${step.id}$`));
      }

      await expect(drawer).toBeHidden();
    }

    await toggle.click();
    await expect(drawer).toBeVisible();
  });
});

test.describe('seek slider keyboard support', () => {
  const seeks = (page: import('@playwright/test').Page) =>
    page.evaluate(() => (window as unknown as { __scSeeks?: number[] }).__scSeeks ?? []);

  test('is focusable and exposes slider semantics', async ({ page }) => {
    await page.goto(`/arts?track=${track2.id}`);
    const slider = page.getByRole('slider', { name: 'Seek' });
    await expect(slider).toHaveAttribute('tabindex', '0');
    await expect(slider).toHaveAttribute('aria-valuemin', '0');
    await expect(slider).toHaveAttribute('aria-valuemax', String(FAKE_TRACK_DURATION_MS / 1000));
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await expect(slider).toHaveAttribute('aria-valuetext', '0:00 of 3:35');

    await slider.focus();
    await expect(slider).toBeFocused();
  });

  test('is reachable by Tab from the play button', async ({ page }) => {
    await page.goto(`/arts?track=${track2.id}`);
    await page.getByRole('button', { name: 'Play' }).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('slider', { name: 'Seek' })).toBeFocused();
  });

  test('arrow, page, Home and End keys seek (and clamp)', async ({ page }) => {
    await page.goto(`/arts?track=${track2.id}`);
    const slider = page.getByRole('slider', { name: 'Seek' });
    await expect(slider).toHaveAttribute('tabindex', '0');
    await slider.focus();

    await page.keyboard.press('ArrowRight');
    await expect(slider).toHaveAttribute('aria-valuenow', '5');
    await expect(slider).toHaveAttribute('aria-valuetext', '0:05 of 3:35');

    await page.keyboard.press('PageUp');
    await expect(slider).toHaveAttribute('aria-valuenow', '20');

    await page.keyboard.press('ArrowLeft');
    await expect(slider).toHaveAttribute('aria-valuenow', '15');

    await page.keyboard.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', String(FAKE_TRACK_DURATION_MS / 1000));
    await page.keyboard.press('ArrowRight'); // clamped at the end
    await expect(slider).toHaveAttribute('aria-valuenow', String(FAKE_TRACK_DURATION_MS / 1000));

    await page.keyboard.press('Home');
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await page.keyboard.press('ArrowLeft'); // clamped at the start
    await expect(slider).toHaveAttribute('aria-valuenow', '0');

    // every key press reached the SoundCloud widget with the right position (ms)
    expect(await seeks(page)).toEqual([5000, 20000, 15000, 215000, 215000, 0, 0]);
  });

  test('other keys are left alone', async ({ page }) => {
    await page.goto(`/arts?track=${track2.id}`);
    const slider = page.getByRole('slider', { name: 'Seek' });
    await expect(slider).toHaveAttribute('tabindex', '0');
    await slider.focus();
    await page.keyboard.press('a');
    await page.keyboard.press('Tab');
    await expect(slider).not.toBeFocused();
    expect(await seeks(page)).toEqual([]);
  });
});

test.describe('/arts accessibility', () => {
  for (const theme of ['dark', 'light'] satisfies Theme[]) {
    test(`poem view has no serious violations (${theme} theme)`, async ({ page }) => {
      await setTheme(page, theme);
      await page.goto('/arts');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expectNoSeriousA11yViolations(page, theme);
    });

    test(`track view has no serious violations (${theme} theme)`, async ({ page }) => {
      await setTheme(page, theme);
      await page.goto(`/arts?track=${track2.id}`);
      await expect(page.getByRole('slider', { name: 'Seek' })).toBeVisible();
      await expectNoSeriousA11yViolations(page, theme);
    });
  }
});

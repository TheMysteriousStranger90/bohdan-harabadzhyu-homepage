import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/** Duration reported by the fake SoundCloud widget. */
export const FAKE_TRACK_DURATION_MS = 215_000;

/**
 * Replace the SoundCloud widget (script + iframe) with a deterministic fake, so tests never
 * touch the network. Seeks are recorded in `window.__scSeeks`.
 */
export const mockSoundCloud = async (page: Page) => {
  await page.route('https://w.soundcloud.com/player/**', route =>
    route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>SoundCloud (mock)</title>' }),
  );
  await page.route('https://w.soundcloud.com/player/api.js', route =>
    route.fulfill({
      contentType: 'application/javascript',
      body: `
        (function () {
          function Widget() {
            var handlers = {};
            return {
              bind: function (ev, cb) {
                handlers[ev] = cb;
                if (ev === 'ready') setTimeout(function () { cb(); }, 0);
              },
              unbind: function (ev) { delete handlers[ev]; },
              load: function (url, opts) {
                setTimeout(function () { opts && opts.callback && opts.callback(); }, 0);
              },
              play: function () { handlers.play && handlers.play(); },
              pause: function () { handlers.pause && handlers.pause(); },
              seekTo: function (ms) { (window.__scSeeks = window.__scSeeks || []).push(ms); },
              getDuration: function (cb) { cb(${FAKE_TRACK_DURATION_MS}); }
            };
          }
          Widget.Events = { READY: 'ready', PLAY: 'play', PAUSE: 'pause', PLAY_PROGRESS: 'playProgress', FINISH: 'finish' };
          window.SC = { Widget: Widget };
        })();
      `,
    }),
  );
};

/** Collect Content-Security-Policy violations (report-only ones fire this event too). */
export const collectCspViolations = async (page: Page) => {
  await page.addInitScript(() => {
    (window as unknown as { __csp: string[] }).__csp = [];
    document.addEventListener('securitypolicyviolation', e => {
      (window as unknown as { __csp: string[] }).__csp.push(`${e.violatedDirective} ← ${e.blockedURI}`);
    });
  });
  return () => page.evaluate(() => (window as unknown as { __csp: string[] }).__csp);
};

/**
 * axe rules that currently fail and are tracked as known issues (found by the first run of this
 * suite). Delete an entry once the underlying problem is fixed, so the test starts guarding it.
 */
export const KNOWN_AXE_ISSUES = [
  'html-has-lang', // <html> has no lang attribute (needs pages/_document.tsx)
  'label-content-name-mismatch', // "Toggle language" aria-label vs. visible "RU"/"EN" text
  'svg-img-alt', // SoundCloud icon in TrackDisplay has role="img" but no accessible name
];

/** Additional known issues that only show up in the light theme. */
export const KNOWN_AXE_ISSUES_LIGHT = [
  'color-contrast', // #202023 text on the #1363d2 cards/buttons is ~2.9:1 (needs 4.5:1)
];

export type Theme = 'dark' | 'light';

/** Persist the Chakra color mode before the app boots, so a page loads straight into `theme`. */
export const setTheme = async (page: Page, theme: Theme) => {
  await page.addInitScript(mode => {
    try {
      localStorage.setItem('chakra-ui-color-mode', mode);
    } catch {
      /* storage unavailable */
    }
  }, theme);
};

/** Fails on serious/critical WCAG A/AA violations, except the tracked known issues above. */
export const expectNoSeriousA11yViolations = async (page: Page, theme: Theme = 'dark') => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules(theme === 'light' ? [...KNOWN_AXE_ISSUES, ...KNOWN_AXE_ISSUES_LIGHT] : KNOWN_AXE_ISSUES)
    .analyze();

  const serious = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
  expect(
    serious.map(v => `${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.help}`),
  ).toEqual([]);
};

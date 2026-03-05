/**
 * Cookie consent state and persistence.
 * SSR-safe: all storage access guarded by typeof window.
 *
 * For analytics (GA, Meta, etc.): call runWhenConsent((state) => { ... init script ... })
 * so the callback runs only after the user has consented to analytics or marketing.
 * Do not load tracking scripts until consent is given.
 */

export const CONSENT_VERSION = 1;
const STORAGE_KEY = 'grinex_consent';

export type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: number;
};

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

export function isServer(): boolean {
  return typeof window === 'undefined';
}

export function getConsent(): ConsentState | null {
  if (isServer()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(state: Partial<ConsentState>): void {
  if (isServer()) return;
  try {
    const full: ConsentState = {
      ...DEFAULT_CONSENT,
      ...state,
      necessary: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    runConsentCallbacks(full);
  } catch {
    // ignore
  }
}

export function hasConsent(): boolean {
  return getConsent() !== null;
}

export function consentAllowsAnalytics(): boolean {
  const c = getConsent();
  return c !== null && c.analytics;
}

export function consentAllowsMarketing(): boolean {
  const c = getConsent();
  return c !== null && c.marketing;
}

/** Callbacks to run when consent is updated (e.g. init analytics only when allowed). */
const consentCallbacks: Array<(state: ConsentState) => void> = [];

export function runWhenConsent(fn: (state: ConsentState) => void): void {
  if (isServer()) return;
  const c = getConsent();
  if (c && (c.analytics || c.marketing)) {
    fn(c);
  } else {
    consentCallbacks.push(fn);
  }
}

function runConsentCallbacks(state: ConsentState): void {
  if (state.analytics || state.marketing) {
    consentCallbacks.splice(0, consentCallbacks.length).forEach((fn) => {
      try {
        fn(state);
      } catch {
        // ignore
      }
    });
  }
}

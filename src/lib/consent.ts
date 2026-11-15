/**
 * Cookie consent storage for Syren.
 *
 * The visitor's choice is persisted in localStorage so it survives navigation
 * and repeat visits. The banner exposes two categories:
 *   - Necessary (always on; nothing to store)
 *   - Analytics (granted / denied)
 *
 * These helpers are intentionally dependency-free so they can be used from
 * React components and plain event handlers alike.
 */

export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "syren-cookie-consent";

/** Dispatched on `window` to ask the banner to reopen (footer "Cookie settings"). */
export const CONSENT_OPEN_EVENT = "syren:open-cookie-settings";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage blocked (private mode, etc.) — the banner simply shows again.
  }
}

/**
 * True only once the visitor has explicitly accepted analytics cookies.
 * Used to gate every analytics call so they are safe no-ops before consent.
 */
export function analyticsAllowed(): boolean {
  return readConsent() === "granted";
}

/** Ask the cookie banner to open (used by the footer "Cookie settings" link). */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

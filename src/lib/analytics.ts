"use client";

import { useEffect } from "react";

/**
 * Analytics utility for Syren.
 *
 * Two responsibilities live here:
 *  1. `track()` — a lightweight event stub used by landing-page components.
 *  2. The deferred loader for GA4 and Microsoft Clarity.
 */

type EventPayload = Record<string, string | number | boolean | null | undefined>;

export function track(eventName: string, payload?: EventPayload) {
  // Only log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Track Event: ${eventName}`, payload || "");
  }

  // Future integration points:
  // - window.gtag('event', eventName, payload)
  // - window.fbq('trackCustom', eventName, payload)
}

/**
 * Third-party analytics loader.
 *
 * Google Analytics 4 and Microsoft Clarity are heavy third-party bundles. On a
 * throttled mobile device they block the main thread for roughly 0.6s and 0.25s
 * respectively, which dominates Total Blocking Time on the festival pages.
 *
 * Instead of loading them on page load we wait for the first real user
 * interaction. GA4 events fired before that point are not lost: the gtag stub
 * in the root layout pushes them onto `window.dataLayer`, and gtag.js replays
 * the queue as soon as it loads.
 */

const GA_MEASUREMENT_ID = "G-119ZX0583F";
const CLARITY_PROJECT_ID = "vt8xkvfec3";

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointermove",
  "keydown",
  "touchstart",
  "scroll",
  "wheel",
];

let started = false;

function injectScript(src: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Loads GA4 and Clarity. Safe to call more than once; only the first call acts. */
export function loadAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
  injectScript(`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`);
}

/** Starts analytics on the first user interaction, so it stays off the critical path. */
export function armAnalyticsOnInteraction() {
  if (typeof window === "undefined") return;

  const trigger = () => {
    INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, trigger));
    loadAnalytics();
  };

  INTERACTION_EVENTS.forEach((event) =>
    window.addEventListener(event, trigger, { once: true, passive: true })
  );

  // Safety net: a visitor who reads and leaves without interacting is still counted
  // when the page is hidden.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, trigger));
      loadAnalytics();
    }
  });
}

/** Mounts the interaction listener once. Renders nothing. */
export function AnalyticsOnInteraction() {
  useEffect(() => {
    armAnalyticsOnInteraction();
  }, []);
  return null;
}

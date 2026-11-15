"use client";

/**
 * Analytics for Syren — consent gated.
 *
 * No third-party analytics script loads, and no analytics cookie is set, until
 * the visitor accepts the "Analytics" cookie category. Before consent every
 * helper here is a safe no-op: it does not throw and it never queues work that
 * would fire later without consent.
 *
 * Google Consent Mode v2 runs in "basic" mode. The four denied defaults are set
 * in the document head (see src/app/layout.tsx) before any gtag call, and
 * gtag.js itself is only injected once consent is granted.
 *
 * Microsoft Clarity uses the current official Consent API v2:
 *   window.clarity('consentv2', { ad_Storage, analytics_Storage })
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2
 */

import { analyticsAllowed } from "@/lib/consent";

type EventPayload = Record<string, string | number | boolean | null | undefined>;

const GA_MEASUREMENT_ID = "G-119ZX0583F";
const CLARITY_PROJECT_ID = "vt8xkvfec3";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

let activated = false;

function injectScript(src: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Ensures the gtag stub exists so queued Consent Mode commands can be flushed. */
function ensureGtagStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

/**
 * Microsoft Clarity expects `window.clarity` to exist as a command queue before
 * its tag loads, so consent is registered ahead of injection.
 */
function ensureClarityStub() {
  if (typeof window === "undefined") return;
  if (typeof window.clarity === "function") return;
  const clarity = ((...args: unknown[]) => {
    clarity.q = clarity.q || [];
    clarity.q.push(args);
  }) as ((...args: unknown[]) => void) & { q?: unknown[] };
  clarity.q = [];
  window.clarity = clarity;
}

/**
 * Loads GA4 and Microsoft Clarity. Called only after analytics consent is
 * granted (from the consent banner). Safe to call more than once.
 */
export function activateAnalytics() {
  if (activated || typeof window === "undefined") return;
  activated = true;

  // Google Consent Mode v2 — grant analytics storage, keep ad signals denied.
  ensureGtagStub();
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);

  // Microsoft Clarity Consent API v2 — registered before the tag loads.
  ensureClarityStub();
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  injectScript(`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`);
}

/**
 * GA4 event. Safe no-op without analytics consent, and never throws.
 */
export function track(eventName: string, payload?: EventPayload) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Track Event: ${eventName}`, payload || "");
  }

  if (!analyticsAllowed()) return;

  try {
    window.gtag?.("event", eventName, payload || {});
  } catch {
    // never let analytics break the UI
  }
}

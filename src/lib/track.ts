"use client";
import posthog from "posthog-js";
import { analyticsAllowed } from "@/lib/consent";
import { track } from "@/lib/analytics";

/**
 * PostHog capture. Consent gated: it is a safe no-op until the visitor accepts
 * analytics cookies (which is also when PostHog is initialised).
 */
export function trackCta(event: string, props?: Record<string, unknown>) {
  if (!analyticsAllowed() || !posthog.__loaded) return;
  try {
    posthog.capture(event, props);
  } catch {
    // no-op
  }
}

type FestivalEventProps = {
  /** Page the event fired from, e.g. "/anyma-egypt-2027". */
  page: string;
  /** Package id from src/data/festivalPackages.ts, when relevant. */
  packageId?: string;
  /** Extra GA4 params (festival, tier, ...). */
  [key: string]: string | number | boolean | undefined;
};

/** GA4 + PostHog event used by the festival travel pages. */
export function trackFestivalEvent(eventName: string, props: FestivalEventProps) {
  track(eventName, props);
  trackCta(eventName, props);
}

export function trackFestivalPackageView(props: FestivalEventProps) {
  trackFestivalEvent("festival_package_view", props);
}

export function trackWaitlistOpen(props: FestivalEventProps) {
  trackFestivalEvent("waitlist_open", props);
}

export function trackWaitlistSubmit(props: FestivalEventProps) {
  trackFestivalEvent("waitlist_submit", props);
}

export function trackWhatsappClick(props: FestivalEventProps) {
  trackFestivalEvent("whatsapp_click", props);
}

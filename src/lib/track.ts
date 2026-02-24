"use client";
import posthog from "posthog-js";

export function trackCta(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props);
  } catch {
    // no-op
  }
}

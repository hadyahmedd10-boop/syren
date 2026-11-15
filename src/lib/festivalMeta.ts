import type { StaticImageData } from "next/image";
import { EVENT_IMAGES } from "@/lib/images";
import { events, type Event } from "@/data/events";

const FALLBACK = "/images/hero/luxury.jpg";

/** Image overrides for events whose package should use a specific photo. */
export const FESTIVAL_IMAGE_BY_EVENT_SLUG: Record<string, StaticImageData | string> = {
  "anyma-pyramids": EVENT_IMAGES["anyma-pyramids"] ?? FALLBACK,
  "zamna-giza-10th-anniversary": EVENT_IMAGES["zamna-giza"] ?? FALLBACK,
  "starlight-festival-2027": EVENT_IMAGES["exit-festival"] ?? FALLBACK,
};

/**
 * Image for a festival package card. Uses an explicit override when one exists,
 * otherwise the event's own hero photo, so every package shows its event image.
 */
export function getFestivalImage(eventSlug: string): StaticImageData | string {
  const override = FESTIVAL_IMAGE_BY_EVENT_SLUG[eventSlug];
  if (override) return override;
  const event = events.find((e) => e.slug === eventSlug);
  return event ? getEventImage(event) : FALLBACK;
}

/** og:image / twitter:image need a plain string path. */
export function getFestivalImageUrl(eventSlug: string): string {
  const img = getFestivalImage(eventSlug);
  return typeof img === "string" ? img : img.src;
}

/** Image for a generated festival page — the event's own hero, with a fallback. */
export function getEventImage(event: Event): StaticImageData | string {
  return event.heroImage ?? EVENT_IMAGES[event.slug] ?? FALLBACK;
}

export function getEventImageUrl(event: Event): string {
  const img = getEventImage(event);
  return typeof img === "string" ? img : img.src;
}

/**
 * events.ts holds a few obvious `tickets.example.com` placeholders. Never render
 * those as if they were official ticket links.
 */
export function safeTicketUrl(ticketUrl?: string | null): string | null {
  if (!ticketUrl) return null;
  if (ticketUrl.includes("example.com")) return null;
  return ticketUrl;
}

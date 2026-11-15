import type { StaticImageData } from "next/image";
import { EVENT_IMAGES } from "@/lib/images";

const FALLBACK = "/images/hero/luxury.jpg";

/** One image per festival, reused from the existing event image registry. */
export const FESTIVAL_IMAGE_BY_EVENT_SLUG: Record<string, StaticImageData | string> = {
  "anyma-pyramids": EVENT_IMAGES["anyma-pyramids"] ?? FALLBACK,
  "zamna-giza-10th-anniversary": EVENT_IMAGES["zamna-giza"] ?? FALLBACK,
  "starlight-festival-2027": EVENT_IMAGES["exit-festival"] ?? FALLBACK,
};

export function getFestivalImage(eventSlug: string): StaticImageData | string {
  return FESTIVAL_IMAGE_BY_EVENT_SLUG[eventSlug] ?? FALLBACK;
}

/** og:image / twitter:image need a plain string path. */
export function getFestivalImageUrl(eventSlug: string): string {
  const img = getFestivalImage(eventSlug);
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

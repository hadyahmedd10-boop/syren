/**
 * Per-event package overrides.
 *
 * The packages themselves are generated from `src/data/packageTemplates.ts` for
 * every upcoming event, so adding an event to `src/data/events.ts` is enough to
 * publish both tiers. This file only holds the details the owner has confirmed
 * for a specific event: stay windows, hotel options, price, deposit, status and
 * extra inclusions.
 */

import { events } from "./events";
import {
  createPackages,
  type EventPackageOverride,
  type FestivalPackage,
} from "./packageTemplates";

export type {
  FestivalPackage,
  HotelOption,
  PackageInclusion,
  PackageStatus,
  PackageTier,
  StayWindow,
  TierOverride,
  EventPackageOverride,
} from "./packageTemplates";

export {
  FESTIVAL_TICKETS_COPY,
  FESTIVAL_TICKETS_CTA,
  PACKAGE_EXCLUDES,
  TIER_ORDER,
  TIER_TEMPLATES,
  shortEventName,
  ticketsWhatsappMessage,
  deriveEventEndIso,
  suggestedStayWindow,
} from "./packageTemplates";

/** Confirmed per-event details only. Anything absent keeps the template default. */
export const PACKAGE_OVERRIDES: Record<string, EventPackageOverride> = {
  // ÆDEN MILLENNIUM — Great Pyramids of Giza, 19 & 26 March 2027.
  // Two dated stay windows are agreed with suppliers.
  "anyma-pyramids": {
    essentials: {
      stayWindows: [
        { checkIn: "2027-03-17", checkOut: "2027-03-21", nights: 4, showDate: "2027-03-19" },
        { checkIn: "2027-03-24", checkOut: "2027-03-28", nights: 4, showDate: "2027-03-26" },
      ],
    },
    signature: {
      stayWindows: [
        { checkIn: "2027-03-17", checkOut: "2027-03-21", nights: 4, showDate: "2027-03-19" },
        { checkIn: "2027-03-24", checkOut: "2027-03-28", nights: 4, showDate: "2027-03-26" },
      ],
    },
  },

  // Next Giza edition is not dated by the organisers, so no stay window is published.
  "zamna-giza-10th-anniversary": {
    essentials: { stayWindows: [] },
    signature: { stayWindows: [] },
  },

  // November 2027 dates are announced; stay windows are not contracted yet.
  "starlight-festival-2027": {
    essentials: { stayWindows: [] },
    signature: { stayWindows: [] },
  },
};

export const festivalPackages: FestivalPackage[] = createPackages(events, PACKAGE_OVERRIDES);

export function getPackagesByEventSlug(eventSlug: string): FestivalPackage[] {
  return festivalPackages.filter((pkg) => pkg.eventSlug === eventSlug);
}

export function getPackageById(id: string): FestivalPackage | undefined {
  return festivalPackages.find((pkg) => pkg.id === id);
}

/** Events that have a hand-written landing page instead of the generic route. */
export const FESTIVAL_LANDING_BY_EVENT_SLUG: Record<string, string> = {
  "anyma-pyramids": "/anyma-egypt-2027",
  "zamna-giza-10th-anniversary": "/zamna-egypt-travel",
  "starlight-festival-2027": "/starlight-festival-egypt",
};

export function isBespokeLandingSlug(eventSlug: string): boolean {
  return eventSlug in FESTIVAL_LANDING_BY_EVENT_SLUG;
}

/**
 * The single landing-page helper: bespoke page when one exists, otherwise the
 * generated page under /festival-travel-egypt/[slug].
 */
export function getLandingPathForEventSlug(eventSlug: string): string {
  return (
    FESTIVAL_LANDING_BY_EVENT_SLUG[eventSlug] ?? `/festival-travel-egypt/${eventSlug}`
  );
}

export function getLandingPathForPackage(pkg: FestivalPackage): string {
  return getLandingPathForEventSlug(pkg.eventSlug);
}

/** Human label for a package price, honouring the "no invented prices" rule. */
export function formatPackagePrice(pkg: FestivalPackage): string {
  if (pkg.priceFrom === null) return "Price on request";
  return `From ${pkg.currency} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(pkg.priceFrom)}`;
}

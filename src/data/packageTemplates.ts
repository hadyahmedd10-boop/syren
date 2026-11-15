/**
 * Package templates.
 *
 * Two tiers (Essentials and Signature) are defined once here and generated for
 * every upcoming event in `src/data/events.ts`. A newly added event therefore
 * gets both packages with no extra work.
 *
 * Per-event overrides live in `src/data/festivalPackages.ts` and are merged over
 * these defaults. Nothing is invented: hotel names, prices and deposits stay
 * empty unless the owner has filled them in.
 */

import type { Event } from "./events";
import { isEventUpcoming } from "@/lib/eventUtils";

export interface StayWindow {
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  nights: number;
  showDate: string; // ISO date
  /** True when the window is a suggestion derived from the event dates, not a contracted stay. */
  flexible?: boolean;
}

export interface PackageInclusion {
  text: string;
  confirmed: boolean;
}

export interface HotelOption {
  name: string;
  confirmed: boolean;
}

export type PackageStatus = "enquire" | "available" | "sold-out" | "ended";
export type PackageTier = "essentials" | "signature";

export interface FestivalPackage {
  id: string;
  eventSlug: string;
  name: string;
  tier: PackageTier;
  stayWindows: StayWindow[];
  includes: PackageInclusion[];
  excludes: string[];
  hotelOptions: HotelOption[];
  priceFrom: number | null;
  currency: "USD";
  priceNote: string;
  deposit: string | null;
  status: PackageStatus;
  ctaLabel: string;
}

/** Per-tier override for one event. Only these fields may be overridden. */
export interface TierOverride {
  name?: string;
  stayWindows?: StayWindow[];
  hotelOptions?: HotelOption[];
  priceFrom?: number | null;
  deposit?: string | null;
  status?: PackageStatus;
  extraIncludes?: PackageInclusion[];
}

export type EventPackageOverride = Partial<Record<PackageTier, TierOverride>>;

/**
 * Festival tickets are sold by the organisers, not by Syren, and are never part
 * of the package price. This is shown as its own row on every package.
 */
export const FESTIVAL_TICKETS_COPY =
  "We can arrange your festival tickets. Tickets are priced separately, and the tier and price depend on availability when you book.";

export const FESTIVAL_TICKETS_CTA = "Ask about tickets";

export function ticketsWhatsappMessage(packageName: string): string {
  return `Hi Syren — I'd like to ask about festival tickets for ${packageName}.`;
}

/** Shared exclusions. Tickets are excluded because they sit outside the package price. */
export const PACKAGE_EXCLUDES: string[] = [
  "Festival tickets (priced separately — see the tickets note above)",
  "International flights",
  "Visa",
  "Personal expenses",
  "Gratuities",
  "Travel insurance",
];

const ESSENTIALS_INCLUDES: PackageInclusion[] = [
  { text: "Hotel stay arranged by Syren", confirmed: true },
  { text: "Private airport transfers (arrival and departure)", confirmed: true },
  {
    text: "Private festival transfers (hotel to venue and back on event nights)",
    confirmed: true,
  },
  { text: "24/7 Syren WhatsApp concierge", confirmed: true },
];

const SIGNATURE_INCLUDES: PackageInclusion[] = [
  ...ESSENTIALS_INCLUDES,
  {
    text: "Curated guided tours (selection confirmed for each event)",
    confirmed: true,
  },
];

export const TIER_TEMPLATES: Record<PackageTier, { label: string; includes: PackageInclusion[] }> = {
  essentials: { label: "Essentials", includes: ESSENTIALS_INCLUDES },
  signature: { label: "Signature", includes: SIGNATURE_INCLUDES },
};

export const TIER_ORDER: PackageTier[] = ["essentials", "signature"];

/** Short, title-safe event name (drops taglines after a dash or pipe). */
export function shortEventName(title: string): string {
  return title
    .split(/\s*[|—–]\s*/)[0]
    .split(/\s+-\s+/)[0]
    .replace(/\s+/g, " ")
    .trim();
}

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const WEEKDAY_PREFIX = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*,?\s+/i;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function toIso(year: number, monthIndex: number, day: number): string {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function nightsBetween(startIso: string, endIso: string): number {
  const [y1, m1, d1] = startIso.split("-").map(Number);
  const [y2, m2, d2] = endIso.split("-").map(Number);
  const start = Date.UTC(y1, m1 - 1, d1);
  const end = Date.UTC(y2, m2 - 1, d2);
  return Math.round((end - start) / 86_400_000);
}

/**
 * Derive an ISO end date from the published `displayDate`, but only when the
 * text is unambiguous:
 *  - "April 2, 2027"                         → single date
 *  - "May 21–23, 2027"                       → same-month range
 *  - "December 29, 2026 – January 2, 2027"   → cross-month range
 * Anything else (month ranges such as "April–June, 2026", multi-night listings
 * such as "March 19 & 26, 2027") returns null so no stay suggestion is invented.
 */
export function deriveEventEndIso(event: Event): string | null {
  const startIso = event.date;
  const display = event.displayDate?.replace(WEEKDAY_PREFIX, "").trim();
  if (!display) return startIso;

  const sameMonth = display.match(/^([A-Za-z]+)\s+(\d{1,2})\s*[–-]\s*(\d{1,2}),\s*(\d{4})$/);
  if (sameMonth) {
    const month = MONTH_INDEX[sameMonth[1].toLowerCase()];
    if (month === undefined) return null;
    return toIso(Number(sameMonth[4]), month, Number(sameMonth[3]));
  }

  const crossMonth = display.match(
    /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s*[–-]\s*([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/
  );
  if (crossMonth) {
    const month = MONTH_INDEX[crossMonth[4].toLowerCase()];
    if (month === undefined) return null;
    return toIso(Number(crossMonth[6]), month, Number(crossMonth[5]));
  }

  const single = display.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (single) {
    const month = MONTH_INDEX[single[1].toLowerCase()];
    if (month === undefined) return null;
    return toIso(Number(single[3]), month, Number(single[2]));
  }

  return null;
}

/**
 * Suggested stay (flexible): two nights before the event to two nights after.
 * Returns null when no confident end date can be derived.
 */
export function suggestedStayWindow(event: Event): StayWindow | null {
  const endIso = deriveEventEndIso(event);
  if (!endIso) return null;

  const checkIn = addDays(event.date, -2);
  const checkOut = addDays(endIso, 2);
  return {
    checkIn,
    checkOut,
    nights: nightsBetween(checkIn, checkOut),
    showDate: event.date,
    flexible: true,
  };
}

function buildPackage(event: Event, tier: PackageTier, override?: TierOverride): FestivalPackage {
  const template = TIER_TEMPLATES[tier];
  const eventLabel = shortEventName(event.title);

  const stayWindows =
    override?.stayWindows !== undefined
      ? override.stayWindows
      : (() => {
          const suggested = suggestedStayWindow(event);
          return suggested ? [suggested] : [];
        })();

  return {
    id: `${event.slug}-${tier}`,
    eventSlug: event.slug,
    name: override?.name ?? `${eventLabel} ${template.label}`,
    tier,
    stayWindows,
    includes: [...template.includes, ...(override?.extraIncludes ?? [])],
    excludes: PACKAGE_EXCLUDES,
    hotelOptions: override?.hotelOptions ?? [],
    priceFrom: override?.priceFrom ?? null,
    currency: "USD",
    priceNote: "Price on request",
    deposit: override?.deposit ?? null,
    status: override?.status ?? "enquire",
    ctaLabel: "Join the early-access list",
  };
}

/**
 * Generate both packages for every upcoming event that is not excluded.
 * Past events get no generated package unless an override explicitly says so —
 * overrides are only consulted for events that pass the upcoming filter.
 */
export function createPackages(
  events: Event[],
  overrides: Record<string, EventPackageOverride> = {}
): FestivalPackage[] {
  return events
    .filter(isEventUpcoming)
    .filter((event) => !event.excludeFromPackages)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .flatMap((event) => {
      const override = overrides[event.slug] ?? {};
      return TIER_ORDER.map((tier) => buildPackage(event, tier, override[tier]));
    });
}

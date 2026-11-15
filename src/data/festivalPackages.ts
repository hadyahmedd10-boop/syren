export interface StayWindow {
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  nights: number;
  showDate: string; // ISO date
}

export interface PackageInclusion {
  text: string;
  confirmed: boolean;
}

export interface HotelOption {
  name: string;
  confirmed: boolean;
}

export type PackageStatus = 'enquire' | 'available' | 'sold-out' | 'ended';

export interface FestivalPackage {
  id: string;
  eventSlug: string;
  name: string;
  tier: 'essentials' | 'signature';
  stayWindows: StayWindow[];
  includes: PackageInclusion[];
  excludes: string[];
  hotelOptions: HotelOption[];
  priceFrom: number | null;
  currency: 'USD';
  priceNote: string;
  deposit: string | null;
  status: PackageStatus;
  ctaLabel: string;
}

/**
 * Rendering rules (enforced in components):
 * - only items with confirmed === true are rendered
 * - priceFrom === null  => "Price on request" and no deposit line
 * - status 'enquire'    => primary CTA "Join the early-access list"
 * - status 'available'  => primary CTA "Check availability on WhatsApp"
 * - status 'ended'      => "This edition has ended" notice + link to the next festival
 */

export const festivalPackages: FestivalPackage[] = [
  // ---------------------------------------------------------------- ANYMA
  // ÆDEN MILLENNIUM — Great Pyramids of Giza, 19 & 26 March 2027.
  // Only concierge + private airport transfers are confirmed with suppliers.
  {
    id: "anyma-essentials",
    eventSlug: "anyma-pyramids",
    name: "ANYMA Essentials",
    tier: "essentials",
    stayWindows: [
      { checkIn: "2027-03-17", checkOut: "2027-03-21", nights: 4, showDate: "2027-03-19" },
      { checkIn: "2027-03-24", checkOut: "2027-03-28", nights: 4, showDate: "2027-03-26" },
    ],
    includes: [
      { text: "24/7 Syren WhatsApp concierge", confirmed: true },
      { text: "Private airport transfers", confirmed: true },
      { text: "Hotel accommodation (category to be confirmed)", confirmed: false },
      { text: "Event tickets", confirmed: false },
      { text: "Private Giza Plateau tour", confirmed: false },
      { text: "Curated dining experiences", confirmed: false },
    ],
    excludes: [
      "International flights",
      "Event tickets unless confirmed in writing",
      "Personal expenses",
      "Travel insurance",
    ],
    hotelOptions: [],
    priceFrom: null,
    currency: "USD",
    priceNote: "Price on request",
    deposit: null,
    status: "enquire",
    ctaLabel: "Join the early-access list",
  },
  {
    id: "anyma-signature",
    eventSlug: "anyma-pyramids",
    name: "ANYMA Signature",
    tier: "signature",
    stayWindows: [
      { checkIn: "2027-03-17", checkOut: "2027-03-21", nights: 4, showDate: "2027-03-19" },
      { checkIn: "2027-03-24", checkOut: "2027-03-28", nights: 4, showDate: "2027-03-26" },
    ],
    includes: [
      { text: "24/7 Syren WhatsApp concierge", confirmed: true },
      { text: "Private airport transfers", confirmed: true },
      { text: "Luxury hotel accommodation (category to be confirmed)", confirmed: false },
      { text: "Premium event tickets", confirmed: false },
      { text: "Private Pyramids plateau tour", confirmed: false },
      { text: "Private Egyptologist guide", confirmed: false },
      { text: "Gourmet dining experiences", confirmed: false },
    ],
    excludes: [
      "International flights",
      "Event tickets unless confirmed in writing",
      "Personal expenses",
      "Travel insurance",
    ],
    hotelOptions: [],
    priceFrom: null,
    currency: "USD",
    priceNote: "Price on request",
    deposit: null,
    status: "enquire",
    ctaLabel: "Join the early-access list",
  },

  // ---------------------------------------------------------------- ZAMNA
  // No dated package: the next Giza edition is shown as "dates to be announced"
  // on /zamna-egypt-travel. Early-access only, no stay windows published.
  {
    id: "zamna-giza-early-access",
    eventSlug: "zamna-giza-10th-anniversary",
    name: "Zamna Giza Early Access",
    tier: "essentials",
    stayWindows: [],
    includes: [
      { text: "24/7 Syren WhatsApp concierge", confirmed: true },
      { text: "Private airport transfers", confirmed: true },
      { text: "Hotel accommodation (category to be confirmed)", confirmed: false },
      { text: "Festival tickets", confirmed: false },
      { text: "Curated Cairo daytime experiences", confirmed: false },
      { text: "Nile sunset cruise", confirmed: false },
    ],
    excludes: [
      "International flights",
      "Festival tickets unless confirmed in writing",
      "Personal expenses",
      "Travel insurance",
    ],
    hotelOptions: [],
    priceFrom: null,
    currency: "USD",
    priceNote: "Price on request",
    deposit: null,
    status: "enquire",
    ctaLabel: "Join the early-access list",
  },

  // ------------------------------------------------------------ STARLIGHT
  // Festival dates (5–6 November 2027, Giza) are confirmed by the organisers;
  // stay windows and inclusions are not yet contracted, so none are published.
  {
    id: "starlight-essentials",
    eventSlug: "starlight-festival-2027",
    name: "Starlight Essentials",
    tier: "essentials",
    stayWindows: [],
    includes: [
      { text: "24/7 Syren WhatsApp concierge", confirmed: true },
      { text: "Private airport transfers", confirmed: true },
      { text: "Hotel accommodation (category to be confirmed)", confirmed: false },
      { text: "Festival tickets", confirmed: false },
      { text: "Private Giza Plateau tour", confirmed: false },
    ],
    excludes: [
      "International flights",
      "Festival tickets unless confirmed in writing",
      "Personal expenses",
      "Travel insurance",
    ],
    hotelOptions: [],
    priceFrom: null,
    currency: "USD",
    priceNote: "Price on request",
    deposit: null,
    status: "enquire",
    ctaLabel: "Join the early-access list",
  },
];

export function getPackagesByEventSlug(eventSlug: string): FestivalPackage[] {
  return festivalPackages.filter((pkg) => pkg.eventSlug === eventSlug);
}

export function getPackageById(id: string): FestivalPackage | undefined {
  return festivalPackages.find((pkg) => pkg.id === id);
}

/** Landing page for each festival, so every card links to the guide, never a duplicate page. */
export const FESTIVAL_LANDING_BY_EVENT_SLUG: Record<string, string> = {
  "anyma-pyramids": "/anyma-egypt-2027",
  "zamna-giza-10th-anniversary": "/zamna-egypt-travel",
  "starlight-festival-2027": "/starlight-festival-egypt",
};

export function getLandingPathForPackage(pkg: FestivalPackage): string {
  return FESTIVAL_LANDING_BY_EVENT_SLUG[pkg.eventSlug] ?? "/festival-travel-egypt";
}

export function getLandingPathForEventSlug(eventSlug: string): string | null {
  return FESTIVAL_LANDING_BY_EVENT_SLUG[eventSlug] ?? null;
}

/** Human label for a package price, honouring the "no invented prices" rule. */
export function formatPackagePrice(pkg: FestivalPackage): string {
  if (pkg.priceFrom === null) return "Price on request";
  return `From ${pkg.currency} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(pkg.priceFrom)}`;
}

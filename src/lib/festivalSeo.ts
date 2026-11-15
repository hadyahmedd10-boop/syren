/**
 * Shared SEO helpers for the festival travel pages.
 * Every JSON-LD block must describe only what is visible on the page.
 */

export const SITE_URL = "https://www.syrentravel.com";

/** Date the festival content set was last reviewed. Kept static so builds are deterministic. */
export const FESTIVAL_CONTENT_UPDATED_ISO = "2026-11-15";
export const FESTIVAL_CONTENT_UPDATED_LABEL = "15 November 2026";

export const GIZA_VENUE = {
  name: "Great Pyramids of Giza",
  locality: "Giza",
} as const;

export type Faq = { question: string; answer: string };

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Syren Travel",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: "Syrentravel@outlook.com",
    sameAs: [
      "https://www.instagram.com/syrentravel",
      "https://www.linkedin.com/company/syren-travel",
    ],
  };
}

type EventJsonLdInput = {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  path: string;
  image: string;
  venueName?: string;
  city?: string;
  /** Only pass when the organiser is publicly confirmed. Omitted otherwise. */
  organizer?: { name: string; url?: string };
  /** Offers are emitted only when both a real price and the official ticket URL exist. */
  offer?: { ticketUrl: string; price: number; currency: string };
};

export function eventJsonLd(input: EventJsonLdInput) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate ?? input.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}`,
    url: `${SITE_URL}${input.path}`,
    location: {
      "@type": "Place",
      name: input.venueName ?? GIZA_VENUE.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.city ?? GIZA_VENUE.locality,
        addressCountry: "EG",
      },
    },
  };

  if (input.organizer) {
    jsonLd.organizer = {
      "@type": "Organization",
      name: input.organizer.name,
      ...(input.organizer.url ? { url: input.organizer.url } : {}),
    };
  }

  if (input.offer && input.offer.price > 0) {
    jsonLd.offers = {
      "@type": "Offer",
      url: input.offer.ticketUrl,
      price: String(input.offer.price),
      priceCurrency: input.offer.currency,
      availability: "https://schema.org/InStock",
    };
  }

  return jsonLd;
}

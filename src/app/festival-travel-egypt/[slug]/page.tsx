import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import FestivalLanding from "@/components/sections/festival/FestivalLanding";
import { events } from "@/data/events";
import {
  SITE_URL,
  eventJsonLd,
} from "@/lib/festivalSeo";
import type { Faq } from "@/lib/festivalSeo";
import { getEventImage, getEventImageUrl, safeTicketUrl } from "@/lib/festivalMeta";
import {
  deriveEventEndIso,
  getLandingPathForEventSlug,
  getPackagesByEventSlug,
  isBespokeLandingSlug,
  shortEventName,
  suggestedStayWindow,
} from "@/data/festivalPackages";
import { isEventUpcoming } from "@/lib/eventUtils";

const SITE_SUFFIX = " | Syren Egypt";
const PATH_PREFIX = "/festival-travel-egypt";

interface Props {
  params: Promise<{ slug: string }>;
}

function getEventBySlug(slug: string) {
  const normalized = slug.toLowerCase().trim();
  return events.find((event) => event.slug.toLowerCase() === normalized);
}

/** Events that get a generated page: upcoming, not bespoke, not excluded. */
function generatedEvents() {
  return events
    .filter((event) => isEventUpcoming(event))
    .filter((event) => !isBespokeLandingSlug(event.slug))
    .filter((event) => !event.excludeFromPackages)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function generateStaticParams() {
  return generatedEvents().map((event) => ({ slug: event.slug }));
}

function clampTitle(value: string): string {
  const max = 60 - SITE_SUFFIX.length;
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

function clampDescription(value: string): string {
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length <= 155) return trimmed;
  return `${trimmed.slice(0, 154).replace(/\s+\S*$/, "").trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Festival Not Found | Syren Egypt" };

  const path = `${PATH_PREFIX}/${event.slug}`;
  const name = shortEventName(event.title);
  const title = clampTitle(`${name} Travel Packages`);
  const description = clampDescription(
    `${name} ${event.displayDate ?? event.date}, ${event.location}. Syren travel packages: hotel stay arranged by Syren, private airport and venue transfers and a 24/7 WhatsApp concierge.`
  );

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [{ url: getEventImageUrl(event) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getEventImageUrl(event)],
    },
  };
}

export default async function GeneratedFestivalPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();
  // Events with a hand-written guide keep it as their single landing page.
  if (isBespokeLandingSlug(event.slug)) permanentRedirect(getLandingPathForEventSlug(event.slug));

  const path = `${PATH_PREFIX}/${event.slug}`;
  const name = shortEventName(event.title);
  const when = event.displayDate ?? event.date;
  const ticketUrl = safeTicketUrl(event.ticketUrl);
  const packages = getPackagesByEventSlug(event.slug);

  const included = Array.from(
    new Set(packages.flatMap((p) => p.includes.filter((i) => i.confirmed).map((i) => i.text)))
  );
  const notIncluded = Array.from(new Set(packages.flatMap((p) => p.excludes)));

  const endIso = deriveEventEndIso(event);
  const stay = suggestedStayWindow(event);

  const faqs: Faq[] = [
    {
      question: "Are tickets included?",
      answer:
        "Festival tickets are arranged by Syren but priced separately. The tier and price depend on what is available when you book, so tickets sit outside the package price rather than inside it.",
    },
    {
      question: "What is the difference between Essentials and Signature?",
      answer:
        "Essentials covers your hotel arranged by Syren, private airport transfers on arrival and departure, private transfers between your hotel and the venue on event nights, and a 24/7 WhatsApp concierge. Signature adds curated guided tours, with the selection confirmed for each event.",
    },
    {
      question: "How do transfers work?",
      answer:
        "We arrange a private airport transfer on arrival and on departure, plus private transfers between your hotel and the venue on event nights. Every transfer is private to your group and confirmed in writing before you travel.",
    },
    {
      question: "How does booking work?",
      answer:
        "Choose your tier and tell us your dates and group size. We come back with the specific hotel, transfers and inclusions in writing, then quote you directly. Nothing is charged until you approve that written summary.",
    },
  ];

  return (
    <FestivalLanding
      path={path}
      heroImage={getEventImage(event)}
      heroEyebrow="Festival Travel"
      h1={`${name} Travel Packages`}
      heroSubtitle={`${when} — ${event.location}`}
      heroActions={
        <>
          <Link href="#packages" className="syren-btn">
            View travel packages
          </Link>
          <Link href={`/events/${event.slug}`} className="syren-btn-secondary">
            Event details
          </Link>
        </>
      }
      summary={`Syren builds travel packages around ${event.title} on ${when} at ${event.location}. Each package covers a hotel arranged by Syren, private airport and event-night transfers and a 24/7 WhatsApp concierge. Festival tickets are arranged separately and priced by availability.`}
      keyFacts={[
        { label: "Dates", value: when },
        { label: "Venue", value: event.location },
        { label: "Location", value: event.city },
        { label: "Packages", value: "Essentials and Signature — price on request" },
        ...(ticketUrl
          ? [
              {
                label: "Official tickets",
                value: "Tickets on the official platform",
                href: ticketUrl,
              },
            ]
          : []),
        ...(stay
          ? [
              {
                label: "Suggested stay (flexible)",
                value: `${stay.nights} nights — two nights either side of the event`,
              },
            ]
          : []),
      ]}
      packagesEventSlug={event.slug}
      packagesHeading={`${name} travel packages`}
      packagesIntro="Two tiers built around the same trip: everything in Essentials, or Essentials plus curated guided tours. Hotel names, prices and deposits are confirmed in writing for your dates."
      whereToStay={
        <>
          <p>
            The venue is {event.location} in {event.city}. Staying close to it keeps the event-night
            transfer short and avoids a long drive back after the last set.
          </p>
          <p>
            Your hotel is arranged by Syren as part of the package. We match the property to your
            dates, group size and budget, then confirm the hotel and room type in writing before any
            payment.
          </p>
          <p>
            We quote specific hotels once we know your dates and standard rather than publishing
            names we have not confirmed for these dates.
          </p>
        </>
      }
      whereToStayHeading={`Where to stay for ${name}`}
      howToGetThere={
        <>
          <p>
            We arrange private airport transfers on arrival and departure, plus private transfers
            between your hotel and the venue on event nights, as standard on every package.
          </p>
          <p>
            Send us your flight details and group size and we will match the right vehicle for the
            group. See{" "}
            <Link href="/transfers" className="text-accent-gold-ink underline underline-offset-2">
              private transfers in Egypt
            </Link>{" "}
            for what that covers.
          </p>
          <p>
            Always check the organiser&rsquo;s official travel instructions before you travel, as
            gate times and access routes can change closer to the event.
          </p>
        </>
      }
      included={included}
      notIncluded={notIncluded}
      bookingSteps={[
        "Tell us which tier you want and how many people are travelling.",
        "We confirm the hotel, room type and inclusions in writing for your dates.",
        "You approve the written summary — nothing is charged before that.",
        "We send your confirmations, airport pickup details and a plan for your stay.",
        "Your concierge stays reachable on WhatsApp from arrival to departure.",
      ]}
      faqs={faqs}
      cta={{
        heading: `Join the early-access list for ${name}`,
        body: "Hotel names and package pricing are confirmed on request. Join the list and we will send confirmed inclusions and a written quote for your dates.",
        buttonLabel: "Join the early-access list",
        bookingTitle: `${event.title} — early access`,
        bookingSlug: event.slug,
        whatsappMessage: `Hi Syren — I'd like to join the early-access list for ${event.title} (${when}).`,
      }}
      related={[
        { href: "/festival-travel-egypt", label: "Festival travel Egypt" },
        { href: `/events/${event.slug}`, label: `${name} event details` },
        { href: "/transfers", label: "Private transfers" },
        { href: "/is-egypt-safe", label: "Is Egypt safe?" },
        { href: "/experiences", label: "Experiences" },
        { href: "/nile-cruises", label: "Nile cruises" },
      ]}
      eventJsonLd={eventJsonLd({
        name: event.title,
        description: `${event.title} at ${event.location}, ${when}. Syren travel packages with hotel, private transfers and a WhatsApp concierge.`,
        startDate: event.date,
        endDate: endIso ?? event.date,
        path,
        image: getEventImageUrl(event),
        venueName: event.location,
        city: event.city,
      })}
    />
  );
}

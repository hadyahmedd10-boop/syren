import type { Metadata } from "next";
import Link from "next/link";
import FestivalLanding from "@/components/sections/festival/FestivalLanding";
import { getPackagesByEventSlug } from "@/data/festivalPackages";
import { getFestivalImage, getFestivalImageUrl } from "@/lib/festivalMeta";
import { GIZA_VENUE, SITE_URL, eventJsonLd } from "@/lib/festivalSeo";
import { events } from "@/data/events";

const PATH = "/starlight-festival-egypt";
const TITLE = "Starlight Festival Egypt Travel";
const DESCRIPTION =
  "Starlight Festival at the Great Pyramids of Giza, 5–6 November 2027. Plan hotels near Giza, private transfers and festival travel packages with Syren.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    images: [{ url: getFestivalImageUrl("starlight-festival-2027") }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [getFestivalImageUrl("starlight-festival-2027")],
  },
};

const event = events.find((e) => e.slug === "starlight-festival-2027");
const packages = getPackagesByEventSlug("starlight-festival-2027");

const included = Array.from(
  new Set(packages.flatMap((p) => p.includes.filter((i) => i.confirmed).map((i) => i.text)))
);
const notIncluded = Array.from(new Set(packages.flatMap((p) => p.excludes)));

const faqs = [
  {
    question: "When is the Starlight Festival at the Pyramids?",
    answer:
      "Starlight Festival takes place at the Great Pyramids of Giza on 5 and 6 November 2027. It is a two-night outdoor festival, so plan on being in Giza for at least the two show evenings.",
  },
  {
    question: "Where should I stay for the Starlight Festival?",
    answer:
      "Giza hotels keep you closest to the venue and the Pyramids. Central Cairo areas like Zamalek and Downtown suit travellers who want restaurants and nightlife within walking distance, at the cost of a longer transfer on show nights.",
  },
  {
    question: "How do I get Starlight Festival tickets?",
    answer:
      "Tickets are released by the festival organisers through their official channels. We publish a link as soon as it is available and we never resell or add a markup on tickets.",
  },
  {
    question: "Does a Syren package include festival tickets?",
    answer:
      "Tickets are confirmed per package in writing once we agree them with you. We do not list anything as included until it is genuinely confirmed, and nothing is charged before you approve the written summary.",
  },
  {
    question: "How do I get to the venue from Cairo Airport?",
    answer:
      "Cairo International Airport (CAI) is the main gateway. A private transfer to Giza takes roughly 45 to 90 minutes depending on traffic. We arrange airport pickups and hotel-to-venue transfers for festival guests.",
  },
  {
    question: "Is it safe to attend a festival in Egypt?",
    answer:
      "Egypt regularly hosts large international events at the Pyramids, with managed entry and visible security. Use licensed transport, follow the organiser's instructions on site and keep valuables secure. Our Egypt safety guide covers the practical detail.",
  },
  {
    question: "How many nights should I book for the Starlight Festival?",
    answer:
      "Three to four nights covers both show nights with a day to recover or sightsee. Many guests add a Nile cruise or Red Sea stay, which is easy to arrange around a November trip.",
  },
  {
    question: "What should I pack for a November festival in Giza?",
    answer:
      "November days are warm and evenings are cooler, so bring layers, comfortable shoes for standing and a light jacket. Include sun protection for daytime visits and modest clothing for cultural and religious sites.",
  },
  {
    question: "What else is there to do near Giza in November?",
    answer:
      "The Grand Egyptian Museum, Saqqara, Memphis and Old Cairo are all close by. Further south, Aswan and Luxor pair well with a Nile cruise, and the Red Sea is a short flight away for diving and beach time.",
  },
];

export default function StarlightFestivalEgyptPage() {
  return (
    <FestivalLanding
      path={PATH}
      heroImage={getFestivalImage("starlight-festival-2027")}
      heroEyebrow="Festival Travel"
      h1="Starlight Festival Egypt"
      heroSubtitle="Two nights at the Great Pyramids of Giza — 5 & 6 November 2027"
      heroActions={
        <>
          <Link href="#packages" className="syren-btn">
            View travel packages
          </Link>
          {event && (
            <Link href={`/events/${event.slug}`} className="syren-btn-secondary">
              Event details
            </Link>
          )}
        </>
      }
      summary="Starlight Festival brings two nights of electronic music to the Great Pyramids of Giza on 5 and 6 November 2027. Syren is building travel packages around the festival, with Giza stays, private airport and venue transfers and a WhatsApp concierge, so you can plan the trip without chasing separate bookings."
      keyFacts={[
        { label: "Dates", value: "5–6 November 2027 — two nights" },
        { label: "Venue", value: "Great Pyramids of Giza, Giza" },
        { label: "Lineup", value: "To be announced by the organisers" },
        { label: "Syren packages", value: "Available on request — dates to be confirmed" },
      ]}
      packagesEventSlug="starlight-festival-2027"
      packagesHeading="Starlight Festival travel packages"
      packagesIntro="Stay windows and inclusions are being confirmed for the November 2027 edition. Join the early-access list and we will send the confirmed options and a written quote for your dates."
      whereToStay={
        <>
          <p>
            Giza is the closest base to the venue, which matters on a two-night festival — you are
            near the Pyramids and the show gates and can avoid a long cross-city drive after the
            last set.
          </p>
          <p>
            Central Cairo districts such as Zamalek, Downtown and Garden City offer more dining and
            nightlife, roughly 30 to 45 minutes from Giza outside peak traffic. Heliopolis works well
            for short trips because it is close to the airport.
          </p>
          <p>
            November is a popular time in Cairo, so the best-value rooms near Giza go early. We quote
            specific hotels once we know your dates and standard rather than publishing names we have
            not confirmed for the festival period.
          </p>
        </>
      }
      howToGetThere={
        <>
          <p>
            Cairo International Airport (CAI) is the arrival point. Expect roughly 45 to 90 minutes
            by private transfer to Giza, depending on traffic and time of day.
          </p>
          <p>
            We arrange private airport pickups and hotel-to-venue transfers for festival guests. See{" "}
            <Link href="/transfers" className="text-accent-gold-ink underline underline-offset-2">
              private transfers in Egypt
            </Link>{" "}
            for what that covers.
          </p>
          <p>
            Always check the organiser's official travel instructions and gate times before you
            travel, as festival logistics can change closer to the date.
          </p>
        </>
      }
      included={included}
      notIncluded={notIncluded}
      bookingSteps={[
        "Tell us how many people are travelling and which nights of the festival you want to attend.",
        "We confirm the available hotels and inclusions for the November 2027 dates on WhatsApp.",
        "You approve the written summary, and nothing is charged until you do.",
        "We send your confirmations, airport pickup details and a plan for your time in Giza.",
        "Your concierge stays reachable on WhatsApp throughout the festival weekend.",
      ]}
      faqs={faqs}
      cta={{
        heading: "Join the Starlight Festival early-access list",
        body: "Stay windows and package pricing for November 2027 are confirmed on request. Join the list and we will send confirmed inclusions and a written quote for your dates.",
        buttonLabel: "Join the early-access list",
        bookingTitle: "Starlight Festival Egypt — early access",
        bookingSlug: "starlight-festival-2027",
        whatsappMessage:
          "Hi Syren — I'd like to join the early-access list for Starlight Festival at the Pyramids, 5–6 November 2027.",
      }}
      related={[
        { href: "/festival-travel-egypt", label: "Festival travel Egypt" },
        { href: "/anyma-egypt-2027", label: "Anyma Egypt 2027" },
        { href: "/zamna-egypt-travel", label: "Zamna Egypt travel" },
        { href: "/is-egypt-safe", label: "Is Egypt safe?" },
        { href: "/transfers", label: "Private transfers" },
        { href: "/experiences", label: "Experiences" },
        { href: "/nile-cruises", label: "Nile cruises" },
      ]}
      eventJsonLd={eventJsonLd({
        name: "Starlight Festival",
        description:
          "Starlight Festival takes place at the Great Pyramids of Giza on 5 and 6 November 2027.",
        startDate: "2027-11-05",
        endDate: "2027-11-06",
        path: PATH,
        image: getFestivalImageUrl("starlight-festival-2027"),
        venueName: GIZA_VENUE.name,
        city: GIZA_VENUE.locality,
      })}
    />
  );
}

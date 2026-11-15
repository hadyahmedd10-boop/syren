import type { Metadata } from "next";
import Link from "next/link";
import FestivalLanding from "@/components/sections/festival/FestivalLanding";
import { getPackagesByEventSlug } from "@/data/festivalPackages";
import { getFestivalImage, getFestivalImageUrl, safeTicketUrl } from "@/lib/festivalMeta";
import { GIZA_VENUE, SITE_URL, eventJsonLd } from "@/lib/festivalSeo";
import { events } from "@/data/events";

const PATH = "/anyma-egypt-2027";
const TITLE = "Anyma Egypt 2027 Travel Packages";
const DESCRIPTION =
  "Anyma's ÆDEN MILLENNIUM at the Great Pyramids of Giza, 19 & 26 March 2027. Compare Syren travel packages, hotels near Giza and private transfers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    images: [{ url: getFestivalImageUrl("anyma-pyramids") }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [getFestivalImageUrl("anyma-pyramids")],
  },
};

const event = events.find((e) => e.slug === "anyma-pyramids");
const packages = getPackagesByEventSlug("anyma-pyramids");
const ticketUrl = safeTicketUrl(event?.ticketUrl);

const included = Array.from(
  new Set(packages.flatMap((p) => p.includes.filter((i) => i.confirmed).map((i) => i.text)))
);
const notIncluded = Array.from(new Set(packages.flatMap((p) => p.excludes)));

const faqs = [
  {
    question: "When is Anyma playing at the Pyramids of Giza?",
    answer:
      "ANYMA brings his ÆDEN MILLENNIUM show to the Great Pyramids of Giza for two nights, on 19 and 26 March 2027. Each night is a separate show, so you can choose one date or plan for both.",
  },
  {
    question: "Where should I stay for the Anyma Pyramids shows?",
    answer:
      "Giza and the surrounding West Cairo area put you closest to the venue. Central Cairo districts such as Zamalek and Downtown give you more restaurants and nightlife, while Heliopolis is convenient if you fly in and out quickly. We match your hotel to how you want to spend the rest of your trip.",
  },
  {
    question: "How do I get Anyma Pyramids tickets?",
    answer:
      "Tickets are sold through the festival's official channels, not by Syren. We can tell you when booking opens and what each ticket category includes, but we never resell or inflate tickets.",
  },
  {
    question: "Do Syren packages include Anyma tickets?",
    answer:
      "We only list something as included once it is confirmed in writing. Tickets are confirmed per package after we agree them with you, so treat them as confirmed on request rather than guaranteed. Nothing about your package is charged until the inclusions are agreed.",
  },
  {
    question: "How do I get from Cairo Airport to the Pyramids?",
    answer:
      "Cairo International Airport (CAI) is the arrival point for Giza. A private transfer takes roughly 45 to 90 minutes depending on traffic. We arrange door-to-door private transfers as standard for festival guests.",
  },
  {
    question: "Is Egypt safe for a concert at the Pyramids?",
    answer:
      "Egypt hosts large international events at the Pyramids regularly, with visible security and managed entry. As with any big event, use licensed transport, keep to official routes and follow the organiser's on-site instructions. Read our Egypt safety guide for practical detail.",
  },
  {
    question: "How long should I stay in Egypt for Anyma?",
    answer:
      "Our current stay windows are four nights, giving you a full day before the show to settle in and see Giza or the Grand Egyptian Museum. Many guests extend with a Nile cruise or the Red Sea.",
  },
  {
    question: "What should I pack for an outdoor show at the Pyramids?",
    answer:
      "March in Giza is mild by day and can turn cool after dark, so bring layers, comfortable shoes for standing and a light jacket for the evening. Add sun protection for daytime sightseeing and modest clothing for religious and cultural sites.",
  },
  {
    question: "What else can I do in Egypt around the concert?",
    answer:
      "The Grand Egyptian Museum, Old Cairo, Saqqara and Memphis are close to Giza. Further afield, Aswan and Luxor work well with a Nile cruise, and the Red Sea is a short flight for diving and beach days.",
  },
];

export default function AnymaEgypt2027Page() {
  return (
    <FestivalLanding
      path={PATH}
      heroImage={getFestivalImage("anyma-pyramids")}
      heroEyebrow="Festival Travel"
      h1="Anyma Egypt 2027"
      heroSubtitle="ÆDEN MILLENNIUM at the Great Pyramids of Giza — 19 & 26 March 2027"
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
      summary="ANYMA returns to the Great Pyramids of Giza for two nights of his ÆDEN MILLENNIUM show on 19 and 26 March 2027, with electronic music pioneer Jean-Michel Jarre. Syren builds travel packages around each show date, covering Giza stays, private transfers and a WhatsApp concierge throughout your trip."
      keyFacts={[
        { label: "Shows", value: "19 & 26 March 2027 — two nights" },
        { label: "Venue", value: "Great Pyramids of Giza, Giza" },
        { label: "Lineup", value: "ANYMA, with Jean-Michel Jarre — more acts to be announced" },
        ...(ticketUrl
          ? [
              {
                label: "Official tickets",
                value: "Ticket Egypt (official platform)",
                href: ticketUrl,
              },
            ]
          : []),
        { label: "Syren stay windows", value: "17–21 March and 24–28 March 2027 (4 nights)" },
      ]}
      packagesEventSlug="anyma-pyramids"
      packagesHeading="Anyma travel packages"
      packagesIntro="Two tiers, each built around a four-night stay covering one show date. Choose your window and we confirm hotel, transfers and inclusions in writing before any payment."
      whereToStay={
        <>
          <p>
            The venue sits on the Giza Plateau, so Giza is the natural base — you are minutes from
            the Pyramids and the show gates, and you avoid crossing the city on the night.
          </p>
          <p>
            If you would rather be in the middle of Cairo's restaurant and bar scene, look at
            Zamalek and Downtown Cairo, roughly 30 to 45 minutes away outside peak traffic.
            Heliopolis and Nasr City sit closer to the airport and suit short trips.
          </p>
          <p>
            Hotel category depends on your budget: five-star properties with Pyramid views sit at
            the top, with comfortable four-star options in Giza and central Cairo below them. We
            quote specific hotels once we know your dates and standard, rather than publishing
            names we have not confirmed for these dates.
          </p>
        </>
      }
      howToGetThere={
        <>
          <p>
            Fly into Cairo International Airport (CAI). From there, a private transfer to your Giza
            hotel takes roughly 45 to 90 minutes depending on traffic and time of day.
          </p>
          <p>
            We arrange private airport pickups and hotel-to-venue transfers as standard for festival
            guests. See{" "}
            <Link href="/transfers" className="text-accent-gold underline underline-offset-2">
              private transfers in Egypt
            </Link>{" "}
            for what that covers.
          </p>
          <p>
            Always check the organiser's official travel instructions and any published gate-opening
            times before you travel, as these can change closer to the show.
          </p>
        </>
      }
      included={included}
      notIncluded={notIncluded}
      bookingSteps={[
        "Tell us which show date and package tier you want, and how many people are travelling.",
        "We come back on WhatsApp with the specific hotel, room type and confirmed inclusions for your dates.",
        "You approve the written summary and pay only what has been agreed — nothing is charged before that.",
        "We issue your confirmations, airport pickup details and a day-by-day plan for your stay.",
        "Your concierge stays reachable on WhatsApp for the whole trip, including on show day.",
      ]}
      faqs={faqs}
      cta={{
        heading: "Join the Anyma early-access list",
        body: "Package pricing for the March 2027 shows is confirmed on request. Join the list and we will send confirmed inclusions and a written quote for your dates.",
        buttonLabel: "Join the early-access list",
        bookingTitle: "Anyma Egypt 2027 — early access",
        bookingSlug: "anyma-pyramids",
        whatsappMessage:
          "Hi Syren — I'd like to join the early-access list for Anyma at the Pyramids, 19 & 26 March 2027.",
      }}
      related={[
        { href: "/festival-travel-egypt", label: "Festival travel Egypt" },
        { href: "/zamna-egypt-travel", label: "Zamna Egypt travel" },
        { href: "/starlight-festival-egypt", label: "Starlight Festival Egypt" },
        { href: "/is-egypt-safe", label: "Is Egypt safe?" },
        { href: "/transfers", label: "Private transfers" },
        { href: "/experiences", label: "Experiences" },
        { href: "/nile-cruises", label: "Nile cruises" },
      ]}
      eventJsonLd={eventJsonLd({
        name: "ANYMA — ÆDEN MILLENNIUM",
        description:
          "ANYMA performs ÆDEN MILLENNIUM at the Great Pyramids of Giza on 19 and 26 March 2027, with Jean-Michel Jarre.",
        startDate: "2027-03-19",
        endDate: "2027-03-26",
        path: PATH,
        image: getFestivalImageUrl("anyma-pyramids"),
        venueName: GIZA_VENUE.name,
        city: GIZA_VENUE.locality,
      })}
    />
  );
}

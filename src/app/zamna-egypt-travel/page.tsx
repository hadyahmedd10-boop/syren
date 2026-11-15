import type { Metadata } from "next";
import Link from "next/link";
import FestivalLanding from "@/components/sections/festival/FestivalLanding";
import { getPackagesByEventSlug } from "@/data/festivalPackages";
import { getFestivalImage, getFestivalImageUrl, safeTicketUrl } from "@/lib/festivalMeta";
import { SITE_URL, eventJsonLd } from "@/lib/festivalSeo";
import { events } from "@/data/events";

const PATH = "/zamna-egypt-travel";
const TITLE = "Zamna Egypt 2027 Travel Packages";
const DESCRIPTION =
  "Zamna Egypt travel: Giza Plateau edition history, the Sharm El-Sheikh 20–22 November 2026 edition and early access for the next Pyramids dates.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    images: [{ url: getFestivalImageUrl("zamna-giza-10th-anniversary") }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [getFestivalImageUrl("zamna-giza-10th-anniversary")],
  },
};

const southSinai = events.find((e) => e.slug === "zamna-south-sinai");
const southSinaiTickets = safeTicketUrl(southSinai?.ticketUrl);
const packages = getPackagesByEventSlug("zamna-giza-10th-anniversary");

const included = Array.from(
  new Set(packages.flatMap((p) => p.includes.filter((i) => i.confirmed).map((i) => i.text)))
);
const notIncluded = Array.from(new Set(packages.flatMap((p) => p.excludes)));

const faqs = [
  {
    question: "Where is the next Zamna Giza edition?",
    answer:
      "Dates for the next Zamna edition at the Pyramids of Giza have not been confirmed. Zamna's 10th Anniversary World Tour is expected to return to Giza, and we publish dates here only once the organisers confirm them. Join the early-access list and we will tell you first.",
  },
  {
    question: "Where is Zamna playing in Egypt in November 2026?",
    answer:
      "Zamna's South Sinai edition takes place in Khoroum Valley, in the Sharm El-Sheikh region of South Sinai, from 20 to 22 November 2026. It is a three-day desert festival, a very different setting from the Giza Plateau.",
  },
  {
    question: "How do I get Zamna Egypt tickets?",
    answer:
      "Tickets are sold through Zamna's official channels, not by Syren. We link to the official source and we never resell tickets or add a markup.",
  },
  {
    question: "What did the previous Zamna Giza editions look like?",
    answer:
      "Zamna debuted at the Giza Plateau in April 2025 and returned for a second Giza edition in April 2026, both built around the Pyramids as a backdrop. Those editions are in the past, so they are shown here for context rather than as bookable trips.",
  },
  {
    question: "How do I get to the Giza Plateau for a Zamna edition?",
    answer:
      "Fly into Cairo International Airport (CAI), then take a private transfer to Giza — roughly 45 to 90 minutes depending on traffic. For the South Sinai edition, Sharm El-Sheikh International Airport (SSH) is the gateway to Khoroum Valley.",
  },
  {
    question: "Where should I stay for a Zamna Giza edition?",
    answer:
      "Giza hotels put you closest to the venue. Central Cairo districts such as Zamalek and Downtown offer more dining and nightlife, with a longer transfer on festival nights.",
  },
  {
    question: "Is it safe to travel to Egypt for Zamna?",
    answer:
      "Egypt hosts large international events at the Pyramids and in South Sinai with managed entry and visible security. Use licensed transport, follow the organiser's instructions and keep to official routes. Our Egypt safety guide covers the practical detail.",
  },
  {
    question: "How long should I stay for a Zamna Egypt trip?",
    answer:
      "For a Giza edition, three to four nights covers the festival with time for the Grand Egyptian Museum and Giza itself. For the South Sinai edition, add travel days from Sharm El-Sheikh and consider a few nights by the Red Sea.",
  },
  {
    question: "What else can I do in Egypt around Zamna?",
    answer:
      "Near Giza you have the Grand Egyptian Museum, Saqqara and Old Cairo. From Sharm El-Sheikh you have Red Sea diving and desert trips. Aswan and Luxor pair well with a Nile cruise if you have a week or more.",
  },
];

export default function ZamnaEgyptTravelPage() {
  return (
    <FestivalLanding
      path={PATH}
      heroImage={getFestivalImage("zamna-giza-10th-anniversary")}
      heroEyebrow="Festival Travel"
      h1="Zamna Egypt Travel"
      heroSubtitle="Giza Plateau edition history, the upcoming South Sinai edition and early access for the next Giza dates"
      heroActions={
        <>
          <Link href="#packages" className="syren-btn">
            Early-access packages
          </Link>
          {southSinai && (
            <Link href={`/events/${southSinai.slug}`} className="syren-btn-secondary">
              South Sinai edition
            </Link>
          )}
        </>
      }
      summary="Zamna has become one of Egypt's flagship electronic music brands, debuting at the Giza Plateau in April 2025 and returning to Giza in April 2026. The next Giza edition's dates are not yet confirmed, while Zamna's South Sinai edition runs 20–22 November 2026 in Khoroum Valley. Syren arranges hotels, private transfers and concierge support around each edition."
      keyFacts={[
        { label: "Next Giza edition", value: "Dates to be announced" },
        { label: "South Sinai edition", value: "20–22 November 2026, Khoroum Valley" },
        { label: "Edition history", value: "Giza Plateau debut April 2025, second Giza edition April 2026" },
        ...(southSinaiTickets
          ? [
              {
                label: "Official tickets",
                value: "Techno and Chill (official platform)",
                href: southSinaiTickets,
              },
            ]
          : []),
      ]}
      packagesEventSlug="zamna-giza-10th-anniversary"
      packagesHeading="Zamna travel packages"
      packagesIntro="There are no confirmed dates for the next Giza edition yet, so no dated package is on sale. Join the early-access list and we will open bookings the moment the organisers confirm dates."
      extraSections={
        <div className="space-y-6">
          <div className="rounded-2xl border border-accent-gold/40 bg-accent-gold/5 p-6">
            <h2 className="font-serif text-2xl text-text-primary">
              Next Giza edition: dates to be announced
            </h2>
            <p className="mt-3 leading-relaxed text-text-secondary">
              Zamna's next edition at the Pyramids of Giza has not been confirmed by the organisers.
              We do not publish dates until they are official. Join the early-access list and we will
              contact you as soon as the dates and packages are confirmed.
            </p>
            <Link href="#packages" className="syren-btn mt-5">
              Join the early-access list
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="font-serif text-2xl text-text-primary">Zamna in Egypt: edition history</h2>
            <div className="mt-4 space-y-5">
              <div className="border-b border-border pb-5">
                <h3 className="font-medium text-text-primary">April 2025 — Giza Plateau debut</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  Zamna's first Egyptian edition brought electronic music to the Great Pyramids of
                  Giza, establishing the Pyramids as a festival backdrop.
                </p>
              </div>
              <div className="border-b border-border pb-5">
                <h3 className="font-medium text-text-primary">April 2026 — second Giza edition</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  Zamna returned to the Giza Plateau for a second edition, with multi-day programming
                  and daytime experiences across Cairo and Giza.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-text-primary">
                  November 2026 — South Sinai, Sharm El-Sheikh region
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  Zamna moves to Khoroum Valley in South Sinai for a three-day desert edition, 20–22
                  November 2026, near Sharm El-Sheikh.
                </p>
                {southSinai && (
                  <Link
                    href={`/events/${southSinai.slug}`}
                    className="mt-2 inline-block text-sm text-accent-gold underline underline-offset-2"
                  >
                    South Sinai edition details
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      }
      whereToStay={
        <>
          <p>
            For a Giza edition, Giza is the closest base to the venue. Central Cairo districts such
            as Zamalek, Downtown and Garden City offer more restaurants and nightlife, roughly 30 to
            45 minutes from Giza outside peak traffic.
          </p>
          <p>
            For the South Sinai edition, most travellers stay in Sharm El-Sheikh or at desert camps
            near Khoroum Valley. Accommodation there is organised around the festival itself, and we
            confirm options once the edition's logistics are published.
          </p>
          <p>
            We quote specific hotels once we know your dates and standard rather than publishing
            names we have not confirmed.
          </p>
        </>
      }
      howToGetThere={
        <>
          <p>
            For Giza editions, fly into Cairo International Airport (CAI), then transfer to Giza —
            roughly 45 to 90 minutes depending on traffic. For the South Sinai edition, Sharm
            El-Sheikh International Airport (SSH) is the gateway to Khoroum Valley.
          </p>
          <p>
            We arrange private airport pickups and hotel-to-venue transfers for festival guests. See{" "}
            <Link href="/transfers" className="text-accent-gold underline underline-offset-2">
              private transfers in Egypt
            </Link>{" "}
            for what that covers.
          </p>
          <p>
            Always check the organiser's official travel instructions for the edition you are
            attending, as desert and Pyramids logistics differ.
          </p>
        </>
      }
      included={included}
      notIncluded={notIncluded}
      bookingSteps={[
        "Tell us which Zamna edition you are interested in and how many people are travelling.",
        "Once the organisers confirm dates, we send confirmed hotels, inclusions and a written quote on WhatsApp.",
        "You approve the written summary and pay only what has been agreed.",
        "We issue your confirmations, airport pickup details and a plan for your stay.",
        "Your concierge stays reachable on WhatsApp for the whole trip.",
      ]}
      faqs={faqs}
      cta={{
        heading: "Join the Zamna Egypt early-access list",
        body: "There are no confirmed dates for the next Giza edition yet. Join the list and we will contact you the moment dates and packages are announced.",
        buttonLabel: "Join the early-access list",
        bookingTitle: "Zamna Egypt — early access",
        bookingSlug: "zamna-giza-10th-anniversary",
        whatsappMessage:
          "Hi Syren — I'd like to join the early-access list for the next Zamna Egypt edition.",
      }}
      related={[
        { href: "/festival-travel-egypt", label: "Festival travel Egypt" },
        { href: "/anyma-egypt-2027", label: "Anyma Egypt 2027" },
        { href: "/starlight-festival-egypt", label: "Starlight Festival Egypt" },
        { href: "/is-egypt-safe", label: "Is Egypt safe?" },
        { href: "/transfers", label: "Private transfers" },
        { href: "/experiences", label: "Experiences" },
        { href: "/nile-cruises", label: "Nile cruises" },
      ]}
      eventJsonLd={
        southSinai
          ? eventJsonLd({
              name: "ZAMNA South Sinai",
              description:
                "Zamna's South Sinai edition takes place in Khoroum Valley, near Sharm El-Sheikh, from 20 to 22 November 2026.",
              startDate: "2026-11-20",
              endDate: "2026-11-22",
              path: PATH,
              image: getFestivalImageUrl("zamna-giza-10th-anniversary"),
              venueName: "Khoroum Valley",
              city: "South Sinai",
            })
          : undefined
      }
    />
  );
}

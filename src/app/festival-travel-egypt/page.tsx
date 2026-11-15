import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroShell from "@/components/ui/HeroShell";
import JsonLd from "@/components/seo/JsonLd";
import FestivalEnquiryCta from "@/components/sections/festival/FestivalEnquiryCta";
import { HERO_IMAGES } from "@/lib/images";
import { getFestivalImage } from "@/lib/festivalMeta";
import {
  FESTIVAL_CONTENT_UPDATED_LABEL,
  SITE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
} from "@/lib/festivalSeo";
import {
  formatPackagePrice,
  getPackagesByEventSlug,
  type FestivalPackage,
} from "@/data/festivalPackages";

const PATH = "/festival-travel-egypt";
const TITLE = "Egypt Festival Travel Packages";
const DESCRIPTION =
  "Plan Egypt festival travel in 2027: Anyma and Starlight at the Pyramids plus Zamna. Compare packages, hotels, private transfers and how booking works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMAGES.home.src],
  },
};

type FestivalEntry = {
  name: string;
  eventSlug: string;
  when: string;
  where: string;
  status: string;
  href: string;
  blurb: string;
};

const FESTIVALS: FestivalEntry[] = [
  {
    name: "Anyma — ÆDEN MILLENNIUM",
    eventSlug: "anyma-pyramids",
    when: "19 & 26 March 2027",
    where: "Great Pyramids of Giza",
    status: "Early access open",
    href: "/anyma-egypt-2027",
    blurb:
      "Two nights from ANYMA at the Pyramids, announced with Jean-Michel Jarre. Two package tiers, each built around a four-night stay.",
  },
  {
    name: "Starlight Festival",
    eventSlug: "starlight-festival-2027",
    when: "5–6 November 2027",
    where: "Great Pyramids of Giza",
    status: "Early access open",
    href: "/starlight-festival-egypt",
    blurb:
      "A two-night festival at the Pyramids in November 2027. Stay windows and inclusions are confirmed on request.",
  },
  {
    name: "Zamna Egypt",
    eventSlug: "zamna-giza-10th-anniversary",
    when: "Next Giza edition: dates to be announced",
    where: "Giza Plateau and South Sinai",
    status: "Early access open",
    href: "/zamna-egypt-travel",
    blurb:
      "Giza Plateau debut April 2025 and a second Giza edition April 2026, with a South Sinai edition 20–22 November 2026.",
  },
];

const festivalPackagesFor = (slug: string): FestivalPackage[] => getPackagesByEventSlug(slug);

const faqs = [
  {
    question: "Which Egypt festivals does Syren cover?",
    answer:
      "We currently build travel packages around three festivals: Anyma's ÆDEN MILLENNIUM at the Pyramids in March 2027, Starlight Festival at the Pyramids in November 2027, and Zamna, whose next Giza edition is not yet dated. Each has its own guide on this site.",
  },
  {
    question: "What is actually included in an Egypt festival travel package?",
    answer:
      "Every package that is live includes a 24/7 Syren WhatsApp concierge and private airport transfers — those are the inclusions we are able to confirm today. Hotels, tickets and experiences are confirmed per package in writing before any payment, and nothing unconfirmed is shown as included.",
  },
  {
    question: "How do I get festival tickets?",
    answer:
      "Tickets are sold by each festival's official channels, never by Syren. We link to the official source where one exists and we never resell tickets or add a markup.",
  },
  {
    question: "Where should I stay near the Pyramids?",
    answer:
      "Giza is closest to the venue. Central Cairo districts such as Zamalek and Downtown offer more dining and nightlife, roughly 30 to 45 minutes away outside peak traffic. We quote specific hotels once we know your dates and standard.",
  },
  {
    question: "How do I get to a Pyramids concert?",
    answer:
      "Fly into Cairo International Airport (CAI), then take a private transfer to Giza — roughly 45 to 90 minutes depending on traffic. We arrange hotel-to-venue transfers on show nights so you are not relying on taxis after the last set.",
  },
  {
    question: "Is Egypt safe for international festival travellers?",
    answer:
      "Egypt hosts large international events at the Pyramids with managed entry and visible security. Use licensed transport, follow the organiser's instructions and keep to official routes. Our Egypt safety guide covers the practical detail.",
  },
  {
    question: "How long should I stay in Egypt for a festival?",
    answer:
      "Three to four nights covers a single festival with time to see Giza and the Grand Egyptian Museum. If you want Luxor, Aswan or the Red Sea too, plan a week or more — we build that around your show dates.",
  },
  {
    question: "What should I pack for a Pyramids festival?",
    answer:
      "Layers for warm days and cooler nights, comfortable shoes for standing, sun protection for sightseeing and modest clothing for cultural and religious sites.",
  },
  {
    question: "Can I combine a festival with a Nile cruise or Red Sea stay?",
    answer:
      "Yes. Many guests add a Nile cruise between Aswan and Luxor or a few nights on the Red Sea. We sequence those around your festival dates so nothing clashes.",
  },
];

export default function FestivalTravelEgyptPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Festival Travel", path: PATH },
    ]),
    faqJsonLd(faqs),
    organizationJsonLd(),
  ];

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Festival Travel"
        title="Egypt Festival Travel Packages"
        subtitle="Anyma, Starlight Festival and Zamna — packages, hotels near the Pyramids, private transfers and a WhatsApp concierge"
        altText="Egypt festival travel packages — Syren"
        heightClassName="min-h-[58vh] md:min-h-[68vh]"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/anyma-egypt-2027" className="syren-btn">
            Anyma Egypt 2027
          </Link>
          <Link href="/events" className="syren-btn-secondary">
            Browse all events
          </Link>
        </div>
      </HeroShell>

      {/* Answer-first summary */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <p className="text-lg leading-relaxed text-text-secondary">
            Syren builds festival travel packages around Egypt's biggest concerts at the Pyramids.
            You get a hotel matched to your dates and standard, private airport and venue transfers,
            and a WhatsApp concierge for the whole trip. Tickets stay with the festival's official
            channels — we never resell or mark them up.
          </p>
        </div>
      </section>

      {/* Festival cards */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            The festivals we cover
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FESTIVALS.map((festival) => (
              <article
                key={festival.eventSlug}
                className="syren-card syren-card-hover flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={getFestivalImage(festival.eventSlug)}
                    alt={`${festival.name} — festival travel Egypt`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute left-3 top-3">
                    <span className="rounded bg-accent-gold px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                      {festival.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl text-text-primary">{festival.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{festival.when}</p>
                  <p className="text-sm text-text-secondary">{festival.where}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {festival.blurb}
                  </p>
                  <Link href={festival.href} className="syren-btn-secondary mt-5 justify-center">
                    Read the festival guide
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Package comparison */}
      <section className="section border-t border-border bg-surface/30">
        <div className="container-x mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            What each package includes
          </h2>
          <p className="mt-3 max-w-3xl text-text-secondary leading-relaxed">
            Only confirmed inclusions are listed. Anything still being agreed with suppliers is
            confirmed in writing per package, and prices are quoted directly rather than published
            if they are not yet agreed.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FESTIVALS.map((festival) => {
              const packages = festivalPackagesFor(festival.eventSlug);
              const confirmed = Array.from(
                new Set(
                  packages.flatMap((p) =>
                    p.includes.filter((i) => i.confirmed).map((i) => i.text)
                  )
                )
              );
              const statuses = Array.from(new Set(packages.map((p) => p.status)));
              const prices = Array.from(new Set(packages.map((p) => formatPackagePrice(p))));
              return (
                <div
                  key={festival.eventSlug}
                  className="flex flex-col rounded-2xl border border-border bg-background p-6"
                >
                  <h3 className="font-serif text-lg text-text-primary">{festival.name}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                        Dates
                      </dt>
                      <dd className="mt-1 text-text-primary">{festival.when}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                        Confirmed inclusions
                      </dt>
                      <dd className="mt-1">
                        {confirmed.length > 0 ? (
                          <ul className="space-y-1 text-text-secondary">
                            {confirmed.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-text-secondary">
                            Confirmed in writing per package.
                          </span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                        Price
                      </dt>
                      <dd className="mt-1 text-text-primary">
                        {prices.length > 0 ? prices.join(" · ") : "Price on request"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                        Status
                      </dt>
                      <dd className="mt-1 text-text-primary">
                        {statuses.length === 1
                          ? statuses[0] === "enquire"
                            ? "Early access — dates and inclusions confirmed on request"
                            : statuses[0].charAt(0).toUpperCase() + statuses[0].slice(1)
                          : "Confirmed on request"}
                      </dd>
                    </div>
                  </dl>
                  <Link href={festival.href} className="mt-5 text-sm text-accent-gold underline underline-offset-2">
                    See {festival.name} packages
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">How booking works</h2>
          <ol className="mt-6 space-y-3">
            {[
              "Choose your festival and package tier, and tell us how many people are travelling.",
              "We confirm the hotel, room type and inclusions in writing for your dates.",
              "You approve the written summary — nothing is charged before that.",
              "We send your confirmations, airport pickup details and a plan for your stay.",
              "Your concierge stays reachable on WhatsApp from arrival to departure.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3 text-text-secondary">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-gold/50 text-xs font-semibold text-accent-gold">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            Festival travel FAQs
          </h2>
          <div className="mt-4 border-t border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
                  <span className="font-serif text-lg text-text-primary transition-colors group-hover:text-accent-gold">
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 text-xl leading-none text-text-secondary transition-transform duration-300 group-open:rotate-45 group-hover:text-accent-gold"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FestivalEnquiryCta
        page={PATH}
        heading="Tell us which festival you are planning"
        body="Send us your festival, rough dates and group size. We will confirm available hotels and inclusions in writing, then quote you directly."
        buttonLabel="Start a festival enquiry"
        bookingTitle="Festival travel Egypt — enquiry"
        bookingSlug="festival-travel-egypt"
        whatsappMessage="Hi Syren — I'd like help planning festival travel in Egypt."
      />

      {/* Related links + last updated */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl text-text-primary">Keep planning</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/anyma-egypt-2027" className="syren-btn-secondary">
              Anyma Egypt 2027
            </Link>
            <Link href="/starlight-festival-egypt" className="syren-btn-secondary">
              Starlight Festival Egypt
            </Link>
            <Link href="/zamna-egypt-travel" className="syren-btn-secondary">
              Zamna Egypt travel
            </Link>
            <Link href="/is-egypt-safe" className="syren-btn-secondary">
              Is Egypt safe?
            </Link>
            <Link href="/transfers" className="syren-btn-secondary">
              Private transfers
            </Link>
            <Link href="/experiences" className="syren-btn-secondary">
              Experiences
            </Link>
            <Link href="/nile-cruises" className="syren-btn-secondary">
              Nile cruises
            </Link>
          </div>
          <p className="mt-8 border-t border-border pt-4 text-sm text-text-secondary">
            Last updated: {FESTIVAL_CONTENT_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <JsonLd data={jsonLd} />
    </main>
  );
}

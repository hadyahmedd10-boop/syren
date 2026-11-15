import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroShell from "@/components/ui/HeroShell";
import JsonLd from "@/components/seo/JsonLd";
import FestivalEnquiryCta from "@/components/sections/festival/FestivalEnquiryCta";
import { HERO_IMAGES } from "@/lib/images";
import { getEventImage } from "@/lib/festivalMeta";
import {
  FESTIVAL_CONTENT_UPDATED_LABEL,
  SITE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  type Faq,
} from "@/lib/festivalSeo";
import { events } from "@/data/events";
import { getPastEvents, getUpcomingEvents } from "@/lib/eventUtils";
import {
  TIER_TEMPLATES,
  formatPackagePrice,
  getLandingPathForEventSlug,
  getPackagesByEventSlug,
  FESTIVAL_TICKETS_COPY,
} from "@/data/festivalPackages";

const PATH = "/festival-travel-egypt";
const TITLE = "Egypt Festival Travel Packages";
const DESCRIPTION =
  "Egypt festival travel packages for every upcoming event: hotels, private airport and event transfers and a WhatsApp concierge. Tickets arranged separately.";

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

const faqs: Faq[] = [
  {
    question: "Which Egypt festivals does Syren cover?",
    answer:
      "We build travel packages around every upcoming event on our events calendar, from Pyramids concerts and festivals to El Gouna and Red Sea dates. Each event has its own guide with the Essentials and Signature packages.",
  },
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
      "Choose your event and tier, and tell us your dates and group size. We confirm the hotel, transfers and inclusions in writing, then quote you directly. Nothing is charged until you approve that written summary.",
  },
  {
    question: "Where should I stay for a festival in Egypt?",
    answer:
      "As close to the venue as you can, especially for multi-night events. We match your hotel to the venue, your dates and your standard, and quote specific properties once they are confirmed for those dates.",
  },
  {
    question: "Is Egypt safe for international festival travellers?",
    answer:
      "Egypt hosts large international events with managed entry and visible security. Use licensed transport, follow the organiser's instructions and keep to official routes. Our Egypt safety guide covers the practical detail.",
  },
  {
    question: "Can I combine a festival with a Nile cruise or Red Sea stay?",
    answer:
      "Yes. Many guests add a Nile cruise between Aswan and Luxor or a few nights on the Red Sea. We sequence those around your event dates so nothing clashes.",
  },
];

const bookingSteps = [
  "Choose your event and package tier, and tell us how many people are travelling.",
  "We confirm the hotel, room type and inclusions in writing for your dates.",
  "You approve the written summary — nothing is charged before that.",
  "We send your confirmations, airport pickup details and a plan for your stay.",
  "Your concierge stays reachable on WhatsApp from arrival to departure.",
];

export default function FestivalTravelEgyptPage() {
  const upcoming = getUpcomingEvents(events)
    .filter((event) => !event.excludeFromPackages)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const ended = getPastEvents(events).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
        subtitle="Every upcoming event on our calendar — hotels arranged by Syren, private airport and venue transfers and a WhatsApp concierge"
        altText="Egypt festival travel packages — Syren"
        heightClassName="min-h-[58vh] md:min-h-[68vh]"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/events" className="syren-btn">
            Browse all events
          </Link>
          <Link href="/transfers" className="syren-btn-secondary">
            Private transfers
          </Link>
        </div>
      </HeroShell>

      {/* Answer-first summary */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <p className="text-lg leading-relaxed text-text-secondary">
            Syren builds festival travel packages around every upcoming event on our calendar. Each
            event has two tiers — Essentials and Signature — covering a hotel arranged by Syren,
            private airport and venue transfers and a WhatsApp concierge for the whole trip. Festival
            tickets are arranged separately and priced by availability.
          </p>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            Upcoming festivals and events
          </h2>
          <p className="mt-3 max-w-3xl text-text-secondary leading-relaxed">
            Both tiers are available for every event below. Hotel names, prices and deposits are
            confirmed in writing for your dates rather than published unverified.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => {
              const packages = getPackagesByEventSlug(event.slug);
              const href = getLandingPathForEventSlug(event.slug);
              return (
                <article
                  key={event.slug}
                  className="syren-card syren-card-hover flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={getEventImage(event)}
                      alt={`${event.title} — festival travel Egypt`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute left-3 top-3">
                      <span className="rounded bg-accent-gold px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                        Early access
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl text-text-primary">{event.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {event.displayDate ?? event.date}
                    </p>
                    <p className="text-sm text-text-secondary">{event.location}</p>

                    <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                      {packages.map((pkg) => (
                        <li
                          key={pkg.id}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <span className="text-text-primary">{pkg.name}</span>
                          <span className="shrink-0 text-accent-gold">
                            {formatPackagePrice(pkg)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-1 flex-col justify-end gap-2">
                      <Link href={href} className="syren-btn-secondary justify-center">
                        Read the {event.title} guide
                      </Link>
                      <Link
                        href={`/events/${event.slug}`}
                        className="text-center text-xs text-text-secondary transition-colors hover:text-accent-gold"
                      >
                        Event details →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two tiers */}
      <section className="section border-t border-border bg-surface/30">
        <div className="container-x mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            Two tiers for every event
          </h2>
          <p className="mt-3 max-w-3xl text-text-secondary leading-relaxed">
            Both tiers run on the same trip. Only confirmed inclusions are listed, and anything still
            being agreed with suppliers is confirmed in writing per package.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {(["essentials", "signature"] as const).map((tier) => (
              <div
                key={tier}
                className="flex flex-col rounded-2xl border border-accent-gold/30 bg-background p-6"
              >
                <h3 className="font-serif text-xl text-text-primary">
                  {TIER_TEMPLATES[tier].label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {TIER_TEMPLATES[tier].includes.map((item) => (
                    <li key={item.text}>• {item.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background p-6">
            <h3 className="font-serif text-lg text-text-primary">Festival tickets</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">
              {FESTIVAL_TICKETS_COPY}
            </p>
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">How booking works</h2>
          <ol className="mt-6 space-y-3">
            {bookingSteps.map((step, index) => (
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

      {/* Ended editions */}
      {ended.length > 0 && (
        <section className="section border-t border-border bg-background">
          <div className="container-x mx-auto max-w-4xl">
            <details className="group border-t border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
                <span className="font-serif text-2xl text-text-primary transition-colors group-hover:text-accent-gold">
                  Ended editions ({ended.length})
                </span>
                <span
                  className="shrink-0 text-xl leading-none text-text-secondary transition-transform duration-300 group-open:rotate-45 group-hover:text-accent-gold"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <ul className="pb-5">
                {ended.map((event) => (
                  <li
                    key={event.slug}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border py-3 last:border-0"
                  >
                    <span className="text-text-primary">{event.title}</span>
                    <span className="text-sm text-text-secondary">
                      {event.displayDate ?? event.date}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>
      )}

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
        body="Send us your event, rough dates and group size. We will confirm available hotels and inclusions in writing, then quote you directly."
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
            <Link href="/events" className="syren-btn-secondary">
              All events
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

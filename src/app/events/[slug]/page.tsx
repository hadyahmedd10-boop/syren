import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SafeImage from "@/components/ui/SafeImage";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import BookingTrigger from "@/components/ui/BookingTrigger";
import EventMobileBar from "@/components/ui/EventMobileBar";
import EventCard from "@/components/sections/events/EventCard";
import { isEventUpcoming } from "@/lib/eventUtils";

interface Props {
  params: Promise<{ slug: string }>;
}

function normalizeSlug(value: string) {
  return value.toLowerCase().trim();
}

function getEventBySlug(slug: string) {
  const normalized = normalizeSlug(slug);
  return events.find(
    (event) => normalizeSlug(event.slug) === normalized
  );
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) {
    return {
      title: "Event Not Found | Syren",
      description: "The requested event could not be found.",
    };
  }
  const url = `/events/${event.slug}`;
  const baseDesc = event.seoDescription ?? event.shortDescription ?? event.fullDescription;
  let description = `${baseDesc} Travel packages and concierge access available through Syren Egypt.`;
  if (description.length < 150) {
    description = `${description} Private logistics, hotel curation, and local guidance for a seamless festival experience under the pyramids.`;
  }
  if (description.length > 160) {
    description = `${description.slice(0, 157).trimEnd()}…`;
  }
  const makeTitle = (s: string) => {
    const base = `${s} | Syren`;
    return base.length <= 60 ? base : `${base.slice(0, 57).trimEnd()}…`;
  };
  const finalTitle = makeTitle(event.seoTitle ?? event.title);
  return {
    title: finalTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description,
      url: `https://www.syrentravel.com/events/${event.slug}`,
      images: [
        {
          url:
            typeof event.heroImage === "string"
              ? event.heroImage
              : event.heroImage.src,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  function parseStartDate(date: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const dows = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+/i;
    const cleaned = date.replace(dows, "").trim();
    const monthMap: Record<string, string> = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };
    const mdyRange = cleaned.match(/^([A-Za-z]+)\s+(\d{1,2})(?:-(\d{1,2}))?,\s*(\d{4})$/);
    if (mdyRange) {
      const month = monthMap[mdyRange[1].toLowerCase()];
      const day = String(mdyRange[2]).padStart(2, "0");
      const year = mdyRange[4];
      return `${year}-${month}-${day}`;
    }
    const dowMdy = cleaned.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
    if (dowMdy) {
      const day = String(dowMdy[1]).padStart(2, "0");
      const month = monthMap[dowMdy[2].toLowerCase()];
      const year = dowMdy[3];
      return `${year}-${month}-${day}`;
    }
    return date;
  }

  function parseEndDate(date: string) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const dows = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+/i;
    const cleaned = date.replace(dows, "").trim();
    const monthMap: Record<string, string> = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };
    const mdyRange = cleaned.match(/^([A-Za-z]+)\s+(\d{1,2})(?:-(\d{1,2}))?,\s*(\d{4})$/);
    if (mdyRange) {
      const month = monthMap[mdyRange[1].toLowerCase()];
      const dayEnd = String(mdyRange[3] || mdyRange[2]).padStart(2, "0");
      const year = mdyRange[4];
      return `${year}-${month}-${dayEnd}`;
    }
    const dowMdy = cleaned.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
    if (dowMdy) {
      const day = String(dowMdy[1]).padStart(2, "0");
      const month = monthMap[dowMdy[2].toLowerCase()];
      const year = dowMdy[3];
      return `${year}-${month}-${day}`;
    }
    return date;
  }

  const heroSrc =
    typeof event.heroImage === "string"
      ? event.heroImage
      : event.heroImage.src;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.syrentravel.com";
  const isIso = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d);
  const startDateIso = parseStartDate(event.date);
  const endDateParsed = parseEndDate(event.date);
  const endDateIso = isIso(endDateParsed) ? endDateParsed : startDateIso;
  const hasLineup = Array.isArray(event.lineup) && event.lineup.length > 0;
  const isTBA =
    hasLineup &&
    event.lineup.length === 1 &&
    event.lineup[0].toUpperCase() === "TBA";
  const performer = isTBA
    ? { "@type": "PerformingGroup", name: "TBA" }
    : hasLineup
      ? event.lineup.map((artist) => ({ "@type": "PerformingGroup", name: artist }))
      : { "@type": "PerformingGroup", name: "TBA" };
  const offers = {
    "@type": "Offer",
    url: event.ticketUrl,
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: new Date().toISOString().split("T")[0],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.fullDescription,
    startDate: startDateIso,
    endDate: endDateIso,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressCountry: "EG",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Syren Travel",
      url: "https://www.syrentravel.com",
    },
    image: heroSrc,
    url: `${siteUrl}/events/${event.slug}`,
    offers,
    performer,
  };

  return (
    <main className="min-h-screen bg-background">
      <EventMobileBar title={event.title} slug={event.slug} />
      <ExitIntentPopup experienceTitle={event.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section id="hero" className="relative min-h-[70vh] w-full">
        <SafeImage
          src={heroSrc}
          alt={`${event.title} - Syren Travel Egypt`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container-x mx-auto max-w-7xl px-6 text-white">
            <h1 className="font-serif text-4xl md:text-6xl text-accent-gold">{event.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="syren-pill bg-black/60 border border-border text-white/90">{event.category}</span>
              {(event.displayDate ?? event.date) && (
                <span className="syren-pill bg-black/60 border border-border text-white/90">{event.displayDate ?? event.date}</span>
              )}
              {event.minAge && (
                <span className="syren-pill bg-black/60 border border-border text-white/90">{event.minAge}</span>
              )}
            </div>
          </div>
        </div>
      </section>
      
      

      <section className="section bg-background border-t border-accent-gold/20 py-12">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <span className="uppercase tracking-wider text-accent-gold text-xs">About the Event</span>
              <p className="mt-2 font-serif text-lg leading-relaxed text-text-secondary">{event.fullDescription}</p>
            </div>
            <aside className="md:col-span-1 md:sticky md:top-24">
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/30 p-6 divide-y divide-border/30">
                <div className="pb-4">
                  <div className="flex items-center gap-2 text-text-primary">
                    <span aria-hidden>📅</span>
                    <span className="font-serif">Date & Time</span>
                  </div>
                  <div className="mt-2">
                    {(event.displayDate ?? event.date) && <div className="font-serif text-xl text-text-primary">{event.displayDate ?? event.date}</div>}
                    <div className="text-sm text-text-secondary">
                      {event.time && <span>{event.time}</span>}
                      {event.time && event.duration && <span> · </span>}
                      {event.duration && <span>{event.duration}</span>}
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <div className="flex items-center gap-2 text-text-primary">
                    <span aria-hidden>📍</span>
                    <span className="font-serif">Location</span>
                  </div>
                  <div className="mt-2">
                    {event.location && <div className="font-serif text-text-primary">{event.location}</div>}
                    {event.city && <div className="text-sm text-text-secondary">{event.city}</div>}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-2 text-text-primary">
                    <span aria-hidden>🎟️</span>
                    <span className="font-serif">Tickets & Packages</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <a
                      href={`https://wa.me/201016015723?text=${encodeURIComponent(`Hi Syren, I'm interested in booking a travel package for ${event.title} on ${event.displayDate ?? event.date}. I'd love to know more about available packages.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="syren-btn-primary w-full justify-center px-5 py-3.5 text-sm shadow-[0_0_20px_rgba(196,160,82,0.15)] border border-accent-gold/30"
                    >
                      Book Travel Package
                    </a>
                    {event.ticketUrl && (
                      <Link
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="syren-btn w-full text-accent-gold"
                      >
                        Get Tickets
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {event.lineup && event.lineup.length > 0 && (
        <section className="section bg-background border-t border-accent-gold/20 pt-8 pb-12">
          <div className="container-x mx-auto max-w-7xl">
            <span className="uppercase tracking-wider text-accent-gold text-xs">The Lineup</span>
            <div className="mt-3">
            {event.lineup.length === 1 && event.lineup[0].toUpperCase() === "TBA" ? (
              <div className="flex justify-center">
                <span className="syren-pill border border-accent-gold text-accent-gold font-serif bg-transparent">
                  To Be Announced
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {event.lineup.map((artist) => (
                  <span
                    key={artist}
                    className="syren-pill border border-accent-gold text-accent-gold font-serif bg-transparent"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            )}
            </div>
          </div>
        </section>
      )}

      {event.afterParties && event.afterParties.length > 0 && (
        <section className="section bg-background border-t border-accent-gold/20 pt-8 pb-12">
          <div className="container-x mx-auto max-w-7xl">
            <span className="uppercase tracking-wider text-accent-gold text-xs">After Parties</span>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.afterParties.map((ap) => {
                const venueTba = ap.venue.trim().toUpperCase() === "TBA";
                return (
                  <div
                    key={`${ap.name}-${ap.date}-${ap.time ?? "tba"}`}
                    className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-6 backdrop-blur-sm"
                  >
                    <h3 className="font-serif text-xl text-text-primary mb-2">{ap.name}</h3>
                    <div className="text-sm text-text-secondary space-y-1">
                      {venueTba ? (
                        <span className="syren-pill border border-accent-gold text-accent-gold font-serif bg-transparent">
                          Venue TBA
                        </span>
                      ) : (
                        <div>{ap.venue}</div>
                      )}
                      <div>{ap.date}</div>
                      {ap.time && <div>{ap.time}</div>}
                    </div>
                    {Array.isArray(ap.lineup) && ap.lineup.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {ap.lineup.map((artist) => (
                          <span
                            key={artist}
                            className="syren-pill border border-accent-gold text-accent-gold font-serif bg-transparent text-[11px]"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    )}
                    {ap.ticketUrl && (
                      <div className="mt-4">
                        <Link
                          href={ap.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full border border-accent-gold/70 text-accent-gold px-3 py-3 min-h-[44px] text-sm uppercase tracking-[0.2em] hover:bg-accent-gold/10 transition-colors"
                        >
                          Get Tickets
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {event.houseRules && event.houseRules.length > 0 && (
        <section className="section bg-background border-t border-accent-gold/20 py-12">
          <div className="container-x mx-auto max-w-7xl">
            <span className="uppercase tracking-wider text-accent-gold text-xs">House Rules</span>
            <div className="mt-3 rounded-2xl border border-accent-gold/30 bg-surface/30 p-6">
              <ul className="list-disc pl-6 grid md:grid-cols-2 gap-y-2">
                {event.houseRules.map((rule) => (
                  <li key={rule} className="text-text-secondary">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Explore More Events */}
      <section className="section bg-background border-t border-accent-gold/20 pt-8 pb-12">
        <div className="container-x mx-auto max-w-7xl">
          <span className="uppercase tracking-wider text-accent-gold text-xs">Explore More</span>
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events
              .filter((e) => e.slug !== event.slug && isEventUpcoming(e))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 3)
              .map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
          </div>
        </div>
      </section>

      <section className="section bg-background border-t border-accent-gold/20 py-12">
        <div className="container-x mx-auto max-w-7xl">
              <div className="rounded-2xl bg-black/90 border border-accent-gold/30 p-8 md:p-10 text-white grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="font-serif text-3xl md:text-4xl mb-3">{event.curatedPackage.title}</h2>
              <p className="text-white/80 mb-6">{event.curatedPackage.description}</p>
              <ul className="grid md:grid-cols-2 gap-3 mb-6">
                {event.curatedPackage.inclusions.map((inc) => (
                  <li key={inc} className="text-white/80">
                    ✓ {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-stretch md:items-start gap-3">
              <BookingTrigger
                title={event.slug === "exit-festival" ? "Exit at the Pyramids Package" : event.title}
                slug={event.slug}
                basePriceAmount={undefined}
                basePriceCurrency="USD"
                buttonLabel={event.slug === "exit-festival" ? "Reserve Your Exit Package →" : "Reserve Now →"}
              />
              {event.slug === "exit-festival" && (
                <Link href="/experiences/exit-at-the-pyramids" className="syren-btn-secondary w-full md:w-auto text-center">
                  View Full Package Details →
                </Link>
              )}
              {event.slug !== "exit-festival" && (
                <Link href="/experiences" className="syren-btn-secondary w-full md:w-auto">
                  Explore Experiences →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="container-x mx-auto max-w-7xl px-6 py-4">
        <Link href="/events" className="text-sm text-accent-gold hover:underline">
          ← Back to Events
        </Link>
      </div>
    </main>
  );
}

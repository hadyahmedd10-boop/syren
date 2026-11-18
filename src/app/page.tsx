import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/layout/SectionHeader";
import HomeScrollManager from "@/components/layout/HomeScrollManager";
import FinalCTA from "@/components/sections/FinalCTA";
import EmailSignup from "@/components/sections/EmailSignup";
import Testimonials from "@/components/sections/Testimonials";
import OnTheGround from "@/components/sections/OnTheGround";
import { SOCIAL_LINKS } from "@/config/social";
import { getServiceClaims, SERVICE_PILLARS } from "@/config/claims";
import { events } from "@/data/events";
import { getFeaturedUpcomingEvents } from "@/lib/eventUtils";
import { experiences } from "@/data/experiences";
import { excursions } from "@/data/excursions";
import { HERO_IMAGES } from "@/lib/images";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Syren | Luxury Egypt Travel & Curated Experiences" },
  description:
    "Private luxury journeys through Egypt — Cairo, the Nile, the Red Sea and hidden sanctuaries, curated by local experts for the discerning traveler.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Syren | Luxury Egypt Travel & Curated Experiences",
    description:
      "Private luxury journeys through Egypt — Cairo, the Nile, the Red Sea and hidden sanctuaries, curated by local experts.",
    url: "/",
    siteName: "Syren",
    images: [{ url: "/images/hero/luxury.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

/** Uniform header rhythm for every homepage section (Phase 3). */
const HEADER_MB = "mb-8 md:mb-10";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Syren",
    "image": "https://www.syrentravel.com/images/hero/luxury.jpg",
    "@id": "https://www.syrentravel.com/",
    "url": "https://www.syrentravel.com/",
    "telephone": "+201000000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zamalek",
      "addressLocality": "Cairo",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0444,
      "longitude": 31.2357
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      SOCIAL_LINKS.instagram,
    ]
  };

  const serviceClaims = getServiceClaims();
  const trustItems = [...SERVICE_PILLARS, ...serviceClaims];

  return (
    <HomeScrollManager>
      <div className="min-h-screen bg-background">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 1 — HERO */}
        <section className="section-hero">
          <Hero />
        </section>

        {/* 2 — BEST SELLING TOURS */}
        <section id="map-of-syren" className="scroll-mt-20 bg-background py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl container-x">
            <SectionHeader
              label="Curated Journeys"
              title="Best Selling Tours"
              description="Immerse yourself in authentic experiences crafted by local experts who know and love these destinations."
              align="center"
              className={HEADER_MB}
            />
            <Reveal>
              <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {experiences.slice(0, 3).map((exp) => {
                  const img = typeof exp.heroImage === "string" ? exp.heroImage : exp.heroImage.src;
                  const price = exp.price?.amount;
                  const currency = exp.price?.currency || "USD";
                  const formatted =
                    typeof price === "number"
                      ? currency === "EUR"
                        ? `€${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}`
                        : `${currency.toUpperCase()} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(price)}`
                      : null;
                  return (
                    <Link key={exp.slug} href={`/experiences/${exp.slug}`} className="group block h-full">
                      <article className="flex h-full flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                          <Image
                            src={img}
                            alt={`${exp.title} — Syren Travel Egypt`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-3 text-left">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Private Tour</div>
                          <div className="mt-1 text-text-primary">{exp.title}</div>
                          <div className="mt-1 text-text-primary">
                            {formatted ? `From ${formatted}` : "Custom pricing"}
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
            <div className="mt-10 flex justify-center">
              <Link href="/experiences" className="syren-btn-secondary">
                View All Tours →
              </Link>
            </div>
          </div>
        </section>

        {/* 3 — TRUST STRIP (one strip of four) */}
        <section className="bg-surface/30 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl container-x">
            <SectionHeader
              label="Why Syren"
              title="Why travel with Syren"
              description="Four things every Syren journey is built around."
              align="center"
              className={HEADER_MB}
            />
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-2">
                  <span aria-hidden="true" className="text-accent-gold-ink">✓</span>
                  <span className="font-serif text-base text-text-primary md:text-lg">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — DAY EXCURSIONS */}
        <section className="bg-background py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl container-x">
            <SectionHeader
              label="Day Excursions"
              title="Explore More of Egypt"
              description="Half-day and full-day trips, arranged privately around your own stay."
              align="center"
              className={HEADER_MB}
            />
            <Reveal>
              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {excursions.slice(0, 4).map((ex) => (
                  <Link key={ex.slug} href={`/excursions/${ex.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/30 transition-all hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={ex.heroImage as string}
                          alt={`${ex.title} — Egypt Excursion`}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-3 text-left">
                        <h3 className="font-serif text-lg text-text-primary">{ex.title}</h3>
                        <div className="text-sm text-text-secondary">
                          <span>{ex.duration}</span>
                          {ex.city ? <span> · {ex.city}</span> : null}
                        </div>
                        <div className="mt-auto pt-2 text-sm text-accent-gold-ink">
                          {typeof ex.priceCents === "number" ? `From USD ${Math.round(ex.priceCents / 100)}` : "Custom"}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </Reveal>
            <div className="mt-10 flex justify-center">
              <Link href="/excursions" className="syren-btn-secondary">
                View All Excursions →
              </Link>
            </div>
          </div>
        </section>

        {/* 5 — ON THE GROUND */}
        <OnTheGround />

        {/* 6 — TRAVELER STORIES */}
        <section className="bg-background py-12 md:py-16 lg:py-20">
          <Testimonials />
        </section>

        {/* 7 — WHO WE ARE */}
        <section className="bg-surface/30 py-12 md:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 container-x md:grid-cols-2">
            <div className="text-center md:text-left">
              <SectionHeader
                label="Who We Are"
                title="Egypt, Like You've Never Seen Before"
                description="An Egypt-based travel agency built by local experts who plan every journey personally."
                align="responsive"
                className={HEADER_MB}
              />
              <div className="mt-2">
                <Link href="/about" className="syren-btn-secondary">
                  Learn Our Story →
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src={HERO_IMAGES.northCoast}
                alt="Egypt's North Coast shoreline at golden hour"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 8 — UPCOMING EVENTS (with festival travel row) */}
        {(() => {
          const featuredEvents = getFeaturedUpcomingEvents(events);
          if (featuredEvents.length === 0) return null;
          return (
            <section className="bg-background py-12 md:py-16 lg:py-20">
              <div className="mx-auto max-w-7xl container-x">
                <SectionHeader
                  label="Upcoming Events"
                  title="Don't Miss These"
                  description="Concerts, festivals and cultural nights happening across Egypt."
                  align="center"
                  className={HEADER_MB}
                />
                <div className="space-y-6">
                  {featuredEvents.slice(0, 3).map((ev) => {
                    const img = typeof ev.heroImage === "string" ? ev.heroImage : ev.heroImage.src;
                    return (
                      <article key={ev.slug} className="grid gap-4 overflow-hidden rounded-2xl border border-accent-gold/30 bg-surface/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] md:grid-cols-12 md:gap-6">
                        <div className="relative min-h-[220px] md:col-span-5">
                          <Image
                            src={img}
                            alt={`${ev.title} — Egypt Event`}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                        </div>
                        <div className="flex flex-col p-5 text-left md:col-span-7 md:p-6">
                          <h3 className="font-serif text-2xl text-text-primary md:text-3xl">{ev.title}</h3>
                          <div className="mt-2 text-sm text-text-secondary">
                            <span>{ev.displayDate ?? ev.date}</span>
                            {ev.city ? <span> · {ev.city}</span> : null}
                          </div>
                          <p className="mt-3 font-sans font-light text-text-secondary">{ev.shortDescription}</p>
                          <div className="mt-4">
                            <Link href={`/events/${ev.slug}`} className="syren-btn-secondary">
                              View Event →
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-center">
                  <Link href="/events" className="syren-btn-secondary">
                    View All Events →
                  </Link>
                </div>

                {/* Festival travel — one slim row, folded in from its own section */}
                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-accent-gold/30 bg-surface/30 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
                  <p className="text-left text-sm text-text-secondary">
                    <span className="font-serif text-base text-text-primary">Festivals at the Pyramids</span>
                    {" — "}hotels near Giza, private transfers and a 24/7 WhatsApp concierge.
                  </p>
                  <Link href="/festival-travel-egypt" className="syren-btn-secondary shrink-0">
                    Explore Festival Travel →
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}

        {/* 9 — BE FIRST TO KNOW */}
        <EmailSignup />

        {/* 10 — FINAL CTA */}
        <section id="experience-egypt" className="scroll-mt-20">
          <FinalCTA />
        </section>
      </div>
    </HomeScrollManager>
  );
}

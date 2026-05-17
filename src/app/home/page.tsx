import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/layout/SectionHeader";
// replaced Popular Experiences with Best Selling Tours cards
// Removed OurVision per final homepage spec
import HomeScrollManager from "@/components/layout/HomeScrollManager";
import FinalCTA from "@/components/sections/FinalCTA";
import EmailSignup from "@/components/sections/EmailSignup";
import Testimonials from "@/components/sections/Testimonials";
import { SOCIAL_LINKS } from "@/config/social";
import { events } from "@/data/events";
import { getFeaturedUpcomingEvents } from "@/lib/eventUtils";
import { experiences } from "@/data/experiences";
import { excursions } from "@/data/excursions";
import { HERO_IMAGES } from "@/lib/images";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Compass, Phone, Calendar, Globe } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Syren — Luxury Travel Experiences in Egypt",
  description:
    "Private luxury journeys through Egypt. Discover Cairo, the Nile, the Red Sea, and hidden sanctuaries — curated for the discerning traveler.",
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    title: "Syren Travel",
    description: "Luxury travel, designed with soul.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Syren",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Syren",
    "image": `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    "@id": process.env.NEXT_PUBLIC_SITE_URL,
    "url": process.env.NEXT_PUBLIC_SITE_URL,
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

  return (
    <HomeScrollManager>
      <main className="min-h-screen bg-background">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="section-hero">
          <Hero />
        </section>

        {/* SECTION 2 — BEST SELLING EXPERIENCES */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl container-x text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary">Best Selling Tours</h2>
            <p id="best-selling-subtitle" className="mt-2 text-sm text-text-secondary max-w-3xl mx-auto text-center">
              Immerse yourself in authentic experiences crafted by local experts who know and love these destinations.
            </p>
            <Reveal>
              <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                    <Link key={exp.slug} href={`/experiences/${exp.slug}`} className="group block">
                      <article className="flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                          <Image
                            src={img}
                            alt={`${exp.title} - Syren Travel Egypt`}
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
            <div className="mt-10">
              <Link href="/experiences" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-text-primary/10 text-text-primary border border-text-primary/30 hover:bg-text-primary/20 transition-colors">
                View All
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-text-secondary">
              <span className="inline-flex items-center gap-2"><span>✓</span> Local led tours</span>
              <span className="inline-flex items-center gap-2"><span>✓</span> Tailored Experience</span>
              <span className="inline-flex items-center gap-2"><span>✓</span> Crew on all experiences</span>
              <span className="inline-flex items-center gap-2"><span>✓</span> Flexible & Safe Payments</span>
              <span className="inline-flex items-center gap-2"><span>✓</span> Sustainable Travel</span>
            </div>
          </div>
        </section>

        {/* SECTION 3 — TRUST STRIP */}
        <section className="py-16 bg-surface/30">
          <div className="mx-auto max-w-7xl container-x">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
              {[
                { t: "Licensed Guides", s: "Egyptologist expertise" },
                { t: "Private Transfers", s: "Door-to-door comfort" },
                { t: "24/7 Concierge", s: "Always on your side" },
                { t: "Secure Payments", s: "Stripe protected" },
              ].map((x) => (
                <div key={x.t} className="py-4">
                  <div className="font-serif text-lg text-text-primary">{x.t}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — POPULAR EXCURSIONS */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl container-x">
            <SectionHeader title="Explore More of Egypt" label="DAY EXCURSIONS" align="center" />
            <Reveal>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-1 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:snap-none">
                {excursions.slice(0, 4).map((ex) => (
                  <Link key={ex.slug} href={`/excursions/${ex.slug}`} className="group block min-w-[260px] w-full snap-start md:min-w-0">
                    <article className="rounded-2xl border border-border bg-surface/30 overflow-hidden hover:border-accent-gold/50 transition-colors hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={ex.heroImage as string}
                          alt={`${ex.title} - Egypt Excursion`}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3 text-left">
                        <h3 className="font-serif text-lg text-text-primary">{ex.title}</h3>
                        <div className="text-sm text-text-secondary">
                          <span>{ex.duration}</span>
                          {ex.city ? <span> · {ex.city}</span> : null}
                        </div>
                        <div className="mt-2 text-accent-gold text-sm">
                          {typeof ex.priceCents === "number" ? `From USD ${Math.round(ex.priceCents / 100)}` : "Custom"}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </Reveal>
            <div className="mt-8">
              <Link href="/excursions" className="syren-btn-secondary">View All Excursions →</Link>
            </div>
          </div>
          
        </section>

        {/* SECTION 5 — TRUSTPILOT REVIEWS */}
        <section className="py-16 bg-background">
          <Testimonials />
        </section>

        {/* SECTION 7 — OUR MISSION */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl container-x grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-center">
              <SectionHeader title="Egypt, Like You've Never Seen Before" label="WHO WE ARE" align="center" />
              <p className="font-serif text-lg text-text-secondary leading-relaxed font-light">
                Syren is Egypt's premier inbound travel agency — born from a love of this country and a belief that every traveler deserves to experience it properly. We are local experts, concierge advisors, and passionate guides. We don't just book trips. We craft memories.
              </p>
              <div className="mt-6">
                <Link href="/about" className="syren-btn-secondary">Learn Our Story →</Link>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-border">
              <Image
                src={HERO_IMAGES.home}
                alt="Syren Egypt"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
          
        </section>

        {/* SECTION 8 — FEATURED UPCOMING EVENTS */}
        {(() => {
          const featuredEvents = getFeaturedUpcomingEvents(events);
          if (featuredEvents.length === 0) return null;
          return (
            <section className="py-16 bg-surface/30">
              <div className="mx-auto max-w-7xl container-x">
                <SectionHeader title="Don't Miss These" label="UPCOMING EVENTS" align="center" />
                <div className="mt-6 space-y-6">
                  {featuredEvents.slice(0, 3).map((ev) => {
                  const img = typeof ev.heroImage === "string" ? ev.heroImage : ev.heroImage.src;
                  return (
                    <article key={ev.slug} className="grid md:grid-cols-12 gap-4 md:gap-6 rounded-2xl border border-accent-gold/30 bg-surface/30 overflow-hidden hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
                      <div className="md:col-span-5 relative min-h-[220px]">
                        <Image
                          src={img}
                          alt={`${ev.title} - Egypt Event`}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                      </div>
                      <div className="md:col-span-7 p-5 md:p-6 flex flex-col text-left">
                        <h3 className="font-serif text-2xl md:text-3xl text-text-primary"> {ev.title}</h3>
                        <div className="mt-2 text-sm text-text-secondary">
                          <span>{ev.displayDate ?? ev.date}</span>
                          {ev.city ? <span> · {ev.city}</span> : null}
                        </div>
                        <p className="mt-3 font-sans text-text-secondary font-light">{ev.shortDescription}</p>
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
                <div className="mt-8">
                  <Link href="/events" className="syren-btn-secondary">View All Events →</Link>
                </div>
              </div>
            </section>
          );
        })()}

{/* SECTION 9 — FROM THE BLOG */}
<section className="py-16 bg-background">
  <div className="mx-auto max-w-7xl container-x">
    <SectionHeader title="Travel Guides" label="FROM THE BLOG" align="center" />
    <div className="grid gap-6 md:grid-cols-3">
      {[
        { href: "/is-egypt-safe", title: "Is Egypt Safe to Travel?", desc: "Practical safety notes and local insight." },
        { href: "/best-time-to-visit-egypt", title: "Best Time to Visit Egypt", desc: "Seasons, weather and ideal trip planning." },
        { href: "/egypt-travel-tips", title: "Egypt Travel Tips", desc: "Concierge advice to make it seamless." },
      ].map((g) => (
        <Link key={g.href} href={g.href} className="group block">
          <article className="relative h-48 rounded-2xl overflow-hidden border border-border hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
            <Image
              src={HERO_IMAGES.home}
              alt={g.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <h3 className="font-serif text-accent-gold text-lg">{g.title}</h3>
              <p className="text-white/80 text-sm mt-1">{g.desc}</p>
            </div>
          </article>
        </Link>
      ))}
    </div>
    <div className="mt-8 text-center">
      <Link href="/guides" className="syren-btn-secondary">View All Guides →</Link>
    </div>
  </div>
</section>

        {/* SECTION 10 — EMAIL SIGNUP */}
        <EmailSignup />

        {/* Final CTA */}
        <section id="experience-egypt" className="section-tight">
          <FinalCTA />
        </section>
      </main>
    </HomeScrollManager>
  );
}

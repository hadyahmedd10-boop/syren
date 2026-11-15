import type { Metadata } from "next";
import Link from "next/link";
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";
import EventsFilter from "@/components/sections/events/EventsFilter";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "International Events in Egypt",
  description: "Discover Egypt's most iconic international events in 2026. Zamna, Sandbox, NOART and more — with travel packages and concierge access from Syren.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "International Events in Egypt",
    description: "Discover Egypt's most iconic international events in 2026. Zamna, Sandbox, NOART and more — with travel packages and concierge access from Syren.",
    url: "https://www.syrentravel.com/events",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell backgroundImage="/images/hero/events.jpg" objectPosition="center 80%" altText="International Events in Egypt - Syren Travel Egypt" eyebrow="Upcoming Events" title="International Events in Egypt" subtitle="From world-renowned music festivals to exclusive art exhibitions, discover the most exciting events happening in Egypt." heightClassName="min-h-[55vh] md:min-h-[65vh]" />
      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Explore Upcoming Events" label="Culture & Music" />
        </div>
      </section>
      <section className="border-t border-border bg-surface/30 py-10">
        <div className="container-x mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Festival travel</p>
              <h2 className="mt-2 font-serif text-2xl md:text-3xl text-text-primary">
                Travel packages for Egypt&rsquo;s biggest festivals
              </h2>
              <p className="mt-2 max-w-2xl text-text-secondary">
                Hotels near the Pyramids, private airport transfers and a 24/7 WhatsApp concierge for
                Anyma, the Starlight Festival and Zamna.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/festival-travel-egypt" className="syren-btn-secondary">
                Festival Travel Egypt
              </Link>
              <Link href="/anyma-egypt-2027" className="syren-btn-secondary">
                Anyma 2027
              </Link>
              <Link href="/starlight-festival-egypt" className="syren-btn-secondary">
                Starlight
              </Link>
              <Link href="/zamna-egypt-travel" className="syren-btn-secondary">
                Zamna
              </Link>
            </div>
          </div>
        </div>
      </section>
      <EventsFilter />
    </main>
  );
}

import type { Metadata } from "next";
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";
import EventsFilter from "@/components/sections/events/EventsFilter";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "International Events in Egypt | Syren",
  description: "Discover Egypt's most iconic international events in 2026. Zamna, Sandbox, NOART and more — with travel packages and concierge access from Syren.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "International Events in Egypt | Syren",
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
      <EventsFilter />
    </main>
  );
}

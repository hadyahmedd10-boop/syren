import type { Metadata } from "next";
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";
import { events, eventCategories } from "@/data/events";
import Link from "next/link";
import Image from "next/image";
import EventsCategoryNav from "@/components/sections/events/EventsCategoryNav";
import EventCard from "@/components/sections/events/EventCard";
import FeaturedEvent from "@/components/sections/events/FeaturedEvent";

export const metadata: Metadata = {
  title: "International Events in Egypt | Syren",
  description: "Discover the most exciting international events happening in Egypt. From music festivals to art exhibitions, Syren helps you experience the best of Egypt's cultural scene.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsPage() {
  const featured = events.find((e) => e.isFeatured) || null;
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Upcoming Events"
        title="International Events in Egypt"
        subtitle="From world-renowned music festivals to exclusive art exhibitions, discover the most exciting events happening in Egypt."
        heightClassName="min-h-[50vh] md:min-h-[60vh]"
      />
      <FeaturedEvent event={featured} />
      <EventsCategoryNav />
      {eventCategories.map((cat) => {
        const list = events.filter((e) => e.category === cat);
        return (
          <section key={cat} className="section">
            <div id={`cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`} className="mx-auto max-w-7xl container-x">
              <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-6">{cat}</h2>
              {list.length === 0 ? (
                <div className="border border-border bg-surface/40 rounded-xl p-6 text-center">
                  <p className="text-text-secondary">No events listed yet. Check back soon.</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((event) => (
                    <EventCard key={event.slug} event={event} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}

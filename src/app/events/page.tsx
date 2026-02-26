import type { Metadata } from "next";
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";
import { events } from "@/data/events";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "International Events in Egypt | Syren",
  description: "Discover the most exciting international events happening in Egypt. From music festivals to art exhibitions, Syren helps you experience the best of Egypt's cultural scene.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Upcoming Events"
        title="International Events in Egypt"
        subtitle="From world-renowned music festivals to exclusive art exhibitions, discover the most exciting events happening in Egypt."
        heightClassName="min-h-[50vh] md:min-h-[60vh]"
      />
      <div className="section">
        <div className="mx-auto max-w-7xl container-x">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="group block">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={event.thumbnail}
                    alt={event.name}
                    width={800}
                    height={1000}
                    className="aspect-[4/5] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-xl font-medium text-accent-gold">{event.name}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{event.date}</p>
                  <p className="mt-1 text-sm text-text-secondary">{event.location}</p>
                  <p className="mt-2 text-sm text-text-secondary">{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

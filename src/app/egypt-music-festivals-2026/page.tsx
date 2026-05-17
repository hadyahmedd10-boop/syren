import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Egypt Music Festivals 2026 | Syren",
  description:
    "Guide to Egypt’s 2026 music festivals—Zamna, NOART, Sandbox and more—with travel packages and insider tips.",
  alternates: { canonical: "/egypt-music-festivals-2026" },
  openGraph: {
    title: "Egypt Music Festivals 2026 | Syren",
    description:
      "Guide to Egypt’s 2026 music festivals—Zamna, NOART, Sandbox and more—with travel packages and insider tips.",
    url: "https://www.syrentravel.com/egypt-music-festivals-2026",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Music Festivals 2026 | Syren",
    description:
      "The complete guide to music festivals in Egypt in 2026. Zamna, NOART, Sandbox, and more — with travel packages and insider tips from Syren.",
  },
};

export default function EgyptMusicFestivals2026() {
  const festivalEvents = events.filter((e) => e.category === "International Music Festivals" || e.categories?.includes("International Music Festivals"));

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Festival Guide 2026"
        title="Egypt Music Festivals 2026 — Complete Guide"
        subtitle="Dates, locations, and insider notes for the year’s biggest editions — plan with Syren."
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/events" className="syren-btn">
            Browse All Events
          </Link>
        </div>
      </HeroShell>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {festivalEvents.map((ev) => {
              const displayDate = ev.displayDate ?? ev.date;
              const location = ev.location || ev.city;
              const href = `/events/${ev.slug}`;
              return (
                <article key={ev.slug} className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-6 backdrop-blur-sm">
                  <h3 className="font-serif text-2xl text-text-primary mb-2">{ev.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {displayDate && <span className="syren-pill border border-accent-gold text-accent-gold font-serif bg-transparent">{displayDate}</span>}
                    {location && <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{location}</span>}
                  </div>
                  <p className="text-text-secondary mb-4">{ev.shortDescription}</p>
                  <Link href={href} className="syren-btn-secondary">
                    View Event
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <p className="text-text-secondary">
              Looking for culture beyond festivals? Don&apos;t miss the iconic{" "}
              <Link href="/events/al-tannoura-show" className="text-accent-gold underline">Al Tannoura Show</Link>
              {" "}in Cairo.
            </p>
            <p className="text-text-secondary">
              For bespoke travel packages around festival dates, explore our{" "}
              <Link href="/experiences" className="text-accent-gold underline">experiences</Link>
              .
            </p>
            <Link href="/events" className="syren-btn">
              Explore All Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

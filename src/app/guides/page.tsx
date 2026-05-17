import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Egypt Travel Guides | Syren",
  description:
    "Expert Egypt travel guides from Syren — festivals, destinations, culture, and insider tips for the discerning traveler.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Egypt Travel Guides | Syren",
    description:
      "Expert Egypt travel guides from Syren — festivals, destinations, culture, and insider tips for the discerning traveler.",
    url: "/guides",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Travel Guides | Syren",
    description:
      "Expert Egypt travel guides from Syren — festivals, destinations, culture, and insider tips for the discerning traveler.",
  },
};

const GUIDES = [
  {
    slug: "/egypt-music-festivals-2026",
    title: "Egypt Music Festivals 2026 — Complete Guide",
    description:
      "Dates, locations, and insider notes for the year’s biggest editions — Zamna, NOART, Sandbox, and more.",
  },
  {
    slug: "/zamna-egypt-travel",
    title: "Zamna Egypt 2026 — Travel Guide",
    description:
      "How to plan your festival weekend at the Pyramids of Giza — where to stay and how to move.",
  },
  {
    slug: "/sandbox-festival-egypt",
    title: "Sandbox Festival — El Gouna",
    description:
      "Coastal boutique festival on the Red Sea. Where to base, how to get there, and what to expect.",
  },
  {
    slug: "/things-to-do-cairo",
    title: "Things to Do in Cairo",
    description:
      "From the Giza Plateau to hidden rooftops and Nile nights — a curated cultural guide.",
  },
];

export default function GuidesIndex() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Travel Guides"
        title="Egypt Travel Guides"
        subtitle="Festival primers, city highlights, and cultural notes — crafted for meaningful travel."
        altText="Egypt Travel Guides - Syren Travel Egypt"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      />
      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Explore Our Egypt Guides" label="Expert Insights" />
        </div>
      </section>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {GUIDES.map((g) => (
              <article
                key={g.slug}
                className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-6 backdrop-blur-sm"
              >
                <h3 className="font-serif text-2xl text-text-primary mb-2">{g.title}</h3>
                <p className="text-text-secondary mb-4">{g.description}</p>
                <Link href={g.slug} className="syren-btn-secondary">
                  Read Guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

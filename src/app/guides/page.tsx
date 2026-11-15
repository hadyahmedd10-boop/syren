import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Egypt Travel Guides",
  description:
    "Expert Egypt travel guides from Syren — Pyramids festivals, destinations, culture, and insider tips for planning a smooth, memorable trip to Egypt.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Egypt Travel Guides",
    description:
      "Expert Egypt travel guides from Syren — Pyramids festivals, destinations, culture, and insider tips for planning a smooth, memorable trip to Egypt.",
    url: "/guides",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Travel Guides",
    description:
      "Expert Egypt travel guides from Syren — Pyramids festivals, destinations, culture, and insider tips for planning a smooth, memorable trip to Egypt.",
  },
};

const GUIDES = [
  {
    slug: "/festival-travel-egypt",
    title: "Egypt Festival Travel Packages",
    description:
      "Compare Syren travel packages for the Pyramids festivals — what is included, how booking works, and which edition suits you.",
  },
  {
    slug: "/anyma-egypt-2027",
    title: "Anyma Egypt 2027 — Travel Guide",
    description:
      "ÆDEN MILLENNIUM at the Great Pyramids of Giza on 19 & 26 March 2027 — where to stay and how to plan your trip.",
  },
  {
    slug: "/starlight-festival-egypt",
    title: "Starlight Festival Egypt — Travel Guide",
    description:
      "The Starlight Festival by the Pyramids — dates, hotels near Giza, transfers and how to plan your festival weekend.",
  },
  {
    slug: "/zamna-egypt-travel",
    title: "Zamna Egypt 2027 — Travel Guide",
    description:
      "How to plan your Zamna festival weekend in Egypt — edition history, where to stay and how to move.",
  },
  {
    slug: "/egypt-music-festivals-2026",
    title: "Egypt Music Festivals 2026 — Complete Guide",
    description:
      "Dates, locations, and insider notes for the year’s biggest editions — Zamna, NOART, Sandbox, and more.",
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

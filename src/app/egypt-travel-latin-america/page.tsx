import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Egypt Travel Packages from Latin America | Syren",
  description:
    "Egypt travel from Latin America—curated journeys, festivals and private tours designed for adventurous explorers.",
  keywords: [
    "Egypt travel Latin America",
    "Egypt trip from Brazil",
    "Egypt from Argentina",
    "Cairo tours Latin America",
  ],
  alternates: { canonical: "/egypt-travel-latin-america" },
  openGraph: {
    title: "Egypt Travel Packages from Latin America | Syren",
    description:
      "Egypt travel from Latin America—curated journeys, festivals and private tours designed for adventurous explorers.",
    url: "https://www.syrentravel.com/egypt-travel-latin-america",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Travel Packages from Latin America | Syren",
    description:
      "Discover Egypt from Latin America with Syren. Curated journeys, international music festivals, and private tours designed for Latin American explorers.",
  },
};

export default function LatinAmericaLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="For Latin American Travelers"
        title="Egypt Is Closer Than You Think"
        subtitle="Handcrafted itineraries, immersive culture, and effortless logistics — from first touch to farewell."
        altText="Egypt Travel Packages from Latin America - Syren Travel Egypt"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/experiences" className="syren-btn">
            Explore Our Experiences
          </Link>
          <Link href="/events" className="syren-btn-secondary">
            Explore Events
          </Link>
        </div>
      </HeroShell>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-4xl">
          <p className="font-serif text-lg leading-relaxed text-text-secondary">
            Whether you’re drawn by ancient history or global festivals beneath the pyramids, Syren
            tailors journeys that flow naturally across Cairo, the Nile, and the Red Sea — with
            bilingual support and refined pacing for long-haul travelers.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/experiences" className="syren-btn">
              Explore Our Experiences
            </Link>
            <Link href="/events" className="syren-btn-secondary">
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

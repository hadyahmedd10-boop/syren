import type { Metadata } from "next";
import Link from "next/link";
import BookingTrigger from "@/components/ui/BookingTrigger";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Zamna Egypt 2026 — Travel Packages & Festival Guide | Syren",
  description:
    "Zamna Egypt 2026 guide at the Pyramids—travel packages, hotels and insider tips from Syren.",
  alternates: { canonical: "/zamna-egypt-travel" },
  openGraph: {
    title: "Zamna Egypt 2026 — Travel Packages & Festival Guide | Syren",
    description:
      "Zamna Egypt 2026 guide at the Pyramids—travel packages, hotels and insider tips from Syren.",
    url: "https://www.syrentravel.com/zamna-egypt-travel",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zamna Egypt 2026 — Travel Packages & Festival Guide | Syren",
    description:
      "Zamna Egypt 2026 guide at the Pyramids—travel packages, hotels and insider tips from Syren.",
  },
};

export default function ZamnaEgyptTravel() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Festival Travel"
        title="Zamna Egypt 2026 — Travel Guide"
        subtitle="Where to stay, how to move, and how to experience Giza’s iconic festival with ease."
        altText="Zamna Egypt 2026 — Travel Guide - Syren Travel Egypt"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/events/zamna-festival" className="syren-btn">
            View Zamna Event
          </Link>
          <BookingTrigger
            title="Zamna Egypt 2026"
            slug="zamna-festival"
            buttonLabel="Book Travel Package"
            variant="secondary"
          />
        </div>
      </HeroShell>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">What to Expect</h2>
            <p className="text-text-secondary">
              A refined multi-day experience beneath the Pyramids: world-class production,
              precision pacing, and thoughtfully curated lineups. Expect late-night programming with
              private transfers and reserved areas recommended for comfort.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">How to Get There</h2>
            <p className="text-text-secondary">
              Arrive via Cairo International Airport (CAI). Private transfers to Giza are
              recommended; Syren coordinates door-to-door logistics, including airport concierge and
              hotel-to-venue shuttles.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">Where to Stay</h2>
            <p className="text-text-secondary">
              Premium hotels in Giza and central Cairo offer quick venue access and elevated
              hospitality. Ask Syren for tailored options near the plateau or within Nile-side luxury
              districts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/events/zamna-festival" className="syren-btn">
              Explore the Event
            </Link>
            <BookingTrigger
              title="Zamna Egypt 2026"
              slug="zamna-festival"
              buttonLabel="Book a Syren Package"
              variant="secondary"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import BookingTrigger from "@/components/ui/BookingTrigger";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Sandbox Festival Egypt 2026 — El Gouna Travel Guide | Syren",
  description:
    "Sandbox Festival 2026 guide—El Gouna, Red Sea. Book travel packages with Syren and experience Egypt’s boutique coastal festival.",
  alternates: { canonical: "/sandbox-festival-egypt" },
  openGraph: {
    title: "Sandbox Festival Egypt 2026 — El Gouna Travel Guide | Syren",
    description:
      "Sandbox Festival 2026 guide—El Gouna, Red Sea. Book travel packages with Syren and experience Egypt’s boutique coastal festival.",
    url: "https://www.syrentravel.com/sandbox-festival-egypt",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandbox Festival Egypt 2026 — El Gouna Travel Guide | Syren",
    description:
      "Your complete guide to Sandbox Festival 2026 in El Gouna, Red Sea. Book your travel package with Syren and experience Egypt's finest coastal festival.",
  },
};

export default function SandboxFestivalEgypt() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Festival Travel"
        title="Sandbox Festival 2026 — El Gouna Guide"
        subtitle="Coastal settings, refined curation, and relaxed pacing — experience Egypt’s boutique festival by the Red Sea."
        altText="Sandbox Festival 2026 — El Gouna Guide - Syren Travel Egypt"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/events/sandbox-festival" className="syren-btn">
            View Sandbox Event
          </Link>
          <BookingTrigger
            title="Sandbox Festival Egypt 2026"
            slug="sandbox-festival"
            buttonLabel="Book Travel Package"
            variant="secondary"
          />
        </div>
      </HeroShell>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">El Gouna Overview</h2>
            <p className="text-text-secondary">
              El Gouna is a thoughtfully designed seaside town on the Red Sea, known for its marinas,
              lagoons, and boutique hotels. It’s an ideal base for festival days paired with calm
              mornings by the water.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">Travel Tips</h2>
            <p className="text-text-secondary">
              Fly into Hurghada International Airport (HRG), then continue to El Gouna by private
              transfer. Syren arranges door-to-door transport and reservations for dining and beach
              clubs to complete the experience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/events/sandbox-festival" className="syren-btn">
              Explore the Event
            </Link>
            <BookingTrigger
              title="Sandbox Festival Egypt 2026"
              slug="sandbox-festival"
              buttonLabel="Plan Your Journey"
              variant="secondary"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

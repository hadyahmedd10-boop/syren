import type { Metadata } from "next";
import Link from "next/link";
import BookingTrigger from "@/components/ui/BookingTrigger";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Luxury Egypt Tours & Private Journeys | Syren",
  description:
    "Luxury Egypt tours and private journeys—Nile cruises, desert trips and curated Cairo experiences for discerning travelers.",
  alternates: {
    canonical: "/luxury-egypt-tours",
  },
  openGraph: {
    title: "Luxury Egypt Tours & Private Journeys | Syren",
    description:
      "Luxury Egypt tours and private journeys—Nile cruises, desert trips and curated Cairo experiences for discerning travelers.",
    url: "https://www.syrentravel.com/luxury-egypt-tours",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Egypt Tours & Private Journeys | Syren",
    description:
      "Luxury Egypt tours and private journeys—Nile cruises, desert trips and curated Cairo experiences for discerning travelers.",
  },
};

export default function LuxuryEgyptToursPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Signature Luxury"
        title="Luxury Egypt Tours"
        subtitle="Private journeys crafted for the discerning traveler"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/experiences" className="syren-btn">
            Explore Our Experiences
          </Link>
          <BookingTrigger
            title="Luxury Egypt Tours"
            slug="luxury-egypt-tours"
            basePriceAmount={undefined}
            buttonLabel="Plan Your Journey"
            variant="secondary"
          />
        </div>
      </HeroShell>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-4xl">
          <p className="font-serif text-lg leading-relaxed text-text-secondary">
            Syren designs deeply personalized luxury journeys across Egypt:
            refined pacing, private access, and seamless logistics from door to
            door. Whether sailing the Nile on a private vessel, traversing the
            desert with expert guides, or exploring Cairo’s cultural enclaves,
            every detail is curated with precision and quiet sophistication.
            Your itinerary is crafted to your rhythm—elevated, effortless, and
            profoundly personal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/experiences" className="syren-btn">
              Explore Our Experiences
            </Link>
            <BookingTrigger
              title="Luxury Egypt Tours"
              slug="luxury-egypt-tours"
              basePriceAmount={undefined}
              buttonLabel="Plan Your Journey"
              variant="secondary"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

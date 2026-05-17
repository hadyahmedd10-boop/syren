import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Egypt Travel Packages for Europeans | Syren",
  description:
    "Egypt travel for European visitors—curated packages, festivals and private tours tailored to European tastes and timing.",
  keywords: [
    "Egypt travel from Europe",
    "Egypt holiday Europe",
    "Egypt festival travel",
    "Cairo trip from Europe",
    "Egypt tour package Europeans",
  ],
  alternates: { canonical: "/egypt-travel-europe" },
  openGraph: {
    title: "Egypt Travel Packages for Europeans | Syren",
    description:
      "Egypt travel for European visitors—curated packages, festivals and private tours tailored to European tastes and timing.",
    url: "https://www.syrentravel.com/egypt-travel-europe",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Travel Packages for Europeans | Syren",
    description:
      "Planning a trip to Egypt from Europe? Syren offers curated travel packages, festival experiences, and private tours crafted for European travelers.",
  },
};

export default function EuropeLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="For European Travelers"
        title="Egypt, Crafted for European Travelers"
        subtitle="Curated journeys, private access, and seamless logistics — tailored to European tastes and timing."
        altText="Egypt Travel Packages for Europeans - Syren Travel Egypt"
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
            From the Nile’s quiet grandeur to Cairo’s modern pulse, Syren curates itineraries that
            balance cultural depth with contemporary comfort. Enjoy refined pacing, vetted guides,
            and effortless airport-to-hotel logistics — all designed for European travel rhythms.
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

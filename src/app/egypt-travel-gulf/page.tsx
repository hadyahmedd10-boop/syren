import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";

export const metadata: Metadata = {
  title: "Egypt Travel Packages from the Gulf | Syren",
  description:
    "Egypt travel from the Gulf—premium experiences, festivals, private tours and luxury stays for UAE, Saudi and Kuwait travelers.",
  keywords: [
    "Egypt travel from UAE",
    "Egypt from Saudi Arabia",
    "Egypt Gulf travel",
    "Cairo trip from Dubai",
    "Egypt luxury travel Gulf",
  ],
  alternates: { canonical: "/egypt-travel-gulf" },
  openGraph: {
    title: "Egypt Travel Packages from the Gulf | Syren",
    description:
      "Egypt travel from the Gulf—premium experiences, festivals, private tours and luxury stays for UAE, Saudi and Kuwait travelers.",
    url: "https://www.syrentravel.com/egypt-travel-gulf",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egypt Travel Packages from the Gulf | Syren",
    description:
      "Traveling to Egypt from UAE, Saudi Arabia, or Kuwait? Syren curates premium Egyptian experiences for Gulf travelers — festivals, private tours, and luxury stays.",
  },
};

export default function GulfLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="For Gulf Travelers"
        title="Egypt, As You've Always Imagined It"
        subtitle="Private tours, luxury stays, and international events — tailored for travelers from the Gulf."
        altText="Egypt Travel Packages from the Gulf - Syren Travel Egypt"
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
            Syren delivers Egypt with precision and ease: chauffeured transfers, discreet guides,
            and premium access to the country’s most captivating sites and events. We design
            itineraries that honor your pace, preferences, and standards.
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

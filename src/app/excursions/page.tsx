import type { Metadata } from "next";
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";
import ExcursionsList from "@/components/excursions/ExcursionsList";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Private Day Trips & Excursions in Egypt | Syren",
  description: "Book premium day excursions across Egypt with Syren. Hurghada Jeep safari, Luxor day trip, island snorkeling, Nile dinner cruise, and private Cairo tours.",
  alternates: { canonical: "/excursions" },
  openGraph: {
    title: "Private Day Trips & Excursions in Egypt | Syren",
    description: "Book premium day excursions across Egypt with Syren. Hurghada Jeep safari, Luxor day trip, island snorkeling, Nile dinner cruise, and private Cairo tours.",
    url: "https://www.syrentravel.com/excursions",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

function classifyDuration(d?: string) {
  if (!d) return "All";
  const s = d.toLowerCase();
  if (s.includes("half")) return "Half Day";
  if (s.includes("full")) return "Full Day";
  if (/\d+\s*day/.test(s)) return "Multi Day";
  return "Full Day";
}

export default function ExcursionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell backgroundImage={HERO_IMAGES.home.src} altText="Egypt Excursions - Syren Travel Egypt" eyebrow="Private Day Trips" title="Egypt Excursions" subtitle="Cultural immersion, desert adventures, water days, and after-dark experiences." heightClassName="min-h-[50vh] md:min-h-[58vh]" />
      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Explore Our Excursions" label="Curated Day Trips" />
        </div>
      </section>
      <ExcursionsList />
    </main>
  );
}

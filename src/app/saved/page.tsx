import type { Metadata } from "next";
import HeroShell from "@/components/ui/HeroShell";
import SavedList from "@/components/saved/SavedList";
import { HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Your Saved Experiences | Syren",
  description: "View your saved experiences and excursions.",
  alternates: { canonical: "/saved" },
  openGraph: {
    title: "Your Saved Experiences | Syren",
    description: "View your saved experiences and excursions.",
    url: "https://www.syrentravel.com/saved",
    type: "website",
    images: [{ url: "https://www.syrentravel.com/images/hero/luxury.jpg", width: 1200, height: 630, alt: "Syren Travel Egypt" }],
  },
};

export default function SavedPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Wishlist"
        title="Your Saved Experiences"
        subtitle="Quick access to the journeys and day trips you love."
        altText="Your Saved Experiences - Syren Travel Egypt"
        heightClassName="min-h-[42vh] md:min-h-[50vh]"
      />
      <section className="section">
        <div className="mx-auto max-w-7xl container-x">
          <SavedList />
        </div>
      </section>
    </main>
  );
}

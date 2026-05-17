import type { Metadata } from "next";
import QuoteForm from "@/components/forms/QuoteForm";
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Request a Quote | Bespoke Egyptian Journeys | Syren",
  description: "Begin your extraordinary Egyptian journey. Request a personalized quote for a private, curated luxury experience tailored to your vision.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Request a Quote | Syren",
    description: "Request a personalized quote for a private, curated Egypt journey with Syren.",
    url: "https://www.syrentravel.com/quote",
    type: "website",
    images: [{ url: "https://www.syrentravel.com/images/hero/luxury.jpg", width: 1200, height: 630, alt: "Syren Travel Egypt" }],
  },
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Bespoke Journeys"
        title="Request a Quote"
        subtitle="Tell us your vision. We'll craft the reality."
        altText="Request a Quote - Syren Travel Egypt"
        heightClassName="min-h-[40vh] md:min-h-[50vh]"
      />
      
      <section className="section">
        <div className="max-w-4xl mx-auto container-x">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}

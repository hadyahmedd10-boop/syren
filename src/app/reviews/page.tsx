import type { Metadata } from "next";
import TrustpilotWidget from "@/components/ui/TrustpilotWidget";

export const metadata: Metadata = {
  title: "Traveler Reviews | Syren Egypt Travel",
  description:
    "Read genuine reviews from travelers who have experienced Egypt with Syren. Verified reviews on Trustpilot from our global community of travelers.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-surface/30 border-b border-border">
        <div className="container-x mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">
            VERIFIED REVIEWS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
            What Our Travelers Say
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Every review is genuine and verified by Trustpilot
          </p>
          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-8 h-8 text-accent-gold fill-accent-gold"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* Full Reviews List */}
      <section className="py-16 md:py-20">
        <div className="container-x mx-auto max-w-5xl">
          <TrustpilotWidget variant="list" height="800px" className="w-full" />

          {/* CTA Section */}
          <div className="text-center mt-12">
            <p className="text-text-secondary text-sm mb-4">
              Had an experience with Syren? We&apos;d love to hear from you.
            </p>
            <a
              href="https://www.trustpilot.com/review/syrentravel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-text-primary text-background hover:bg-text-primary/90 transition-colors"
            >
              Write a Review →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

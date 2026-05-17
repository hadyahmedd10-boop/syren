"use client";

import { testimonials } from "@/data/testimonials";
import ShareYourStory from "./ShareYourStory";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
            Traveler Stories
          </p>
          <h2 className="font-serif text-4xl text-text-primary mb-3">
            What Our Travelers Say
          </h2>
          <p className="text-center text-text-secondary mb-6 max-w-xl text-sm">
            Real experiences from real travelers. Verified by Trustpilot.
          </p>
          <ShareYourStory />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-accent-gold/20 bg-surface/30 backdrop-blur-sm p-6 flex flex-col"
            >
              <Stars count={review.rating} />
              <h3 className="font-serif text-lg text-text-primary mt-3 mb-2">{review.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-5">{review.message}</p>
              <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold font-serif text-sm font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{review.name}</div>
                  <div className="text-xs text-text-secondary flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Verified on Trustpilot
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 flex items-center justify-center gap-6">
          <a
            href="/reviews"
            className="text-accent-gold text-sm hover:underline tracking-wide"
          >
            View All Reviews →
          </a>
          <a
            href="https://www.trustpilot.com/review/syrentravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold text-sm hover:underline tracking-wide"
          >
            Read on Trustpilot →
          </a>
        </div>
      </div>
    </div>
  );
}

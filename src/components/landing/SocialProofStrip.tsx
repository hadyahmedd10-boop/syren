"use client";

import { testimonials } from "@/data/testimonials";

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

export default function SocialProofStrip() {
  return (
    <section className="py-12 px-6 border-y border-border bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-accent-gold/20 bg-surface/30 backdrop-blur-sm p-6 flex flex-col"
            >
              <Stars count={review.rating} />
              <h3 className="font-serif text-lg text-text-primary mt-3 mb-2">{review.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-4">{review.message}</p>
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
      </div>
    </section>
  );
}

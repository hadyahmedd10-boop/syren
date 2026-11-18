"use client";

import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import SectionHeader from "@/components/layout/SectionHeader";
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
    <div className="mx-auto max-w-7xl container-x">
      <SectionHeader
        label="Traveler Stories"
        title="What Our Travelers Say"
        description="Real experiences from real travelers. Verified by Trustpilot."
        align="center"
        className="mb-8 md:mb-10"
      />

      <div className="-mt-4 mb-8 flex justify-center">
        <ShareYourStory />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {testimonials.map((review) => (
          <div
            key={review.id}
            className="flex h-full flex-col rounded-2xl border border-accent-gold/20 bg-surface/30 p-6 backdrop-blur-sm"
          >
            <Stars count={review.rating} />
            <h3 className="mt-3 mb-2 font-serif text-lg text-text-primary">{review.title}</h3>
            <p className="line-clamp-6 flex-1 text-sm leading-relaxed text-text-secondary">
              {review.message}
            </p>
            <Link
              href="/reviews"
              className="mt-3 w-fit text-sm text-accent-gold-ink hover:underline"
            >
              Read full review →
            </Link>
            <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gold/20 font-serif text-sm font-bold text-accent-gold-ink">
                {review.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">{review.name}</div>
                <div className="flex items-center gap-1 text-xs text-text-secondary">
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

      <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Link href="/reviews" className="syren-btn-secondary">
          View All Reviews →
        </Link>
        <a
          href="https://www.trustpilot.com/review/syrentravel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-wide text-accent-gold-ink hover:underline"
        >
          Read on Trustpilot →
        </a>
      </div>
    </div>
  );
}

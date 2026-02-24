"use client";

import React, { useEffect, useRef, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import Reveal from "../motion/Reveal";
import SectionHeader from "../layout/SectionHeader";
import { experiences } from "@/data/experiences";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PopularExperiencesProps {
  variant?: 'nightlife' | 'luxury' | 'adventure' | 'cultural' | 'all';
}

export default function PopularExperiences({ variant }: PopularExperiencesProps) {
  // Filter experiences based on variant if provided
  const filteredExperiences = (() => {
    const base = variant
      ? (variant === 'all' ? experiences : experiences.filter(exp => exp.category === variant))
      : experiences;
    return base.slice(0, 5);
  })();

  const getTitle = () => {
    switch (variant) {
      case 'nightlife': return "Nightlife";
      case 'luxury': return "The Signature Collection";
      case 'adventure': return "Untamed Egypt";
      case 'cultural': return "Timeless Heritage";
      case 'all': return "Our Full Collection";
      default: return "Popular Experiences";
    }
  };

  const getSubtitle = () => {
    switch (variant) {
      case 'nightlife': return "Vibrant";
      case 'luxury': return "Refined";
      case 'adventure': return "Untamed";
      case 'cultural': return "Authentic";
      case 'all': return "Private";
      default: return "Curated";
    }
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const overflow = scrollWidth > clientWidth + 4;
      setCanScroll(overflow);
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true } as AddEventListenerOptions);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", update);
      if (ro) ro.disconnect();
    };
  }, []);

  const scrollByOne = (dir: "left" | "right") => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    let step = 300; // fallback
    const first = track.firstElementChild as HTMLElement | null;
    try {
      if (first) {
        const childWidth = first.offsetWidth;
        const styles = window.getComputedStyle(track);
        const gapStr =
          styles.getPropertyValue("column-gap") ||
          styles.getPropertyValue("gap") ||
          "0";
        const gap = parseInt(gapStr, 10) || 0;
        step = childWidth + gap;
      }
    } catch {}
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div
      id={variant ? `experiences-${variant}` : "experiences"}
      className="bg-background scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader 
          title={getTitle()} 
          label={getSubtitle()} 
        />
        <div className="-mx-6 md:-mx-8">
          <div className="relative">
            <div ref={scrollRef} className="overflow-x-auto scroll-smooth scrollbar-hide px-6 md:px-8">
              <div ref={trackRef} className="flex gap-4 md:gap-6">
                {filteredExperiences.map((experience, index) => (
                  <Reveal key={experience.slug} delay={0.1 * (index + 1)}>
                    <div className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] md:h-[460px] lg:w-[320px] lg:h-[460px]">
                      <ExperienceCard
                        title={experience.title}
                        description={experience.description}
                        image={experience.heroImage}
                        duration={experience.duration}
                        cities={experience.cities}
                        href={`/experiences/${experience.slug}`}
                        buttonText="Explore"
                        minimal
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {canScroll && (
              <>
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 left-0 w-10 md:w-14 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 ${atStart ? "opacity-0" : "opacity-100"}`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 right-0 w-10 md:w-14 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 ${atEnd ? "opacity-0" : "opacity-100"}`}
                />
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollByOne("left")}
                  className={`hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 rounded-full bg-background/60 border border-border/50 backdrop-blur-sm text-text-primary/70 hover:text-text-primary hover:bg-background/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/30 ${atStart ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollByOne("right")}
                  className={`hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full bg-background/60 border border-border/50 backdrop-blur-sm text-text-primary/70 hover:text-text-primary hover:bg-background/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/30 ${atEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            href="/experiences" 
            className="syren-btn-secondary duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/30"
            aria-label="View All Experiences"
          >
            View All Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

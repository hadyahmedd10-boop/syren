"use client";

import React, { useState, useCallback } from "react";
import { Plus, Minus, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItineraryItem {
  id?: string;
  day?: number;
  step?: number;
  title: string;
  description: string;
  tag?: string;
  image?: string;
  meals?: string[];
  location?: string;
}

interface ItineraryAccordionProps {
  title?: string;
  subtitle?: string;
  items: ItineraryItem[];
  type?: "days" | "steps";
}

export default function ItineraryAccordion({
  title,
  subtitle,
  items,
  type = "days",
}: ItineraryAccordionProps) {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  }, []);

  if (!items || items.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container-x mx-auto max-w-4xl px-6 text-center">
          <p className="text-text-secondary italic">
            Itinerary details will be confirmed by your concierge.
          </p>
        </div>
      </section>
    );
  }

  const labelText = type === "days" ? "Day by Day" : "Step by Step";
  const countText = type === "days" ? `${items.length} Days` : `${items.length} Steps`;
  const headerTitle = title ?? (type === "days" ? "The Journey" : "The Experience Flow");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-x mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-accent-gold block mb-2">
                {subtitle ?? labelText}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
                {headerTitle}
              </h2>
            </div>
            <span className="text-xs text-text-secondary/60 font-sans tracking-wide">
              {countText}
            </span>
          </div>
          <div className="h-px bg-gradient-to-r from-accent-gold/40 via-border to-transparent" />
        </div>

        {/* Accordion Items */}
        <div className="space-y-0">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const number = type === "days" ? item.day : item.step;
            const displayNumber = number ? String(number).padStart(2, "0") : String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.id ?? `${type}-${index}`}
                className={cn(
                  "border-b border-border transition-all duration-300",
                  isOpen && "border-l-2 border-l-accent-gold bg-surface/30"
                )}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className={cn(
                    "w-full flex items-center gap-4 py-5 px-4 md:px-6",
                    "cursor-pointer transition-colors duration-200",
                    "hover:bg-surface/20",
                    !isOpen && "bg-transparent",
                    isOpen && "bg-surface/30"
                  )}
                  aria-expanded={isOpen}
                >
                  {/* Day/Step Number */}
                  <span
                    className={cn(
                      "font-serif text-3xl md:text-4xl shrink-0 w-16 md:w-20 text-left transition-colors duration-300",
                      isOpen ? "text-accent-gold" : "text-accent-gold/40"
                    )}
                  >
                    {displayNumber}
                  </span>

                  {/* Title */}
                  <span className="flex-1 font-serif text-lg text-text-primary text-left">
                    {item.title}
                  </span>

                  {/* Tag/Badge */}
                  {item.tag && (
                    <span className="hidden md:inline-flex shrink-0 items-center px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider border border-accent-gold/40 text-accent-gold bg-accent-gold/5">
                      {item.tag}
                    </span>
                  )}

                  {/* Plus/Minus Icon */}
                  <span className="shrink-0 w-8 h-8 flex items-center justify-center">
                    {isOpen ? (
                      <Minus
                        size={20}
                        className="text-accent-gold transition-transform duration-300 rotate-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Plus
                        size={20}
                        className="text-accent-gold transition-transform duration-300 rotate-0"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-400 ease-out",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  )}
                  style={{
                    transitionProperty: "max-height, opacity",
                    transitionDuration: "400ms, 300ms",
                    transitionTimingFunction: "ease-out, ease-out",
                  }}
                >
                  <div className="p-4 md:p-6 pt-0">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left Column: Description, Meals, Location */}
                      <div className="flex-1 md:w-[60%]">
                        <p className="text-text-secondary leading-relaxed text-sm">
                          {item.description}
                        </p>

                        {/* Meals */}
                        {item.meals && item.meals.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.meals.map((meal, mealIndex) => (
                              <span
                                key={mealIndex}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs"
                              >
                                {meal}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Location */}
                        {item.location && (
                          <div className="mt-3 flex items-center gap-1.5 text-text-secondary text-xs">
                            <span aria-hidden="true">📍</span>
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Right Column: Image */}
                      <div className="md:w-[40%]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.title}`}
                            loading="lazy"
                            className={cn(
                              "w-full aspect-[4/3] object-cover rounded-xl",
                              "transition-opacity duration-500",
                              isOpen ? "opacity-100" : "opacity-0"
                            )}
                            onError={(e) => {
                              const el = e.currentTarget as HTMLImageElement;
                              el.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full aspect-[4/3] rounded-xl bg-surface flex flex-col items-center justify-center border border-border">
                            <Compass size={32} className="text-accent-gold/60 mb-2" />
                            <span className="text-text-secondary text-xs">
                              Photo coming soon
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

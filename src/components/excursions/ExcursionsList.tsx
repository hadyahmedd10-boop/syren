"use client";
import { useMemo, useState } from "react";
import { Search, X, Compass } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/layout/SectionHeader";
import ExperienceCard from "@/components/sections/ExperienceCard";
import { excursions } from "@/data/excursions";
import { HERO_IMAGES } from "@/lib/images";

function classifyType(e: any) {
  const t = `${e.title} ${e.shortDescription} ${e.tourStyle || ""}`.toLowerCase();
  if (/(snorkel|island|mahmya|giftun|paradise|water|boat|cruise)/.test(t)) return "Water Sports";
  if (/(quad|jeep|safari|adventure)/.test(t)) return "Adventure";
  if (/(night|dinner|tanoura)/.test(t)) return "Nightlife";
  return "Cultural";
}

function classifyDuration(d?: string) {
  if (!d) return "All";
  const s = d.toLowerCase();
  if (s.includes("half")) return "Half Day";
  if (s.includes("full")) return "Full Day";
  if (/\d+\s*day/.test(s)) return "Multi Day";
  return "Full Day";
}

export default function ExcursionsList() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return excursions.filter((e) => {
      const matchQuery = q.length === 0 || [e.title, e.shortDescription, e.city, e.destinationSlug].filter(Boolean).some((t) => String(t).toLowerCase().includes(q));
      const t = classifyType(e);
      const matchType = typeFilter === "All" ? true : t === typeFilter;
      const d = classifyDuration(e.duration);
      const matchDuration = durationFilter === "All" ? true : d === durationFilter;
      return matchQuery && matchType && matchDuration;
    });
  }, [query, typeFilter, durationFilter]);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl container-x">
        <SectionHeader title="Explore Excursions" label="Handpicked Add-Ons" className="mb-6" />
          <div className="bg-surface-2 rounded-2xl p-4 mb-8">
          <div className="max-w-2xl mx-auto relative mb-4 pb-4 border-b border-border">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold/50" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search excursions"
              className="w-full h-12 rounded-full bg-surface backdrop-blur-sm border border-border focus:border-accent-gold/60 text-text-primary placeholder:text-text-secondary/60 pl-12 pr-12 outline-none focus:shadow-[0_0_0_1px_rgba(201,168,76,0.3)]"
            />
            {query.length > 0 && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent-gold transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <div className="mb-2 text-[10px] tracking-[0.2em] text-text-secondary">TYPE</div>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
            {["All", "Cultural", "Adventure", "Water Sports", "Nightlife"].map((t) => {
              const active = typeFilter === t;
              const base = "rounded-full min-h-[40px] px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200";
              const cls = active
                ? "bg-accent-gold/15 border border-accent-gold text-accent-gold font-semibold"
                : "bg-transparent border border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70";
              return (
                <button key={t} onClick={() => setTypeFilter(t)} className={`${base} ${cls}`}>
                  {t}
                </button>
              );
            })}
          </div>
          <div className="mt-4 mb-2 text-[10px] tracking-[0.2em] text-text-secondary">DURATION</div>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
            {["All", "Half Day", "Full Day", "Multi Day"].map((d) => {
              const active = durationFilter === d;
              const base = "rounded-full min-h-[40px] px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200";
              const cls = active
                ? "bg-accent-gold/15 border border-accent-gold text-accent-gold font-semibold"
                : "bg-transparent border border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70";
              return (
                <button key={d} onClick={() => setDurationFilter(d)} className={`${base} ${cls}`}>
                  {d}
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-sm text-text-secondary mb-4">Showing {filtered.length} excursions</div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Compass size={36} className="mx-auto mb-3 text-accent-gold" />
            <h3 className="font-serif text-2xl text-text-primary mb-1">No results found</h3>
            <p className="text-text-secondary mb-3">Try adjusting your filters or search term</p>
            <button onClick={() => { setQuery(""); setTypeFilter("All"); setDurationFilter("All"); }} className="text-accent-gold underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity">
            {filtered.map((e, index) => (
              <Reveal key={e.slug} delay={0.05 * (index + 1)}>
                <ExperienceCard title={e.title} description={e.shortDescription} image={(e.image || e.heroImage || HERO_IMAGES.home) as any} alt={e.imageAlt ?? e.title} duration={e.duration} cities={e.city} priceAmount={typeof e.priceCents === "number" ? Math.round(e.priceCents / 100) : undefined} priceCurrency="USD" buttonText="Explore Excursions →" href={`/excursions/${e.slug}`} slug={e.slug} itemType="excursion" />
              </Reveal>
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link href="/destinations" className="syren-btn-secondary inline-flex min-h-[44px]">Explore Destinations →</Link>
        </div>
      </div>
    </section>
  );
}

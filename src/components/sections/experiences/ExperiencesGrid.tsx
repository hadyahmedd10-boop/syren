"use client";
import { useMemo, useState } from "react";
import { Search, X, Compass, SlidersHorizontal, ChevronDown } from "lucide-react";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/sections/ExperienceCard";
import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/layout/SectionHeader";

export default function ExperiencesGrid() {
  const [query, setQuery] = useState("");
  const [durationFilter, setDurationFilter] = useState("All");
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = [durationFilter, destinationFilter, categoryFilter].filter((f) => f !== "All").length;

  const parseDays = (d?: string) => {
    if (!d) return undefined;
    const m = d.match(/(\d+)\s*Days?/i);
    return m ? parseInt(m[1], 10) : undefined;
    };
  const classifyDestination = (dests: string[] = []) => {
    if (dests.length > 1) return "Multiple";
    const d = dests[0];
    if (!d) return "All";
    if (d === "cairo") return "Cairo";
    if (d.includes("luxor") || d.includes("aswan")) return "Nile";
    if (d.includes("red-sea") || d.includes("hurghada")) return "Red Sea";
    return "All";
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return experiences.filter((exp) => {
      const matchQuery =
        q.length === 0 ||
        [exp.title, exp.description, exp.cities, exp.subtitle].filter(Boolean).some((t) => String(t).toLowerCase().includes(q));
      const days = parseDays(exp.duration);
      let matchDuration = true;
      if (durationFilter !== "All") {
        if (durationFilter === "1-3 Days") matchDuration = typeof days === "number" && days >= 1 && days <= 3;
        else if (durationFilter === "4-7 Days") matchDuration = typeof days === "number" && days >= 4 && days <= 7;
        else if (durationFilter === "8+ Days") matchDuration = typeof days === "number" && days >= 8;
      }
      const destClass = classifyDestination(exp.destinations as any);
      const matchDestination = destinationFilter === "All" ? true : destClass === destinationFilter;
      const toLabel = (c?: string) => {
        if (!c) return "All";
        if (c === "nile-cruises") return "Nile Cruises";
        if (c === "luxury") return "Luxury";
        if (c === "adventure") return "Adventure";
        if (c === "cultural") return "Cultural";
        if (c === "cairo-experiences") return "Cairo Experiences";
        if (c === "festival-experiences") return "Festival Experiences";
        return "All";
      };
      const matchCategory = categoryFilter === "All" ? true : toLabel(exp.category).toLowerCase() === categoryFilter.toLowerCase();
      return matchQuery && matchDuration && matchDestination && matchCategory;
    });
  }, [query, durationFilter, destinationFilter, categoryFilter]);

  return (
    <div className="bg-background section">
      <div className="mx-auto max-w-7xl container-x">
        <SectionHeader title="Explore Our Journeys" label="Complete Collection" className="mb-6 sm:mb-8" />
        <div className="bg-surface-2 rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold/50" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search experiences"
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
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 h-12 px-5 rounded-full border transition-all duration-200 ${
                filtersOpen || activeFilterCount > 0
                  ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                  : "border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="text-sm font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-accent-gold text-[11px] font-bold text-text-dark">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              filtersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-4 pb-2 border-t border-border space-y-4">
                <div>
                  <div className="mb-2 text-[10px] tracking-[0.2em] text-text-secondary">DURATION</div>
                  <div className="flex gap-2 flex-wrap">
                    {["All", "1-3 Days", "4-7 Days", "8+ Days"].map((d) => {
                      const active = durationFilter === d;
                      const base = "rounded-full min-h-[36px] px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200";
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
                <div>
                  <div className="mb-2 text-[10px] tracking-[0.2em] text-text-secondary">DESTINATION</div>
                  <div className="flex gap-2 flex-wrap">
                    {["All", "Cairo", "Nile", "Red Sea", "Multiple"].map((d) => {
                      const active = destinationFilter === d;
                      const base = "rounded-full min-h-[36px] px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200";
                      const cls = active
                        ? "bg-accent-gold/15 border border-accent-gold text-accent-gold font-semibold"
                        : "bg-transparent border border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70";
                      return (
                        <button key={d} onClick={() => setDestinationFilter(d)} className={`${base} ${cls}`}>
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-[10px] tracking-[0.2em] text-text-secondary">CATEGORY</div>
                  <div className="flex gap-2 flex-wrap">
                    {["All", "Nile Cruises", "Luxury", "Adventure", "Cultural", "Cairo Experiences"].map((d) => {
                      const active = categoryFilter === d;
                      const base = "rounded-full min-h-[36px] px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-200";
                      const cls = active
                        ? "bg-accent-gold/15 border border-accent-gold text-accent-gold font-semibold"
                        : "bg-transparent border border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70";
                      return (
                        <button key={d} onClick={() => setCategoryFilter(d)} className={`${base} ${cls}`}>
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => { setDurationFilter("All"); setDestinationFilter("All"); setCategoryFilter("All"); }}
                    className="text-xs text-accent-gold hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-text-secondary mb-4">Showing {filtered.length} experiences</div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Compass size={36} className="mx-auto mb-3 text-accent-gold" />
            <h3 className="font-serif text-2xl text-text-primary mb-1">No results found</h3>
            <p className="text-text-secondary mb-3">Try adjusting your filters or search term</p>
            <button
              onClick={() => {
                setQuery("");
                setDurationFilter("All");
                setDestinationFilter("All");
                setCategoryFilter("All");
              }}
              className="text-accent-gold underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity">
            {filtered.map((experience, index) => (
              <Reveal key={experience.slug} delay={0.1 * index}>
                <ExperienceCard
                  title={experience.title}
                  description={experience.description}
                  image={experience.heroImage}
                  alt={experience.title}
                  duration={experience.duration}
                  cities={experience.cities}
                  priceAmount={experience.price?.amount}
                  priceCurrency={experience.price?.currency}
                  label={experience.badge}
                  href={`/experiences/${experience.slug}`}
                  slug={experience.slug}
                  itemType="experience"
                  variant={index < 3 ? "primary" : "secondary"}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

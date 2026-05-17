"use client";
import { useMemo, useState } from "react";
import { Search, X, Compass } from "lucide-react";
import EventCard from "@/components/sections/events/EventCard";
import { events } from "@/data/events";
import FeaturedEvent from "@/components/sections/events/FeaturedEvent";
import {
  getUpcomingEvents,
  getFeaturedUpcomingEvents,
  getPastEvents,
} from "@/lib/eventUtils";

function parseStartDate(date: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const cleaned = date.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+/i, "").trim();
  const map: Record<string, string> = { january: "01", february: "02", march: "03", april: "04", may: "05", june: "06", july: "07", august: "08", september: "09", october: "10", november: "11", december: "12" };
  const mdy = cleaned.match(/^([A-Za-z]+)\s+(\d{1,2})(?:-(\d{1,2}))?,\s*(\d{4})$/);
  if (mdy) {
    const m = map[mdy[1].toLowerCase()];
    const d = String(mdy[2]).padStart(2, "0");
    const y = mdy[4];
    return `${y}-${m}-${d}`;
  }
  const dmy = cleaned.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmy) {
    const d = String(dmy[1]).padStart(2, "0");
    const m = map[dmy[2].toLowerCase()];
    const y = dmy[3];
    return `${y}-${m}-${d}`;
  }
  return date;
}

export default function EventsFilter() {
  const upcomingEvents = getUpcomingEvents(events);
  const featuredEvents = getFeaturedUpcomingEvents(events);
  const featured = featuredEvents[0] ?? null;
  const pastEvents = getPastEvents(events);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("Upcoming");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const threeMonthsLater = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
    // Only show upcoming events in the main listing
    return upcomingEvents.filter((e) => {
      const matchQuery = q.length === 0 || [e.title, e.shortDescription, e.city, e.location].filter(Boolean).some((t) => String(t).toLowerCase().includes(q));
      const matchCategory = category === "All" ? true : category === "Popular Events" ? Boolean(e.isPopular) : e.category === (category as any) || (e.categories as any)?.includes(category);
      const iso = parseStartDate(e.date);
      let matchDate = true;
      if (dateFilter !== "All") {
        const d = new Date(iso);
        if (isNaN(d.getTime())) {
          matchDate = true;
        } else if (dateFilter === "Upcoming") {
          matchDate = d >= now;
        } else if (dateFilter === "This Month") {
          matchDate = d >= startOfMonth && d <= endOfMonth;
        } else if (dateFilter === "Next 3 Months") {
          matchDate = d >= now && d <= threeMonthsLater;
        }
      }
      return matchQuery && matchCategory && matchDate;
    });
  }, [query, category, dateFilter, upcomingEvents]);

  return (
    <>
      {featured && <FeaturedEvent event={featured} />}
      <section className="section border-t border-border/50">
        <div className="container-x mx-auto max-w-7xl">
          <div className="bg-surface-2 rounded-2xl p-4 mb-8">
            <div className="max-w-2xl mx-auto relative mb-4 pb-4 border-b border-border">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold/50" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events"
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
            <div className="mb-2 text-[10px] tracking-[0.2em] text-text-secondary">CATEGORY</div>
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
              {["All", "Popular Events", "Music Festivals", "Art Exhibitions", "Cultural & Heritage"].map((c) => {
                const active = category === c;
                const base = "rounded-full min-h-[40px] px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200";
                const cls = active
                  ? "bg-accent-gold/15 border border-accent-gold text-accent-gold font-semibold"
                  : "bg-transparent border border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70";
                return (
                  <button key={c} onClick={() => setCategory(c)} className={`${base} ${cls}`}>
                    {c}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 mb-2 text-[10px] tracking-[0.2em] text-text-secondary">DATE</div>
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
              {["Upcoming", "This Month", "Next 3 Months", "All"].map((d) => {
                const active = dateFilter === d;
                const base = "rounded-full min-h-[40px] px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200";
                const cls = active
                  ? "bg-accent-gold/15 border border-accent-gold text-accent-gold font-semibold"
                  : "bg-transparent border border-border text-text-secondary hover:border-accent-gold/40 hover:text-accent-gold/70";
                return (
                  <button key={d} onClick={() => setDateFilter(d)} className={`${base} ${cls}`}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-sm text-text-secondary mb-4">Showing {filtered.length} events</div>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-accent-gold uppercase tracking-widest text-xs mb-4">COMING SOON</p>
              <h2 className="font-serif text-3xl text-text-primary mb-4">New Events Coming Soon</h2>
              <p className="text-text-secondary">Check back soon for upcoming Egypt events and festivals.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <Compass size={36} className="mx-auto mb-3 text-accent-gold" />
              <h3 className="font-serif text-2xl text-text-primary mb-1">No results found</h3>
              <p className="text-text-secondary mb-3">Try adjusting your filters or search term</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setDateFilter("Upcoming");
                }}
                className="text-accent-gold underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity">
              {filtered.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          )}

          {/* Past Events Archive */}
          {pastEvents.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/50">
              <button
                onClick={() => setShowPastEvents(!showPastEvents)}
                className="flex items-center gap-2 mx-auto text-sm text-text-secondary hover:text-accent-gold transition-colors"
              >
                <span>{showPastEvents ? "Hide" : "View"} Past Events</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showPastEvents ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showPastEvents && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-widest text-text-secondary mb-6 text-center">Past Events Archive</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pastEvents.map((e) => (
                      <div key={e.slug} className="relative opacity-60 hover:opacity-80 transition-opacity">
                        <div className="absolute top-2 left-2 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          Past Event
                        </div>
                        <EventCard event={e} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

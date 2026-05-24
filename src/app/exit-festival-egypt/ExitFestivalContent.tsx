"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const WA_LINK =
  "https://wa.me/201016015723?text=Hi%20Syren%2C%20I%27m%20interested%20in%20the%20Exit%20Festival%20Egypt%20package%20(Oct%206-15%2C%202026)";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WAButton({
  label = "Message Us on WhatsApp",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-[#20b558] transition-all duration-300 shadow-lg hover:shadow-[#25D366]/30 hover:shadow-xl ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

function CompassWatermark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <polygon
        points="100,5 112,88 195,100 112,112 100,195 88,112 5,100 88,88"
        fill="currentColor"
      />
      <polygon
        points="100,30 108,88 170,100 108,112 100,170 92,112 30,100 92,88"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/20">
      <div
        className="h-full transition-[width] duration-100 bg-gradient-to-r from-[#7B6FA0] via-[#C1433A] to-[#2A8C72]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-t border-[#C9A84C]/20 py-3 px-6 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <span className="text-[#C9A84C] text-xs uppercase tracking-wider hidden sm:block">
          Exit Festival Egypt · Oct 6–15, 2026 · 10 Nights
        </span>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#20b558] transition-all"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Message Us →
        </a>
      </div>
    </div>
  );
}

const DAYS = [
  {
    phase: "CAIRO",
    phaseColor: "#7B6FA0",
    borderClass: "border-l-[#7B6FA0]",
    title: "OLD CAIRO BY NIGHT",
    date: "Day 1 · Oct 6 · Arrival",
    desc: "Airport pickup. Hotel check-in. Then straight to your Hotel before a night out into the old city as the evening light comes on. Khan el-Khalili, Al-Muizz Street, street food, places the tourists haven't found yet.",
    tags: ["PYRAMID-VIEW HOTEL", "OLD CAIRO CITY", "CITY TOUR"],
  },
  {
    phase: "CAIRO",
    phaseColor: "#7B6FA0",
    borderClass: "border-l-[#7B6FA0]",
    title: "GRAND EGYPTIAN MUSEUM",
    date: "Day 2 · Oct 7",
    desc: "The largest archaeological museum on earth. 100,000 artefacts including the complete Tutankhamun treasures. Your private guide navigates it so you see what matters.",
    tags: ["PRIVATE GUIDE", "FREE AFTERNOON", "GEM"],
  },
  {
    phase: "EXIT FESTIVAL",
    phaseColor: "#C1433A",
    borderClass: "border-l-[#C1433A]",
    title: "4 NIGHTS AT THE PYRAMIDS",
    date: "Days 3–6 · Oct 8–11",
    desc: "Pyramid-view hotel in Giza. Four nights of Exit Festival, multi-stage, international lineup, with one of the greatest backdrops in human history. The last night is always the one people talk about most.",
    tags: ["4 NIGHTS PARTY BY THE PYRAMIDS", "MULTI-STAGE"],
  },
  {
    phase: "RED SEA",
    phaseColor: "#2A8C72",
    borderClass: "border-l-[#2A8C72]",
    title: "CAIRO → HURGHADA",
    date: "Day 7 · Oct 12 · Transfer",
    desc: "Morning departure. Four and a half hours through dramatic Eastern Desert landscape. Then the Red Sea appears. Marina walk, seafood dinner as the water turns gold.",
    tags: ["EASTERN DESERT", "MARINA HURGHADA TOUR", "CHECK-IN"],
  },
  {
    phase: "RED SEA",
    phaseColor: "#2A8C72",
    borderClass: "border-l-[#2A8C72]",
    title: "BOAT PARTY · LIVE DJ · BBQ",
    date: "Day 8 · Oct 13",
    desc: "Private boat. Departs 10am. Giftun Island snorkel stop. Live DJ set. BBQ lunch on deck. Open bar. Open water. Back to shore at sunset.",
    tags: ["OPEN WATER", "BOAT PARTY", "LIVE DJ"],
  },
  {
    phase: "RED SEA",
    phaseColor: "#2A8C72",
    borderClass: "border-l-[#2A8C72]",
    title: "BEACH DAY & FAREWELL",
    date: "Day 9 · Oct 14",
    desc: "The day is yours. Beach, pool, whatever you need. In the evening the group comes together one last time, farewell dinner somewhere worth remembering.",
    tags: ["FREE DAY", "FAREWELL DINNER", "CITY TOUR"],
  },
];

const INCLUSIONS = [
  {
    title: "Airport Pickup & All Transfers",
    desc: "Private vehicle from arrival to departure. Every move between Cairo, Giza & Hurghada.",
  },
  {
    title: "10 Nights Accommodation",
    desc: "Cairo hotel · Pyramid-view hotel in Giza · Red Sea resort in Hurghada.",
  },
  {
    title: "Boat Party Charter",
    desc: "Full day on the Red Sea. Live DJ, BBQ lunch on deck, open bar, Giftun Island snorkel.",
  },
  {
    title: "English-Speaking Guide",
    desc: "Your local Syren host throughout the entire journey. Not just a guide, part of the crew.",
  },
  {
    title: "24/7 Syren Concierge",
    desc: "WhatsApp-based concierge available around the clock. Any request, any hour.",
  },
  {
    title: "Group Community Access",
    desc: "Private Syren traveler group. Meet your crew before you land. Coordinate, connect, arrive together.",
  },
];

export default function ExitFestivalContent() {
  return (
    <>
      <ProgressBar />
      <StickyBar />

      {/* ── SECTION 1: HERO ─────────────────────────────── */}
      <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center overflow-hidden px-6 md:px-12">
        <CompassWatermark className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[50vw] max-w-[600px] text-[#C9A84C] opacity-5 pointer-events-none select-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-24 pb-40">
          <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-8">
            SYREN · CURATED SOCIAL TRAVEL · EGYPT · OCT 6–15, 2026
          </p>

          <h1 className="font-black uppercase leading-[0.88] mb-8">
            <span className="block text-6xl md:text-8xl lg:text-[9rem] text-white">
              THIS IS NOT
            </span>
            <span className="block text-6xl md:text-8xl lg:text-[9rem] text-[#C9A84C]">
              A FESTIVAL
            </span>
            <span className="block text-6xl md:text-8xl lg:text-[9rem] text-white/30">
              TRIP.
            </span>
          </h1>

          <p className="font-serif italic text-xl md:text-2xl text-white/60 mb-10 max-w-xl">
            This is the community you&apos;ve been looking for.
          </p>

          <WAButton />
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "10", label: "NIGHTS" },
              { value: "3", label: "DESTINATIONS" },
              { value: "4", label: "FESTIVAL NIGHTS" },
              { value: "OCT 6–15", label: "2026" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-black text-2xl md:text-3xl text-[#C9A84C]">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 right-6 md:right-12 flex flex-col items-center gap-2 text-white/25 select-none">
          <span className="text-[9px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
            SCROLL TO EXPLORE
          </span>
          <div className="w-px h-10 bg-[#C9A84C]/30" />
        </div>
      </section>

      {/* ── SECTION 2: WHAT SYREN IS ────────────────────── */}
      <section className="relative bg-[#0a0a0a] py-20 md:py-28 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <CompassWatermark className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] text-[#C9A84C] opacity-5 pointer-events-none select-none" />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-6">
              ABOUT SYREN
            </p>
            <h2 className="font-black uppercase leading-[0.9] text-5xl md:text-7xl mb-12">
              <span className="block text-white">MORE THAN</span>
              <span className="block text-white">
                A <span className="text-[#C9A84C]">TRAVEL</span> COMPANY
              </span>
            </h2>
          </Reveal>

          <Reveal className="max-w-3xl mb-14">
            <p className="font-serif italic text-white/65 text-lg leading-relaxed mb-6">
              &ldquo;Syren is a curated travel movement built for the generation
              that lives at the intersection of music, culture, and adventure. We
              don&apos;t sell tour packages. We design shared experiences —
              bringing together like-minded travelers from London, Madrid, Dubai,
              New York, São Paulo, and everywhere in between.&rdquo;
            </p>
            <p className="font-serif italic text-white/65 text-lg leading-relaxed">
              &ldquo;In Egypt, we hold the keys others don&apos;t. The rooftop
              nobody else finds. The desert camp where the bonfire outlasts
              midnight. The boat where the DJ plays until the Red Sea turns
              orange. We handle every detail so you arrive present, and leave
              transformed.&rdquo;
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "♪",
                  title: "MUSIC-FIRST",
                  desc: "Built around Egypt's festival scene. Exit, Zamna, Sandbox. We don't just get you there. We make it unforgettable.",
                },
                {
                  icon: "〜",
                  title: "RED SEA LIFE",
                  desc: "Three nights on the water. Private boats, coral reefs, DJ sets at sea. The best decompression on earth.",
                },
                {
                  icon: "◈",
                  title: "CAIRO AFTER DARK",
                  desc: "The old city by night is a different country. We take you through it. Shisha, street food, light-soaked alleys.",
                },
                {
                  icon: "⌘",
                  title: "HIDDEN KEYS",
                  desc: "Hidden rooftops. Local kitchens. Desert camps under stars. Places no algorithm will ever show you.",
                },
                {
                  icon: "⊕",
                  title: "INTERNATIONAL CREW",
                  desc: "Your travel group spans continents. These are people who share your taste in music, energy, and how to live.",
                },
                {
                  icon: "⚡",
                  title: "ZERO FRICTION",
                  desc: "Airport to hotel. Hotel to festival. Boat to beach. Everything moves so you never have to think about logistics.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-[#111] rounded-xl p-6 border-t-2 border-[#C9A84C] hover:shadow-[0_0_24px_rgba(201,168,76,0.12)] transition-all duration-300"
                >
                  <div className="text-2xl mb-3 text-[#C9A84C]">{card.icon}</div>
                  <h3 className="font-black uppercase text-white text-xs tracking-[0.2em] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3: THE COMMUNITY ────────────────────── */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-6">
              CURATED SOCIAL TRAVEL · EGYPT · OCT 6–15, 2026
            </p>
            <h2 className="font-black uppercase text-5xl md:text-6xl leading-[0.9] mb-3 text-white">
              THIS IS NOT A FESTIVAL TRIP.
            </h2>
            <p className="font-serif italic text-xl text-white/50 mb-14">
              This is the community you&apos;ve been looking for.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <p className="text-white/65 text-lg leading-relaxed font-serif">
                Syren brings together festival travelers from across the world,
                people who share the same music, energy, and appetite for the
                extraordinary. Together, we don&apos;t just attend Egypt&apos;s
                biggest events. We live them. Old cities after dark. Red Sea
                mornings. Rooftop dinners. Hidden places the guidebooks never
                found. Egypt, the way it was meant to be felt.
              </p>
            </Reveal>

            <Reveal>
              <ul className="space-y-5">
                {[
                  "International community of festival travelers",
                  "Music · Nightlife · Beach · Culture",
                  "Cairo · Exit Festival · Red Sea",
                  "Hidden gems & local experiences",
                  "Private concierge · 24/7 support",
                  "Everything handled. Nothing missed.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2.5 flex-shrink-0" />
                    <span className="font-sans text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: DAY BY DAY ───────────────────────── */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-6">
              THE JOURNEY DAY BY DAY
            </p>
            <h2 className="font-black uppercase leading-[0.9] text-5xl md:text-7xl mb-16">
              <span className="block text-white">THE FULL</span>
              <span className="block text-[#C9A84C]">EXPERIENCE</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {DAYS.map((card) => (
              <Reveal key={card.title}>
                <div
                  className={`bg-[#111] rounded-xl p-6 border-l-4 h-full flex flex-col`}
                  style={{ borderLeftColor: card.phaseColor }}
                >
                  <div className="mb-4">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: card.phaseColor }}
                    >
                      {card.phase}
                    </span>
                  </div>
                  <h3 className="font-black uppercase text-white text-lg mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white/35 text-xs uppercase tracking-wider mb-3">
                    {card.date}
                  </p>
                  <p className="text-white/65 text-sm leading-relaxed flex-1">
                    {card.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider border border-white/15 text-white/40 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mid CTA */}
          <Reveal>
            <div className="text-center py-14">
              <p className="text-white/35 text-xs mb-5 uppercase tracking-[0.3em]">
                Ready to join?
              </p>
              <WAButton />
              <p className="text-white/25 text-xs mt-3">
                We respond within minutes
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6: EVERYTHING HANDLED ──────────────── */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-6">
              PACKAGE INCLUSIONS · BOTH TIERS
            </p>
            <h2 className="font-black uppercase leading-[0.9] text-5xl md:text-7xl mb-16">
              <span className="block text-white">EVERYTHING</span>
              <span className="block text-[#C9A84C]">HANDLED</span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
              {INCLUSIONS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 py-6 border-b border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 7: TWO PACKAGE OPTIONS ─────────────── */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-6">
              CHOOSE YOUR EXPERIENCE
            </p>
            <h2 className="font-black uppercase text-5xl md:text-6xl leading-[0.9] mb-16 text-white">
              Two Ways to Join
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Full Experience */}
            <Reveal>
              <div className="bg-[#111] rounded-2xl p-8 border border-[#C9A84C]/40 hover:border-[#C9A84C] transition-all duration-300 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#C9A84C] text-black">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="font-black uppercase text-white text-2xl mb-1">
                  Cairo + Festival + Red Sea
                </h3>
                <p className="text-[#C9A84C] text-sm mb-1">9 Nights / 10 Days</p>
                <p className="text-white/35 text-xs uppercase tracking-wider mb-6">
                  Oct 6–15, 2026
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {[
                    "Old Cairo by night",
                    "Grand Egyptian Museum",
                    "4 nights Exit Festival",
                    "Boat party on the Red Sea",
                    "Farewell dinner in Hurghada",
                  ].map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-white/65 text-sm"
                    >
                      <span className="text-[#C9A84C]">✓</span> {h}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#20b558] transition-all w-full"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Reserve This →
                </a>
                <Link
                  href="/experiences/exit-cairo-festival-hurghada"
                  className="text-center text-[#C9A84C] text-xs mt-3 hover:underline block"
                >
                  View Package Details →
                </Link>
              </div>
            </Reveal>

            {/* Festival Only */}
            <Reveal>
              <div className="bg-[#111] rounded-2xl p-8 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 text-white/50">
                    ESSENTIALS
                  </span>
                </div>
                <h3 className="font-black uppercase text-white text-2xl mb-1">
                  Festival Only — Pyramids
                </h3>
                <p className="text-[#C9A84C] text-sm mb-1">4 Nights / 5 Days</p>
                <p className="text-white/35 text-xs uppercase tracking-wider mb-6">
                  Oct 8–12, 2026
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {[
                    "Pyramid-view hotel",
                    "4 nights Exit Festival",
                    "Private airport transfers",
                    "Daily breakfast",
                    "24/7 concierge",
                  ].map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-white/65 text-sm"
                    >
                      <span className="text-[#C9A84C]">✓</span> {h}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#20b558] transition-all w-full"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Reserve This →
                </a>
                <Link
                  href="/experiences/exit-festival-pyramids-only"
                  className="text-center text-[#C9A84C] text-xs mt-3 hover:underline block"
                >
                  View Package Details →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ────────────────────────── */}
      <section className="relative bg-[#0a0a0a] py-28 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <CompassWatermark className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] text-[#C9A84C] opacity-5 pointer-events-none select-none" />
        <div className="absolute inset-0 bg-gradient-radial from-[#C9A84C]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-serif italic text-5xl md:text-7xl text-[#C9A84C] mb-4">
              Egypt is ready.
            </h2>
            <p className="font-black uppercase text-3xl md:text-5xl text-white mb-8 leading-tight">
              The question is whether you are.
            </p>
            <p className="text-white/55 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              Spots are limited. The crew is forming. Message us on WhatsApp and
              we&apos;ll send you everything — pricing, availability, and what to
              expect.
            </p>
            <WAButton label="Message Us on WhatsApp →" />
            <p className="text-white/25 text-xs mt-8 tracking-wider">
              syrentravel.com · info@syrentravel.com · +20 1016015723
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bottom padding for sticky bar */}
      <div className="h-20" />
    </>
  );
}

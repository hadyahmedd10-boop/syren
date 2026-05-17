import type { Metadata } from "next";
import Link from "next/link";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Best Time to Visit Egypt 2026 | Syren",
  description: "Planning a trip to Egypt? Discover the best time to visit month by month — weather, crowds, festivals, and expert tips from Syren's local team in Cairo.",
  keywords: ["best time to visit egypt", "egypt weather", "when to visit egypt", "egypt travel seasons", "egypt climate"],
  alternates: { canonical: "/best-time-to-visit-egypt" },
  openGraph: {
    title: "Best Time to Visit Egypt 2026 | Syren",
    description: "Planning a trip to Egypt? Discover the best time to visit month by month — weather, crowds, festivals, and expert tips from Syren's local team in Cairo.",
    url: "https://www.syrentravel.com/best-time-to-visit-egypt",
    type: "article",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

export default function BestTimeToVisitPage() {
  const months = [
    { name: "January", desc: "Peak season. Cool and clear across Cairo and Luxor (15-20°C). The Pyramids at sunrise with crisp air is one of Egypt's finest experiences. Book early — this is the busiest month." },
    { name: "February", desc: "Still excellent. Comfortable temperatures, fewer crowds than January. Almond blossoms in Fayoum. Valentine's month means romantic Nile cruises are in high demand." },
    { name: "March", desc: "Transition month. Warming up, occasional khamsin sandstorms possible. Still very good for most activities. Spring light is beautiful for photography." },
    { name: "April", desc: "Getting warm (25-30°C in Cairo). Excellent for the Red Sea. Easter travelers arrive. One of the best months for Luxor and Aswan before summer heat." },
    { name: "May", desc: "Hot but manageable. Red Sea diving at its best — water visibility exceptional. Inland sites get warm midday; early morning visits essential." },
    { name: "June–August", desc: "Summer. Cairo and Luxor are genuinely hot (35-42°C). Not impossible but demanding. The Red Sea coast (Hurghada, Sharm) is perfect — sea breezes, warm water, beach weather." },
    { name: "September", desc: "The heat begins to ease. Transition into the best season. Red Sea still warm. Crowds thin out before the October rush returns." },
    { name: "October", desc: "One of the best months. Perfect temperature balance everywhere (20-28°C). Festivals begin. Zamna Egypt historically happens in this window." },
    { name: "November", desc: "Excellent across the board. Cool evenings, warm days. Luxor and Aswan are beautiful. Cruise season in full swing." },
    { name: "December", desc: "Festive season. Christmas travelers arrive. Cool and crisp in Cairo (12-18°C). New Year on the Nile is extraordinary." },
  ];

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Travel Seasons"
        title="When Is the Best Time to Visit Egypt?"
        subtitle="The honest month-by-month guide from people who live here."
        heightClassName="min-h-[50vh] md:min-h-[58vh]"
      />

      <article className="section">
        <div className="container-x mx-auto max-w-3xl font-serif">
          <div className="mb-10">
            <div className="uppercase tracking-[0.25em] text-accent-gold text-xs font-bold mb-2">The Short Answer</div>
            <p className="text-text-primary leading-relaxed">
              Egypt is a year-round destination — but the experience varies dramatically depending on when you arrive. The sweet spots are October through April, when temperatures are comfortable across the country and the desert doesn't try to test your limits. Summer brings intense heat inland, though the Red Sea coast remains a legitimate escape. Here's what each season actually looks like on the ground.
            </p>
          </div>
        </div>
      </article>

      <section className="section bg-surface/30 border-y border-border/50">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Month by Month" label="What It Feels Like" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {months.map((m) => (
              <div key={m.name} className="rounded-2xl border border-accent-gold/30 bg-background p-5">
                <div className="uppercase tracking-widest text-accent-gold text-xs font-bold mb-2">{m.name}</div>
                <p className="font-serif text-text-secondary leading-relaxed">
                  {m.name === "October" ? (
                    <>
                      One of the best months. Perfect temperature balance everywhere (20-28°C). Festivals begin.{" "}
                      <Link href="/events/zamna-festival" className="text-accent-gold underline">Zamna Egypt</Link> historically happens in this window.
                    </>
                  ) : (
                    m.desc
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x mx-auto max-w-3xl font-serif">
          <div className="mb-10">
            <div className="uppercase tracking-[0.25em] text-accent-gold text-xs font-bold mb-2">What About Ramadan?</div>
            <p className="text-text-primary leading-relaxed">
              Traveling during Ramadan requires some adjustment but offers a unique window into Egyptian culture that few tourists experience. Restaurants adjust hours, the evening iftar atmosphere is extraordinary, and the country takes on a warmth and communal energy that's genuinely special. We recommend it with the right preparation — which is exactly what Syren provides.
            </p>
          </div>
          <div className="mb-10">
            <div className="uppercase tracking-[0.25em] text-accent-gold text-xs font-bold mb-2">Syren&apos;s Top Pick</div>
            <p className="text-text-primary leading-relaxed">
              If we had to choose one month for a first-time visitor: October or November. Perfect weather, festivals happening, crowds manageable, and the country feeling alive in the best possible way. If a Nile cruise is on your list, consider our{" "}
              <Link href="/experiences/nile-signature" className="text-accent-gold underline">Nile Signature</Link> itinerary.
            </p>
          </div>
          <div className="rounded-2xl bg-black/90 border border-accent-gold/30 p-8 md:p-10 text-center">
            <div className="font-serif text-2xl text-text-primary mb-3">Plan Your Egypt Trip</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/experiences" className="syren-btn">Explore Experiences →</Link>
              <Link href="/quote" className="syren-btn-secondary">Request a Quote →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Hurghada to Cairo Day Trip Guide | Syren",
  description: "Plan the perfect Hurghada to Cairo day trip in 2026. By car or plane, what to see, how long it takes, and how to book a private guided tour with Syren.",
  keywords: ["hurghada to cairo day trip", "cairo day trip from hurghada", "hurghada cairo transfer", "day trip cairo from hurghada", "hurghada cairo by plane"],
  alternates: { canonical: "/hurghada-to-cairo-day-trip" },
  openGraph: {
    title: "Hurghada to Cairo Day Trip Guide | Syren",
    description: "Plan the perfect Hurghada to Cairo day trip in 2026. By car or plane, what to see, how long it takes, and how to book a private guided tour with Syren.",
    url: "https://www.syrentravel.com/hurghada-to-cairo-day-trip",
    type: "article",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

export default function HurghadaToCairoPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Routes & Logistics"
        title="Hurghada to Cairo: The Ultimate Day Trip Guide"
        subtitle="The Pyramids are 4 hours away. Here's exactly how to do it — and do it right."
        heightClassName="min-h-[46vh] md:min-h-[52vh]"
      />

      <section className="section">
        <div className="container-x mx-auto max-w-3xl font-serif">
          <div className="mb-10">
            <div className="uppercase tracking-[0.25em] text-accent-gold text-xs font-bold mb-2">Can You Really Do Cairo in a Day from Hurghada?</div>
            <p className="text-text-primary leading-relaxed">
              Yes — and thousands of travelers do it every year. The distance between Hurghada and Cairo is approximately 480km, and there are two ways to make the journey: by private car (around 4-5 hours each way) or by domestic flight (45 minutes). Both are viable depending on your budget and how much time you want to spend at the sites rather than in transit.
            </p>
          </div>

          <div className="mb-10">
            <SectionHeader title="Option 1: By Car" label="Private Transfer" className="mb-3" />
            <p className="text-text-secondary leading-relaxed">
              The road from Hurghada to Cairo passes through dramatic desert scenery — rolling dunes, occasional Bedouin settlements, and the moment the city emerges from the haze. A private air-conditioned vehicle with a professional driver is the most flexible option. You leave at your pace, stop if you want, and arrive ready to explore. Total journey time: 4-5 hours each way. Best for: travelers who want flexibility and don't mind the drive.
            </p>
          </div>

          <div className="mb-10">
            <SectionHeader title="Option 2: By Plane" label="Domestic Flights" className="mb-3" />
            <p className="text-text-secondary leading-relaxed">
              EgyptAir and other carriers operate multiple daily flights between Hurghada and Cairo. The flight itself is around 45 minutes, and with airport transfers factored in, total transit time is 2-2.5 hours each way. This gives you significantly more time at the sites — ideal if you're focused on the Pyramids and Grand Egyptian Museum. Total transit time: 2-2.5 hours each way. Best for: travelers who want maximum time in Cairo.
            </p>
          </div>

          <div className="mb-10">
            <SectionHeader title="What to See in One Day" label="Perfectly Paced" className="mb-3" />
            <p className="text-text-secondary leading-relaxed">
              A well-planned Cairo day trip from Hurghada covers: The Pyramids of Giza and Sphinx (2-3 hours), a local lunch near Giza (1 hour), The Grand Egyptian Museum or Egyptian Museum (2 hours), Khan El Khalili bazaar (1 hour). That's a full, rich day without feeling rushed — especially with a private guide who knows how to move efficiently between sites.
            </p>
          </div>

          <div className="mb-10">
            <SectionHeader title="The Syren Difference" label="Private & Precise" className="mb-3" />
            <p className="text-text-secondary leading-relaxed">
              Booking a Cairo day trip through Syren means a private air-conditioned vehicle or flight transfer, a licensed expert guide at every site, a curated lunch reservation, and a concierge available throughout the day. No group tours, no waiting, no compromise.
            </p>
          </div>

          <div className="rounded-2xl bg-black/90 border border-accent-gold/30 p-8 md:p-10 text-center">
            <div className="font-serif text-2xl text-text-primary mb-3">Book Your Cairo Day Trip</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/excursions/hurghada-cairo-day-trip" className="syren-btn">Reserve Now →</Link>
              <Link href="/quote" className="syren-btn-secondary">Request a Quote →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

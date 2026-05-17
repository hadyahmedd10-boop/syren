import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/sections/ExperienceCard";
import { Car, User, Building, Phone, Calendar, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Egypt Holiday Packages 2026 | Syren Travel",
  description:
    "Browse Syren's Egypt holiday packages for 2026. Private tours, Nile cruises, Red Sea escapes, and bespoke multi-day journeys curated by local Egypt experts.",
  keywords: [
    "egypt holiday packages",
    "egypt vacation packages",
    "egypt tour packages",
    "egypt travel packages",
    "egypt package holidays",
    "egypt all inclusive holidays",
  ],
  alternates: { canonical: "/egypt-holiday-packages" },
  openGraph: {
    title: "Egypt Holiday Packages 2026 | Syren Travel",
    description:
      "Browse Syren's Egypt holiday packages for 2026. Private tours, Nile cruises, Red Sea escapes, and bespoke multi-day journeys curated by local Egypt experts.",
    url: "https://www.syrentravel.com/egypt-holiday-packages",
    type: "website",
    images: [{ url: "/images/hero/luxury.jpg" }],
  },
};

export default function EgyptHolidayPackagesPage() {
  const included = [
    { title: "Private Airport Transfers", icon: Car },
    { title: "Licensed Expert Guides", icon: User },
    { title: "Hand-Picked Hotels", icon: Building },
    { title: "24/7 Concierge Support", icon: Phone },
    { title: "Flexible Itineraries", icon: Calendar },
    { title: "No Hidden Fees", icon: Shield },
  ];

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Holiday Packages"
        title="Egypt Holiday Packages"
        subtitle="Curated by local experts. Crafted for the extraordinary traveler."
        altText="Egypt Holiday Packages - Syren Travel Egypt"
        heightClassName="min-h-[50vh] md:min-h-[58vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="#packages" className="syren-btn">
            Browse Packages →
          </Link>
          <Link href="/quote" className="syren-btn-secondary">
            Get a Custom Quote →
          </Link>
        </div>
      </HeroShell>

      <section className="section">
        <div className="container-x mx-auto max-w-3xl">
          <div className="uppercase tracking-[0.25em] text-accent-gold text-xs font-bold mb-2">WHY SYREN</div>
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Not Just a Package. An Experience.</h2>
          <p className="font-serif text-text-secondary leading-relaxed">
            Most Egypt holiday packages give you a coach, a flag, and a schedule. Syren gives you a private guide who knows the back entrance to Karnak Temple. A driver who&apos;s been taking travelers to the Pyramids for fifteen years. A hotel room that faces the Nile. The difference isn&apos;t just the itinerary — it&apos;s the depth of local knowledge behind every single detail.
          </p>
        </div>
      </section>

      <section id="packages" className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Choose Your Egypt" label="Our Packages" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((experience) => (
              <div key={experience.slug}>
                <ExperienceCard
                  title={experience.title}
                  description={experience.description}
                  image={experience.heroImage}
                  alt={experience.title}
                  duration={experience.duration}
                  cities={experience.cities}
                  priceAmount={experience.price?.amount}
                  priceCurrency={experience.price?.currency}
                  href={`/experiences/${experience.slug}`}
                  slug={experience.slug}
                  itemType="experience"
                  buttonText="View Package →"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface/30 border-y border-border/50">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Every Package Includes" label="What’s Included" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {included.map(({ title, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-accent-gold/30 bg-background p-5 flex items-center gap-4">
                <Icon className="text-accent-gold" size={22} />
                <span className="font-serif text-text-primary">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x mx-auto max-w-3xl">
          <div className="uppercase tracking-[0.25em] text-accent-gold text-xs font-bold mb-2">THE DESTINATION</div>
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Why Egypt in 2026?</h2>
          <p className="font-serif text-text-secondary leading-relaxed">
            Egypt is having a moment. International festivals are drawing crowds from Europe, the Gulf, and the Americas. The Grand Egyptian Museum — the largest in the world — has opened its doors. New luxury hotels have transformed the Red Sea coast. And the Pyramids? They&apos;ve been waiting 4,500 years and they&apos;re not going anywhere. There has never been a better time to go.
          </p>
        </div>
      </section>

      <section className="section bg-black/90 border-t border-border">
        <div className="container-x mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="font-serif text-text-secondary leading-relaxed mb-6">
            Every Syren package can be customised. Tell us your dates, your interests, and your budget — our local team will craft something made entirely for you.
          </p>
          <Link href="/quote" className="syren-btn">
            Request a Custom Package →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-x mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div className="font-sans text-sm uppercase tracking-[0.25em] text-white/60">Local Egypt Experts</div>
            <div className="font-sans text-sm uppercase tracking-[0.25em] text-white/60">24/7 Concierge</div>
            <div className="font-sans text-sm uppercase tracking-[0.25em] text-white/60">Trusted by Travelers from 30+ Countries</div>
          </div>
        </div>
      </section>
    </main>
  );
}

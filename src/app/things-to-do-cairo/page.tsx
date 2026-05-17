import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import { experiences } from "@/data/experiences";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Things to Do in Cairo — Curated Guide | Syren",
  description:
    "Best things to do in Cairo—from the Pyramids to rooftops, Nile nights and underground events—Syren’s inside guide.",
  alternates: { canonical: "/things-to-do-cairo" },
  openGraph: {
    title: "Things to Do in Cairo — Curated Guide | Syren",
    description:
      "Best things to do in Cairo—from the Pyramids to rooftops, Nile nights and underground events—Syren’s inside guide.",
    url: "/things-to-do-cairo",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Things to Do in Cairo — Curated Guide | Syren",
    description:
      "Discover the best things to do in Cairo. From the Pyramids to hidden rooftops, Nile cruises to underground events — Syren's insider Cairo guide.",
  },
};

export default function ThingsToDoCairo() {
  const cairoExperiences = experiences.filter((e) => Array.isArray(e.destinations) && e.destinations.includes("cairo")).slice(0, 6);
  const cairoDestination = destinations.find((d) => d.slug === "cairo");

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="City Guide"
        title="Things to Do in Cairo"
        subtitle="From timeless wonders to modern rooftops — a curated guide for meaningful days and luminous nights."
        altText="Things to Do in Cairo — Curated Guide - Syren Travel Egypt"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/experiences" className="syren-btn">
            Explore Experiences
          </Link>
          <Link href="/destinations/cairo" className="syren-btn-secondary">
            Explore Cairo
          </Link>
        </div>
      </HeroShell>

      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl space-y-10">
          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-3">Essential Highlights</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Giza Plateau & the Sphinx</h3>
                <p className="text-text-secondary">Private entry timing and expert storytelling elevate a familiar icon into a personal moment.</p>
              </li>
              <li className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Islamic Cairo Rooftops</h3>
                <p className="text-text-secondary">Hidden terraces above medieval lanes — tea at sunset and a private oud set, if you wish.</p>
              </li>
              <li className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Nile by Night</h3>
                <p className="text-text-secondary">A private boat glide along the river’s quiet reaches with curated dining and music.</p>
              </li>
              <li className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Contemporary Galleries</h3>
                <p className="text-text-secondary">Guided access to galleries and studios shaping Cairo’s modern aesthetic.</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-3">Cairo Experiences</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {cairoExperiences.map((exp) => (
                <article key={exp.slug} className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-6">
                  <h3 className="font-serif text-xl text-text-primary">{exp.title}</h3>
                  {"description" in exp && exp.description && (
                    <p className="text-text-secondary mt-2">{exp.description}</p>
                  )}
                  <div className="mt-4">
                    <Link href={`/experiences/${exp.slug}`} className="syren-btn-secondary">
                      View Experience
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-text-primary mb-3">Explore the City</h2>
            <div className="rounded-2xl border border-accent-gold/30 bg-surface/30 p-6">
              <p className="text-text-secondary">
                Dive deeper into Cairo’s neighborhoods, cuisine, and cultural rhythm with our destination overview.
              </p>
              <div className="mt-4">
                <Link href={`/destinations/cairo`} className="syren-btn">
                  Go to Cairo Destination
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

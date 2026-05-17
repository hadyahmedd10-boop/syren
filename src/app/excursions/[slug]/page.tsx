import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/layout/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import { constructMetadata } from "@/lib/seo";
import BookingTrigger from "@/components/ui/BookingTrigger";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import HeroShell from "@/components/ui/HeroShell";
import ExcursionItinerary from "@/components/excursions/ExcursionItinerary";
import { excursions } from "@/data/excursions";
import { MessageSquare } from "lucide-react";
import { destinations } from "@/data/destinations";
import { HERO_IMAGES } from "@/lib/images";
import { SOCIAL_LINKS } from "@/config/social";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import SaveToggle from "@/components/ui/SaveToggle";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return excursions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const excursion = excursions.find((e) => e.slug === slug);

  if (!excursion) return { title: "Excursion Not Found | Syren" };

  const makeTitle = (s: string) => {
    const base = `${s} | Syren`;
    return base.length <= 60 ? base : `${base.slice(0, 57).trimEnd()}…`;
  };
  const title = makeTitle(excursion.title);
  const baseDesc = (excursion as any).seoDescription || excursion.shortDescription;
  let description = `${baseDesc} Private guided excursion from Hurghada. Book with Syren today.`;
  if (description.length < 150) {
    description = `${description} Includes licensed guides, private transfers, curated pacing, and seamless logistics handled by local experts.`;
  }
  if (description.length > 160) {
    description = `${description.slice(0, 157).trimEnd()}…`;
  }

  return {
    title,
    description,
    alternates: { canonical: `/excursions/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.syrentravel.com/excursions/${slug}`,
      type: "article",
      images: [
        {
          url:
            typeof (excursion.heroImage as any) === "string"
              ? (excursion.heroImage as string)
              : (excursion.heroImage as any)?.src ?? "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: excursion.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        typeof (excursion.heroImage as any) === "string"
          ? (excursion.heroImage as string)
          : (excursion.heroImage as any)?.src ?? "/og-image.jpg",
      ],
    },
  };
}

export default async function ExcursionPage({ params }: Props) {
  const { slug } = await params;
  const excursion = excursions.find((e) => e.slug === slug);

  if (!excursion) notFound();

  const destination = destinations.find((d) => d.slug === excursion.destinationSlug);
  const heroImage = excursion.heroImage || destination?.heroImage || HERO_IMAGES.home;

  return (
    <main className="min-h-screen bg-background">
      <ExitIntentPopup experienceTitle={excursion.title} />
      {/* Hero */}
      <HeroShell
        backgroundImage={typeof heroImage === "string" ? heroImage : heroImage.src}
        eyebrow={`${excursion.duration} · ${excursion.tourStyle} · ${excursion.availability}`}
        title={excursion.title}
        subtitle={excursion.shortDescription}
        altText={`${excursion.title} - Syren Travel Egypt`}
        heightClassName="min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh]"
      >
        <div className="flex justify-center">
          <SaveToggle slug={excursion.slug} itemType="excursion" className="text-white/80" labelUnsaved="Save this" labelSaved="Saved" />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppButton 
            label="Book This Excursion"
            location="excursion_hero"
            message={`I'm interested in the ${excursion.title} excursion.`}
          />
          <BookingTrigger
            title={excursion.title}
            slug={excursion.slug}
            basePriceAmount={Math.round((excursion.priceCents || 0) / 100)}
            basePriceCurrency={(excursion.currency || "usd").toUpperCase()}
            buttonLabel="Reserve Now →"
          />
        </div>
      </HeroShell>

      {/* Highlights */}
      <section className="py-16 md:py-24 bg-surface/30 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeader 
            title={`Highlights of ${excursion.title}`} 
            label="Key Experiences"
            className="mb-10"
          />

          <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {excursion.highlights.map((h) => (
              <div
                key={h}
                className="rounded-2xl border border-border bg-background p-4 hover:border-accent-gold/30 transition-colors duration-300"
              >
                <p className="font-sans text-xs md:text-sm text-text-primary leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <ExcursionItinerary 
        steps={excursion.itinerarySteps} 
        fallbackImage={(excursion.image || heroImage) as string} 
        title={`Your ${excursion.title} Journey`}
        parentTitle={excursion.title}
      />

      {/* Included */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeader title={`What’s Included in ${excursion.title}`} />

          <div className="mt-12 grid gap-4 md:gap-6 md:grid-cols-2">
            <div>
              <h3 className="label mb-6">Included</h3>
              <ul className="space-y-3">
                {excursion.included.map((x) => (
                  <li key={x} className="text-sm text-text-secondary">
                    • {x}
                  </li>
                ))}
              </ul>
            </div>

            {excursion.notIncluded?.length ? (
              <div>
                <h3 className="label mb-6">Not Included</h3>
                <ul className="space-y-3 opacity-80">
                  {excursion.notIncluded.map((x) => (
                    <li key={x} className="text-sm text-text-secondary">
                      • {x}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <FinalCTA as="section" className="section border-t border-border" />
    </main>
  );
}

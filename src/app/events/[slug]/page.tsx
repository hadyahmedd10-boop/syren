import type { Metadata } from "next";
// no automatic navigation imports
import { events } from "@/data/events";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const event = events.find((event) => event.slug === slug);

  if (!event) {
    return {
      title: "Events | Syren",
      description: "Explore premium events curated by Syren.",
    };
  }

  const title = event.seoTitle || `${event.title} | Syren`;
  const description = event.seoDescription || event.shortDescription;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://syrentravel.com";
  const heroImageUrl =
    typeof event.heroImage === "string" ? event.heroImage : event.heroImage.src;

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/events/${slug}`,
      siteName: "Syren",
      type: "article",
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [heroImageUrl],
    },
  };
}

export default function EventDetailPage({ params }: Props) {
  if (process.env.NODE_ENV === "development") {
    console.log("Current slug:", params.slug);
  }
  const event = events.find((e) => e.slug === params.slug);
  if (process.env.NODE_ENV === "development") {
    console.log("Found event:", event);
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center py-32">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <Link href="/events">Back to Events</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="relative h-[60vh]">
        <Image
          src={typeof event.heroImage === "string" ? event.heroImage : event.heroImage.src}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <span className="syren-pill bg-black/60 border border-white/10 text-white/90 mb-4">{event.category}</span>
          <h1 className="hero-heading hero-title">{event.title}</h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.date}</span>
            <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.city}</span>
            {event.minAge && (
              <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.minAge}</span>
            )}
          </div>
        </div>
      </div>
      <section className="section bg-background">
        <div className="mx-auto max-w-4xl container-x">
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">About the Event</h2>
          <p className="text-text-secondary leading-relaxed">{event.fullDescription}</p>
        </div>
      </section>
 
      <section className="section bg-background">
        <div className="mx-auto max-w-7xl container-x">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-surface/40 p-6 text-center">
              <h3 className="font-serif text-xl text-text-primary mb-3">Date & Time</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.date}</span>
                <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.time}</span>
                {event.duration && (
                  <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.duration}</span>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 text-center">
              <h3 className="font-serif text-xl text-text-primary mb-3">Location</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.city}</span>
                <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.location}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 text-center">
              <h3 className="font-serif text-xl text-text-primary mb-3">Tickets</h3>
              <Link href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="syren-btn">
                Official Ticket Website
              </Link>
            </div>
          </div>
        </div>
      </section>
 
      {event.lineup && event.lineup.length > 0 && (
        <section className="section bg-background">
          <div className="mx-auto max-w-7xl container-x">
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Lineup</h2>
            {event.lineup.length === 1 && event.lineup[0].toUpperCase() === "TBA" ? (
              <span className="syren-pill border border-accent-gold/20 bg-accent-gold/5 text-accent-gold/80">TBA</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {event.lineup.map((artist) => (
                  <span key={artist} className="syren-pill border border-accent-gold/20 bg-accent-gold/5 text-accent-gold/80">
                    {artist}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {event.houseRules && event.houseRules.length > 0 && (
        <section className="section bg-background">
          <div className="mx-auto max-w-7xl container-x">
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">House Rules</h2>
            <ul className="list-disc ml-6 space-y-2">
              {event.houseRules.map((rule) => (
                <li key={rule} className="text-text-secondary">{rule}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
 
      <section className="section bg-background">
        <div className="mx-auto max-w-7xl container-x">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">{event.curatedPackage.title}</h2>
            <p className="text-text-secondary mb-6">{event.curatedPackage.description}</p>
            <ul className="grid md:grid-cols-2 gap-3 mb-6">
              {event.curatedPackage.inclusions.map((inc) => (
                <li key={inc} className="text-text-secondary">• {inc}</li>
              ))}
            </ul>
            <Link href="/quote" className="syren-btn">
              {event.curatedPackage.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

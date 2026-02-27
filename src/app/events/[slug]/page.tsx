import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const event = events.find((event) => event.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const title = event.seoTitle || `${event.title} | Syren`;
  const description = event.seoDescription || event.shortDescription;
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
      url: `/events/${slug}`,
      siteName: "Syren",
      type: "article",
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: event.name,
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

export default function EventPage({ params }: Props) {
  const { slug } = params;
  const event = events.find((event) => event.slug === slug);

  if (!event) {
    notFound();
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
 
      <section className="section bg-background">
        <div className="mx-auto max-w-7xl container-x">
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Lineup</h2>
          <div className="flex flex-wrap gap-2">
            {event.lineup.map((artist) => (
              <span key={artist} className="syren-pill border border-accent-gold/20 bg-accent-gold/5 text-accent-gold/80">
                {artist}
              </span>
            ))}
          </div>
        </div>
      </section>
 
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

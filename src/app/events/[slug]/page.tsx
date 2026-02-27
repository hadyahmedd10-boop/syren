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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="hero-heading hero-title">{event.title}</h1>
          <p className="mt-4 text-lg">{event.date}</p>
          <p className="mt-2 text-lg">{event.city}</p>
        </div>
      </div>
      <div className="section">
        <div className="mx-auto max-w-4xl container-x">
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">About the Event</h2>
          <p className="text-text-secondary mb-6">{event.fullDescription}</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Artist Lineup</h2>
          <ul className="list-disc ml-6 mb-6">
            {event.lineup.map((artist) => (
              <li key={artist} className="text-text-secondary">{artist}</li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Tickets</h2>
          <p className="mb-6">
            <Link href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
              Official Ticket Website
            </Link>
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">Curated Package</h2>
          <h3 className="font-serif text-xl text-text-primary mb-2">{event.curatedPackage.title}</h3>
          <p className="text-text-secondary mb-4">{event.curatedPackage.description}</p>
          <ul className="list-disc ml-6 mb-6">
            {event.curatedPackage.inclusions.map((inc) => (
              <li key={inc} className="text-text-secondary">{inc}</li>
            ))}
          </ul>
          <Link href="/quote" className="syren-btn-primary">
            {event.curatedPackage.ctaLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}

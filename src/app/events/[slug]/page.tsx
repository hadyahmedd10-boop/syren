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

  const title = `${event.name} | Syren`;
  const description = event.description;
  const heroImageUrl = event.thumbnail.src;

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
          src={event.thumbnail}
          alt={event.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="font-serif text-5xl font-bold">{event.name}</h1>
          <p className="mt-4 text-lg">{event.date}</p>
          <p className="mt-2 text-lg">{event.location}</p>
        </div>
      </div>
      <div className="section">
        <div className="mx-auto max-w-4xl container-x">
          <div className="prose prose-invert max-w-none">
            <h2>About the Event</h2>
            <p>{event.overview}</p>
            <h2>Artist Lineup</h2>
            <ul>
              {event.artistLineup.map((artist) => (
                <li key={artist}>{artist}</li>
              ))}
            </ul>
            <h2>Tickets</h2>
            <p>
              <Link href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                Official Ticket Website
              </Link>
            </p>
            <h2>Syren's Curated Package</h2>
            <h3>{event.syrenPackage.title}</h3>
            <p>{event.syrenPackage.description}</p>
            <Link href="/quote" className="syren-btn-primary">
              {event.syrenPackage.cta}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

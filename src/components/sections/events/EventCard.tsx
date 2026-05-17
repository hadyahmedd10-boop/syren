 import Image from "next/image";
 import Link from "next/link";
 import type { Event } from "@/data/events";
 const BLUR_DATA_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
 
 export default function EventCard({ event, label }: { event: Event; label?: string }) {
   const img = typeof event.heroImage === "string" ? event.heroImage : event.heroImage.src;
   return (
    <Link href={`/events/${event.slug}`} className="group block cursor-pointer">
      <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/60 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]">
        <div className="relative w-full overflow-hidden aspect-[4/3] rounded-t-lg">
          <Image
            src={img}
            alt={`${event.title} - Egypt Event`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          {label && (
            <div className="absolute left-3 top-3 z-10">
              <span className="bg-accent-gold text-black text-xs font-bold uppercase px-2 py-1 rounded">
                {label}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 text-left">
          {event.city && (
            <div className="text-xs uppercase tracking-[0.2em] text-text-secondary">
              {event.city}
            </div>
          )}
          <h3 className="font-serif text-lg sm:text-xl text-text-primary tracking-tight">
            <span className="line-clamp-2">{event.title}</span>
          </h3>
          <div className="mt-1 text-sm text-text-secondary">
            {event.displayDate ?? event.date}
          </div>
        </div>
      </article>
    </Link>
   );
 }
 

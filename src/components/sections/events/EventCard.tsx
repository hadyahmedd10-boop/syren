 import Image from "next/image";
 import Link from "next/link";
 import type { Event } from "@/data/events";
 
 export default function EventCard({ event }: { event: Event }) {
   const img = typeof event.heroImage === "string" ? event.heroImage : event.heroImage.src;
   return (
     <Link href={`/events/${event.slug}`} className="group block">
       <article className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-accent-gold/30">
         <div className="relative">
           <Image
             src={img}
             alt={event.title}
             width={1200}
             height={800}
             className="aspect-[16/10] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
           <div className="absolute top-3 left-3 flex items-center gap-2">
             <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.date}</span>
             <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.city}</span>
           </div>
         </div>
         <div className="p-4">
           <h3 className="font-serif text-xl text-text-primary tracking-tight">{event.title}</h3>
           <p className="mt-1 text-sm text-text-secondary">{event.shortDescription}</p>
           <div className="mt-4 pt-2 border-t border-border flex items-center justify-between">
             <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Learn more</span>
             <span className="text-[10px] uppercase tracking-[0.2em] text-accent-gold">View details</span>
           </div>
         </div>
       </article>
     </Link>
   );
 }
 

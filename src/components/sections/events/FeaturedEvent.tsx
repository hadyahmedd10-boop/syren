import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import BookingTrigger from "@/components/ui/BookingTrigger";
 import type { Event } from "@/data/events";
 
 export default function FeaturedEvent({ event }: { event: Event | null }) {
   if (!event) return null;
   const img = typeof event.heroImage === "string" ? event.heroImage : event.heroImage.src;
   return (
     <section className="section bg-background">
       <div className="mx-auto max-w-7xl container-x">
         <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-md">
           <div className="grid md:grid-cols-12 gap-0">
             <div className="md:col-span-7 relative">
              <SafeImage
                src={img}
                alt={`${event.title} - Egypt Event`}
                className="object-cover h-full w-full"
              />
               <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />
               <div className="absolute bottom-4 left-4 flex items-center gap-2">
                 <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.displayDate ?? event.date}</span>
                 <span className="syren-pill bg-black/60 border border-white/10 text-white/90">{event.city}</span>
               </div>
             </div>
             <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-center">
               <h3 className="font-serif text-2xl md:text-3xl text-text-primary mb-2">{event.title}</h3>
               <p className="text-text-secondary mb-6">{event.shortDescription}</p>
               <div className="flex flex-col sm:flex-row gap-4">
                 <Link href={`/events/${event.slug}`} className="syren-btn">
                  Explore Events →
                 </Link>
                <BookingTrigger
                  title={event.title}
                  slug={event.slug}
                  buttonLabel="Reserve Now →"
                  variant="secondary"
                />
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 }
 

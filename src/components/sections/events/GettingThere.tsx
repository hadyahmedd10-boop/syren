import type { Event } from "@/data/events";
import VehicleSelector from "@/components/ui/VehicleSelector";

/**
 * Slim "Getting there" strip for upcoming event pages. Shows the venue, the
 * date, three suggested vehicles by group size and a single CTA.
 */
export default function GettingThere({ event }: { event: Event }) {
  const when = event.displayDate ?? event.date;
  const place = [event.location, event.city].filter(Boolean).join(", ");

  return (
    <section className="section-tight border-t border-accent-gold/20 bg-surface/30">
      <div className="container-x mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Getting there</p>
        <h2 className="mt-2 font-serif text-2xl text-text-primary md:text-3xl">
          Getting to {event.title}
        </h2>
        <p className="mt-2 text-text-secondary">
          {place}
          {place && when ? " · " : ""}
          {when}
        </p>
        <div className="mt-6">
          <VehicleSelector
            variant="band"
            heading="Suggested vehicles by group size"
            contextLabel={event.title}
          />
        </div>
      </div>
    </section>
  );
}

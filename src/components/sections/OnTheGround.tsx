import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/layout/SectionHeader";
import { vehicles } from "@/data/vehicles";

/** Representative trio of existing fleet thumbnails. */
const transferThumbs = ["economy", "suv", "minibus"]
  .map((id) => vehicles.find((v) => v.id === id))
  .filter((v): v is (typeof vehicles)[number] => Boolean(v));

const tiles = [
  {
    title: "Hotels & stays",
    copy: "Stays arranged by Syren around your itinerary, confirmed in writing before any payment.",
    href: "/destinations",
  },
  {
    title: "Private transfers",
    copy: "Airport pickups, city runs and intercity drives — private to your group.",
    href: "/transfers",
    thumbs: true,
  },
  {
    title: "Guided tours",
    copy: "Expert local guides across Cairo, the Nile, Luxor and the Red Sea.",
    href: "/experiences",
  },
  {
    title: "Festival tickets",
    copy: "Arranged on request — priced separately by tier and availability when you book.",
    href: "/festival-travel-egypt",
  },
] as const;

export default function OnTheGround() {
  return (
    <section className="bg-surface/30 py-12 md:py-16 lg:py-20">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeader
          label="On the ground"
          title="Everything handled, door to door"
          description="One team for your stay, your transfers, your tours and your tickets in Egypt."
          align="center"
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group flex h-full flex-col rounded-2xl border border-accent-gold/20 bg-surface/30 p-6 transition-all duration-300 hover:border-accent-gold/50 hover:-translate-y-1"
            >
              <h3 className="font-serif text-xl text-text-primary">{tile.title}</h3>
              <div className="mt-3 h-px w-10 bg-accent-gold/60 transition-all duration-300 group-hover:w-16" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                {tile.copy}
              </p>
              {"thumbs" in tile && tile.thumbs && (
                <div className="mt-5 flex items-end gap-3">
                  {transferThumbs.map((v) => (
                    <div key={v.id} className="relative h-10 w-16">
                      <Image
                        src={v.smallImage}
                        alt={`${v.name} transfer vehicle`}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
              <span className="mt-5 text-xs uppercase tracking-[0.2em] text-accent-gold-ink">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

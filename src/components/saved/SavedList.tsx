"use client";
import useWishlist from "@/hooks/useWishlist";
import { experiences } from "@/data/experiences";
import { excursions } from "@/data/excursions";
import ExperienceCard from "@/components/sections/ExperienceCard";
import Reveal from "@/components/motion/Reveal";
import Link from "next/link";

export default function SavedList() {
  const { savedItems, clearAll } = useWishlist();

  const items = savedItems.map((i) => {
    if (i.type === "experience") {
      const exp = experiences.find((e) => e.slug === i.slug);
      if (!exp) return null;
      return {
        slug: exp.slug,
        type: "experience" as const,
        title: exp.title,
        description: exp.description,
        image: exp.heroImage,
        duration: exp.duration,
        cities: exp.cities,
        href: `/experiences/${exp.slug}`,
      };
    } else {
      const ex = excursions.find((e) => e.slug === i.slug);
      if (!ex) return null;
      return {
        slug: ex.slug,
        type: "excursion" as const,
        title: ex.title,
        description: ex.shortDescription,
        image: ex.image || ex.heroImage,
        duration: ex.duration,
        cities: ex.city,
        href: `/excursions/${ex.slug}`,
      };
    }
  }).filter(Boolean) as Array<{
    slug: string;
    type: "experience" | "excursion";
    title: string;
    description: string;
    image: any;
    duration?: string;
    cities?: string;
    href: string;
  }>;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface/40 p-8 text-center">
        <p className="text-text-secondary mb-4">You haven&apos;t saved anything yet.</p>
        <Link href="/experiences" className="syren-btn-secondary inline-flex min-h-[44px]">Start exploring →</Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-text-secondary">Showing {items.length} saved items</div>
        <button onClick={clearAll} className="text-sm text-accent-gold hover:underline">Clear all</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <Reveal key={`${it.type}-${it.slug}`} delay={0.05 * (idx + 1)}>
            <ExperienceCard
              title={it.title}
              description={it.description}
              image={it.image}
              alt={it.title}
              duration={it.duration}
              cities={it.cities}
              href={it.href}
              slug={it.slug}
              itemType={it.type}
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}

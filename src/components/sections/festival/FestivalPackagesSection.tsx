import Link from "next/link";
import { getPackagesByEventSlug } from "@/data/festivalPackages";
import FestivalPackageCard from "./FestivalPackageCard";

type Props = {
  eventSlug: string;
  page: string;
  heading?: string;
  intro?: string;
  /** Optional link to the event's landing page (set from the event detail page). */
  guideHref?: string;
  guideLabel?: string;
  /** Rendered instead of the grid when the festival has no published packages. */
  emptyNotice?: React.ReactNode;
};

export default function FestivalPackagesSection({
  eventSlug,
  page,
  heading = "Festival travel packages",
  intro,
  guideHref,
  guideLabel,
  emptyNotice,
}: Props) {
  const packages = getPackagesByEventSlug(eventSlug);

  if (packages.length === 0) {
    return emptyNotice ? (
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">{emptyNotice}</div>
      </section>
    ) : null;
  }

  return (
    <section
      id="packages"
      className="section border-t border-border bg-background scroll-mt-24"
    >
      <div className="container-x mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary">{heading}</h2>
        {intro && (
          <p className="mt-3 max-w-3xl text-text-secondary leading-relaxed">{intro}</p>
        )}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <FestivalPackageCard key={pkg.id} pkg={pkg} page={page} />
          ))}
        </div>
        {guideHref && (
          <Link
            href={guideHref}
            className="mt-6 inline-block text-sm text-accent-gold underline underline-offset-2"
          >
            {guideLabel}
          </Link>
        )}
        <p className="mt-6 text-sm text-text-secondary">
          Package inclusions are confirmed in writing before any payment. Prices are shown only
          once agreed with our suppliers — &ldquo;Price on request&rdquo; means we quote you
          directly.
        </p>
      </div>
    </section>
  );
}

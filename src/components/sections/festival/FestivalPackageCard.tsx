"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { FestivalPackage, PackageStatus } from "@/data/festivalPackages";
import {
  FESTIVAL_TICKETS_COPY,
  formatPackagePrice,
  getLandingPathForPackage,
  ticketsWhatsappMessage,
} from "@/data/festivalPackages";
import { getFestivalImage } from "@/lib/festivalMeta";
import { waLink } from "@/lib/whatsapp";
import BookingDrawer, { type BookingDrawerHandle } from "@/components/ui/BookingDrawer";
import {
  trackFestivalPackageView,
  trackWaitlistOpen,
  trackWaitlistSubmit,
  trackWhatsappClick,
} from "@/lib/track";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Deterministic formatter (locale-independent) so SSR and client markup match. */
function formatDayMonth(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  if (!m || !d) return iso;
  return `${d} ${MONTHS[m - 1]}`;
}

const CTA_LABEL: Record<PackageStatus, string> = {
  enquire: "Join the early-access list",
  available: "Check availability on WhatsApp",
  "sold-out": "Join the early-access list",
  ended: "This edition has ended",
};

type Props = {
  pkg: FestivalPackage;
  /** Page the card is rendered on, used for GA4 attribution. */
  page: string;
  className?: string;
};

export default function FestivalPackageCard({ pkg, page, className = "" }: Props) {
  const drawerRef = useRef<BookingDrawerHandle>(null);
  const image = getFestivalImage(pkg.eventSlug);
  const landingPath = getLandingPathForPackage(pkg);
  const confirmedIncludes = pkg.includes.filter((inc) => inc.confirmed);
  const priceLabel = formatPackagePrice(pkg);
  const isEnquire = pkg.status === "enquire" || pkg.status === "sold-out";
  const isAvailable = pkg.status === "available";
  const isEnded = pkg.status === "ended";

  const whatsappMessage = `Hi Syren — I'd like to join the early-access list for the ${pkg.name} festival travel package.`;
  const waHref = waLink(whatsappMessage);
  const ticketsHref = waLink(ticketsWhatsappMessage(pkg.name));
  const isFlexibleStay = pkg.stayWindows.some((w) => w.flexible);

  useEffect(() => {
    trackFestivalPackageView({ page, packageId: pkg.id, status: pkg.status });
  }, [page, pkg.id, pkg.status]);

  return (
    <article
      className={`syren-card syren-card-hover flex h-full flex-col overflow-hidden ${className}`}
    >
      <div className="relative w-full overflow-hidden rounded-t-lg aspect-[16/9]">
        <Image
          src={image}
          alt={`${pkg.name} — festival travel package`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        <div className="absolute left-3 top-3 z-10">
          <span className="bg-accent-gold text-black text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded">
            {pkg.tier === "signature" ? "Signature" : "Essentials"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 text-left">
        <h3 className="font-serif text-xl text-text-primary">{pkg.name}</h3>

        {pkg.stayWindows.length > 0 ? (
          <div className="mt-3">
            {isFlexibleStay && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                Suggested stay (flexible)
              </p>
            )}
            <ul className="mt-1 space-y-1 text-sm text-text-secondary">
              {pkg.stayWindows.map((w) => (
                <li key={`${w.checkIn}-${w.checkOut}`}>
                  {formatDayMonth(w.checkIn)} – {formatDayMonth(w.checkOut)}
                  <span className="text-text-secondary/70">
                    {" "}
                    · {w.nights} nights · show {formatDayMonth(w.showDate)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-3 text-sm text-text-secondary">
            Stay dates to be confirmed with the festival announcement.
          </p>
        )}

        {confirmedIncludes.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            {confirmedIncludes.map((inc) => (
              <li key={inc.text} className="flex gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-accent-gold-ink" aria-hidden />
                <span>{inc.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 rounded-lg border border-border bg-surface-2/30 p-4">
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
            Your transfers
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-text-secondary">
            <li>Arrival — private airport pickup</li>
            <li>Event nights — private festival transfers (hotel to venue and back)</li>
            <li>Departure — private airport drop-off</li>
          </ul>
        </div>

        <div className="mt-4 rounded-lg border border-accent-gold/30 bg-surface-2/40 p-4">
          <h4 className="font-serif text-sm text-text-primary">Festival tickets</h4>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {FESTIVAL_TICKETS_COPY}
          </p>
          <a
            href={ticketsHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick({ page, packageId: pkg.id })}
            className="mt-2 inline-block text-xs text-accent-gold-ink transition-colors hover:text-accent-gold-ink/80"
          >
            Ask about tickets →
          </a>
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
          {pkg.priceFrom !== null && (
            <span className="font-sans text-sm text-text-secondary">From</span>
          )}
          <span className={`font-serif text-xl text-accent-gold-ink ${pkg.priceFrom === null ? "ml-auto" : ""}`}>
            {priceLabel}
          </span>
        </div>

        <div className="mt-4">
          {isEnquire && (
            <>
              <button
                type="button"
                onClick={() => {
                  trackWaitlistOpen({ page, packageId: pkg.id });
                  drawerRef.current?.open();
                }}
                className="syren-btn w-full justify-center"
              >
                {pkg.ctaLabel || CTA_LABEL[pkg.status]}
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick({ page, packageId: pkg.id })}
                className="mt-3 block text-center text-xs text-accent-gold-ink hover:text-accent-gold-ink/80 transition-colors"
              >
                Or ask on WhatsApp →
              </a>
            </>
          )}

          {isAvailable && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick({ page, packageId: pkg.id })}
              className="syren-btn w-full justify-center"
            >
              {pkg.ctaLabel || CTA_LABEL[pkg.status]}
            </a>
          )}

          {isEnded && (
            <div className="space-y-3">
              <p className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-secondary">
                This edition has ended.
              </p>
              <Link
                href={landingPath}
                className="syren-btn-secondary w-full justify-center text-center"
              >
                See the next festival <ArrowRight size={16} className="ml-1 inline" aria-hidden />
              </Link>
            </div>
          )}

          <Link
            href={landingPath}
            className="mt-3 block text-center text-xs text-text-secondary hover:text-accent-gold-ink transition-colors"
          >
            Read the full {pkg.tier === "signature" ? "Signature" : "Essentials"} guide →
          </Link>
        </div>
      </div>

      <BookingDrawer
        ref={drawerRef}
        experienceTitle={pkg.name}
        experienceSlug={pkg.id}
        showFloatingTrigger={false}
        onSubmitted={() => trackWaitlistSubmit({ page, packageId: pkg.id })}
      />
    </article>
  );
}

"use client";

import { useRef } from "react";
import BookingDrawer, { type BookingDrawerHandle } from "@/components/ui/BookingDrawer";
import { waLink } from "@/lib/whatsapp";
import { trackWaitlistOpen, trackWaitlistSubmit, trackWhatsappClick } from "@/lib/track";

type Props = {
  /** Page the CTA sits on, used for GA4 attribution. */
  page: string;
  heading: string;
  body: string;
  /** Booking-drawer title, usually the package or festival name. */
  bookingTitle: string;
  /** Booking-drawer slug — the package id, or the festival event slug. */
  bookingSlug: string;
  buttonLabel: string;
  whatsappMessage: string;
  packageId?: string;
};

/**
 * Prominent early-access / enquiry call to action. The primary button opens the
 * existing booking drawer; the secondary link offers WhatsApp so travellers can
 * choose their channel.
 */
export default function FestivalEnquiryCta({
  page,
  heading,
  body,
  bookingTitle,
  bookingSlug,
  buttonLabel,
  whatsappMessage,
  packageId,
}: Props) {
  const drawerRef = useRef<BookingDrawerHandle>(null);

  return (
    <section className="section border-t border-border bg-surface/30">
      <div className="container-x mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary">{heading}</h2>
        <p className="mt-4 text-text-secondary leading-relaxed">{body}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              trackWaitlistOpen({ page, packageId });
              drawerRef.current?.open();
            }}
            className="syren-btn w-full sm:w-auto"
          >
            {buttonLabel}
          </button>
          <a
            href={waLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick({ page, packageId })}
            className="syren-btn-secondary w-full sm:w-auto"
          >
            Ask on WhatsApp
          </a>
        </div>

        <p className="mt-4 text-xs text-text-secondary">
          No payment now. We reply with availability and confirmed inclusions.
        </p>
      </div>

      <BookingDrawer
        ref={drawerRef}
        experienceTitle={bookingTitle}
        experienceSlug={bookingSlug}
        showFloatingTrigger={false}
        onSubmitted={() => trackWaitlistSubmit({ page, packageId })}
      />
    </section>
  );
}

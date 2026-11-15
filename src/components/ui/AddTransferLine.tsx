"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import BookingDrawer, { type BookingDrawerHandle } from "@/components/ui/BookingDrawer";

type Props = {
  title: string;
  slug: string;
  className?: string;
};

/**
 * Optional "Add private transfer" line for experience and excursion pages. Opens
 * the booking drawer with the airport-transfer add-on already checked.
 */
export default function AddTransferLine({ title, slug, className = "" }: Props) {
  const drawerRef = useRef<BookingDrawerHandle>(null);

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-accent-gold/20 bg-surface/30 p-5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="text-left">
        <p className="font-serif text-lg text-text-primary">Add a private transfer</p>
        <p className="mt-1 text-sm text-text-secondary">
          Airport pickups and door-to-door private transfers, quoted before you confirm.
        </p>
      </div>
      <button
        type="button"
        onClick={() => drawerRef.current?.open({ withTransfer: true })}
        className="syren-btn shrink-0"
      >
        Add private transfer
        <ArrowRight size={16} className="ml-1" aria-hidden />
      </button>
      <BookingDrawer
        ref={drawerRef}
        experienceTitle={title}
        experienceSlug={slug}
        showFloatingTrigger={false}
      />
    </div>
  );
}

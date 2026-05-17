"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import type { BookingModalHandle } from "@/components/ui/BookingModal";
const BookingModal = dynamic(() => import("@/components/ui/BookingModal"), { ssr: false });

type BookingTriggerProps = {
  title: string;
  slug: string;
  basePriceAmount?: number;
  basePriceCurrency?: string;
  perPerson?: boolean;
  buttonLabel?: string;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function BookingTrigger({
  title,
  slug,
  basePriceAmount,
  basePriceCurrency = "USD",
  perPerson = true,
  buttonLabel = "Reserve Now →",
  className = "",
  variant = "primary",
}: BookingTriggerProps) {
  const modalRef = useRef<BookingModalHandle | null>(null);

  return (
    <>
      <button
        onClick={() => modalRef.current?.open()}
        className={`${variant === "secondary" ? "syren-btn-secondary" : "syren-btn"} ${className}`}
      >
        {buttonLabel}
      </button>
      <BookingModal
        ref={modalRef}
        experienceTitle={title}
        experienceSlug={slug}
        basePriceAmount={basePriceAmount}
        basePriceCurrency={basePriceCurrency}
        perPerson={perPerson}
      />
    </>
  );
}

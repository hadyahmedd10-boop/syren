"use client";

import React, { useState } from "react";
import { Excursion } from "@/types/excursion";
import AddOns from "./AddOns";
import BookingTrigger from "@/components/ui/BookingTrigger";
import { ShieldCheck, Lock, Check } from "lucide-react";
import SectionHeader from "../layout/SectionHeader";

interface BookingSectionProps {
  experienceTitle: string;
  experienceSlug: string;
  basePrice: number;
  availableAddOns: Excursion[];
}

export default function BookingSection({
  experienceTitle,
  experienceSlug,
  basePrice,
  availableAddOns,
}: BookingSectionProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [addOnsTotal, setAddOnsTotal] = useState(0);

  const handleAddOnsChange = (selectedSlugs: string[], totalCents: number) => {
    setSelectedAddOns(selectedSlugs);
    setAddOnsTotal(totalCents / 100); // Convert cents to dollars for the UI and BookingButton
  };

  const totalPrice = basePrice + addOnsTotal;

  return (
    <div className="max-w-lg mx-auto p-6 border border-accent-gold/20 bg-surface/50 backdrop-blur-sm shadow-xl rounded-2xl">
      <div className="text-center mb-6">
        <SectionHeader title="Finalize Your Reservation" className="mb-2" />
      </div>

      <div className="space-y-5">
        <div className="border-b border-border pb-4">
          <p className="font-serif text-3xl font-semibold text-accent-gold leading-tight">
            ${totalPrice.toLocaleString()}
            <span className="block text-[11px] text-white/60 mt-1">
              Per person, taxes included
            </span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-accent-gold/80">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={14} /> Secured by Stripe
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock size={14} /> SSL Encrypted
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} /> 30-Day Refund
            </span>
          </div>
        </div>

        {/* Add-ons removed from checkout flow by request */}

        <div className="grid grid-cols-1 gap-3">
          <div className="text-white/80 text-sm">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent-gold">Why travelers choose Syren</span>
            <ul className="mt-2 grid gap-2">
              <li className="flex items-center gap-2"><Check size={14} className="text-accent-gold" /> Local experts with 10+ years in Egypt</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-accent-gold" /> 24/7 concierge support</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-accent-gold" /> Trusted by travelers from 30+ countries</li>
            </ul>
          </div>
        </div>

        <BookingTrigger
          title={experienceTitle}
          slug={experienceSlug}
          buttonLabel="Reserve Now →"
        />

        <p className="text-center font-sans text-[11px] text-text-secondary/60">
          By proceeding, you agree to our{" "}
          <a href="/terms" className="underline hover:text-accent-gold transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-accent-gold transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Clock, Users } from "lucide-react";

function buildWhatsAppUrl(title: string) {
  const text = `Hi Syren, I'm interested in booking ${title}. I'd love to know more about available packages.`;
  return `https://wa.me/201016015723?text=${encodeURIComponent(text)}`;
}

type StickyBookingPanelProps = {
  heroId?: string;
  title: string;
  slug: string;
  priceAmount?: number;
  priceCurrency?: string; // e.g., USD
  perPerson?: boolean;
  duration?: string;
  groupSizeText?: string; // optional, if available
};

export default function StickyBookingPanel({
  heroId = "hero",
  title,
  slug,
  priceAmount,
  priceCurrency = "USD",
  perPerson = true,
  duration,
  groupSizeText,
}: StickyBookingPanelProps) {
  const [show, setShow] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) {
      setShow(true);
      setShowMobile(true);
      return;
    }
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        setShow(!isVisible);
        setShowMobile(!isVisible);
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(hero);
    return () => observerRef.current?.disconnect();
  }, [heroId]);

  const priceDisplay =
    typeof priceAmount === "number"
      ? new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0,
        }).format(priceAmount)
      : undefined;

  const priceSuffix =
    perPerson && priceAmount !== undefined ? `${priceCurrency} / person` : priceCurrency;

  return (
    <>
      {/* Desktop sticky panel */}
      <aside
        className={`hidden md:block transition-all duration-500 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-80 lg:w-96 sticky top-24 rounded-2xl border border-accent-gold/30 bg-black/90 backdrop-blur-md shadow-xl p-5">
          <div className="mb-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold">
              Reserve Your Spot
            </span>
          </div>
          <h3 className="font-serif text-base text-text-primary truncate">{title}</h3>

          {priceDisplay !== undefined && (
            <div className="mt-3">
              <div className="font-serif text-3xl text-accent-gold leading-none">{priceDisplay}</div>
              <div className="text-[11px] text-white/60 uppercase tracking-[0.2em] mt-1">
                {priceSuffix}
              </div>
            </div>
          )}

          <div className="my-4 h-px w-full bg-accent-gold/20" aria-hidden />

          <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
            {duration && (
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-accent-gold" />
                <span className="font-sans">{duration}</span>
              </div>
            )}
            {groupSizeText && (
              <div className="flex items-center gap-2">
                <Users size={14} className="text-accent-gold" />
                <span className="font-sans">{groupSizeText}</span>
              </div>
            )}
          </div>

          <a
            href={buildWhatsAppUrl(title)}
            target="_blank"
            rel="noopener noreferrer"
            className="syren-btn w-full justify-center"
          >
            Reserve Now →
          </a>

          <div className="mt-3 text-center">
            <span className="text-[11px] text-white/50">Opens WhatsApp</span>
          </div>

          <ul className="mt-5 space-y-2">
            <li className="flex items-center gap-2 text-[12px] text-white/70">
              <Check size={14} className="text-accent-gold" /> Free cancellation up to 30 days
            </li>
            <li className="flex items-center gap-2 text-[12px] text-white/70">
              <Check size={14} className="text-accent-gold" /> 24/7 concierge support
            </li>
            <li className="flex items-center gap-2 text-[12px] text-white/70">
              <Check size={14} className="text-accent-gold" /> Instant confirmation
            </li>
          </ul>
        </div>
      </aside>

      {/* Spacer so mobile bar doesn't overlap content */}
      <div className="h-16 md:hidden" aria-hidden />

      {/* Mobile bottom bar */}
      <div
        className={`md:hidden fixed left-0 right-0 bottom-0 h-16 border-t border-accent-gold/30 bg-black/90 backdrop-blur-md transition-transform duration-400 ${
          showMobile ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg text-accent-gold leading-none">
              {priceDisplay !== undefined ? priceDisplay : "Get Quote"}
            </span>
            {priceDisplay !== undefined && (
              <span className="text-[10px] text-white/60 uppercase tracking-[0.2em] mt-0.5">
                {priceSuffix}
              </span>
            )}
          </div>
          <a
            href={buildWhatsAppUrl(title)}
            target="_blank"
            rel="noopener noreferrer"
            className="syren-btn px-5 py-2"
          >
            Reserve Now
          </a>
        </div>
      </div>
    </>
  );
}

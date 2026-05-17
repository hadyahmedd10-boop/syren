"use client";

import { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";

type BookingDrawerProps = {
  experienceTitle: string;
  experienceSlug: string;
  basePriceAmount?: number;
  basePriceCurrency?: string;
  perPerson?: boolean;
  showFloatingTrigger?: boolean;
};

export type BookingDrawerHandle = {
  open: () => void;
  close: () => void;
};

function formatNumber(n: number) {
  try {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
  } catch {
    return String(n);
  }
}

const BookingDrawer = forwardRef<BookingDrawerHandle, BookingDrawerProps>(function BookingDrawer(
  {
    experienceTitle,
    experienceSlug,
    basePriceAmount,
    basePriceCurrency = "USD",
    perPerson = true,
    showFloatingTrigger = false,
  },
  ref
) {
  const [open, setOpen] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isIntlPhone = (v: string) => /^\+?[\d\s\-\(\)]{7,}$/.test(v);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const totalPrice = useMemo(() => {
    if (typeof basePriceAmount !== "number") return undefined;
    return basePriceAmount * Math.max(1, travelers);
  }, [basePriceAmount, travelers]);

  const quoteHref = useMemo(() => {
    const u = new URL(typeof window !== "undefined" ? window.location.origin : "https://www.syrentravel.com");
    u.pathname = "/quote";
    u.searchParams.set("experience", experienceSlug);
    if (startDate) u.searchParams.set("start", startDate);
    if (endDate) u.searchParams.set("end", endDate);
    u.searchParams.set("travelers", String(Math.max(1, Math.min(20, travelers))));
    if (contact) u.searchParams.set("contact", contact);
    if (notes) u.searchParams.set("notes", notes);
    return u.pathname + u.search;
  }, [experienceSlug, startDate, endDate, travelers, contact, notes]);

  return (
    <>
      {showFloatingTrigger && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-accent-gold text-black px-5 py-3 font-sans text-[11px] uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Reserve Now"
        >
          Reserve Now
        </button>
      )}

      <div
        ref={backdropRef}
        onClick={(e) => {
          if (e.target === backdropRef.current) setOpen(false);
        }}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[420px] border-l-2 border-accent-gold bg-background backdrop-blur-md transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-drawer-title"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-accent-gold/20">
            <div>
              <h3 id="booking-drawer-title" className="font-serif text-2xl text-text-primary">
                Plan Your Experience
              </h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-gold mt-1">{experienceTitle}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-lg p-2 hover:bg-white/5 transition-colors"
            >
              <X size={18} className="text-white/80" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-5">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full border border-accent-gold/40 flex items-center justify-center">
                  <span className="text-accent-gold text-2xl">✓</span>
                </div>
                <h4 className="font-serif text-xl text-accent-gold mb-2">Your request has been sent.</h4>
                <p className="text-white/80">We'll contact you within 24 hours.</p>
              </div>
            ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                min={todayStr}
                  className="w-full rounded-lg bg-black/40 border border-accent-gold/30 text-white px-3 py-2 outline-none focus:border-accent-gold/60"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                min={todayStr}
                  className="w-full rounded-lg bg-black/40 border border-accent-gold/30 text-white px-3 py-2 outline-none focus:border-accent-gold/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2">Travelers</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                  className="p-2 rounded-lg border border-accent-gold/30 text-white hover:border-accent-gold/60"
                  aria-label="Decrease travelers"
                >
                  <Minus size={16} />
                </button>
                <span className="font-serif text-xl text-text-primary w-12 text-center">{travelers}</span>
                <button
                  onClick={() => setTravelers((t) => Math.min(20, t + 1))}
                  className="p-2 rounded-lg border border-accent-gold/30 text-white hover:border-accent-gold/60"
                  aria-label="Increase travelers"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2">
                Your Email or WhatsApp Number
              </label>
              <input
                type="tel"
                required
                placeholder="email@example.com or +1 234 567 8900"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (e.target.value.trim().length > 0) setContactError(null);
                }}
                inputMode={contact.includes("@") ? "email" : "tel"}
                className={`w-full rounded-lg bg-black/40 border ${contactError ? "border-red-400" : "border-accent-gold/30"} text-white px-3 py-2 outline-none focus:border-accent-gold/60`}
                aria-invalid={!!contactError}
                aria-describedby={contactError ? "contact-error" : undefined}
              />
              {contactError && (
                <p id="contact-error" className="mt-1 text-[11px] text-red-400">
                  {contactError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg bg-black/40 border border-accent-gold/30 text-white px-3 py-2 outline-none focus:border-accent-gold/60"
              />
            </div>

            <div className="border border-accent-gold/30 rounded-2xl p-4 bg-black/30">
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-sm text-white/80">Price Summary</span>
                {typeof basePriceAmount === "number" ? (
                  <span className="font-serif text-xl text-accent-gold">
                    {formatNumber(basePriceAmount)} × {travelers} = {formatNumber(totalPrice || 0)} {basePriceCurrency}
                  </span>
                ) : (
                  <span className="font-serif text-xl text-accent-gold">Get Quote</span>
                )}
              </div>
              <p className="text-[11px] text-white/60 mt-1">
                Final price confirmed upon booking
              </p>
            </div>
            </>
            )}
            {submitError && !submitted && (
              <div className="text-center text-red-400 text-sm">
                {submitError}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-accent-gold/20">
            <button
              disabled={submitting || submitted}
              onClick={async () => {
                const c = contact.trim();
                if (c.length === 0) {
                  setContactError("Please enter your email or WhatsApp number.");
                  return;
                }
                if (c.includes("@") && !isEmail(c)) {
                  setContactError("Please enter a valid email address (e.g. name@example.com)");
                  return;
                }
                if (!c.includes("@") && !isIntlPhone(c)) {
                  setContactError("Please enter a valid international phone number (e.g. +20 123 456 7890)");
                  return;
                }
                setSubmitting(true);
                setSubmitError(null);
                try {
                  const res = await fetch("/api/notify/booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      experienceTitle,
                      experienceSlug,
                      startDate,
                      endDate,
                      travelers,
                      contact: c,
                      notes,
                      totalPrice: typeof totalPrice === "number" ? totalPrice : undefined,
                      currency: basePriceCurrency,
                    }),
                  });
                  const json = await res.json();
                  if (!res.ok || !json.ok) {
                    throw new Error(json.error || "Failed to send");
                  }
                  setSubmitted(true);
                  setTimeout(() => setOpen(false), 3000);
                } catch (err) {
                  setSubmitError("Something went wrong. Please try again or contact us on WhatsApp.");
                } finally {
                  setSubmitting(false);
                }
              }}
              className="syren-btn w-full justify-center"
            >
              {submitting ? "Sending..." : "Send Booking Request →"}
            </button>
            <p className="mt-3 text-[11px] text-white/60 text-center">
              No payment required now. Our team will contact you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default BookingDrawer;

"use client";

import { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type BookingModalProps = {
  experienceTitle: string;
  experienceSlug: string;
  basePriceAmount?: number;
  basePriceCurrency?: string;
  perPerson?: boolean;
};

export type BookingModalHandle = {
  open: () => void;
  close: () => void;
};

function formatCurrency(n: number, ccy: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: ccy }).format(n);
  } catch {
    return `${ccy.toUpperCase()} ${n.toFixed(0)}`;
  }
}

export default forwardRef<BookingModalHandle, BookingModalProps>(function BookingModal(
  { experienceTitle, experienceSlug, basePriceAmount, basePriceCurrency = "EUR", perPerson = true },
  ref
) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [travelers, setTravelers] = useState(2);
  const [payMode, setPayMode] = useState<"deposit" | "full">("deposit");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState("");
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isIntlPhone = (v: string) => /^\+?[\d\s\-\(\)]{7,}$/.test(v);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const backdropRef = useRef<HTMLDivElement | null>(null);

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
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const totalPrice = useMemo(() => {
    if (typeof basePriceAmount !== "number") return undefined;
    const units = perPerson ? travelers : 1;
    return basePriceAmount * Math.max(1, units);
  }, [basePriceAmount, perPerson, travelers]);

  const depositDue = useMemo(() => {
    if (typeof totalPrice !== "number") return undefined;
    const pct = 0.4;
    return Math.round(totalPrice * pct);
  }, [totalPrice]);

  const monthDays = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const startWeekday = first.getDay(); // 0=Sun
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells: Array<{ label: string; value?: string; muted?: boolean }> = [];
    for (let i = 0; i < (startWeekday === 0 ? 6 : startWeekday - 1); i++) cells.push({ label: "", muted: true });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d);
      cells.push({ label: String(d), value: date.toISOString().slice(0, 10) });
    }
    return cells;
  }, [month]);

  const isSelected = (val?: string) => {
    if (!val) return false;
    if (startDate && !endDate) return val === startDate;
    if (startDate && endDate) return val >= startDate && val <= endDate;
    return false;
  };

  const selectDate = (val?: string) => {
    if (!val) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(val);
      setEndDate("");
      return;
    }
    if (val < startDate) {
      setEndDate(startDate);
      setStartDate(val);
    } else {
      setEndDate(val);
    }
  };

  return (
    <>
      <div
        ref={backdropRef}
        onClick={(e) => {
          if (e.target === backdropRef.current) setOpen(false);
        }}
        className={`fixed inset-0 z-50 bg-black/60 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity`}
      />
      <div
        className={`fixed inset-0 z-50 flex items-stretch justify-stretch ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className={`w-full h-full bg-background`}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 id="booking-modal-title" className="font-serif text-xl md:text-2xl text-text-primary">
                {experienceTitle}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-gold">Package • Participant Info • Payment</p>
            </div>
            <button className="p-2 rounded hover:bg-surface-2" aria-label="Close" onClick={() => setOpen(false)}>
              <X size={18} className="text-text-secondary" />
            </button>
          </div>
          <div className="grid md:grid-cols-[1fr_360px] h-[calc(100vh-57px)]">
            {/* Left: Steps */}
            <div className="p-4 md:p-6 space-y-6 overflow-auto">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <button className="p-2 rounded hover:bg-surface-2" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Previous month">
                    <ChevronLeft size={16} />
                  </button>
                  <div className="font-serif text-text-primary">{month.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
                  <button className="p-2 rounded hover:bg-surface-2" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month">
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-widest text-text-secondary">
                  {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => (<div key={d} className="py-1">{d}</div>))}
                  {monthDays.map((c, i) => (
                    <button
                      key={i}
                      disabled={!c.value}
                      onClick={() => selectDate(c.value)}
                      className={`py-2 rounded ${!c.value ? "opacity-30" : isSelected(c.value) ? "bg-accent-gold text-black" : "hover:bg-surface-2 text-text-primary"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  {startDate ? `Start: ${startDate}` : "Select start date"} {endDate ? `• End: ${endDate}` : ""}
                </div>
              </div>

              {/* Package */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="text-sm">
                  <div className="text-text-secondary uppercase tracking-[0.2em] text-[11px]">Select Travelers</div>
                  <div className="mt-1 flex items-center gap-2">
                    <button onClick={() => setTravelers((t) => Math.max(1, t - 1))} className="px-2 py-1 rounded border border-border hover:border-accent-gold/50">-</button>
                    <span className="min-w-[2ch] text-center font-serif text-text-primary">{travelers}</span>
                    <button onClick={() => setTravelers((t) => Math.min(20, t + 1))} className="px-2 py-1 rounded border border-border hover:border-accent-gold/50">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Total Price</div>
                  <div className="font-serif text-xl text-accent-gold">
                    {typeof totalPrice === "number" ? formatCurrency(totalPrice, basePriceCurrency) : "Get Quote"}
                  </div>
                  <div className="text-xs text-text-secondary">Deposit: {typeof depositDue === "number" ? formatCurrency(depositDue, basePriceCurrency) : "-"}</div>
                </div>
              </div>

              {/* Payment options */}
              <div className="border-t border-border pt-4">
                <div className="text-sm text-text-secondary mb-2">Payment Options</div>
                <label className="flex items-start gap-2">
                  <input type="radio" className="mt-1" checked={payMode === "deposit"} onChange={() => setPayMode("deposit")} />
                  <div className="text-sm">
                    <div className="text-text-primary">Pay amount due — {typeof depositDue === "number" ? formatCurrency(depositDue, basePriceCurrency) : "-"}</div>
                    <div className="text-xs text-text-secondary">Deposit due at booking; balance due 30 days before travel.</div>
                  </div>
                </label>
                <label className="flex items-start gap-2 mt-2">
                  <input type="radio" className="mt-1" checked={payMode === "full"} onChange={() => setPayMode("full")} />
                  <div className="text-sm">
                    <div className="text-text-primary">Pay full amount — {typeof totalPrice === "number" ? formatCurrency(totalPrice, basePriceCurrency) : "-"}</div>
                  </div>
                </label>
              </div>
            </div>
            {/* Right: Summary */}
            <aside className="p-4 md:p-6 border-l border-border bg-surface/30 overflow-auto">
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">Your Booking</div>
                <select className="border border-border rounded px-2 py-1 bg-background text-sm text-text-primary">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <input
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm"
                  />
                  <button className="rounded border border-border px-3 py-2 text-sm hover:border-accent-gold/50">Apply</button>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Total Price</span><span className="text-text-primary">{typeof totalPrice === "number" ? formatCurrency(totalPrice, basePriceCurrency) : "-"}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Service Fee</span><span className="text-text-primary">{formatCurrency(0, basePriceCurrency)}</span></div>
                <div className="flex justify-between font-semibold"><span className="text-text-secondary">{payMode === "deposit" ? "Due at Booking" : "Due Now"}</span><span className="text-text-primary">
                  {payMode === "deposit"
                    ? (typeof depositDue === "number" ? formatCurrency(depositDue, basePriceCurrency) : "-")
                    : (typeof totalPrice === "number" ? formatCurrency(totalPrice, basePriceCurrency) : "-")}
                </span></div>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-2">Your Email or WhatsApp</label>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="email@example.com or +20 101 234 5678"
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-2">Notes (Optional)</label>
                  <textarea rows={3} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>

              <button
                disabled={submitting || submitted}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    const c = contact.trim();
                    if (!c || (!isEmail(c) && !isIntlPhone(c))) {
                      throw new Error("Please enter a valid email or international phone number.");
                    }
                    const res = await fetch("/api/notify/booking", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        experienceTitle,
                        experienceSlug,
                        startDate,
                        endDate,
                        travelers,
                        payMode,
                        totalPrice,
                        depositDue,
                        currency: basePriceCurrency,
                        notes,
                        contact: c,
                      }),
                    });
                    const json = await res.json().catch(() => ({}));
                    if (!res.ok || !json.ok) throw new Error("Failed");
                    setSubmitted(true);
                    setTimeout(() => setOpen(false), 2500);
                  } catch {
                    setSubmitted(true);
                    setTimeout(() => setOpen(false), 2500);
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="mt-6 w-full rounded bg-accent-gold text-black py-3 font-sans text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
              >
                {submitting ? "Submitting..." : "Continue"}
              </button>
              <p className="mt-3 text-[11px] text-text-secondary text-center">Secure process — your journey starts with peace of mind.</p>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
});

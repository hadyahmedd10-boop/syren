"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

type ExitIntentPopupProps = {
  experienceTitle?: string;
  forceEnable?: boolean;
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  dismissLabel?: string;
};

export default function ExitIntentPopup({
  experienceTitle,
  forceEnable = false,
  eyebrow = "Before You Go",
  headline = "Let Us Craft This For You",
  subtext = "Not ready to book? Send us your travel dates and we'll prepare a personalised quote — no commitment required.",
  ctaLabel = "Get My Free Quote →",
  ctaHref = "/quote",
  dismissLabel = "No thanks, I'll decide later",
}: ExitIntentPopupProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const shownKey = "syren.exitintent.shown";

  const isDetailPage =
    typeof pathname === "string" &&
    (/^\/experiences\/[^/]+/.test(pathname) ||
      /^\/events\/[^/]+/.test(pathname) ||
      /^\/excursions\/[^/]+/.test(pathname));

  const isEnabled = isDetailPage || forceEnable;

  useEffect(() => {
    if (!isEnabled) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(shownKey) === "1") return;

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50 && window.innerWidth >= 768) {
        setOpen(true);
        sessionStorage.setItem(shownKey, "1");
        window.removeEventListener("mousemove", onMouseMove);
      }
    };

    let inactivityTimer: number | null = null;
    const resetInactivity = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        if (window.innerWidth < 768) {
          setOpen(true);
          sessionStorage.setItem(shownKey, "1");
        }
      }, 60000);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", resetInactivity, { passive: true });
    window.addEventListener("touchstart", resetInactivity, { passive: true });
    window.addEventListener("click", resetInactivity, { passive: true });
    window.addEventListener("keydown", resetInactivity);
    resetInactivity();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", resetInactivity as any);
      window.removeEventListener("touchstart", resetInactivity as any);
      window.removeEventListener("click", resetInactivity as any);
      window.removeEventListener("keydown", resetInactivity as any);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const quoteHref = (() => {
    const u = new URL(typeof window !== "undefined" ? window.location.origin : "https://www.syrentravel.com");
    u.pathname = ctaHref || "/quote";
    if (email) u.searchParams.set("email", email);
    if (experienceTitle) u.searchParams.set("title", experienceTitle);
    return u.pathname + u.search;
  })();

  const closeAndRemember = () => {
    setOpen(false);
    if (typeof window !== "undefined") sessionStorage.setItem(shownKey, "1");
  };

  return (
    <>
      <div
        ref={backdropRef}
        onClick={(e) => {
          if (e.target === backdropRef.current) closeAndRemember();
        }}
        className={`fixed inset-0 z-50 bg-black/70 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="max-w-md w-full rounded-2xl border border-accent-gold/30 bg-black/90 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-accent-gold" />
          <button
            onClick={closeAndRemember}
            aria-label="Close"
            className="absolute right-3 top-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} className="text-white/80" />
          </button>

          <div className="p-6 space-y-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold">
              {eyebrow}
            </span>
            <h3 className="font-serif text-2xl text-text-primary">{headline}</h3>
            {experienceTitle && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-gold">{experienceTitle}</p>
            )}
            <p className="text-sm text-white/80">{subtext}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = quoteHref;
              }}
              className="space-y-3"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-black/40 border border-accent-gold/30 text-white px-4 py-3 outline-none focus:border-accent-gold/60"
              />
              <Link href={quoteHref} className="syren-btn w-full justify-center">
                {ctaLabel}
              </Link>
            </form>

            <button
              onClick={closeAndRemember}
              className="text-[12px] text-white/60 underline decoration-white/40 hover:text-white/80 transition-colors"
            >
              {dismissLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

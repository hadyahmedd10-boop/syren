"use client";

import Link from "next/link";
import { useConsent } from "@/providers/ConsentProvider";

/**
 * Cookie consent banner. Rendered by ConsentProvider and shown until the
 * visitor makes a choice, or when reopened from the footer "Cookie settings".
 *
 * "Accept" and "Reject" are deliberately styled identically so neither option
 * is more prominent than the other.
 */
export default function CookieBanner() {
  const { ready, isOpen, accept, reject } = useConsent();

  if (!ready || !isOpen) return null;

  const actionClass =
    "inline-flex items-center justify-center min-h-[44px] rounded-full border border-accent-gold px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-accent-gold transition-colors duration-300 hover:bg-accent-gold hover:text-text-dark";

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-t border-border border-t-accent-gold/40 bg-surface/95 shadow-custom backdrop-blur-md">
        <div className="p-5 md:p-6">
          <h2 className="mb-2 font-serif text-lg text-text-primary md:text-xl">Cookies</h2>
          <p className="mb-4 text-sm text-text-secondary">
            We use necessary cookies to run this site. With your consent we also use analytics
            cookies — Google Analytics, Microsoft Clarity and PostHog — to understand how the site
            is used so we can improve it. You can change your choice at any time.
          </p>
          <ul className="mb-5 space-y-1 text-xs uppercase tracking-[0.15em] text-text-secondary">
            <li>Necessary — Always on</li>
            <li>Analytics — Optional</li>
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={reject} className={actionClass}>
              Reject
            </button>
            <button type="button" onClick={accept} className={actionClass}>
              Accept
            </button>
            <Link
              href="/privacy"
              className="text-xs text-text-secondary underline transition-colors hover:text-accent-gold sm:ml-auto"
            >
              Read our Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

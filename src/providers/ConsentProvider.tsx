"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { activateAnalytics } from "@/lib/analytics";
import { initPostHog } from "@/providers/PostHogProvider";
import CookieBanner from "@/components/consent/CookieBanner";

type ConsentContextValue = {
  /** Stored choice, or null while the visitor has not decided. */
  choice: ConsentChoice | null;
  /** True once the stored choice has been read on the client. */
  ready: boolean;
  /** Whether the banner is currently visible. */
  isOpen: boolean;
  accept: () => void;
  reject: () => void;
  openBanner: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}

/**
 * Holds the cookie consent state and starts analytics only after consent.
 *
 * Precedence: nothing is loaded on first paint. GA4 / Clarity / PostHog begin
 * only when the visitor accepts (now, or on a previous visit recorded in
 * localStorage).
 */
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const accept = useCallback(() => {
    writeConsent("granted");
    setChoice("granted");
    setIsOpen(false);
    activateAnalytics();
    initPostHog();
  }, []);

  const reject = useCallback(() => {
    writeConsent("denied");
    setChoice("denied");
    setIsOpen(false);
  }, []);

  const openBanner = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    setReady(true);

    if (stored === "granted") {
      activateAnalytics();
      initPostHog();
    } else if (stored === null) {
      setIsOpen(true);
    }

    const handleOpen = () => setIsOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen);
  }, []);

  const value = useMemo(
    () => ({ choice, ready, isOpen, accept, reject, openBanner }),
    [choice, ready, isOpen, accept, reject, openBanner]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <CookieBanner />
    </ConsentContext.Provider>
  );
}

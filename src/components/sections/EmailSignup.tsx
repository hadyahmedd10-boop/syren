"use client";

import { useState } from "react";
import SectionHeader from "@/components/layout/SectionHeader";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  return (
    <section className="on-dark bg-black/90 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl container-x text-center">
        <SectionHeader
          label="Newsletter"
          title="Be First to Know"
          description="Get early access to new experiences, event packages, and first notice on limited-availability tours."
          align="center"
          className="mb-8 md:mb-10"
        />
        {status === "ok" ? (
          <p className="mt-6 font-serif text-accent-gold-ink">You're on the list. Watch your inbox.</p>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email) return;
              setStatus("loading");
              try {
                const res = await fetch("/api/email-subscribers", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, source: "homepage" }),
                });
                if (!res.ok) throw new Error("bad");
                setStatus("ok");
              } catch {
                setStatus("error");
              }
            }}
            className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-signup-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input w-full sm:w-auto"
              placeholder="Your email"
              required
            />
            <button type="submit" disabled={status === "loading"} className="syren-btn-primary">
              {status === "loading" ? "Submitting..." : "Join the List →"}
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-text-secondary">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

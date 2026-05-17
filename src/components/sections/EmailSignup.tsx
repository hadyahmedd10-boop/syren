"use client";

import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  return (
    <section className="py-16 bg-black/90 border-t border-border">
      <div className="mx-auto max-w-7xl container-x text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-accent-gold">Be First to Know</h2>
        <p className="font-serif text-text-secondary max-w-2xl mx-auto mt-3">
          Get exclusive early access to new experiences, event packages, and first notice on limited-availability tours.
        </p>
        {status === "ok" ? (
          <p className="mt-6 text-accent-gold font-serif">You're on the list. Watch your inbox.</p>
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
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
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
        <p className="mt-3 text-xs text-white/60">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

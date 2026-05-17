import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DollarSign, Headphones, Settings, Star } from "lucide-react";
import { HERO_IMAGES, DESTINATION_IMAGES } from "@/lib/images";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Partner With Syren | Egypt Travel Agency B2B Program",
  description:
    "Are you a travel agent or agency looking for an Egypt ground handler? Partner with Syren for competitive commissions, expert local support, and seamless client experiences.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative py-24 text-center">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGES.home}
            alt="Syren Partner Program"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        </div>
        <div className="relative mx-auto max-w-5xl container-x">
          <h1 className="font-serif text-5xl md:text-6xl text-accent-gold">Let's Build Egypt Together</h1>
          <div className="h-px bg-accent-gold mt-4" style={{ width: "100%", animation: "line-draw 1.5s ease-in-out forwards" }} />
          <style>{`@keyframes line-draw { from{width:0} to{width:100%} }`}</style>
          <p className="mt-4 font-serif italic text-text-secondary">
            We are Egypt&apos;s ground. You are the world. Together we deliver extraordinary.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/quote" className="syren-btn">Start a Conversation →</Link>
            <a href="https://wa.me/201016015723" target="_blank" rel="noopener noreferrer" className="syren-btn-secondary">WhatsApp Us →</a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl container-x">
          <div className="mx-auto max-w-5xl bg-background/60 border border-border rounded-2xl p-6 md:p-8 flex items-center justify-center gap-6 text-text-primary">
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl text-accent-gold">15M+</span>
              <span className="text-sm">Tourists visit Egypt annually</span>
            </div>
            <div className="h-8 w-px bg-accent-gold/40" />
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl text-accent-gold">24h</span>
              <span className="text-sm">Response time guaranteed</span>
            </div>
            <div className="h-8 w-px bg-accent-gold/40" />
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl text-accent-gold">30+</span>
              <span className="text-sm">Countries we serve</span>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-transparent to-background" />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl container-x">
          <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-2 text-center">Partner Program</span>
          <h2 className="font-serif text-4xl text-text-primary text-center">The Syren Partner Advantage</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-t-2 border-accent-gold border border-accent-gold/30 bg-surface/30 p-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-transform duration-300">
              <div className="flex items-center gap-3">
                <DollarSign className="text-accent-gold" size={18} />
                <h3 className="font-serif text-lg text-text-primary">Competitive Commission</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Attractive commission structure on all bookings.</p>
            </div>
            <div className="rounded-2xl border-t-2 border-accent-gold border border-accent-gold/30 bg-surface/30 p-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Headphones className="text-accent-gold" size={18} />
                <h3 className="font-serif text-lg text-text-primary">Dedicated Partner Support</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">A direct line to our team, not a call center.</p>
            </div>
            <div className="rounded-2xl border-t-2 border-accent-gold border border-accent-gold/30 bg-surface/30 p-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Settings className="text-accent-gold" size={18} />
                <h3 className="font-serif text-lg text-text-primary">Fully Customizable</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Every itinerary built around your client&apos;s needs.</p>
            </div>
            <div className="rounded-2xl border-t-2 border-accent-gold border border-accent-gold/30 bg-surface/30 p-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Star className="text-accent-gold" size={18} />
                <h3 className="font-serif text-lg text-text-primary">On-Ground Excellence</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Vetted drivers, licensed guides, premium hotels.</p>
            </div>
            <div className="rounded-2xl border-t-2 border-accent-gold border border-accent-gold/30 bg-surface/30 p-6 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Headphones className="text-accent-gold" size={18} />
                <h3 className="font-serif text-lg text-text-primary">Dedicated Account Manager</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Your own point of contact for all bookings.</p>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-transparent to-surface" />
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl container-x">
          <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-2 text-center">Who We Work With</span>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Travel Agencies",
              "Tour Operators",
              "Luxury Travel Advisors",
              "Event Specialists",
              "Corporate Travel",
              "Content Creators",
              "Wedding Planners",
              "Influencers",
            ].map((w) => (
              <span key={w} className="syren-pill border border-accent-gold text-accent-gold font-serif">
                {w}
              </span>
            ))}
          </div>
          <div className="h-16 bg-gradient-to-b from-transparent to-background" />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl container-x">
          <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-2 text-center">Our Destinations</span>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { key: "cairo", name: "Cairo & Giza" },
              { key: "luxor-aswan", name: "Luxor & Aswan" },
              { key: "north-coast", name: "Red Sea" },
              { key: "siwa-oasis", name: "Siwa Oasis" },
              { key: "alexandria", name: "Alexandria" },
              { key: "hurghada", name: "Nile Cruises" },
            ].map((d) => {
              const img = (DESTINATION_IMAGES as any)[d.key];
              const src = typeof img === "string" ? img : img.src;
              return (
                <div key={d.name} className="relative h-40 rounded-2xl overflow-hidden border border-border group">
                  <Image src={src} alt={d.name} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-end">
                    <span className="m-4 syren-pill border border-accent-gold text-accent-gold">{d.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 font-sans text-sm text-text-secondary">Trusted by agencies and partners from Europe, the Gulf, and the Americas.</p>
          <div className="h-16 bg-gradient-to-b from-transparent to-surface" />
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl container-x">
          <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-2 text-center">How It Works</span>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: 1, t: "Get in Touch", d: "Send us your inquiry and client requirements." },
              { n: 2, t: "We Design It", d: "Our team designs a bespoke proposal within 24 hours." },
              { n: 3, t: "We Deliver It", d: "Your clients experience Egypt at its finest." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-surface/30 p-6 text-center">
                <div className="w-8 h-8 rounded-full bg-accent-gold/20 border border-accent-gold/40 text-accent-gold flex items-center justify-center font-serif">{s.n}</div>
                <h3 className="mt-3 font-serif text-lg text-text-primary">{s.t}</h3>
                <p className="mt-2 font-sans text-sm text-text-secondary">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-accent-gold/60 to-transparent" style={{ animation: "line-draw 2s ease-in-out forwards" }} />
          <style>{`@keyframes line-draw { from{width:0} to{width:100%} }`}</style>
          <div className="h-16 bg-gradient-to-b from-transparent to-background" />
        </div>
      </section>

      <section className="py-20" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(196,160,82,0.08), transparent 60%)" }}>
        <Testimonials />
      </section>
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl container-x text-center">
          <h2 className="font-serif text-3xl text-text-primary">Ready to Partner?</h2>
          <p className="mt-3 font-sans text-text-secondary">
            Whether you&apos;re sending one client or building a full Egypt program, we&apos;re ready to be your ground team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/quote" className="syren-btn">Send a Partnership Inquiry →</Link>
            <a href="https://wa.me/201016015723" target="_blank" rel="noopener noreferrer" className="syren-btn-secondary">WhatsApp Us Directly →</a>
          </div>
        </div>
      </section>
    </main>
  );
}

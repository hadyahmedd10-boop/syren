import type { Metadata } from "next";
import Link from "next/link";
import VehicleClassification from "@/components/ui/VehicleClassification";
import { CheckCircle, ArrowRight, Shield, Clock, Star } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Private Transfers in Egypt | Airport & City Transfers | Syren",
  description: "Private airport transfers, city runs, and intercity travel across Egypt. Economy to luxury — professional Syren drivers, fixed prices, no surprises. Cairo, Luxor, Hurghada & more.",
  keywords: ["egypt private transfer", "cairo airport transfer", "hurghada transfer", "egypt transfer service", "private car egypt", "luxury transfer egypt", "airport pickup egypt"],
  alternates: {
    canonical: "/transfers",
  },
  openGraph: {
    url: "https://www.syrentravel.com/transfers",
    images: [
      {
        url: "/images/hero/luxury.jpg",
      },
    ],
  },
};

const routes = [
  { origin: "Cairo Airport", destination: "City Center", duration: "45 min" },
  { origin: "Hurghada Airport", destination: "Hotel", duration: "20 min" },
  { origin: "Cairo", destination: "Hurghada", duration: "4.5 hours" },
  { origin: "Cairo", destination: "Luxor", duration: "7 hours" },
  { origin: "Hurghada", destination: "Luxor", duration: "3 hours" },
  { origin: "Giza (Pyramids)", destination: "Cairo Airport", duration: "30 min" },
  { origin: "Sharm El Sheikh Airport", destination: "Hotel", duration: "25 min" },
  { origin: "Cairo", destination: "Alexandria", duration: "2.5 hours" },
];

export default function TransfersPage() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
        <div className="container-x mx-auto max-w-4xl text-center relative">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-6">
            PRIVATE TRANSFERS
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-text-primary font-light mb-6 relative">
            Every Transfer. Private. Professional. On Time.
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-accent-gold/50 animate-pulse" />
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            No shared shuttles. No waiting for strangers. Just your group, a vetted Syren driver, and the road ahead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/201016015723?text=Hi Syren, I'd like to book a private transfer in Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent-gold text-black font-semibold px-8 py-4 rounded-full hover:bg-accent-gold/90 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book a Transfer
            </a>
            <Link
              href="/experiences"
              className="inline-flex items-center gap-3 border border-accent-gold/40 text-accent-gold px-8 py-4 rounded-full hover:border-accent-gold transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST STRIP */}
      <section className="bg-surface/50 border-y border-border/50">
        <div className="container-x mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-5">
            {[
              { icon: CheckCircle, text: "Fixed price, no surprises" },
              { icon: Shield, text: "Professional licensed drivers" },
              { icon: Clock, text: "Available 24/7" },
              { icon: Star, text: "Meet & greet included" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon size={18} className="text-accent-gold shrink-0" />
                <span className="text-text-primary text-sm">{item.text}</span>
                {idx < 3 && <div className="hidden md:block w-px h-4 bg-accent-gold/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — VEHICLE CLASSIFICATION */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-6xl text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">
            FLEET
          </p>
          <h2 className="font-serif text-4xl text-text-primary font-light mb-4">
            Private Transportation, Refined.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A considered fleet for seamless journeys across Egypt. Every transfer is private to your group, with no shared rides.
          </p>
        </div>
        <VehicleClassification />
      </section>

      {/* SECTION 4 — POPULAR ROUTES */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">
              COMMON ROUTES
            </p>
            <h2 className="font-serif text-4xl text-text-primary font-light">
              Popular Transfer Routes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((route, idx) => (
              <a
                key={idx}
                href={`https://wa.me/201016015723?text=Hi Syren, I'd like to book a transfer from ${route.origin} to ${route.destination}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface rounded-2xl p-6 border border-border hover:border-accent-gold/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer block"
              >
                <div className="text-text-secondary text-xs uppercase tracking-widest mb-3">
                  {route.origin}
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="font-serif text-xl text-text-primary">{route.origin}</span>
                  <span className="text-accent-gold text-2xl">→</span>
                  <span className="font-serif text-xl text-text-primary">{route.destination}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <Clock size={14} className="text-accent-gold" />
                    {route.duration}
                  </div>
                  <span className="text-accent-gold text-sm hover:underline">Book →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="section bg-surface/30">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">
              3 SIMPLE STEPS
            </p>
            <h2 className="font-serif text-4xl text-text-primary font-light">
              How It Works
            </h2>
          </div>
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: "1",
                  title: "Tell Us Your Route",
                  description: "Share your pickup, destination, date, and group size on WhatsApp or through our form",
                },
                {
                  step: "2",
                  title: "Choose Your Vehicle",
                  description: "Pick the class that suits your group and budget. We confirm availability and send you a fixed price",
                },
                {
                  step: "3",
                  title: "Your Driver Arrives",
                  description: "A professional Syren driver meets you on time with a name sign. Your ride begins.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-accent-gold/40 bg-surface text-accent-gold font-serif text-2xl mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-xl text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[240px] mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FESTIVAL TRANSFERS CALLOUT */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <div className="bg-surface/50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">
                  FESTIVAL SEASON
                </p>
                <h2 className="font-serif text-3xl text-text-primary font-light mb-4">
                  Going to Exit, Zamna, or Sandbox?
                </h2>
                <p className="text-text-secondary text-base leading-relaxed mb-8">
                  We run dedicated festival transfer packages — coordinated pickup, group vehicles, and local Syren team on the ground. Your ride is the first part of the experience.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/201016015723?text=Hi Syren, I need transfers for a festival in Egypt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-accent-gold text-accent-gold px-6 py-3 rounded-full font-medium tracking-wide hover:bg-accent-gold hover:text-black transition-all duration-300 group"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Message Us on WhatsApp
                  </a>
                  <Link href="/events" className="text-accent-gold text-sm hover:underline">
                    View All Festival Packages →
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="border border-accent-gold/30 text-accent-gold text-sm px-4 py-2 rounded-full">
                  Shakira · Nov 2026
                </div>
                <div className="border border-accent-gold/30 text-accent-gold text-sm px-4 py-2 rounded-full">
                  ARGY NEWORLD · Nov 2026
                </div>
                <div className="border border-accent-gold/30 text-accent-gold text-sm px-4 py-2 rounded-full">
                  Longines GCT Cairo · Oct 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl text-text-primary font-light mb-4">
            Ready When You Are.
          </h2>
          <p className="text-text-secondary mb-8">
            Private transfers across Egypt, available around the clock.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://wa.me/201016015723?text=Hi Syren, I'd like to book a private transfer in Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent-gold text-black font-semibold px-8 py-4 rounded-full hover:bg-accent-gold/90 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.P157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book via WhatsApp →
            </a>
            <Link href="/quote" className="text-text-secondary text-sm hover:text-accent-gold transition-colors">
              Or submit a detailed request →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

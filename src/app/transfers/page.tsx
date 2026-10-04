import type { Metadata } from "next";
import Link from "next/link";
import VehicleClassification from "@/components/ui/VehicleClassification";
import { CheckCircle, ArrowRight, MessageSquare } from "lucide-react";

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
      {/* SECTION 1 — */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">
            PRIVATE TRANSFERS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
            Every Transfer. Private. Professional. On Time.
          </h1>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            No shared shuttles. No waiting for strangers. Just your group, a vetted Syren driver, and the road ahead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/201016015723?text=Hi Syren, I'd like to book a private transfer in Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-accent-gold text-black font-semibold px-8 py-3 rounded-full hover:bg-accent-gold/90 transition-all"
            >
              Book a Transfer →
            </a>
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center border border-accent-gold text-accent-gold px-8 py-3 rounded-full hover:bg-accent-gold hover:text-black transition-all"
            >
              View All Experiences →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST STRIP */}
      <section className="bg-surface border-y border-border">
        <div className="container-x mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            {[
              { icon: CheckCircle, text: "Fixed price, no surprises" },
              { icon: CheckCircle, text: "Professional licensed drivers" },
              { icon: CheckCircle, text: "Available 24/7" },
              { icon: CheckCircle, text: "Meet & greet included" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon size={20} className="text-accent-gold shrink-0" />
                <span className="text-text-secondary text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — VEHICLE CLASSIFICATION */}
      <VehicleClassification />

      {/* SECTION 4 — POPULAR ROUTES */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
              COMMON ROUTES
            </p>
            <h2 className="font-serif text-3xl text-text-primary">
              Popular Transfer Routes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((route, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-xl p-5 border border-border hover:border-accent-gold/40 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary font-semibold">{route.origin}</span>
                    <ArrowRight size={16} className="text-accent-gold" />
                    <span className="text-text-primary font-semibold">{route.destination}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{route.duration}</span>
                </div>
                <a
                  href={`https://wa.me/201016015723?text=Hi Syren, I'd like to book a transfer from ${route.origin} to ${route.destination}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold text-sm hover:underline"
                >
                  Book This Route →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="section bg-surface/30">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
              3 SIMPLE STEPS
            </p>
            <h2 className="font-serif text-3xl text-text-primary">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-gold text-black font-serif text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — FESTIVAL TRANSFERS CALLOUT */}
      <section className="section bg-surface border-t border-border">
        <div className="container-x mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
            FESTIVAL SEASON
          </p>
          <h2 className="font-serif text-3xl text-text-primary mb-4">
            Going to Exit, Zamna, or Sandbox?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            We run dedicated festival transfer packages — coordinated pickup, group vehicles, and local Syren team on the ground. Your ride is the first part of the experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center bg-accent-gold text-black font-semibold px-8 py-3 rounded-full hover:bg-accent-gold/90 transition-all"
            >
              View Festival Packages →
            </Link>
            <a
              href="https://wa.me/201016015723?text=Hi Syren, I need transfers for a festival in Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-accent-gold text-accent-gold px-8 py-3 rounded-full hover:bg-accent-gold hover:text-black transition-all"
            >
              WhatsApp Us →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl text-text-primary mb-6">
            Ready to Book Your Transfer?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/201016015723?text=Hi Syren, I'd like to book a private transfer in Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#20b558] transition-all"
            >
              <MessageSquare size={20} />
              Message Us on WhatsApp →
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center border border-accent-gold text-accent-gold px-8 py-3 rounded-full hover:bg-accent-gold hover:text-black transition-all"
            >
              Or submit a quote request →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

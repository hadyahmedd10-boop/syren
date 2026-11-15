import type { Metadata } from "next";
import Link from "next/link";
import VehicleSelector from "@/components/ui/VehicleSelector";
import TransferQuickRequest from "@/components/sections/transfers/TransferQuickRequest";
import { waLink } from "@/lib/whatsapp";
import { events } from "@/data/events";
import { getUpcomingEvents } from "@/lib/eventUtils";
import { getLandingPathForEventSlug, shortEventName } from "@/data/festivalPackages";
import { CheckCircle, ArrowRight, Shield, Clock, Star } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Private Transfers in Egypt | Airport & City",
  description:
    "Private airport transfers across Egypt, with professional Syren drivers and a fixed price quoted before you confirm. City runs and intercity drives.",
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

const faqs = [
  {
    question: "Where do you operate?",
    answer:
      "Cairo, Giza, Luxor, Hurghada, Sharm El Sheikh and Alexandria, plus intercity runs across Egypt — including Cairo to Hurghada, Cairo to Luxor, Hurghada to Luxor and Cairo to Alexandria.",
  },
  {
    question: "Are the transfers private?",
    answer:
      "Yes. Every transfer is private to your group. There are no shared shuttles — just you, your group and a Syren driver.",
  },
  {
    question: "Is meet and greet included?",
    answer:
      "Yes. A professional Syren driver meets you on arrival with a name sign, and your driver arrives on time for every pickup.",
  },
  {
    question: "How is the price decided?",
    answer:
      "We quote a fixed price before you confirm. Tell us your route, your date and your group size, and we will suggest the right vehicle and confirm the price in writing.",
  },
  {
    question: "Which vehicles can I choose?",
    answer:
      "Economy, Comfort, Business, SUV, Minivan and Minibus. We match the vehicle to your group size, using the published passenger and luggage figures.",
  },
  {
    question: "Can you handle festival transfers?",
    answer:
      "Yes. For festivals and events we run coordinated private transfers between your hotel and the venue on event nights, alongside your airport transfers.",
  },
];

export default function TransfersPage() {
  const festivalEvents = getUpcomingEvents(events)
    .filter((e) => !e.excludeFromPackages)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main>
      {/* 1 — SHORT HERO */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Private transfers</p>
          <h1 className="mt-4 font-serif text-4xl font-light text-text-primary md:text-5xl">
            Private transfers across Egypt
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
            Airport pickups, city runs and intercity drives — private to your group, with a
            fixed price quoted before you confirm.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={waLink("Hi Syren, I'd like a private transfer in Egypt")}
              target="_blank"
              rel="noopener noreferrer"
              className="syren-btn"
            >
              Request a transfer
            </a>
          </div>
        </div>
      </section>

      {/* 2 — QUICK REQUEST */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Quick request</p>
            <h2 className="mt-3 font-serif text-3xl font-light text-text-primary md:text-4xl">
              Tell us your route
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-secondary">
              Add your pickup, drop-off, date and group size. We&apos;ll suggest the right
              vehicle and confirm a fixed price.
            </p>
          </div>
          <TransferQuickRequest />
        </div>
      </section>

      {/* 3 — CHOOSE BY GROUP SIZE */}
      <section className="section border-t border-border bg-surface/20">
        <div className="container-x mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">The fleet</p>
            <h2 className="mt-3 font-serif text-3xl font-light text-text-primary md:text-4xl">
              Choose by group size
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
              Set your passenger count and we&apos;ll highlight the vehicles that fit. Every
              transfer is private to your group.
            </p>
          </div>
          <VehicleSelector variant="full" />
          <p className="mt-10 text-center text-sm text-text-secondary">
            Fixed price quoted before you confirm.
          </p>
        </div>
      </section>

      {/* 4 — POPULAR ROUTES */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Common routes</p>
            <h2 className="mt-3 font-serif text-3xl font-light text-text-primary md:text-4xl">
              Popular transfer routes
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {routes.map((route) => (
              <a
                key={`${route.origin}-${route.destination}`}
                href={waLink(
                  `Hi Syren, I'd like to book a transfer from ${route.origin} to ${route.destination}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/40"
              >
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="font-serif text-xl text-text-primary">{route.origin}</span>
                  <ArrowRight size={18} className="text-accent-gold" aria-hidden />
                  <span className="font-serif text-xl text-text-primary">{route.destination}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock size={14} className="text-accent-gold" aria-hidden />
                    {route.duration}
                  </div>
                  <span className="text-sm text-accent-gold">Request →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — FESTIVAL TRANSFERS */}
      <section className="section border-t border-border bg-surface/20">
        <div className="container-x mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Festival season</p>
            <h2 className="mt-3 font-serif text-3xl font-light text-text-primary md:text-4xl">
              Private festival transfers
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
              Coordinated private transfers between your hotel and the venue on event nights,
              as part of each Syren festival travel package.
            </p>
          </div>
          {festivalEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {festivalEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={getLandingPathForEventSlug(event.slug)}
                  className="block rounded-2xl border border-accent-gold/20 bg-surface/30 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-gold/50"
                >
                  <h3 className="font-serif text-lg text-text-primary">
                    {shortEventName(event.title)}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {event.displayDate ?? event.date}
                    {event.location ? ` · ${event.location}` : ""}
                  </p>
                  <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-accent-gold">
                    View travel packages →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary">
              Message us about festival transfers and we&apos;ll coordinate your pickups.
            </p>
          )}
        </div>
      </section>

      {/* 6 — HOW IT WORKS */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">3 simple steps</p>
            <h2 className="mt-3 font-serif text-3xl font-light text-text-primary md:text-4xl">
              How it works
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent md:block" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Tell us your route",
                  description:
                    "Share your pickup, destination, date and group size on WhatsApp or through the quick request above.",
                },
                {
                  step: "2",
                  title: "Choose your vehicle",
                  description:
                    "Pick the class that suits your group. We confirm availability and send a fixed price before you confirm.",
                },
                {
                  step: "3",
                  title: "Your driver arrives",
                  description:
                    "A professional Syren driver meets you on time with a name sign. Your journey begins.",
                },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-gold/40 bg-surface font-serif text-2xl text-accent-gold">
                    {item.step}
                  </div>
                  <h3 className="mb-3 font-serif text-xl text-text-primary">{item.title}</h3>
                  <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border/50 bg-surface/50">
        <div className="container-x mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center gap-4 py-5 md:flex-row md:gap-8">
            {[
              { icon: CheckCircle, text: "Fixed price quoted before you confirm" },
              { icon: Shield, text: "Professional licensed drivers" },
              { icon: Clock, text: "Available 24/7" },
              { icon: Star, text: "Meet & greet included" },
            ].map((item, idx) => (
              <div key={item.text} className="flex items-center gap-3">
                <item.icon size={18} className="shrink-0 text-accent-gold" aria-hidden />
                <span className="text-sm text-text-primary">{item.text}</span>
                {idx < 3 && <div className="hidden h-4 w-px bg-accent-gold/20 md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">Good to know</p>
            <h2 className="mt-3 font-serif text-3xl font-light text-text-primary md:text-4xl">
              Transfer questions
            </h2>
          </div>
          <div className="border-t border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
                  <span className="font-serif text-lg text-text-primary transition-colors group-hover:text-accent-gold">
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 text-2xl font-light leading-none text-text-secondary transition-transform duration-300 group-open:rotate-45 group-hover:text-accent-gold"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — FINAL CTA */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-light text-text-primary md:text-4xl">
            Ready when you are
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Private transfers across Egypt, available around the clock. Fixed price quoted before
            you confirm.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={waLink("Hi Syren, I'd like to book a private transfer in Egypt")}
              target="_blank"
              rel="noopener noreferrer"
              className="syren-btn"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

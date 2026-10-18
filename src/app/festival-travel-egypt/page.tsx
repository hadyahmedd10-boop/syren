import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { events } from "@/data/events";
import EventCard from "@/components/sections/events/EventCard";
import { Music, Calendar, MapPin, Hotel, Car, Ticket } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Egypt Festival Travel Packages | Music Festival Hotels & Transfers | Syren",
  description: "Complete festival travel packages for Egypt's music events. Hotels, transfers, tickets, and concierge service for Zamna, Sandbox, NOART, and more.",
  keywords: [
    "Egypt festival travel packages",
    "festival hotels Egypt",
    "festival transfers Egypt",
    "Egypt music festival travel",
    "festival accommodation Egypt",
    "Egypt festival packages",
  ],
  alternates: { canonical: "/festival-travel-egypt" },
  openGraph: {
    title: "Egypt Festival Travel Packages | Music Festival Hotels & Transfers | Syren",
    description: "Complete festival travel packages for Egypt's music events. Hotels, transfers, tickets, and concierge service for Zamna, Sandbox, NOART, and more.",
    url: "https://www.syrentravel.com/festival-travel-egypt",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

const festivalEvents = events.filter((e) =>
  e.category === "International Music Festivals" || e.categories?.includes("International Music Festivals")
);

const faqs = [
  {
    question: "What is included in a festival travel package?",
    answer: "Our festival packages include airport transfers, accommodation at festival hotels or nearby resorts, festival tickets (when available), private transportation to and from the venue, and 24/7 concierge support. Specific inclusions vary by event.",
  },
  {
    question: "Can you arrange festival transfers from Cairo?",
    answer: "Yes, we provide private festival transfers from Cairo, Hurghada, and other Egyptian cities. Our drivers are experienced with festival routes and timing to ensure you arrive stress-free.",
  },
  {
    question: "Do you book festival tickets?",
    answer: "We can assist with festival ticket purchases when available through official channels. For sold-out events, we can help secure access through our network or provide VIP packages when available.",
  },
  {
    question: "What hotels do you recommend for festivals?",
    answer: "We partner with hotels near festival venues and in Cairo for multi-destination itineraries. Options range from luxury resorts to boutique hotels, depending on your preferences and budget.",
  },
  {
    question: "Can I combine a festival with a Nile cruise?",
    answer: "Absolutely. Many travelers combine a festival experience with a Nile cruise or Cairo sightseeing. We can create custom itineraries that include both festival attendance and cultural exploration.",
  },
];

export default function FestivalTravelEgyptPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Festival Travel"
        title="Egypt Festival Travel Packages"
        subtitle="Complete travel solutions for Egypt's music festivals. Hotels, transfers, tickets, and concierge service for Zamna, Sandbox, NOART, and more."
        altText="Egypt Festival Travel - Syren Travel"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/events" className="syren-btn">
            Browse All Events
          </Link>
          <Link href="/transfers" className="syren-btn-secondary">
            Book Festival Transfers
          </Link>
        </div>
      </HeroShell>

      {/* What We Offer */}
      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Festival Travel Services" label="Complete Solutions" />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <Hotel className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Festival Hotels</h3>
              <p className="text-text-secondary text-sm">Curated accommodation near venues or in Cairo with festival shuttle services.</p>
            </div>
            <div className="text-center">
              <Car className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Festival Transfers</h3>
              <p className="text-text-secondary text-sm">Private airport transfers and venue transportation with experienced drivers.</p>
            </div>
            <div className="text-center">
              <Ticket className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Ticket Assistance</h3>
              <p className="text-text-secondary text-sm">Help securing festival tickets through official channels and VIP packages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Upcoming Festivals" label="2026-2027 Events" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {festivalEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Festival Destinations */}
      <section className="section bg-surface/30">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Festival Destinations" label="Where the Magic Happens" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Giza Pyramids</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Iconic festival venue with the pyramids as backdrop. Zamna and other major events host here.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Calendar className="w-4 h-4" />
                <span>Distance from Cairo: 30 minutes</span>
              </div>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Red Sea Resorts</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Hurghada and Sharm El Sheikh host beach festivals with luxury resorts and vibrant nightlife.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Calendar className="w-4 h-4" />
                <span>Distance from Cairo: 4-6 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planning Your Festival Trip */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Planning Your Festival Trip" label="Essential Tips" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Book Early</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Festival tickets and hotels sell out quickly. Contact us at least 2-3 months in advance for the best options.
              </p>
            </div>
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Car className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Arrange Transfers</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Festival venues can be remote. Private transfers ensure reliable transportation to and from events.
              </p>
            </div>
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Hotel className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Stay Near the Action</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Choose accommodation close to the venue or in Cairo with shuttle services for convenience.
              </p>
            </div>
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Check Visa Requirements</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Most travelers need an Egyptian visa. We can provide guidance on e-visa applications and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <SectionHeader title="Festival Travel FAQ" label="Common Questions" />
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-6 bg-surface/30">
                <h3 className="font-serif text-lg text-text-primary mb-2">{faq.question}</h3>
                <p className="text-text-secondary text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

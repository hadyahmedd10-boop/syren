import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/sections/ExperienceCard";
import { Ship, Calendar, MapPin, Star, Clock } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Luxury Nile Cruise Egypt | Private Nile Tours | Syren",
  description: "Experience Egypt's legendary Nile with Syren's luxury cruises. 5-star ships from Aswan to Luxor, private charters, and curated temple itineraries with expert Egyptologists.",
  keywords: [
    "luxury Nile cruise Egypt",
    "Nile cruise from Aswan to Luxor",
    "Egypt Nile cruise packages",
    "5 star Nile cruise Egypt",
    "private Nile cruise charter",
    "Egypt river cruise luxury",
  ],
  alternates: { canonical: "/nile-cruises" },
  openGraph: {
    title: "Luxury Nile Cruise Egypt | Private Nile Tours | Syren",
    description: "Experience Egypt's legendary Nile with Syren's luxury cruises. 5-star ships from Aswan to Luxor, private charters, and curated temple itineraries with expert Egyptologists.",
    url: "https://www.syrentravel.com/nile-cruises",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

const nileCruiseExperiences = experiences.filter((exp) =>
  exp.category === "nile-cruises" ||
  exp.destinations?.includes("luxor-aswan") ||
  exp.title.toLowerCase().includes("nile")
);

const faqs = [
  {
    question: "What is included in a Nile cruise package?",
    answer: "Our Nile cruise packages include 5-star accommodation aboard luxury ships, full board meals, guided temple excursions with Egyptologists, entrance fees to all sites, and airport transfers. Specific inclusions vary by itinerary.",
  },
  {
    question: "How long is a typical Nile cruise?",
    answer: "Most Nile cruises range from 3 to 7 nights. The classic route from Aswan to Luxor (or vice versa) typically takes 4 nights, allowing visits to Kom Ombo, Edfu, Luxor Temple, Karnak, and Valley of the Kings.",
  },
  {
    question: "When is the best time for a Nile cruise?",
    answer: "The best time is October through April, when temperatures are pleasant (20-25°C). Summer months (May-September) can be very hot (35-40°C), though cruise ships are air-conditioned.",
  },
  {
    question: "Can I charter a private Nile cruise?",
    answer: "Yes, we arrange private Nile cruise charters for families, groups, and special occasions. Private charters offer customized itineraries, exclusive use of the vessel, and personalized service.",
  },
  {
    question: "What temples will I visit on a Nile cruise?",
    answer: "Standard itineraries include Philae Temple in Aswan, Kom Ombo and Edfu temples en route, and Luxor's East Bank (Karnak, Luxor Temple) and West Bank (Valley of the Kings, Hatshepsut Temple, Colossi of Memnon).",
  },
];

export default function NileCruisesPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Nile Journeys"
        title="Luxury Nile Cruises"
        subtitle="Sail through Egypt's ancient heartland in comfort and style. Private charters, 5-star ships, and temple itineraries with expert Egyptologists."
        altText="Luxury Nile Cruise Egypt - Syren Travel"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/experiences" className="syren-btn">
            Browse All Experiences
          </Link>
        </div>
      </HeroShell>

      {/* Why Choose Our Nile Cruises */}
      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Why Cruise the Nile with Syren" label="The Syren Difference" />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <Ship className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">5-Star Luxury Ships</h3>
              <p className="text-text-secondary text-sm">Premium vessels with spacious cabins, fine dining, and panoramic sundecks.</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Expert Egyptologists</h3>
              <p className="text-text-secondary text-sm">Licensed guides bring temples to life with deep历史 knowledge and storytelling.</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Curated Temple Itineraries</h3>
              <p className="text-text-secondary text-sm">Carefully timed visits to avoid crowds and capture the best light at each site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nile Cruise Experiences */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Nile Cruise Experiences" label="Curated Journeys" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {nileCruiseExperiences.map((exp) => (
              <ExperienceCard
                key={exp.slug}
                title={exp.title}
                description={exp.description}
                image={exp.heroImage}
                alt={exp.title}
                duration={exp.duration}
                cities={exp.cities}
                priceAmount={exp.price?.amount}
                priceCurrency={exp.price?.currency}
                label={exp.badge}
                href={`/experiences/${exp.slug}`}
                itemType="experience"
                slug={exp.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cruise Routes */}
      <section className="section bg-surface/30">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Popular Nile Cruise Routes" label="Classic Itineraries" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Aswan to Luxor (4 Nights)</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                The classic northbound journey. Visit Philae Temple in Aswan, sail to Kom Ombo and Edfu, then explore Luxor's East and West Banks.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Best for: First-time Nile cruisers</span>
              </div>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Luxor to Aswan (4 Nights)</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Southbound route starting with Luxor's temples, then sailing south through Edfu and Kom Ombo to Aswan's Philae Temple.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Best for: Those starting in Cairo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <SectionHeader title="Nile Cruise FAQ" label="Common Questions" />
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

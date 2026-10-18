import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { experiences } from "@/data/experiences";
import { excursions } from "@/data/excursions";
import ExperienceCard from "@/components/sections/ExperienceCard";
import { Pyramid, MapPin, Clock, User, Star } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Private Cairo Tours | Egyptologist Guide | Syren",
  description: "Book private Cairo tours with expert Egyptologists. Giza Pyramids, Grand Egyptian Museum, Islamic Cairo, and customized itineraries for discerning travelers.",
  keywords: [
    "private Cairo tours",
    "Cairo private tour guide",
    "Giza Pyramids private tour",
    "Egyptologist guided tours",
    "private Cairo sightseeing",
    "custom Cairo itinerary",
  ],
  alternates: { canonical: "/cairo-private-tours" },
  openGraph: {
    title: "Private Cairo Tours | Egyptologist Guide | Syren",
    description: "Book private Cairo tours with expert Egyptologists. Giza Pyramids, Grand Egyptian Museum, Islamic Cairo, and customized itineraries for discerning travelers.",
    url: "https://www.syrentravel.com/cairo-private-tours",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

const cairoExperiences = experiences.filter((exp) =>
  exp.destinations?.includes("cairo") || exp.cities?.toLowerCase().includes("cairo")
);

const cairoExcursions = excursions.filter((exc) =>
  exc.city?.toLowerCase().includes("cairo") || exc.cities?.some(c => c.toLowerCase().includes("cairo")) || exc.title.toLowerCase().includes("cairo")
);

const faqs = [
  {
    question: "What is included in a private Cairo tour?",
    answer: "Our private Cairo tours include hotel pickup and drop-off, private air-conditioned vehicle, licensed Egyptologist guide, entrance fees to all sites, and bottled water. Lunch can be arranged upon request.",
  },
  {
    question: "Can I visit the Giza Pyramids at sunrise?",
    answer: "Yes, we arrange early morning pyramid visits to avoid crowds and capture the best light. Sunrise tours typically start at 5:00 AM and include private access before the site opens to the public.",
  },
  {
    question: "How long does a typical Cairo tour last?",
    answer: "Most full-day Cairo tours last 8-10 hours, starting around 8:00 AM and ending by 6:00 PM. Half-day tours are 4-5 hours. We can customize timing based on your preferences and energy levels.",
  },
  {
    question: "Do you offer tours of the Grand Egyptian Museum?",
    answer: "Yes, we provide guided tours of the Grand Egyptian Museum with expert Egyptologists. We can arrange after-hours private access for a more intimate experience with the artifacts.",
  },
  {
    question: "Can I combine Cairo tours with other destinations?",
    answer: "Absolutely. Cairo is often the starting point for multi-day Egypt itineraries. We can seamlessly combine Cairo tours with Nile cruises, Luxor visits, or Red Sea extensions.",
  },
];

export default function CairoPrivateToursPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Cairo Journeys"
        title="Private Cairo Tours"
        subtitle="Explore Egypt's capital with expert Egyptologists. From the Giza Pyramids to Islamic Cairo's hidden gems, experience the city on your terms."
        altText="Private Cairo Tours - Syren Travel"
        heightClassName="min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/experiences" className="syren-btn">
            Browse Multi-Day Experiences
          </Link>
          <Link href="/excursions" className="syren-btn-secondary">
            View Day Trips
          </Link>
        </div>
      </HeroShell>

      {/* Why Choose Private Cairo Tours */}
      <section className="section bg-background border-t border-border">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Why Choose Private Cairo Tours" label="The Syren Difference" />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <User className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Expert Egyptologists</h3>
              <p className="text-text-secondary text-sm">Licensed guides with deep knowledge of ancient history, archaeology, and local culture.</p>
            </div>
            <div className="text-center">
              <Pyramid className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Private Access</h3>
              <p className="text-text-secondary text-sm">Early morning pyramid visits, after-hours museum access, and skip-the-line arrangements.</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-accent-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl text-text-primary mb-2">Customized Itineraries</h3>
              <p className="text-text-secondary text-sm">Tailored to your interests, pace, and preferences. No rigid schedules or forced shopping stops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cairo Experiences */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Multi-Day Cairo Experiences" label="Extended Journeys" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {cairoExperiences.map((exp) => (
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

      {/* Cairo Day Excursions */}
      <section className="section bg-surface/30">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader title="Cairo Day Excursions" label="Private Day Trips" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {cairoExcursions.map((exc) => (
              <ExperienceCard
                key={exc.slug}
                title={exc.title}
                description={exc.shortDescription}
                image={exc.heroImage || exc.image || HERO_IMAGES.home}
                alt={exc.imageAlt || exc.title}
                duration={exc.duration}
                cities={exc.city || exc.cities?.join(", ")}
                priceAmount={exc.priceCents / 100}
                priceCurrency={exc.currency === "usd" ? "USD" : exc.currency === "eur" ? "EUR" : "GBP"}
                href={`/excursions/${exc.slug}`}
                itemType="excursion"
                slug={exc.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cairo Highlights */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-6xl">
          <SectionHeader title="Cairo Highlights" label="Must-See Sites" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Pyramid className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Giza Pyramids & Sphinx</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                The last remaining Wonder of the Ancient World. Private access before crowds, expert commentary, and optional camel rides.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Duration: 3-4 hours</span>
              </div>
            </div>
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Grand Egyptian Museum</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Home to Tutankhamun's treasures and thousands of artifacts. Guided tours with expert Egyptologists available.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Duration: 2-3 hours</span>
              </div>
            </div>
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Islamic Cairo</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Explore historic mosques, madrasas, and the Khan el-Khalili bazaar. Hidden workshops and artisan demonstrations.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Duration: 3-4 hours</span>
              </div>
            </div>
            <div className="bg-surface/30 p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent-gold" />
                <h3 className="font-serif text-lg text-text-primary">Coptic Cairo</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Visit the Hanging Church, Ben Ezra Synagogue, and the Coptic Museum. A journey through Egypt's Christian heritage.
              </p>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Duration: 2-3 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <SectionHeader title="Cairo Tour FAQ" label="Common Questions" />
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

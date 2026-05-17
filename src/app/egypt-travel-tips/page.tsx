import type { Metadata } from "next";
import Link from "next/link";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import { HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Egypt Travel Tips for First Timers | Syren",
  description: "Essential Egypt travel tips for first-time visitors. Visa advice, currency, transport, packing list, cultural etiquette, and safety guidance from local experts.",
  keywords: ["egypt travel tips", "egypt travel advice", "visiting egypt first time", "egypt tourist tips", "egypt travel guide"],
  alternates: { canonical: "/egypt-travel-tips" },
  openGraph: {
    title: "Egypt Travel Tips for First Timers | Syren",
    description: "Essential Egypt travel tips for first-time visitors. Visa advice, currency, transport, packing list, cultural etiquette, and safety guidance from local experts.",
    url: "https://www.syrentravel.com/egypt-travel-tips",
    type: "article",
    images: [{ url: HERO_IMAGES.home.src }],
  },
};

export default function EgyptTravelTipsPage() {
  const tips = [
    {
      title: "Visa & Entry",
      text:
        "Most nationalities can obtain an Egyptian e-visa online before travel at visa2egypt.gov.eg. The process takes 3-5 business days and costs around $25 USD. Some nationalities receive visa on arrival at Egyptian airports. Always check your specific passport requirements — your Syren concierge can guide you through this before your trip.",
    },
    {
      title: "Currency & Money",
      text:
        "Egypt's currency is the Egyptian Pound (EGP). ATMs are widely available in tourist areas and major hotels. Credit cards are accepted at hotels, restaurants, and larger shops — but carry cash for markets, smaller restaurants, and tips. Tipping (baksheesh) is an important part of Egyptian culture — budget EGP 20-50 for most small services.",
    },
    {
      title: "Getting Around",
      text:
        "Within cities, licensed taxis and Uber/Careem are reliable and affordable. Between cities, private transfers (arranged by Syren) are the most comfortable option. Domestic flights connect Cairo to Luxor, Aswan, and Hurghada — usually under an hour and surprisingly affordable. Avoid unlicensed taxis outside tourist areas. For popular add-ons and day tours, explore our excursions page.",
    },
    {
      title: "What to Wear",
      text:
        "Egypt is a predominantly Muslim country with a warm and welcoming attitude toward tourists. In resort areas (Red Sea, Sharm), Western dress is perfectly normal. In Cairo, Luxor, and religious sites, modest dress is respectful — covered shoulders and knees for both men and women. A light scarf is always useful and takes up zero space in your bag.",
    },
    {
      title: "Food & Water",
      text:
        "Egyptian food is extraordinary — don't miss koshary, ful medames, fresh mezze, and grilled fish on the Red Sea. Drink bottled water — tap water is not recommended for visitors. Most reputable restaurants and all hotels serve safe, high-quality food.",
    },
    {
      title: "Communication",
      text:
        "Egyptian SIM cards are cheap and widely available at the airport (Vodafone, Orange, Etisalat). A local SIM for a week costs around $10-15 and gives you data for maps and communication. WhatsApp is universally used in Egypt — your Syren concierge is always reachable on WhatsApp.",
    },
    {
      title: "The Syren Advantage",
      text:
        "Every tip above becomes a non-issue when you travel with Syren. We handle your visa guidance, arrange your transfers, book your restaurants, and remain available 24/7 throughout your trip. Egypt with local experts is a fundamentally different experience.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Travel Advice"
        title="Egypt Travel Tips"
        subtitle="Everything you wish someone had told you before your first trip — from people who know Egypt inside out."
        heightClassName="min-h-[46vh] md:min-h-[52vh]"
      />

      <section className="section">
        <div className="container-x mx-auto max-w-3xl font-serif">
          <SectionHeader title="Read This Before You Go" label="Local Insight" className="mb-6" />
          <ol className="space-y-6">
            {tips.map((t, idx) => (
              <li key={t.title} className="flex gap-4">
                <span className="text-accent-gold font-serif text-2xl">{idx + 1}.</span>
                <div>
                  <h3 className="font-serif text-xl text-text-primary mb-1">{t.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {t.text}
                    {t.title === "Getting Around" && (
                      <>
                        {" "}See our{" "}
                        <Link href="/excursions" className="text-accent-gold underline">excursions</Link>
                        {" "}for inspiration — including a{" "}
                        <Link href="/excursions/hurghada-cairo-day-trip" className="text-accent-gold underline">Cairo day trip</Link>
                        {" "}and an evening{" "}
                        <Link href="/excursions/nile-maxim-dinner-cruise" className="text-accent-gold underline">Nile cruise</Link>
                        {" "}in Cairo.
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-2xl bg-black/90 border border-accent-gold/30 p-8 md:p-10 text-center">
            <div className="font-serif text-2xl text-text-primary mb-3">Start Planning With Syren</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/experiences" className="syren-btn">Explore Experiences →</Link>
              <Link href="/quote" className="syren-btn-secondary">Request a Quote →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Destinations from "@/components/sections/Destinations"; 
import type { Metadata } from "next"; 
import HeroShell from "@/components/ui/HeroShell";
import { HERO_IMAGES } from "@/lib/images";

export const metadata: Metadata = { 
  title: "Egypt Destinations: Cairo, Luxor & Red Sea | Syren", 
  description: "Explore Egypt's most spectacular destinations with Syren. Private tours to Cairo, Luxor, Aswan, the Red Sea, Siwa Oasis, and Alexandria crafted for discerning travelers.", 
  keywords: [
    "Egypt destinations",
    "Cairo Red Sea Luxor Aswan",
    "travel Egypt destinations",
    "Europe to Egypt destinations",
    "Latin America Egypt travel",
    "Gulf luxury Egypt travel"
  ],
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Egypt Destinations: Cairo, Luxor & Red Sea | Syren",
    description: "Explore Egypt's most spectacular destinations with Syren. Private tours to Cairo, Luxor, Aswan, the Red Sea, Siwa Oasis, and Alexandria crafted for discerning travelers.",
    url: "https://www.syrentravel.com/destinations",
    type: "website",
    images: [{ url: HERO_IMAGES.home.src }],
  },
}; 

export default function DestinationsPage() { 
  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="The Landscape"
        title="Our Destinations"
        subtitle="From the Pyramids of Giza to the shores of the Red Sea. Discover Egypt through Syren’s expertly curated luxury destinations."
        altText="Our Destinations - Syren Travel Egypt"
        heightClassName="min-h-[50vh] md:min-h-[60vh]"
      />
      <Destinations />
    </main>
  ); 
}


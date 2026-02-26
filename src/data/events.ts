import { StaticImageData } from "next/image";
import { EVENT_IMAGES } from "@/lib/images";

export interface Event {
  slug: string;
  name: string;
  date: string;
  location: string;
  thumbnail: StaticImageData;
  description: string;
  overview: string;
  artistLineup: string[];
  ticketLink: string;
  syrenPackage: {
    title: string;
    description: string;
    cta: string;
  };
}

export const events: Event[] = [
  {
    slug: "cairo-jazz-festival",
    name: "Cairo Jazz Festival",
    date: "October 28 - November 5, 2024",
    location: "The American University in Cairo",
    thumbnail: EVENT_IMAGES["cairo-jazz-festival"],
    description: "A week-long celebration of jazz music, featuring local and international artists.",
    overview: "The Cairo Jazz Festival is an annual event that brings together jazz musicians from all over the world. The festival features a diverse lineup of artists, from traditional jazz to contemporary and experimental music.",
    artistLineup: ["Herbie Hancock", "Chick Corea", "Kamasi Washington"],
    ticketLink: "https://www.cairojazzfest.com/",
    syrenPackage: {
      title: "Syren's Jazz Festival Experience",
      description: "Enjoy a curated experience of the Cairo Jazz Festival with Syren. Our package includes premium tickets, private transportation, and exclusive access to after-parties.",
      cta: "Book Travel Package",
    },
  },
];

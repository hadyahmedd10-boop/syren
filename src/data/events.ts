import { StaticImageData } from "next/image";
import { EVENT_IMAGES } from "@/lib/images";

export type EventCategory =
  | "Popular Events in Egypt"
  | "International Music Festivals"
  | "Art Exhibitions"
  | "Cultural & Heritage Festivals";

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  shortDescription: string;
  fullDescription: string;
  location: string;
  city: string;
  date: string;
  time: string;
  duration?: string;
  minAge?: string;
  lineup: string[];
  houseRules?: string[];
  ticketUrl: string;
  heroImage: StaticImageData | string;
  galleryImages: (StaticImageData | string)[];
  isFeatured: boolean;
  isPopular: boolean;
  seoTitle: string;
  seoDescription: string;
  curatedPackage: {
    title: string;
    description: string;
    inclusions: string[];
    ctaLabel: string;
  };
}

export const eventCategories: EventCategory[] = [
  "Popular Events in Egypt",
  "International Music Festivals",
  "Art Exhibitions",
  "Cultural & Heritage Festivals",
];

export const events: Event[] = [
  {
    id: "zamna-egypt-2026",
    slug: "zamna-festival",
    title: "Zamna Egypt",
    category: "Popular Events in Egypt",
    shortDescription: "Three days of music, culture, and adventure beneath the Pyramids.",
    fullDescription:
      "Zamna is returning to Egypt after last year’s legendary weekend, bringing an elevated multi-day experience that blends electronic music, culture, and curated adventures across Cairo and Giza. Expect international headliners, refined staging, and premium pacing with Syren-curated daytime journeys complementing the night. Further details TBA.",
    location: "The Great Pyramids of Giza",
    city: "Giza, Egypt",
    date: "April 24-26, 2026",
    time: "6:00 PM - 3:00 AM",
    duration: "3 Days",
    lineup: ["TBA"],
    minAge: "21+",
    ticketUrl: "https://www.technoandchill.com/events/",
    heroImage: EVENT_IMAGES["zamna-festival"],
    galleryImages: [EVENT_IMAGES["zamna-festival"]],
    isFeatured: true,
    isPopular: true,
    seoTitle: "Zamna Egypt | Three-Day Festival at Giza",
    seoDescription:
      "Three days of music, culture, and adventure beneath the Pyramids.",
    curatedPackage: {
      title: "Syren Curated Zamna Experience",
      description:
        "Luxury hotel stay, VIP transfers, curated Cairo daytime experiences, and priority festival access.",
      inclusions: [
        "4-5 star hotel accommodation",
        "Private airport transfers",
        "VIP festival access",
        "Nile sunset cruise",
        "Guided cultural tour"
      ],
      ctaLabel: "Book Zamna Travel Package",
    },
  },
  {
    id: "evt_noart",
    slug: "noart-festival",
    title: "NOART Festival",
    category: "Popular Events in Egypt",
    shortDescription: "Underground culture and cutting-edge electronic music.",
    fullDescription:
      "NOART showcases avant-garde electronic artists with immersive environments and refined staging.",
    location: "Human Figures Platform, Somabay",
    city: "Soma Bay, Egypt",
    date: "March 22, 2026",
    time: "8:00 PM",
    duration: "9h",
    lineup: [
      "ANOTR",
      "Bella",
      "Chris Stussy",
      "Chloe Caillet",
      "Job Jobse B2B Palms Trax",
      "Misty"
    ],
    ticketUrl: "https://tickets.example.com/noart",
    heroImage: EVENT_IMAGES["noart-festival"],
    galleryImages: [EVENT_IMAGES["noart-festival"]],
    isFeatured: false,
    isPopular: true,
    seoTitle: "NOART Festival Egypt | Underground Culture",
    seoDescription:
      "Discover NOART in Egypt with a curated Syren package and premium logistics.",
    curatedPackage: {
      title: "Soma Bay Luxury Festival Escape",
      description:
        "Curated venue access, transport coordination, and select dining reservations.",
      inclusions: ["Transport", "Curated access", "Dining reservations"],
      ctaLabel: "Book Travel Package",
    },
  },
  {
    id: "evt_moment",
    slug: "the-moment-festival",
    title: "The Moment Festival",
    category: "Popular Events in Egypt",
    shortDescription: "Signature premium festival with international lineups.",
    fullDescription:
      "The Moment brings an elevated multi-stage festival experience to Egypt, focusing on sound, pacing, and quality.",
    location: "Egypt",
    city: "Cairo",
    date: "2026-12-02",
    time: "16:00",
    lineup: ["Headliner M", "International N", "Local O"],
    ticketUrl: "https://tickets.example.com/moment",
    heroImage: EVENT_IMAGES["the-moment-festival"],
    galleryImages: [EVENT_IMAGES["the-moment-festival"]],
    isFeatured: true,
    isPopular: true,
    seoTitle: "The Moment Festival Egypt | International Lineups",
    seoDescription:
      "Experience The Moment with Syren’s concierge and premium access packages.",
    houseRules: [
      "No on-door tickets",
      "No re-entry",
      "Standing & Golden Circle Minimum Entry Age: 6+",
      "VIP Standing Minimum Entry Age: 10+",
      "Couples / Mixed groups only",
      "Violent behavior will not be tolerated",
      "Door selection applies",
      "Paid tickets are non-refundable and non-exchangeable"
    ],
    curatedPackage: {
      title: "The Moment Festival Escape – Ain Sokhna",
      description:
        "Premium passes, private chauffeur service, and reserved lounge access.",
      inclusions: ["Premium passes", "Chauffeur", "Lounge access"],
      ctaLabel: "Book Travel Package",
    },
  },
  {
    id: "evt_shakira",
    slug: "shakira-live-performance",
    title: "Shakira Live Performance",
    category: "Popular Events in Egypt",
    shortDescription: "Global icon performing a special live show in Egypt.",
    fullDescription:
      "A rare live performance bringing international pop excellence to Egypt with large-scale production values.",
    location: "Egypt",
    city: "Cairo",
    date: "2026-08-21",
    time: "20:00",
    lineup: ["Shakira", "Opening Act"],
    ticketUrl: "https://tickets.example.com/shakira",
    heroImage: EVENT_IMAGES["shakira-live-performance"],
    galleryImages: [EVENT_IMAGES["shakira-live-performance"]],
    isFeatured: true,
    isPopular: true,
    seoTitle: "Shakira Live in Egypt | Premium Access",
    seoDescription:
      "Enjoy Shakira live with Syren’s premium tickets and concierge travel planning.",
    houseRules: [
      "No on-door tickets",
      "No re-entry",
      "Standing & Golden Circle Minimum Entry Age: 6+",
      "VIP Standing Minimum Entry Age: 10+",
      "Couples / Mixed groups only",
      "Violent behavior will not be tolerated",
      "Door selection applies",
      "Paid tickets are non-refundable and non-exchangeable"
    ],
    curatedPackage: {
      title: "Shakira at the Pyramids – VIP Travel Experience",
      description:
        "Front-row seating options, private transfers, and post-show lounge reservations.",
      inclusions: ["VIP tickets", "Transfers", "Lounge reservations"],
      ctaLabel: "Book Travel Package",
    },
  },
  {
    id: "evt_exit",
    slug: "exit-festival",
    title: "EXIT Festival",
    category: "Popular Events in Egypt",
    shortDescription: "Renowned international festival edition hosted in Egypt.",
    fullDescription:
      "EXIT delivers multi-genre programming with precise production and logistics for discerning attendees.",
    location: "Egypt",
    city: "Cairo",
    date: "2026-09-10",
    time: "18:00",
    lineup: ["Artist A1", "Artist B1", "Artist C1"],
    ticketUrl: "https://tickets.example.com/exit",
    heroImage: EVENT_IMAGES["exit-festival"],
    galleryImages: [EVENT_IMAGES["exit-festival"]],
    isFeatured: false,
    isPopular: true,
    seoTitle: "EXIT Festival Egypt | International Edition",
    seoDescription:
      "Explore EXIT’s Egypt edition with Syren’s premium logistics and curated packages.",
    curatedPackage: {
      title: "EXIT Curated Package",
      description:
        "Transport orchestration, reserved access areas, and on-call concierge.",
      inclusions: ["Transport", "Reserved areas", "Concierge"],
      ctaLabel: "Book Travel Package",
    },
  },
  {
    id: "evt_sandbox",
    slug: "sandbox-festival",
    title: "SANDBOX Festival",
    category: "Popular Events in Egypt",
    shortDescription: "Beachside electronic music retreat.",
    fullDescription:
      "SANDBOX combines coastal settings with refined electronic music curation and intimate pacing.",
    location: "El Gouna, Red Sea",
    city: "El Gouna, Egypt",
    date: "May 7-9, 2026",
    time: "17:00",
    lineup: ["TBA"],
    ticketUrl: "https://tickets.example.com/sandbox",
    heroImage: EVENT_IMAGES["sandbox-festival"],
    galleryImages: [EVENT_IMAGES["sandbox-festival"]],
    isFeatured: false,
    isPopular: true,
    seoTitle: "SANDBOX Festival Egypt | Coastal Electronic",
    seoDescription:
      "Book SANDBOX with Syren’s coastal packages, transport, and boutique stays.",
    curatedPackage: {
      title: "SANDBOX Luxury Red Sea Retreat",
      description:
        "Boutique accommodations, beach transfers, and premium festival access.",
      inclusions: ["Accommodations", "Transfers", "Access"],
      ctaLabel: "Book Travel Package",
    },
  },
  {
    id: "evt_tannoura",
    slug: "al-tannoura-show",
    title: "Al Tannoura Show",
    category: "Cultural & Heritage Festivals",
    shortDescription: "Traditional whirling performance in historic Cairo.",
    fullDescription:
      "Al Tannoura showcases Egypt’s heritage through rhythmic whirling and live music at historic venues.",
    location: "Egypt",
    city: "Cairo",
    date: "2026-03-10",
    time: "19:30",
    lineup: ["Tannoura Troupe"],
    ticketUrl: "https://tickets.example.com/tannoura",
    heroImage: EVENT_IMAGES["al-tannoura-show"],
    galleryImages: [EVENT_IMAGES["al-tannoura-show"]],
    isFeatured: false,
    isPopular: false,
    seoTitle: "Al Tannoura Show | Cultural Heritage",
    seoDescription:
      "Experience Al Tannoura with Syren’s curated cultural packages and local guides.",
    curatedPackage: {
      title: "Cultural Heritage Package",
      description:
        "Historic venue access, local guide, and post-show dining reservations.",
      inclusions: ["Access", "Guide", "Dining reservations"],
      ctaLabel: "Book Travel Package",
    },
  },
];

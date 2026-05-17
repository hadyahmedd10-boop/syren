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
  categories?: EventCategory[];
  displayDate?: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  city: string;
  date: string;
  time: string;
  duration?: string;
  minAge?: string;
  lineup: string[];
  afterParties?: {
    name: string;
    venue: string;
    date: string;
    time?: string;
    lineup?: string[];
    ticketUrl?: string;
  }[];
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
    category: "International Music Festivals",
    shortDescription: "Three days of music, culture, and adventure beneath the Pyramids.",
    fullDescription:
      "Zamna is returning to Egypt after last year’s legendary weekend, bringing an elevated multi-day experience that blends electronic music, culture, and curated adventures across Cairo and Giza. Expect international headliners, refined staging, and premium pacing with Syren-curated daytime journeys complementing the night. Further details TBA.",
    location: "The Great Pyramids of Giza",
    city: "Giza, Egypt",
    date: "2026-04-24",
    displayDate: "April 24–25, 2026",
    time: "6:00 PM - 3:00 AM",
    duration: "2 Days",
    lineup: [
      "CAMELPHAT",
      "CHARMEINE",
      "HENRI BERGMAN",
      "JUMI JULES",
      "LOCO DICE",
      "MACEO PLEX",
      "MAXI MERAKI",
      "MIMI x FY",
      "STREETA",
      "ZSS"
    ],
    minAge: "21+",
    ticketUrl: "https://www.technoandchill.com/events/",
    heroImage: EVENT_IMAGES["zamna-festival"] ?? "/images/placeholder.jpg",
    galleryImages: [EVENT_IMAGES["zamna-festival"]],
    isFeatured: true,
    isPopular: true,
    seoTitle: "Zamna Egypt | Three-Day Festival at Giza",
    seoDescription:
      "Three days of music, culture, and adventure beneath the Pyramids.",
    afterParties: [
      { name: "Zamna After Party", venue: "TBA", date: "April 24, 2026", time: "3:00 AM" },
      { name: "Zamna After Party", venue: "TBA", date: "April 25, 2026", time: "3:00 AM" }
    ],
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
    id: "evt_vangogh",
    slug: "beyond-van-gogh",
    title: "Beyond Van Gogh — Immersive Exhibition",
    category: "Art Exhibitions",
    shortDescription: "Immersive digital exhibition showcasing 300+ masterpieces by Van Gogh.",
    fullDescription:
      "Ever dreamt of stepping inside of one of Van Gogh’s paintings? Ever imagined being able to wander through the sun-drenched pastures of the South of France or standing beneath the swirling skies of 'The Starry Night'? This April, Cairo audiences can do just that. After captivating millions across North America, Europe and Asia, 'Beyond Van Gogh: The Immersive Experience' makes its Egyptian debut on April 7th, 2026, at District 5 by Marakez in New Cairo. The internationally acclaimed exhibition transforms more than 300 masterpieces by Vincent van Gogh into a fully immersive digital spectacle, surrounding visitors with moving visuals that dissolve the boundary between viewer and canvas. Over the course of 60 to 75 minutes, guests drift through Van Gogh’s most iconic works. Later in the season, a special limited engagement of 'Beyond Monet' will invite audiences into the luminous gardens of Claude Monet during select dates. The event has been brought to Egypt by local event organisers Nacelle, launching Nacelle Studios. 'This exhibition marks a new chapter in Egypt’s cultural landscape,' said Tito El Kachab, CEO at Nacelle Studios. 'We are committed to expanding access to transformative global experiences. By bringing Beyond Van Gogh to Cairo, we are introducing a format that blends art, technology, and storytelling into a dynamic public destination.' The exhibition runs from April through June 2026 at District 5, New Cairo. Tickets and priority presale registration will be available soon, with booking details to be announced online.",
    location: "District 5, New Cairo",
    city: "New Cairo, Egypt",
    date: "2026-04-07",
    displayDate: "April–June, 2026",
    time: "Various",
    duration: "60–75 minutes",
    lineup: [],
    ticketUrl: "https://tickets.example.com/beyond-van-gogh",
    heroImage: EVENT_IMAGES["beyond-van-gogh"] ?? "/images/placeholder.jpg",
    galleryImages: [EVENT_IMAGES["beyond-van-gogh"]],
    isFeatured: false,
    isPopular: true,
    seoTitle: "Beyond Van Gogh — Immersive Exhibition | Cairo",
    seoDescription:
      "An immersive digital exhibition of 300+ Van Gogh masterpieces at District 5, New Cairo.",
    curatedPackage: {
      title: "Immersive Art Experience Package",
      description:
        "Private transfers, concierge planning, and priority entry once available.",
      inclusions: ["Transfers", "Concierge planning", "Priority entry (soon)"],
      ctaLabel: "Book Travel Package",
    },
  },
  {
    id: "evt_noart",
    slug: "noart-festival",
    title: "NOART Festival",
    category: "International Music Festivals",
    categories: ["International Music Festivals", "Popular Events in Egypt"],
    shortDescription: "Underground culture and cutting-edge electronic music.",
    fullDescription:
      "After last summer’s special debut, we bring No Art to Soma Bay for the first time. Join us March 22nd by the Red Sea. NO ART EGYPT 🇪🇬 · SOMABAY · 22ND OF MARCH 2026",
    location: "Somabay, Egypt",
    city: "Soma Bay, Egypt",
    date: "2026-03-22",
    displayDate: "March 22, 2026",
    time: "8:00 PM",
    duration: "9h",
    afterParties: [
      {
        name: "The Afters",
        venue: "The Theatre, Somabay",
        date: "March 23, 2026",
        time: "7:00 AM onwards",
        lineup: ["Chloé Caillet", "Job Jobse", "Misty"],
        ticketUrl: "https://ticketegypt.venflare.com/events/8e574b0d-4b7f-4b53-8157-48c60eff092f",
      },
    ],
    lineup: [
      "ANOTR",
      "Bella",
      "Chris Stussy",
      "Chloe Caillet",
      "Job Jobse B2B Palms Trax",
      "Misty"
    ],
    ticketUrl: "https://ticketegypt.venflare.com/events/03e05beb-9280-4cee-928e-c12bc8257d23",
    heroImage: EVENT_IMAGES["noart-festival"] ?? "/images/placeholder.jpg",
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
    id: "evt_shakira",
    slug: "shakira-live-performance",
    title: "Shakira Live Performance",
    category: "International Music Festivals",
    categories: ["International Music Festivals", "Popular Events in Egypt"],
    shortDescription: "Global icon performing a special live show in Egypt.",
    fullDescription:
      "The rumors are true. You heard it here first. Whenever, wherever, the wait is finally over! The global sensation and icon Shakira is coming to Egypt for a live performance at the historic Pyramids of Giza.",
    location: "Pyramids of Giza, Egypt",
    city: "Giza, Egypt",
    date: "2026-11-07",
    displayDate: "November 7, 2026",
    time: "20:00",
    lineup: ["Shakira", "Opening Act"],
    ticketUrl: "https://ticketegypt.venflare.com/events/6f9c1782-c4d5-4f9a-b2b1-29372e2bdda9",
    heroImage: EVENT_IMAGES["shakira-live-performance"] ?? "/images/placeholder.jpg",
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
    title: "Exit Festival Presents Starlight Festival by the Pyramids",
    category: "International Music Festivals",
    shortDescription: "Set on the desert sands beside the Great Pyramids of Giza, uniting the global electronic music community within a setting shaped by thousands of years of history.",
    fullDescription:
      "Set on the desert sands beside Great Pyramids of Giza, one of the world's most significant symbols of ancient civilization, the festival will unite the global electronic music and festival community within a setting shaped by thousands of years of history.",
    location: "The Great Pyramids of Giza",
    city: "Giza, Egypt",
    date: "2026-10-08",
    displayDate: "October 8-11, 2026",
    time: "18:00",
    lineup: ["TBA"],
    ticketUrl: "https://tickets.example.com/exit",
    heroImage: EVENT_IMAGES["exit-festival"] ?? "/images/placeholder.jpg",
    galleryImages: [EVENT_IMAGES["exit-festival"]],
    isFeatured: false,
    isPopular: true,
    seoTitle: "EXIT Festival Egypt | International Edition",
    seoDescription:
      "Explore EXIT’s Egypt edition with Syren’s premium logistics and curated packages.",
    curatedPackage: {
      title: "Exit at the Pyramids — Syren Package",
      description: "10 nights curated around Exit Festival. Old Cairo by night, a Fayoum desert overnight, four days at the festival, then the Red Sea at Hurghada. Everything handled by Syren.",
      inclusions: [
        "Airport pickup and all transfers",
        "9 nights accommodation",
        "1 night Bedouin desert camp in Fayoum",
        "Exit Festival access for 4 days",
        "Private boat party in Hurghada",
        "24/7 Syren concierge"
      ],
      ctaLabel: "Reserve Your Exit Package",
    },
  },
  {
    id: "evt_sandbox",
    slug: "sandbox-festival",
    title: "SANDBOX Festival",
    category: "International Music Festivals",
    shortDescription: "Beachside electronic music retreat.",
    fullDescription:
      "SANDBOX combines coastal settings with refined electronic music curation and intimate pacing.",
    location: "EL-Gouna, Egypt",
    city: "El Gouna, Egypt",
    date: "2026-05-07",
    displayDate: "May 7–9, 2026",
    time: "17:00",
    lineup: [
      "Ajna B2B Samm",
      "Ame Live presents...",
      "Anastazja",
      "Anthea",
      "Avangart Tabldot",
      "Awadly",
      "Bahaa",
      "Bedouin",
      "Butch B2B TOMAN",
      "Carol Fernandez",
      "Chiati (Live)",
      "Christian AB",
      "Courtesy",
      "Craig Richards",
      "Dan Shake",
      "DAOX",
      "DESIREE",
      "Dish Dash",
      "Dixon",
      "DJ Tennis B2B Traumer",
      "Dodge_Ramzz",
      "Elias Mazian",
      "Floorplan",
      "Francesco Del Garda",
      "Gazbee",
      "Gloria",
      "Hamdi Ryder",
      "Hameed",
      "Hermit",
      "Hey-D",
      "Hisham Zahran",
      "HoneyLuv",
      "Husa & Zeyada (Live)",
      "Jade",
      "JAMIIE",
      "Jess",
      "Job Jobse",
      "Julya Karma",
      "Khadija",
      "Kotoe",
      "KZ & Cake",
      "Lilya Mandre",
      "Maie",
      "Makez",
      "meera",
      "Mike Pham",
      "Misty",
      "Natasha Polke (Live)",
      "Notre Dame B2B Ankhoi",
      "Nova Retra",
      "Omar Fayyad",
      "PARAMIDA",
      "Ramez (Live)",
      "ReiRei",
      "Rish",
      "Rolbac B2B Ashmawy",
      "Ronin",
      "Rossi.",
      "Roza Terenzi",
      "Sally C",
      "Salome Le Chat",
      "Shanti Celeste B2B Peach",
      "SOS",
      "Tamara Q",
      "Thatgirl SherryK",
      "The Blaze (DJ Set)",
      "Toola",
      "Tripolism",
      "Ziad Mousa"
    ],
    ticketUrl: "https://booking.sandboxfestival.com/booking/68",
    heroImage: EVENT_IMAGES["sandbox-festival"] ?? "/images/placeholder.jpg",
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
    id: "evt_bocelli",
    slug: "andrea-bocelli",
    title: "Andrea Bocelli — Romanza 30th Anniversary",
    category: "International Music Festivals",
    categories: ["International Music Festivals", "Popular Events in Egypt"],
    shortDescription: "A night of passion, elegance, and timeless music with Maestro Andrea Bocelli.",
    fullDescription:
      "An unforgettable night of music as Maestro Andrea Bocelli performs live in Egypt celebrating his widely acclaimed breakthrough album Romanza, bringing his iconic voice and timeless repertoire to the stage for a night filled with passion, elegance, and pure musical magic.",
    location: "City of Arts & Culture - New Capital",
    city: "New Capital, Egypt",
    date: "2026-05-26",
    displayDate: "May 26, 2026",
    time: "09:00 PM",
    lineup: ["Andrea Bocelli"],
    ticketUrl: "https://www.ticketsmarche.com/event/Andrea_Bocelli_8036",
    heroImage: EVENT_IMAGES["andrea-bocelli"] ?? "/images/hero/luxury.jpg",
    galleryImages: [EVENT_IMAGES["andrea-bocelli"]],
    isFeatured: false,
    isPopular: true,
    seoTitle: "Andrea Bocelli Live in Egypt | Romanza 30th Anniversary",
    seoDescription:
      "Experience Andrea Bocelli live at City of Arts & Culture, New Capital — a night of passion, elegance, and musical magic.",
    curatedPackage: {
      title: "Andrea Bocelli VIP Experience",
      description:
        "VIP seating options, private transfers, and post-concert dining reservations.",
      inclusions: ["VIP tickets", "Private transfers", "Dining reservations"],
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
    displayDate: "March 10, 2026",
    time: "19:30",
    lineup: ["Tannoura Troupe"],
    ticketUrl: "https://tickets.example.com/tannoura",
    heroImage: EVENT_IMAGES["al-tannoura-show"] ?? "/images/placeholder.jpg",
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
  {
    id: "evt_adam_port_citadel",
    slug: "adam-port-at-salah-el-din-citadel",
    title: "Keinmusik Adam Port",
    category: "Popular Events in Egypt",
    categories: ["Popular Events in Egypt", "International Music Festivals"],
    shortDescription: "Deep grooves beneath Cairo's ancient fortress walls.",
    fullDescription:
      "Adam Port takes over the iconic Citadel of Saladin for a night that blends history with sound like never before. Under the open sky, expect deep grooves, hypnotic rhythms, and the unmistakable Keinemusik atmosphere. This isn't just an event, it's a moment where music, culture, and legacy collide.",
    location: "Salah El Din Citadel",
    city: "Cairo, Egypt",
    date: "2026-05-22",
    displayDate: "May 22, 2026",
    time: "7:00 PM",
    duration: "6h",
    lineup: ["Adam Port"],
    ticketUrl: "https://www.ticketsmarche.com/event/8258",
    heroImage: EVENT_IMAGES["adam-port-at-salah-el-din-citadel"] ?? "/images/hero/luxury.jpg",
    galleryImages: [EVENT_IMAGES["adam-port-at-salah-el-din-citadel"] ?? "/images/hero/luxury.jpg"],
    isFeatured: true,
    isPopular: true,
    seoTitle: "Adam Port at Salah El Din Citadel | Cairo",
    seoDescription:
      "Adam Port performs at Cairo's historic Citadel. Book premium tickets and curated travel packages with Syren Egypt.",
    curatedPackage: {
      title: "Citadel Sound Experience",
      description:
        "Historic venue access, luxury hotel stay in Cairo, private transfers, and curated daytime exploration before the show.",
      inclusions: [
        "Premium hotel accommodation in Cairo",
        "Private airport transfers",
        "VIP event access",
        "Private Citadel tour by day",
        "Curated dining reservations"
      ],
      ctaLabel: "Book Adam Port Package",
    },
  },
  {
    id: "evt_black_coffee",
    slug: "black-coffee",
    title: "Black Coffee",
    category: "Popular Events in Egypt",
    categories: ["Popular Events in Egypt", "International Music Festivals"],
    shortDescription: "Afro-house royalty returns to the Mediterranean shore.",
    fullDescription:
      "Black Coffee returns to the North Coast on August 21st for a special night presented by P+US. Set by the sea, the night moves through his signature Afro-house sound, steady, emotional, and built for summer after dark. Following his last coast appearance, he returns for another summer night shaped by sound and atmosphere.",
    location: "Cubix North Coast",
    city: "North Coast, Egypt",
    date: "2026-08-21",
    displayDate: "August 21, 2026",
    time: "9:00 PM",
    duration: "6h",
    lineup: ["Black Coffee"],
    ticketUrl: "https://ticketegypt.venflare.com/events/d42c024a-96cd-447d-a666-b3f6ceff7055",
    heroImage: EVENT_IMAGES["black-coffee"] ?? "/images/hero/luxury.jpg",
    galleryImages: [EVENT_IMAGES["black-coffee"] ?? "/images/hero/luxury.jpg"],
    isFeatured: true,
    isPopular: true,
    seoTitle: "Black Coffee North Coast | Egypt 2026",
    seoDescription:
      "Black Coffee returns to Egypt's North Coast. Book VIP tickets and luxury travel packages with Syren's concierge service.",
    curatedPackage: {
      title: "Black Coffee Coastal Escape",
      description:
        "Boutique North Coast accommodation, private beach access, VIP event entry, and seamless transfers from Cairo.",
      inclusions: [
        "Luxury North Coast villa or hotel stay",
        "Private transfers from Cairo",
        "VIP beachfront event access",
        "Private beach club reservations",
        "Sunset dining experiences"
      ],
      ctaLabel: "Book Black Coffee Package",
    },
  },
  {
    id: "evt_solomun",
    slug: "solomun",
    title: "Solomun",
    category: "Popular Events in Egypt",
    categories: ["Popular Events in Egypt", "International Music Festivals"],
    shortDescription: "Melodic house meets Mediterranean nights.",
    fullDescription:
      "P+US presents Solomun this August 7th on the North Coast. Known for his signature long-format sets, he delivers an immersive journey through melodic house and techno. Guided by his 'Nobody Is Not Loved' ethos, the night unfolds as one collective experience by the sea.",
    location: "North Coast",
    city: "North Coast, Egypt",
    date: "2026-08-07",
    displayDate: "August 7, 2026",
    time: "9:00 PM",
    duration: "8h",
    lineup: ["Solomun"],
    ticketUrl: "https://ticketegypt.venflare.com/events/0c14d788-830a-461e-b8c4-e39a3f5f02f6",
    heroImage: EVENT_IMAGES["solomun"] ?? "/images/hero/luxury.jpg",
    galleryImages: [EVENT_IMAGES["solomun"] ?? "/images/hero/luxury.jpg"],
    isFeatured: true,
    isPopular: true,
    seoTitle: "Solomun North Coast Egypt | August 2026",
    seoDescription:
      "Solomun brings his melodic house sound to Egypt's North Coast. Book curated travel packages and VIP access with Syren.",
    curatedPackage: {
      title: "Solomun Mediterranean Journey",
      description:
        "Exclusive North Coast stay, VIP event access, and curated coastal experiences for an unforgettable summer night.",
      inclusions: [
        "Boutique North Coast accommodation",
        "Private transfers from Cairo",
        "VIP festival access",
        "Beachfront dining reservations",
        "Sunset yacht cruise"
      ],
      ctaLabel: "Book Solomun Package",
    },
  },
  {
    id: "evt_naika",
    slug: "naika",
    title: "Naïka",
    category: "Popular Events in Egypt",
    categories: ["Popular Events in Egypt", "International Music Festivals"],
    shortDescription: "French-Haitian rising star debuts on the Red Sea.",
    fullDescription:
      "Venture Lifestyle presents Naïka, making her El Gouna debut on May 29th at the Red Sea. The French-Haitian artist has built a sound of her own, weaving pop, R&B, and Afro-Caribbean influences into music shaped by a life lived across cultures. Known for her magnetic stage presence, Naïka has been impressing international stages and now, for the first time, she brings that energy to El Gouna.",
    location: "El Gouna",
    city: "El Gouna, Egypt",
    date: "2026-05-29",
    displayDate: "May 29, 2026",
    time: "5:00 PM",
    duration: "5h",
    lineup: ["Naïka"],
    ticketUrl: "https://ticketegypt.venflare.com/events/bc9770be-6ae7-49fe-ba7f-81197fa0755a",
    heroImage: EVENT_IMAGES["naika"] ?? "/images/hero/luxury.jpg",
    galleryImages: [EVENT_IMAGES["naika"] ?? "/images/hero/luxury.jpg"],
    isFeatured: false,
    isPopular: true,
    seoTitle: "Naïka El Gouna Debut | Red Sea Egypt",
    seoDescription:
      "French-Haitian artist Naïka debuts in El Gouna. Book travel packages with Syren for this Red Sea music experience.",
    curatedPackage: {
      title: "Naïka Red Sea Experience",
      description:
        "El Gouna waterfront stay, private marina transfers, sunset sailing, and VIP access to this exclusive debut performance.",
      inclusions: [
        "Luxury El Gouna hotel accommodation",
        "Private Hurghada airport transfers",
        "VIP event access",
        "Sunset sailing excursion",
        "Waterfront dining reservations"
      ],
      ctaLabel: "Book Naïka Package",
    },
  },
  {
    id: "evt_korolova",
    slug: "korolova",
    title: "Korolova",
    category: "Popular Events in Egypt",
    categories: ["Popular Events in Egypt", "International Music Festivals"],
    shortDescription: "Melodic techno rising star on the Red Sea.",
    fullDescription:
      "P+US presents Korolova on May 28 at El Gouna. A rising force in melodic techno and progressive house, she brings an electrifying, atmospheric sound shaped to connect on a deeper level. With global recognition, major label releases, and her own Captive Soul imprint, Korolova delivers a journey driven by emotion, energy, and momentum.",
    location: "El Gouna",
    city: "El Gouna, Egypt",
    date: "2026-05-28",
    displayDate: "May 28, 2026",
    time: "9:00 PM",
    duration: "6h",
    lineup: ["Korolova"],
    ticketUrl: "https://ticketegypt.venflare.com/events/ae5eb671-61c0-4d65-bbc8-8d1a8bd70388",
    heroImage: EVENT_IMAGES["korolova"] ?? "/images/hero/luxury.jpg",
    galleryImages: [EVENT_IMAGES["korolova"] ?? "/images/hero/luxury.jpg"],
    isFeatured: false,
    isPopular: true,
    seoTitle: "Korolova El Gouna | Melodic Techno Egypt",
    seoDescription:
      "Korolova brings melodic techno to El Gouna. Book curated travel packages and VIP event access with Syren Egypt.",
    curatedPackage: {
      title: "Korolova El Gouna Escape",
      description:
        "Waterfront El Gouna accommodation, private transfers, VIP event access, and curated Red Sea experiences.",
      inclusions: [
        "Boutique El Gouna hotel stay",
        "Private Hurghada airport transfers",
        "VIP event access",
        "Desert-to-sea excursion",
        "Exclusive dining reservations"
      ],
      ctaLabel: "Book Korolova Package",
    },
  },
];

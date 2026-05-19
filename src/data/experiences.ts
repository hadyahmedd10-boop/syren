import { Experience } from "@/types/experience";
import { EXPERIENCE_IMAGES } from "@/lib/images";
import { getItineraryDayImage } from "@/lib/getItineraryImages";

export const experiences: Experience[] = [
  {
    slug: "10-day-egypt-christmas-vacation",
    title: "10-Day Egypt Christmas Vacation",
    destinations: ["cairo", "luxor-aswan", "red-sea"],
    subtitle: "Cairo · 5‑Star Nile Cruise · Red Sea",
    duration: "10 Days / 9 Nights",
    cities: "Cairo, Aswan, Luxor, Hurghada",
    description: "Ten days through the soul of Egypt — Cairo, a 5-star Nile cruise from Aswan to Luxor, and the Red Sea at Hurghada. Timed for Christmas and New Year.",
    introduction:
      "There are holidays. And then there are the ones you spend the rest of your life talking about. Timed for Christmas or New Year: Cairo, a five-star Nile cruise from Aswan to Luxor, and the Red Sea at Hurghada.",
    heroImage: EXPERIENCE_IMAGES["10-day-egypt-christmas-vacation"],
    whatsappMessage: "I am interested in the 10-Day Egypt Christmas Vacation",
    highlights: [
      "5‑star Nile cruise from Aswan to Luxor",
      "Grand Egyptian Museum & Giza Pyramids",
      "Red Sea snorkeling and island day",
      "Desert safari with sunset Bedouin dinner",
    ],
    included: [
      "Meet and assist at arrival and departure",
      "Fast Track Service at Cairo International Airport",
      "Syren concierge support throughout the entire journey",
      "All transfers in air-conditioned vehicles with onboard WiFi",
      "3 nights hotel accommodation in Cairo with breakfast",
      "3 nights aboard a 5-star Nile cruise with full board",
      "3 nights hotel accommodation in Hurghada with breakfast",
      "All meals as specified in the daily itinerary",
      "Complimentary bottled water on all tours and road transfers",
      "Domestic flights: Cairo→Aswan and Hurghada→Cairo",
      "All Cairo tours as per itinerary (small group)",
      "Private guided sightseeing in Cairo",
      "Guided excursions during the Nile cruise (shared group)",
      "Admission tickets for all sites mentioned",
      "English-speaking guides and drivers throughout",
      "All service charges and taxes",
    ],
    notIncluded: [
      "International flights",
      "Egyptian entry visa",
      "Optional tours and activities not listed in the itinerary",
      "Personal expenses",
      "Gratuities",
    ],
    seoTitle: "10-Day Egypt Christmas Vacation | Group Nile Cruise | Syren",
    seoDescription:
      "Celebrate Christmas or New Year in Egypt with Syren's 10-day group tour. Cairo pyramids, 5-star Nile cruise from Aswan to Luxor, and Red Sea at Hurghada.",
    badge: "Group Tour",
    category: "nile-cruises",
    itinerary: [
      { day: 1, title: "Arrival in Cairo", description: "Airport fast track. Private transfer to your hotel. Itinerary review with your Syren concierge.", meals: "Welcome Drink", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 1) },
      { day: 2, title: "The Pyramids & The Grand Egyptian Museum", description: "Giza Plateau — Great Pyramids and Sphinx — plus the new Grand Egyptian Museum.", meals: "Breakfast, Lunch", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 2) },
      { day: 3, title: "Fly to Aswan — Board Your Nile Cruise — Philae Temple", description: "Flight to Aswan. Embark your 5‑star cruise. Visit the Unfinished Obelisk and Philae Temple.", meals: "Breakfast, Lunch, Dinner", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 3) },
      { day: 4, title: "Kom Ombo, Crocodile Museum & Edfu Temple", description: "Sail to Kom Ombo and Edfu — two of the Nile's most striking temples.", meals: "Breakfast, Lunch, Afternoon Tea, Dinner", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 4) },
      { day: 5, title: "Valley of the Kings, Hatshepsut & Colossi", description: "Luxor West Bank: royal tombs, the terraces of Hatshepsut, and Memnon statues.", meals: "Breakfast, Lunch, Dinner", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 5) },
      { day: 6, title: "Karnak, Luxor Temple & Transfer to Hurghada", description: "Karnak and Luxor temples. Private drive across the desert to the Red Sea.", meals: "Breakfast", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 6) },
      { day: 7, title: "The Red Sea by Boat", description: "Snorkeling cruise to coral reefs and island stop. Lunch on board.", meals: "Breakfast, Lunch", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 7) },
      { day: 8, title: "Desert Safari, Sunset BBQ & Bedouin Evening", description: "Camel ride, sunset BBQ and Bedouin show under the stars.", meals: "Breakfast, Dinner", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 8) },
      { day: 9, title: "Return to Cairo", description: "Morning flight to Cairo. Hotel check‑in and evening at leisure.", meals: "Breakfast", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 9) },
      { day: 10, title: "Departure", description: "Private transfer to Cairo International Airport. Farewell from the Syren team.", meals: "Breakfast", image: getItineraryDayImage("10-day-egypt-christmas-vacation", 10) },
    ],
  },
  {
    slug: "5-day-cairo-experience",
    title: "5-Day Cairo Experience",
    destinations: ["cairo"],
    subtitle: "Ancient Wonders & Timeless Culture",
    duration: "5 Days / 4 Nights",
    cities: "Cairo",
    description: "A deep cultural journey through Egypt’s ancient landmarks, museums, and historic neighborhoods — designed for comfort, insight, and authentic discovery.",
    introduction: "Cairo is more than a city; it is a living chronicle of human civilization. Our 5-day curated experience invites you to step beyond the veil of time, offering exclusive access to the monuments and moments that have shaped the world, all while enveloped in the refined comfort of modern luxury.",
    heroImage: EXPERIENCE_IMAGES["5-day-cairo-experience"],
    whatsappMessage: "I am interested in the 5-Day Cairo Experience",
    highlights: [
      "After-hours private access to the Grand Egyptian Museum",
      "Sunrise meditation at the Great Pyramid of Giza",
      "Exclusive guided tour of the Sphinx enclosure",
      "Artisan-led exploration of Islamic Cairo's hidden workshops",
      "Private Felucca sunset sail on the Nile"
    ],
    included: [
      "Private guided tours with expert Egyptologists",
      "4 nights luxury accommodation in Cairo",
      "All airport transfers in private A/C vehicles",
      "Select meals as specified in the itinerary",
      "24/7 dedicated local support & concierge",
      "Entry fees to all mentioned historical sites"
    ],
    notIncluded: [
      "International airfare",
      "Entry visa to Egypt",
      "Personal expenses and gratuities",
      "Optional activities and spa treatments"
    ],
    price: {
      amount: 800,
      currency: "USD",
      perPerson: true
    },
    category: "cultural",
    itinerary: [
      {
        day: 1,
        title: "Arrival & The Grand Egyptian Museum",
        description: "Arrive at Cairo International Airport where your private host awaits. After a seamless VIP entry, transfer to your luxury residence overlooking the Nile. In the afternoon, enjoy a private, after-hours preview of the Grand Egyptian Museum, followed by a welcome dinner featuring contemporary Egyptian cuisine.",
        meals: "Dinner",
        image: getItineraryDayImage("5-day-cairo-experience", 1)
      },
      {
        day: 2,
        title: "Giza Plateau & The Sphinx",
        description: "Experience the Great Pyramids like never before. Start with a sunrise meditation at the base of Khufu's pyramid, followed by exclusive access to the Sphinx enclosure. Enjoy a gourmet picnic lunch on the plateau before exploring the Solar Boat Museum. The evening is yours to relax or enjoy a private jazz performance.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("5-day-cairo-experience", 2)
      },
      {
        day: 3,
        title: "Islamic Cairo & Hidden Alleys",
        description: "Dive into the heart of historic Cairo. Visit the Citadel of Saladin and the Mosque of Muhammad Ali. Wander through the enchanting Khan el-Khalili bazaar with a local artisan who will guide you to hidden workshops and secret rooftop tea houses. Dinner is served in a restored 19th-century mansion.",
        meals: "Breakfast, Dinner",
        image: getItineraryDayImage("5-day-cairo-experience", 3)
      },
      {
        day: 4,
        title: "Coptic Heritage & The Nile at Sunset",
        description: "Explore the serene atmosphere of Old Cairo, including the Hanging Church and the Ben Ezra Synagogue. After a light lunch, board a private, traditionally-styled Felucca for a sunset sail on the Nile. Sip on local hibiscus tea as the city lights begin to flicker against the twilight sky.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("5-day-cairo-experience", 4)
      },
      {
        day: 5,
        title: "Modern Cairo & Departure",
        description: "Spend your final morning exploring the sophisticated boutiques and galleries of Zamalek. Enjoy a farewell brunch at a riverside garden before your private chauffeur transfers you to the airport for your departure, leaving with memories that will last a lifetime.",
        meals: "Breakfast, Brunch",
        image: getItineraryDayImage("5-day-cairo-experience", 5)
      }
    ]
  },
  {
    slug: "10-day-cairo-nile-red-sea-odyssey",
    title: "10-Day Cairo, Nile & Red Sea Odyssey",
    destinations: ["cairo", "luxor-aswan", "red-sea"],
    subtitle: "From the Pyramids to the Turquoise Coast",
    duration: "10 Days / 9 Nights",
    cities: "Cairo, Aswan, Luxor, Hurghada",
    description: "A comprehensive 10-day journey across Egypt's most iconic landscapes - from the ancient majesty of Cairo and the Nile to the sun-drenched shores of the Red Sea.",
    introduction: "Egypt is a land of contrasts, where the echoes of ancient civilizations meet the serene beauty of the coast. This 10-day odyssey is thoughtfully designed to offer a complete immersion into the heart of Egypt. You will stand before the Great Pyramids, sail the timeless Nile, explore the legendary temples of the south, and finally, find sanctuary on the crystalline shores of Hurghada. Every detail, from the VIP meet-and-greet to the private transfers, is handled with the care and soul that defines Syren.",
    heroImage: EXPERIENCE_IMAGES["10-day-cairo-nile-red-sea-odyssey"],
    whatsappMessage: "I am interested in the 10-Day Cairo, Nile & Red Sea Odyssey",
    highlights: [
      "Full spectrum of Egypt: History, Nile, and Red Sea",
      "Overnight sleeper train experience for authentic travel",
      "Breathtaking mountain temples of Abu Simbel",
      "3 days of pure relaxation on Hurghada's turquoise coast",
      "Comprehensive private logistics for a stress-free journey"
    ],
    included: [
      "Personal meet & greet at Cairo International Airport",
      "9 nights accommodation in luxury & 5-star hotels",
      "All transfers in private, air-conditioned vehicles",
      "Overnight sleeper train from Cairo to Aswan (Dinner & Breakfast included)",
      "Private guided tours with expert Egyptologists",
      "Entrance fees to all mentioned historical sites",
      "Domestic travel from Hurghada to Cairo",
      "24/7 dedicated local support & concierge"
    ],
    notIncluded: [
      "International airfare",
      "Entry visa to Egypt",
      "Optional activities in Hurghada (Snorkeling, Sailing, etc.)",
      "Personal expenses and gratuities"
    ],
    price: {
      amount: 2125,
      currency: "USD",
      perPerson: true
    },
    category: "adventure",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cairo",
        description: "Your journey begins with a seamless arrival. Our team will meet you at the airport, assist with luggage, and transfer you to your hotel. After an uneventful check-in, enjoy a complimentary welcome drink while we discuss your upcoming itinerary. The rest of the day is yours to relax and prepare for the adventure ahead.",
        meals: "Welcome Drink",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 1)
      },
      {
        day: 2,
        title: "The Giza Plateau & Sleeper Train",
        description: "Begin with the Giza Plateau, home to the Great Pyramids and the Sphinx. After an authentic Egyptian lunch, explore the New Grand Egyptian Museum in a special preview experience. As evening falls, board your overnight sleeper train to Aswan, enjoying dinner as the landscapes of the Nile valley pass by.",
        meals: "Breakfast, Lunch, Dinner",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 2)
      },
      {
        day: 3,
        title: "Aswan's Ancient Treasures",
        description: "Arrive in Aswan and dive straight into history at the Unfinished Obelisk, the largest piece of stonework ever constructed. Continue to the romantic Temple of Philae, dedicated to the goddess Isis. Spend the night in Aswan, soaking in the serene atmosphere of the Nile's most beautiful city.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 3)
      },
      {
        day: 4,
        title: "The Majesty of Abu Simbel",
        description: "A private 3.5-hour drive brings you to the breathtaking Temples of Abu Simbel. Stand in awe before the massive statues of Ramses II and Nefertari, carved directly into the mountain. Return to Aswan in the afternoon for another comfortable evening by the water.",
        meals: "Breakfast",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 4)
      },
      {
        day: 5,
        title: "The Valley of the Kings",
        description: "Journey to Luxor, the world's greatest open-air museum. Explore the notorious Valley of the Kings, the Temple of Hatshepsut, and the Colossi of Memnon. Each site tells a story of power, faith, and the eternal quest for immortality. Transfer to your Luxor hotel for the night.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 5)
      },
      {
        day: 6,
        title: "Karnak, Luxor & The Red Sea",
        description: "Discover the immense Karnak Temple Complex and the elegant Luxor Temple. After your final exploration of the south, we drive you in a private vehicle to Hurghada. Arrive at your coastal resort and settle in for a well-deserved escape to the Red Sea.",
        meals: "Breakfast",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 6)
      },
      {
        day: 7,
        title: "Red Sea Relaxation",
        description: "A free day in Hurghada to nourish your mind, body, and soul. Relax at the resort, swim in the turquoise waters of the Red Sea, or choose from optional activities like snorkeling or windsurfing. The day is entirely yours.",
        meals: "Breakfast",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 7)
      },
      {
        day: 8,
        title: "Sun, Sand & Sailing",
        description: "Another day of coastal bliss. Take advantage of Hurghada's world-class sailing or deep-sea fishing, or simply enjoy the refined amenities of your resort. Another evening to watch the sun set over the crystalline horizon.",
        meals: "Breakfast",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 8)
      },
      {
        day: 9,
        title: "Return to Cairo",
        description: "After a final breakfast by the sea, transfer back to Cairo. Enjoy some free time in the capital before your last night in a luxury hotel. Reflect on your journey through the heart of Egypt as the city lights begin to flicker.",
        meals: "Breakfast",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 9)
      },
      {
        day: 10,
        title: "Farewell Egypt",
        description: "Wake up to a final 5-star breakfast before your private transfer to Cairo International Airport. Our staff will assist you with your luggage as you bid farewell to the land of the Pharaohs, taking with you memories that will last a lifetime.",
        meals: "Breakfast",
        image: getItineraryDayImage("10-day-cairo-nile-red-sea-odyssey", 10)
      }
    ]
  },
  {
    slug: "12-day-egyptian-honeymoon-odyssey",
    title: "12-Day Egyptian Honeymoon Odyssey",
    destinations: ["cairo", "luxor-aswan", "red-sea"],
    subtitle: "Romance, History & The Red Sea",
    duration: "12 Days / 11 Nights",
    cities: "Cairo, Aswan, Nile Cruise, Luxor, Hurghada",
    description: "An enchanting 12-day honeymoon blending the ancient wonders of Cairo and the Nile with the romantic serenity of the Red Sea.",
    introduction: "Your love story deserves a backdrop as timeless as the pyramids and as beautiful as the Red Sea. This 12-day odyssey is crafted for couples seeking the perfect balance of adventure, history, and absolute luxury. From private candlelit dinners in the shadow of ancient temples to sunset cruises on the Nile and days of pure relaxation in Hurghada, every moment is designed to be unforgettable.",
    heroImage: EXPERIENCE_IMAGES["12-day-egyptian-honeymoon-odyssey"],
    whatsappMessage: "I am interested in the 12-Day Egyptian Honeymoon Odyssey",
    highlights: [
      "Private candlelit dinner at the foot of the Giza Pyramids",
      "Romantic sunset Felucca cruise with private musician",
      "Exclusive hot air balloon ride over the Valley of the Kings",
      "Couples' spa treatments and private beach dinners in Hurghada",
      "Luxury suite upgrades throughout the entire journey"
    ],
    included: [
      "9 nights in luxury hotels & 2 nights on a private Dahabiya",
      "All domestic flights and private luxury transfers",
      "Special honeymoon amenities and surprises",
      "Private Egyptologist for all historical site visits",
      "Select romantic dining experiences",
      "24/7 dedicated concierge service"
    ],
    notIncluded: [
      "International airfare",
      "Entry visa to Egypt",
      "Personal shopping and gratuities",
      "Optional excursions not mentioned"
    ],
    price: {
      amount: 2490,
      currency: "USD",
      perPerson: true
    },
    category: "luxury",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cairo",
        description: "Welcome to Egypt. Private VIP transfer to your luxury hotel overlooking the Nile. Enjoy a special welcome amenity and evening at leisure.",
        meals: "Welcome Drink",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 1)
      },
      {
        day: 2,
        title: "Pyramids & Romantic Dinner",
        description: "Explore the Giza Plateau by day. As evening falls, enjoy an exclusive, private dinner with the Pyramids as your backdrop.",
        meals: "Breakfast, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 2)
      },
      {
        day: 3,
        title: "Cairo's Hidden Gems",
        description: "Visit the Grand Egyptian Museum and the charming streets of Old Cairo. Afternoon tea at a historic mansion.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 3)
      },
      {
        day: 4,
        title: "Fly to Aswan & Embarkation",
        description: "Fly to Aswan and board your private Dahabiya. Afternoon visit to the romantic Temple of Philae.",
        meals: "Breakfast, Lunch, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 4)
      },
      {
        day: 5,
        title: "Sailing the Nile",
        description: "A day of pure romance and relaxation as you sail north. Enjoy the changing landscapes from the deck.",
        meals: "Breakfast, Lunch, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 5)
      },
      {
        day: 6,
        title: "Temples & Sunset",
        description: "Visit the temples of Kom Ombo and Edfu. A private dinner on a river island under the stars.",
        meals: "Breakfast, Lunch, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 6)
      },
      {
        day: 7,
        title: "Arrival in Luxor",
        description: "Arrive in Luxor. Afternoon visit to the illuminated Luxor Temple followed by a private cocktail hour.",
        meals: "Breakfast, Lunch, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 7)
      },
      {
        day: 8,
        title: "Sunrise over the Valley",
        description: "Private hot air balloon ride at sunrise followed by exploration of the Valley of the Kings.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 8)
      },
      {
        day: 9,
        title: "Fly to Hurghada",
        description: "Transfer to the Red Sea. Settle into your luxury coastal suite with private pool.",
        meals: "Breakfast, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 9)
      },
      {
        day: 10,
        title: "Red Sea Bliss",
        description: "A day for relaxation. Enjoy a couples' spa treatment and a private sunset cruise.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 10)
      },
      {
        day: 11,
        title: "Private Beach Day",
        description: "Enjoy a private cabana on the beach. Farewell beach dinner with live music.",
        meals: "Breakfast, Dinner",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 11)
      },
      {
        day: 12,
        title: "Farewell Egypt",
        description: "Final breakfast before your private transfer to the airport for your departure.",
        meals: "Breakfast",
        image: getItineraryDayImage("12-day-egyptian-honeymoon-odyssey", 12)
      }
    ]
  },
  {
    slug: "family-adventure",
    title: "The Pharaoh's Quest Family Adventure",
    destinations: ["cairo", "luxor-aswan"],
    subtitle: "History Brought to Life for All Ages",
    duration: "7 Days / 6 Nights",
    cities: "Cairo, Luxor",
    description: "A fun and engaging journey through Ancient Egypt designed specifically for families with children, featuring interactive treasure hunts and hands-on workshops.",
    introduction: "Imagine your children's eyes lighting up as they solve riddles at the Great Pyramid or learn the secrets of mummification in a hands-on workshop. This family-focused odyssey combines the wonders of Egypt with engaging activities that make history come alive for explorers of all ages.",
    heroImage: EXPERIENCE_IMAGES["family-adventure"],
    whatsappMessage: "I am interested in the Family Adventure experience",
    highlights: [
      "Pyramid Treasure Hunt with a junior Egyptologist",
      "Hands-on Papyrus making workshop",
      "Private family felucca sail with traditional music",
      "Donkey ride through the Luxor West Bank villages",
      "Visit to the animal-focused 'Animalia' center in Aswan"
    ],
    included: [
      "Family-friendly private guides",
      "Interactive activity kits for children",
      "6 nights in family-suite accommodations",
      "All internal flights and transfers",
      "Most meals and kid-friendly snacks"
    ],
    notIncluded: [
      "International flights",
      "Visas",
      "Personal expenses"
    ],
    price: {
      amount: 2950,
      currency: "USD",
      perPerson: true
    },
    category: "adventure",
    itinerary: [
      {
        day: 1,
        title: "Welcome to the Land of Wonders",
        description: "Arrive in Cairo and transfer to your hotel. Welcome briefing with your family host and distribution of the 'Pharaoh's Quest' explorer kits.",
        meals: "Dinner",
        image: getItineraryDayImage("family-adventure", 1)
      },
      {
        day: 2,
        title: "The Pyramid Treasure Hunt",
        description: "A morning of discovery at the Giza Plateau. Kids follow clues to find hidden 'treasures' while parents enjoy the majesty of the pyramids.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("family-adventure", 2)
      },
      {
        day: 3,
        title: "Artisans & Hieroglyphs",
        description: "Learn how to write your name in hieroglyphs and create your own papyrus at a traditional workshop. Afternoon visit to the Egyptian Museum.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("family-adventure", 3)
      },
      {
        day: 4,
        title: "Flight to Luxor & River Life",
        description: "Fly to Luxor. Board a private felucca for a sunset sail. Learn traditional Nubian songs and enjoy a BBQ dinner on the riverbank.",
        meals: "Breakfast, Dinner",
        image: getItineraryDayImage("family-adventure", 4)
      },
      {
        day: 5,
        title: "The Valley of the Kings & Donkeys",
        description: "Explore the West Bank tombs followed by a fun donkey ride through the local farming villages to see rural Egyptian life.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("family-adventure", 5)
      },
      {
        day: 6,
        title: "Karnak Temple & Farewell Games",
        description: "Visit the massive Karnak Temple. Afternoon free for pool time or a final family scavenger hunt in the hotel gardens.",
        meals: "Breakfast, Lunch",
        image: getItineraryDayImage("family-adventure", 6)
      },
      {
        day: 7,
        title: "Departure",
        description: "Final family breakfast before transfer to Luxor airport for your flight home.",
        meals: "Breakfast",
        image: getItineraryDayImage("family-adventure", 7)
      }
    ]
  },
  {
    id: "exit-pyramids-2026",
    slug: "exit-at-the-pyramids",
    title: "Exit at the Pyramids",
    category: "festival-experiences",
    badge: "Festival Package",
    description: "10 nights around Exit Festival at the Pyramids of Giza — old Cairo by night, a Fayoum desert overnight, four days at the festival, then the Red Sea at Hurghada.",
    introduction: "Some festivals happen in fields. Some happen in warehouses. And then there is Exit — happening at the foot of the Great Pyramids of Giza, one of the most extraordinary stages ever built by accident of history. This is Syren's curated 10-night journey around it. We begin in old Cairo after dark, disappear into the Fayoum desert for a night under the stars, spend four days at the festival itself, then decompress on the Red Sea with a boat party, open water, and a farewell dinner as the sun goes down over Hurghada. Egypt in October. Exit at the Pyramids. This is the trip.",
    shortDescription: "10 nights around Exit Festival at the Pyramids of Giza — old Cairo by night, a Fayoum desert overnight, four days at the festival, then the Red Sea at Hurghada.",
    fullDescription: "Some festivals happen in fields. Some happen in warehouses. And then there is Exit — happening at the foot of the Great Pyramids of Giza, one of the most extraordinary stages ever built by accident of history. This is Syren's curated 10-night journey around it. We begin in old Cairo after dark, disappear into the Fayoum desert for a night under the stars, spend four days at the festival itself, then decompress on the Red Sea with a boat party, open water, and a farewell dinner as the sun goes down over Hurghada. Egypt in October. Exit at the Pyramids. This is the trip.",
    destinations: ["cairo", "fayoum", "giza", "hurghada"],
    cities: "Cairo, Fayoum, Giza, Hurghada",
    duration: "10 Nights / 11 Days",
    groupSize: "Small Group",
    minAge: "21+",
    heroImage: EXPERIENCE_IMAGES["exit-at-the-pyramids"],
    galleryImages: [],
    isFeatured: true,
    isPopular: true,
    price: { from: 0, currency: "USD", label: "Price on request" },
    seoTitle: "Exit Festival Egypt Package 2026 | Syren Travel",
    seoDescription: "Syren's 10-night Exit Festival package — Cairo by night, Fayoum desert, 4 days at Exit at the Pyramids of Giza, and the Red Sea at Hurghada. October 2026.",
    whatsappMessage: "I am interested in the Exit at the Pyramids experience",
    highlights: [
      "Exit Festival at the Pyramids of Giza",
      "Old Cairo by night and Khan el-Khalili",
      "Fayoum desert overnight with Bedouin camp",
      "Private boat party and snorkeling in Hurghada",
    ],
    itinerary: [
      {
        day: 1,
        title: "Old Cairo Nights",
        description: "Arrival and private transfer. As the sun sets, we explore the lanterns of Khan el-Khalili and the hidden alleys of Al-Muizz Street — far from the tourist crowds.",
        tag: "Cairo",
        meals: [],
        location: "Cairo"
      },
      {
        day: 2,
        title: "Desert & Bedouin Soul",
        description: "A journey to the salt lakes of Wadi El-Rayan. Experience authentic Bedouin life: bonfire tea and traditional Mandi slow-roasted in the sand.",
        tag: "Fayoum",
        meals: ["Lunch", "Dinner"],
        location: "Fayoum"
      },
      {
        day: 3,
        title: "The Convergence",
        description: "The Pyramids meet Exit Festival. 4,000 years of history paired with a world-class electronic lineup on the same horizon.",
        tag: "Exit Festival",
        meals: [],
        location: "Giza"
      },
      {
        day: 4,
        title: "High Energy",
        description: "Full-immersion festival days. We handle the access; you enjoy the music.",
        tag: "Exit Festival",
        meals: [],
        location: "Giza"
      },
      {
        day: 5,
        title: "High Energy",
        description: "Full-immersion festival days. We handle the access; you enjoy the music.",
        tag: "Exit Festival",
        meals: [],
        location: "Giza"
      },
      {
        day: 6,
        title: "The Finale",
        description: "The final festival night. Always the most unforgettable.",
        tag: "Exit Festival",
        meals: [],
        location: "Giza"
      },
      {
        day: 7,
        title: "The Red Sea Crossing",
        description: "A cinematic 4.5-hour drive through the Eastern Desert to Hurghada. Evening exploration of the Marina and city pulse.",
        tag: "Transit",
        meals: [],
        location: "Hurghada"
      },
      {
        day: 8,
        title: "The Private Horizon",
        description: "A full day on a private boat. Snorkel untouched coral gardens by morning; private DJ, BBQ, and open-water party by afternoon.",
        tag: "Red Sea",
        meals: ["Lunch"],
        location: "Hurghada"
      },
      {
        day: 9,
        title: "The Slow Down",
        description: "A day for the beach or pool at your own pace. We gather for a curated farewell dinner in the evening.",
        tag: "Hurghada",
        meals: ["Dinner"],
        location: "Hurghada"
      },
      {
        day: 10,
        title: "Departure",
        description: "Final desert drive to Cairo for your airport drop-off.",
        tag: "Return",
        meals: [],
        location: "Cairo"
      }
    ],
    included: [
      "Airport pickup and all transfers throughout the journey",
      "9 nights hotel accommodation (Cairo, Fayoum camp, Hurghada)",
      "1 night Bedouin desert camp in Fayoum with full board",
      "Exit Festival access for 4 days",
      "Private boat charter in Hurghada with BBQ lunch and open bar",
      "Giftun Island snorkeling stop",
      "All activities listed in the itinerary",
      "English-speaking guide and driver throughout",
      "24/7 Syren concierge support"
    ],
    notIncluded: [
      "International flights",
      "Egyptian entry visa",
      "Personal expenses",
      "Gratuities",
      "Festival tickets (available to add on — ask your concierge)"
    ],
    curatedPackage: {
      title: "Exit at the Pyramids — Syren Package",
      description: "10 nights. Cairo, Fayoum, Exit Festival, and the Red Sea. Everything handled.",
      inclusions: ["Airport transfers", "All accommodation", "Festival access", "Boat party", "24/7 concierge"],
      ctaLabel: "Reserve Your Spot"
    }
  },
  {
    slug: "5-day-nile-cruise",
    title: "5-Day Nile Cruise",
    destinations: ["luxor-aswan"],
    subtitle: "Luxor to Aswan · Classic Nile Journey",
    duration: "5 Days / 4 Nights",
    cities: "Luxor, Esna, Edfu, Kom Ombo, Aswan",
    description: "Sail through the heart of Egypt on a carefully curated 5-day Nile cruise experience aboard a luxurious 5-star river cruise — temples, timeless culture, and the unhurried rhythm of the Nile.",
    introduction: "Sail through the heart of Egypt on a carefully curated 5-day Nile cruise experience aboard a luxurious 5-star river cruise. Enjoy elegant cabins, refined dining, and exceptional service while discovering some of Egypt's most iconic ancient sites along the Nile. From the temples of Luxor to the timeless beauty of Edfu, Kom Ombo, and Aswan, each stop offers a deeper connection to Egypt's history, culture, and atmosphere — all experienced at a slower, more immersive pace. Designed for travelers who value comfort, authenticity, and meaningful experiences, this journey is more than a cruise. It's a different way to experience Egypt.",
    heroImage: EXPERIENCE_IMAGES["5-day-nile-cruise"],
    whatsappMessage: "I am interested in the 5-Day Nile Cruise",
    badge: "Small Group Tour",
    groupSize: "Small Group",
    highlights: [
      "Small Group Tour — intimate and personal",
      "English-speaking certified Egyptologist guide",
      "Departures every Monday",
      "Karnak Temple Complex and Luxor Temple on the East Bank",
      "Valley of the Kings and Temple of Hatshepsut",
      "Perfectly preserved Temple of Edfu",
      "Riverside Temple of Kom Ombo, dedicated to two ancient gods",
      "Philae Temple on an island in the Nile at Aswan",
    ],
    included: [
      "Meet and Greet Service – A Syren representative will meet you on arrival in Luxor and bid you farewell at departure from Aswan",
      "Full Personal Assistance – Our team is available throughout the cruise to ensure everything runs smoothly",
      "All Transfers – Included in modern, air-conditioned vehicles throughout",
      "Full Board – 4 nights full board and lodging aboard the Sonesta Saint George 5-star Nile cruise",
      "All Excursions – Every excursion listed in the itinerary is included in the tour price",
      "Entrance Fees – All site entrance fees are included, with no hidden costs",
      "English-Speaking Guide – A fully certified guide accompanies you on all excursions",
      "All Service Charges and Taxes – The price is fully inclusive; there are no hidden charges",
    ],
    notIncluded: [
      "Flights to Luxor / from Aswan",
      "Egyptian entry visa",
      "Personal expenses and gratuities",
      "Optional tours not listed in the itinerary",
    ],
    seoTitle: "5-Day Nile Cruise Luxor to Aswan | Syren Travel",
    seoDescription: "Sail from Luxor to Aswan on a 5-star Nile cruise with Syren. Valley of the Kings, Karnak, Edfu, Kom Ombo, and Philae Temple — all included.",
    category: "nile-cruises",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Luxor | Begin Your Nile Journey",
        description: "Your experience begins the moment you arrive in Luxor, where a Syren representative will welcome you and escort you privately to your 5-star Nile cruise. After check-in and lunch onboard, explore Luxor's East Bank — visiting the vast Karnak Temple Complex and the beautifully preserved Luxor Temple along the Nile. Return to the cruise for afternoon tea, dinner, and live entertainment before your first night on the water in Luxor.",
        meals: "Breakfast, Lunch, Afternoon Tea & Dinner",
        image: getItineraryDayImage("5-day-nile-cruise", 1),
      },
      {
        day: 2,
        title: "Valley of the Kings & Sailing to Esna",
        description: "After breakfast onboard, cross to Luxor's West Bank to discover Egypt's royal past. Explore the legendary Valley of the Kings, visit the striking Temple of Hatshepsut, and stop at the Colossi of Memnon before returning to the cruise. Lunch is served as the cruise sails toward Esna. Enjoy a relaxed afternoon on the Nile followed by dinner onboard. Overnight in Esna.",
        meals: "Breakfast, Lunch, Afternoon Tea & Dinner",
        image: getItineraryDayImage("5-day-nile-cruise", 2),
      },
      {
        day: 3,
        title: "Edfu & Kom Ombo",
        description: "Sail toward Edfu while breakfast is served onboard. Visit the Temple of Edfu, one of the best-preserved temples in Egypt, before continuing toward Kom Ombo. Explore the unique riverside Temple of Kom Ombo, dedicated to two ancient gods. Return to the cruise for dinner and an authentic Galabeya evening onboard. Overnight in Kom Ombo.",
        meals: "Breakfast, Lunch, Afternoon Tea & Dinner",
        image: getItineraryDayImage("5-day-nile-cruise", 3),
      },
      {
        day: 4,
        title: "Aswan & Philae Temple",
        description: "Arrive in Aswan, where a calmer side of Egypt begins to unfold. Today includes visits to the Aswan High Dam, the Unfinished Obelisk, and the breathtaking Philae Temple, beautifully set on an island in the Nile. Return to the cruise for lunch and a relaxed afternoon before enjoying a traditional Nubian evening onboard. Spend your final night on the Nile in Aswan.",
        meals: "Breakfast, Lunch, Afternoon Tea & Dinner",
        image: getItineraryDayImage("5-day-nile-cruise", 4),
      },
      {
        day: 5,
        title: "Farewell to the Nile",
        description: "Enjoy a final breakfast onboard before check-out. Your Syren representative will escort you comfortably to Aswan Airport or the railway station for your onward journey.",
        meals: "Breakfast",
        image: getItineraryDayImage("5-day-nile-cruise", 5),
      },
    ],
  },
  {
    id: "exit-cairo-festival-hurghada-2026",
    slug: "exit-cairo-festival-hurghada",
    title: "Exit Festival — Cairo, Pyramids & Red Sea",
    category: "festival-experiences",
    badge: "Festival Package",
    description: "9 nights — two nights exploring Cairo, four nights at Exit Festival by the Pyramids, then three nights decompressing on the Red Sea at Hurghada.",
    introduction: "Egypt at its most complete. Two nights in Cairo — the old city after dark and the world's greatest museum by day. Four nights at Exit Festival with the Pyramids as your backdrop. Then three nights on the Red Sea to decompress properly. Cairo, Exit at the Pyramids, Hurghada. Everything handled.",
    shortDescription: "9 nights — two nights exploring Cairo, four nights at Exit Festival by the Pyramids, then three nights decompressing on the Red Sea at Hurghada.",
    fullDescription: "Egypt at its most complete. Two nights in Cairo — the old city after dark and the world's greatest museum by day. Four nights at Exit Festival with the Pyramids as your backdrop. Then three nights on the Red Sea to decompress properly. Cairo, Exit at the Pyramids, Hurghada. Everything handled.",
    destinations: ["cairo", "giza", "hurghada"],
    duration: "9 Nights / 10 Days",
    cities: "Cairo, Giza, Hurghada",
    groupSize: "Small Group",
    minAge: "21+",
    heroImage: EXPERIENCE_IMAGES["cairo-after-dark"],
    galleryImages: [],
    isFeatured: true,
    isPopular: true,
    price: { from: 0, currency: "USD", label: "Price on request" },
    seoTitle: "Exit Festival Cairo & Red Sea Package 2026 | Syren",
    seoDescription: "Syren's 9-night Exit Festival package — 2 nights Cairo, 4 nights Exit at the Pyramids, 3 nights Red Sea Hurghada. Private transfers, hotel, boat party. October 2026.",
    included: [
      "Airport pickup and all private transfers throughout",
      "2 nights hotel in Cairo with breakfast",
      "3 nights hotel in Giza with Pyramid view",
      "3 nights hotel in Hurghada with breakfast",
      "Private boat charter with BBQ lunch and open bar",
      "English-speaking guide throughout",
      "24/7 Syren concierge support",
    ],
    notIncluded: [
      "International flights",
      "Egyptian entry visa",
      "Grand Egyptian Museum admission tickets",
      "Exit Festival tickets (available as add-on — ask your concierge)",
      "Personal expenses",
      "Gratuities",
    ],
    curatedPackage: {
      title: "Cairo, Exit Festival & Red Sea — Syren Package",
      description: "Two nights Cairo, four nights at Exit by the Pyramids, three nights Red Sea. Everything handled.",
      inclusions: ["Airport transfers", "All hotels", "Boat party", "Private guide", "24/7 concierge"],
      ctaLabel: "Reserve This Package",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & Old Cairo by Night",
        description: "We meet you at the airport and take you straight into the old city as the evening light comes on. Khan el-Khalili by night, Al-Muizz Street, street food, mint tea, shisha somewhere the tourists haven't found yet. Cairo introduces itself on its own terms.",
        tag: "Cairo",
        location: "Cairo",
      },
      {
        day: 2,
        title: "The Grand Egyptian Museum",
        description: "The largest archaeological museum on earth. Over 100,000 artefacts including the complete treasures of Tutankhamun. Your private guide navigates it so you see what matters. The afternoon is yours — rooftop, old city, the Nile. Note: Museum admission tickets not included.",
        tag: "Culture",
        meals: "Breakfast",
        location: "Cairo",
      },
      {
        day: 3,
        title: "Festival Day 1",
        description: "Transfer to Giza. Check into your Pyramid-view hotel. As evening falls — the Pyramids light up and Exit begins.",
        tag: "Exit Festival",
        location: "Giza",
      },
      {
        day: 4,
        title: "Festival Day 2",
        description: "Full day at the festival. The Pyramids don't get smaller.",
        tag: "Exit Festival",
        location: "Giza",
      },
      {
        day: 5,
        title: "Festival Day 3",
        description: "Full day at the festival.",
        tag: "Exit Festival",
        location: "Giza",
      },
      {
        day: 6,
        title: "Festival Day 4 · Final Night",
        description: "The last night. Always the one people talk about most.",
        tag: "Exit Festival",
        location: "Giza",
      },
      {
        day: 7,
        title: "Cairo → Hurghada",
        description: "Morning departure through the Eastern Desert. Four and a half hours of dramatic landscape before the Red Sea appears. Check in, marina walk, seafood dinner as the water turns gold.",
        tag: "Transit",
        meals: "Dinner",
        location: "Hurghada",
      },
      {
        day: 8,
        title: "Boat Party · Live Music & BBQ",
        description: "Private boat, departs 10am. Giftun Island snorkel stop, live DJ set, BBQ lunch on deck, open bar, open water. Back to shore at sunset.",
        tag: "Red Sea",
        meals: "Lunch",
        location: "Hurghada",
      },
      {
        day: 9,
        title: "Beach & Farewell Dinner",
        description: "The day is yours. Beach, pool, whatever you need. In the evening the group comes together one last time — farewell dinner somewhere worth remembering.",
        tag: "Hurghada",
        meals: "Dinner",
        location: "Hurghada",
      },
      {
        day: 10,
        title: "Departure",
        description: "Hotel checkout. Transfer to Hurghada airport or drive back to Cairo — your choice. Egypt has had you for nine days.",
        tag: "Return",
        meals: "Breakfast",
        location: "Hurghada",
      },
    ],
  },
  {
    id: "exit-festival-only-2026",
    slug: "exit-festival-pyramids-only",
    title: "Exit Festival 4 Nights",
    category: "festival-experiences",
    badge: "Festival Essentials",
    description: "Four nights at Exit Festival by the Pyramids of Giza. Private transfers from Cairo airport, Pyramid-view hotel, and 24/7 Syren concierge. Nothing else to think about.",
    introduction: "Four nights. The festival. The Pyramids. Private transfers from and back to Cairo airport. A hotel room with a view that makes the alarm worth setting. This is Exit at the Pyramids stripped to its absolute essence — for those who know exactly why they are coming.",
    shortDescription: "Four nights at Exit Festival by the Pyramids of Giza. Private transfers from Cairo airport, Pyramid-view hotel, and 24/7 Syren concierge. Nothing else to think about.",
    fullDescription: "Four nights. The festival. The Pyramids. Private transfers from and back to Cairo airport. A hotel room with a view that makes the alarm worth setting. This is Exit at the Pyramids stripped to its absolute essence — for those who know exactly why they are coming.",
    destinations: ["giza"],
    duration: "4 Nights / 5 Days",
    cities: "Giza",
    groupSize: "Individual or Group",
    minAge: "21+",
    heroImage: EXPERIENCE_IMAGES["cairo-after-dark"],
    galleryImages: [],
    isFeatured: true,
    isPopular: true,
    price: { from: 0, currency: "USD", label: "Price on request" },
    seoTitle: "Exit Festival Hotel & Transfers Package 2026 | Syren",
    seoDescription: "Syren's Exit Festival essentials package — Pyramid-view hotel, private Cairo airport transfers, and 24/7 concierge for 4 nights at Exit at the Pyramids. October 2026.",
    included: [
      "Private airport transfer on arrival from Cairo airport",
      "Private airport transfer on departure to Cairo airport",
      "4 nights hotel accommodation with Pyramid view",
      "Breakfast daily",
      "24/7 Syren concierge support throughout your stay",
    ],
    notIncluded: [
      "International flights",
      "Egyptian entry visa",
      "Exit Festival tickets (available as add-on — ask your concierge)",
      "Meals beyond breakfast",
      "Personal expenses",
      "Gratuities",
    ],
    curatedPackage: {
      title: "Exit Festival Essentials — Syren Package",
      description: "Pyramid-view hotel, private airport transfers, and a concierge who handles everything else.",
      inclusions: ["Private airport transfers", "4 nights Pyramid-view hotel", "Daily breakfast", "24/7 concierge"],
      ctaLabel: "Reserve Festival Package",
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & Festival Day 1",
        description: "Private transfer from Cairo airport to your Pyramid-view hotel in Giza. Check in, get settled. As evening comes — Exit Festival begins with the Pyramids right there in front of you.",
        tag: "Arrival",
        location: "Giza",
      },
      {
        day: 2,
        title: "Festival Day 2",
        description: "Full day at the festival. The Pyramids are right there.",
        tag: "Exit Festival",
        meals: "Breakfast",
        location: "Giza",
      },
      {
        day: 3,
        title: "Festival Day 3",
        description: "Full day at the festival.",
        tag: "Exit Festival",
        meals: "Breakfast",
        location: "Giza",
      },
      {
        day: 4,
        title: "Festival Day 4 · Final Night",
        description: "The last night. Make it count.",
        tag: "Exit Festival",
        meals: "Breakfast",
        location: "Giza",
      },
      {
        day: 5,
        title: "Departure",
        description: "Hotel checkout. Private transfer back to Cairo airport. Simple as that.",
        tag: "Return",
        meals: "Breakfast",
        location: "Cairo",
      },
    ],
  },
];

/**
 * Vehicles — the single source of truth for the Syren private-transfer fleet.
 *
 * Every ride type keeps the existing small ("exterior") and main images under
 * public/images/transfers. Passenger and luggage figures match the published
 * fleet figures and drive the group-size selector.
 */

export interface Vehicle {
  id: string;
  name: string;
  /** Short marketing label, e.g. "Everyday Comfort". */
  badge: string;
  /** Vehicle class shown beside the name, e.g. "C-Class". */
  vehicleClass: string;
  passengers: number;
  bags: number;
  /** Representative models. */
  examples: string;
  description: string;
  idealFor: string;
  /** Exterior thumbnail. */
  smallImage: string;
  /** Main hero image. */
  mainImage: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "economy",
    name: "Economy",
    badge: "Everyday Comfort",
    vehicleClass: "C-Class",
    passengers: 3,
    bags: 3,
    examples: "Toyota Corolla, Hyundai Elantra and similar",
    description:
      "A comfortable, air-conditioned ride for individuals and couples, with a professional driver and dependable door-to-door service.",
    idealFor: "Solo travellers and couples seeking a practical, comfortable way to get around.",
    smallImage: "/images/transfers/economy.jpg",
    mainImage: "/images/transfers/economy-main.jpg",
  },
  {
    id: "comfort",
    name: "Comfort",
    badge: "Enhanced Comfort",
    vehicleClass: "D-Class",
    passengers: 3,
    bags: 3,
    examples: "Toyota Camry, Kia K5 and similar",
    description:
      "Extra space, better sound insulation, and a noticeably smoother ride. Well-suited for everyday travel and longer journeys between cities.",
    idealFor: "Travelers seeking enhanced comfort for extended drives.",
    smallImage: "/images/transfers/comfort.png",
    mainImage: "/images/transfers/comfort-main.png",
  },
  {
    id: "business",
    name: "Business",
    badge: "Executive Travel",
    vehicleClass: "E-Class",
    passengers: 3,
    bags: 3,
    examples: "Mercedes-Benz E-Class and similar",
    description:
      "A refined vehicle experience for executive travel. Our most requested option for VIP arrivals and special occasions.",
    idealFor: "VIP arrivals, business travel, and special occasions.",
    smallImage: "/images/transfers/business.jpg",
    mainImage: "/images/transfers/business-main.jpg",
  },
  {
    id: "suv",
    name: "SUV",
    badge: "Versatile Space",
    vehicleClass: "M-Class",
    passengers: 5,
    bags: 4,
    examples: "GMC Yukon, Chevrolet Suburban and similar",
    description:
      "Additional space and versatility for travellers and their luggage. A practical choice for longer journeys with more gear.",
    idealFor: "Travelers requiring extra space for luggage and equipment.",
    smallImage: "/images/transfers/suv.png",
    mainImage: "/images/transfers/suv-main.png",
  },
  {
    id: "minivan",
    name: "Minivan",
    badge: "Group Travel",
    vehicleClass: "M-Class",
    passengers: 6,
    bags: 6,
    examples: "Mercedes-Benz V-Class, Toyota Hiace and similar",
    description:
      "Flexible private transportation for small groups. Everyone rides together in comfort with ample space for passengers and luggage.",
    idealFor: "Families and groups traveling together.",
    smallImage: "/images/transfers/minivan.png",
    mainImage: "/images/transfers/minivan-main.png",
  },
  {
    id: "minibus",
    name: "Minibus",
    badge: "Coordinated Groups",
    vehicleClass: "M-Class",
    passengers: 14,
    bags: 10,
    examples: "Mercedes-Benz Sprinter and similar",
    description:
      "Group transportation with coordinated, private transfers. One vehicle for everyone, with a professional driver handling the journey.",
    idealFor: "Corporate trips, sightseeing tours, and performing groups.",
    smallImage: "/images/transfers/minibus.png",
    mainImage: "/images/transfers/minibus-main.png",
  },
];

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

/**
 * Vehicles that fit a given group size, using the published luggage figures:
 *   up to 3  → Economy / Comfort / Business
 *   4 to 5   → SUV
 *   6        → Minivan
 *   7 to 14  → Minibus
 * Anything larger returns an empty list so the caller can offer a bespoke quote.
 */
export function vehiclesForGroupSize(groupSize: number): Vehicle[] {
  const n = Math.max(1, Math.floor(groupSize));
  if (n <= 3) return vehicles.filter((v) => ["economy", "comfort", "business"].includes(v.id));
  if (n <= 5) return vehicles.filter((v) => v.id === "suv");
  if (n <= 6) return vehicles.filter((v) => v.id === "minivan");
  if (n <= 14) return vehicles.filter((v) => v.id === "minibus");
  return [];
}

/** The single recommended vehicle for a group size (first match), if any. */
export function suggestedVehicle(groupSize: number): Vehicle | undefined {
  return vehiclesForGroupSize(groupSize)[0];
}

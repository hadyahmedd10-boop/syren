"use client";

import { useState } from "react";
import { Users, Luggage } from "lucide-react";
import Image from "next/image";

// TODO: Replace with actual vehicle photos
const FALLBACK_IMAGE = "/images/hero/luxury.jpg";

const vehicles = [
  {
    id: "economy",
    name: "Economy",
    emoji: "🚗",
    image: "/images/transfers/economy.jpg",
    passengers: 3,
    luggage: 3,
    examples: "Toyota Corolla, Hyundai Elantra and similar",
    class: "C-Class",
    description: "The smart choice for solo travelers and couples. Clean, reliable, air-conditioned, and handled by a professional Syren driver.",
    ideal: "Airport transfers · City runs · Quick transfers",
    badge: null
  },
  {
    id: "comfort",
    name: "Comfort",
    emoji: "🚙",
    image: "/images/transfers/comfort.jpg",
    passengers: 3,
    luggage: 3,
    examples: "Toyota Camry, Kia K5 and similar",
    class: "D-Class",
    description: "Extra space, better sound insulation, and a noticeably smoother ride. Perfect for longer drives between cities or when you want to arrive relaxed.",
    ideal: "City transfers · Hurghada–Cairo road trip · Luxor runs",
    badge: null
  },
  {
    id: "business",
    name: "Business",
    emoji: "🏅",
    image: "/images/transfers/business.jpg",
    passengers: 3,
    luggage: 3,
    examples: "Mercedes-Benz E-Class and similar",
    class: "E-Class",
    description: "Premium and refined. When the journey is part of the experience. Our most requested vehicle for VIP arrivals, honeymoon transfers, and special occasions.",
    ideal: "VIP airport arrival · Honeymoon · Special occasions",
    badge: "Most Popular"
  },
  {
    id: "luxury",
    name: "Luxury",
    emoji: "⭐",
    image: "/images/transfers/luxury.jpg",
    passengers: 3,
    luggage: 3,
    examples: "Mercedes-Benz S-Class and similar",
    class: "F-Class",
    description: "For those who expect the very best. Executive-level comfort, impeccably presented. The right way to arrive at the Pyramids.",
    ideal: "First-class arrival · Corporate · Delegations",
    badge: null
  },
  {
    id: "minivan",
    name: "Minivan",
    emoji: "🚐",
    image: "/images/transfers/minivan.jpg",
    passengers: 6,
    luggage: 6,
    examples: "Mercedes-Benz V-Class, Toyota Hiace and similar",
    class: "M-Class",
    description: "Perfect for families, groups, and anyone traveling with extra luggage. Everyone rides together in comfort without compromise.",
    ideal: "Family travel · Groups · Festival transfers",
    badge: null
  },
  {
    id: "suv",
    name: "SUV",
    emoji: "🚙",
    image: "/images/transfers/suv.jpg",
    passengers: 5,
    luggage: 4,
    examples: "GMC Yukon, Chevrolet Suburban and similar",
    class: "M-Class",
    description: "Presentation and capability in one. The best choice for desert road trips, festival runs, and anyone who wants to arrive making a statement.",
    ideal: "Desert transfers · Festival groups · Road trips",
    badge: null
  },
  {
    id: "minibus",
    name: "Minibus",
    emoji: "🚌",
    image: "/images/transfers/minibus.jpg",
    passengers: 14,
    luggage: 10,
    examples: "Mercedes-Benz Sprinter and similar",
    class: "M-Class",
    description: "The ideal solution for large groups, corporate delegations, and event travel. One vehicle, everyone together, zero stress.",
    ideal: "Group tours · Corporate · Festival delegations",
    badge: null
  }
];

interface VehicleClassificationProps {
  compact?: boolean;
}

export default function VehicleClassification({ compact = false }: VehicleClassificationProps) {
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0]);

  if (compact) {
    return (
      <div className="mt-6">
        {/* Compact tab selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setActiveVehicle(vehicle)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all ${
                activeVehicle.id === vehicle.id
                  ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                  : "border-border text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="text-sm font-medium">{vehicle.name}</span>
            </button>
          ))}
        </div>

        {/* Compact vehicle summary */}
        <div className="mt-4 p-4 bg-surface rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold text-text-primary">{activeVehicle.name}</div>
                <div className="text-xs text-text-secondary">{activeVehicle.class}</div>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-accent-gold" />
                  <span>{activeVehicle.passengers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Luggage size={16} className="text-accent-gold" />
                  <span>{activeVehicle.luggage}</span>
                </div>
              </div>
            </div>
            <a
              href={`https://wa.me/201016015723?text=Hi Syren, I'd like to book a ${activeVehicle.name} transfer in Egypt`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-gold text-sm font-medium hover:underline"
            >
              Book →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container-x mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
            PRIVATE TRANSFERS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-3">
            Your Ride, Your Standard
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every Syren transfer is private — no shared shuttles, no strangers. Just your group, a professional driver, and the road.
          </p>
        </div>

        {/* Vehicle Tab Selector */}
        <div className="mb-8">
          <div className="flex gap-6 overflow-x-auto pb-4 border-b border-border scrollbar-hide snap-x">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setActiveVehicle(vehicle)}
                className={`relative flex-shrink-0 pb-3 px-2 transition-all snap-start ${
                  activeVehicle.id === vehicle.id
                    ? "text-accent-gold font-semibold border-b-2 border-accent-gold -mb-px"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {vehicle.badge && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-gold rounded-full" />
                )}
                <span className="flex items-center gap-2">
                  <span>{vehicle.emoji}</span>
                  <span>{vehicle.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Detail Panel */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Details */}
          <div className="md:w-[55%]">
            <h3 className="font-serif text-3xl text-text-primary mb-3">
              {activeVehicle.name}
            </h3>
            
            <div className="mb-4">
              <span className="inline-block text-xs border border-accent-gold/30 text-accent-gold px-3 py-1 rounded-full">
                {activeVehicle.class} · Vehicle not older than 5 years
              </span>
            </div>

            <div className="flex items-center gap-6 mb-4 text-accent-gold">
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span className="font-medium">{activeVehicle.passengers} passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <Luggage size={20} />
                <span className="font-medium">{activeVehicle.luggage} bags</span>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-4">
              {activeVehicle.description}
            </p>

            <p className="text-text-secondary italic text-sm mb-4">
              Ideal for: {activeVehicle.ideal}
            </p>

            <p className="text-text-secondary text-xs mb-6">
              e.g. {activeVehicle.examples}
            </p>

            {activeVehicle.badge && (
              <div className="mb-6">
                <span className="inline-flex items-center gap-1 text-xs text-accent-gold font-medium">
                  ★ {activeVehicle.badge}
                </span>
              </div>
            )}

            <a
              href={`https://wa.me/201016015723?text=Hi Syren, I'd like to book a ${activeVehicle.name} transfer in Egypt`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto bg-accent-gold text-black font-semibold px-8 py-3 rounded-full hover:bg-accent-gold/90 transition-all"
            >
              Book This Transfer →
            </a>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-[45%]">
            <div className="bg-surface rounded-2xl p-6 aspect-[16/9] flex items-center justify-center">
              <div className="relative w-full h-full opacity-0 transition-opacity duration-300" style={{ opacity: 1 }}>
                <Image
                  src={FALLBACK_IMAGE}
                  alt={activeVehicle.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

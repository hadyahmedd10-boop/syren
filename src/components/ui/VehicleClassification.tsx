"use client";

import { useState, useEffect } from "react";
import { Users, Luggage } from "lucide-react";
import Image from "next/image";

const vehicles = [
  {
    id: "economy",
    name: "Economy",
    badge: "Everyday Comfort",
    image: "/images/transfers/economy.jpg",
    mainImage: "/images/transfers/economy-main.jpg",
    model: "Toyota Corolla, Hyundai Elantra and similar",
    class: "C-Class",
    passengers: 3,
    luggage: 3,
    description: "A comfortable, air-conditioned ride for individuals and couples, with a professional driver and dependable door-to-door service.",
    idealFor: "Solo travellers and couples seeking a practical, comfortable way to get around."
  },
  {
    id: "comfort",
    name: "Comfort",
    badge: "Enhanced Comfort",
    image: "/images/transfers/comfort.png",
    mainImage: "/images/transfers/comfort-main.png",
    model: "Toyota Camry, Kia K5 and similar",
    class: "D-Class",
    passengers: 3,
    luggage: 3,
    description: "Extra space, better sound insulation, and a noticeably smoother ride. Well-suited for everyday travel and longer journeys between cities.",
    idealFor: "Travelers seeking enhanced comfort for extended drives."
  },
  {
    id: "business",
    name: "Business",
    badge: "Executive Travel",
    image: "/images/transfers/business.jpg",
    mainImage: "/images/transfers/business-main.jpg",
    model: "Mercedes-Benz E-Class and similar",
    class: "E-Class",
    passengers: 3,
    luggage: 3,
    description: "A refined vehicle experience for executive travel. Our most requested option for VIP arrivals and special occasions.",
    idealFor: "VIP arrivals, business travel, and special occasions."
  },
  {
    id: "minivan",
    name: "Minivan",
    badge: "Group Travel",
    image: "/images/transfers/minivan.png",
    mainImage: "/images/transfers/minivan-main.png",
    model: "Mercedes-Benz V-Class, Toyota Hiace and similar",
    class: "M-Class",
    passengers: 6,
    luggage: 6,
    description: "Flexible private transportation for small groups. Everyone rides together in comfort with ample space for passengers and luggage.",
    idealFor: "Families and groups traveling together."
  },
  {
    id: "suv",
    name: "SUV",
    badge: "Versatile Space",
    image: "/images/transfers/suv.png",
    mainImage: "/images/transfers/suv-main.png",
    model: "GMC Yukon, Chevrolet Suburban and similar",
    class: "M-Class",
    passengers: 5,
    luggage: 4,
    description: "Additional space and versatility for travellers and their luggage. A practical choice for longer journeys with more gear.",
    idealFor: "Travelers requiring extra space for luggage and equipment."
  },
  {
    id: "minibus",
    name: "Minibus",
    badge: "Coordinated Groups",
    image: "/images/transfers/minibus.png",
    mainImage: "/images/transfers/minibus-main.png",
    model: "Mercedes-Benz Sprinter and similar",
    class: "M-Class",
    passengers: 14,
    luggage: 10,
    description: "Group transportation with coordinated, private transfers. One vehicle for everyone, with a professional driver handling the journey.",
    idealFor: "Corporate trips, sightseeing tours, and performing groups."
  }
];

interface VehicleClassificationProps {
  compact?: boolean;
}

export default function VehicleClassification({ compact = false }: VehicleClassificationProps) {
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVehicleChange = (vehicle: typeof vehicles[0]) => {
    if (vehicle.id === activeVehicle.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveVehicle(vehicle);
      setIsAnimating(false);
    }, 150);
  };

  if (compact) {
    return (
      <div className="mt-6">
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
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-[1600px] px-6">

        {/* Vehicle Category Navigation - Text-based tabs */}
        <div className="mb-12">
          <div className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide pb-0 border-b border-border justify-center">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleChange(vehicle)}
                className={`relative flex-shrink-0 pb-4 text-sm font-medium tracking-widest uppercase transition-all ${
                  activeVehicle.id === vehicle.id
                    ? "text-accent-gold border-b-2 border-accent-gold font-semibold"
                    : "text-text-secondary hover:text-text-primary border-b-2 border-transparent"
                }`}
              >
                {vehicle.id === "business" && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-gold rounded-full" />
                )}
                {vehicle.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Vehicle Detail Area */}
        <div
          className={`transition-opacity duration-400 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT COLUMN - VEHICLE INFO */}
            <div className="order-2 md:order-1">
              {/* Class badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs">
                {activeVehicle.badge || activeVehicle.class}
              </div>

              {/* Vehicle name */}
              <h3 className="font-serif text-5xl md:text-6xl text-text-primary font-light mt-4">
                {activeVehicle.name}
              </h3>

              {/* Divider */}
              <div className="w-12 h-px bg-accent-gold mt-4 mb-6" />

              {/* Passenger + luggage row */}
              <div className="flex gap-6 items-center">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-accent-gold" />
                  <span className="text-text-primary font-semibold text-lg">{activeVehicle.passengers}</span>
                  <span className="text-text-secondary text-sm">passengers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Luggage size={20} className="text-accent-gold" />
                  <span className="text-text-primary font-semibold text-lg">{activeVehicle.luggage}</span>
                  <span className="text-text-secondary text-sm">bags</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed text-base mt-6">
                {activeVehicle.description}
              </p>

              {/* Ideal for */}
              <div className="mt-4 text-sm">
                <div className="text-accent-gold text-xs uppercase tracking-widest">IDEAL FOR</div>
                <div className="text-text-secondary italic mt-1">
                  {activeVehicle.idealFor}
                </div>
              </div>

              {/* Car examples */}
              <div className="mt-2 text-xs text-text-secondary/60">
                e.g. {activeVehicle.model}
              </div>

              {/* CTA Button */}
              <a
                href={`https://wa.me/201016015723?text=Hi Syren, I'd like to book a ${activeVehicle.name} transfer in Egypt`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-accent-gold text-accent-gold px-8 py-3.5 rounded-full font-medium tracking-wide hover:bg-accent-gold hover:text-black transition-all duration-300 group"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book Your Transfer
              </a>
            </div>

            {/* RIGHT COLUMN - VEHICLE IMAGE */}
            <div className="order-1 md:order-2">
              <div className="bg-surface rounded-2xl overflow-hidden aspect-[4/3] relative shadow-inner">
                <Image
                  src={activeVehicle.mainImage || activeVehicle.image}
                  alt={activeVehicle.name}
                  width={800}
                  height={600}
                  className="object-contain p-6 w-full h-full transition-opacity duration-400"
                />
              </div>
              {/* Thumbnail strip */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-16 w-auto opacity-60">
                  <Image
                    src={activeVehicle.image}
                    alt={`${activeVehicle.name} exterior view`}
                    width={80}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-text-secondary/60">exterior view</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

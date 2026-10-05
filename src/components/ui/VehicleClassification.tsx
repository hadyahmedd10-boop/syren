"use client";

import { useState } from "react";
import { Users, Luggage, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const vehicles = [
  {
    id: "economy",
    name: "Economy",
    image: "/images/transfers/economy.jpg",
    mainImage: "/images/transfers/economy-main.jpg",
    model: "Toyota Corolla, Hyundai Elantra and similar",
    class: "C-Class",
    passengers: 3,
    luggage: 3,
    description: "A reliable option for solo travelers and couples. Clean, air-conditioned, and handled by a professional Syren driver."
  },
  {
    id: "comfort",
    name: "Comfort",
    image: "/images/transfers/comfort.png",
    mainImage: "/images/transfers/comfort-main.png",
    model: "Toyota Camry, Kia K5 and similar",
    class: "D-Class",
    passengers: 3,
    luggage: 3,
    description: "Extra space, better sound insulation, and a noticeably smoother ride. Perfect for longer drives between cities."
  },
  {
    id: "business",
    name: "Business",
    image: "/images/transfers/business.jpg",
    mainImage: "/images/transfers/business-main.jpg",
    model: "Mercedes-Benz E-Class and similar",
    class: "E-Class",
    passengers: 3,
    luggage: 3,
    description: "Premium and refined. When the journey is part of the experience. Our most requested vehicle for VIP arrivals and special occasions."
  },
  {
    id: "minivan",
    name: "Minivan",
    image: "/images/transfers/minivan.jpg",
    mainImage: "/images/transfers/minivan-main.jpg",
    model: "Mercedes-Benz V-Class, Toyota Hiace and similar",
    class: "M-Class",
    passengers: 6,
    luggage: 6,
    description: "Perfect for families, groups, and anyone traveling with extra luggage. Everyone rides together in comfort without compromise."
  },
  {
    id: "suv",
    name: "SUV",
    image: "/images/transfers/suv.jpg",
    mainImage: "/images/transfers/suv-main.jpg",
    model: "GMC Yukon, Chevrolet Suburban and similar",
    class: "M-Class",
    passengers: 5,
    luggage: 4,
    description: "Presentation and capability in one. The best choice for desert road trips, festival runs, and anyone who wants to arrive making a statement."
  },
  {
    id: "minibus",
    name: "Minibus",
    image: "/images/transfers/minibus.png",
    mainImage: "/images/transfers/minibus-main.png",
    model: "Mercedes-Benz Sprinter and similar",
    class: "M-Class",
    passengers: 14,
    luggage: 10,
    description: "A reliable option for corporate trips, sightseeing tours, and transfers for performing groups. One vehicle, everyone together, zero stress."
  }
];

interface VehicleClassificationProps {
  compact?: boolean;
}

export default function VehicleClassification({ compact = false }: VehicleClassificationProps) {
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? vehicles.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setActiveVehicle(vehicles[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === vehicles.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setActiveVehicle(vehicles[newIndex]);
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
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-[1600px] px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-[52px] md:text-[56px] font-bold text-[#1a1a1a] tracking-tight">
            Vehicle classification
          </h2>
        </div>

        {/* Vehicle Category Navigation */}
        <div className="mb-12">
          <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => {
                  setActiveVehicle(vehicle);
                  setCurrentIndex(vehicles.findIndex(v => v.id === vehicle.id));
                }}
                className={`relative flex-shrink-0 w-[150px] h-[115px] rounded-[22px] border transition-all ${
                  activeVehicle.id === vehicle.id
                    ? "bg-[#f1f3f3] border-[#dedede]"
                    : "bg-white border-[#dededa] hover:bg-[#fafafa]"
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="w-[115px] h-[55px] flex items-center justify-center bg-transparent">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      width={115}
                      height={55}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <span className={`text-[15px] font-medium ${
                    activeVehicle.id === vehicle.id ? "text-[#4a7c59]" : "text-[#1a1a1a]"
                  }`}>
                    {vehicle.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Vehicle Detail Area */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
          {/* Left Side - Large Vehicle Image */}
          <div className="w-full lg:w-[52%]">
            <div className="relative w-full h-[305px] rounded-[50px] overflow-hidden bg-[#f0f2f2]">
              {/* Decorative background shape */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#dfeae5] opacity-50" />
              
              {/* Vehicle image */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src={activeVehicle.mainImage || activeVehicle.image}
                  alt={activeVehicle.name}
                  width={700}
                  height={305}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Information */}
          <div className="w-full lg:w-[48%] pl-0 lg:pl-12">
            {/* Vehicle title row */}
            <div className="flex items-center gap-4 mb-[18px]">
              <h3 className="text-[36px] font-bold text-[#1a1a1a]">
                {activeVehicle.name}
              </h3>
              
              {/* Capacity badge */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-[#f0f2f2] rounded-lg w-[115px] h-[45px]">
                <div className="flex items-center gap-1">
                  <Users size={18} className="text-[#1a1a1a]" />
                  <span className="text-[#1a1a1a] font-medium">{activeVehicle.passengers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Luggage size={18} className="text-[#1a1a1a]" />
                  <span className="text-[#1a1a1a] font-medium">{activeVehicle.luggage}</span>
                </div>
              </div>
            </div>

            {/* Vehicle model name */}
            <div className="mb-[10px]">
              <p className="text-[29px] font-bold text-[#1a1a1a] leading-tight">
                {activeVehicle.model}
              </p>
              <p className="text-[18px] font-medium text-[#4a4a4a] mt-[10px]">
                {activeVehicle.class}
              </p>
            </div>

            {/* Description */}
            <p className="text-[18px] text-[#4a4a4a] leading-relaxed max-w-[650px]">
              {activeVehicle.description}
            </p>

            {/* Book button */}
            <a
              href={`https://wa.me/201016015723?text=Hi Syren, I'd like to book a ${activeVehicle.name} transfer in Egypt`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-6 bg-[#1a1a1a] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#333] transition-all"
            >
              Book This Transfer →
            </a>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-2.5">
          <button
            onClick={handlePrevious}
            className="w-[60px] h-[60px] rounded-full bg-[#f0f2f2] flex items-center justify-center hover:bg-[#e0e2e2] transition-colors"
          >
            <ChevronLeft size={28} className="text-[#1a1a1a]" />
          </button>
          <button
            onClick={handleNext}
            className="w-[60px] h-[60px] rounded-full bg-[#f0f2f2] flex items-center justify-center hover:bg-[#e0e2e2] transition-colors"
          >
            <ChevronRight size={28} className="text-[#1a1a1a]" />
          </button>
        </div>
      </div>
    </section>
  );
}

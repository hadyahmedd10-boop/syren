"use client";

import { useMemo } from "react";
import ItineraryAccordion from "@/components/ui/ItineraryAccordion";
import { getItineraryImages } from "@/lib/getItineraryImages";
import { type StaticImageData } from "next/image";

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  meals?: string | string[];
  highlights?: string[];
  image?: string | StaticImageData;
}

interface ItineraryTimelineProps {
  experienceSlug: string;
  experienceTitle: string;
  itinerary: ItineraryItem[];
}

export default function ItineraryTimeline({
  experienceSlug,
  experienceTitle,
  itinerary,
}: ItineraryTimelineProps) {
  const images = getItineraryImages(experienceSlug);

  // Map itinerary items to accordion format
  const accordionItems = useMemo(() => {
    return itinerary.map((item, idx) => ({
      id: `${experienceSlug}-day-${item.day}`,
      day: item.day,
      title: item.title,
      description: item.description,
      image: images[idx] || (typeof item.image === "string" ? item.image : undefined),
      meals: item.meals
        ? Array.isArray(item.meals)
          ? item.meals
          : item.meals.split(/,\s*|\s+&\s*|\s*-\s*/).filter(Boolean)
        : undefined,
    }));
  }, [itinerary, images, experienceSlug]);

  return (
    <ItineraryAccordion
      items={accordionItems}
      type="days"
      title="Your Curated Journey"
      subtitle="Day by Day"
    />
  );
}

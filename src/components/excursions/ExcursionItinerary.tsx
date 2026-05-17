"use client";
import React from "react";
import type { StaticImageData } from "next/image";
import { ExcursionItineraryStep } from "@/types/excursion";
import ItineraryAccordion from "@/components/ui/ItineraryAccordion";

interface ExcursionItineraryProps {
  steps: ExcursionItineraryStep[];
  fallbackImage?: string | StaticImageData;
  title?: string;
  parentTitle?: string;
}

export default function ExcursionItinerary({ steps, title, parentTitle }: ExcursionItineraryProps) {
  // Map excursion steps to accordion items
  const accordionItems = steps.map((step, index) => ({
    id: step.id,
    step: index + 1,
    title: step.title,
    description: step.description,
    tag: step.tag,
    image: step.image as string | undefined,
  }));

  return (
    <ItineraryAccordion
      items={accordionItems}
      type="steps"
      title={title ?? "The Experience Flow"}
      subtitle="Step by Step"
    />
  );
}

"use client";

import Reveal from "../motion/Reveal";
import Link from "next/link";
import SectionHeader from "../layout/SectionHeader";
import Image from "next/image";
import { HERO_IMAGES } from "@/lib/images";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

interface FinalCTAProps {
  className?: string;
  as?: React.ElementType;
}

export default function FinalCTA({ className = "", as: Component = "div" }: FinalCTAProps) {
  return (
    <Component
      aria-labelledby="final-cta-title"
      className={`relative overflow-hidden bg-background ${className}`}
    >
      <Image
        src={HERO_IMAGES.cairo}
        alt="Cairo skyline at dusk — Syren Travel Egypt"
        fill
        className="object-cover object-center opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-border),transparent_60%)] opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl container-x py-12 text-center md:py-16 lg:py-20">
        <SectionHeader
          title="Experience Egypt properly."
          label="Next Steps"
          description="Every journey starts with a conversation. We don't sell packages — we design experiences that fit you."
          className="mb-8 md:mb-10"
        />

        <Reveal>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <WhatsAppButton
              label="Begin Your Journey"
              className="min-w-[200px]"
              location="final_cta"
            />
            <Link
              href="/experiences"
              className="syren-btn-secondary w-full sm:min-w-[240px]"
            >
              View Experiences
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
    </Component>
  );
}

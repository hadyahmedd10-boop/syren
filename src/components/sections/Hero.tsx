"use client";

import Link from "next/link";
import { useEffect } from "react";
import { StaticImageData } from "next/image";
import { HERO_IMAGES } from "@/lib/images";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  backgroundImage?: string | StaticImageData;
  showButtons?: boolean;
}

export default function Hero({ 
  title, 
  subtitle, 
  eyebrow = "Syren",
  backgroundImage = HERO_IMAGES.home,
  showButtons = true 
}: HeroProps) {
  useEffect(() => {
    // Force scroll to top on mount (e.g., page reload)
    window.scrollTo(0, 0);
  }, []);

  const bgImageSrc = typeof backgroundImage === "string" 
    ? backgroundImage 
    : backgroundImage.src;

  return (
    <HeroShell
      backgroundImage={bgImageSrc}
      eyebrow={eyebrow}
      title={
        title || (
          <span style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8)" }} className="tracking-tight antialiased text-6xl md:text-7xl lg:text-8xl">
            Egypt, Like you&apos;ve never seen before
          </span>
        )
      }
      subtitle={
        subtitle || "Private journeys designed by local experts. Delivered with absolute precision."
      }
    >
      {showButtons && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="#map-of-syren" className="syren-btn-primary px-8 py-3">
            Begin Your Journey
          </Link>

          <Link href="/experiences" className="syren-btn-secondary px-8 py-3">
            Explore Experiences
          </Link>
        </div>
      )}
      <motion.div
        className="mx-auto h-px bg-accent-gold mt-6"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </HeroShell>
  );
}

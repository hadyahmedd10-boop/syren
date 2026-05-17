"use client";
import { Heart } from "lucide-react";
import useWishlist from "@/hooks/useWishlist";
import { useState } from "react";

type Props = {
  slug: string;
  itemType: "experience" | "excursion";
  className?: string;
  labelSaved?: string;
  labelUnsaved?: string;
};

export default function SaveToggle({ slug, itemType, className = "", labelSaved = "Saved", labelUnsaved = "Save this" }: Props) {
  const wish = useWishlist();
  const saved = wish.isSaved(slug);
  const [bump, setBump] = useState(false);
  return (
    <button
      onClick={() => {
        wish.toggleSave(slug, itemType);
        setBump(true);
        window.setTimeout(() => setBump(false), 160);
      }}
      className={`inline-flex items-center gap-2 text-sm transition-all ${saved ? "text-accent-gold" : "text-white/80 hover:text-accent-gold"} ${bump ? "scale-105" : "scale-100"} ${className}`}
      aria-pressed={saved}
    >
      <Heart size={16} className={`${saved ? "fill-accent-gold text-accent-gold" : ""}`} />
      <span>{saved ? "♥ " + labelSaved : "♡ " + (labelUnsaved + (itemType === "experience" ? " experience" : " excursion"))}</span>
    </button>
  );
}

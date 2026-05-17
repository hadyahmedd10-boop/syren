"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import useWishlist from "@/hooks/useWishlist";
import { useState } from "react";
const BLUR_DATA_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

type Props = {
  title: string;
  description: string;
  image: StaticImageData | string;
  alt?: string;
  duration?: string;
  cities?: string;
  priceAmount?: number;
  priceCurrency?: string;
  label?: string;
  buttonText?: string;
  href?: string;
  variant?: "primary" | "secondary";
  minimal?: boolean;
  slug?: string;
  itemType?: "experience" | "excursion";
};

// ITINERARY IMAGE FRAME EDIT
export default function ExperienceCard({
  title,
  description,
  image,
  alt,
  duration,
  cities,
  priceAmount,
  priceCurrency,
  label,
  buttonText = "Explore Experiences →",
  href = "#",
  variant = "primary",
  minimal = false,
  slug,
  itemType,
}: Props) {
  const wish = useWishlist();
  const derivedSlug = slug || (typeof href === "string" ? href.split("/").filter(Boolean).pop() || "" : "");
  const derivedType: "experience" | "excursion" =
    itemType || (typeof href === "string" && href.startsWith("/excursions") ? "excursion" : "experience");
  const saved = derivedSlug ? wish.isSaved(derivedSlug) : false;
  const [bump, setBump] = useState(false);
  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!derivedSlug) return;
    wish.toggleSave(derivedSlug, derivedType);
    setBump(true);
    window.setTimeout(() => setBump(false), 180);
  };

  return (
    <Link href={href} className="block group cursor-pointer">
      <article className={`group relative flex h-full flex-col overflow-hidden ${
        variant === "primary" ? "syren-card syren-card-hover" : "syren-card-secondary syren-card-hover-secondary"
      } hover:border-accent-gold/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)] transition-transform duration-300 hover:border-t-2`}>
        <div className="relative w-full overflow-hidden aspect-[4/3] rounded-t-lg">
          <Image
            src={image}
            alt={alt ?? `${title} - Egypt Travel Experience`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL={typeof image === "string" ? BLUR_DATA_URL : undefined}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <div className="absolute bottom-2 left-3 z-10 flex items-center gap-3">
            {typeof priceAmount === "number" && priceCurrency ? (
              <span className="inline-flex items-center px-2 py-1 rounded bg-black/40 border border-border text-accent-gold text-xs">
                From {priceCurrency.toUpperCase()} {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(priceAmount)}
              </span>
            ) : null}
            {duration ? (
              <span className="inline-flex items-center px-2 py-1 rounded bg-black/40 border border-border text-white/80 text-xs">
                {duration}
              </span>
            ) : null}
          </div>
          {label && (
            <div className="absolute left-3 top-3 z-10">
              <span className="bg-accent-gold text-black text-xs font-bold uppercase px-2 py-1 rounded">
                {label}
              </span>
            </div>
          )}
          <button
            onClick={onToggle}
            title={saved ? "Saved" : "Save for later"}
            aria-label={saved ? "Saved" : "Save for later"}
            className={`absolute right-3 top-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur border border-border transition-all ${bump ? "scale-110" : "scale-100"}`}
          >
            <Heart
              size={18}
              className={`transition-colors ${saved ? "fill-accent-gold text-accent-gold" : "text-white/80"}`}
            />
          </button>
        </div>
        
        <div className="flex flex-1 flex-col p-3 sm:p-4 text-left">
          <div className="mb-1.5 flex flex-col gap-1">
            {cities && (
              <div className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                {cities}
              </div>
            )}
            <h3 className="font-serif text-lg sm:text-xl tracking-tight text-text-primary transition-colors duration-500">
              <span className="line-clamp-2">{title}</span>
            </h3>
          </div>

          {typeof priceAmount === "number" && priceCurrency && (
            <div className="mt-1 text-sm">
              <span className="text-accent-gold">
                From {priceCurrency.toUpperCase()}{" "}
                {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(priceAmount)}
              </span>
              {duration && (
                <span className="text-text-secondary">{" "}· {duration}</span>
              )}
            </div>
          )}
          {!priceAmount && !priceCurrency && duration && (
            <div className="mt-1 text-sm text-text-secondary">
              {duration}
            </div>
          )}
          
          {!minimal && description && (
            <p className="mt-2 flex-1 font-sans text-sm sm:text-sm leading-relaxed text-text-secondary line-clamp-3">
              {description}
            </p>
          )}
          
          <div className="mt-auto pt-2 border-t border-border">
            <div className="syren-btn-secondary w-full pointer-events-none select-none text-center min-h-[44px] text-sm transition-colors duration-300 group-hover:bg-accent-gold group-hover:text-black group-hover:border-accent-gold">
              {buttonText}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

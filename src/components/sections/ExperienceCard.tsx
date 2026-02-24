import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: StaticImageData | string;
  alt?: string;
  duration?: string;
  cities?: string;
  buttonText?: string;
  href?: string;
  variant?: "primary" | "secondary";
  minimal?: boolean;
};

// ITINERARY IMAGE FRAME EDIT
export default function ExperienceCard({
  title,
  description,
  image,
  alt,
  duration,
  cities,
  buttonText = "Explore Journey",
  href = "#",
  variant = "primary",
  minimal = false,
}: Props) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden ${
      variant === "primary" ? "syren-card syren-card-hover" : "syren-card-secondary syren-card-hover-secondary"
    }`}>
      {/* Image Container with Consistent Aspect Ratio - Fixed Landscape Frame */}
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <Image
          src={image}
          alt={alt ?? `A bespoke luxury journey through ${title} - Curated by Syren`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          priority={false}
          quality={90}
        />
        {duration && (
          <div className="absolute left-4 top-4 z-10">
            <span 
              tabIndex={0}
              className="syren-pill bg-background/80 border border-accent-gold/20 text-accent-gold backdrop-blur-md hover:bg-background hover:border-accent-gold/40 hover:shadow-[0_0_15px_rgba(196,160,82,0.2)]"
            >
              {duration}
            </span>
          </div>
        )}
        {cities && minimal && (
          <div className="absolute left-4 bottom-4 z-10">
            <span 
              tabIndex={0}
              className="syren-pill bg-background/80 border border-accent-gold/10 text-text-secondary backdrop-blur-md hover:bg-background hover:border-accent-gold/30 hover:text-accent-gold hover:shadow-[0_0_10px_rgba(196,160,82,0.1)] px-2 py-0.5 text-[10px] leading-tight"
            >
              {cities}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1.5 flex flex-col gap-1">
          {cities && !minimal && (
            <div className="mb-0.5">
              <span 
                tabIndex={0}
                className="syren-pill border border-accent-gold/10 bg-accent-gold/5 text-text-secondary hover:bg-accent-gold/10 hover:border-accent-gold/30 hover:text-accent-gold hover:shadow-[0_0_10px_rgba(196,160,82,0.1)] px-2 py-0.5 text-xs leading-tight"
              >
                {cities}
              </span>
            </div>
          )}
          <h3 className="font-serif text-lg sm:text-xl tracking-tight text-text-primary transition-colors duration-500">
            {title}
          </h3>
        </div>

        {!minimal && (
          <p className="mb-2 flex-1 font-sans text-[12px] sm:text-[13px] leading-relaxed text-text-secondary line-clamp-3 md:line-clamp-3">
            {description}
          </p>
        )}
        {minimal && (
          <p className="mb-2 flex-1 font-sans text-[12px] leading-relaxed text-text-secondary/80 line-clamp-4 sm:line-clamp-3 md:line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="mt-auto pt-2 border-t border-border">
          <Link
            href={href}
            className="syren-btn-secondary w-full"
          >
            {buttonText}
            {/* Stretched link to make entire card clickable */}
            <span className="absolute inset-0 z-20" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

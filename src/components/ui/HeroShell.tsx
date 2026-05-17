 "use client";
 
 import React from "react";
 import Image, { StaticImageData } from "next/image";
 import { cn } from "@/lib/utils";
 
 type HeroShellProps = {
   backgroundImage?: string | StaticImageData;
   eyebrow?: string;
   title: React.ReactNode;
   subtitle?: React.ReactNode;
   children?: React.ReactNode;
   className?: string;
   heightClassName?: string;
   objectPosition?: string;
   altText?: string;
 };
 
 const BLUR_DATA_URL =
   "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
 
 export default function HeroShell({
   backgroundImage,
   eyebrow,
   title,
   subtitle,
   children,
   className,
   heightClassName = "min-h-[72svh] md:min-h-[78svh]",
   objectPosition,
   altText,
 }: HeroShellProps) {
   const imgSrc =
     typeof backgroundImage === "string" ? backgroundImage : backgroundImage?.src;
 
   return (
     <section
       id="hero"
       className={cn(
         "relative w-full overflow-hidden",
         heightClassName,
         "pt-24 md:pt-28",
         "pb-10 md:pb-14",
         className
       )}
     >
       {imgSrc && (
         <div className="absolute inset-0">
           <Image
             src={imgSrc}
             alt={altText || "Syren Travel Egypt"}
             fill
             priority
             sizes="100vw"
             fetchPriority="high"
             placeholder="blur"
             blurDataURL={BLUR_DATA_URL}
             className="absolute inset-0 object-cover scale-105"
             style={objectPosition ? { objectPosition } : undefined}
           />
           <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/80" />
         </div>
       )}
 
      <div className="relative z-10 container-x text-center">
         {eyebrow && (
           <p
             className={cn("hero-eyebrow text-[10px] md:text-[11px] uppercase tracking-[0.35em]")}
           >
             {eyebrow}
           </p>
         )}
 
         <h1 className="mt-4 hero-heading hero-title text-accent-gold">{title}</h1>
 
         {subtitle && (
         <div className={cn("hero-subtitle mt-5 max-w-2xl mx-auto text-[15px] md:text-[18px] leading-relaxed")}>
             {subtitle}
           </div>
         )}
 
         {children && <div className="mt-8">{children}</div>}
       </div>
     </section>
   );
 }

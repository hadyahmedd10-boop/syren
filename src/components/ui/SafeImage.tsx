"use client";
import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  fallback?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function SafeImage({ src, alt, fallback = "/images/hero/luxury.jpg", fill, className, sizes, priority }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt || "Syren Travel - Egypt Travel Agency"}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setImgSrc(fallback)}
    />
  );
}

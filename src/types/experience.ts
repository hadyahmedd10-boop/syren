import { StaticImageData } from "next/image";
import { Testimonial } from "./testimonial";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string | string[];
  image?: StaticImageData | string;
  tag?: string;
  location?: string;
}

export interface Experience {
  id?: string;
  slug: string;
  title: string;
  destinations: string[];
  subtitle?: string;
  duration: string;
  cities: string;
  description: string;
  introduction: string;
  heroImage: StaticImageData | string;
  highlights?: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded?: string[];
  testimonials?: Testimonial[];
  badge?: string;
  seoTitle?: string;
  seoDescription?: string;
  price?: {
    amount?: number;
    from?: number;
    currency: string;
    perPerson?: boolean;
    label?: string;
  };
  whatsappMessage?: string;
  category?: 'nightlife' | 'luxury' | 'adventure' | 'cultural' | 'cairo-experiences' | 'nile-cruises' | 'festival-experiences';
  style?: string;
  idealFor?: string;
  shortDescription?: string;
  fullDescription?: string;
  groupSize?: string;
  minAge?: string;
  galleryImages?: (StaticImageData | string)[];
  isFeatured?: boolean;
  isPopular?: boolean;
  curatedPackage?: {
    title: string;
    description: string;
    inclusions: string[];
    ctaLabel: string;
  };
}

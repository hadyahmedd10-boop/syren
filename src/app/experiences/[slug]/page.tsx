// ITINERARY IMAGE FRAME EDIT
import type { Metadata } from "next";
import SafeImage from "@/components/ui/SafeImage";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { experiences } from "@/data/experiences";
import { CheckCircle2, Star, ArrowRight, MessageSquare, MapPin, Compass, Sunset, Utensils, Camera } from "lucide-react";
import StickyBookingPanel from "@/components/sections/experiences/StickyBookingPanel";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import ExperienceTracker from "@/components/ExperienceTracker";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import HeroShell from "@/components/ui/HeroShell";
import SectionHeader from "@/components/layout/SectionHeader";
import BookingSection from "@/components/checkout/BookingSection";
import BookingTrigger from "@/components/ui/BookingTrigger";
import { excursions } from "@/data/excursions";
import ItineraryTimeline from "@/components/sections/ItineraryTimeline";
import ItineraryImageDebug from "@/components/dev/ItineraryImageDebug";
import SaveToggle from "@/components/ui/SaveToggle";
import TrustpilotWidget from "@/components/ui/TrustpilotWidget";


interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ success?: string; canceled?: string }>;
}

import { SOCIAL_LINKS } from "@/config/social";

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  const makeTitle = (s: string) => {
    const base = `${s} | Syren`;
    return base.length <= 60 ? base : `${base.slice(0, 57).trimEnd()}…`;
  };
  const title = makeTitle(experience.title);
  const baseDesc = (experience as any).seoDescription || (experience as any).shortDescription || experience.description;
  let description = `${baseDesc} Book your private Egypt experience with Syren today.`;
  if (description.length < 150) {
    description = `${description} Discover Nile cruises, Pyramid access, Red Sea escapes, and curated multi-day journeys with local experts.`;
  }
  if (description.length > 160) {
    description = `${description.slice(0, 157).trimEnd()}…`;
  }
  const ogImage = typeof experience.heroImage === "string" ? experience.heroImage : experience.heroImage.src;

  return {
    title,
    description,
    alternates: {
      canonical: `/experiences/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.syrentravel.com/experiences/${slug}`,
      siteName: "Syren",
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: experience.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ExperienceDetailPage({ params, searchParams }: Props) {
  // Await params and searchParams at the beginning to avoid potential Next.js 15/16 pitfalls
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { slug } = resolvedParams;
  const { success, canceled } = resolvedSearchParams;
  
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    notFound();
  }

  const matchedExcursions = excursions.filter(
    (exc) => 
      experience.destinations.includes(exc.destinationSlug) && 
      typeof exc.priceCents === "number"
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://syrentravel.com";
  const heroImageUrl = typeof experience.heroImage === 'string' ? experience.heroImage : experience.heroImage.src;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": experience.title,
    "image": heroImageUrl,
    "description": experience.description,
    "brand": {
      "@type": "Brand",
      "name": "Syren"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/experiences/${slug}`,
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "Syren"
      },
      ...(experience.price && {
        "price": experience.price.amount,
      })
    }
  };

  const whatsappLink = `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
    `I want to plan my ${experience.title} journey with Syren`
  )}`;

  return (
    <main className="min-h-screen bg-background">
      <ExitIntentPopup experienceTitle={experience.title} />
      <ExperienceTracker experienceTitle={experience.title} experienceSlug={slug} />
      <script
        id={`experience-json-ld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Payment Notifications */}
      {success === "true" && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-md p-6 rounded-2xl text-center">
            <CheckCircle2 className="mx-auto text-green-500 mb-4" size={32} />
            <h3 className="text-white font-serif text-xl mb-2">Booking Confirmed!</h3>
            <p className="text-white/70 text-sm">Thank you for choosing Syren. Our curators will contact you within 24 hours to finalize your itinerary.</p>
          </div>
        </div>
      )}

      {canceled === "true" && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md p-6 rounded-2xl text-center">
            <h3 className="text-white font-serif text-xl mb-2">Booking Canceled</h3>
            <p className="text-white/70 text-sm">Your payment was not processed. Feel free to contact us if you have any questions.</p>
          </div>
        </div>
      )}
      {/* 1. Cinematic Hero Section */}
      <section id="hero" className="relative min-h-[55vh] md:min-h-[70vh] lg:min-h-[75vh] w-full overflow-hidden">
        <SafeImage
          src={typeof experience.heroImage === "string" ? experience.heroImage : experience.heroImage.src}
          alt={`${experience.title} - Syren Travel Egypt`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.55]"
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <h1 className="mb-5 max-w-5xl hero-heading hero-title">
              {experience.title}
            </h1>
          </Reveal>
          {experience.badge && (
            <Reveal delay={0.1}>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-gold text-black text-xs font-bold uppercase tracking-[0.2em]">
                {experience.badge}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <SaveToggle slug={slug} itemType="experience" className="mt-2" labelUnsaved="Save this" labelSaved="Saved" />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-2">
              <TrustpilotWidget variant="micro" height="24px" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-white/60 font-medium md:text-base">
                {experience.duration}
              </span>
              <div className="hidden h-px w-8 bg-white/30 md:block" />
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-white/90 font-light md:text-base">
                {experience.cities}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Introduction Section */}
      <section className="section bg-background">
        <div className="mx-auto max-w-4xl container-x text-center">
          <SectionHeader 
            title={`About ${experience.title}`} 
            label="The Soul of the Journey" 
            className="mb-8 md:mb-12"
          />
          <Reveal>
            <p className="mx-auto max-w-3xl font-sans text-lg leading-relaxed tracking-wide text-text-secondary md:text-xl md:leading-loose italic">
              &ldquo;{experience.introduction}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content + Sticky Booking Layout */}
      <div className="mx-auto container-x max-w-7xl px-6 md:px-8 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-12">
          {/* 3. Key Experience Highlights */}
          {experience.highlights && (
            <section className="bg-surface section-tight border-y border-border">
              <div>
                <SectionHeader 
                  title={`Highlights of ${experience.title}`} 
                  label="The Distinction" 
                />
                <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
                  {experience.highlights.map((highlight, idx) => {
                    const h = highlight.toLowerCase();
                    const Icon =
                      h.includes("map") || h.includes("giza") || h.includes("location")
                        ? MapPin
                        : h.includes("guide") || h.includes("route") || h.includes("explore")
                        ? Compass
                        : h.includes("sunset") || h.includes("sunrise")
                        ? Sunset
                        : h.includes("lunch") || h.includes("dinner") || h.includes("meal")
                        ? Utensils
                        : h.includes("photo") || h.includes("camera")
                        ? Camera
                        : Star;
                    return (
                      <Reveal key={idx} delay={0.08 * idx}>
                        <div className="rounded-lg border border-accent-gold/20 bg-black/40 p-3 md:p-4 hover:border-accent-gold/60 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <Icon size={16} className="text-accent-gold shrink-0" />
                            <p className="font-serif text-sm md:text-base text-text-primary truncate">
                              {highlight}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* 4. STORY JOURNEY ITINERARY */}
          <section id="itinerary" className="section bg-background relative scroll-mt-[120px]">
            <div className="mx-auto max-w-6xl container-x">
              <ItineraryTimeline
                experienceSlug={experience.slug}
                experienceTitle={experience.title}
                itinerary={experience.itinerary}
              />
            </div>
          </section>

          {/* 5. What's Included / Not Included */}
          <section className="bg-surface/30 section border-t border-border/50">
            <div className="mx-auto max-w-5xl container-x">
              <Reveal>
                <div className="rounded-2xl border border-border/40 bg-background/50 p-8 md:p-16 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
                  <SectionHeader
                    title={`Logistics for ${experience.title}`}
                    className="mb-12 md:mb-16"
                  />

                  <div className="grid gap-10 md:grid-cols-2">
                    <div className="space-y-8">
                      <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold flex items-center gap-3">
                        <div className="h-px w-4 bg-accent-gold/40" />
                        Included
                      </h3>
                      <ul className="space-y-4">
                        {experience.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <CheckCircle2 size={16} className="mt-1 text-accent-gold/60 shrink-0" />
                            <span className="font-sans text-sm text-text-secondary leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {experience.notIncluded && (
                      <div className="space-y-8">
                        <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary/40 flex items-center gap-3">
                          <div className="h-px w-4 bg-text-secondary/20" />
                          Not Included
                        </h3>
                        <ul className="space-y-4">
                          {experience.notIncluded.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 opacity-50">
                              <div className="mt-2 h-1 w-1 rounded-full bg-text-secondary shrink-0" />
                              <span className="font-sans text-sm text-text-secondary leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 6. Testimonials (Trustpilot) */}
          <section className="section bg-background">
            <div className="container-x mx-auto max-w-4xl">
              <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-3">
                TRAVELER STORIES
              </p>
              <h2 className="font-serif text-3xl text-text-primary mb-8">
                What Travelers Say
              </h2>
              <TrustpilotWidget variant="carousel" height="240px" className="w-full" />
              <div className="mt-4">
                <a
                  href="https://www.trustpilot.com/review/syrentravel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold text-sm hover:underline"
                >
                  Read all reviews on Trustpilot →
                </a>
              </div>
            </div>
          </section>

          {/* 7. Soft Conversion Section */}
          <section className="relative overflow-hidden bg-surface section border-y border-white/5">
            <div className="relative mx-auto max-w-4xl container-x text-center">
              <SectionHeader 
                title={`Personalize Your ${experience.title}`} 
                label="Personal Curation" 
              />
              <Reveal>
                <p className="mx-auto mb-12 max-w-2xl font-sans text-lg text-text-secondary md:text-xl leading-relaxed">
                  Every journey we create is unique. Message our master curators to adjust this itinerary to your specific pace and interests.
                </p>
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="w-full flex justify-center">
                    <BookingTrigger
                      title={experience.title}
                      slug={slug}
                      basePriceAmount={experience.price?.amount}
                      basePriceCurrency={experience.price?.currency || "USD"}
                      buttonLabel="Reserve this Journey"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="syren-btn flex items-center gap-3 w-full sm:w-auto"
                      aria-label={`Inquire about ${experience.title} via WhatsApp`}
                    >
                      <MessageSquare size={18} aria-hidden="true" />
                      INQUIRE VIA WHATSAPP
                    </a>
                    <Link 
                      href="/quote"
                      className="syren-btn-secondary flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                      REQUEST A QUOTE
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>

        {/* Sticky Booking Panel (desktop) and Mobile bar */}
        <div className="hidden md:block md:col-span-4">
          <StickyBookingPanel
            heroId="hero"
            title={experience.title}
            slug={slug}
            priceAmount={experience.price?.amount}
            priceCurrency={experience.price?.currency || "USD"}
            perPerson={experience.price?.perPerson ?? true}
            duration={experience.duration}
          />
        </div>
        {/* Render mobile bar even if no price */}
        <div className="md:hidden col-span-full">
          <StickyBookingPanel
            heroId="hero"
            title={experience.title}
            slug={slug}
            priceAmount={experience.price?.amount}
            priceCurrency={experience.price?.currency || "USD"}
            perPerson={experience.price?.perPerson ?? true}
            duration={experience.duration}
          />
        </div>
      </div>

      {/* 8. Booking Section */}
      {experience.price?.amount && (
        <section id="book" className="section bg-background relative overflow-hidden scroll-mt-[120px]">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold rounded-full blur-[120px]" />
          </div>

          <div className="mx-auto max-w-5xl container-x">
            <Reveal>
              <BookingSection
                experienceTitle={experience.title}
                experienceSlug={slug}
                basePrice={experience.price.amount}
                availableAddOns={matchedExcursions}
              />
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}

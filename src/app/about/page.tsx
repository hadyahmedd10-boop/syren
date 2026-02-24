import Reveal from "@/components/motion/Reveal";
import Image from "next/image";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import { Sparkles, ShieldCheck, Globe, Users } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import { WHATSAPP_LINK } from "@/config/social";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import HeroShell from "@/components/ui/HeroShell";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Spirit of Syren | Luxury Travel Curators in Egypt",
  description: "Syren was built for travelers who don’t want Egypt explained to them — they want to experience it properly. Not rushed. Not staged. Not wrapped in clichés.",
  alternates: {
    canonical: "/about",
  },
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const values = [
  {
    icon: <Sparkles className="text-accent-gold" />,
    title: "We Travel Like Locals, Not Tourists",
    description: "Most trips show you Egypt from the outside. We take you inside it. We design experiences the same way locals move through the country — at the right pace, at the right time, with the right people. Early mornings when sites are quiet. Evenings when cities soften. Moments that don’t feel scheduled, because they aren’t. This isn’t about seeing more. It’s about seeing clearly."
  },
  {
    icon: <ShieldCheck className="text-accent-gold" />,
    title: "Nothing Pre-Built. Nothing Generic.",
    description: "We don’t sell packages. We don’t reuse itineraries. We don’t believe one experience fits everyone. Every journey starts with a conversation — not a form. We listen to how you travel, what you care about, and what you want this trip to mean. From there, we build something that fits you, not a brochure. Some travelers want depth. Some want comfort. Some want adventure. Most want a balance — and that balance looks different for everyone."
  },
  {
    icon: <Globe className="text-accent-gold" />,
    title: "Comfort Without Performance",
    description: "Luxury, to us, isn’t about excess. It’s about ease. Knowing where to go — and when not to. Having the right people around you. Moving smoothly without needing to think about logistics. Everything works quietly in the background so you can stay present in the experience itself. No forced experiences. No unnecessary stops. No pressure to “do it all.”"
  },
  {
    icon: <Users className="text-accent-gold" />,
    title: "Why We Exist",
    description: "Syren exists because Egypt deserves better than mass tourism — and travelers deserve better than rushed, surface-level trips. We work with people who want to engage with the country respectfully, thoughtfully, and honestly. If you’re looking to tick boxes, we’re probably not the right fit. If you want a journey that stays with you long after you leave, we might be."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Our Story"
        title="About Syren"
        subtitle="Private. Precise. Personal."
        heightClassName="min-h-[42vh] md:min-h-[50vh] lg:min-h-[54vh]"
      />

      <div className="h-6" />

      {/* Mission */}
      <section id="mission" className="section">
        <div className="mx-auto max-w-6xl container-x">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-stretch">
            <div className="md:col-span-7">
              <div className="rounded-2xl border border-border/60 bg-surface/50 backdrop-blur-md p-8 md:p-10 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.4)]">
                <SectionHeader 
                  title="Syren was built for travelers who don’t want Egypt explained — they want to experience it properly."
                  description={
                    <>
                      <p className="mb-6">
                        Not rushed. Not staged. Not wrapped in clichés.
                      </p>
                      <p>
                        Egypt is layered, intense, beautiful, chaotic, spiritual, and deeply human. We design journeys that respect that — at the right pace, at the right time, with the right people.
                      </p>
                    </>
                  }
                  className="mb-0 text-left"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="h-full rounded-2xl border border-accent-gold/20 bg-accent-gold/5 p-6 md:p-8">
                <h3 className="font-serif text-2xl text-text-primary mb-4">Our Promise</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-gold/60 shrink-0" />
                    <span className="text-text-secondary">Clarity over checklists — depth over rush.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-gold/60 shrink-0" />
                    <span className="text-text-secondary">Logistics handled quietly, so you can stay present.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-gold/60 shrink-0" />
                    <span className="text-text-secondary">Real moments with real people — not staged stops.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="section bg-black/40">
        <div className="max-w-3xl mx-auto container-x text-center">
          <SectionHeader 
            title="Our Values" 
            description={<p className="text-text-secondary">Four principles that shape every journey we build.</p>} 
            className="mb-2" 
          />
        </div>
      </section>

      {values.map((value, index) => {
        const id = `value-${slugify(value.title)}`;
        const sectionBg = index % 2 === 0 ? "bg-black/30" : "bg-black/20";
        return (
        <section key={value.title} id={id} className={`section ${sectionBg} border-t border-border/40`}>
          <div className="mx-auto max-w-5xl container-x">
            <Reveal delay={index * 0.08}>
              <div className="rounded-2xl border border-border/60 ring-1 ring-white/5 bg-surface/40 backdrop-blur-sm p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 transition-all duration-300 hover:border-accent-gold/30 hover:shadow-[0_0_25px_rgba(196,160,82,0.08)]">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {value.icon}
                </div>
                <div>
                  <div className="text-accent-gold uppercase tracking-[0.2em] text-[11px] font-bold mb-2">Value {String(index + 1).padStart(2, "0")}</div>
                  <h3 className="text-text-primary font-serif text-2xl mb-3">{value.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )})}

      {/* CTA */}
      <section id="what-we-build" className="section">
        <div className="max-w-3xl mx-auto container-x text-center border border-white/5 rounded-2xl p-8 sm:p-10 md:p-16 bg-surface/30 backdrop-blur-sm">
          <SectionHeader 
            title="What We Build" 
            description={
              <>
                <p className="mb-4 text-accent-gold uppercase tracking-widest text-xs font-bold">Not trips. Not schedules. Not content for social media.</p>
                <p className="mb-4">We build experiences that feel real while you’re in them — and meaningful after you’re home.</p>
                <p className="text-white font-serif italic text-xl">That’s Syren. Simple as that.</p>
              </>
            }
            className="mb-12"
          />
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <WhatsAppButton label="Speak with a Curator" />
            <Link href="/experiences" className="syren-btn-secondary">
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA as="section" className="section border-t border-white/5" />
    </main>
  );
}

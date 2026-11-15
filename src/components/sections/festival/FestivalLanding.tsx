import type { StaticImageData } from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import HeroShell from "@/components/ui/HeroShell";
import JsonLd from "@/components/seo/JsonLd";
import FestivalPackagesSection from "./FestivalPackagesSection";
import FestivalEnquiryCta from "./FestivalEnquiryCta";
import {
  FESTIVAL_CONTENT_UPDATED_LABEL,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  type Faq,
} from "@/lib/festivalSeo";

export type KeyFact = { label: string; value: string; href?: string };

export type FestivalLandingProps = {
  path: string;
  heroImage: string | StaticImageData;
  heroEyebrow: string;
  h1: string;
  heroSubtitle: string;
  heroActions?: React.ReactNode;
  /** Answer-first summary, 40–60 words. */
  summary: string;
  keyFacts: KeyFact[];
  packagesEventSlug: string;
  packagesHeading?: string;
  packagesIntro?: string;
  packagesEmptyNotice?: React.ReactNode;
  /** Optional extra block, e.g. an edition history. */
  extraSections?: React.ReactNode;
  whereToStay: React.ReactNode;
  howToGetThere: React.ReactNode;
  included: string[];
  notIncluded: string[];
  bookingSteps: string[];
  faqs: Faq[];
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
    bookingTitle: string;
    bookingSlug: string;
    whatsappMessage: string;
    packageId?: string;
  };
  related: { href: string; label: string }[];
  eventJsonLd?: Record<string, unknown>;
};

export default function FestivalLanding({
  path,
  heroImage,
  heroEyebrow,
  h1,
  heroSubtitle,
  heroActions,
  summary,
  keyFacts,
  packagesEventSlug,
  packagesHeading,
  packagesIntro,
  packagesEmptyNotice,
  extraSections,
  whereToStay,
  howToGetThere,
  included,
  notIncluded,
  bookingSteps,
  faqs,
  cta,
  related,
  eventJsonLd,
}: FestivalLandingProps) {
  const jsonLd = [
    ...(eventJsonLd ? [eventJsonLd] : []),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Festival Travel", path: "/festival-travel-egypt" },
      { name: h1, path },
    ]),
    faqJsonLd(faqs),
    organizationJsonLd(),
  ];

  return (
    <main className="min-h-screen bg-background">
      <HeroShell
        backgroundImage={heroImage}
        eyebrow={heroEyebrow}
        title={h1}
        subtitle={heroSubtitle}
        altText={`${h1} — Syren Egypt`}
        heightClassName="min-h-[58vh] md:min-h-[68vh]"
      >
        {heroActions && (
          <div className="flex flex-wrap items-center justify-center gap-3">{heroActions}</div>
        )}
      </HeroShell>

      {/* Answer-first summary + key facts */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl space-y-10">
          <p className="text-lg leading-relaxed text-text-secondary">{summary}</p>

          <div className="rounded-2xl border border-accent-gold/30 bg-surface/40 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-serif text-2xl text-text-primary">Key facts</h2>
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {keyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-medium text-text-primary">
                    {fact.href ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-gold underline underline-offset-2"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {extraSections}
        </div>
      </section>

      {/* Packages */}
      <FestivalPackagesSection
        eventSlug={packagesEventSlug}
        page={path}
        heading={packagesHeading}
        intro={packagesIntro}
        emptyNotice={packagesEmptyNotice}
      />

      {/* Where to stay, getting there, inclusions, booking, FAQ */}
      <section className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-4xl space-y-12">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary">
              Where to stay near the Pyramids
            </h2>
            <div className="mt-3 space-y-3 leading-relaxed text-text-secondary">
              {whereToStay}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary">How to get there</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-text-secondary">
              {howToGetThere}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary">
              What is and is not included
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/40 p-5">
                <h3 className="mb-3 font-serif text-lg text-text-primary">Included</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {included.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-surface/40 p-5">
                <h3 className="mb-3 font-serif text-lg text-text-primary">Not included</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {notIncluded.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary">
              How booking works
            </h2>
            <ol className="mt-4 space-y-3">
              {bookingSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-text-secondary">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-gold/50 text-xs font-semibold text-accent-gold">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary">
              Frequently asked questions
            </h2>
            <div className="mt-4 border-t border-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
                    <span className="font-serif text-lg text-text-primary transition-colors group-hover:text-accent-gold">
                      {faq.question}
                    </span>
                    <Plus
                      size={18}
                      className="shrink-0 text-text-secondary transition-transform duration-300 group-open:rotate-45 group-hover:text-accent-gold"
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-5 leading-relaxed text-text-secondary">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FestivalEnquiryCta
        page={path}
        heading={cta.heading}
        body={cta.body}
        buttonLabel={cta.buttonLabel}
        bookingTitle={cta.bookingTitle}
        bookingSlug={cta.bookingSlug}
        whatsappMessage={cta.whatsappMessage}
        packageId={cta.packageId}
      />

      {/* Related links + last updated */}
      <section className="section bg-background">
        <div className="container-x mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl text-text-primary">Keep planning</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {related.map((link) => (
              <Link key={link.href} href={link.href} className="syren-btn-secondary">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-8 border-t border-border pt-4 text-sm text-text-secondary">
            Last updated: {FESTIVAL_CONTENT_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <JsonLd data={jsonLd} />
    </main>
  );
}

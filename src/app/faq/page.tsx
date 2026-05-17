import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_LINK } from "@/config/social";

export const metadata: Metadata = {
  title: "FAQ — Egypt Travel Questions Answered | Syren",
  description:
    "Find answers to the most common Egypt travel questions — visa requirements, safety, booking process, cancellation policy, packing tips, and concierge support.",
  alternates: { canonical: "/faq" },
};

function FaqItem({
  q,
  a,
}: {
  q: string;
  a: React.ReactNode;
}) {
  return (
    <details className="group border-b border-accent-gold/30 py-4">
      <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
        <h3 className="font-serif text-xl text-text-primary">{q}</h3>
        <span className="text-accent-gold text-xl leading-none">+</span>
      </summary>
      <div className="mt-3 pl-3 border-l-2 border-accent-gold">
        <div className="font-sans text-text-secondary leading-relaxed">{a}</div>
      </div>
    </details>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="py-8">
      <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold mb-4 text-center">{label}</span>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-4xl container-x text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-accent-gold">Frequently Asked Questions</h1>
          <p className="mt-3 font-sans text-text-secondary">Everything you need to know before your Egypt journey.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl container-x">
        <Section label="Before You Book">
          <FaqItem
            q="Do I need a visa to visit Egypt?"
            a={
              <>
                Most nationalities can obtain an Egyptian e-visa online at{" "}
                <a href="https://visa2egypt.gov.eg" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                  visa2egypt.gov.eg
                </a>{" "}
                before travel. The process takes 3–5 business days and costs around $25 USD. Some nationalities receive a visa on arrival. Your Syren concierge will guide you through the specific requirements for your passport.
              </>
            }
          />
          <FaqItem
            q="When is the best time to visit Egypt?"
            a={
              <>
                October through April is the sweet spot — comfortable temperatures across Cairo, Luxor, and Aswan. Summer (June–August) brings intense heat inland but the Red Sea coast remains perfect year‑round. See our full guide:{" "}
                <Link href="/best-time-to-visit-egypt" className="text-accent-gold hover:underline">
                  Best Time to Visit Egypt
                </Link>
                .
              </>
            }
          />
          <FaqItem
            q="Is Egypt safe for tourists?"
            a={
              <>
                Yes. Egypt receives over 15 million tourists annually and has a dedicated tourist police force at every major site. See our detailed guide:{" "}
                <Link href="/is-egypt-safe" className="text-accent-gold hover:underline">
                  Is Egypt Safe?
                </Link>
                .
              </>
            }
          />
          <FaqItem
            q="Can women travel to Egypt alone?"
            a={
              <>
                Absolutely. Thousands of solo female travelers visit Egypt every month. With Syren&apos;s support — vetted drivers, professional guides, and 24/7 concierge — solo female travelers consistently report feeling safe and empowered throughout their journey.
              </>
            }
          />
        </Section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent my-2" />

        <Section label="Booking & Payments">
          <FaqItem
            q="How do I book a Syren experience?"
            a={
              <>
                Click “Reserve Now” on any experience or excursion page, fill in your travel dates and details, and our team will contact you within 24 hours to confirm availability and next steps. No payment is required at this stage.
              </>
            }
          />
          <FaqItem
            q="How much deposit is required?"
            a={<>A deposit is required to confirm your booking. The exact amount depends on the experience — our team will provide full payment details when confirming your reservation.</>}
          />
          <FaqItem
            q="What payment methods do you accept?"
            a={<>We accept bank transfers and major credit/debit cards. All payments are processed securely.</>}
          />
          <FaqItem
            q="Can I customize any package?"
            a={
              <>
                Yes — every Syren experience can be tailored to your dates, group size, interests, and budget.{" "}
                <Link href="/quote" className="text-accent-gold hover:underline">
                  Contact us through the quote form
                </Link>{" "}
                and we&apos;ll design something specifically for you.
              </>
            }
          />
        </Section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent my-2" />

        <Section label="Cancellations & Refunds">
          <FaqItem
            q="What is your cancellation policy?"
            a={
              <>
                Cancellations 30+ days before travel: full refund minus admin fee. Cancellations 15–29 days before: 50% refund. Cancellations under 15 days: no refund. We strongly recommend travel insurance for all bookings.
              </>
            }
          />
          <FaqItem
            q="What if I need to change my dates?"
            a={<>Date changes are accommodated where possible, subject to availability. Contact your Syren concierge as early as possible and we&apos;ll do our best to reschedule.</>}
          />
        </Section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent my-2" />

        <Section label="During Your Trip">
          <FaqItem
            q="Will I have a guide throughout my trip?"
            a={<>All Syren experiences include licensed, professional local guides. They speak English and are experts in Egyptian history, culture, and logistics.</>}
          />
          <FaqItem
            q="What should I pack for Egypt?"
            a={
              <>
                Light, breathable clothing, a light scarf for religious sites, comfortable walking shoes, sunscreen, and a reusable water bottle. Your Syren concierge will send you a detailed packing list before departure.
              </>
            }
          />
          <FaqItem
            q="How do I contact Syren during my trip?"
            a={
              <>
                Your concierge&apos;s WhatsApp number is shared before your trip begins. We are available 24/7 throughout your journey. You can also reach us at +20 1016015723.
              </>
            }
          />
        </Section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent my-2" />

        <Section label="Events">
          <FaqItem
            q="Do you offer packages for events like Zamna and Sandbox?"
            a={
              <>
                Yes — Syren offers curated travel packages for all major Egypt events including Zamna Egypt, Sandbox Festival, NOART, and more. Packages include accommodation, transfers, and logistics.{" "}
                <Link href="/events" className="text-accent-gold hover:underline">
                  View our events
                </Link>
                .
              </>
            }
          />
          <FaqItem
            q="Can you help with event tickets?"
            a={
              <>
                We provide guidance on ticket purchases and can assist with logistics. For official tickets, we direct you to the event&apos;s official ticketing platform.
              </>
            }
          />
        </Section>

        <div className="mt-12 flex justify-center">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="syren-btn">
            Still have questions? Chat with us →
          </a>
        </div>
      </div>
    </main>
  );
}

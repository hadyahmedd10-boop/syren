import type { Metadata } from "next";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Terms of Service | Syren Travel",
  description: "Syren Travel terms: booking policy, payment terms, cancellations and refunds for Egypt travel experiences and packages.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Syren Travel",
    description: "Syren Travel terms: booking policy, payment, cancellations and refunds for Egypt travel experiences and packages.",
    url: "https://www.syrentravel.com/terms",
    type: "website",
    images: [{ url: "https://www.syrentravel.com/images/hero/luxury.jpg", width: 1200, height: 630, alt: "Syren Travel Egypt" }],
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="sr-only">Terms of Service</h1>
      <section className="section">
        <div className="mx-auto max-w-4xl container-x">
          <SectionHeader title="Terms of Service" label="Syren Travel" className="mb-8" />
          <p className="mb-6">
            At Syren Travel, we are committed to delivering seamless, personalized, and unforgettable travel experiences across Egypt.
            These Terms of Service outline the agreement between you (“the Traveler”) and Syren Travel regarding your booking, payments,
            cancellations, refunds, and related policies.
          </p>
          <p className="mb-10">
            By confirming your booking with us, you agree to the terms outlined below. We encourage you to read them carefully.
            If you have any questions, our team is always ready to assist you.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">1. Acceptance of Terms</h2>
          <p className="mb-10">
            Payment of your deposit or full balance confirms your acceptance of these Terms of Service. This agreement forms the complete
            contract between you and Syren Travel.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">2. Booking & Payment Policy</h2>
          <h3 className="font-serif text-xl text-text-primary mb-2">Deposit</h3>
          <p className="mb-6">A 25% deposit is required to confirm your booking.</p>
          <h3 className="font-serif text-xl text-text-primary mb-2">Peak &amp; Festive Periods (Christmas, New Year, Easter &amp; Major Egyptian Holidays)</h3>
          <p className="mb-6">A 50% deposit is required to secure bookings during these periods.</p>
          <h3 className="font-serif text-xl text-text-primary mb-2">Remaining Balance</h3>
          <p className="mb-10">
            The remaining balance must be paid no later than 2 days prior to arrival, or upon arrival in cash (if previously agreed).
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">3. Credit Card Payments</h2>
          <p className="mb-6">
            For credit card payments, Syren Travel may request a signed authorization form. The cardholder’s signature must match the
            passport and the credit card used for payment.
          </p>
          <p className="mb-10">All online payments are processed securely through our trusted payment gateway providers.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">4. Cancellation Policy</h2>
          <h3 className="font-serif text-xl text-text-primary mb-2">Standard Travel Periods</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>61+ days before arrival: 15% cancellation fee</li>
            <li>60–31 days before arrival: 35%</li>
            <li>30–15 days before arrival: 50%</li>
            <li>14–1 days before arrival: 100%</li>
          </ul>
          <p className="mb-6">Airlines and third-party suppliers may apply additional cancellation fees.</p>
          <p className="mb-6">A 5% bank processing fee applies to all refunds.</p>
          <h3 className="font-serif text-xl text-text-primary mb-2">Peak Seasons (Christmas, New Year, Easter &amp; Major Events)</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>61+ days before arrival: 25% cancellation fee</li>
            <li>60–31 days before arrival: 50%</li>
            <li>30–15 days before arrival: 75%</li>
            <li>14–1 days before arrival: 100%</li>
          </ul>
          <p className="mb-6">Airlines and third-party suppliers may apply additional cancellation fees.</p>
          <p className="mb-10">A 5% bank processing fee applies to all refunds.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">5. Refund Policy</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Refunds are processed using the same payment method used for the original transaction.</li>
            <li>A 5% bank fee will be deducted from all refunded amounts.</li>
            <li>No-shows are strictly non-refundable.</li>
            <li>Processing times may vary depending on banking procedures.</li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">6. Force Majeure</h2>
          <p className="mb-4">In the event of official government-imposed travel restrictions, airline suspensions, or other force majeure circumstances beyond our control:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>You may receive a full refund (excluding non-recoverable airline or bank fees), or</li>
            <li>A travel credit equal to the paid amount, valid for future travel with Syren Travel.</li>
          </ul>
          <p className="mb-6">Flight cancellation or change penalties will be subject to airline policies.</p>
          <p className="mb-10">Your safety and flexibility remain our highest priority.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">7. Accommodation</h2>
          <ul className="list-disc ml-6 mb-10">
            <li>Hotels are selected based on quality, comfort, safety, and location.</li>
            <li>Rates are based on double occupancy unless otherwise stated.</li>
            <li>A single supplement applies to solo travelers.</li>
            <li>Hotel categories are subject to availability at the time of booking.</li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">8. Flights</h2>
          <h3 className="font-serif text-xl text-text-primary mb-2">Domestic Flights</h3>
          <p className="mb-4">Quoted prices are estimates based on average fares and may vary depending on availability and booking date.</p>
          <h3 className="font-serif text-xl text-text-primary mb-2">International Flights</h3>
          <p className="mb-4">Available upon request at competitive market rates.</p>
          <p className="mb-10">All flights are subject to airline terms and conditions.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">9. Children Policy</h2>
          <h3 className="font-serif text-xl text-text-primary mb-2">Packages, Hotels &amp; Cruises</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Under 2 years: Free of charge</li>
            <li>Under 6 years: 25% of adult rate</li>
            <li>Under 12 years: 50% of adult rate</li>
            <li>12 years and above: Charged as adults</li>
          </ul>
          <p className="mb-6">Applies to one child sharing a room with parents. Flight supplements may apply.</p>
          <h3 className="font-serif text-xl text-text-primary mb-2">Sightseeing Tours &amp; Excursions</h3>
          <ul className="list-disc ml-6 mb-10">
            <li>Under 6 years: Free</li>
            <li>Under 12 years: 50% of adult rate</li>
            <li>12 years and above: Charged as adults</li>
          </ul>
          <p className="mb-10">Domestic flights, ferries, or entrance fee supplements may apply.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">10. Special Requests</h2>
          <p className="mb-4">We are happy to accommodate special requests such as:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Dietary requirements</li>
            <li>Accessibility needs</li>
            <li>Specific room categories</li>
            <li>Special celebrations (birthdays, anniversaries, honeymoons)</li>
          </ul>
          <p className="mb-10">
            While we will do our best to fulfill all requests, they are subject to availability and cannot be guaranteed unless confirmed in writing.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">11. Responsibility &amp; Liability</h2>
          <p className="mb-4">Syren Travel is not liable for circumstances beyond our reasonable control, including but not limited to:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Weather conditions</li>
            <li>Political situations</li>
            <li>Airline schedule changes</li>
            <li>Hotel operational changes</li>
            <li>Force majeure events</li>
          </ul>
          <p className="mb-10">Any additional expenses resulting from such events are the responsibility of the traveler.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">12. Tipping</h2>
          <p className="mb-10">
            Tipping in Egypt is customary but entirely optional. It is a gesture of appreciation for good service and is always welcomed but never mandatory.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">13. Use of Media &amp; Photos</h2>
          <p className="mb-10">
            By tagging Syren Travel or sharing your travel photos publicly, you grant us permission to repost or feature your content on our
            website or social media platforms for promotional purposes.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">14. Complaints &amp; Customer Care</h2>
          <p className="mb-4">Your satisfaction is important to us.</p>
          <p className="mb-4">Please notify our team immediately during your trip if any issue arises so we can resolve it promptly.</p>
          <p className="mb-10">
            After your trip, you may contact our Customer Care Team via email for further assistance. If necessary, your case may be escalated
            to management for final review.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">15. General Terms</h2>
          <ul className="list-disc ml-6 mb-6">
            <li>These Terms are governed by the laws of the Arab Republic of Egypt.</li>
            <li>Syren Travel operates in compliance with applicable Egyptian tourism regulations.</li>
            <li>Travelers under 18 years of age may not book independently.</li>
            <li>The cardholder is responsible for retaining copies of transaction records and policies.</li>
            <li>We accept Visa and MasterCard payments in AED, USD, EUR, and GBP.</li>
            <li>Services are not available to destinations restricted under international sanction regulations.</li>
            <li>Multiple bookings may appear as separate transactions on your bank statement.</li>
          </ul>
          <div className="h-px w-full bg-border mt-8" />
          <p className="mt-6 text-sm text-text-secondary">_____________</p>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-4xl container-x text-center">
          <div className="rounded-2xl bg-black/90 border border-accent-gold/30 p-8 md:p-10">
            <h3 className="font-serif text-2xl text-text-primary mb-3">Questions? Contact Us</h3>
            <a href="/quote" className="syren-btn-secondary inline-flex min-h-[44px]">Contact via Form</a>
          </div>
        </div>
      </section>
    </main>
  );
}

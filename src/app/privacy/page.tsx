import type { Metadata } from "next";
import SectionHeader from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Syren Travel",
  description: "Syren Travel privacy policy: how we collect, use and protect your personal data for Egypt travel experiences and packages.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Syren Travel",
    description: "Syren Travel privacy policy: how we collect, use and protect your personal data for Egypt travel experiences and packages.",
    url: "https://www.syrentravel.com/privacy",
    type: "website",
    images: [{ url: "https://www.syrentravel.com/images/hero/luxury.jpg", width: 1200, height: 630, alt: "Syren Travel Egypt" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <h1 className="sr-only">Privacy Policy</h1>
      <section className="section">
        <div className="mx-auto max-w-4xl container-x">
          <SectionHeader title="Privacy Policy" label="Your Privacy Matters to Us" className="mb-8" />
          <p className="mb-2 text-sm text-text-secondary">Last updated: February 24th, 2026</p>
          <p className="mb-6">
            Syren Travel (“we,” “us,” or “our”) respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains what information we collect, how we use it, and your rights when you
            use our website or contact us to arrange travel services.
          </p>
          <p className="mb-10">
            By using our website or booking with Syren Travel, you agree to the terms outlined below.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">1) Information We Collect</h2>
          <h3 className="font-serif text-xl text-text-primary mb-2">Information You Provide to Us</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Nationality and country of residence</li>
            <li>Travel preferences and special requests</li>
            <li>Travel dates, destinations, and number of travelers</li>
            <li>Information submitted through contact forms, email, phone, or WhatsApp</li>
            <li>Payment and billing information (processed securely via third-party providers)</li>
          </ul>
          <h3 className="font-serif text-xl text-text-primary mb-2">Information Collected Automatically</h3>
          <ul className="list-disc ml-6 mb-10">
            <li>IP address</li>
            <li>Device type and browser information</li>
            <li>Pages visited and interactions</li>
            <li>Approximate location (country/city level)</li>
            <li>Cookies and advertising identifiers</li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">2) How We Use Your Information</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Respond to inquiries and provide travel quotations</li>
            <li>Arrange and manage your travel services</li>
            <li>Provide customer support before and during your trip</li>
            <li>Process payments securely and prevent fraud</li>
            <li>Improve our website, services, and user experience</li>
            <li>Send booking confirmations and trip updates</li>
            <li>Send marketing communications (where permitted by law)</li>
          </ul>
          <p className="mb-10">We do not sell your personal data for monetary gain.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">3) Advertising, Analytics &amp; Remarketing</h2>
          <p className="mb-4">We may use third-party services such as:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Google Analytics</li>
            <li>Google Ads</li>
            <li>Meta (Facebook &amp; Instagram) advertising tools</li>
          </ul>
          <p className="mb-4">These tools help us:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Understand website usage</li>
            <li>Measure advertising performance</li>
            <li>Show relevant travel advertisements (remarketing)</li>
          </ul>
          <p className="mb-4">To do this, certain data may be collected or shared, including:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Website activity (pages viewed, actions taken)</li>
            <li>Device and browser data</li>
            <li>IP address</li>
            <li>Cookie or advertising identifiers</li>
          </ul>
          <p className="mb-6">
            In some cases, limited customer information (such as encrypted/hashed email addresses) may be shared with advertising
            platforms for audience measurement or enhanced conversions. These platforms may combine this information with other data
            they hold, in accordance with their own privacy policies.
          </p>
          <p className="mb-10">
            You may control cookies via your browser settings and available cookie banners. You can also manage ad preferences through
            Google and Meta ad settings.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">4) When We Share Your Information</h2>
          <p className="mb-4">We may share personal data only when necessary with:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Hotels and accommodation providers</li>
            <li>Airlines and transport providers</li>
            <li>Cruise operators</li>
            <li>Tour guides and local service providers</li>
            <li>Payment processors</li>
            <li>Communication and CRM systems</li>
            <li>Advertising and analytics partners (as described above)</li>
            <li>Government or legal authorities when required by law</li>
          </ul>
          <p className="mb-10">We do not share your information with third parties for their own independent marketing purposes.</p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">5) International Customers &amp; Data Transfers</h2>
          <p className="mb-10">
            Syren Travel serves travelers globally. Your information may be processed outside your country of residence, including
            countries with different data protection laws. Where legally required (e.g., under GDPR), we apply appropriate safeguards
            such as Standard Contractual Clauses to protect international data transfers.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">6) Legal Basis (EEA / UK / Switzerland)</h2>
          <ul className="list-disc ml-6 mb-10">
            <li>Performance of a contract (arranging your travel services)</li>
            <li>Your consent (marketing communications and certain cookies)</li>
            <li>Legitimate business interests (service improvement, fraud prevention, marketing)</li>
            <li>Compliance with legal obligations</li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">7) Your Rights</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Object to certain types of processing (including marketing)</li>
            <li>Restrict processing</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Opt out of targeted advertising</li>
          </ul>
          <p className="mb-10">
            To exercise your rights, please contact us at: <span className="underline">info@syren-travel.com</span> (You can update this to your official email)
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">8) Data Retention</h2>
          <ul className="list-disc ml-6 mb-10">
            <li>Provide requested travel services</li>
            <li>Maintain business and financial records</li>
            <li>Comply with tax and legal requirements</li>
            <li>Resolve disputes</li>
            <li>Prevent fraud</li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">9) Security</h2>
          <p className="mb-10">
            We implement reasonable administrative, technical, and physical safeguards to protect your personal information.
            However, no internet transmission method is 100% secure.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">10) Children’s Privacy</h2>
          <p className="mb-10">
            Our website and services are not intended for children under 13 years of age. We do not knowingly collect personal
            information from children.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">11) Third-Party Links</h2>
          <p className="mb-10">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those
            external websites.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-3">12) Contact Us</h2>
          <p className="mb-2">If you have questions about this Privacy Policy or wish to exercise your rights, please contact:</p>
          <ul className="list-disc ml-6">
            <li>Syren Travel</li>
            <li>Email: <span className="underline">info@syrentravel.com</span></li>
            <li>Website: www.syrentravel.com</li>
          </ul>
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

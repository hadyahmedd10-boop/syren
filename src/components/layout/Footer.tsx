"use client";

import Link from "next/link"
import { SOCIAL_LINKS, WHATSAPP_LINK, SOCIAL_EVENTS } from "@/config/social";
import { trackCta } from "@/lib/track";
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import TrustpilotWidget from "@/components/ui/TrustpilotWidget";

export default function Footer() { 
  return ( 
    <footer className="bg-footer section-tight border-t border-border"> 
      <div className="max-w-7xl mx-auto container-x grid md:grid-cols-6 gap-8 md:gap-10"> 
        
        <div className="md:col-span-1"> 
          <h3 className="font-serif text-2xl mb-4">Syren</h3> 
          <p className="text-sm opacity-70 font-sans"> 
            Curated journeys through Egypt — guided by soul, crafted with care. 
          </p> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Explore</h4> 
          <ul className="space-y-2 text-sm opacity-70 font-sans"> 
            <li><Link href="/destinations" className="hover:text-accent-gold transition-colors">Destinations</Link></li> 
            <li><Link href="/experiences" className="hover:text-accent-gold transition-colors">Experiences</Link></li> 
            <li><Link href="/excursions" className="hover:text-accent-gold transition-colors">Excursions</Link></li> 
            <li><Link href="/egypt-holiday-packages" className="hover:text-accent-gold transition-colors">Holiday Packages</Link></li> 
            <li><Link href="/saved" className="hover:text-accent-gold transition-colors">Saved</Link></li>
            <li><Link href="/reviews" className="hover:text-accent-gold transition-colors">Traveler Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-accent-gold transition-colors">Contact</Link></li> 
            <li><Link href="/terms" className="hover:text-accent-gold transition-colors">Terms of Service</Link></li> 
            <li><Link href="/privacy" className="hover:text-accent-gold transition-colors">Privacy Policy</Link></li> 
          </ul> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Travel Guides</h4> 
          <ul className="space-y-2 text-sm opacity-70 font-sans"> 
            <li><Link href="/is-egypt-safe" className="hover:text-accent-gold transition-colors">Is Egypt Safe?</Link></li> 
            <li><Link href="/best-time-to-visit-egypt" className="hover:text-accent-gold transition-colors">Best Time to Visit</Link></li> 
            <li><Link href="/egypt-travel-tips" className="hover:text-accent-gold transition-colors">Egypt Travel Tips</Link></li> 
            <li><Link href="/hurghada-to-cairo-day-trip" className="hover:text-accent-gold transition-colors">Hurghada to Cairo</Link></li> 
            <li><Link href="/things-to-do-cairo" className="hover:text-accent-gold transition-colors">Things to Do in Cairo</Link></li> 
            <li><Link href="/egypt-music-festivals-2026" className="hover:text-accent-gold transition-colors">Egypt Music Festivals 2026</Link></li> 
          </ul> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Help Center</h4> 
          <ul className="space-y-2 text-sm opacity-70 font-sans"> 
            <li><Link href="/faq" className="hover:text-accent-gold transition-colors">FAQ</Link></li> 
            <li><Link href="/contact" className="hover:text-accent-gold transition-colors">Concierge Support</Link></li> 
          </ul> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Plan Your Trip</h4> 
          <ul className="space-y-2 text-sm opacity-70 font-sans"> 
            <li><Link href="/egypt-travel-europe" className="hover:text-accent-gold transition-colors">Traveling from Europe</Link></li> 
            <li><Link href="/egypt-travel-gulf" className="hover:text-accent-gold transition-colors">Traveling from the Gulf</Link></li> 
            <li><Link href="/egypt-travel-latin-america" className="hover:text-accent-gold transition-colors">Traveling from Latin America</Link></li> 
            <li><Link href="/zamna-egypt-travel" className="hover:text-accent-gold transition-colors">Zamna Egypt Travel</Link></li> 
            <li><Link href="/sandbox-festival-egypt" className="hover:text-accent-gold transition-colors">Sandbox Festival Guide</Link></li> 
            <li><Link href="/luxury-egypt-tours" className="hover:text-accent-gold transition-colors">Luxury Egypt Tours</Link></li> 
          </ul> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Work With Us</h4> 
          <ul className="space-y-2 text-sm opacity-70 font-sans"> 
            <li><Link href="/partner" className="hover:text-accent-gold transition-colors">Partner Program</Link></li> 
          </ul> 
        </div> 

        <div className="flex flex-col items-center">
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Connect</h4> 
          <ul className="text-sm opacity-70 font-sans">
            <li className="flex items-center gap-4">
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent-gold transition-colors inline-flex"
                aria-label="Follow Syren on Instagram"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent-gold transition-colors inline-flex"
                aria-label="Connect with Syren on LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent-gold transition-colors inline-flex"
                aria-label="Contact Syren via WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a 
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="hover:text-accent-gold transition-colors inline-flex"
                aria-label="Email Syren"
                title="Email"
              >
                <Mail className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Updates</h4> 
          <p className="text-sm opacity-70 font-sans mb-4"> 
            WhatsApp & Private Concierge available 24/7 
          </p> 
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const button = form.querySelector('button');
              if (button) button.disabled = true;
              
              try {
                await fetch('/api/notify/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: 'Newsletter Subscriber',
                    email: email,
                    subject: 'Newsletter Signup',
                    message: 'New newsletter signup from footer/CTA.',
                    pathname: window.location.pathname
                  })
                });
                alert('Thank you for joining our updates!');
                form.reset();
              } catch (err) {
                console.error('Newsletter error:', err);
              } finally {
                if (button) button.disabled = false;
              }
            }}
          > 
            <input placeholder="Email" name="email" type="email" className="input mb-2" required /> 
            <button type="submit" className="btn-secondary w-full min-h-[44px] text-sm">Join Updates</button> 
          </form> 
        </div> 
      </div> 

      <div className="flex justify-center mb-6 pt-6 border-t border-border">
        <TrustpilotWidget variant="micro" height="24px" />
      </div>
      <div className="text-center mt-16 text-xs opacity-40 font-sans tracking-widest">
        © {new Date().getFullYear()} Syren. All rights reserved.
      </div>
    </footer> 
  ) 
}

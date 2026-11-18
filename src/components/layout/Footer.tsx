"use client";

import Link from "next/link"
import { SOCIAL_LINKS, WHATSAPP_LINK } from "@/config/social";
import { openCookieSettings } from "@/lib/consent";
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import TrustpilotWidget from "@/components/ui/TrustpilotWidget";

export default function Footer() { 
  return ( 
    <footer className="bg-footer section-tight border-t border-border"> 
      <div className="max-w-7xl mx-auto container-x grid gap-8 md:grid-cols-6 md:gap-10"> 
        
        <div className="md:col-span-1"> 
          <h3 className="font-serif text-2xl mb-4">Syren</h3> 
          <p className="text-sm text-text-secondary font-sans"> 
            Curated journeys through Egypt — guided by soul, crafted with care. 
          </p> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Explore</h4> 
          <ul className="space-y-2 text-sm text-text-secondary font-sans"> 
            <li><Link href="/destinations" className="hover:text-accent-gold-ink transition-colors">Destinations</Link></li> 
            <li><Link href="/experiences" className="hover:text-accent-gold-ink transition-colors">Experiences</Link></li> 
            <li><Link href="/excursions" className="hover:text-accent-gold-ink transition-colors">Excursions</Link></li> 
            <li><Link href="/transfers" className="hover:text-accent-gold-ink transition-colors">Private Transfers</Link></li> 
            <li><Link href="/egypt-holiday-packages" className="hover:text-accent-gold-ink transition-colors">Holiday Packages</Link></li> 
            <li><Link href="/reviews" className="hover:text-accent-gold-ink transition-colors">Reviews</Link></li> 
            <li><Link href="/saved" className="hover:text-accent-gold-ink transition-colors">Saved</Link></li>
          </ul> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Festival Travel</h4> 
          <ul className="space-y-2 text-sm text-text-secondary font-sans"> 
            <li><Link href="/festival-travel-egypt" className="hover:text-accent-gold-ink transition-colors">Festival Travel Egypt</Link></li> 
            <li><Link href="/anyma-egypt-2027" className="hover:text-accent-gold-ink transition-colors">Anyma Egypt 2027</Link></li> 
            <li><Link href="/starlight-festival-egypt" className="hover:text-accent-gold-ink transition-colors">Starlight Festival</Link></li> 
            <li><Link href="/zamna-egypt-travel" className="hover:text-accent-gold-ink transition-colors">Zamna Egypt</Link></li> 
            <li><Link href="/events" className="hover:text-accent-gold-ink transition-colors">All Events</Link></li> 
          </ul> 
        </div> 

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Help</h4> 
          <ul className="space-y-2 text-sm text-text-secondary font-sans"> 
            <li><Link href="/faq" className="hover:text-accent-gold-ink transition-colors">FAQ</Link></li> 
            <li><Link href="/contact" className="hover:text-accent-gold-ink transition-colors">Contact</Link></li> 
          </ul> 
        </div>

        <div> 
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Work With Us</h4> 
          <ul className="space-y-2 text-sm text-text-secondary font-sans"> 
            <li><Link href="/partner" className="hover:text-accent-gold-ink transition-colors">Partner Program</Link></li> 
          </ul> 
        </div> 

        <div className="flex flex-col md:items-start">
          <h4 className="mb-4 font-semibold font-sans uppercase tracking-widest text-xs">Connect</h4> 
          <ul className="text-sm text-text-secondary font-sans">
            <li className="flex items-center gap-4">
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent-gold-ink transition-colors inline-flex"
                aria-label="Follow Syren on Instagram"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent-gold-ink transition-colors inline-flex"
                aria-label="Connect with Syren on LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent-gold-ink transition-colors inline-flex"
                aria-label="Contact Syren via WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a 
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="hover:text-accent-gold-ink transition-colors inline-flex"
                aria-label="Email Syren"
                title="Email"
              >
                <Mail className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div> 

      <div className="flex justify-center mb-6 pt-6 border-t border-border mt-10">
        <TrustpilotWidget variant="micro" height="24px" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-3 gap-y-2 px-[var(--container-x)] text-xs text-text-secondary font-sans sm:flex-row sm:flex-wrap">
        <Link href="/terms" className="hover:text-accent-gold-ink transition-colors">Terms</Link>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <Link href="/privacy" className="hover:text-accent-gold-ink transition-colors">Privacy</Link>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <button
          type="button"
          onClick={openCookieSettings}
          className="hover:text-accent-gold-ink transition-colors"
        >
          Cookie settings
        </button>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>© {new Date().getFullYear()} Syren. All rights reserved.</span>
      </div>
    </footer> 
  ) 
}

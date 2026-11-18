"use client";
import { MessageCircle } from "lucide-react";
import { useConsent } from "@/providers/ConsentProvider";

const WHATSAPP_NUMBER = "201016015723";
const PREFILL = "Hi Syren, I'm interested in planning a trip to Egypt";
const HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;
const GOLD = "#C9A84C";

export default function FloatingWhatsAppFab() {
  const { isOpen } = useConsent();

  // Lift the button above the cookie banner while it is visible, and keep it
  // clear of the home indicator with safe-area padding.
  const positionClass = isOpen
    ? "bottom-[calc(19rem+env(safe-area-inset-bottom))] md:bottom-[calc(3rem+env(safe-area-inset-bottom))]"
    : "bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]";

  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed right-6 z-50 block h-14 w-14 rounded-full shadow-lg transition-[bottom] duration-300 ${positionClass}`}
      style={{ backgroundColor: GOLD }}
      aria-label="Chat with us on WhatsApp"
    >
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-75"
        style={{ backgroundColor: GOLD }}
        aria-hidden
      />
      <div className="relative flex h-full w-full items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110">
        <MessageCircle size={26} className="text-text-dark" aria-hidden />
      </div>
      <div
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-xs text-white opacity-0 shadow transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      >
        Chat with us on WhatsApp
      </div>
    </a>
  );
}

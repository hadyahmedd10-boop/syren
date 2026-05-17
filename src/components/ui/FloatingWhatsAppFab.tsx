"use client";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "201016015723";
const PREFILL = "Hi Syren, I'm interested in planning a trip to Egypt";
const HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;
const GREEN = "#25D366";

export default function FloatingWhatsAppFab() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-24 md:bottom-6 z-50"
      aria-label="Chat with us on WhatsApp"
    >
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-75"
        style={{ backgroundColor: GREEN }}
        aria-hidden
      />
      <div
        className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: GREEN }}
      >
        <MessageCircle size={26} className="text-white" aria-hidden />
      </div>
      <div
        className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 text-white px-3 py-1 text-xs opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow"
      >
        Chat with us on WhatsApp
      </div>
    </a>
  );
}

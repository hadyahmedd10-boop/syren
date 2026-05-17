"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { BookingModalHandle } from "@/components/ui/BookingModal";
const BookingModal = dynamic(() => import("@/components/ui/BookingModal"), { ssr: false });

export default function EventMobileBar({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<BookingModalHandle | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      const io = new IntersectionObserver(
        (entries) => {
          const onScreen = entries[0]?.isIntersecting ?? false;
          setVisible(!onScreen);
        },
        { threshold: 0.2 }
      );
      io.observe(hero);
      return () => io.disconnect();
    } else {
      const onScroll = () => {
        setVisible(window.scrollY > 200);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <>
      <div className={`md:hidden fixed left-0 right-0 bottom-0 h-16 pb-[env(safe-area-inset-bottom)] border-t border-accent-gold/30 bg-black/90 backdrop-blur-md z-40 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg text-accent-gold leading-none">{title}</span>
            <span className="text-[10px] text-white/60 uppercase tracking-[0.2em] mt-0.5">Concierge Booking</span>
          </div>
          <button
            onClick={() => modalRef.current?.open()}
            className="syren-btn px-5 py-2"
            aria-label="Plan this experience"
          >
            Plan Now
          </button>
        </div>
      </div>
      <BookingModal
        ref={modalRef}
        experienceTitle={title}
        experienceSlug={slug}
        basePriceAmount={undefined}
        basePriceCurrency="USD"
        perPerson={false}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link" 
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { destinations } from "@/data/destinations";
import { SOCIAL_LINKS, WHATSAPP_LINK } from "@/config/social";
import ThemeToggle from "@/components/theme/ThemeToggle";

function Logo({ className = "", onClick, href = "/home#hero" }: { className?: string; onClick?: (e: React.MouseEvent) => void; href?: string }) {
  return (
    <Link 
      href={href} 
      scroll={true}
      onClick={onClick}
      className={`font-serif text-xl text-accent-gold tracking-tight inline-flex items-center gap-2 ${className}`}
    > 
      <svg
        aria-hidden="true"
        viewBox="0 0 154 161"
        width="20"
        height="20"
        className="text-accent-gold"
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M0 0 C25.08 0 50.16 0 76 0 C76 53.13 76 106.26 76 161 C50.92 161 25.84 161 0 161 C1.77949298 114.73318249 1.77949298 114.73318249 18 98.8125 C32.13236172 87.10149844 53.15699053 84.42552776 71 85 C71 84.34 71 83.68 71 83 C70.40832031 83.02320312 69.81664062 83.04640625 69.20703125 83.0703125 C60.09853807 83.27833681 60.09853807 83.27833681 57 81 C55.63766932 78.10746851 54.85955101 75.07243767 54 72 C49.95710341 59.35675975 44.08310228 47.68464532 32.5625 40.4375 C31.96356934 40.054729 31.36463867 39.67195801 30.74755859 39.27758789 C24.5171437 35.45065727 17.98148397 33.11142144 11 31 C12.18206282 36.38270342 12.18206282 36.38270342 15.81640625 40.17578125 C17.33156776 40.79106151 18.85737422 41.38051299 20.390625 41.94921875 C27.75196094 44.91358906 34.53952755 49.38619603 39 56 C39 56.66 39 57.32 39 58 C39.66 58 40.32 58 41 58 C44.71599947 64.90614995 47.84865481 71.19643819 49 79 C48 80 48 80 45.34375 80.20703125 C41.63015125 79.97710049 38.94346566 79.07718436 35.5 77.6875 C34.4171875 77.25824219 33.334375 76.82898438 32.21875 76.38671875 C29.08062449 75.03473507 26.03898521 73.56068367 23 72 C23 71.34 23 70.68 23 70 C22.25878906 69.75636719 21.51757812 69.51273437 20.75390625 69.26171875 C17.66072692 67.84455999 16.15371785 66.37238582 13.9375 63.8125 C12.96103516 62.70841797 12.96103516 62.70841797 11.96484375 61.58203125 C-0.65039783 45.00414917 0 20.06661613 0 0 Z " transform="translate(78,0)"/>
        <path d="M0 0 C25.41 0 50.82 0 77 0 C72.09322484 26.16946754 72.09322484 26.16946754 66 31 C63.94140625 31.921875 63.94140625 31.921875 61.5625 32.75 C48.93992753 37.61475786 38.60758216 44.5316688 32.0078125 56.53125 C31.67523437 57.0159375 31.34265625 57.500625 31 58 C30.34 58 29.68 58 29 58 C28.896875 58.680625 28.79375 59.36125 28.6875 60.0625 C28.02049317 62.91243827 27.03022317 65.38653381 25.7890625 68.03125 C24.9221404 70.02359675 24.9221404 70.02359675 24.5234375 72.34375 C23.96513447 74.91027738 23.4193092 76.78232937 22 79 C15.39576107 82.53143332 7.21716104 82.34389445 0 83 C0 55.61 0 28.22 0 0 Z " transform="translate(0,0)"/>
        <path d="M0 0 C16.875 1.125 16.875 1.125 23 2 C23.17015625 2.81082031 23.3403125 3.62164062 23.515625 4.45703125 C25.99641698 15.79213931 29.02975218 25.15070855 35.609375 34.78515625 C37 37 37 37 37 39 C37.58523437 39.27199219 38.17046875 39.54398438 38.7734375 39.82421875 C40.96149162 40.97966487 42.70278698 42.26246014 44.625 43.8125 C50.89478775 48.56409515 57.1681256 51.69108035 64.875 53.3125 C69.53587736 54.49413088 69.53587736 54.49413088 71.4765625 56.609375 C72.57893884 58.71314663 73.31330816 60.72628701 74 63 C74.29390625 63.87140625 74.5878125 64.7428125 74.890625 65.640625 C76.03731611 69.20579192 77 72.23804046 77 76 C51.59 76 26.18 76 0 76 C0 50.92 0 25.84 0 0 Z " transform="translate(0,85)"/>
        <path d="M0 0 C9.54668823 1.3564539 18.60939075 9.0788496 25 16 C27.58830829 19.53500471 29.84508597 23.18791024 32 27 C32.928125 28.6396875 32.928125 28.6396875 33.875 30.3125 C35.08975901 33.2144243 35.62898534 35.88347684 36 39 C33 40 33 40 30.6953125 39.109375 C29.84710938 38.66078125 28.99890625 38.2121875 28.125 37.75 C27.24328125 37.28464844 26.3615625 36.81929687 25.453125 36.33984375 C24.64359375 35.89769531 23.8340625 35.45554688 23 35 C21.96875 34.443125 20.9375 33.88625 19.875 33.3125 C19.25625 32.879375 18.6375 32.44625 18 32 C18 31.34 18 30.68 18 30 C17.40058594 29.731875 16.80117188 29.46375 16.18359375 29.1875 C8.61783678 25.07302752 4.50679997 15.76148792 2.0234375 7.9140625 C1.30024559 5.28488816 0.62084838 2.65501015 0 0 Z " transform="translate(31,92)"/>
        <path d="M0 0 C-0.15305023 8.87691323 -3.84684234 15.37684116 -8 23 C-8.66 23 -9.32 23 -10 23 C-10.23976562 23.73347656 -10.47953125 24.46695313 -10.7265625 25.22265625 C-14.90122339 34.32751482 -25.25765912 39.22572042 -34 43 C-34.77988281 43.35191406 -35.55976562 43.70382813 -36.36328125 44.06640625 C-40.25468768 45.70065038 -42.94627712 46.39346724 -47 45 C-46.96875 42.21484375 -46.96875 42.21484375 -46 39 C-43.42491149 37.53158643 -41.25210338 36.54400645 -38.5 35.5625 C-28.96700047 31.7879432 -19.77936932 26.55873865 -15 17 C-14.34 17 -13.68 17 -13 17 C-12.7525 16.175 -12.505 15.35 -12.25 14.5 C-8.57009346 4.19626168 -8.57009346 4.19626168 -4.375 1 C-2 0 -2 0 0 0 Z " transform="translate(133,95)"/>
        <path d="M0 0 C-2.1979533 12.82517079 -10.93005567 22.56252915 -21.24414062 29.97045898 C-28.5004012 35 -28.5004012 35 -31 35 C-30.54708774 24.58301807 -23.30818995 15.93815502 -16 9 C-8.26804124 3 -8.26804124 3 -5 3 C-5 2.34 -5 1.68 -5 1 C-2 0 -2 0 0 0 Z " transform="translate(63,40)"/>
      </svg>
      SYREN 
    </Link>
  );
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 10 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Navbar() { 
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isClient = typeof document !== "undefined" && !!document.body;

  const logoHref = "/home#hero";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/home" || pathname === "/") {
      const hero = document.getElementById("hero");
      if (hero) {
        e.preventDefault();
        hero.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMapOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
    setIsMapOpen(false);
    setIsMobileMapOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

const toggleMenu = () => {
  setIsMenuOpen((open) => {
    const next = !open;
    if (!next) setIsMobileMapOpen(false); // closing menu
    return next;
  });
};


  return ( 
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
        : "bg-transparent"
    } ${!isScrolled ? "text-text-primary" : "text-text-primary"}`}>
      <div className={`absolute inset-0 bg-gradient-to-b from-background/90 to-transparent pointer-events-none transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />
      {/* Mobile Navbar */}
      <div className="relative md:hidden flex items-center justify-between px-6 h-20"> 
        <Logo className="h-7 w-auto relative z-10" onClick={handleLogoClick} href={logoHref} /> 
        
        <div className="flex items-center gap-2 relative z-10">
          <ThemeToggle className="px-2 py-2" />
          <Link 
            href="/experiences" 
            className="syren-btn-primary syren-nav-cta px-3 py-1 text-[10px] leading-none"
          > 
            Explore Experiences
          </Link> 
        
          <button 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu} 
            className="hover:text-accent-gold transition-colors" 
          > 
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button> 
        </div>

      </div>

      {/* Desktop Navbar (Hidden on mobile, present for future expansion) */}


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[10000] bg-background/98 backdrop-blur-xl overflow-y-auto pointer-events-auto flex flex-col"
          >
              {/* Top Section */}
              <div className="flex items-start justify-between px-6 pt-8 pb-4">
                <div className="flex flex-col gap-1">
                  <Logo className="text-3xl" onClick={handleLogoClick} href={logoHref} />
                  <span className="text-xs text-text-secondary font-serif italic tracking-wide">Private journeys across Egypt</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-accent-gold transition-colors pt-2"
                >
                  Close
                  <X size={16} />
                </button>
              </div>

              {/* Primary Navigation */}
              <div className="flex-1 flex flex-col justify-center px-8 gap-8">
                
                <motion.div variants={itemVariants}>
                  <Link href="/experiences" className="font-serif text-3xl text-text-primary hover:text-accent-gold transition-colors block">
                    Experiences
                  </Link>
                </motion.div>

                {/* The Map Accordion */}
                <motion.div variants={itemVariants}>
                  <button 
                    onClick={() => setIsMobileMapOpen(!isMobileMapOpen)}
                    aria-expanded={isMobileMapOpen}
                    className="flex items-center gap-3 group w-full text-left"
                  >
                    <span className="font-serif text-3xl text-text-primary group-hover:text-accent-gold transition-colors">The Map</span>
                    <ChevronDown size={20} className={`text-accent-gold/50 transition-transform duration-500 ${isMobileMapOpen ? 'rotate-180 text-accent-gold' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileMapOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 mt-4 pl-4 border-l border-border ml-1.5">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-1 block">Destinations</span>
                          {destinations.map((dest) => (
                            <Link 
                              key={dest.slug} 
                              href={`/destinations/${dest.slug}`} 
                              className="group block"
                            >
                              <span className="block font-serif text-lg text-text-primary/80 group-hover:text-accent-gold transition-colors">
                                {dest.name}
                              </span>
                            </Link>
                          ))}
                          <Link 
                            href="/destinations" 
                            className="mt-2 text-[10px] uppercase tracking-[0.2em] text-accent-gold/70 hover:text-accent-gold transition-colors"
                          >
                            View All Destinations
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link href="/about" className="font-serif text-3xl text-text-primary hover:text-accent-gold transition-colors block">
                    About
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link href="/quote" className="font-serif text-3xl text-text-primary hover:text-accent-gold transition-colors block">
                    Contact
                  </Link>
                </motion.div>
              </div>
              
              {/* Footer (Quiet Trust Layer) */}
              <motion.div 
                variants={itemVariants}
                className="px-8 pb-16 pt-8"
              >
                <div className="flex flex-col gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="font-serif text-lg text-text-primary hover:text-accent-gold transition-colors">{SOCIAL_LINKS.email}</a>
                  <div className="flex gap-6">
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-text-primary hover:text-accent-gold transition-colors">Instagram</a>
                    <a href="#" className="text-[10px] uppercase tracking-widest text-text-primary hover:text-accent-gold transition-colors">LinkedIn</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


{/* Duplicate removed */}

      {/* Desktop Navbar */}
      <nav className="hidden md:flex max-w-7xl mx-auto container-x h-20 items-center justify-between"> 
        
        {/* LOGO */} 
        <Logo className="text-2xl" onClick={handleLogoClick} href={logoHref} /> 
 
         {/* LINKS */} 
         <div className="flex gap-10 text-sm tracking-wide"> 
           <div className="relative" ref={dropdownRef}>
             <button 
               onClick={() => setIsMapOpen(!isMapOpen)}
               aria-expanded={isMapOpen}
               aria-haspopup="true"
               className="flex items-center gap-1.5 hover:text-accent-gold transition-colors"
             >
               The Map
               <ChevronDown size={14} className={`transition-transform duration-300 ${isMapOpen ? 'rotate-180' : ''}`} />
             </button>

             <AnimatePresence>
               {isMapOpen && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10 }}
                   className="absolute top-full left-0 mt-4 w-64 bg-background/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-xl z-50 text-text-primary"
                 >
                   <div className="p-2">
                     <p className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-accent-gold/60 font-bold">Destinations</p>
                     {destinations.map((dest) => (
                       <Link
                         key={dest.slug}
                         href={`/destinations/${dest.slug}`}
                         className="flex flex-col px-4 py-3 rounded-lg hover:bg-accent-gold/10 transition-colors group"
                       >
                         <span className="text-sm font-medium group-hover:text-accent-gold transition-colors">{dest.name}</span>
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60 group-hover:text-accent-gold/60 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(196,160,82,0.2)] line-clamp-1">{dest.tagline}</span>
                       </Link>
                     ))}
                     <div className="mt-2 pt-2 border-t border-border/50">
                       <Link
                         href="/destinations"
                         className="flex items-center justify-center py-2 text-[11px] uppercase tracking-widest text-accent-gold hover:underline"
                       >
                         View All Destinations
                       </Link>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
           <Link href="/experiences" className="hover:text-accent-gold transition-colors">Experiences</Link> 
           <Link href="/about" className="hover:text-accent-gold transition-colors">About</Link> 
           <Link href="/quote" className="text-accent-gold hover:text-accent-gold/80 transition-colors"> 
            Contact 
          </Link> 
        </div> 

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* CTA */} 
          <Link 
            href="/experiences" 
            className="syren-btn-primary min-h-[auto] px-4 py-1.5 text-[12px] leading-none xl:px-5 xl:py-2 xl:text-[13px]" 
          > 
            Explore Experiences 
          </Link> 
        </div>
      </nav> 
    </header> 
  ) 
}

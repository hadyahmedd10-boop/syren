 "use client";
 
 import { useEffect, useMemo, useState } from "react";
 import { eventCategories } from "@/data/events";
 
 function slugify(input: string) {
   return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
 }
 
 export default function EventsCategoryNav() {
   const ids = useMemo(
     () => eventCategories.map((c) => `cat-${slugify(c)}`),
     []
   );
   const [activeId, setActiveId] = useState(ids[0]);
 
   useEffect(() => {
     const elements = ids
       .map((id) => document.getElementById(id))
       .filter((el): el is HTMLElement => Boolean(el));
     if (!elements.length) return;
 
     const observer = new IntersectionObserver(
       (entries) => {
         const visible = entries
           .filter((e) => e.isIntersecting)
           .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
         if (visible[0]?.target?.id) {
           setActiveId(visible[0].target.id);
         }
       },
       { rootMargin: "-20% 0px -55% 0px", threshold: [0.35, 0.5, 0.75] }
     );
     elements.forEach((el) => observer.observe(el));
     return () => observer.disconnect();
   }, [ids]);
 
   const scrollTo = (id: string) => {
     const prefersReduced =
       typeof window !== "undefined" &&
       window.matchMedia("(prefers-reduced-motion: reduce)").matches;
     document.getElementById(id)?.scrollIntoView({
       behavior: prefersReduced ? "auto" : "smooth",
       block: "start",
     });
   };
 
   return (
     <div className="sticky top-[76px] z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
       <div className="mx-auto max-w-7xl px-4">
         <div
           className="
             flex items-center gap-2 overflow-x-auto whitespace-nowrap py-2
             [-ms-overflow-style:none] [scrollbar-width:none]
           "
           style={{ WebkitOverflowScrolling: "touch" }}
         >
          <style>{`.sticky::-webkit-scrollbar{display:none}`}</style>
           {eventCategories.map((cat) => {
             const id = `cat-${slugify(cat)}`;
             const active = activeId === id;
             return (
               <button
                 key={cat}
                 onClick={() => scrollTo(id)}
                 className={`
                  relative rounded-full px-3 py-3 min-h-[44px] text-sm font-bold uppercase tracking-[0.22em]
                   transition-all
                   ${
                     active
                       ? "text-black bg-accent-gold shadow-[0_0_0_1px_rgba(212,175,55,0.22)]"
                       : "text-text-secondary hover:text-text-primary hover:bg-text-primary/5"
                   }
                 `}
               >
                <span className="block max-w-[220px] truncate">{cat}</span>
               </button>
             );
           })}
         </div>
       </div>
     </div>
   );
 }
 

 "use client";
 
 import { useEffect } from "react";
 
 /**
  * Dev-only safeguard to prevent runtime crashes from Performance.measure
  * when upstream libraries produce invalid (negative) timestamps.
  * This shim is non-invasive and only active in development.
  */
 export default function PerfSafe() {
   useEffect(() => {
     if (process.env.NODE_ENV !== "development") return;
     const perf: Performance | undefined = (typeof window !== "undefined" ? window.performance : undefined);
     if (!perf || typeof perf.measure !== "function") return;
 
     const original = perf.measure.bind(perf);
     // @ts-expect-error - augment Performance API dynamically
     perf.measure = function (...args: any[]) {
       try {
         return original(...args);
       } catch (err) {
         // Silently swallow dev-only measurement errors to avoid user-facing crashes
         console.warn("[PerfSafe] Suppressed Performance.measure error:", err);
         return undefined as any;
       }
     };
   }, []);
   return null;
 }
 

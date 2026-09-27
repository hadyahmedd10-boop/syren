import type { Metadata } from "next";
import SplashClient from "@/components/landing/SplashClient";

export const metadata: Metadata = {
  title: "Syren | Egypt Travel Agency — Experiences, Events & Tours",
  description: "Syren is Egypt's premier travel agency. Curated journeys, international music events, private tours, and bespoke experiences across Cairo, the Nile, and the Red Sea.",
  alternates: {
    canonical: "/home",
  },
};

export default function SplashPage() {
  return <SplashClient />;
}

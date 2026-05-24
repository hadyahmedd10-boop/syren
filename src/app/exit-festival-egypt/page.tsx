import type { Metadata } from "next";
import ExitFestivalContent from "./ExitFestivalContent";

export const metadata: Metadata = {
  title: "Exit Festival Egypt 2026 — Travel Package | Syren",
  description:
    "Syren's curated Exit Festival Egypt package. 10 nights — Old Cairo, 4 nights at Exit by the Pyramids of Giza, Red Sea Hurghada. October 6-15, 2026. Everything handled.",
  keywords: [
    "exit festival egypt",
    "exit festival 2026",
    "exit festival pyramids",
    "egypt festival travel",
    "exit festival package",
    "cairo festival trip",
    "exit festival hurghada",
  ],
  alternates: { canonical: "/exit-festival-egypt" },
  openGraph: {
    title: "Exit Festival Egypt 2026 — Travel Package | Syren",
    description:
      "Syren's curated Exit Festival Egypt package. 10 nights — Old Cairo, 4 nights at Exit by the Pyramids of Giza, Red Sea Hurghada. October 6-15, 2026. Everything handled.",
    url: "https://www.syrentravel.com/exit-festival-egypt",
    images: [
      {
        url: "/images/events/exit-festival.png",
        width: 1200,
        height: 630,
        alt: "Exit Festival Egypt 2026 — Syren Travel Package",
      },
    ],
  },
};

export default function ExitFestivalEgyptPage() {
  return <ExitFestivalContent />;
}

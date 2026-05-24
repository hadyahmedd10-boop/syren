import { MetadataRoute } from "next";
import { events } from "@/data/events";
import { experiences } from "@/data/experiences";
import { excursions } from "@/data/excursions";
import { destinations } from "@/data/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.syrentravel.com";
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/experiences", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/destinations", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/excursions", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/quote", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/egypt-music-festivals-2026", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/zamna-egypt-travel", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/sandbox-festival-egypt", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/things-to-do-cairo", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/egypt-travel-europe", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/egypt-travel-gulf", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/egypt-travel-latin-america", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/is-egypt-safe", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/best-time-to-visit-egypt", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/egypt-travel-tips", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/hurghada-to-cairo-day-trip", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/luxury-egypt-tours", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/saved", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/home", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/egypt-holiday-packages", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/exit-festival-egypt", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/partner", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/reviews", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const experienceEntries: MetadataRoute.Sitemap = experiences.map((x) => ({
    url: `${base}/experiences/${x.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: ["exit-at-the-pyramids", "exit-cairo-festival-hurghada", "exit-festival-pyramids-only"].includes(x.slug) ? 0.9 : 0.8,
  }));
  const excursionEntries: MetadataRoute.Sitemap = excursions.map((x) => ({
    url: `${base}/excursions/${x.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const destinationEntries: MetadataRoute.Sitemap = destinations.map((x) => ({
    url: `${base}/destinations/${x.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...eventEntries, ...experienceEntries, ...excursionEntries, ...destinationEntries];
}

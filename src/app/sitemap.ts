import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.syrentravel.com/",
      lastModified: new Date(),
    },
    {
      url: "https://www.syrentravel.com/luxury-egypt-tours",
      lastModified: new Date(),
    },
  ];
}

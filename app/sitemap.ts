import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://flibber.xyz";
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    { url: `${base}/docs`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), priority: 0.3 },
  ];
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://broadlab.tv",           lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://broadlab.tv/system",    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://broadlab.tv/solutions", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://broadlab.tv/work",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://broadlab.tv/about",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://broadlab.tv/contact",   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}

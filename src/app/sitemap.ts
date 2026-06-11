import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://Broadlab.tv",           lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://Broadlab.tv/system",    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://Broadlab.tv/solutions", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://Broadlab.tv/work",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://Broadlab.tv/about",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://Broadlab.tv/contact",   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}

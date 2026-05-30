import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { categoryItems } from "@/data/categoryItems";
import { cities } from "@/data/cities";
import { places } from "@/data/places";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    }
  ];

  for (const city of cities) {
    routes.push(
      {
        url: `${siteUrl}/${city.id}/explore`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.95
      },
      {
        url: `${siteUrl}/${city.id}/guides`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8
      },
      {
        url: `${siteUrl}/${city.id}/cheat-sheet`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8
      }
    );

    for (const category of categories) {
      routes.push({
        url: `${siteUrl}/${city.id}/categories/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75
      });
    }

    for (const item of categoryItems.filter((entry) => entry.cityId === city.id)) {
      routes.push({
        url: `${siteUrl}/${city.id}/intel/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
      });
    }

    for (const place of places.filter((entry) => entry.cityId === city.id)) {
      routes.push({
        url: `${siteUrl}/${city.id}/places/${place.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.72
      });
    }
  }

  return routes;
}

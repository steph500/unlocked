import type { CategorySlug, CityId } from "./types";

export type CityImageSet = {
  hero: string;
  transport: string;
  culture: string;
  food: string;
  nightlife: string;
};

export const nairobiImages: CityImageSet = {
  hero: "/images/nairobi/kicc-night-skyline.jpg",
  transport: "/images/nairobi/matatu-rainy-street.jpg",
  culture: "/images/nairobi/art-courtyard-night.jpg",
  food: "/images/nairobi/street-food-night.jpg",
  nightlife: "/images/nairobi/rooftop-city-view.jpg"
};

export const cityImages: Record<CityId, CityImageSet> = {
  nairobi: nairobiImages,
  mombasa: {
    hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    transport: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    culture: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    food: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    nightlife: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
  }
};

export const nairobiCategoryImages: Partial<Record<CategorySlug, string>> = {
  "hidden-gems": nairobiImages.culture,
  "food-to-try": nairobiImages.food,
  "move-smart": nairobiImages.transport,
  "street-culture": nairobiImages.nightlife,
  "neighborhood-vibes": nairobiImages.nightlife,
  "good-to-know": nairobiImages.transport,
  "local-slang": nairobiImages.culture,
  guides: nairobiImages.hero
};

export const cityCategoryImages: Record<CityId, Partial<Record<CategorySlug, string>>> = {
  nairobi: nairobiCategoryImages,
  mombasa: {}
};

import type { CategorySlug, CityId } from "./types";

export type SeoTopic = {
  cityId: CityId;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  path: string;
};

export const seoTopics: SeoTopic[] = [
  {
    cityId: "nairobi",
    slug: "hidden-gems",
    title: "Hidden Gems in Nairobi | Unlocked",
    description: "Hidden gems in Nairobi with art spaces, calm escapes, and local spots that feel hand-passed, not search-ranked.",
    keywords: ["hidden gems Nairobi", "best hidden gems in Nairobi", "Nairobi secret spots", "Nairobi local places"],
    path: "/nairobi/categories/hidden-gems"
  },
  {
    cityId: "nairobi",
    slug: "food-to-try",
    title: "Food to Try in Nairobi | Nyama Choma, Mutura, Smocha",
    description: "Food to try in Nairobi including nyama choma, mutura, smocha, ugali, and the local orders people actually respect.",
    keywords: ["food to try in Nairobi", "nyama choma Nairobi", "mutura Nairobi", "smocha Nairobi", "Nairobi street food"],
    path: "/nairobi/categories/food-to-try"
  },
  {
    cityId: "nairobi",
    slug: "local-slang",
    title: "Nairobi Slang Guide | Sasa, Poa, Msee, Boda",
    description: "A Nairobi slang guide for common words like sasa, poa, msee, boda, matatu, and chapo.",
    keywords: ["Nairobi slang", "Kenyan slang", "Sheng guide", "sasa poa msee", "matatu meaning"],
    path: "/nairobi/categories/local-slang"
  },
  {
    cityId: "nairobi",
    slug: "move-smart",
    title: "Move Smart in Nairobi | Matatus, Traffic, Ride-Hailing",
    description: "Move smart in Nairobi with practical local context on matatus, traffic, pickup points, and ride-hailing.",
    keywords: ["move smart Nairobi", "matatu Nairobi", "Nairobi traffic tips", "ride hailing Nairobi"],
    path: "/nairobi/categories/move-smart"
  },
  {
    cityId: "nairobi",
    slug: "neighborhood-vibes",
    title: "Neighborhood Vibes in Nairobi | Rooftops, Courts, Calm Spots",
    description: "Neighborhood vibes in Nairobi with courts, parks, rooftops, and soft city hangouts.",
    keywords: ["neighborhood vibes Nairobi", "Nairobi rooftop views", "Nairobi basketball courts", "things to do in Nairobi neighborhoods"],
    path: "/nairobi/categories/neighborhood-vibes"
  },
  {
    cityId: "nairobi",
    slug: "good-to-know",
    title: "Good to Know in Nairobi | Local Etiquette and Tips",
    description: "Good to know Nairobi advice covering etiquette, timing, movement, and low-key practical tips.",
    keywords: ["Nairobi tips", "Nairobi etiquette", "Kenya travel tips", "Nairobi safety tips"],
    path: "/nairobi/categories/good-to-know"
  },
  {
    cityId: "nairobi",
    slug: "street-culture",
    title: "Street Culture in Nairobi | Matatus, Markets, Murals, Music",
    description: "Street culture in Nairobi with matatus, markets, murals, music, and the city pulse.",
    keywords: ["street culture Nairobi", "matatu art Nairobi", "Nairobi markets", "Nairobi street life"],
    path: "/nairobi/categories/street-culture"
  }
];

export const keywordClusters = [
  {
    label: "Food",
    keywords: ["nyama choma", "mutura", "smocha", "ugali", "street food Nairobi"]
  },
  {
    label: "Culture",
    keywords: ["hidden gems Nairobi", "street culture Nairobi", "Nairobi art spaces", "Maasai market"]
  },
  {
    label: "Movement",
    keywords: ["matatu Nairobi", "Nairobi traffic", "ride-hailing Nairobi", "move smart Nairobi"]
  },
  {
    label: "Language",
    keywords: ["Nairobi slang", "Sheng guide", "sasa poa", "Kenyan slang"]
  }
] as const;

export function getSeoTopic(cityId: CityId, slug: CategorySlug) {
  return seoTopics.find((topic) => topic.cityId === cityId && topic.slug === slug);
}

import type { CityImageSet } from "./cityImages";

export type CityId = "nairobi" | "mombasa";

export type CategorySlug =
  | "hidden-gems"
  | "food-to-try"
  | "local-slang"
  | "move-smart"
  | "neighborhood-vibes"
  | "good-to-know"
  | "street-culture"
  | "guides";

export type Category = {
  slug: CategorySlug;
  label: string;
  description: string;
};

export type City = {
  id: CityId;
  name: string;
  editionName: string;
  country: string;
};

export type CityTheme = {
  cityId: CityId;
  cityName: string;
  editionName: string;
  primaryColor: string;
  primaryColorName: string;
  backgroundMood: string;
  mood: string;
  heroTagline: string;
  categories: Category[];
  heroImage: string;
  imageSet: CityImageSet;
  categoryImages: Partial<Record<CategorySlug, string>>;
  accentPattern: string;
};

export type Place = {
  slug: string;
  cityId: CityId;
  name: string;
  category: string;
  categorySlug: CategorySlug;
  area: string;
  summary: string;
  description: string;
  localScore: number;
  image: string;
  mapQuery: string;
  whyGo: string;
  bestTime: string;
  whatToKnow: string;
  safetyNote: string;
  costEstimate: string;
  howToGetThere: string;
  tags: string[];
};


export type IntelItem = {
  slug: string;
  cityId: CityId;
  categorySlug: CategorySlug;
  title: string;
  kicker: string;
  area: string;
  image: string;
  summary: string;
  description: string;
  localPrice?: string;
  funFact?: string;
  bestTime?: string;
  dressCode?: string;
  howToGetThere?: string;
  localTip: string;
  safetyNote?: string;
  mapQuery?: string;
  tags: string[];
  details: string[];
};

export type Food = {
  cityId: CityId;
  name: string;
  note: string;
  image: string;
};

export type Slang = {
  cityId: CityId;
  word: string;
  meaning: string;
};

export type Tip = {
  cityId: CityId;
  section: "etiquette" | "local" | "movement";
  title: string;
  note: string;
  image: string;
};

export type Guide = {
  id: string;
  cityId: CityId;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  priceEstimate: string;
  image?: string;
  intro: string;
};

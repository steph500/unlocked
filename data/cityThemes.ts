import { categories } from "./categories";
import { cityCategoryImages, cityImages } from "./cityImages";
import type { CityTheme } from "./types";

export const cityThemes: CityTheme[] = [
  {
    cityId: "nairobi",
    cityName: "Nairobi",
    editionName: "Nairobi Edition",
    primaryColor: "#c8ff2f",
    primaryColorName: "neon lime",
    backgroundMood: "dark urban",
    mood: "raw, street-smart, culture-first",
    heroTagline: "The Nairobi they don't show on Google.",
    categories,
    heroImage: cityImages.nairobi.hero,
    imageSet: cityImages.nairobi,
    categoryImages: cityCategoryImages.nairobi,
    accentPattern: "grit-grid"
  },
  {
    cityId: "mombasa",
    cityName: "Mombasa",
    editionName: "Mombasa Edition",
    primaryColor: "#18c7d5",
    primaryColorName: "ocean blue and coral",
    backgroundMood: "coastal",
    mood: "Swahili coast, seafood, Old Town, beach culture",
    heroTagline: "The coast beyond the postcards.",
    categories,
    heroImage: cityImages.mombasa.hero,
    imageSet: cityImages.mombasa,
    categoryImages: cityCategoryImages.mombasa,
    accentPattern: "coastal-waves"
  }
];

import { cities } from "@/data/cities";
import { categoryItems } from "@/data/categoryItems";
import { cityThemes } from "@/data/cityThemes";
import { foods } from "@/data/foods";
import { guides } from "@/data/guides";
import { places } from "@/data/places";
import { slang } from "@/data/slang";
import { tips } from "@/data/tips";
import type { CategorySlug, CityId } from "@/data/types";

export function getCity(cityId: string) {
  return cities.find((city) => city.id === cityId) ?? cities[0];
}

export function getCityTheme(cityId: string) {
  return cityThemes.find((theme) => theme.cityId === cityId) ?? cityThemes[0];
}

export function getPlacesByCity(cityId: string) {
  return places.filter((place) => place.cityId === cityId);
}

export function getPlace(cityId: string, slug: string) {
  return places.find((place) => place.cityId === cityId && place.slug === slug);
}

export function getFoodsByCity(cityId: string) {
  return foods.filter((food) => food.cityId === cityId);
}

export function getSlangByCity(cityId: string) {
  return slang.filter((item) => item.cityId === cityId);
}

export function getTipsByCity(cityId: string, section?: "etiquette" | "local" | "movement") {
  const cityTips = tips.filter((tip) => tip.cityId === cityId);
  return section ? cityTips.filter((tip) => tip.section === section) : cityTips;
}

export function getGuidesByCity(cityId: string) {
  return guides.filter((guide) => guide.cityId === cityId);
}

export function getPlacesByCategory(cityId: string, category?: string | null) {
  const cityPlaces = getPlacesByCity(cityId);

  if (!category) {
    return cityPlaces;
  }

  return cityPlaces.filter((place) => place.categorySlug === category);
}

export function getCategoryItems(cityId: string, categorySlug?: string | null) {
  const cityItems = categoryItems.filter((item) => item.cityId === cityId);

  if (!categorySlug) {
    return cityItems;
  }

  return cityItems.filter((item) => item.categorySlug === categorySlug);
}

export function getCategoryItem(cityId: string, slug: string) {
  return categoryItems.find((item) => item.cityId === cityId && item.slug === slug);
}

export function getCategory(slug: string) {
  return getCityTheme("nairobi").categories.find((category) => category.slug === slug);
}

export function isSupportedCity(cityId: string): cityId is CityId {
  return cities.some((city) => city.id === cityId);
}

export function categoryHref(cityId: string, slug: CategorySlug) {
  return `/${cityId}/categories/${slug}`;
}

export function mapUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

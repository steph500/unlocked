export const SAVED_STORAGE_KEY = "unlocked.savedPlaces.v1";

export type SavedRecord = Record<string, string[]>;

export function getSavedFromStorage(): SavedRecord {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedRecord) : {};
  } catch {
    return {};
  }
}

export function setSavedToStorage(saved: SavedRecord) {
  window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  window.dispatchEvent(new CustomEvent("unlocked:saved-updated"));
}

export function getSavedForCity(cityId: string) {
  return getSavedFromStorage()[cityId] ?? [];
}

export function isPlaceSaved(cityId: string, slug: string) {
  return getSavedForCity(cityId).includes(slug);
}

export function toggleSavedPlace(cityId: string, slug: string) {
  const saved = getSavedFromStorage();
  const current = new Set(saved[cityId] ?? []);

  if (current.has(slug)) {
    current.delete(slug);
  } else {
    current.add(slug);
  }

  saved[cityId] = Array.from(current);
  setSavedToStorage(saved);

  return saved[cityId];
}

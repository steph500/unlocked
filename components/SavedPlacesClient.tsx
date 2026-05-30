"use client";

import { Bookmark, Compass } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PlaceCard } from "./PlaceCard";
import type { Place } from "@/data/types";
import { getSavedForCity } from "@/lib/saved";

type SavedPlacesClientProps = {
  cityId: string;
  places: Place[];
};

export function SavedPlacesClient({ cityId, places }: SavedPlacesClientProps) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSavedSlugs(getSavedForCity(cityId));
    sync();
    window.addEventListener("unlocked:saved-updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("unlocked:saved-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [cityId]);

  const savedPlaces = useMemo(() => places.filter((place) => savedSlugs.includes(place.slug)), [places, savedSlugs]);

  if (savedPlaces.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-lime text-ink shadow-glow">
          <Bookmark size={26} />
        </div>
        <h2 className="mt-6 text-2xl font-black uppercase leading-none tracking-[-0.04em]">Save places you want to explore later.</h2>
        <p className="mt-3 text-sm leading-6 text-white/58">Your saved Nairobi intel will live here on this device.</p>
        <Link className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-ink" href={`/${cityId}/explore`}>
          <Compass size={16} />
          Explore now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedPlaces.map((place) => <PlaceCard cityId={cityId} key={place.slug} place={place} />)}
    </div>
  );
}

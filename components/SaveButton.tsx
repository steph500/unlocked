"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { isPlaceSaved, toggleSavedPlace } from "@/lib/saved";

type SaveButtonProps = {
  cityId: string;
  slug: string;
  compact?: boolean;
};

export function SaveButton({ cityId, slug, compact = false }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isPlaceSaved(cityId, slug));
  }, [cityId, slug]);

  return (
    <button
      className={compact ? "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:border-lime hover:text-lime" : "flex flex-1 items-center justify-center gap-2 rounded-2xl bg-lime px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink shadow-glow transition hover:scale-[1.01]"}
      onClick={() => {
        toggleSavedPlace(cityId, slug);
        setSaved((current) => !current);
      }}
      type="button"
    >
      <Bookmark fill={saved ? "currentColor" : "none"} size={compact ? 18 : 17} />
      {compact ? null : saved ? "Saved" : "Save place"}
    </button>
  );
}

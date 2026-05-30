"use client";

import { useEffect, useState } from "react";
import { getSavedForCity } from "@/lib/saved";

type ProfileStatsProps = {
  cityId: string;
};

export function ProfileStats({ cityId }: ProfileStatsProps) {
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const sync = () => setSavedCount(getSavedForCity(cityId).length);
    sync();
    window.addEventListener("unlocked:saved-updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("unlocked:saved-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [cityId]);

  return (
    <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-lime">Saved count</p>
      <p className="mt-2 text-5xl font-black tracking-[-0.08em]">{savedCount}</p>
    </div>
  );
}

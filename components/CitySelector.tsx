import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/cities";

type CitySelectorProps = {
  activeCityId: string;
};

export function CitySelector({ activeCityId }: CitySelectorProps) {
  const active = cities.find((city) => city.id === activeCityId) ?? cities[0];

  return (
    <details className="group rounded-[1.5rem] border border-white/10 bg-white/[0.05] px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-lime">City edition</p>
          <p className="text-lg font-black tracking-tight">{active.name}</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
          Switch
          <ChevronDown className="transition group-open:rotate-180" size={14} />
        </span>
      </summary>
      <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
        {cities.map((city) => (
          <Link className="rounded-xl px-3 py-2 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white" href={`/${city.id}/explore`} key={city.id}>
            {city.name} <span className="text-white/35">/ {city.editionName}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}

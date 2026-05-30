import { ArrowUpRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Place } from "@/data/types";

type PlaceCardProps = {
  cityId: string;
  place: Place;
  compact?: boolean;
};

export function PlaceCard({ cityId, place, compact = false }: PlaceCardProps) {
  if (compact) {
    return (
      <Link className="group block min-w-[15.7rem] overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#0a0e0f] shadow-[0_18px_55px_rgba(0,0,0,0.36)] transition hover:-translate-y-1 hover:border-lime/40" href={`/${cityId}/places/${place.slug}`}>
        <div className="relative h-40 overflow-hidden">
          <Image alt={place.name} className="object-cover opacity-[0.82] saturate-[0.74] contrast-125 transition duration-700 group-hover:scale-105" fill sizes="260px" src={place.image} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.88)),radial-gradient(circle_at_20%_0%,rgba(200,255,47,0.2),transparent_8rem)]" />
          <span className="absolute left-3 top-3 rounded-full border border-lime/25 bg-black/50 px-2.5 py-1 text-[0.56rem] font-black uppercase tracking-[0.18em] text-lime backdrop-blur">{place.category}</span>
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-lime px-2 py-1 text-[0.65rem] font-black text-ink">
            <Star fill="currentColor" size={12} />
            {place.localScore.toFixed(1)}
          </span>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-[2rem] font-black uppercase leading-[0.82] tracking-[-0.075em]">{place.name}</h3>
            <p className="mt-2 flex items-center gap-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/58">
              <MapPin className="text-lime" size={12} />
              {place.area}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link className="group block overflow-hidden rounded-[2rem] ui-panel-hard scanline transition hover:-translate-y-1 hover:border-lime/40" href={`/${cityId}/places/${place.slug}`}>
      <div className="relative h-64 overflow-hidden">
        <Image alt={place.name} className="object-cover opacity-[0.82] saturate-[0.74] contrast-125 transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 420px" src={place.image} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,255,47,0.2),transparent_12rem),linear-gradient(180deg,rgba(2,3,3,0.18),rgba(2,3,3,0.94))]" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <div className="rounded-full border border-lime/25 bg-black/50 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.22em] text-lime backdrop-blur">
            {place.category}
          </div>
          <span className="flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-xs font-black text-ink">
            <Star fill="currentColor" size={13} />
            {place.localScore.toFixed(1)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-[3.15rem] font-black uppercase leading-[0.78] tracking-[-0.085em]">{place.name}</h3>
          <p className="mt-3 flex items-center gap-1 text-xs font-black uppercase tracking-[0.18em] text-white/54">
            <MapPin className="text-lime" size={14} />
            {place.area}
          </p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-sm font-semibold leading-6 text-white/58">{place.summary}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-black uppercase tracking-[0.22em] text-lime">
          Open Intel
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
}

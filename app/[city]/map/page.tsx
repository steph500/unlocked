import { ExternalLink, MapPinned, Radar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import { getPlacesByCity, isSupportedCity, mapUrl } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

type MapPageProps = {
  params: Promise<{ city: string }>;
};

export default async function MapPage({ params }: MapPageProps) {
  const { city } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const places = getPlacesByCity(city);

  return (
    <PageShell cityId={city}>
      <div className="space-y-7 px-5 pb-6 pt-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-lime p-5 text-ink shadow-glow">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[2rem] border-ink/10" />
          <p className="relative text-[0.68rem] font-black uppercase tracking-[0.28em]">Coming soon</p>
          <h1 className="relative mt-3 text-5xl font-black uppercase leading-[0.86] tracking-[-0.07em]">Local map layer.</h1>
          <p className="relative mt-4 text-sm font-bold leading-6 text-ink/70">A full culture map comes later. For MVP, every saved and curated place has a clean external maps action.</p>
        </section>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5">
          <div className="flex h-72 items-center justify-center rounded-[1.5rem] border border-dashed border-lime/30 bg-black/35">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-lime text-ink shadow-glow">
                <Radar size={28} />
              </div>
              <p className="mt-5 text-2xl font-black uppercase tracking-[-0.04em]">Intel map placeholder</p>
              <p className="mt-2 max-w-64 text-sm leading-6 text-white/55">No broken map button. Just a clean placeholder until a map SDK is worth the weight.</p>
            </div>
          </div>
        </div>

        <SectionHeader eyebrow="Open in Maps" title="Curated pins" />
        <div className="space-y-3">
          {places.map((place) => (
            <Link className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 transition hover:border-lime/50" href={mapUrl(place.mapQuery)} key={place.slug} target="_blank">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-ink">
                  <MapPinned size={19} />
                </div>
                <div>
                  <h2 className="font-black uppercase tracking-[-0.03em]">{place.name}</h2>
                  <p className="text-xs font-semibold text-white/52">{place.area}</p>
                </div>
              </div>
              <ExternalLink className="text-lime" size={18} />
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { CitySelector } from "@/components/CitySelector";
import { ExploreClient } from "@/components/ExploreClient";
import { PageShell } from "@/components/PageShell";
import { cities } from "@/data/cities";
import { getCategoryItems, getCityTheme, getPlacesByCity, getSlangByCity, getTipsByCity, isSupportedCity } from "@/lib/data";

type ExplorePageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ category?: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

export default async function ExplorePage({ params, searchParams }: ExplorePageProps) {
  const { city } = await params;
  const { category } = await searchParams;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const theme = getCityTheme(city);
  const places = getPlacesByCity(city);
  const localTip = getTipsByCity(city, "local")[0];
  const foodItems = getCategoryItems(city, "food-to-try");
  const slang = getSlangByCity(city);

  return (
    <PageShell cityId={city}>
      <div className="space-y-5 px-5 pb-6 pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-lime">Unlocked</p>
            <h1 className="mt-1 text-[3.15rem] font-black uppercase leading-[0.82] tracking-[-0.08em]">City issue</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/65">
            <MapPin className="text-lime" size={14} /> Nairobi
          </div>
        </div>

        <CitySelector activeCityId={city} />

        <ExploreClient cityId={city} foodItems={foodItems} initialCategory={category} localTip={localTip} places={places} slang={slang} theme={theme} />
      </div>
    </PageShell>
  );
}

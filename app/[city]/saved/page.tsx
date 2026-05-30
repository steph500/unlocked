import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SavedPlacesClient } from "@/components/SavedPlacesClient";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import { getPlacesByCity, isSupportedCity } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

type SavedPageProps = {
  params: Promise<{ city: string }>;
};

export default async function SavedPage({ params }: SavedPageProps) {
  const { city } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const places = getPlacesByCity(city);

  return (
    <PageShell cityId={city}>
      <div className="space-y-7 px-5 pb-6 pt-6">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-5 shadow-card">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-lime">Your stash</p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-[0.86] tracking-[-0.07em]">Saved places.</h1>
          <p className="mt-4 text-sm leading-6 text-white/60">Keep a short list of Nairobi spots you want to come back to.</p>
        </section>
        <SectionHeader eyebrow="Later list" title="Saved intel" />
        <SavedPlacesClient cityId={city} places={places} />
      </div>
    </PageShell>
  );
}

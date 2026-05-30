import { Info, Palette, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProfileStats } from "@/components/ProfileStats";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import { getCity, getCityTheme, isSupportedCity } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

type ProfilePageProps = {
  params: Promise<{ city: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { city } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const activeCity = getCity(city);
  const theme = getCityTheme(city);

  return (
    <PageShell cityId={city}>
      <div className="space-y-7 px-5 pb-6 pt-6">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-5 shadow-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-lime text-ink shadow-glow">
            <UserRound size={29} />
          </div>
          <p className="mt-6 text-[0.68rem] font-black uppercase tracking-[0.28em] text-lime">Profile</p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-[0.86] tracking-[-0.07em]">Curious Explorer</h1>
          <p className="mt-4 text-sm leading-6 text-white/60">A lightweight local profile for MVP. Auth can wait until the product proves its rhythm.</p>
        </section>

        <SectionHeader eyebrow="Your edition" title="Unlocked settings" />
        <div className="grid grid-cols-2 gap-3">
          <ProfileStats cityId={city} />
          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-lime">Preferred city</p>
            <p className="mt-2 text-3xl font-black uppercase leading-none tracking-[-0.05em]">{activeCity.name}</p>
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5">
          <div className="flex items-center gap-3 text-lime">
            <Palette size={19} />
            <h2 className="text-[0.68rem] font-black uppercase tracking-[0.24em]">Theme / city edition</h2>
          </div>
          <p className="mt-3 text-2xl font-black uppercase tracking-[-0.04em]">{theme.editionName}</p>
          <p className="mt-2 text-sm leading-6 text-white/58">Primary: {theme.primaryColorName}. Background: {theme.backgroundMood}. Mood: {theme.mood}.</p>
        </div>

        <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5">
          <div className="flex items-center gap-3 text-lime">
            <Info size={19} />
            <h2 className="text-[0.68rem] font-black uppercase tracking-[0.24em]">About Unlocked</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/64">Unlocked is a local city guide for real spots, cultural context, movement tips, street-smart notes, and curated experiences. Hotels and restaurants can exist here, but they are not the main character.</p>
        </div>
      </div>
    </PageShell>
  );
}

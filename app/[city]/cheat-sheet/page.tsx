import type { ReactNode } from "react";
import { Banknote, Camera, Car, Handshake, Languages, Utensils } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import type { Tip } from "@/data/types";
import { getCityTheme, getFoodsByCity, getSlangByCity, getTipsByCity, isSupportedCity } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

type CheatSheetPageProps = {
  params: Promise<{ city: string }>;
};

export default async function CheatSheetPage({ params }: CheatSheetPageProps) {
  const { city } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const theme = getCityTheme(city);
  const foods = getFoodsByCity(city);
  const slang = getSlangByCity(city);
  const etiquette = getTipsByCity(city, "etiquette");
  const localTips = getTipsByCity(city, "local");
  const movementTips = getTipsByCity(city, "movement");

  return (
    <PageShell cityId={city}>
      <div className="space-y-7 px-5 pb-6 pt-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-lime/20 bg-lime p-5 text-ink shadow-glow scanline">
          <Image alt="" className="object-cover opacity-[0.28] mix-blend-multiply" fill priority sizes="100vw" src={theme.imageSet.food} />
          <div className="relative">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.28em]">Pocket intel</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-[0.86] tracking-[-0.07em]">Local cheat sheet</h1>
            <p className="mt-4 text-sm font-bold leading-6 text-ink/75">Food orders, quick slang, etiquette, and movement instincts for Nairobi.</p>
          </div>
        </section>

        <CheatSection icon={<Utensils size={19} />} title="Foods to try">
          {foods.map((food) => (
            <ImageInfoCard image={food.image} key={food.name} title={food.name} note={food.note} />
          ))}
        </CheatSection>

        <CheatSection icon={<Languages size={19} />} title="Common words / slang">
          {slang.map((item) => (
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4" key={item.word}>
              <h3 className="text-xl font-black uppercase tracking-[-0.04em] text-lime">{item.word}</h3>
              <p className="text-right text-sm font-semibold text-white/65">{item.meaning}</p>
            </div>
          ))}
        </CheatSection>

        <CheatSection icon={<Handshake size={19} />} title="Local etiquette">
          {etiquette.map((tip, index) => {
            const icons = [Handshake, Camera, Banknote, Car];
            const Icon = icons[index] ?? Handshake;
            return <TipImageCard icon={<Icon size={18} />} key={tip.title} tip={tip} />;
          })}
        </CheatSection>

        <CheatSection icon={<Car size={19} />} title="Local tips">
          {[...localTips, ...movementTips].map((tip) => <TipImageCard key={tip.title} tip={tip} />)}
        </CheatSection>
      </div>
    </PageShell>
  );
}

function CheatSection({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 text-lime">{icon}<SectionHeader eyebrow="Good to know" title={title} /></div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function ImageInfoCard({ title, note, image }: { title: string; note: string; image: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <Image alt="" className="object-cover opacity-[0.34] saturate-[0.72] contrast-125" fill sizes="100vw" src={image} />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/35" />
      <div className="relative max-w-[72%]">
        <h3 className="text-xl font-black uppercase tracking-[-0.04em]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/68">{note}</p>
      </div>
    </div>
  );
}

function TipImageCard({ tip, icon }: { tip: Tip; icon?: ReactNode }) {
  return (
    <div className="relative flex min-h-28 gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <Image alt="" className="object-cover opacity-[0.26] saturate-[0.72] contrast-125" fill sizes="100vw" src={tip.image} />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/86 to-black/38" />
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lime text-ink">{icon}</div>
      <div className="relative">
        <h3 className="text-base font-black uppercase tracking-[-0.03em]">{tip.title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/65">{tip.note}</p>
      </div>
    </div>
  );
}

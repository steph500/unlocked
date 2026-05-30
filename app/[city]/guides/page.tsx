import { ArrowRight, Banknote, Camera, Handshake, Languages, Star, UserRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GuideContactSheet } from "@/components/GuideContactSheet";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { cities } from "@/data/cities";
import type { Food, Slang, Tip } from "@/data/types";
import { getCityTheme, getFoodsByCity, getGuidesByCity, getSlangByCity, getTipsByCity, isSupportedCity } from "@/lib/data";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.id }));
}

type GuidesPageProps = {
  params: Promise<{ city: string }>;
};

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { city } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const theme = getCityTheme(city);
  const foods = getFoodsByCity(city);
  const slang = getSlangByCity(city);
  const etiquette = getTipsByCity(city, "etiquette");
  const guides = getGuidesByCity(city);

  return (
    <PageShell cityId={city}>
      <div className="space-y-6 px-5 pb-6 pt-5">
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-lime">Unlocked guide</p>
            <h1 className="mt-1 text-[3.35rem] font-black uppercase leading-[0.78] tracking-[-0.085em]">Nairobi intel.</h1>
          </div>
          <span className="mb-1 rounded-full border border-lime/20 bg-lime/10 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.18em] text-lime">NBO</span>
        </header>

        <section className="space-y-3">
          <SectionRailHeader eyebrow="Taste first" title="Foods to try" />
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {foods.map((food, index) => <FoodRailCard food={food} index={index} key={food.name} />)}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader eyebrow="Speak the city" title="Common words / slang" />
          <div className="grid grid-cols-4 gap-2">
            {slang.map((item, index) => <SlangBubbleCard index={index} item={item} key={item.word} />)}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeader eyebrow="Move with respect" title="Local etiquette" />
          <div className="grid grid-cols-2 gap-3">
            {etiquette.map((tip, index) => <EtiquetteImageCard imageFallback={theme.imageSet.culture} index={index} key={tip.title} tip={tip} />)}
          </div>
        </section>

        <section className="space-y-3 pt-1">
          <SectionHeader eyebrow="Need backup?" title="Ask a local" copy="Kept small, because this screen is a guide first and booking second." />
          <div className="space-y-3">
            {guides.slice(0, 2).map((guide) => (
              <article className="rounded-[1.5rem] border border-white/10 bg-[#0b0f10] p-4" key={guide.id}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/10 text-lime">
                      <UserRound size={21} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.06em]">{guide.name}</h3>
                      <p className="mt-1 text-xs font-semibold text-white/50">{guide.specialty}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-xs font-black text-ink">
                    <Star fill="currentColor" size={13} />
                    {guide.rating.toFixed(1)}
                  </span>
                </div>
                <GuideContactSheet guide={guide} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function SectionRailHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-lime">{eyebrow}</p>
        <h2 className="mt-1 text-[2.35rem] font-black uppercase leading-[0.82] tracking-[-0.075em]">{title}</h2>
      </div>
      <span className="mb-1 flex items-center gap-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-lime">
        Scroll <ArrowRight size={13} />
      </span>
    </div>
  );
}

function FoodRailCard({ food, index }: { food: Food; index: number }) {
  return (
    <article className="relative h-44 min-w-[10.5rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b0f10] shadow-[0_18px_55px_rgba(0,0,0,0.36)]">
      <Image alt="" className="object-cover opacity-[0.78] saturate-[0.75] contrast-125" fill sizes="180px" src={food.image} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.88)),radial-gradient(circle_at_20%_0%,rgba(200,255,47,0.22),transparent_8rem)]" />
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
        <span className="rounded-full bg-black/50 px-2.5 py-1 text-[0.56rem] font-black uppercase tracking-[0.18em] text-lime backdrop-blur">Food</span>
        <span className="text-[0.58rem] font-black text-white/48">0{index + 1}</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="text-[1.85rem] font-black uppercase leading-[0.82] tracking-[-0.075em]">{food.name}</h3>
        <p className="mt-2 line-clamp-2 text-[0.68rem] font-semibold leading-4 text-white/58">{food.note}</p>
      </div>
    </article>
  );
}

function SlangBubbleCard({ item, index }: { item: Slang; index: number }) {
  const variants = [
    { pattern: "/patterns/message-lime.svg", text: "text-ink", sub: "text-ink/62", label: "text-ink/45" },
    { pattern: "/patterns/message-purple.svg", text: "text-white", sub: "text-white/62", label: "text-white/46" },
    { pattern: "/patterns/message-orange.svg", text: "text-white", sub: "text-white/64", label: "text-white/48" },
    { pattern: "/patterns/message-teal.svg", text: "text-white", sub: "text-white/66", label: "text-white/48" },
    { pattern: "/patterns/message-charcoal.svg", text: "text-white", sub: "text-white/62", label: "text-lime/70" }
  ];
  const variant = variants[index % variants.length];

  return (
    <article className="relative aspect-square overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#0a0d0e] shadow-[0_12px_34px_rgba(0,0,0,0.34)]">
      <Image alt="" className="object-cover" fill sizes="86px" src={variant.pattern} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/24" />
      <div className="relative flex h-full flex-col justify-end p-2.5">
        <p className={`text-[0.48rem] font-black uppercase tracking-[0.14em] ${variant.label}`}>Slang</p>
        <h3 className={`mt-0.5 text-[1rem] font-black uppercase leading-none tracking-[-0.045em] ${variant.text}`}>{item.word}</h3>
        <p className={`mt-1 line-clamp-2 text-[0.55rem] font-bold leading-3 ${variant.sub}`}>{item.meaning}</p>
      </div>
    </article>
  );
}

function EtiquetteImageCard({ tip, index, imageFallback }: { tip: Tip; index: number; imageFallback: string }) {
  const icons = [Handshake, Camera, Banknote, Languages];
  const Icon = icons[index] ?? Handshake;
  const image = tip.image || imageFallback;
  const tall = index === 0 || index === 3;

  return (
    <article className={`relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#0a0e0f] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.36)] ${tall ? "min-h-44" : "min-h-36"}`}>
      <Image alt="" className="object-cover opacity-[0.54] saturate-[0.78] contrast-125" fill sizes="50vw" src={image} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.9)),radial-gradient(circle_at_82%_0%,rgba(200,255,47,0.2),transparent_8rem)]" />
      <div className="relative flex h-full min-h-[7rem] flex-col justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-lime text-ink shadow-glow">
          <Icon size={17} />
        </div>
        <div>
          <p className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-lime">Etiquette</p>
          <h3 className="mt-1 text-[1.25rem] font-black uppercase leading-[0.85] tracking-[-0.055em]">{tip.title}</h3>
          <p className="mt-2 line-clamp-3 text-[0.66rem] font-semibold leading-4 text-white/64">{tip.note}</p>
        </div>
      </div>
    </article>
  );
}

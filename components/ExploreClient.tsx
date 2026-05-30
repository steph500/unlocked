"use client";

import { ArrowRight, Lightbulb, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryGrid } from "./CategoryGrid";
import { SectionHeader } from "./SectionHeader";
import type { CityTheme, IntelItem, Place, Slang, Tip } from "@/data/types";

type ExploreClientProps = {
  cityId: string;
  theme: CityTheme;
  places: Place[];
  foodItems: IntelItem[];
  slang: Slang[];
  localTip?: Tip;
  initialCategory?: string;
};

export function ExploreClient({ cityId, theme, foodItems, slang, localTip }: ExploreClientProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredFoodItems = useMemo(() => {
    if (!normalizedQuery) {
      return foodItems;
    }

    return foodItems.filter((item) => [item.title, item.summary, item.kicker, item.localTip, ...item.tags].join(" ").toLowerCase().includes(normalizedQuery));
  }, [foodItems, normalizedQuery]);

  const filteredSlang = useMemo(() => {
    if (!normalizedQuery) {
      return slang;
    }

    return slang.filter((item) => [item.word, item.meaning].join(" ").toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery, slang]);

  return (
    <div className="space-y-5">
      <label className="relative block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lime" size={19} />
        <input
          className="w-full rounded-[1.45rem] border border-white/10 bg-[#0a0e0f] py-4 pl-12 pr-4 text-sm font-black text-white shadow-[0_16px_45px_rgba(0,0,0,0.32)] placeholder:text-white/32 focus:border-lime focus:ring-lime"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search food, slang, courts, markets..."
          type="search"
          value={query}
        />
      </label>

      <CategoryGrid categories={theme.categories} categoryImages={theme.categoryImages} cityId={cityId} />

      <section className="space-y-3 pt-1">
        <SectionRailHeader href={`/${cityId}/categories/food-to-try`} eyebrow="Taste first" title="Foods to try" />
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map((item, index) => <FoodIntelRailCard index={index} item={item} key={item.slug} />)
          ) : (
            <EmptyInlineState copy="Try mutura, smocha, ugali, or nyama." />
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Speak the city" title="Common words / slang" />
          <Link className="mb-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-lime" href={`/${cityId}/categories/local-slang`}>More</Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {filteredSlang.length > 0 ? filteredSlang.slice(0, 8).map((item, index) => <SlangBubbleCard index={index} item={item} key={item.word} />) : null}
        </div>
        {filteredSlang.length === 0 ? <EmptyInlineState copy="No slang match yet. Try sasa, poa, or matatu." /> : null}
      </section>

      {localTip ? (
        <section className="relative overflow-hidden rounded-[1.8rem] border border-lime/15 bg-[#0a0e0f] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <Image alt="" className="object-cover opacity-[0.22] saturate-[0.72] contrast-125" fill sizes="100vw" src={localTip.image} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
          <div className="relative flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime text-ink shadow-glow">
              <Lightbulb size={21} />
            </div>
            <div>
              <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-lime">Local tip</p>
              <h3 className="mt-1 text-2xl font-black uppercase leading-none tracking-[-0.05em]">{localTip.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/62">{localTip.note}</p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function SectionRailHeader({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-lime">{eyebrow}</p>
        <h2 className="mt-1 text-[2.35rem] font-black uppercase leading-[0.82] tracking-[-0.075em]">{title}</h2>
      </div>
      <Link className="mb-1 flex items-center gap-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-lime" href={href}>
        All <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function FoodIntelRailCard({ item, index }: { item: IntelItem; index: number }) {
  return (
    <Link className="relative h-44 min-w-[10.5rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b0f10] shadow-[0_18px_55px_rgba(0,0,0,0.36)]" href={`/${item.cityId}/intel/${item.slug}`}>
      <Image alt="" className="object-cover opacity-[0.78] saturate-[0.75] contrast-125" fill sizes="180px" src={item.image} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.88)),radial-gradient(circle_at_20%_0%,rgba(200,255,47,0.22),transparent_8rem)]" />
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
        <span className="rounded-full bg-black/50 px-2.5 py-1 text-[0.56rem] font-black uppercase tracking-[0.18em] text-lime backdrop-blur">Food</span>
        <span className="text-[0.58rem] font-black text-white/48">0{index + 1}</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="text-[1.85rem] font-black uppercase leading-[0.82] tracking-[-0.075em]">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-[0.68rem] font-semibold leading-4 text-white/58">{item.localPrice ?? item.summary}</p>
      </div>
    </Link>
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

function EmptyInlineState({ copy }: { copy: string }) {
  return (
    <div className="min-w-full rounded-[1.35rem] border border-dashed border-lime/20 bg-white/[0.035] p-5 text-sm font-semibold leading-6 text-white/54">
      {copy}
    </div>
  );
}

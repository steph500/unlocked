import { Binoculars, BookOpen, Bus, Drama, Gem, Languages, MapPinned, Utensils } from "lucide-react";
import Link from "next/link";
import type { Category, CategorySlug } from "@/data/types";
import { categoryHref } from "@/lib/data";

const iconMap = {
  "hidden-gems": Gem,
  "food-to-try": Utensils,
  "local-slang": Languages,
  "move-smart": Bus,
  "neighborhood-vibes": MapPinned,
  "good-to-know": BookOpen,
  "street-culture": Drama,
  guides: Binoculars
};

type CategoryGridProps = {
  categories: Category[];
  cityId: string;
  categoryImages: Partial<Record<CategorySlug, string>>;
};

export function CategoryGrid({ categories, cityId }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {categories.slice(0, 8).map((category) => {
        const Icon = iconMap[category.slug];

        return (
          <Link className="group flex min-h-24 flex-col items-center justify-center gap-2 rounded-[1.35rem] border border-white/10 bg-[#0b0f10] px-2 py-3 text-center shadow-[0_14px_40px_rgba(0,0,0,0.28)] transition hover:border-lime/60 hover:bg-[#12170d]" href={categoryHref(cityId, category.slug)} key={category.slug}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-lime/20 bg-lime/10 text-lime transition group-hover:bg-lime group-hover:text-ink">
              <Icon size={20} strokeWidth={2.5} />
            </span>
            <span className="text-[0.62rem] font-black uppercase leading-3 tracking-[0.08em] text-white/74">{category.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

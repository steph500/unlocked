import { ArrowLeft, ArrowUpRight, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import type { CategorySlug, IntelItem } from "@/data/types";
import { getCategoryItems, getCityTheme, isSupportedCity } from "@/lib/data";
import { getSeoTopic } from "@/data/seo";
import { siteName, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return cities.flatMap((city) => categories.map((category) => ({ city: city.id, category: category.slug })));
}

type CategoryPageProps = {
  params: Promise<{ city: string; category: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { city, category } = await params;
  const categoryInfo = categories.find((item) => item.slug === category);
  const seoTopic = isSupportedCity(city) ? getSeoTopic(city, category as CategorySlug) : undefined;

  return {
    title: seoTopic?.title ?? (categoryInfo ? `${categoryInfo.label} in ${city} | ${siteName}` : `Category | ${siteName}`),
    description: seoTopic?.description ?? categoryInfo?.description ?? "Unlocked city category.",
    keywords: seoTopic?.keywords,
    alternates: {
      canonical: seoTopic?.path ? `${siteUrl}${seoTopic.path}` : undefined
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { city, category } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const categoryInfo = categories.find((item) => item.slug === category);

  if (!categoryInfo) {
    notFound();
  }

  const theme = getCityTheme(city);
  const categoryImage = theme.categoryImages[categoryInfo.slug] ?? theme.heroImage;
  const items = getCategoryItems(city, categoryInfo.slug);
  const seoTopic = getSeoTopic(city, categoryInfo.slug);
  const canonicalUrl = `${siteUrl}/${city}/categories/${categoryInfo.slug}`;

  return (
    <PageShell cityId={city}>
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: seoTopic?.title ?? `${categoryInfo.label} | ${siteName}`,
          description: seoTopic?.description ?? categoryInfo.description,
          url: canonicalUrl,
          about: seoTopic?.keywords ?? [categoryInfo.label],
          inLanguage: "en"
        }}
      />
      <div className="space-y-6 px-5 pb-6 pt-5">
        <Link className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/54" href={`/${city}/explore`}>
          <ArrowLeft size={14} /> Back to Explore
        </Link>

        <section className="relative min-h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-[#07090a] p-5 shadow-card">
          <Image alt="" className="object-cover opacity-[0.62] saturate-[0.78] contrast-125" fill priority sizes="100vw" src={categoryImage} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78),rgba(0,0,0,0.45)_44%,rgba(0,0,0,0.92)),radial-gradient(circle_at_82%_0%,rgba(200,255,47,0.2),transparent_12rem)]" />
          <div className="relative flex min-h-52 flex-col justify-between">
            <span className="w-fit rounded-full border border-lime/25 bg-black/45 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-lime backdrop-blur">Local issue</span>
            <div>
              <h1 className="text-[4.1rem] font-black uppercase leading-[0.78] tracking-[-0.09em]">{categoryInfo.label}</h1>
              <p className="mt-3 max-w-xs text-sm font-semibold leading-6 text-white/68">{seoTopic?.description ?? categoryInfo.description}</p>
            </div>
          </div>
        </section>

        <SectionHeader eyebrow="Pick one" title="Open the brief" copy="Each card opens practical Nairobi context: where, price, best time, dress, local notes, and what to know." />

        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => <IntelListCard index={index} item={item} key={item.slug} />)}
          </div>
        ) : (
          <div className="rounded-[1.6rem] border border-dashed border-lime/20 bg-white/[0.035] p-8 text-center">
            <p className="text-2xl font-black uppercase leading-none tracking-[-0.05em]">Edition coming soon.</p>
            <p className="mt-2 text-sm leading-6 text-white/50">This city category is ready for content, but Nairobi is the first full edition.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function IntelListCard({ item, index }: { item: IntelItem; index: number }) {
  const isFood = item.categorySlug === "food-to-try";

  return (
    <Link className="group grid grid-cols-[7rem_1fr] gap-3 overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#0a0e0f] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.34)] transition hover:border-lime/40" href={`/${item.cityId}/intel/${item.slug}`}>
      <div className="relative min-h-32 overflow-hidden rounded-[1.25rem] bg-black">
        <Image alt="" className="object-cover opacity-[0.86] saturate-[0.78] contrast-125 transition duration-700 group-hover:scale-105" fill sizes="120px" src={item.image} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute bottom-2 left-2 rounded-full bg-lime px-2 py-1 text-[0.58rem] font-black text-ink">0{index + 1}</span>
      </div>
      <div className="flex min-h-32 flex-col justify-between py-1">
        <div>
          <p className="flex items-center gap-1 text-[0.58rem] font-black uppercase tracking-[0.2em] text-lime"><Tag size={11} /> {item.kicker}</p>
          <h2 className="mt-2 text-[1.55rem] font-black uppercase leading-[0.85] tracking-[-0.065em]">{item.title}</h2>
          <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-white/56">{item.summary}</p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/40">
          <span className="flex items-center gap-1"><MapPin size={12} className="text-lime" /> {isFood ? item.localPrice ?? "Local price" : item.area}</span>
          <ArrowUpRight className="text-lime" size={14} />
        </div>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink, MapPin, Shirt, Sparkles, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { categories } from "@/data/categories";
import { categoryItems } from "@/data/categoryItems";
import { mapUrl, getCategoryItem, isSupportedCity } from "@/lib/data";
import { siteName, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return categoryItems.map((item) => ({ city: item.cityId, slug: item.slug }));
}

type IntelDetailPageProps = {
  params: Promise<{ city: string; slug: string }>;
};

export async function generateMetadata({ params }: IntelDetailPageProps): Promise<Metadata> {
  const { city, slug } = await params;
  const item = getCategoryItem(city, slug);
  const canonical = item ? `${siteUrl}/${city}/intel/${item.slug}` : undefined;

  return {
    title: item ? `${item.title} in Nairobi | ${siteName}` : `Intel | ${siteName}`,
    description: item?.summary ?? "Unlocked local city intel.",
    alternates: {
      canonical
    }
  };
}

export default async function IntelDetailPage({ params }: IntelDetailPageProps) {
  const { city, slug } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const item = getCategoryItem(city, slug);

  if (!item) {
    notFound();
  }

  const category = categories.find((entry) => entry.slug === item.categorySlug);
  const canonical = `${siteUrl}/${city}/intel/${item.slug}`;

  return (
    <PageShell cityId={city}>
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: item.title,
          description: item.summary,
          url: canonical,
          image: [item.image],
          author: {
            "@type": "Organization",
            name: siteName
          },
          about: [category?.label ?? item.kicker, ...(item.tags ?? [])],
          inLanguage: "en"
        }}
      />
      <article className="pb-6">
        <div className="relative h-[31rem] overflow-hidden">
          <Image alt="" className="object-cover saturate-[0.78] contrast-125" fill priority sizes="100vw" src={item.image} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.32)_38%,rgba(0,0,0,0.94)),radial-gradient(circle_at_80%_12%,rgba(200,255,47,0.18),transparent_12rem)]" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
            <Link className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur" href={`/${city}/categories/${item.categorySlug}`} aria-label="Back to category">
              <ArrowLeft size={19} />
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="rounded-full border border-lime/35 bg-black/55 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.22em] text-lime backdrop-blur">{category?.label ?? item.kicker}</span>
            <h1 className="mt-4 text-[4.35rem] font-black uppercase leading-[0.78] tracking-[-0.09em]">{item.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/62"><MapPin className="text-lime" size={14} /> {item.area}</p>
          </div>
        </div>

        <div className="space-y-5 px-5">
          <p className="text-base font-semibold leading-7 text-white/72">{item.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {item.localPrice ? <InfoTile icon={<WalletCards size={18} />} label="Local price" value={item.localPrice} /> : null}
            {item.bestTime ? <InfoTile icon={<Sparkles size={18} />} label="Best time" value={item.bestTime} /> : null}
            {item.dressCode ? <InfoTile icon={<Shirt size={18} />} label="Dress / vibe" value={item.dressCode} wide /> : null}
          </div>

          {item.funFact ? (
            <section className="rounded-[1.6rem] border border-lime/20 bg-lime p-5 text-ink shadow-glow">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.24em]">Fun fact</p>
              <p className="mt-2 text-sm font-black leading-6">{item.funFact}</p>
            </section>
          ) : null}

          <section className="rounded-[1.7rem] border border-white/10 bg-[#0a0e0f] p-5">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-lime">Local tip</p>
            <h2 className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.05em]">Move like you know</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/64">{item.localTip}</p>
          </section>

          <section className="space-y-3">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-lime">What to know</p>
            <div className="grid gap-2">
              {item.details.map((detail) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm font-semibold leading-6 text-white/66" key={detail}>{detail}</div>
              ))}
            </div>
          </section>

          {item.howToGetThere || item.safetyNote ? (
            <section className="grid gap-3">
              {item.howToGetThere ? <NoteBlock label="How to get there" value={item.howToGetThere} /> : null}
              {item.safetyNote ? <NoteBlock label="Soft safety note" value={item.safetyNote} /> : null}
            </section>
          ) : null}

          <div className="flex gap-3 pt-1">
            {item.mapQuery ? (
              <Link className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-lime px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-ink shadow-glow" href={mapUrl(item.mapQuery)} target="_blank">
                <ExternalLink size={16} /> Open in Maps
              </Link>
            ) : null}
            <Link className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-white" href={`/${city}/categories/${item.categorySlug}`}>More like this</Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

function InfoTile({ icon, label, value, wide = false }: { icon: ReactNode; label: string; value: string; wide?: boolean }) {
  return (
    <div className={`${wide ? "col-span-2" : ""} rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4`}>
      <div className="flex items-center gap-2 text-lime">{icon}<p className="text-[0.58rem] font-black uppercase tracking-[0.2em]">{label}</p></div>
      <p className="mt-2 text-sm font-bold leading-6 text-white/66">{value}</p>
    </div>
  );
}

function NoteBlock({ label, value }: { label: string; value: string }) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-[#0a0e0f] p-4">
      <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-lime">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-white/64">{value}</p>
    </section>
  );
}

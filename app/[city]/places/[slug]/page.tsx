import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { places } from "@/data/places";
import { getGuidesByCity, getPlace, isSupportedCity, mapUrl } from "@/lib/data";

export function generateStaticParams() {
  return places.map((place) => ({ city: place.cityId, slug: place.slug }));
}

type PlacePageProps = {
  params: Promise<{ city: string; slug: string }>;
};

export async function generateMetadata({ params }: PlacePageProps) {
  const { city, slug } = await params;
  const place = getPlace(city, slug);

  return {
    title: place ? `${place.name} | Unlocked` : "Place | Unlocked",
    description: place?.summary ?? "Local Nairobi place intel."
  };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { city, slug } = await params;

  if (!isSupportedCity(city)) {
    notFound();
  }

  const place = getPlace(city, slug);
  const guide = getGuidesByCity(city)[0];

  if (!place) {
    notFound();
  }

  return (
    <PageShell cityId={city}>
      <article>
        <div className="relative h-[29rem] overflow-hidden">
          <Image alt={place.name} className="object-cover" fill priority sizes="100vw" src={place.image} />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/20 to-ink" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
            <Link className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink/65 text-white backdrop-blur" href={`/${city}/explore`} aria-label="Back to explore">
              <ArrowLeft size={19} />
            </Link>
            <SaveButton cityId={city} compact slug={place.slug} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="rounded-full border border-lime/40 bg-ink/65 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-lime backdrop-blur">{place.category}</span>
            <h1 className="mt-4 text-6xl font-black uppercase leading-[0.82] tracking-[-0.08em]">{place.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm font-bold text-white/70">
              <MapPin className="text-lime" size={16} />
              {place.area}
            </p>
          </div>
        </div>

        <div className="space-y-5 px-5 pb-6">
          <div className="-mt-1 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4">
            <div>
              <p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-lime">Local score</p>
              <p className="mt-1 flex items-center gap-2 text-3xl font-black tracking-[-0.05em]"><Star className="text-lime" fill="currentColor" size={22} /> {place.localScore.toFixed(1)}</p>
            </div>
            <p className="max-w-[11rem] text-right text-xs font-semibold leading-5 text-white/52">Scored for vibe, access, cultural texture, and repeat value.</p>
          </div>

          <p className="text-base font-semibold leading-7 text-white/72">{place.description}</p>

          <div className="grid gap-3">
            <IntelBlock title="Why go" body={place.whyGo} />
            <IntelBlock title="Best time" body={place.bestTime} />
            <IntelBlock title="What to know" body={place.whatToKnow} />
            <IntelBlock icon={<ShieldCheck size={17} />} title="Soft safety note" body={place.safetyNote} />
            <IntelBlock title="Cost estimate" body={place.costEstimate} />
            <IntelBlock title="How to get there" body={place.howToGetThere} />
          </div>

          <div className="flex gap-3 pt-2">
            <SaveButton cityId={city} slug={place.slug} />
            <Link className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-lime hover:text-lime" href={mapUrl(place.mapQuery)} target="_blank">
              <ExternalLink size={18} />
              Open in Maps
            </Link>
          </div>
          <Link className="flex items-center justify-center gap-2 rounded-2xl border border-lime/30 bg-lime/10 px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-lime" href={`/${city}/guides?guide=${guide?.id ?? ""}`}>
            <MessageCircle size={16} />
            Ask a local guide
          </Link>
        </div>
      </article>
    </PageShell>
  );
}

function IntelBlock({ title, body, icon }: { title: string; body: string; icon?: ReactNode }) {
  return (
    <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4">
      <h2 className="flex items-center gap-2 text-[0.68rem] font-black uppercase tracking-[0.24em] text-lime">{icon}{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/64">{body}</p>
    </section>
  );
}

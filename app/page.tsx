import type { Metadata } from "next";
import { ArrowRight, CircleDot, MapPin, RadioTower, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { taglines } from "@/lib/constants";
import { getCityTheme } from "@/lib/data";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nairobi Edition",
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteName} | Nairobi Edition`,
    description: siteDescription
  }
};

export default function LandingPage() {
  const theme = getCityTheme("nairobi");

  return (
    <PageShell cityId="nairobi" withNav={false}>
      <section className="relative flex min-h-screen flex-col overflow-hidden px-5 py-5">
        <Image alt="Nairobi KICC night skyline" className="object-cover saturate-[0.82] contrast-125" fill priority sizes="100vw" src={theme.heroImage} />
        <div className="absolute inset-0 image-veil" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="brand-font text-[2.7rem] uppercase leading-none tracking-[-0.08em] text-white">Unlocked</p>
            <p className="mt-1 text-[0.64rem] font-black uppercase tracking-[0.3em] text-lime">Nairobi Edition</p>
          </div>
          <div className="rounded-full border border-lime/20 bg-black/45 px-3 py-2 text-[0.6rem] font-black uppercase tracking-[0.2em] text-lime backdrop-blur-md">
            Edition 001
          </div>
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
          <span className="flex items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/70">
            <CircleDot className="text-lime" size={13} /> Live city intel
          </span>
          <span className="text-[0.62rem] font-black text-lime">NBO</span>
        </div>

        <div className="relative z-10 pt-20">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime/25 bg-black/35 px-3 py-2 text-[0.64rem] font-black uppercase tracking-[0.2em] text-lime backdrop-blur">
            <MapPin size={13} /> City issue 001
          </div>
          <h1 className="brand-font text-[4.8rem] uppercase leading-[0.78] tracking-[-0.09em] text-white drop-shadow-2xl">
            The Nairobi they don&apos;t show on Google.
          </h1>
        </div>

        <div className="relative z-10 mt-auto space-y-3 pt-10">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="rounded-[1.7rem] border border-white/10 bg-black/48 p-4 backdrop-blur-md">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-lime">For visitors</p>
              <p className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.05em]">Field notes. Street food. Hidden rooms.</p>
            </div>
            <div className="rounded-[1.7rem] border border-lime/20 bg-lime p-4 text-ink shadow-glow">
              <RadioTower size={20} />
              <p className="mt-5 text-[0.66rem] font-black uppercase leading-4 tracking-[0.16em]">No hotel-search energy</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {taglines.map((tagline) => (
              <div className="min-w-[10.7rem] rounded-[1.25rem] border border-white/10 bg-black/42 p-3 text-[0.66rem] font-black uppercase leading-4 tracking-[0.14em] text-white/70 backdrop-blur-md" key={tagline}>
                <Sparkles className="mb-2 text-lime" size={14} />
                {tagline}
              </div>
            ))}
          </div>

          <Link className="flex items-center justify-between rounded-[1.55rem] bg-lime px-5 py-5 text-sm font-black uppercase tracking-[0.2em] text-ink shadow-glow transition hover:scale-[1.01]" href="/nairobi/explore">
            Open the Nairobi issue
            <ArrowRight size={20} strokeWidth={2.8} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

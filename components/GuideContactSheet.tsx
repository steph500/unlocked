"use client";

import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Guide } from "@/data/types";

type GuideContactSheetProps = {
  guide: Guide;
};

export function GuideContactSheet({ guide }: GuideContactSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime px-4 py-4 text-xs font-black uppercase tracking-[0.18em] text-ink shadow-glow transition hover:scale-[1.01]" onClick={() => setOpen(true)} type="button">
        <MessageCircle size={16} />
        Book / Chat
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/80 px-4 pb-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-asphalt p-5 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-lime/20">
                  {guide.image ? <Image alt={guide.name} className="object-cover" fill sizes="56px" src={guide.image} /> : null}
                </div>
                <div>
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-lime">Guide request</p>
                  <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">{guide.name}</h3>
                </div>
              </div>
              <button className="rounded-full bg-white/10 p-2 text-white/70 hover:text-white" onClick={() => setOpen(false)} type="button" aria-label="Close contact sheet">
                <X size={18} />
              </button>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/64">This is a clean MVP placeholder. Next step: connect WhatsApp, SMS, or an in-app booking request. For now, note your preferred date, group size, and vibe.</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/72">
              <p className="font-black text-white">Suggested message</p>
              <p className="mt-2 leading-6">Hi {guide.name}, I found you on Unlocked. I want help exploring Nairobi with a {guide.specialty.toLowerCase()} angle.</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

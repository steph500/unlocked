"use client";

import clsx from "clsx";
import { Bookmark, Compass, Map, Route, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Explore", href: "explore", icon: Compass },
  { label: "Map", href: "map", icon: Map },
  { label: "Saved", href: "saved", icon: Bookmark },
  { label: "Guides", href: "guides", icon: Route },
  { label: "Profile", href: "profile", icon: UserRound }
];

type BottomNavProps = {
  cityId: string;
};

export function BottomNav({ cityId }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md px-4 pb-4 pt-2">
      <div className="rounded-[2rem] border border-lime/15 bg-[#050605]/90 p-1.5 shadow-[0_-18px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <div className="grid grid-cols-5 gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const href = `/${cityId}/${item.href}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                className={clsx(
                  "flex flex-col items-center gap-1 rounded-[1.35rem] px-2 py-2.5 text-[0.58rem] font-black uppercase tracking-[0.16em] transition",
                  active ? "bg-lime text-ink shadow-glow" : "text-white/45 hover:bg-white/[0.08] hover:text-white"
                )}
                href={href}
                key={item.label}
              >
                <Icon aria-hidden size={17} strokeWidth={2.45} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

type PageShellProps = {
  cityId: string;
  children: ReactNode;
  withNav?: boolean;
};

export function PageShell({ cityId, children, withNav = true }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[#020303] text-white">
      <div className="mx-auto min-h-screen max-w-md overflow-hidden border-x border-lime/10 bg-[#020303] shadow-[0_0_120px_rgba(0,0,0,0.9)] figma-screen">
        <div className="relative z-10">
          <div className={withNav ? "pb-28" : undefined}>{children}</div>
          {withNav ? <BottomNav cityId={cityId} /> : null}
        </div>
      </div>
    </main>
  );
}

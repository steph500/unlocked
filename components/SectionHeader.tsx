type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
};

export function SectionHeader({ eyebrow, title, copy }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-[0.62rem] font-black uppercase tracking-[0.3em] text-lime">{eyebrow}</p> : null}
      <h2 className="text-[2.15rem] font-black uppercase leading-[0.82] tracking-[-0.07em] text-white">{title}</h2>
      {copy ? <p className="text-sm font-semibold leading-6 text-white/50">{copy}</p> : null}
    </div>
  );
}

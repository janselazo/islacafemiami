type SectionHeaderProps = {
  number: string;
  label: string;
  centered?: boolean;
  dark?: boolean;
};

export function SectionHeader({
  number,
  label,
  centered = false,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      data-rv
      className={`mb-[18px] flex items-baseline gap-[18px] ${centered ? "justify-center" : ""}`}
    >
      <span
        className={`font-mono text-[13px] tracking-[0.18em] ${dark ? "text-gold-pale" : "text-gold-dark"}`}
      >
        {number}
      </span>
      <span
        className={`text-xs font-extrabold tracking-[0.32em] uppercase ${dark ? "text-gold-muted" : "text-muted"}`}
      >
        {label}
      </span>
      {!centered && (
        <span
          className={`h-px flex-1 bg-gradient-to-r ${dark ? "from-gold-dark to-transparent" : "from-gold-pale to-transparent"}`}
        />
      )}
    </div>
  );
}

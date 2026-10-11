interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  dark?: boolean
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl mb-16 ${centered ? "mx-auto text-center" : ""}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-mono mb-4 ${
            dark
              ? "bg-white/5 border border-white/10 text-slate-300"
              : "liquid-glass text-muted-foreground"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
          {badge}
        </div>
      )}

      <h2
        className={`text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] mb-6 ${
          dark ? "text-white" : "text-foreground"
        }`}
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {title}{" "}
        {highlight && (
          <em className="not-italic text-[#f46a06]">{highlight}</em>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light ${
            dark ? "text-slate-300" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

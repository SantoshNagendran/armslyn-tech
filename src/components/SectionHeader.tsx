interface SectionHeaderProps {
  badge: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`sec-header max-w-3xl mb-16 ${
        centered ? "mx-auto text-center" : ""
      } ${className}`}
    >
      <div className="sec-badge inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs uppercase tracking-widest text-muted-foreground mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
        {badge}
      </div>

      <h2
        className="sec-title text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-[1.08] mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {title}{" "}
        {highlight && (
          <em className="not-italic text-muted-foreground">{highlight}</em>
        )}
      </h2>

      {subtitle && (
        <p className="sec-subtitle text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

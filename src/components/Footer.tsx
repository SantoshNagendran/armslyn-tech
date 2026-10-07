import { ArrowUp } from "lucide-react"

interface FooterProps {
  onScrollToTop: () => void
  onNavigate: (id: string) => void
}

export function Footer({ onScrollToTop, onNavigate }: FooterProps) {
  const links = [
    { label: "Home", id: "hero" },
    { label: "Process", id: "process" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projects", id: "work" },
    { label: "Why Us", id: "why-us" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <footer className="relative border-t border-foreground/10 py-16 px-6 max-w-7xl mx-auto w-full z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div>
          <span
            className="text-3xl tracking-tight text-foreground inline-flex items-baseline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>Armslyn Tech</span>
            <sup className="text-xs ml-0.5 font-sans">®</sup>
          </span>
          <p className="text-muted-foreground text-xs mt-2 max-w-sm">
            High-performance engineering studio. We build websites that hold attention.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div>
          <button
            onClick={onScrollToTop}
            className="liquid-glass rounded-full px-5 py-2.5 text-xs text-foreground inline-flex items-center gap-2 hover:text-primary hover:border-primary/40 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-foreground/10 text-[11px] text-muted-foreground font-mono">
        <div>© 2026 Armslyn Tech. All rights reserved.</div>
        <div>Crafted with React, Tailwind CSS, TypeScript & GSAP.</div>
      </div>
    </footer>
  )
}

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
    <footer className="relative w-full z-10 bg-[#020408] text-white border-t border-slate-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <span
              className="text-3xl tracking-tight text-white inline-flex items-baseline"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span>Armslyn Tech</span>
              <sup className="text-xs ml-0.5 font-sans font-bold text-[#f46a06]">®</sup>
            </span>
            <p className="text-slate-400 text-xs mt-2 max-w-sm font-light">
              High-performance engineering studio. We build websites that hold attention.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="hover:text-[#f46a06] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div>
            <button
              onClick={onScrollToTop}
              className="rounded-full px-5 py-2.5 text-xs font-mono font-medium text-slate-300 border border-slate-800 bg-slate-900/80 inline-flex items-center gap-2 hover:text-[#f46a06] hover:border-[#f46a06]/40 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#f46a06]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-900 text-[11px] text-slate-500 font-mono">
          <div>© 2026 Armslyn Tech. All rights reserved.</div>
          <div>Bespoke engineering with React, Tailwind CSS, TypeScript & GSAP.</div>
        </div>
      </div>
    </footer>
  )
}

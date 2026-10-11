import { SectionHeader } from "./SectionHeader"
import { ArrowUpRight } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Vanguard Studio Platform",
      category: "Creative Agency & WebGL Experience",
      year: "2026",
      summary: "Cinematic full-bleed editorial experience with procedural camera transitions and custom audio reactive elements.",
      metrics: "0.38s Load Time • 140% Retention Surge",
      accent: "from-[#f46a06]/25 to-orange-600/10",
      tagColor: "text-[#f46a06] border-[#f46a06]/30 bg-[#f46a06]/10",
    },
    {
      title: "Aura Fintech Dashboard",
      category: "SaaS Application & Analytics UI",
      year: "2026",
      summary: "Real-time algorithmic trading interface with clean glassmorphic controls and millisecond telemetry.",
      metrics: "Enterprise Security • 60fps Chart Rendering",
      accent: "from-sky-500/25 to-teal-500/10",
      tagColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    },
    {
      title: "Chronicle Editorial Journal",
      category: "Modern Publishing & Dynamic CMS",
      year: "2025",
      summary: "Award-winning typography and narrative layout with fluid cursor interactions and instant static edge delivery.",
      metrics: "100/100 Lighthouse • Global Audience",
      accent: "from-amber-500/25 to-yellow-600/10",
      tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
  ]

  return (
    <section id="work" className="relative py-28 sm:py-36 w-full z-10 bg-[#06070a] text-white overflow-hidden border-b border-neutral-800/80">
      {/* Cinematic Spotlight Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#f46a06]/10 via-sky-500/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Projects Done"
          title="Curated work built to"
          highlight="redefine standards."
          subtitle="Selected case studies representing our dedication to typography, motion fluidity, and uncompromising engineering."
          dark={true}
        />

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-8 sm:p-12 bg-[#0c0e14]/90 border border-neutral-800/90 backdrop-blur-md transition-all duration-300 hover:border-neutral-700 group relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${project.accent} blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700 opacity-70`} />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-400 mb-3 font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] ${project.tagColor}`}>
                      {project.category}
                    </span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl text-white font-normal mb-4 group-hover:text-[#f46a06] transition-colors"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {project.summary}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
                    {project.metrics}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between pt-6 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
                  <div className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white group-hover:bg-[#f46a06] group-hover:border-[#f46a06] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

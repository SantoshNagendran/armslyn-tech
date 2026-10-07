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
      accent: "from-primary/20 to-orange-600/10",
    },
    {
      title: "Aura Fintech Dashboard",
      category: "SaaS Application & Analytics UI",
      year: "2026",
      summary: "Real-time algorithmic trading interface with clean glassmorphic controls and millisecond telemetry.",
      metrics: "Enterprise Security • 60fps Chart Rendering",
      accent: "from-sky-600/20 to-teal-600/10",
    },
    {
      title: "Chronicle Editorial Journal",
      category: "Modern Publishing & Dynamic CMS",
      year: "2025",
      summary: "Award-winning typography and narrative layout with fluid cursor interactions and instant static edge delivery.",
      metrics: "100/100 Lighthouse • Global Audience",
      accent: "from-amber-600/20 to-primary/10",
    },
  ]

  return (
    <section id="work" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Projects Done"
        title="Curated work built to"
        highlight="redefine standards."
        subtitle="Selected case studies representing our dedication to typography, motion fluidity, and uncompromising engineering."
      />

      <div className="space-y-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-8 sm:p-12 transition-all duration-300 hover:border-primary/40 group relative overflow-hidden"
          >
            <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${project.accent} blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700 opacity-60`} />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h3
                  className="text-3xl sm:text-4xl text-foreground font-normal mb-4 group-hover:text-primary transition-colors"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  {project.summary}
                </p>

                <div className="text-xs font-mono text-primary font-medium">
                  {project.metrics}
                </div>
              </div>

              <div className="self-start lg:self-center">
                <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-primary/40 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

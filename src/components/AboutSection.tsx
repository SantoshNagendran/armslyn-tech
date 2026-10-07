import { SectionHeader } from "./SectionHeader"
import { Sparkles, Terminal, Cpu } from "lucide-react"

export function AboutSection() {
  const stats = [
    { label: "Performance Benchmark", value: "99+", suffix: "/100 Lighthouse" },
    { label: "Bespoke Codebase", value: "100%", suffix: "Zero templates" },
    { label: "Global Deployments", value: "24/7", suffix: "High-availability" },
  ]

  return (
    <section id="about" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="About Us"
        title="We build digital products that"
        highlight="refuse to be ignored."
        subtitle="Armslyn Tech is an independent engineering and design studio. We partner with forward-thinking brands and ambitious teams to craft high-conversion web experiences."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-8 transition-all duration-300 hover:border-[#567C8D]/30 hover:-translate-y-1 relative overflow-hidden group"
          >
            <div className="text-4xl sm:text-5xl font-normal text-foreground mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {stat.value}
            </div>
            <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.suffix}</div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f46a06]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3
              className="text-3xl sm:text-4xl text-foreground font-normal mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Obsessive craft. Uncompromising speed.
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most agency websites are weighed down by bloated page builders and recycled themes. We operate differently. Every layout, animation curve, and asset is engineered from scratch for blistering performance, smooth interaction, and unforgettable visual retention.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#567C8D]/8 border border-[#567C8D]/15 text-muted-foreground">
                <Terminal className="w-3.5 h-3.5" /> Modern Stack
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#567C8D]/8 border border-[#567C8D]/15 text-muted-foreground">
                <Cpu className="w-3.5 h-3.5" /> Hardware-Accelerated
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#567C8D]/8 border border-[#567C8D]/15 text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5" /> 60fps Micro-interactions
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-[#567C8D]/15 bg-[#567C8D]/8 p-6 font-mono text-xs text-muted-foreground overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#567C8D]/15 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[11px] text-foreground/50">studio-manifesto.ts</span>
            </div>
            <pre className="text-foreground/80 leading-relaxed overflow-x-auto">
{`export const ArmslynPhilosophy = {
  mission: "Craft digital presence that captivates",
  principles: [
    "Typography sets the rhythm",
    "Fluid motion brings life",
    "Every millisecond is an impression",
    "No generic templates, ever"
  ],
  readyToElevate: true
};`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

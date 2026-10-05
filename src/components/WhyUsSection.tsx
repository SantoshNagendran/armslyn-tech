import { SectionHeader } from "./SectionHeader"
import { Gauge, Eye, Code2, Users2 } from "lucide-react"

export function WhyUsSection() {
  const reasons = [
    {
      icon: Gauge,
      title: "Speed as a First Principle",
      desc: "We don't optimize speed at the end. We architect for sub-second load times from the very first line of code, reducing bounce rates and maximizing conversions.",
    },
    {
      icon: Eye,
      title: "Visual Gravitas",
      desc: "Our typography, layout geometry, and animations are designed to hold user attention in an era of rapid scrolling and fleeting attention spans.",
    },
    {
      icon: Code2,
      title: "Zero Agency Overhead",
      desc: "No account managers playing telephone. You collaborate directly with top-tier developers and designers who build your exact vision.",
    },
    {
      icon: Users2,
      title: "Future-Proof Foundation",
      desc: "Every project is handed over with clean, typed, modular code that your in-house team can easily extend, scale, and maintain without lock-in.",
    },
  ]

  return (
    <section id="why-us" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Why Us"
        title="Engineered differently because"
        highlight="details matter."
        subtitle="Here is why growing companies and creative visionaries choose Armslyn Tech over traditional bloated agencies."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((reason, idx) => {
          const Icon = reason.icon
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 relative group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-foreground mb-6">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3
                  className="text-xl sm:text-2xl text-foreground font-normal mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {reason.title}
                </h3>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-muted-foreground/60">
                Pillar 0{idx + 1}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

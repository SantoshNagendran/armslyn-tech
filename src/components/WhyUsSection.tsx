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
    <section id="why-us" className="relative py-28 sm:py-36 w-full z-10 bg-[#d8d0a8] text-[#0f233a] overflow-hidden border-b border-[#567C8D]/20">
      {/* Warm Ambient Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(244,106,6,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Why Us"
          title="Engineered differently because"
          highlight="details matter."
          subtitle="Here is why growing companies and creative visionaries choose Armslyn Tech over traditional bloated agencies."
          dark={false}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl p-7 transition-all duration-300 hover:border-[#f46a06]/50 hover:-translate-y-1 relative group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0f233a]/8 border border-[#0f233a]/15 flex items-center justify-center mb-6 text-[#f46a06]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3
                    className="text-xl text-[#0f233a] font-normal mb-3"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {reason.title}
                  </h3>

                  <p className="text-sm text-[#476779] leading-relaxed font-light">
                    {reason.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0f233a]/10 text-[10px] font-mono text-[#0f233a]/60 uppercase tracking-widest">
                  Standard #{idx + 1}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

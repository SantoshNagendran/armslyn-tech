import { SectionHeader } from "./SectionHeader"
import { Layers, Zap, Globe, ShieldCheck } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Layers,
      title: "Bespoke Web Development",
      description: "Tailor-made websites engineered with clean semantic code, tailored animations, and zero dependency bloat.",
      tags: ["React", "TypeScript", "Tailwind", "Vite"],
    },
    {
      icon: Zap,
      title: "High-Performance Web Apps",
      description: "Fast, resilient web applications with real-time reactivity, intuitive workflows, and state-of-the-art UI.",
      tags: ["Modern Frameworks", "API Architecture", "Cloud Native"],
    },
    {
      icon: Globe,
      title: "Interactive & Cinematic Motion",
      description: "Scroll-triggered choreography, GPU-accelerated shaders, and micro-interactions that elevate brand prestige.",
      tags: ["GSAP", "Three.js", "Smooth Scroll", "Micro-Interactions"],
    },
    {
      icon: ShieldCheck,
      title: "Performance & SEO Architecture",
      description: "Audit-grade optimization guaranteeing top Lighthouse scores, instant mobile load times, and search visibility.",
      tags: ["Sub-second FCP", "Edge Caching", "Accessibility", "Technical SEO"],
    },
  ]

  return (
    <section id="services" className="relative py-28 sm:py-36 w-full z-10 bg-[#07131e] text-white overflow-hidden border-b border-slate-800/80">
      {/* Theme Atmosphere Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#f46a06]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Our Services"
          title="Engineering excellence for brands that"
          highlight="demand the best."
          subtitle="We deliver end-to-end design and code solutions that balance cinematic artistry with rock-solid technical execution."
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="rounded-3xl p-8 sm:p-10 bg-slate-900/60 border border-slate-800/90 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 hover:-translate-y-1.5 relative overflow-hidden group flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-[#f46a06]/40 transition-colors">
                    <Icon className="w-6 h-6 text-[#f46a06]" />
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl text-white font-normal mb-3"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/80">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-3 py-1 rounded-full bg-sky-950/50 text-sky-300 border border-sky-800/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

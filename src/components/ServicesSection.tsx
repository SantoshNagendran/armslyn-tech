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
    <section id="services" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Our Services"
        title="Engineering excellence for brands that"
        highlight="demand the best."
        subtitle="We deliver end-to-end design and code solutions that balance cinematic artistry with rock-solid technical execution."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:border-[#567C8D]/30 hover:-translate-y-1.5 relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-foreground mb-6">
                  <Icon className="w-6 h-6 text-[#f46a06]" />
                </div>

                <h3
                  className="text-2xl sm:text-3xl text-foreground font-normal mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#567C8D]/10">
                {service.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs text-muted-foreground/80 bg-[#567C8D]/8 px-2.5 py-1 rounded-full font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-[#f46a06]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

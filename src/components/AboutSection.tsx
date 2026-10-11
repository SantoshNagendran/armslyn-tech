import { Zap, Terminal, Sparkles, Binary } from "lucide-react"
import { BackgroundCells } from "./ui/background-ripple-effect"
import PixelToAsciiImage from "./ui/pixel-to-ascii-image"

export function AboutSection() {
  const principles = [
    {
      num: "01",
      icon: Zap,
      title: "Speed is Respect",
      desc: "A sluggish site wastes your visitor's time and quietly kills conversions. We architect every render cycle and byte for sub-second responses so your brand feels instant.",
    },
    {
      num: "02",
      icon: Terminal,
      title: "Code is Craft",
      desc: "Zero bloated page builders, zero fragile plugins. Every project is built from scratch with clean, typed, modular engineering that your team can scale without lock-in.",
    },
    {
      num: "03",
      icon: Sparkles,
      title: "Attention is Earned",
      desc: "Visitors don't read generic templates—they bounce. We orchestrate deliberate typography, fluid micro-motion, and visual gravitas that hold focus in a noisy world.",
    },
  ]

  const founders = [
    {
      name: "Santosh Nagendran",
      role: "Founder & Lead Systems Architect",
      bio: "Obsessed with 60fps interaction models, hardware-accelerated shaders, and clean, unbloated codebases.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Aravind Nair",
      role: "Co-Founder & Design Director",
      bio: "Translating brand identity into razor-sharp typography, deliberate layout geometry, and visceral motion.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
  ]

  return (
    <section id="about" className="relative py-24 sm:py-32 w-full z-10 overflow-hidden">
      {/* Background ripple cells applied strictly to the About section */}
      <BackgroundCells className="w-full py-12 px-6">
        <div className="max-w-7xl mx-auto w-full relative z-20">
          
          {/* Header - No pill badge, opens directly into the origin story */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl tracking-tight text-foreground leading-[1.06] mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Built out of frustration with{" "}
              <em className="not-italic text-[#f46a06]">bloated websites.</em>
            </h2>

            <p className="text-muted-foreground text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              We founded Armslyn Tech because we grew tired of seeing ambitious brands settle for slow, generic templates that fail to convert. We set out to build an engineering-led web studio where obsessive speed, typographic elegance, and bespoke code are the baseline, not an afterthought.
            </p>
          </div>

          {/* Founders Grid with Interactive ASCII Art Portraits */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <Binary className="w-4 h-4 text-[#f46a06]" />
                <span>Founding Team • Procedural ASCII Port</span>
              </div>
              <span className="text-[11px] font-mono text-foreground/50 hidden sm:inline-block">
                Hover card to toggle ASCII / Photo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {founders.map((founder, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start group hover:border-[#f46a06]/40 transition-all duration-300"
                >
                  {/* ASCII Portrait Frame */}
                  <div className="relative shrink-0 rounded-2xl overflow-hidden border border-foreground/15 shadow-xl bg-background/50">
                    <PixelToAsciiImage
                      src={founder.image}
                      width={220}
                      height={240}
                      charSize={10}
                      textColor="#f46a06"
                      defaultAscii={true}
                      className="w-[200px] h-[220px] sm:w-[220px] sm:h-[240px]"
                    />
                    <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-background/80 text-foreground/80 backdrop-blur-sm border border-foreground/10">
                        ASCII Matrix
                      </span>
                    </div>
                  </div>

                  {/* Founder Details */}
                  <div className="flex flex-col justify-between h-full text-center sm:text-left py-1">
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl text-foreground font-normal tracking-tight mb-1"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {founder.name}
                      </h3>
                      <div className="text-xs font-mono font-medium text-[#f46a06] mb-4">
                        {founder.role}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {founder.bio}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-foreground/10 flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-foreground/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Armslyn Core Team</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Believe (3 Core Principles replacing old stat blocks) */}
          <div className="mt-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3
                className="text-3xl sm:text-4xl text-foreground font-normal mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                What We Believe
              </h3>
              <p className="text-muted-foreground text-sm font-light">
                Three unwavering engineering and design standards behind everything we ship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl p-8 transition-all duration-300 hover:border-[#f46a06]/35 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-[#f46a06]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground font-medium tracking-widest">
                          {item.num}
                        </span>
                      </div>

                      <h4
                        className="text-2xl text-foreground font-normal mb-3"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {item.title}
                      </h4>

                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-foreground/10 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 opacity-80">
                      <span className="text-[#f46a06]">›</span> Non-negotiable standard
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </BackgroundCells>
    </section>
  )
}

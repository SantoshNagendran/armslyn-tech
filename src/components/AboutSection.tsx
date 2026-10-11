import { Zap, Terminal, Sparkles, UserPlus, Binary } from "lucide-react"
import { BackgroundCells } from "./ui/background-ripple-effect"

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

  // Three blank founder slots ready to be filled in later
  const blankFounders = [
    {
      id: "01",
      name: "Founder 01",
      role: "Architecture & Lead Engineering",
      bio: "Founder bio and background story will be added here.",
    },
    {
      id: "02",
      name: "Founder 02",
      role: "Design Direction & Experience",
      bio: "Founder bio and background story will be added here.",
    },
    {
      id: "03",
      name: "Founder 03",
      role: "Product & Technical Strategy",
      bio: "Founder bio and background story will be added here.",
    },
  ]

  return (
    <section id="about" className="relative py-28 sm:py-36 w-full z-10 overflow-hidden">
      {/* BackgroundCells ripple effect applied strictly to the About section */}
      <BackgroundCells className="w-full py-16 px-6 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto w-full relative z-20">
          
          {/* Header - No pill badge, opens directly into the origin story */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.06] mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Built out of frustration with{" "}
              <em className="not-italic text-[#f46a06]">bloated websites.</em>
            </h2>

            <p className="text-slate-400 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              We founded Armslyn Tech because we grew tired of seeing ambitious brands settle for slow, generic templates that fail to convert. We set out to build an engineering-led web studio where obsessive speed, typographic elegance, and bespoke code are the baseline, not an afterthought.
            </p>
          </div>

          {/* Three Blank Founder Cards with ASCII Placeholder Art */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
                <Binary className="w-4 h-4 text-[#f46a06]" />
                <span>Founding Team • 3 Co-Founders</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
                Slots configured • Ready for profile data
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {blankFounders.map((founder) => (
                <div
                  key={founder.id}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/60 border border-slate-800/90 backdrop-blur-md flex flex-col justify-between group hover:border-[#f46a06]/50 transition-all duration-300 shadow-xl"
                >
                  {/* Blank ASCII Art Placeholder Box */}
                  <div>
                    <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden border border-dashed border-slate-700/80 bg-slate-950/70 flex flex-col items-center justify-center p-4 mb-6 group-hover:border-[#f46a06]/60 transition-colors">
                      {/* Procedural ASCII Scanlines & Grid */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none font-mono text-[9px] text-slate-400 overflow-hidden leading-none select-none p-2 flex flex-col justify-between">
                        <div>+ . : * # @ % = - : + . : * # @ % = -</div>
                        <div>: * # @ % = - : + . : * # @ % = - : +</div>
                        <div># @ % = - : + . : * # @ % = - : + . :</div>
                        <div>% = - : + . : * # @ % = - : + . : * #</div>
                        <div>- : + . : * # @ % = - : + . : * # @ %</div>
                        <div>+ . : * # @ % = - : + . : * # @ % = -</div>
                        <div>: * # @ % = - : + . : * # @ % = - : +</div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center text-center gap-2">
                        <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900/80 flex items-center justify-center text-slate-400 group-hover:text-[#f46a06] group-hover:border-[#f46a06]/50 transition-colors">
                          <UserPlus className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-medium">
                          Add Photo Later
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          ASCII Portrait Slot {founder.id}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-slate-900/90 text-slate-400 border border-slate-800">
                          Placeholder
                        </span>
                      </div>
                    </div>

                    {/* Blank Founder Metadata */}
                    <div className="flex items-baseline justify-between mb-1">
                      <h3
                        className="text-2xl text-white font-normal tracking-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {founder.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500">
                        #{founder.id}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-medium text-[#f46a06] mb-3">
                      {founder.role}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {founder.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      Pending Bio
                    </span>
                    <span className="text-[#f46a06] opacity-0 group-hover:opacity-100 transition-opacity">
                      Edit ›
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Believe (3 Core Principles replacing old stat blocks) */}
          <div className="mt-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3
                className="text-3xl sm:text-4xl text-white font-normal mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                What We Believe
              </h3>
              <p className="text-slate-400 text-sm font-light">
                Three unwavering engineering and design standards behind everything we ship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="rounded-2xl p-8 bg-slate-900/50 border border-slate-800/80 backdrop-blur-md transition-all duration-300 hover:border-[#f46a06]/40 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-[#f46a06] group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs text-slate-500 font-medium tracking-widest">
                          {item.num}
                        </span>
                      </div>

                      <h4
                        className="text-2xl text-white font-normal mb-3"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {item.title}
                      </h4>

                      <p className="text-sm text-slate-400 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/70 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
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

import { UserPlus, Sparkles } from "lucide-react"
import { BackgroundCells } from "./ui/background-ripple-effect"
import { BeliefCarousel } from "./BeliefCarousel"

export function AboutSection() {
  // Three blank founder slots ready to be populated later
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
    <section id="about" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
      {/* Floating Dark Overlay Container over the cream site background */}
      <div className="rounded-[32px] sm:rounded-[40px] overflow-hidden border border-slate-800/90 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] relative bg-[#030712]">
        
        {/* BackgroundCells ripple effect contained strictly inside this dark card overlay */}
        <BackgroundCells className="w-full py-16 sm:py-24 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto w-full relative z-20">
            
            {/* Header - No pill badge, opens directly into the human origin story */}
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h2
                className="text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.06] mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Built out of frustration with{" "}
                <em className="not-italic text-[#f46a06]">bloated websites.</em>
              </h2>

              <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-light">
                We founded Armslyn Tech because we grew tired of seeing ambitious brands settle for slow, generic templates that fail to convert. We set out to build an independent, human-led engineering studio where obsessive speed, typographic elegance, and bespoke code are the baseline, not an afterthought.
              </p>
            </div>

            {/* Three Blank Founder Cards with Tactile Placeholder Frames */}
            <div className="mb-24">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
                  <Sparkles className="w-4 h-4 text-[#f46a06]" />
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
                    className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800/90 backdrop-blur-md flex flex-col justify-between group hover:border-[#f46a06]/50 transition-all duration-300 shadow-xl"
                  >
                    {/* Blank Photo Placeholder Frame */}
                    <div>
                      <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden border border-dashed border-slate-700/80 bg-slate-950/80 flex flex-col items-center justify-center p-4 mb-6 group-hover:border-[#f46a06]/60 transition-colors">
                        {/* Subtle Craft Scanlines */}
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
                          <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-900/90 flex items-center justify-center text-slate-400 group-hover:text-[#f46a06] group-hover:border-[#f46a06]/50 transition-colors">
                            <UserPlus className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-xs uppercase tracking-wider text-slate-200 font-medium">
                            Add Photo Later
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            Studio Portrait Slot {founder.id}
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

            {/* What We Believe Carousel */}
            <div className="pt-8 border-t border-slate-800/80">
              <BeliefCarousel />
            </div>

          </div>
        </BackgroundCells>
      </div>
    </section>
  )
}

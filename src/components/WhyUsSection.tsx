import React, { useEffect, useRef, useState } from "react"
import { SectionHeader } from "./SectionHeader"
import {
  Gauge,
  Users2,
  Code2,
  CheckCircle2,
  XCircle,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs/lib/anime.es.js"

gsap.registerPlugin(ScrollTrigger)

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bentoGridRef = useRef<HTMLDivElement>(null)
  const metricScoreRef = useRef<HTMLSpanElement>(null)
  const metricSpeedRef = useRef<HTMLSpanElement>(null)
  const [activeBenchmark, setActiveBenchmark] = useState<"armslyn" | "agency">("armslyn")
  const [activeTab, setActiveTab] = useState<"typescript" | "motion" | "clean">("typescript")
  const [elasticHover, setElasticHover] = useState(false)
  const curveRef = useRef<SVGPathElement>(null)

  // Watermelon UI: Dynamic mouse spotlight tracking across Bento cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = bentoGridRef.current?.querySelectorAll<HTMLDivElement>(".bento-spotlight-card")
    if (!cards) return
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    })
  }

  // Interactive elastic spring animation on the physics curve using anime.js
  useEffect(() => {
    if (!curveRef.current) return
    if (elasticHover) {
      anime({
        targets: curveRef.current,
        d: [
          { value: "M 10 70 Q 90 10 170 45 T 330 20" },
          { value: "M 10 70 Q 90 90 170 30 T 330 65" },
          { value: "M 10 70 Q 90 25 170 45 T 330 35" },
        ],
        easing: "easeOutElastic(1, .5)",
        duration: 1200,
      })
    } else {
      anime({
        targets: curveRef.current,
        d: [{ value: "M 10 70 Q 90 25 170 45 T 330 35" }],
        easing: "easeOutQuad",
        duration: 600,
      })
    }
  }, [elasticHover])

  // GSAP ScrollTrigger & Anime.js metric count-up on section reveal
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Stagger entrance for bento cards
      gsap.fromTo(
        ".bento-spotlight-card",
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => {
              // Trigger anime.js numeric counter
              if (metricScoreRef.current) {
                anime({
                  targets: metricScoreRef.current,
                  innerHTML: [0, 100],
                  round: 1,
                  easing: "easeOutExpo",
                  duration: 1800,
                })
              }
              if (metricSpeedRef.current) {
                const obj = { val: 2.4 }
                anime({
                  targets: obj,
                  val: 0.38,
                  round: 100,
                  easing: "easeOutExpo",
                  duration: 1800,
                  update: () => {
                    if (metricSpeedRef.current) {
                      metricSpeedRef.current.innerHTML = obj.val.toFixed(2)
                    }
                  },
                })
              }
            },
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Section Header with "Why Us" Pill REMOVED */}
      <SectionHeader
        title="Engineered differently because"
        highlight="details matter."
        subtitle="We rejected bloated agency models and generic templates. Every line of code, easing curve, and database query is handcrafted for unmatched velocity and longevity."
        dark={false}
      />

      {/* Watermelon UI Bento Grid with Mouse Spotlight Aura */}
      <div
        ref={bentoGridRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative"
      >
        {/* ── BENTO CARD 1 (7 cols): Live Performance & Telemetry Benchmark ── */}
        <div className="bento-spotlight-card lg:col-span-7 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          {/* Spotlight Radial Overlay */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            {/* Top Row: Icon badge + Benchmark Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                  <Gauge className="w-6 h-6 text-[#f46a06]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] font-semibold block">
                    Telemetry Benchmark
                  </span>
                  <h4 className="text-sm font-mono font-bold text-[#0f233a]">
                    Real-World Performance
                  </h4>
                </div>
              </div>

              {/* Interactive Mode Toggle */}
              <div className="inline-flex items-center p-1 rounded-full liquid-glass border border-[#0f233a]/15 text-xs font-mono">
                <button
                  onClick={() => setActiveBenchmark("armslyn")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    activeBenchmark === "armslyn"
                      ? "bg-[#f46a06] text-white font-bold shadow-xs"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Armslyn Standard
                </button>
                <button
                  onClick={() => setActiveBenchmark("agency")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    activeBenchmark === "agency"
                      ? "bg-[#0f233a] text-white font-bold shadow-xs"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Legacy Agencies
                </button>
              </div>
            </div>

            {/* Benchmark Visualizer Widget */}
            <div className="p-5 sm:p-6 rounded-2xl liquid-glass border border-[#0f233a]/10 mb-6 relative overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {/* Metric 1: Lighthouse */}
                <div className="p-3 rounded-xl bg-white/40 border border-[#0f233a]/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    Lighthouse
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0f233a] flex items-center justify-center">
                    {activeBenchmark === "armslyn" ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <span ref={metricScoreRef}>100</span>
                        <span className="text-xs">/100</span>
                      </span>
                    ) : (
                      <span className="text-amber-700">46/100</span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-[#0f233a]/60 block mt-1">
                    {activeBenchmark === "armslyn" ? "Perfect Score" : "Critical Warnings"}
                  </span>
                </div>

                {/* Metric 2: Load Time */}
                <div className="p-3 rounded-xl bg-white/40 border border-[#0f233a]/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    FCP Latency
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0f233a]">
                    {activeBenchmark === "armslyn" ? (
                      <span className="text-emerald-700">
                        <span ref={metricSpeedRef}>0.38</span>s
                      </span>
                    ) : (
                      <span className="text-red-700">3.40s</span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-[#0f233a]/60 block mt-1">
                    {activeBenchmark === "armslyn" ? "Sub-second" : "User Abandonment"}
                  </span>
                </div>

                {/* Metric 3: Layout Shift */}
                <div className="p-3 rounded-xl bg-white/40 border border-[#0f233a]/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    CLS Shift
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0f233a]">
                    {activeBenchmark === "armslyn" ? (
                      <span className="text-emerald-700">0.00</span>
                    ) : (
                      <span className="text-red-700">0.34</span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-[#0f233a]/60 block mt-1">
                    {activeBenchmark === "armslyn" ? "Zero Jitter" : "Jitter & Jump"}
                  </span>
                </div>

                {/* Metric 4: Payload */}
                <div className="p-3 rounded-xl bg-white/40 border border-[#0f233a]/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                    Bundle Weight
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0f233a]">
                    {activeBenchmark === "armslyn" ? (
                      <span className="text-emerald-700">198kb</span>
                    ) : (
                      <span className="text-red-700">8.2mb</span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-[#0f233a]/60 block mt-1">
                    {activeBenchmark === "armslyn" ? "Tree-Shaken" : "Bloated Plugins"}
                  </span>
                </div>
              </div>
            </div>

            {/* Text description */}
            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Speed is an architecture, not an afterthought.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed">
              Every 100ms of latency drops conversion by 7%. We eliminate heavy CMS dependencies and bloated builder scripts. We build on pure React 19, TypeScript, and modern edge infrastructure to guarantee instant page loads worldwide.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Core Web Vitals Guaranteed
            </span>
            <span>Standard 01</span>
          </div>
        </div>

        {/* ── BENTO CARD 2 (5 cols): Direct Studio Collaboration (Zero Agency Fluff) ── */}
        <div className="bento-spotlight-card lg:col-span-5 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20 mb-6">
              <Users2 className="w-6 h-6 text-[#f46a06]" />
            </div>

            {/* Pipeline Architecture Diagram */}
            <div className="space-y-3 mb-6 p-4 rounded-2xl liquid-glass border border-[#0f233a]/10 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#0f233a]/10">
                <span className="text-[#0f233a]/60">Traditional Agency:</span>
                <span className="text-red-700 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> 4 Layers of Telephone
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#0f233a] font-bold">Armslyn Studio:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You ⇄ Lead Architects
                </span>
              </div>
            </div>

            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Zero agency overhead. Direct master craftsmanship.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed">
              No account managers playing telephone with overseas juniors. You work directly with the senior developers and designers building your production product. Decisions happen in hours, not weeks.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="text-[#f46a06] font-semibold flex items-center gap-1">
              Direct Slack/Discord Access
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span>Standard 02</span>
          </div>
        </div>

        {/* ── BENTO CARD 3 (5 cols): Editorial Gravitas & Physics Motion ── */}
        <div
          onMouseEnter={() => setElasticHover(true)}
          onMouseLeave={() => setElasticHover(false)}
          className="bento-spotlight-card lg:col-span-5 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10"
        >
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                <Activity className="w-6 h-6 text-[#f46a06]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] px-3 py-1 rounded-full liquid-glass border border-[#0f233a]/10">
                Hover to Test Elasticity
              </span>
            </div>

            {/* Interactive Spring Wave Visualizer */}
            <div className="p-4 rounded-2xl liquid-glass border border-[#0f233a]/10 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 340 80" className="w-full h-16 stroke-[#f46a06] fill-none stroke-2">
                <path ref={curveRef} d="M 10 70 Q 90 25 170 45 T 330 35" strokeLinecap="round" />
              </svg>
              <div className="flex items-center justify-between w-full text-[10px] font-mono text-[#0f233a]/60 mt-1">
                <span>0ms Initial</span>
                <span className="text-[#f46a06] font-bold">Anime.js Elastic Spring</span>
                <span>60fps V-Sync</span>
              </div>
            </div>

            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Visual gravitas that commands attention.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed">
              We design bespoke geometric typography, kinetic interactions, and fluid physics curves that make your website feel alive. Your visitors will immediately perceive the difference between cheap templates and bespoke engineering.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="text-emerald-700 font-semibold">60 FPS Hardware Accelerated</span>
            <span>Standard 03</span>
          </div>
        </div>

        {/* ── BENTO CARD 4 (7 cols): Surgical Code Architecture & 100% Ownership ── */}
        <div className="bento-spotlight-card lg:col-span-7 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            {/* Top row with Code tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                  <Code2 className="w-6 h-6 text-[#f46a06]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] font-semibold block">
                    Zero Technical Debt
                  </span>
                  <h4 className="text-sm font-mono font-bold text-[#0f233a]">
                    Clean Modular Repository
                  </h4>
                </div>
              </div>

              {/* Code Tab buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl liquid-glass border border-[#0f233a]/15 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab("typescript")}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activeTab === "typescript"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  schema.ts
                </button>
                <button
                  onClick={() => setActiveTab("motion")}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activeTab === "motion"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  motion.config
                </button>
                <button
                  onClick={() => setActiveTab("clean")}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activeTab === "clean"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  pipeline.yml
                </button>
              </div>
            </div>

            {/* Interactive Holographic Code Editor Preview */}
            <div className="rounded-2xl bg-[#0f233a] p-4 sm:p-5 text-white font-mono text-xs border border-white/10 shadow-xl mb-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-[11px] text-white/50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-white/70">src/architecture/{activeTab}.ts</span>
              </div>

              {activeTab === "typescript" && (
                <pre className="text-white/90 overflow-x-auto leading-relaxed">
                  <code>{`// Strictly typed architecture with zero 'any' escapes
export interface StudioBuild<T> {
  latency: 'sub-second';
  architecture: 'modular-typed';
  ownership: '100%-client-retained';
  benchmark: CoreWebVitals<T>;
}
// Ready for your team to scale without lock-in`}</code>
                </pre>
              )}

              {activeTab === "motion" && (
                <pre className="text-white/90 overflow-x-auto leading-relaxed">
                  <code>{`// GSAP & Anime.js coordinated kinetic physics
export const springPhysics = {
  damping: 24,
  stiffness: 220,
  mass: 0.8,
  renderMode: 'hardware-accelerated'
};`}</code>
                </pre>
              )}

              {activeTab === "clean" && (
                <pre className="text-white/90 overflow-x-auto leading-relaxed">
                  <code>{`# CI/CD Automated Quality Gates
steps:
  - run: tsc --noEmit && oxlint
  - run: lighthouse-ci --assert.perf=100
  - deploy: edge-static-distribution`}</code>
                </pre>
              )}
            </div>

            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Zero vendor lock-in. You own every byte.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed">
              When we hand over the keys, you receive a meticulously documented Git repository with clean commits, strict TypeScript schemas, and zero obfuscation. Your in-house engineers can step in on day one with zero friction.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Layers className="w-4 h-4 text-emerald-600" />
              100% Client Codebase Ownership
            </span>
            <span>Standard 04</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection

import React, { useEffect, useRef, useState } from "react"
import { SectionHeader } from "./SectionHeader"
import {
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Clock,
  Lock,
  Sparkles,
  XCircle,
  ExternalLink,
  KeyRound,
  Wrench,
  Check,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs/lib/anime.es.js"

gsap.registerPlugin(ScrollTrigger)

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bentoGridRef = useRef<HTMLDivElement>(null)

  // Card 1 state: Direct comm mode toggle
  const [commMode, setCommMode] = useState<"direct" | "agency">("direct")

  // Card 2 state: Staging timeline week
  const [stagingWeek, setStagingWeek] = useState<1 | 2 | 3>(2)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Card 3 state: Pricing breakdown toggle
  const [pricingMode, setPricingMode] = useState<"flat" | "agency">("flat")
  const valueRatioRef = useRef<HTMLSpanElement>(null)

  // Card 4 state: Handover pillar tab
  const [handoverTab, setHandoverTab] = useState<"warranty" | "docs" | "ownership">("warranty")

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

  // Anime.js animation for Staging progress bar
  useEffect(() => {
    if (!progressBarRef.current) return
    const targetWidth = stagingWeek === 1 ? "33%" : stagingWeek === 2 ? "66%" : "100%"
    anime({
      targets: progressBarRef.current,
      width: targetWidth,
      easing: "easeOutExpo",
      duration: 800,
    })
  }, [stagingWeek])

  // Anime.js animation for Value Ratio meter in Pricing card
  useEffect(() => {
    if (!valueRatioRef.current) return
    const targetVal = pricingMode === "flat" ? 100 : 35
    const obj = { val: pricingMode === "flat" ? 35 : 100 }
    anime({
      targets: obj,
      val: targetVal,
      round: 1,
      easing: "easeOutExpo",
      duration: 1000,
      update: () => {
        if (valueRatioRef.current) {
          valueRatioRef.current.innerHTML = `${obj.val.toFixed(0)}%`
        }
      },
    })
  }, [pricingMode])

  // GSAP ScrollTrigger entrance for Bento Cards
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
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
        title="The 3-person studio advantage:"
        highlight="built on radical honesty."
        subtitle="No account managers. No inflated agency retainers. No radio silence. Just senior craft, direct access, and total transparency from week one to post-launch."
        dark={false}
      />

      {/* Watermelon UI Bento Grid with Mouse Spotlight Aura */}
      <div
        ref={bentoGridRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative"
      >
        {/* ══════════════════════════════════════════════════════════════════
            CARD 1 (7 cols): DIRECT ACCESS
            "You talk to the people writing the code"
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bento-spotlight-card lg:col-span-7 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          {/* Spotlight Radial Overlay */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            {/* Header pill & Interactive Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                  <MessageSquare className="w-6 h-6 text-[#f46a06]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] font-semibold block">
                    Direct Access
                  </span>
                  <span className="text-xs font-mono text-[#0f233a]/60">
                    The biggest real edge over an agency: zero middlemen.
                  </span>
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="inline-flex items-center p-1 rounded-full liquid-glass border border-[#0f233a]/15 text-xs font-mono">
                <button
                  onClick={() => setCommMode("direct")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    commMode === "direct"
                      ? "bg-[#f46a06] text-white font-bold shadow-xs"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Our Direct Line
                </button>
                <button
                  onClick={() => setCommMode("agency")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    commMode === "agency"
                      ? "bg-[#0f233a] text-white font-bold shadow-xs"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Agency Layer
                </button>
              </div>
            </div>

            {/* Interactive Chat / Comm Visualizer */}
            <div className="p-4 sm:p-5 rounded-2xl liquid-glass border border-[#0f233a]/10 mb-6 relative overflow-hidden transition-all duration-300">
              {commMode === "direct" ? (
                <div className="space-y-3 font-mono text-xs">
                  {/* Channel Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#0f233a]/10 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-[#0f233a]">#project-direct-line</span>
                      <span className="text-[#0f233a]/50 text-[10px]">Slack / WhatsApp</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Average reply &lt; 15 mins
                    </span>
                  </div>

                  {/* Message Bubble: Client */}
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#0f233a]/10 text-[#0f233a] font-bold flex items-center justify-center text-[10px] shrink-0">
                      You
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/70 border border-[#0f233a]/10 max-w-[85%] text-[#0f233a]">
                      <p className="text-[11px] leading-relaxed">
                        "Hey team, could we tweak the hero animation curve and adjust mobile button paddings before tomorrow's demo?"
                      </p>
                      <span className="text-[9px] text-[#0f233a]/50 mt-1 block">10:42 AM</span>
                    </div>
                  </div>

                  {/* Message Bubble: Founder */}
                  <div className="flex gap-2.5 items-start pl-4">
                    <div className="w-7 h-7 rounded-full bg-[#f46a06] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      S
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0f233a] text-white max-w-[85%] shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#f46a06] font-bold">
                        <span>Santosh (Founder & Lead Architect)</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/90">
                        "On it right now! Just tuned the cubic-bezier easing and pushed the fix to your staging branch. Check it live in 30 seconds."
                      </p>
                      <span className="text-[9px] text-white/50 mt-1 block">10:49 AM • 7m response</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 font-mono text-xs opacity-90">
                  <div className="flex items-center justify-between pb-2 border-b border-[#0f233a]/10 text-[11px]">
                    <span className="text-red-700 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Traditional Agency Hierarchy
                    </span>
                    <span className="text-[#0f233a]/60 text-[10px]">Estimated turnaround: 4-7 days</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#0f233a]/75">
                    <div className="p-2 rounded-lg bg-red-50/60 border border-red-200/50 flex items-center justify-between">
                      <span>1. Account Executive logs request</span>
                      <span className="text-red-600 text-[10px]">Day 1</span>
                    </div>
                    <div className="p-2 rounded-lg bg-red-50/60 border border-red-200/50 flex items-center justify-between">
                      <span>2. Project Manager schedules internal sync</span>
                      <span className="text-red-600 text-[10px]">Day 3</span>
                    </div>
                    <div className="p-2 rounded-lg bg-red-50/60 border border-red-200/50 flex items-center justify-between">
                      <span>3. Task delegated to junior contractor overseas</span>
                      <span className="text-red-600 text-[10px]">Day 5</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Headline & Core Points */}
            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              You talk to the people writing the code.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed mb-4">
              The biggest real edge a 3-person studio has over an agency: zero middlemen. You don't pitch an account manager who then briefs an intern. You collaborate directly with the engineers crafting your product.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#0f233a]/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>No account managers or sales layer between you and the build</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>Direct Slack/WhatsApp line to the founder working on your project</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="flex items-center gap-1.5 text-[#f46a06] font-semibold">
              <Clock className="w-3.5 h-3.5" /> Direct Founder Line
            </span>
            <span>Pillar 01</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 2 (5 cols): FULL TRANSPARENCY
            "Staging link from week one"
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bento-spotlight-card lg:col-span-5 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                <Calendar className="w-6 h-6 text-[#f46a06]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Build Active
              </span>
            </div>

            {/* Interactive Staging Link Preview */}
            <div className="p-4 rounded-2xl liquid-glass border border-[#0f233a]/10 mb-6 font-mono text-xs">
              {/* Fake Browser Top */}
              <div className="flex items-center justify-between bg-white/70 p-2 rounded-xl border border-[#0f233a]/10 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="text-[10px] text-[#0f233a]/70 ml-2 font-mono">
                    staging.armslyn.dev/client-preview
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#0f233a]/50" />
              </div>

              {/* Week Stepper Tabs */}
              <div className="grid grid-cols-3 gap-1.5 mb-3 text-[10px] text-center">
                <button
                  onClick={() => setStagingWeek(1)}
                  className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                    stagingWeek === 1
                      ? "bg-[#0f233a] text-white border-[#0f233a] font-bold"
                      : "bg-white/40 text-[#0f233a]/70 border-[#0f233a]/10 hover:bg-white/70"
                  }`}
                >
                  Week 1: Core
                </button>
                <button
                  onClick={() => setStagingWeek(2)}
                  className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                    stagingWeek === 2
                      ? "bg-[#0f233a] text-white border-[#0f233a] font-bold"
                      : "bg-white/40 text-[#0f233a]/70 border-[#0f233a]/10 hover:bg-white/70"
                  }`}
                >
                  Week 2: Motion
                </button>
                <button
                  onClick={() => setStagingWeek(3)}
                  className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                    stagingWeek === 3
                      ? "bg-[#0f233a] text-white border-[#0f233a] font-bold"
                      : "bg-white/40 text-[#0f233a]/70 border-[#0f233a]/10 hover:bg-white/70"
                  }`}
                >
                  Week 3: QA
                </button>
              </div>

              {/* Progress Bar Animated with Anime.js */}
              <div className="w-full bg-[#0f233a]/10 h-2 rounded-full overflow-hidden mb-2">
                <div
                  ref={progressBarRef}
                  className="bg-[#f46a06] h-full rounded-full transition-all"
                  style={{ width: "66%" }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#0f233a]/70 pt-1">
                <span>
                  {stagingWeek === 1 && "Wireframes & Schema Deployed"}
                  {stagingWeek === 2 && "Interactive UI & 60fps Kinetic Polish"}
                  {stagingWeek === 3 && "Vitals Benchmark & Final QA"}
                </span>
                <span className="font-bold text-[#f46a06]">
                  {stagingWeek === 1 ? "33% Ready" : stagingWeek === 2 ? "66% Ready" : "100% Ready"}
                </span>
              </div>
            </div>

            {/* Headline & Content */}
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] font-semibold block mb-1">
              Full Transparency
            </span>
            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Staging link from week one.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed mb-4">
              Removes the anxiety clients feel handing money to people they just met. You don't wait for a month of radio silence to see a final reveal that missed your mark.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#0f233a]/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>Weekly progress updates, no radio silence</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>You see it build in real-time, not just the final reveal</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Continuous CI/CD Staging
            </span>
            <span>Pillar 02</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 3 (5 cols): FAIR, TRANSPARENT PRICING
            "Early-studio pricing, not agency markup"
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bento-spotlight-card lg:col-span-5 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                <Lock className="w-6 h-6 text-[#f46a06]" />
              </div>

              {/* Pricing View Switcher */}
              <div className="inline-flex items-center p-1 rounded-full liquid-glass border border-[#0f233a]/15 text-[11px] font-mono">
                <button
                  onClick={() => setPricingMode("flat")}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    pricingMode === "flat"
                      ? "bg-[#f46a06] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Flat-Rate Studio
                </button>
                <button
                  onClick={() => setPricingMode("agency")}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    pricingMode === "agency"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Agency Retainer
                </button>
              </div>
            </div>

            {/* Price Transparency Comparison Box */}
            <div className="p-4 rounded-2xl liquid-glass border border-[#0f233a]/10 mb-6 font-mono text-xs">
              {pricingMode === "flat" ? (
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#0f233a]/10">
                    <span className="text-[10px] uppercase text-[#0f233a]/60 font-bold">
                      Guaranteed Scope
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                      <Lock className="w-3 h-3" /> Fixed Flat-Rate
                    </span>
                  </div>

                  <div className="py-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#0f233a]">100% Scope Lock</span>
                      <span className="text-[10px] text-[#0f233a]/60 block mt-0.5">
                        Zero surprise hourly billings
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        ref={valueRatioRef}
                        className="text-2xl font-bold text-[#f46a06] block font-mono"
                      >
                        100%
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase">Value Direct To Build</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#0f233a]/10 flex items-center justify-between text-[10px] text-[#0f233a]/70">
                    <span>No office overhead fees</span>
                    <span className="text-emerald-700 font-bold">✓ 0% Agency Markup</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#0f233a]/10">
                    <span className="text-[10px] uppercase text-[#0f233a]/60 font-bold">
                      Agency Retainer Model
                    </span>
                    <span className="text-red-700 font-bold flex items-center gap-1 text-[11px]">
                      <XCircle className="w-3 h-3" /> Hourly Runaway
                    </span>
                  </div>

                  <div className="py-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#0f233a]">$150–$250/hr</span>
                      <span className="text-[10px] text-red-600 block mt-0.5">
                        Plus PM fees & overhead markup
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-red-600 block font-mono">35%</span>
                      <span className="text-[9px] text-muted-foreground uppercase">Reaches Engineering</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#0f233a]/10 flex items-center justify-between text-[10px] text-red-700">
                    <span>65% swallowed by account staff</span>
                    <span>Surprise overages common</span>
                  </div>
                </div>
              )}
            </div>

            {/* Headline & Content */}
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] font-semibold block mb-1">
              Fair, Transparent Pricing
            </span>
            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Early-studio pricing, not agency markup.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed mb-4">
              Honest acknowledgment that we are a newer, high-focus studio — reframed as an immense pricing and attention advantage for the right client.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#0f233a]/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>Transparent flat-rate quotes, no hourly surprises</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>Ideal fit for startups and businesses priced out of big agencies</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="text-[#0f233a] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#f46a06]" /> 100% Scope Bound
            </span>
            <span>Pillar 03</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 4 (7 cols): SUPPORT AFTER LAUNCH
            "We don’t disappear after launch"
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bento-spotlight-card lg:col-span-7 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            {/* Top row with Handover Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0f233a] text-white flex items-center justify-center shadow-md shadow-[#0f233a]/20">
                  <ShieldCheck className="w-6 h-6 text-[#f46a06]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] font-semibold block">
                    Support After Launch
                  </span>
                  <span className="text-xs font-mono text-[#0f233a]/60">
                    Addresses client anxiety — we stand behind our code.
                  </span>
                </div>
              </div>

              {/* Handover Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl liquid-glass border border-[#0f233a]/15 text-[11px] font-mono">
                <button
                  onClick={() => setHandoverTab("warranty")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    handoverTab === "warranty"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Free Warranty
                </button>
                <button
                  onClick={() => setHandoverTab("docs")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    handoverTab === "docs"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Handover Docs
                </button>
                <button
                  onClick={() => setHandoverTab("ownership")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    handoverTab === "ownership"
                      ? "bg-[#0f233a] text-white font-bold"
                      : "text-[#0f233a]/70 hover:text-[#0f233a]"
                  }`}
                >
                  Zero Lock-In
                </button>
              </div>
            </div>

            {/* Interactive Handover Suite Preview */}
            <div className="rounded-2xl bg-[#0f233a] p-4 sm:p-5 text-white font-mono text-xs border border-white/10 shadow-xl mb-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#f46a06] font-bold">
                    {handoverTab === "warranty" && "Post-Launch Warranty Package"}
                    {handoverTab === "docs" && "Client Independence Architecture"}
                    {handoverTab === "ownership" && "100% Intellectual Property Transfer"}
                  </span>
                </div>
                <span className="text-white/50 text-[10px]">armslyn-handover-v1.0</span>
              </div>

              {handoverTab === "warranty" && (
                <div className="space-y-2 text-white/85 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                    <Wrench className="w-4 h-4 text-[#f46a06] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">30-Day Zero-Fee Hotfix Window:</span>
                      <span>Any bugs, unexpected device regressions, or edge-case flaws fixed immediately at zero extra cost.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Rapid Response SLA:</span>
                      <span>Priority turnaround for post-launch stabilization and domain DNS propagation support.</span>
                    </div>
                  </div>
                </div>
              )}

              {handoverTab === "docs" && (
                <div className="space-y-2 text-white/85 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                    <FileText className="w-4 h-4 text-[#f46a06] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Comprehensive Setup README:</span>
                      <span>Clear step-by-step documentation on how to run, modify, and build the project independently.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                    <KeyRound className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Environment Variable Vault:</span>
                      <span>Secure transfer of all API credentials, hosting keys, and CMS administrative access.</span>
                    </div>
                  </div>
                </div>
              )}

              {handoverTab === "ownership" && (
                <div className="space-y-2 text-white/85 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                    <Lock className="w-4 h-4 text-[#f46a06] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Full Git Repository Transfer:</span>
                      <span>You receive 100% ownership of the repository. No proprietary plugins, no hostage codebases.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Complete Freedom to Scale:</span>
                      <span>Hire an in-house engineer anytime — they will praise the clean TypeScript codebase.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Headline & Content */}
            <h3
              className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              We don’t disappear after launch.
            </h3>
            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed mb-4">
              Addresses a real client fear: agencies vanishing once the invoice is paid. We stand behind our work with a dedicated post-launch warranty window and crystal-clear handover documentation.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#0f233a]/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>Fixed window of free post-launch fixes and warranty support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                <span>Clear handover docs so you're never locked into needing us forever</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Guaranteed Post-Launch Continuity
            </span>
            <span>Pillar 04</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection

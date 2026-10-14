import React, { useState, useRef, useEffect, type FormEvent } from "react"
import { SectionHeader } from "./SectionHeader"
import {
  Mail,
  CheckCircle2,
  Send,
  Copy,
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
  ArrowRight,
  MessageSquare,
  Zap,
  Terminal,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs/lib/anime.es.js"

gsap.registerPlugin(ScrollTrigger)

type ProjectType = "brand-web" | "web-app" | "motion-experience" | "design-system"
type TimelineType = "fast-track" | "standard" | "retainer"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const estimateMeterRef = useRef<HTMLSpanElement>(null)

  // Interactive Project Configurator state
  const [projectType, setProjectType] = useState<ProjectType>("brand-web")
  const [selectedChips, setSelectedChips] = useState<string[]>([
    "Sub-Second Speed",
    "60fps Motion",
  ])
  const [timeline, setTimeline] = useState<TimelineType>("standard")

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Watermelon UI: Dynamic mouse spotlight tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = containerRef.current?.querySelectorAll<HTMLDivElement>(".bento-spotlight-card")
    if (!cards) return
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    })
  }

  // Toggle capabilities
  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    )
  }

  // Copy email helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@armslyn.tech")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  // Animated meter when project type or timeline updates
  useEffect(() => {
    if (!estimateMeterRef.current) return
    const values: Record<ProjectType, number> = {
      "brand-web": 95,
      "web-app": 100,
      "motion-experience": 98,
      "design-system": 90,
    }
    const targetScore = values[projectType] || 95
    const obj = { val: 60 }

    anime({
      targets: obj,
      val: targetScore,
      round: 1,
      easing: "easeOutExpo",
      duration: 1000,
      update: () => {
        if (estimateMeterRef.current) {
          estimateMeterRef.current.innerHTML = `${obj.val.toFixed(0)}%`
        }
      },
    })
  }, [projectType, timeline])

  // GSAP reveal on scroll
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-spotlight-card",
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Section Header with "Contact Us" Pill REMOVED */}
      <SectionHeader
        title="Ready to build something"
        highlight="truly exceptional?"
        subtitle="Skip the agency sales runaround. Tell us what you're building, configure your ideal scope, or connect directly with our founding engineers."
        dark={false}
      />

      {/* Main Interactive Studio Hub (12-column Bento Spotlight Layout) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative"
      >
        {/* ── LEFT COLUMN (5 cols): Direct Studio Terminal & Fast-Track Lines ── */}
        <div className="bento-spotlight-card lg:col-span-5 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          {/* Spotlight Radial Overlay */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            {/* Live Studio Availability Status (No pill badge) */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0f233a]/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#0f233a] uppercase tracking-wider">
                  Studio Capacity
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
                2 Project Slots Available
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl text-[#0f233a] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Direct access. Zero sales layers.
            </h3>

            <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed mb-8">
              You won't be passed around between sales reps and junior interns. When you reach out to Armslyn Tech, you talk directly with the lead engineers writing the code.
            </p>

            {/* Direct Channel Action Cards */}
            <div className="space-y-3 mb-8">
              {/* Copy Email Card */}
              <div
                onClick={handleCopyEmail}
                className="p-3.5 rounded-2xl liquid-glass border border-[#0f233a]/10 flex items-center justify-between hover:border-[#f46a06]/40 hover:bg-white/60 transition-all cursor-pointer group/mail"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0f233a] text-[#f46a06] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Direct Studio Email
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#0f233a]">
                      hello@armslyn.tech
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#f46a06] px-2.5 py-1 rounded-lg bg-[#f46a06]/10">
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </div>
              </div>

              {/* Instant WhatsApp / Founder Ping Card */}
              <a
                href="https://wa.me/919940866580?text=Hi%20Armslyn%20Tech%20team,%20I'd%20like%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl liquid-glass border border-[#0f233a]/10 flex items-center justify-between hover:border-emerald-500/40 hover:bg-white/60 transition-all cursor-pointer group/wa"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Instant Founder Chat
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#0f233a]">
                      WhatsApp Direct Line
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 font-semibold group-hover/wa:translate-x-0.5 transition-transform">
                  <span>Chat Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* 20-min Architecture Call */}
              <a
                href="mailto:hello@armslyn.tech?subject=Book%20a%20Project%20Discovery%20Call"
                className="p-3.5 rounded-2xl liquid-glass border border-[#0f233a]/10 flex items-center justify-between hover:border-[#0f233a]/40 hover:bg-white/60 transition-all cursor-pointer group/call"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0f233a] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#f46a06]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                      Discovery Session
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#0f233a]">
                      Schedule 20-min Review
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-[#0f233a]/80 font-semibold group-hover/call:translate-x-0.5 transition-transform">
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            {/* Studio Commitments */}
            <div className="p-4 rounded-2xl bg-[#0f233a] text-white font-mono text-xs space-y-2.5 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between text-[11px] text-[#f46a06] font-bold pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> STUDIO COMMITMENT
                </span>
                <span className="text-white/50 text-[10px]">Strict SLA</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sub-4 hour response time during business hours</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Fixed Flat-Rate — Zero hourly creep</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-[11px]">
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Live Staging URL active by Week One</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#0f233a]/10 flex items-center justify-between text-xs font-mono text-[#0f233a]/60">
            <span>Global Edge Infrastructure</span>
            <span className="font-semibold text-[#f46a06]">Standard 100% Client IP</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN (7 cols): Interactive Project Brief & Scope Configurator ── */}
        <div className="bento-spotlight-card lg:col-span-7 rounded-3xl p-7 sm:p-9 glass-card border border-[#0f233a]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          {submitted ? (
            /* Interactive Holographic Ticket Receipt */
            <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center p-6 sm:p-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20 animate-fade-rise">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-2">
                [PROJECT_BRIEF_TRANSMITTED]
              </span>

              <h4
                className="text-3xl sm:text-4xl text-[#0f233a] font-normal mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Inquiry received & assigned to lead architect.
              </h4>

              <p className="text-muted-foreground text-sm max-w-md font-light leading-relaxed mb-6">
                Thank you, <strong className="text-[#0f233a] font-medium">{formData.name}</strong>. We've captured your project scope and will review your specifications with a technical assessment within 4 hours.
              </p>

              {/* Receipt Specs Box */}
              <div className="w-full max-w-md p-4 rounded-2xl liquid-glass border border-[#0f233a]/15 font-mono text-xs text-left mb-6 space-y-1.5 text-[#0f233a]">
                <div className="flex justify-between pb-1.5 border-b border-[#0f233a]/10">
                  <span className="text-[#0f233a]/60">Scope Type:</span>
                  <span className="font-bold uppercase text-[#f46a06]">{projectType}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#0f233a]/10">
                  <span className="text-[#0f233a]/60">Timeline Model:</span>
                  <span className="font-bold">{timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0f233a]/60">Routing SLA:</span>
                  <span className="font-bold text-emerald-700">&lt; 4 Hours Direct Reply</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={`https://wa.me/919940866580?text=Hi%20Santosh,%20I%20just%20submitted%20a%20project%20brief%20for%20${encodeURIComponent(
                    formData.name
                  )}%20(${projectType}).%20Let's%20connect!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Speed Up with WhatsApp Ping</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl liquid-glass border border-[#0f233a]/20 text-[#0f233a] font-mono text-xs font-bold hover:bg-white/80 transition-all cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Step 1: Project Type Selector */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#0f233a] font-bold">
                      1. Select Project Archetype
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Efficiency Rating: <strong ref={estimateMeterRef} className="text-[#f46a06]">95%</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "brand-web", label: "Brand Web" },
                      { id: "web-app", label: "Web App" },
                      { id: "motion-experience", label: "Kinetic Motion" },
                      { id: "design-system", label: "Frontend Revamp" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setProjectType(type.id as ProjectType)}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-mono transition-all text-center cursor-pointer ${
                          projectType === type.id
                            ? "bg-[#0f233a] text-white border-[#0f233a] font-bold shadow-xs"
                            : "bg-white/40 text-[#0f233a]/80 border-[#0f233a]/15 hover:bg-white/80"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Capability Chips */}
                <div className="mb-5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#0f233a] font-bold mb-2">
                    2. Priority Focus Points (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Sub-Second Speed",
                      "60fps Motion",
                      "Technical SEO",
                      "Interactive 3D / Shader",
                      "Figma System",
                      "TypeScript Architecture",
                    ].map((chip) => {
                      const isSelected = selectedChips.includes(chip)
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleChip(chip)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-[#f46a06]/15 border-[#f46a06] text-[#f46a06] font-bold"
                              : "liquid-glass border-[#0f233a]/10 text-[#0f233a]/70 hover:text-[#0f233a] hover:border-[#0f233a]/30"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {chip}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Target Timeline */}
                <div className="mb-6">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#0f233a] font-bold mb-2">
                    3. Target Delivery Window
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "fast-track", label: "Fast-Track", time: "2–3 Weeks" },
                      { id: "standard", label: "Full Custom", time: "4–6 Weeks" },
                      { id: "retainer", label: "Studio Retainer", time: "Continuous" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimeline(t.id as TimelineType)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          timeline === t.id
                            ? "bg-[#0f233a] text-white border-[#0f233a] shadow-xs"
                            : "bg-white/40 text-[#0f233a]/75 border-[#0f233a]/15 hover:bg-white/70"
                        }`}
                      >
                        <div className="text-xs font-mono font-bold">{t.label}</div>
                        <div className="text-[10px] opacity-75 font-mono">{t.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Contact Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#0f233a]/70 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-2.5 rounded-xl liquid-glass text-[#0f233a] placeholder:text-[#0f233a]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#0f233a]/70 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl liquid-glass text-[#0f233a] placeholder:text-[#0f233a]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#0f233a]/70 mb-1">
                    Project Vision & Goals *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're looking to launch, your brand goals, target users, or drop a link to existing designs..."
                    className="w-full px-4 py-2.5 rounded-xl liquid-glass text-[#0f233a] placeholder:text-[#0f233a]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#0f233a] hover:bg-[#f46a06] text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-[#0f233a]/15 hover:shadow-[#f46a06]/25 transition-all cursor-pointer group/sub active:scale-[0.99]"
                >
                  <span>Transmit Project Brief to Lead Architect</span>
                  <Send className="w-4 h-4 transition-transform group-hover/sub:translate-x-1" />
                </button>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mt-2.5 px-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#f46a06]" />
                    Direct engineer evaluation
                  </span>
                  <span>Guaranteed response &lt; 4 hours</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection

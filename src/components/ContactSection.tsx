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
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Open-ended form fields — no rigid constraints or fixed options
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    context: "", // optional website or link
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Watermelon UI: Dynamic warm mouse spotlight tracking (warm orange/amber, no cold blue)
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

  // Copy email helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@armslyn.tech")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  // Quick conversation prompts to help clients think of what to ask
  const quickIdeas = [
    "We need a complete website build",
    "Can you audit & fix our site speed?",
    "Need custom 60fps animations & motion",
    "Have an MVP idea to build in 3 weeks",
    "Just want to ask about pricing & scope",
  ]

  const handleApplyIdea = (idea: string) => {
    setFormData((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message}\n• ${idea}` : idea,
    }))
  }

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
        title="Have an idea, a project, or"
        highlight="just a question?"
        subtitle="No rigid intake forms or prefabricated packages. Whether you're planning a full platform from scratch, want to revamp an existing site, or simply want to ask real engineers if an idea is feasible — write whatever's on your mind."
        dark={false}
      />

      {/* Main Studio Hub (Warm Charcoal & Sand Palette — NO AI Blue) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative"
      >
        {/* ── LEFT COLUMN (5 cols): Direct Studio Lines & Open Door Policy ── */}
        <div className="bento-spotlight-card lg:col-span-5 rounded-3xl p-7 sm:p-9 glass-card border border-[#1c1917]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          {/* Spotlight Radial Overlay (Warm Amber Glow) */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          <div>
            {/* Availability Notice */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1c1917]/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#1c1917] uppercase tracking-wider">
                  Direct Line Open
                </span>
              </div>
              <span className="text-xs font-mono text-[#1c1917]/70 font-medium">
                Founders active today
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl text-[#1c1917] font-normal mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Talk directly with the makers.
            </h3>

            <p className="text-sm sm:text-base text-[#1c1917]/75 font-light leading-relaxed mb-8">
              We don't have account managers or automated sales reps. You will be talking directly with Santosh and our core studio builders. Ask us anything — from feasibility and tech stack advice to budgets and timelines.
            </p>

            {/* Direct Connect Options */}
            <div className="space-y-3 mb-8">
              {/* Copy Studio Email */}
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-2xl liquid-glass border border-[#1c1917]/10 flex items-center justify-between hover:border-[#f46a06]/40 hover:bg-white/60 transition-all cursor-pointer group/mail"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1917] text-[#f46a06] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#1c1917]/60 block">
                      Direct Studio Email
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#1c1917]">
                      hello@armslyn.tech
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#f46a06] px-3 py-1.5 rounded-lg bg-[#f46a06]/10 font-medium">
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

              {/* Instant WhatsApp Direct Line */}
              <a
                href="https://wa.me/919940866580?text=Hi%20Armslyn%20Tech%20team,%20I'd%20like%20to%20ask%20you%20something%20about%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl liquid-glass border border-[#1c1917]/10 flex items-center justify-between hover:border-emerald-600/40 hover:bg-white/60 transition-all cursor-pointer group/wa"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1917] text-emerald-500 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#1c1917]/60 block">
                      Prefer Informal Chat?
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#1c1917]">
                      WhatsApp the Founders
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 font-semibold group-hover/wa:translate-x-0.5 transition-transform">
                  <span>Open Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            {/* Reassurance Box (Warm Charcoal, NO Blue) */}
            <div className="p-4 rounded-2xl bg-[#1c1917] text-white font-mono text-xs space-y-2.5 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between text-[11px] text-[#f46a06] font-bold pb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> ZERO PRESSURE PROMISE
                </span>
                <span className="text-white/50 text-[10px]">Human Replies</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#f46a06] shrink-0" />
                <span>Personal replies within a few hours</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#f46a06] shrink-0" />
                <span>No hard sales tactics or spammy follow-up loops</span>
              </div>
              <div className="flex items-center gap-2 text-white/85 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5 text-[#f46a06] shrink-0" />
                <span>Happy to give honest feasibility advice even if you don't hire us</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1c1917]/10 flex items-center justify-between text-xs font-mono text-[#1c1917]/60">
            <span>Studio Location: Global (UTC+5:30)</span>
            <span className="font-semibold text-[#f46a06]">Bespoke Engineering</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN (7 cols): Open-Ended Human Conversation Form ── */}
        <div className="bento-spotlight-card lg:col-span-7 rounded-3xl p-7 sm:p-9 glass-card border border-[#1c1917]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-[#f46a06]/40 hover:shadow-2xl hover:shadow-[#f46a06]/10">
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(244,106,6,0.12),transparent_70%)]" />

          {submitted ? (
            /* Friendly Confirmation State */
            <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center p-6 sm:p-8">
              <div className="w-16 h-16 rounded-2xl bg-[#1c1917] text-[#f46a06] flex items-center justify-center mb-6 shadow-xl shadow-[#1c1917]/15 border border-[#f46a06]/30 animate-fade-rise">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-[#f46a06] font-bold block mb-2">
                Message Received
              </span>

              <h4
                className="text-3xl sm:text-4xl text-[#1c1917] font-normal mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Thanks for reaching out, {formData.name || "friend"}.
              </h4>

              <p className="text-[#1c1917]/75 text-sm sm:text-base max-w-md font-light leading-relaxed mb-6">
                Your message went straight to Santosh and our development team's inboxes. We'll read your note and get back to you with a thoughtful reply shortly.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={`https://wa.me/919940866580?text=Hi%20Santosh,%20I'm%20${encodeURIComponent(
                    formData.name
                  )}%20and%20I%20just%20sent%20you%20a%20message%20through%20your%20site!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#1c1917] hover:bg-[#f46a06] text-white font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#f46a06] group-hover:text-white" />
                  <span>Ping Us on WhatsApp Too</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", email: "", context: "", message: "" })
                  }}
                  className="px-5 py-3 rounded-xl liquid-glass border border-[#1c1917]/20 text-[#1c1917] font-mono text-xs font-bold hover:bg-white/80 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Form Title & Freedom to ask anything */}
                <div className="mb-6">
                  <h4
                    className="text-2xl sm:text-3xl text-[#1c1917] font-normal mb-2"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Tell us what you have in mind.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1c1917]/70 font-light">
                    Ask a question, describe your vision, or request a ballpark quote. No structured checklist required.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1c1917]/80 font-bold mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-3 rounded-xl liquid-glass text-[#1c1917] placeholder:text-[#1c1917]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1c1917]/80 font-bold mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl liquid-glass text-[#1c1917] placeholder:text-[#1c1917]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Optional Context Field */}
                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1c1917]/80 font-bold mb-1.5">
                    Optional: Website, Figma Link, or Rough Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    placeholder="e.g. https://yourbrand.com, or aiming for launch next month"
                    className="w-full px-4 py-3 rounded-xl liquid-glass text-[#1c1917] placeholder:text-[#1c1917]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans"
                  />
                </div>

                {/* Open-Ended Message Field */}
                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1c1917]/80 font-bold mb-1.5">
                    What can we help you with? *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're thinking, what you want to build, what questions you have, or any challenges you're facing..."
                    className="w-full px-4 py-3 rounded-xl liquid-glass text-[#1c1917] placeholder:text-[#1c1917]/40 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/50 transition-all text-sm font-sans resize-none leading-relaxed"
                  />
                </div>

                {/* Optional Helpful Conversation Starters (Just suggestions, not rigid options!) */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1c1917]/60 block mb-1.5">
                    Need inspiration? Click to add to your note:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickIdeas.map((idea) => (
                      <button
                        key={idea}
                        type="button"
                        onClick={() => handleApplyIdea(idea)}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-[#1c1917]/10 bg-white/40 text-[#1c1917]/75 hover:border-[#f46a06]/50 hover:text-[#f46a06] hover:bg-white/80 transition-all cursor-pointer"
                      >
                        + {idea}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#1c1917] hover:bg-[#f46a06] text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-[#1c1917]/15 hover:shadow-[#f46a06]/25 transition-all cursor-pointer group/sub active:scale-[0.99]"
                >
                  <span>Send Message Directly to Team</span>
                  <Send className="w-4 h-4 transition-transform group-hover/sub:translate-x-1" />
                </button>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#1c1917]/60 mt-2.5 px-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#f46a06]" />
                    Direct founder review
                  </span>
                  <span>Human replies within hours</span>
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

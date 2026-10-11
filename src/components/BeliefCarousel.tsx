import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Terminal, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

export interface Principle {
  num: string
  icon: typeof Zap
  tag: string
  title: string
  headline: string
  desc: string
}

const PRINCIPLES: Principle[] = [
  {
    num: "01",
    icon: Zap,
    tag: "Speed as First Principle",
    title: "Speed is Respect",
    headline: "A sluggish site wastes visitor time and quietly bleeds conversions.",
    desc: "We architect every render cycle, asset, and byte for sub-second responses. In an era of fleeting attention, speed isn't an afterthought—it's foundational courtesy to every human who visits your brand.",
  },
  {
    num: "02",
    icon: Terminal,
    tag: "Human-Crafted Code",
    title: "Code is Craft",
    headline: "Zero bloated page builders, zero recycled templates.",
    desc: "Every single layout, animation curve, and component is handwritten from scratch by real developers. Clean, accessible, typed engineering that your team can scale with pride and without vendor lock-in.",
  },
  {
    num: "03",
    icon: Sparkles,
    tag: "Editorial Gravitas",
    title: "Attention is Earned",
    headline: "People don't read cookie-cutter templates—they bounce.",
    desc: "We orchestrate deliberate editorial typography, fluid tactile motion, and intentional whitespace. We build bespoke digital benchmarks designed to hold human attention in a noisy web.",
  },
]

export function BeliefCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % PRINCIPLES.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + PRINCIPLES.length) % PRINCIPLES.length)
  }

  // Auto-advance every 6 seconds unless user pauses/hovers
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, current])

  const principle = PRINCIPLES[current]
  const Icon = principle.icon

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Heading & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#f46a06] block mb-2">
            Our Studio Manifesto
          </span>
          <h3
            className="text-3xl sm:text-4xl text-white font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What We Believe
          </h3>
        </div>

        {/* Carousel Navigation Buttons & Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            {PRINCIPLES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1)
                  setCurrent(idx)
                }}
                className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                  current === idx
                    ? "w-8 bg-[#f46a06]"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Go to principle ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#f46a06]/50 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Previous principle"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#f46a06]/50 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Next principle"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Slide Card Frame */}
      <div className="relative min-h-[300px] sm:min-h-[260px] rounded-3xl p-8 sm:p-12 bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Ambient Corner Orange Sheen */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f46a06]/15 to-transparent blur-3xl pointer-events-none" />

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col justify-between h-full relative z-10"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-[#f46a06]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      {principle.tag}
                    </span>
                    <h4
                      className="text-2xl sm:text-3xl text-white font-normal leading-tight"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {principle.title}
                    </h4>
                  </div>
                </div>

                <span className="text-3xl sm:text-4xl font-mono font-light text-slate-700 select-none">
                  {principle.num}
                </span>
              </div>

              <blockquote
                className="text-lg sm:text-xl text-slate-100 font-normal leading-snug mb-4"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                "{principle.headline}"
              </blockquote>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {principle.desc}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/90 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
                <span>Human-Centric Craft</span>
              </span>
              <span>
                Principle {current + 1} of {PRINCIPLES.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

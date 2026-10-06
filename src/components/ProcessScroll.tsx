import { useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, CheckCircle2, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/**
 * Stage range configuration (0 to 1 scroll progress windows)
 * - IDEA: Initial question & inspiration
 * - BLUEPRINT: Wireframe sketch drawing layout lines
 * - PLAIN_PAGE: Bare HTML unstyled structure
 * - BUILT: Liquid glass styled presentation
 * - SHIPPED: Rocket launch animation
 * - COMPLETED: Firmly locked celebration & distinct outro break
 */
export const STAGE_RANGES = {
  IDEA: { from: 0.0, to: 0.16 },
  BLUEPRINT: { from: 0.16, to: 0.34 },
  PLAIN_PAGE: { from: 0.34, to: 0.52 },
  BUILT: { from: 0.52, to: 0.72 },
  SHIPPED: { from: 0.72, to: 0.84 },
  COMPLETED: { from: 0.84, to: 1.0 },
} as const

/**
 * Helper hook to map a slice of global progress to a clamped local 0..1 MotionValue
 */
function useStage(progress: MotionValue<number>, from: number, to: number): MotionValue<number> {
  return useTransform(progress, [from, to], [0, 1], { clamp: true })
}

export default function ProcessScroll() {
  const containerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const motionProgress = useMotionValue(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Sync with native useScroll fallback
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      motionProgress.set(latest)
    })
  }, [scrollYProgress, motionProgress])

  // Track active stage index for header pill status
  useEffect(() => {
    return motionProgress.on("change", (p) => {
      if (p < STAGE_RANGES.BLUEPRINT.from) setActiveStepIndex(0)
      else if (p < STAGE_RANGES.PLAIN_PAGE.from) setActiveStepIndex(1)
      else if (p < STAGE_RANGES.BUILT.from) setActiveStepIndex(2)
      else if (p < STAGE_RANGES.SHIPPED.from) setActiveStepIndex(3)
      else setActiveStepIndex(4)
    })
  }, [motionProgress])

  // Hardware-locking pin with Lenis smooth-scroll compatibility
  useEffect(() => {
    if (shouldReduceMotion) return

    const container = containerRef.current
    const stickyBox = stickyRef.current
    if (!container || !stickyBox) return

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: stickyBox,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        motionProgress.set(self.progress)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [shouldReduceMotion, motionProgress])

  // Local stage progress values (0 -> 1 for each respective window)
  const ideaProgress = useStage(motionProgress, STAGE_RANGES.IDEA.from, STAGE_RANGES.IDEA.to)
  const blueprintProgress = useStage(
    motionProgress,
    STAGE_RANGES.BLUEPRINT.from,
    STAGE_RANGES.BLUEPRINT.to
  )
  const plainProgress = useStage(
    motionProgress,
    STAGE_RANGES.PLAIN_PAGE.from,
    STAGE_RANGES.PLAIN_PAGE.to
  )
  const builtProgress = useStage(motionProgress, STAGE_RANGES.BUILT.from, STAGE_RANGES.BUILT.to)
  const shippedProgress = useStage(
    motionProgress,
    STAGE_RANGES.SHIPPED.from,
    STAGE_RANGES.SHIPPED.to
  )
  const completedProgress = useStage(
    motionProgress,
    STAGE_RANGES.COMPLETED.from,
    STAGE_RANGES.COMPLETED.to
  )

  // 1. IDEA STAGE ANIMATIONS
  const ideaOpacity = useTransform(ideaProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const ideaScale = useTransform(ideaProgress, [0, 1], [0.9, 1.05])

  // 2. BLUEPRINT STAGE ANIMATIONS
  const blueprintOpacity = useTransform(blueprintProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const blueprintFrameScaleX = useTransform(blueprintProgress, [0.08, 0.38], [0, 1])
  const blueprintHeaderScaleX = useTransform(blueprintProgress, [0.35, 0.58], [0, 1])
  const blueprintSidebarScaleY = useTransform(blueprintProgress, [0.55, 0.78], [0, 1])
  const blueprintContentOpacity = useTransform(blueprintProgress, [0.72, 0.92], [0, 1])

  // 3. PLAIN PAGE STAGE ANIMATIONS
  const plainOpacity = useTransform(plainProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  // 4. BUILT STAGE ANIMATIONS
  const builtStageOpacity = useTransform(builtProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])
  const builtOverlayOpacity = useTransform(builtProgress, [0, 0.3], [0, 1])
  const builtCardY = useTransform(builtProgress, [0.05, 0.35], [-20, 0])
  const builtCardOpacity = useTransform(builtProgress, [0.05, 0.35], [0, 1])
  const builtHeadingY = useTransform(builtProgress, [0.3, 0.55], [10, 0])
  const builtHeadingOpacity = useTransform(builtProgress, [0.3, 0.55], [0, 1])
  const builtBodyY = useTransform(builtProgress, [0.5, 0.75], [10, 0])
  const builtBodyOpacity = useTransform(builtProgress, [0.5, 0.75], [0, 1])

  // 5. SHIPPED (ROCKET LAUNCH) ANIMATIONS
  const shippedStageOpacity = useTransform(shippedProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0])
  const shippedBadgeScale = useTransform(shippedProgress, [0.05, 0.35, 0.6], [0.6, 1.05, 1])
  const shippedRocketY = useTransform(shippedProgress, [0.35, 0.95], [0, -260])
  const shippedRocketOpacity = useTransform(shippedProgress, [0.35, 0.85, 0.95], [1, 0.9, 0])

  // 6. COMPLETED (LOCKED HOLD & DISTINCT OUTRO BREAK) ANIMATIONS
  // Stays firmly locked across 0.84 to 0.96, then smooth outro transition into next section
  const completedOpacity = useTransform(completedProgress, [0, 0.15, 0.92, 1], [0, 1, 1, 0])
  const completedScale = useTransform(completedProgress, [0, 0.2], [0.95, 1])
  const completedY = useTransform(completedProgress, [0, 0.2], [20, 0])

  // Accessibility: Fallback for users preferring reduced motion
  if (shouldReduceMotion) {
    return (
      <section
        id="process"
        aria-label="How we build a website"
        className="relative py-28 px-6 max-w-5xl mx-auto w-full text-center border-b border-white/10"
      >
        <div className="liquid-glass rounded-3xl p-10 max-w-xl mx-auto border border-white/10 flex flex-col items-center">
          <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-foreground font-mono mb-6">
            <span className="text-emerald-400">●</span> Live · Shipped to client
          </div>
          <h2
            className="text-4xl sm:text-5xl text-foreground font-normal mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your site, finished.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Fast, clean, and built to last.
          </p>
        </div>
      </section>
    )
  }

  const steps = [
    { num: "01", name: "Concept" },
    { num: "02", name: "Blueprint" },
    { num: "03", name: "Structure" },
    { num: "04", name: "Craft" },
    { num: "05", name: "Launch" },
  ]

  return (
    <section
      ref={containerRef}
      id="process"
      aria-label="How we build a website"
      className="relative h-[500vh] bg-background border-b border-white/10"
    >
      {/* Sticky viewport frame pinned across the 500vh scroll progress */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-between bg-background"
      >
        {/* Top hairline progress bar showing global progress */}
        <motion.div
          style={{ scaleX: motionProgress, originX: 0 }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 z-30"
        />

        {/* Distinct Header Section Identifier & Interactive Step Pill */}
        <div className="relative z-20 w-full pt-20 sm:pt-24 px-6 flex flex-col items-center pointer-events-none">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>How We Build</span>
            </div>

            {/* Subtle Step Pills */}
            <div className="hidden md:flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1 border border-white/5">
              {steps.map((step, idx) => {
                const isActive = idx === activeStepIndex
                return (
                  <span
                    key={step.num}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 text-white font-semibold shadow-sm"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {step.num} {step.name}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Stage Presentation Viewport */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          {/* STAGE 1: IDEA */}
          <motion.div
            style={{ opacity: ideaOpacity, scale: ideaScale }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none"
          >
            <h2
              className="text-4xl sm:text-6xl text-foreground font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              What if it just worked?
            </h2>
          </motion.div>

          {/* STAGE 2: BLUEPRINT */}
          <motion.div
            style={{ opacity: blueprintOpacity }}
            className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          >
            {/* Blueprint Faint Grid Background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Blueprint Outer Wireframe Frame */}
            <motion.div
              style={{
                scaleX: blueprintFrameScaleX,
                originX: 0,
              }}
              className="relative w-[90%] md:w-[70%] h-[60%] border border-foreground/40 rounded-lg p-4 sm:p-6 flex flex-col gap-4 bg-background/40 backdrop-blur-[2px]"
            >
              {/* Header wireframe bar across the top */}
              <motion.div
                style={{
                  scaleX: blueprintHeaderScaleX,
                  originX: 0,
                }}
                className="w-full h-12 border border-foreground/30 rounded"
              />

              {/* Main body: sidebar on left, content on right */}
              <div className="flex-1 flex gap-4 min-h-0">
                {/* Sidebar wireframe rectangle on the left */}
                <motion.div
                  style={{
                    scaleY: blueprintSidebarScaleY,
                    originY: 0,
                  }}
                  className="w-1/4 h-full border border-foreground/30 rounded"
                />

                {/* Content wireframe rectangle on the right */}
                <motion.div
                  style={{
                    opacity: blueprintContentOpacity,
                  }}
                  className="flex-1 h-full border border-foreground/30 rounded"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* STAGE 3: PLAIN PAGE */}
          <motion.div
            style={{ opacity: plainOpacity }}
            className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          >
            {/* The same rectangle filled with bare HTML gray placeholder blocks */}
            <div className="w-[90%] md:w-[70%] h-[60%] border border-foreground/30 rounded-lg p-6 flex flex-col md:flex-row gap-6 bg-background/50">
              {/* Left sidebar / details placeholder */}
              <div className="hidden md:flex flex-col gap-3 w-1/4">
                <div className="h-6 w-3/4 bg-foreground/20 rounded" />
                <div className="h-3 w-full bg-foreground/10 rounded" />
                <div className="h-3 w-2/3 bg-foreground/10 rounded" />
                <div className="h-3 w-4/5 bg-foreground/10 rounded" />
              </div>

              {/* Main plain layout area */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Heading bar */}
                <div className="h-10 w-1/2 bg-foreground/20 rounded" />

                {/* Two text lines */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-foreground/10 rounded" />
                  <div className="h-3 w-4/5 bg-foreground/10 rounded" />
                </div>

                {/* Large image block */}
                <div className="h-32 w-full bg-foreground/10 rounded flex-1 min-h-[8rem]" />
              </div>
            </div>
          </motion.div>

          {/* STAGE 4: BUILT */}
          <motion.div
            style={{ opacity: builtStageOpacity }}
            className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          >
            {/* Background gradient overlay */}
            <motion.div
              style={{ opacity: builtOverlayOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none"
            />

            {/* Liquid glass card container */}
            <motion.div
              style={{
                y: builtCardY,
                opacity: builtCardOpacity,
              }}
              className="liquid-glass relative w-[90%] md:w-[70%] h-[60%] rounded-2xl p-8 sm:p-12 flex flex-col justify-center items-center text-center border border-white/10 shadow-2xl"
            >
              {/* Staggered Heading */}
              <motion.h2
                style={{
                  y: builtHeadingY,
                  opacity: builtHeadingOpacity,
                  fontFamily: "'Instrument Serif', serif",
                }}
                className="text-4xl sm:text-6xl text-foreground font-normal tracking-tight mb-4"
              >
                Your site, finished.
              </motion.h2>

              {/* Staggered Body text */}
              <motion.p
                style={{
                  y: builtBodyY,
                  opacity: builtBodyOpacity,
                }}
                className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md font-body"
              >
                Fast, clean, and built to last.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* STAGE 5: SHIPPED & ROCKET LAUNCH */}
          <motion.div
            style={{ opacity: shippedStageOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none"
          >
            {/* Liquid Glass Pill Badge */}
            <motion.div
              style={{ scale: shippedBadgeScale }}
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm sm:text-base text-foreground font-mono border border-white/10 shadow-lg mb-8"
            >
              <span className="text-emerald-400">●</span>
              <span>Live · Shipped to client</span>
            </motion.div>

            {/* Rocket emoji animating upward & fading out */}
            <motion.div
              style={{
                y: shippedRocketY,
                opacity: shippedRocketOpacity,
              }}
              className="text-5xl sm:text-6xl select-none"
            >
              🚀
            </motion.div>
          </motion.div>

          {/* STAGE 6: AFTER ROCKET — FIRMLY LOCKED HOLD & DISTINCT SECTION BREAK */}
          <motion.div
            style={{
              opacity: completedOpacity,
              scale: completedScale,
              y: completedY,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          >
            {/* Ambient Background Glow */}
            <div className="absolute w-[500px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

            <div className="liquid-glass relative rounded-3xl p-8 sm:p-12 max-w-xl mx-auto border border-emerald-500/20 shadow-2xl flex flex-col items-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live in Production</span>
              </div>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-foreground font-normal tracking-tight mb-4"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Engineered to hold attention.
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mb-8">
                Your vision is live, responsive, and blazing fast. Ready to turn visitors into long-term clients.
              </p>

              {/* Distinct Visual Section Break Indicator */}
              <div className="w-full pt-6 border-t border-white/10 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/80 tracking-widest uppercase">
                  <span>Scroll to explore our services</span>
                  <ArrowDown className="w-3.5 h-3.5 text-white/60 animate-bounce" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Distinct Section Boundary Bar */}
        <div className="relative z-20 w-full pb-6 px-6 flex justify-between items-center text-[11px] font-mono text-muted-foreground/50 border-t border-white/5 pointer-events-none">
          <div>ARMSLYN TECH · DEVELOPMENT LIFECYCLE</div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>PRODUCTION READY</span>
          </div>
        </div>
      </div>
    </section>
  )
}

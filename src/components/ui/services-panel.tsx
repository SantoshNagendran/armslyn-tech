"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Layers,
  Search,
  Accessibility,
  RefreshCw,
  Palette,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  icon: LucideIcon
  title: string
  tagline: string
  description: string
  tags: string[]
  /** Video/image URL or React node to display in the preview panel */
  content: string | React.ReactNode
  alt?: string
}

/* ------------------------------------------------------------------ */
/*  Media renderer — handles video, image, or fallback                */
/* ------------------------------------------------------------------ */

function ServiceMedia({
  content,
  alt,
}: {
  content: string | React.ReactNode
  alt?: string
}) {
  if (typeof content !== "string") {
    return <div className="w-full h-full">{content}</div>
  }

  const isVideo = /\.(mp4|webm|ogg)$/i.test(content)
  const isImage =
    /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(content) ||
    /unsplash|images\./i.test(content)

  if (isVideo) {
    return (
      <video
        src={content}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    )
  }

  if (isImage) {
    return (
      <img src={content} alt={alt} className="w-full h-full object-cover" />
    )
  }

  // Fallback: render video player
  return (
    <video
      src={`${import.meta.env.BASE_URL}hero1.mp4`}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Service data                                                       */
/* ------------------------------------------------------------------ */

const services: ServiceItem[] = [
  {
    icon: Layers,
    title: "Custom Website Development",
    tagline: "From starter to enterprise — built to your exact blueprint.",
    description:
      "Whether you need a lean single-page presence or a complex multi-page web application, we hand-code every layout, animation, and interaction from scratch. Choose from our Starter, Professional, or Enterprise tiers — each designed to scale with your business, with zero template bloat.",
    tags: ["React", "TypeScript", "Tailwind", "Vite", "Multi-tier"],
    content: `${import.meta.env.BASE_URL}hero1.mp4`,
    alt: "Custom website development video preview",
  },
  {
    icon: Search,
    title: "Web Optimization — SEO / AEO / GEO / AIO",
    tagline: "Be found by humans, AI assistants, and search engines alike.",
    description:
      "Search has evolved beyond Google's ten blue links. We optimize your site for traditional Search Engine Optimization (SEO), Answer Engine Optimization (AEO) for featured snippets and voice assistants, Generative Engine Optimization (GEO) for AI-powered search results, and AI Optimization (AIO) to ensure your brand surfaces wherever algorithms curate answers.",
    tags: ["Technical SEO", "AEO", "GEO", "AIO", "Schema Markup", "Core Web Vitals"],
    content: `${import.meta.env.BASE_URL}hero.mp4`,
    alt: "Search optimization across SEO AEO GEO AIO video preview",
  },
  {
    icon: Accessibility,
    title: "Web Accessibility Compliance",
    tagline: "Inclusive by design, compliant by default.",
    description:
      "We audit and remediate your site to meet WCAG 2.2 AA standards (and beyond), ensuring every visitor — regardless of ability — can navigate, interact, and convert. From semantic HTML structure and ARIA patterns to keyboard navigation and screen-reader compatibility, accessibility is never bolted on; it's built into the foundation.",
    tags: ["WCAG 2.2 AA", "ARIA", "Screen Readers", "Keyboard Nav", "ADA Compliance"],
    content: `${import.meta.env.BASE_URL}hero1.mp4`,
    alt: "Web accessibility compliance audit video preview",
  },
  {
    icon: RefreshCw,
    title: "Website Refurbishment",
    tagline: "Breathe new life into your existing digital presence.",
    description:
      "Your brand has outgrown its current site. We perform a comprehensive technical and UX audit, then rebuild what matters — migrating content, modernizing the stack, compressing assets, and re-engineering the user flow — so you get a modern, high-performance site without starting from zero.",
    tags: ["Performance Audit", "Tech Stack Migration", "Content Migration", "UX Overhaul"],
    content: `${import.meta.env.BASE_URL}hero.mp4`,
    alt: "Website refurbishment and modernization video preview",
  },
  {
    icon: Palette,
    title: "UI Enhancement & Visual Design",
    tagline: "Elevate every interface detail to premium quality.",
    description:
      "Sometimes the foundation is solid but the finish needs polish. We refine typography hierarchies, introduce purposeful motion design, harmonize color systems, and craft micro-interactions that make your interface feel alive — transforming functional into unforgettable.",
    tags: ["Typography", "Motion Design", "Color Systems", "Micro-Interactions", "Dark Mode"],
    content: `${import.meta.env.BASE_URL}hero1.mp4`,
    alt: "UI enhancement and visual design polish video preview",
  },
]

/* ------------------------------------------------------------------ */
/*  Auto-scrolling Tags Carousel (Non-pill shaped)                     */
/* ------------------------------------------------------------------ */

function TagsCarousel({ tags }: { tags: string[] }) {
  // Quadruple tags array for continuous seamless infinite loop
  const repeatedTags = React.useMemo(() => [...tags, ...tags, ...tags, ...tags], [tags])

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-2.5 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: Math.max(14, tags.length * 3.5),
        }}
      >
        {repeatedTags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0f233a]/[0.05] border border-[#0f233a]/12 backdrop-blur-md shadow-xs select-none hover:border-[#f46a06]/40 transition-colors shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-xs bg-[#f46a06] shrink-0" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#0f233a] font-medium whitespace-nowrap">
              {tag}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ServicesPanel() {
  const [active, setActive] = React.useState(0)

  return (
    <section id="services" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* ── Services Section Transparent Glass Shell ── */}
      <div className="mx-auto max-w-7xl relative rounded-3xl sm:rounded-[2.5rem] border border-[#0f233a]/15 bg-transparent p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Subtle glass specular highlight line on top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* ── Left Column: Service List ── */}
          <div>
            {/* Section Header */}
            <div className="mb-12">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Services we{" "}
                <em className="not-italic text-[#f46a06]">provide.</em>
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-xl text-muted-foreground font-light">
                End-to-end design and engineering solutions — from blank canvas to polished, production-grade digital experiences.
              </p>
            </div>

            {/* Service Options List */}
            <ul className="flex flex-col gap-2">
              {services.map((service, index) => {
                const Icon = service.icon
                const isActive = active === index

                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    onClick={() => setActive(index)}
                    className={cn(
                      "group flex flex-col rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden",
                      isActive
                        ? "bg-[#0f233a]/[0.08] ring-1 ring-[#0f233a]/20 shadow-lg shadow-[#0f233a]/[0.04]"
                        : "hover:bg-[#0f233a]/[0.04] ring-1 ring-transparent",
                    )}
                  >
                    {/* Collapsed row */}
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Icon badge */}
                      <div
                        className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                          isActive
                            ? "bg-[#f46a06] text-white shadow-md shadow-[#f46a06]/30"
                            : "liquid-glass text-[#f46a06]",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Title + tagline */}
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "block text-sm sm:text-base font-medium transition-colors duration-200 leading-snug",
                            isActive
                              ? "text-[#0f233a]"
                              : "text-foreground group-hover:text-[#0f233a]",
                          )}
                        >
                          {service.title}
                        </span>
                        {!isActive && (
                          <span className="block text-xs text-muted-foreground mt-0.5 font-light truncate">
                            {service.tagline}
                          </span>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 shrink-0 transition-all duration-300",
                          isActive
                            ? "text-[#f46a06] translate-x-0 opacity-100"
                            : "text-muted-foreground -translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0",
                        )}
                      />
                    </div>

                    {/* Expanded details (visible when active) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.3, delay: 0.1 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0">
                            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-4">
                              {service.description}
                            </p>

                            {/* Tags (non-pill geometric badges) */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {service.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#0f233a]/[0.05] text-[#0f233a] border border-[#0f233a]/12"
                                >
                                  <span className="w-1 h-1 rounded-xs bg-[#f46a06]" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Mobile-only video preview card */}
                            <Card className="w-full overflow-hidden p-0 aspect-video relative rounded-2xl lg:hidden border border-[#0f233a]/20 shadow-lg shadow-[#0f233a]/10 bg-black/40">
                              <div className="absolute inset-0">
                                <ServiceMedia
                                  content={service.content}
                                  alt={service.alt}
                                />
                              </div>
                            </Card>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ul>

            {/* "More coming" hint */}
            <div className="mt-6 flex items-center gap-2 px-5 text-xs font-mono text-muted-foreground/70">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              More services coming soon
            </div>
          </div>

          {/* ── Right Column: Sticky Video Preview Panel (desktop only) ── */}
          <div className="hidden lg:block lg:pt-28 sticky top-44">
            <Card className="relative w-full aspect-[4/3] overflow-hidden p-0 rounded-3xl border border-[#0f233a]/20 shadow-2xl shadow-[#0f233a]/15 bg-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <ServiceMedia
                    content={services[active].content}
                    alt={services[active].alt}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom info bar overlay on top of video */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 pt-16">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#f46a06] block mb-1 font-semibold">
                      {services[active].tagline}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl text-white font-normal"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {services[active].title}
                    </h3>
                  </div>
                  <span className="text-3xl font-mono font-light text-white/40 select-none">
                    0{active + 1}
                  </span>
                </div>
              </div>
            </Card>

            {/* Stylish auto-scrolling carousel just under the preview */}
            <div className="mt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <TagsCarousel tags={services[active].tags} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

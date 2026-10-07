import { useCallback, useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, Menu, X } from "lucide-react"

import { AboutSection } from "./components/AboutSection"
import { ServicesSection } from "./components/ServicesSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { WhyUsSection } from "./components/WhyUsSection"
import { ReviewsSection } from "./components/ReviewsSection"
import { ContactSection } from "./components/ContactSection"
import ProcessScroll from "./components/ProcessScroll"
import { Footer } from "./components/Footer"
import { LoadingScreen } from "./components/LoadingScreen"

gsap.registerPlugin(ScrollTrigger)

const BRAND_NAME = "Armslyn Tech"
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure video autoplays after loading screen finishes
  useEffect(() => {
    if (isLoading) return
    const vid = videoRef.current
    if (vid) {
      vid.defaultMuted = true
      vid.muted = true
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser initially paused autoplay, resume on earliest user interaction
          const handleInteraction = () => {
            vid.play().catch(() => {})
            window.removeEventListener("click", handleInteraction)
            window.removeEventListener("touchstart", handleInteraction)
            window.removeEventListener("scroll", handleInteraction)
          }
          window.addEventListener("click", handleInteraction, { once: true, passive: true })
          window.addEventListener("touchstart", handleInteraction, { once: true, passive: true })
          window.addEventListener("scroll", handleInteraction, { once: true, passive: true })
        })
      }
    }
  }, [isLoading])

  // Lock scroll during loading screen
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Initialize Lenis Smooth Scroll and GSAP ScrollTrigger
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
      infinite: false,
    })
    lenisRef.current = lenis

    // 2. Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // 3. Unique Cinematic Hero Scroll Animation
    const ctx = gsap.context(() => {
      // Pin & scale transition from Hero to Next Section
      if (heroWrapperRef.current && videoContainerRef.current && heroContentRef.current) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: "top top",
            end: "+=85%",
            scrub: 1.1,
            pin: true,
            anticipatePin: 1,
          },
        })

        heroTimeline
          // Scale down the video container into a floating cinematic card with rounded corners
          .to(
            videoContainerRef.current,
            {
              scale: 0.91,
              borderRadius: "32px",
              opacity: 0.35,
              ease: "power2.inOut",
            },
            0
          )
          // Float hero text elements upward and fade out
          .to(
            heroContentRef.current,
            {
              y: -90,
              opacity: 0,
              scale: 0.96,
              ease: "power2.in",
            },
            0
          )
      }

      // Smooth entrance reveal for each section
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-on-scroll")
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Smooth scroll handler
  const scrollTo = (target: string) => {
    setMobileMenuOpen(false)
    const element = target === "hero" ? 0 : document.getElementById(target)
    if (element !== null && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        duration: 1.4,
        offset: -40,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Fixed Luxury Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
        <nav
          className="flex row justify-between items-center px-6 sm:px-8 py-5 max-w-7xl mx-auto w-full backdrop-blur-md bg-transparent rounded-b-2xl border-b border-foreground/10"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <button
            id="header-logo"
            onClick={() => scrollTo("hero")}
            className={`text-2xl sm:text-3xl tracking-tight text-foreground transition-opacity duration-500 hover:text-primary inline-flex items-baseline cursor-pointer ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>{BRAND_NAME}</span>
            <sup className="text-xs ml-0.5 font-sans">®</sup>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {[
              { label: "Home", id: "hero" },
              { label: "Process", id: "process" },
              { label: "About", id: "about" },
              { label: "Services", id: "services" },
              { label: "Projects", id: "work" },
              { label: "Why Us", id: "why-us" },
              { label: "Reviews", id: "reviews" },
              { label: "Contact", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs uppercase tracking-wider font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              Start a Project
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl liquid-glass text-foreground"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 py-6 mx-4 mt-2 rounded-2xl glass-card border border-foreground/15 flex flex-col space-y-4 backdrop-blur-xl animate-fade-rise">
            {[
              { label: "Home", id: "hero" },
              { label: "Our Process", id: "process" },
              { label: "About Us", id: "about" },
              { label: "Our Services", id: "services" },
              { label: "Projects Done", id: "work" },
              { label: "Why Us", id: "why-us" },
              { label: "Reviews", id: "reviews" },
              { label: "Contact Studio", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-foreground/10"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section Container (Pinned during scroll transition) */}
      <div ref={heroWrapperRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Fullscreen Looping Video Container */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none origin-center"
          style={{ opacity: 1, willChange: "transform, opacity, border-radius" }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src={VIDEO_SRC}
          />
        </div>

        {/* Centered Hero Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 max-w-7xl mx-auto w-full"
        >
          <h1
            className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            We <em className="not-italic text-muted-foreground">build websites</em> that{" "}
            <em className="not-italic text-primary">hold attention.</em>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            {BRAND_NAME} is a small web development studio. We design and build fast,
            clean websites and web apps for businesses that want their online
            presence to actually work.
          </p>

          <div className="mt-12">
            <button
              onClick={() => scrollTo("contact")}
              className="liquid-glass inline-flex items-center justify-center rounded-full px-14 py-5 text-base text-foreground hover:text-primary transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 font-medium"
            >
              Start a Project
            </button>
          </div>
        </div>

        {/* Floating Scroll Indicator to Next Section */}
        <div className="relative z-10 pb-8 flex flex-col items-center justify-center">
          <button
            onClick={() => scrollTo("process")}
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="tracking-widest uppercase text-[10px] text-foreground/50 group-hover:text-foreground transition-colors">
              Scroll to explore
            </span>
            <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronDown className="w-4 h-4 animate-pulse-subtle text-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll-Driven Storytelling Process Section */}
      <ProcessScroll />

      {/* Content Sections with Smooth Scroll Reveals */}
      <div className="relative z-20 space-y-24 sm:space-y-32">
        <div className="reveal-on-scroll">
          <AboutSection />
        </div>

        <div className="reveal-on-scroll">
          <ServicesSection />
        </div>

        <div className="reveal-on-scroll">
          <ProjectsSection />
        </div>

        <div className="reveal-on-scroll">
          <WhyUsSection />
        </div>

        <div className="reveal-on-scroll">
          <ReviewsSection />
        </div>

        <div className="reveal-on-scroll">
          <ContactSection />
        </div>
      </div>

      {/* Global Footer */}
      <Footer onScrollToTop={() => scrollTo("hero")} onNavigate={scrollTo} />
    </div>
  )
}

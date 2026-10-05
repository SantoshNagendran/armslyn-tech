import { useEffect, useRef, useState } from "react"
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
import { Footer } from "./components/Footer"

gsap.registerPlugin(ScrollTrigger)

const BRAND_NAME = "Armslyn Tech"
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
      infinite: false,
    })
    lenisRef.current = lenis

    // 2. Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // 3. Rich, Section-Specific GSAP Animations
    const ctx = gsap.context(() => {
      // ==========================================
      // ANIMATION 1: HERO PINNED 3D RECEDE & APERTURE
      // ==========================================
      if (heroWrapperRef.current && videoContainerRef.current && heroContentRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: "top top",
            end: "+=90%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        })

        heroTl
          .to(
            videoContainerRef.current,
            {
              scale: 0.88,
              borderRadius: "40px",
              opacity: 0.25,
              filter: "blur(3px) brightness(0.6)",
              boxShadow: "0 30px 100px -20px rgba(0,0,0,0.8)",
              ease: "power2.inOut",
            },
            0
          )
          .to(
            heroContentRef.current,
            {
              y: -110,
              opacity: 0,
              scale: 0.94,
              letterSpacing: "1px",
              ease: "power2.in",
            },
            0
          )
      }

      // ==========================================
      // ANIMATION 2: ABOUT SECTION (Metric Counter Flip & Manifesto Fold)
      // ==========================================
      const aboutSec = document.querySelector<HTMLElement>(".section-about")
      if (aboutSec) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSec,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        })

        aboutTl
          .from(aboutSec.querySelectorAll(".sec-badge, .sec-title, .sec-subtitle"), {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          })
          .from(
            aboutSec.querySelectorAll(".about-stat-card"),
            {
              y: 50,
              opacity: 0,
              scale: 0.92,
              duration: 0.9,
              stagger: 0.15,
              ease: "back.out(1.4)",
            },
            "-=0.5"
          )
          .from(
            aboutSec.querySelectorAll(".about-showcase"),
            {
              y: 60,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.4"
          )
      }

      // ==========================================
      // ANIMATION 3: SERVICES SECTION (Magnetic 3D Card Unfurl)
      // ==========================================
      const servicesSec = document.querySelector<HTMLElement>(".section-services")
      if (servicesSec) {
        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSec,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })

        servicesTl
          .from(servicesSec.querySelectorAll(".sec-badge, .sec-title, .sec-subtitle"), {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          })
          .from(
            servicesSec.querySelectorAll(".service-card"),
            {
              y: 70,
              opacity: 0,
              scale: 0.94,
              rotationX: 12,
              transformOrigin: "center top",
              duration: 0.9,
              stagger: 0.16,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            servicesSec.querySelectorAll(".service-icon"),
            {
              scale: 0,
              rotation: -25,
              duration: 0.6,
              stagger: 0.12,
              ease: "back.out(2)",
            },
            "-=0.6"
          )
      }

      // ==========================================
      // ANIMATION 4: PROJECTS DONE (Curtain Rise & Depth Parallax)
      // ==========================================
      const projectCards = gsap.utils.toArray<HTMLElement>(".project-card")
      projectCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.93,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      // ==========================================
      // ANIMATION 5: WHY US (Staggered Pillar Slide & Scale)
      // ==========================================
      const whyUsSec = document.querySelector<HTMLElement>(".section-why-us")
      if (whyUsSec) {
        const whyUsTl = gsap.timeline({
          scrollTrigger: {
            trigger: whyUsSec,
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        })

        whyUsTl
          .from(whyUsSec.querySelectorAll(".sec-badge, .sec-title, .sec-subtitle"), {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          })
          .from(
            whyUsSec.querySelectorAll(".why-us-card"),
            {
              y: 50,
              opacity: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .from(
            whyUsSec.querySelectorAll(".why-us-icon"),
            {
              scale: 0,
              opacity: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: "back.out(1.8)",
            },
            "-=0.6"
          )
      }

      // ==========================================
      // ANIMATION 6: REVIEWS (Staggered Floating Cards & Star Twinkle)
      // ==========================================
      const reviewsSec = document.querySelector<HTMLElement>(".section-reviews")
      if (reviewsSec) {
        const reviewsTl = gsap.timeline({
          scrollTrigger: {
            trigger: reviewsSec,
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        })

        reviewsTl
          .from(reviewsSec.querySelectorAll(".sec-badge, .sec-title, .sec-subtitle"), {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          })
          .from(
            reviewsSec.querySelectorAll(".review-card"),
            {
              y: 60,
              opacity: 0,
              scale: 0.95,
              duration: 0.9,
              stagger: 0.16,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            reviewsSec.querySelectorAll(".review-stars svg"),
            {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              stagger: 0.03,
              ease: "back.out(2)",
            },
            "-=0.5"
          )
      }

      // ==========================================
      // ANIMATION 7: CONTACT (Split Gate Reveal - Left Card & Right Form)
      // ==========================================
      const contactSec = document.querySelector<HTMLElement>(".section-contact")
      if (contactSec) {
        const contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: contactSec,
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        })

        contactTl
          .from(contactSec.querySelectorAll(".sec-badge, .sec-title, .sec-subtitle"), {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          })
          .from(
            contactSec.querySelectorAll(".contact-left-card"),
            {
              x: -50,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            contactSec.querySelectorAll(".contact-right-card"),
            {
              x: 50,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.7"
          )
      }
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Smooth scroll handler with custom easing
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

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projects", id: "work" },
    { label: "Why Us", id: "why-us" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground selection:bg-white/20 selection:text-white">
      {/* Fixed Luxury Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
        <nav
          className="flex row justify-between items-center px-6 sm:px-8 py-5 max-w-7xl mx-auto w-full backdrop-blur-md bg-background/30 rounded-b-2xl border-b border-white/5"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="text-2xl sm:text-3xl tracking-tight text-foreground transition-opacity hover:opacity-90 inline-flex items-baseline cursor-pointer"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>{BRAND_NAME}</span>
            <sup className="text-xs ml-0.5 font-sans">®</sup>
          </button>

          {/* Desktop Navigation Links (Blog removed) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
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
              className="liquid-glass inline-flex items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm text-foreground transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
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
          <div className="lg:hidden px-6 py-6 mx-4 mt-2 rounded-2xl glass-card border border-white/10 flex flex-col space-y-4 backdrop-blur-xl animate-fade-rise">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section Container (Pinned during scroll transition) */}
      <div
        ref={heroWrapperRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Fullscreen Looping Video Container */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none transform-gpu origin-center"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
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
            <em className="not-italic text-muted-foreground">hold attention.</em>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            {BRAND_NAME} is a small web development studio. We design and build fast,
            clean websites and web apps for businesses that want their online
            presence to actually work.
          </p>

          <div className="mt-12">
            <button
              onClick={() => scrollTo("contact")}
              className="liquid-glass inline-flex items-center justify-center rounded-full px-14 py-5 text-base text-foreground transition-transform duration-300 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 font-medium"
            >
              Start a Project
            </button>
          </div>
        </div>

        {/* Floating Scroll Indicator to Next Section */}
        <div className="relative z-10 pb-8 flex flex-col items-center justify-center">
          <button
            onClick={() => scrollTo("about")}
            className="group flex flex-col items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-white transition-colors cursor-pointer"
          >
            <span className="tracking-widest uppercase text-[10px] text-white/50 group-hover:text-white transition-colors">
              Scroll to explore
            </span>
            <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronDown className="w-4 h-4 animate-pulse-subtle" />
            </div>
          </button>
        </div>
      </div>

      {/* Sections with Distinct Animations */}
      <div className="relative z-20 space-y-24 sm:space-y-32">
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <WhyUsSection />
        <ReviewsSection />
        <ContactSection />
      </div>

      {/* Global Footer */}
      <Footer onScrollToTop={() => scrollTo("hero")} onNavigate={scrollTo} />
    </div>
  )
}

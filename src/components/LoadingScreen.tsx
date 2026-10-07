import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Premium loading screen with a 3-phase animation:
 * 1. "Armslyn" reveals with blur, then "Tech®" blurs in immediately after
 * 2. Full logo holds briefly
 * 3. Logo shrinks & flies to the header position, then the overlay fades out
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const armslynRef = useRef<HTMLSpanElement>(null);
  const techRef = useRef<HTMLSpanElement>(null);
  const supRef = useRef<HTMLElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    /* ── Phase 1: Reveal "Armslyn" ─────────────────────────── */
    tl.fromTo(
      armslynRef.current,
      { opacity: 0, filter: "blur(20px)", y: 12 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, ease: "power3.out" }
    );

    // Glow breathes in
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      0.2
    );

    // Subtext fades in
    tl.fromTo(
      subtextRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.6
    );

    /* ── " Tech®" blurs in right after "Armslyn" appears ──── */
    tl.fromTo(
      techRef.current,
      { opacity: 0, filter: "blur(16px)", x: -20 },
      { opacity: 1, filter: "blur(0px)", x: 0, duration: 0.55, ease: "power2.out" },
      0.7 // starts while "Armslyn" is still revealing
    );

    tl.fromTo(
      supRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      1.0
    );

    // Hold the full logo for ~2 seconds
    tl.to({}, { duration: 2 });

    /* ── Phase 3: Fly logo to header ──────────────────────── */

    // First, fade out subtext and glow
    tl.to([subtextRef.current, glowRef.current], {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });

    // Then fly the logo to the header position
    tl.call(() => {
      const headerLogo = document.getElementById("header-logo");
      const logoWrapper = logoWrapperRef.current;

      if (!headerLogo || !logoWrapper) {
        // Fallback: simple fade out
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete,
        });
        return;
      }

      const headerRect = headerLogo.getBoundingClientRect();
      const logoRect = logoWrapper.getBoundingClientRect();

      // Calculate scale so the animated logo matches the header logo size
      const scale = headerRect.height / logoRect.height;

      // Calculate translation so centers align
      const dx =
        headerRect.left +
        headerRect.width / 2 -
        (logoRect.left + logoRect.width / 2);
      const dy =
        headerRect.top +
        headerRect.height / 2 -
        (logoRect.top + logoRect.height / 2);

      // Fly the logo
      gsap.to(logoWrapper, {
        x: dx,
        y: dy,
        scale,
        duration: 0.85,
        ease: "power3.inOut",
        onComplete: () => {
          // Fade out the background to reveal the site
          gsap.to(bgRef.current, {
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          });

          // Fade the animated logo out slightly after so real header logo takes over
          gsap.to(logoWrapper, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            ease: "power2.out",
            onComplete: () => {
              // Remove pointer events immediately
              if (containerRef.current) {
                containerRef.current.style.pointerEvents = "none";
              }
              onComplete();
            },
          });
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto"
    >
      {/* Solid background — matches site background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[hsl(46,33%,75%)]"
      />

      {/* Radial glow — warm brand tint */}
      <div
        ref={glowRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-[hsl(25,95%,49%,0.06)] blur-[120px]" />
      </div>

      {/* Centered logo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div
          ref={logoWrapperRef}
          className="inline-flex items-baseline will-change-transform"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span
            ref={armslynRef}
            className="text-5xl sm:text-7xl md:text-8xl text-[#567C8D] tracking-tight opacity-0"
          >
            Armslyn
          </span>
          <span
            ref={techRef}
            className="text-5xl sm:text-7xl md:text-8xl text-[#567C8D] tracking-tight opacity-0"
          >
            {" "}Tech
          </span>
          <sup
            ref={supRef}
            className="text-xs ml-0.5 font-sans text-[#567C8D] opacity-0"
          >
            ®
          </sup>
        </div>

        {/* Subtext */}
        <div ref={subtextRef} className="mt-8 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-[#567C8D]/40 font-mono">
            Building experiences
          </p>
        </div>
      </div>
    </div>
  );
}

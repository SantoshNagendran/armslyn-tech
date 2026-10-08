import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Premium loading screen with a multi-phase animation:
 * 1. "Welcome" reveals with liquid blur, holds, then fades out
 * 2. "Armslyn Tech®" reveals with blur, subtext appears
 * 3. Logo shrinks & flies to the header position, overlay fades out
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
  const welcomeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initially hide the logo wrapper
    gsap.set(logoWrapperRef.current, { opacity: 0, scale: 0.92 });

    /* ══════════════════════════════════════════════════════════
     * PHASE 1 — "Welcome" liquid text reveal
     * ══════════════════════════════════════════════════════════ */

    // Glow breathes in first
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      0
    );

    // "Welcome" blurs in with the same liquid text style
    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, filter: "blur(18px)", y: 12, scale: 0.95 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power2.out",
      },
      0.1
    );

    // Hold "Welcome" on screen
    tl.to({}, { duration: 0.6 });

    // Fade "Welcome" out with a gentle blur
    tl.to(welcomeRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      y: -8,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.in",
    });

    /* ══════════════════════════════════════════════════════════
     * PHASE 2 — "Armslyn Tech®" liquid text reveal
     * ══════════════════════════════════════════════════════════ */

    // Bring logo wrapper into view
    tl.to(logoWrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.1,
      ease: "none",
    });

    // "Armslyn" blurs in
    tl.fromTo(
      armslynRef.current,
      { opacity: 0, filter: "blur(14px)", y: 10 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.45, ease: "power2.out" }
    );

    // " Tech" blurs in right after
    tl.fromTo(
      techRef.current,
      { opacity: 0, filter: "blur(12px)", x: -14 },
      { opacity: 1, filter: "blur(0px)", x: 0, duration: 0.35, ease: "power2.out" },
      "-=0.15"
    );

    // ® fades in
    tl.fromTo(
      supRef.current,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
      "-=0.1"
    );

    // Subtext fades in
    tl.fromTo(
      subtextRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      "-=0.05"
    );

    // Hold the full logo briefly
    tl.to({}, { duration: 0.5 });

    /* ══════════════════════════════════════════════════════════
     * PHASE 3 — Fly logo to header
     * ══════════════════════════════════════════════════════════ */

    // Fade out subtext and glow
    tl.to([subtextRef.current, glowRef.current], {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    // Fly the logo to the header position
    tl.call(() => {
      const headerLogo = document.getElementById("header-logo");
      const logoWrapper = logoWrapperRef.current;

      if (!headerLogo || !logoWrapper) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.35,
          onComplete,
        });
        return;
      }

      const headerRect = headerLogo.getBoundingClientRect();
      const logoRect = logoWrapper.getBoundingClientRect();

      const scale = headerRect.height / logoRect.height;

      const dx =
        headerRect.left +
        headerRect.width / 2 -
        (logoRect.left + logoRect.width / 2);
      const dy =
        headerRect.top +
        headerRect.height / 2 -
        (logoRect.top + logoRect.height / 2);

      gsap.to(logoWrapper, {
        x: dx,
        y: dy,
        scale,
        duration: 0.52,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.to(bgRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(logoWrapper, {
            opacity: 0,
            duration: 0.2,
            delay: 0.05,
            ease: "power2.out",
            onComplete: () => {
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

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* "Welcome" text — shown first, then fades out */}
        <span
          ref={welcomeRef}
          className="absolute text-4xl sm:text-5xl md:text-6xl text-[#0f233a] tracking-tight opacity-0"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Welcome
        </span>

        {/* Logo — revealed after "Welcome" fades out */}
        <div
          ref={logoWrapperRef}
          className="inline-flex items-baseline will-change-transform"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span
            ref={armslynRef}
            className="text-5xl sm:text-7xl md:text-8xl text-[#0f233a] tracking-tight opacity-0"
          >
            Armslyn
          </span>
          <span
            ref={techRef}
            className="text-5xl sm:text-7xl md:text-8xl text-[#0f233a] tracking-tight opacity-0"
          >
            {" "}Tech
          </span>
          <sup
            ref={supRef}
            className="text-xs ml-0.5 font-sans text-[#0f233a] opacity-0"
          >
            ®
          </sup>
        </div>

        {/* Subtext */}
        <div ref={subtextRef} className="mt-8 opacity-0">
          <p className="text-xs tracking-[0.3em] uppercase text-[#0f233a]/60 font-mono font-semibold">
            Engineering Perfection
          </p>
        </div>
      </div>
    </div>
  );
}

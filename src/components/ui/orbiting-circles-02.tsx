"use client";

import React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

/* ------------------------------------------------------------------ */
/*  Tech stack icon definitions — high-quality official SVG icons      */
/* ------------------------------------------------------------------ */

const orbits = [
  {
    // Ring 1 (Inner) — Core UI & Frameworks
    size: "w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px]",
    duration: 22,
    icons: [
      {
        name: "React",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        alt: "React",
        angle: -60,
      },
      {
        name: "TypeScript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        alt: "TypeScript",
        angle: 0,
      },
      {
        name: "Tailwind CSS",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        alt: "Tailwind CSS",
        angle: 60,
      },
    ],
  },
  {
    // Ring 2 — Build Tools & Web Fundamentals
    size: "w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] md:w-[680px] md:h-[680px]",
    duration: 30,
    icons: [
      {
        name: "Vite",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        alt: "Vite",
        angle: -70,
      },
      {
        name: "HTML5",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        alt: "HTML5",
        angle: -10,
      },
      {
        name: "CSS3",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        alt: "CSS3",
        angle: 50,
      },
      {
        name: "JavaScript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        alt: "JavaScript",
        angle: 110,
      },
    ],
  },
  {
    // Ring 3 — Platforms, Desktop & Backend
    size: "w-[560px] h-[560px] sm:w-[720px] sm:h-[720px] md:w-[880px] md:h-[880px]",
    duration: 38,
    icons: [
      {
        name: "GitHub",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        alt: "GitHub",
        angle: -50,
      },
      {
        name: "Electron",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
        alt: "Electron",
        angle: 10,
      },
      {
        name: "Next.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        alt: "Next.js",
        angle: 70,
      },
      {
        name: "Node.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        alt: "Node.js",
        angle: 130,
      },
    ],
  },
  {
    // Ring 4 (Outer) — Design, Tooling & Infrastructure
    size: "w-[700px] h-[700px] sm:w-[880px] sm:h-[880px] md:w-[1080px] md:h-[1080px]",
    duration: 46,
    icons: [
      {
        name: "Figma",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        alt: "Figma",
        angle: -40,
      },
      {
        name: "Git",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        alt: "Git",
        angle: 20,
      },
      {
        name: "VS Code",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        alt: "VS Code",
        angle: 80,
      },
      {
        name: "Vercel",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        alt: "Vercel",
        angle: 140,
      },
      {
        name: "Docker",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        alt: "Docker",
        angle: -100,
      },
    ],
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative w-full h-[360px] sm:h-[460px] md:h-[580px] overflow-hidden flex justify-center select-none">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)); }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)); }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)); }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)); }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)); }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)); }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)); }
        }
      `}</style>



      {/* Center 3D Fibonacci Particle Sphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-[260px] sm:w-[360px] md:w-[460px] z-10">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        // Double each ring's icons across opposite hemisphere for balanced visual flow
        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-[#0f233a]/15 pointer-events-none ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-[22px] sm:-ml-[26px] origin-bottom flex flex-col justify-start items-center pointer-events-none"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                {/* Counter-rotating badge container */}
                <div
                  className="group relative -mt-[22px] sm:-mt-[26px] z-10 cursor-pointer pointer-events-auto hover:z-50"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  {/* Badge pill */}
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-[#0f233a]/15 bg-[hsl(46,33%,75%)]/90 backdrop-blur-md flex items-center justify-center p-2.5 shadow-md shadow-[#0f233a]/[0.08] group-hover:scale-125 group-hover:border-[#f46a06]/60 group-hover:shadow-lg group-hover:shadow-[#f46a06]/20 group-hover:bg-[#fbf7ee] transition-all duration-300">
                    <img
                      src={iconData.src}
                      alt={iconData.alt}
                      width={28}
                      height={28}
                      loading="lazy"
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain pointer-events-none transition-transform group-hover:scale-110"
                    />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#0f233a] text-white text-[11px] font-mono tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg shadow-black/25 z-50">
                    {iconData.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0f233a]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* ── Beautiful Attached Bottom Section Border ── */}
      <div className="absolute bottom-0 inset-x-0 w-full pointer-events-none z-20 flex flex-col items-center">
        {/* Atmospheric warm orange beam & ambient glow */}
        <div className="w-3/4 max-w-4xl h-8 bg-gradient-to-r from-transparent via-[#f46a06]/40 to-transparent blur-lg -mb-4" />

        <div className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* Main distinct baseline with enhanced contrast */}
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#0f233a]/45 to-transparent" />

          {/* Luminous warm orange brand accent in the center */}
          <div className="absolute inset-x-0 mx-auto w-3/4 max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-[#f46a06] to-transparent shadow-[0_0_12px_#f46a06]" />

          {/* Crisp specular white light core */}
          <div className="absolute inset-x-0 mx-auto w-1/3 max-w-md h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

          {/* Center illuminated jewel node */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f46a06] ring-2 ring-white/70 shadow-[0_0_14px_#f46a06]" />
            <div className="absolute w-5 h-5 rounded-full border border-[#f46a06]/60 animate-ping opacity-60" />
          </div>

          {/* Architectural edge ticks */}
          <div className="absolute left-6 sm:left-10 w-2 h-2 rounded-full bg-[#0f233a]/40 ring-1 ring-white/50" />
          <div className="absolute right-6 sm:right-10 w-2 h-2 rounded-full bg-[#0f233a]/40 ring-1 ring-white/50" />
        </div>
      </div>
    </div>
  );
}

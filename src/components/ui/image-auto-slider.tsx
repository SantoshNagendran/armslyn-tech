import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface ProjectSlideItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  summary?: string;
  metrics?: string;
}

export const DEFAULT_PROJECT_SLIDES: ProjectSlideItem[] = [
  {
    id: "vanguard",
    title: "Vanguard Studio Platform",
    category: "Creative Agency & WebGL",
    year: "2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    summary: "Cinematic full-bleed editorial experience with fluid camera transitions.",
    metrics: "0.38s Load Time • 140% Retention",
  },
  {
    id: "aura",
    title: "Aura Fintech Dashboard",
    category: "SaaS Analytics & UI",
    year: "2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    summary: "Real-time financial analytics interface with clean glassmorphic telemetry.",
    metrics: "Enterprise Security • 60fps Charts",
  },
  {
    id: "chronicle",
    title: "Chronicle Editorial Journal",
    category: "Modern Publishing & CMS",
    year: "2025",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    summary: "Award-winning typography and narrative layout with fluid cursor interactions.",
    metrics: "100/100 Lighthouse • Global Audience",
  },
  {
    id: "nexus",
    title: "Nexus AI Workspace",
    category: "NextGen Developer Suite",
    year: "2026",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
    summary: "AI-augmented IDE interface built for collaborative high-velocity teams.",
    metrics: "Sub-10ms Latency • Realtime Sync",
  },
  {
    id: "solstice",
    title: "Solstice Luxury E-Commerce",
    category: "Headless Commerce Experience",
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    summary: "Editorial shopping journey with micro-interactions and seamless checkout.",
    metrics: "+42% Conversion • Ultra Fluid",
  },
  {
    id: "atlas",
    title: "Atlas Global Logistics",
    category: "Enterprise Operations Platform",
    year: "2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    summary: "Telemetry and spatial tracking map interface with offline sync capabilities.",
    metrics: "1M+ Daily Events • Fault Tolerant",
  },
  {
    id: "zenith",
    title: "Zenith Architectural Index",
    category: "Spatial Portfolio & Archive",
    year: "2025",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    summary: "Minimalist spatial monograph celebrating contemporary geometric architecture.",
    metrics: "Bespoke Geometry • Curated Archive",
  },
  {
    id: "pulse",
    title: "Pulse BioTelemetry App",
    category: "Cross-Platform Health Tech",
    year: "2026",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    summary: "Medical-grade interface visualizing patient biometrics with millisecond fidelity.",
    metrics: "HIPAA Compliant • Electron & Mobile",
  },
];

interface ImageAutoSliderProps {
  projects?: ProjectSlideItem[];
  onProjectClick?: (project: ProjectSlideItem) => void;
  speed?: number; // seconds for full cycle
}

export const Component: React.FC<ImageAutoSliderProps> = ({
  projects = DEFAULT_PROJECT_SLIDES,
  onProjectClick,
  speed = 28,
}) => {
  // Duplicate projects list for an unbroken infinite loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="relative w-full overflow-hidden select-none py-6">
      <style>{`
        @keyframes auto-scroll-track {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-slider-track {
          animation: auto-scroll-track ${speed}s linear infinite;
        }

        .infinite-slider-track:hover {
          animation-play-state: paused;
        }

        .slider-mask-edges {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }
      `}</style>

      {/* Main scrolling viewport with soft gradient edge mask */}
      <div className="slider-mask-edges w-full overflow-hidden">
        <div className="infinite-slider-track flex gap-6 sm:gap-8 w-max items-center py-4">
          {duplicatedProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              onClick={() => onProjectClick?.(project)}
              className="group relative flex-shrink-0 w-72 sm:w-84 md:w-96 rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-[#0f233a]/15 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-[#f46a06]/60 hover:shadow-2xl hover:shadow-[#f46a06]/15"
            >
              {/* Image Container with 16:10 aspect ratio */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/10">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle dark gradient overlay on hover/always */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />

                {/* Top Badge: Category & Year */}
                <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
                    {project.category}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white">
                    {project.year}
                  </span>
                </div>

                {/* Hover indicator arrow button */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-[#f46a06] text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md shadow-[#f46a06]/40 z-20">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Bottom Content inside image: Title and prompt to click */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-10 flex flex-col justify-end">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-normal text-white group-hover:text-[#f46a06] transition-colors leading-snug line-clamp-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-white/70">
                    <span className="truncate max-w-[80%]">{project.metrics || project.summary}</span>
                    <span className="text-[#f46a06] font-semibold flex items-center gap-1 group-hover:underline">
                      Explore ↗
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component;

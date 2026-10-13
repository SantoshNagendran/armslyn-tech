import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Filter, CheckCircle2 } from "lucide-react";
import { type ProjectSlideItem, DEFAULT_PROJECT_SLIDES } from "./ui/image-auto-slider";

interface PortfolioPageProps {
  onBack: () => void;
  initialSelectedProjectId?: string | null;
}

interface ExtendedProject extends ProjectSlideItem {
  client: string;
  deliverables: string[];
  techStack: string[];
  fullDescription: string;
  impactQuote: string;
  liveUrl?: string;
}

const PORTFOLIO_PROJECTS: ExtendedProject[] = [
  {
    ...DEFAULT_PROJECT_SLIDES[0],
    client: "Vanguard Media Group",
    deliverables: ["Custom WebGL Shader Engine", "Audio-Reactive Camera", "Design System", "Next.js Architecture"],
    techStack: ["React 19", "Three.js", "GSAP", "Tailwind CSS", "TypeScript", "Vite"],
    fullDescription:
      "A cinematic, editorial web experience created for a luxury European creative agency. Powered by custom WebGL shaders and physics-based cursor interactions, the site achieves a silky 60fps across mobile and desktop while reducing load times to 0.38 seconds.",
    impactQuote: "Armslyn Tech eliminated every millisecond of lag. The site converted 140% more high-tier clients in the first 60 days.",
    liveUrl: "https://vanguard-studio.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[1],
    client: "Aura Capital Partners",
    deliverables: ["Real-time Telemetry Dashboard", "Glassmorphic Component Library", "High-frequency Chart Engine"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "WebSockets", "Canvas API", "Vite"],
    fullDescription:
      "Enterprise fintech intelligence dashboard handling live market data streams. Designed with low-glare glassmorphism and sub-10ms UI renders to give traders instant visual clarity without latency or cognitive fatigue.",
    impactQuote: "Finally a financial tool that feels like it belongs in 2026. Fast, responsive, and completely reliable.",
    liveUrl: "https://aura-analytics.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[2],
    client: "Chronicle Publishing",
    deliverables: ["Dynamic Headless CMS", "Fluid Typography System", "Edge Caching Architecture"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Edge Functions", "Figma"],
    fullDescription:
      "An award-winning editorial journal engineered around Swiss typographic principles and instant static page generation. Readers enjoy seamless narrative reading flows with zero layout shifts and 100/100 Lighthouse performance across all audits.",
    impactQuote: "Readership retention doubled overnight. The editorial reading experience is peerless.",
    liveUrl: "https://chronicle-journal.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[3],
    client: "Nexus Labs",
    deliverables: ["AI Collaboration IDE", "Realtime CRDT Synchronization", "Electron Desktop Application"],
    techStack: ["Electron", "React", "TypeScript", "Tailwind CSS", "Rust FFI", "Node.js"],
    fullDescription:
      "Desktop developer environment designed for collaborative AI pair-programming. Features zero-latency keystroke broadcasting, instant local cache rehydration, and an uncluttered dark interface built for 10-hour deep work sessions.",
    impactQuote: "Feels 10x lighter and faster than Electron apps of the past. Pure engineering craftsmanship.",
    liveUrl: "https://nexus-ide.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[4],
    client: "Solstice Atelier Paris",
    deliverables: ["Headless Shopify Storefront", "Fluid Micro-Interactions", "3D Product Configurator"],
    techStack: ["React", "Shopify Storefront API", "Tailwind CSS", "Three.js", "Framer Motion"],
    fullDescription:
      "Bespoke luxury shopping destination with smooth gesture-driven navigation and interactive 3D product previews. Replaced slow legacy theme layers with an ultra-lean custom frontend, yielding a 42% lift in mobile checkout conversion.",
    impactQuote: "A masterclass in luxury e-commerce. Seamless from first landing to checkout.",
    liveUrl: "https://solstice-atelier.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[5],
    client: "Atlas Freight & Logistics",
    deliverables: ["Global Spatial Routing Map", "Offline-first Service Worker", "Fleet Telemetry Portal"],
    techStack: ["React", "Mapbox GL", "TypeScript", "Tailwind CSS", "IndexedDB", "Vite"],
    fullDescription:
      "Command and control operations hub managing over 1 million daily freight coordinates. Provides cross-continental fleet tracking with offline tolerance, instantaneous search queries, and crystal-clear high-density data visualizations.",
    impactQuote: "Our dispatchers shaved 35 minutes off their daily workflows within the first week of deployment.",
    liveUrl: "https://atlas-os.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[6],
    client: "Zenith Studio Architecture",
    deliverables: ["Spatial Interactive Monograph", "High-Resolution Image Pipeline", "Custom Grid Engine"],
    techStack: ["React", "GSAP", "TypeScript", "Tailwind CSS", "Vite"],
    fullDescription:
      "An architectural monograph highlighting minimalist structural forms. Utilizes adaptive progressive loading to render ultra-sharp 4K architectural photographs with zero render lag and silky horizontal gallery transitions.",
    impactQuote: "The visual gravitas and precision of the site perfectly mirror our physical architecture.",
    liveUrl: "https://zenith-archive.demo",
  },
  {
    ...DEFAULT_PROJECT_SLIDES[7],
    client: "Pulse BioTelemetry Systems",
    deliverables: ["HIPAA-Compliant Healthcare Portal", "Live Waveform Canvas", "Cross-Platform Dashboard"],
    techStack: ["Electron", "React", "TypeScript", "Tailwind CSS", "Canvas API"],
    fullDescription:
      "High-precision medical biometrics monitor visualizing patient vitals and telemetry. Architected with strict zero-fail fault tolerance, immediate audible alarms, and ultra-crisp waveform rendering.",
    impactQuote: "Critical medical data displayed with extreme clarity and sub-millisecond precision.",
    liveUrl: "https://pulse-health.demo",
  },
];

export function PortfolioPage({ onBack }: PortfolioPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ExtendedProject | null>(null);

  const categories = ["All", "Creative & WebGL", "SaaS & Dashboards", "Modern Publishing", "NextGen Developer Suite"];

  const filteredProjects = selectedFilter === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || selectedFilter.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-[hsl(46,33%,75%)] text-[#0f233a] relative overflow-x-hidden selection:bg-[#f46a06] selection:text-white pb-32">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-transparent border-b border-[#0f233a]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass border border-[#0f233a]/15 text-xs font-mono uppercase tracking-wider text-[#0f233a] hover:text-[#f46a06] hover:border-[#f46a06]/40 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Studio</span>
          </button>

          {/* Studio Brand */}
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f233a]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <span>Armslyn Tech</span>
            <sup className="text-xs ml-0.5 font-sans font-bold">®</sup>
            <span className="text-xs font-mono font-normal uppercase tracking-widest text-[#f46a06] ml-3 hidden sm:inline-block">
              / Portfolio Archive
            </span>
          </div>

          {/* Action CTA */}
          <button
            onClick={onBack}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#f46a06] hover:underline cursor-pointer"
          >
            Start a Project ↗
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40">
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-mono mb-5 liquid-glass border border-[#0f233a]/15 text-[#0f233a]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
            Complete Project Archive
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.04] mb-6 text-[#0f233a]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            These are our projects,{" "}
            <em className="not-italic text-[#f46a06]">crafted to lead.</em>
          </h1>

          <p className="text-base sm:text-xl text-[#0f233a]/75 font-light leading-relaxed max-w-2xl">
            A comprehensive catalog of bespoke web platforms, high-velocity developer tools, and editorial interfaces we have designed and engineered from the ground up.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 pb-6 border-b border-[#0f233a]/10">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mr-3 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#f46a06]" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-[#0f233a] text-white shadow-md shadow-[#0f233a]/20"
                  : "liquid-glass border border-[#0f233a]/15 text-[#0f233a]/75 hover:border-[#f46a06]/40 hover:text-[#f46a06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl overflow-hidden glass-card border border-[#0f233a]/15 transition-all duration-300 hover:border-[#f46a06]/50 hover:shadow-2xl hover:shadow-[#f46a06]/10 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black/10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/20 backdrop-blur-md text-white font-semibold">
                    {project.year}
                  </span>
                </div>

                {/* Click to expand hover hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-full bg-[#f46a06] text-white text-xs font-mono uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#0f233a]/60 mb-2">
                    Client: <span className="text-[#0f233a] font-semibold">{project.client}</span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl text-[#0f233a] font-normal mb-3 group-hover:text-[#f46a06] transition-colors"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#0f233a]/75 font-light leading-relaxed mb-6">
                    {project.fullDescription}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#0f233a]/[0.06] border border-[#0f233a]/10 text-[#0f233a]/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Metrics & Case study trigger */}
                <div className="pt-5 border-t border-[#0f233a]/10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0f233a]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
                    <span>{project.metrics}</span>
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#f46a06] hover:underline cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Banner */}
        <div className="mt-20 sm:mt-28 p-8 sm:p-14 rounded-3xl glass-card border border-[#0f233a]/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f46a06]/15 blur-3xl pointer-events-none rounded-full" />
          <h2
            className="text-3xl sm:text-5xl text-[#0f233a] font-normal mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Have an ambitious project to build?
          </h2>
          <p className="text-base sm:text-lg text-[#0f233a]/75 font-light max-w-xl mx-auto mb-8">
            Let's collaborate directly — zero agency bloat, obsessively typed code, and lightning-fast delivery.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3.5 rounded-full bg-[#f46a06] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#f46a06]/30 hover:bg-[#ff7b1c] hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Return to Studio & Contact Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Detail Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(46,33%,75%)] rounded-3xl border border-[#0f233a]/20 shadow-2xl p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full liquid-glass border border-[#0f233a]/20 flex items-center justify-center text-xs font-mono font-bold text-[#0f233a] hover:bg-[#f46a06] hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#0f233a]/15">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md text-white border border-white/20">
                {activeModalProject.category} • {activeModalProject.year}
              </div>
            </div>

            {/* Modal Title & Client */}
            <div className="mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f46a06] font-semibold">
                Client: {activeModalProject.client}
              </span>
              <h2
                className="text-3xl sm:text-4xl text-[#0f233a] font-normal mt-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {activeModalProject.title}
              </h2>
            </div>

            <p className="text-base text-[#0f233a]/80 font-light leading-relaxed mb-6">
              {activeModalProject.fullDescription}
            </p>

            {/* Deliverables List */}
            <div className="mb-6 p-5 rounded-2xl liquid-glass border border-[#0f233a]/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#0f233a] font-bold mb-3">
                Key Architectural Deliverables:
              </h4>
              <div className="space-y-2">
                {activeModalProject.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-[#0f233a]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#f46a06] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Quote */}
            <blockquote className="p-4 rounded-xl border-l-2 border-[#f46a06] bg-[#0f233a]/[0.04] text-sm italic text-[#0f233a]/85 mb-6">
              "{activeModalProject.impactQuote}"
            </blockquote>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {activeModalProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[#0f233a]/10 border border-[#0f233a]/15 text-[#0f233a]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Close / Action footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0f233a]/10">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-full liquid-glass border border-[#0f233a]/20 text-xs font-mono uppercase tracking-wider text-[#0f233a] hover:bg-[#0f233a] hover:text-white transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;

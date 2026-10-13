import { SectionHeader } from "./SectionHeader";
import { ArrowUpRight } from "lucide-react";
import ImageAutoSlider, { type ProjectSlideItem } from "./ui/image-auto-slider";

interface ProjectsSectionProps {
  onOpenPortfolio?: (projectId?: string) => void;
}

export function ProjectsSection({ onOpenPortfolio }: ProjectsSectionProps) {
  const handleProjectClick = (project: ProjectSlideItem) => {
    if (onOpenPortfolio) {
      onOpenPortfolio(project.id);
    }
  };

  return (
    <section id="work" className="relative py-24 sm:py-32 w-full z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeader
          title="These are our projects,"
          highlight="built to lead."
          subtitle="A curated preview of high-performance digital products, bespoke web experiences, and brand platforms we've brought to life. Click any project to explore our complete portfolio archive."
          dark={false}
        />
      </div>

      {/* Infinite Auto-Scrolling Projects Carousel */}
      <div className="w-full relative">
        <ImageAutoSlider onProjectClick={handleProjectClick} speed={28} />
      </div>

      {/* Bottom CTA to View Full Portfolio Page */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
          <span>Hover carousel to pause • Click any card to inspect full case study</span>
        </div>

        <button
          onClick={() => onOpenPortfolio?.()}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f233a] text-white text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-[#0f233a]/15 hover:bg-[#f46a06] hover:shadow-[#f46a06]/25 transition-all cursor-pointer"
        >
          <span>Explore Complete Portfolio Archive (8)</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}

export default ProjectsSection;

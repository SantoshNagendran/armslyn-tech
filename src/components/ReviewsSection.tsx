import { SectionHeader } from "./SectionHeader"
import { Star } from "lucide-react"

export function ReviewsSection() {
  const reviews = [
    {
      quote: "Armslyn Tech transformed our web presence from a forgettable landing page into our company's biggest growth engine. The motion fluidity and typography are second to none.",
      author: "Marcus Vance",
      role: "Founder & CEO",
      company: "Vance Media Lab",
      rating: 5,
    },
    {
      quote: "The attention to sub-second load performance without sacrificing cinematic visual design blew our entire executive board away. They build like artists and think like engineers.",
      author: "Elena Rostova",
      role: "Head of Product",
      company: "Aura Systems",
      rating: 5,
    },
    {
      quote: "Working directly with their engineering team was a breath of fresh air. No delays, no excuses—just flawless implementation and impeccable aesthetic taste.",
      author: "Devon Chen",
      role: "Creative Director",
      company: "Kinetix Digital",
      rating: 5,
    },
  ]

  return (
    <section id="reviews" className="section-reviews relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Reviews"
        title="Trusted by founders who value"
        highlight="craft and speed."
        subtitle="Read what partners and founders have to say about collaborating with Armslyn Tech."
      />

      <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="review-card glass-card rounded-3xl p-8 sm:p-10 transition-colors duration-300 hover:border-white/20 relative group flex flex-col justify-between"
          >
            <div>
              <div className="review-stars flex items-center gap-1 mb-6">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                ))}
              </div>

              <blockquote className="text-foreground text-sm sm:text-base leading-relaxed mb-8 italic">
                "{rev.quote}"
              </blockquote>
            </div>

            <div className="review-author pt-6 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center font-mono text-xs font-semibold text-white">
                {rev.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{rev.author}</div>
                <div className="text-xs text-muted-foreground">{rev.role}, {rev.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

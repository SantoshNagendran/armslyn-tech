import { SectionHeader } from "./SectionHeader"
import { Star } from "lucide-react"

export function ReviewsSection() {
  const reviews = [
    {
      author: "Marcus Vance",
      role: "Founder & CEO, Vance Optics",
      quote:
        "Armslyn Tech completely altered how customers perceive our brand. Our conversion rate climbed 42% in the first 30 days after launch. Their obsession with speed and typography is unmatched.",
      rating: 5,
    },
    {
      author: "Sarah Lin",
      role: "Head of Product, Kinetix Studio",
      quote:
        "No agency bloat, no endless meetings. They engineered our web application in three weeks with custom motion and sub-second load times. Working with them was effortless.",
      rating: 5,
    },
    {
      author: "Julian Thorne",
      role: "Creative Director, Studio Form",
      quote:
        "Finding an engineering studio that genuinely respects design fidelity is rare. Armslyn Tech didn't just match our Figma designs—they brought them alive with fluid 60fps micro-interactions.",
      rating: 5,
    },
  ]

  return (
    <section id="reviews" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Reviews"
        title="Trusted by founders who value"
        highlight="craft and speed."
        subtitle="Read what partners and founders have to say about collaborating with Armslyn Tech."
        dark={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 relative group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-foreground text-sm sm:text-base leading-relaxed mb-8 italic font-light">
                "{rev.quote}"
              </blockquote>
            </div>

            <div className="pt-6 border-t border-foreground/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center font-mono text-xs font-semibold text-primary">
                {rev.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{rev.author}</div>
                <div className="text-xs text-muted-foreground">{rev.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

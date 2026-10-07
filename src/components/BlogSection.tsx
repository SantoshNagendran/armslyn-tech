import { SectionHeader } from "./SectionHeader"
import { ArrowRight, Clock } from "lucide-react"

export function BlogSection() {
  const articles = [
    {
      title: "The Physics of Digital Attention",
      excerpt: "Why modern users abandon sites in under 2.4 seconds, and how editorial hierarchy and fluid micro-motion reverse the trend.",
      category: "Design Philosophy",
      date: "Oct 2026",
      readTime: "4 min read",
    },
    {
      title: "Zero-Bloat Architecture in 2026",
      excerpt: "Replacing heavy runtime dependencies with modern CSS variables, native hardware acceleration, and static edge deployment.",
      category: "Engineering",
      date: "Sep 2026",
      readTime: "6 min read",
    },
    {
      title: "Crafting Emotional Resonance on the Web",
      excerpt: "Examining how cinematic typography, warm luminescence, and soundless motion evoke prestige for emerging luxury brands.",
      category: "Creative Direction",
      date: "Aug 2026",
      readTime: "5 min read",
    },
  ]

  return (
    <section id="blog" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Editorial & Blog"
        title="Perspectives on engineering,"
        highlight="motion, and design."
        subtitle="Insights from our studio on building web experiences that capture curiosity and withstand the test of time."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <article
            key={idx}
            className="glass-card rounded-3xl p-8 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-4">
                <span className="text-primary font-medium">{article.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>

              <h3
                className="text-2xl text-foreground font-normal mb-3 group-hover:text-primary transition-colors leading-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {article.title}
              </h3>

              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-foreground/10 flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors">
              <span>{article.date}</span>
              <span className="inline-flex items-center gap-1 font-medium">
                Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

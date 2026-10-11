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
      role: "Head of Product, Kinetix AI",
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
    <section id="reviews" className="relative py-28 sm:py-36 w-full z-10 bg-[#09131f] text-white overflow-hidden border-b border-slate-800/80">
      {/* Twilight Ambient Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Reviews"
          title="Trusted by founders who value"
          highlight="craft and speed."
          subtitle="Read what partners and founders have to say about collaborating with Armslyn Tech."
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-8 sm:p-10 bg-slate-900/60 border border-slate-800/90 backdrop-blur-md transition-all duration-300 hover:border-[#f46a06]/40 hover:-translate-y-1 relative group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f46a06] text-[#f46a06]" />
                  ))}
                </div>

                <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 italic font-light">
                  "{rev.quote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-semibold text-[#f46a06]">
                  {rev.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{rev.author}</div>
                  <div className="text-xs text-slate-400">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState, type FormEvent } from "react"
import { SectionHeader } from "./SectionHeader"
import { Mail, MapPin, CheckCircle, Send } from "lucide-react"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", service: "Web Development", message: "" })
    }, 4000)
  }

  return (
    <section id="contact" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <SectionHeader
        badge="Contact Us"
        title="Ready to build something"
        highlight="truly exceptional?"
        subtitle="Tell us about your brand, goals, and timeline. We'll get back to you within 24 hours with a comprehensive evaluation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Studio Details Card */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Accepting 2 new client projects
            </div>

            <h3
              className="text-3xl sm:text-4xl text-foreground font-normal mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Let's craft your digital benchmark.
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
              Whether you need a complete ground-up website redesign, an interactive product launch, or a dedicated frontend engineering team, we're here to make it happen.
            </p>

            <div className="space-y-5 border-t border-foreground/10 pt-6">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@armslyn.tech</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-foreground">
                <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Global Remote Studio • Worldwide Clients</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-foreground/10 text-xs text-muted-foreground font-mono">
            Average response time: &lt; 4 hours
          </div>
        </div>

        {/* Right Contact Form Card */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-12 relative">
          {submitted ? (
            <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4
                className="text-3xl text-foreground font-normal mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Inquiry Received
              </h4>
              <p className="text-muted-foreground text-sm max-w-md">
                Thank you for reaching out! Our lead engineer will review your requirements and reach out via email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full bg-foreground/[0.04] border border-foreground/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@company.com"
                    className="w-full bg-foreground/[0.04] border border-foreground/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Project Scope
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-background border border-foreground/15 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="Web Development">Full Website Design & Build</option>
                  <option value="Web Application">Interactive Web Application</option>
                  <option value="Motion & 3D">Motion Choreography & 3D WebGL</option>
                  <option value="Performance Overhaul">Performance & Speed Overhaul</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your brand, current site, target timeline, or vision..."
                  className="w-full bg-foreground/[0.04] border border-foreground/15 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="liquid-glass glass-glow-orange w-full rounded-full py-4 text-sm font-bold text-[#0f233a] hover:text-[#f46a06] transition-all duration-300 hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                Send Inquiry <Send className="w-4 h-4 text-primary" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

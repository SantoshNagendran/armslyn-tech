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
        dark={false}
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

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 font-light">
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
                <span>Global Client Collaborations</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-foreground/10 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Timezone: UTC+5:30 (Global)</span>
            <span>Response: &lt; 24h</span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10">
          {submitted ? (
            <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4
                className="text-3xl text-foreground font-normal mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Inquiry Received
              </h4>
              <p className="text-muted-foreground text-sm max-w-sm">
                Thank you for reaching out. A partner from Armslyn Tech will review your project and get back to you shortly.
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
                    placeholder="Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl liquid-glass text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl liquid-glass text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Service Required
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl liquid-glass text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm font-sans"
                >
                  <option value="Web Development" className="bg-[#D8D0A8] text-foreground">Bespoke Web Development</option>
                  <option value="Web Apps" className="bg-[#D8D0A8] text-foreground">High-Performance Web App</option>
                  <option value="Motion & 3D" className="bg-[#D8D0A8] text-foreground">Cinematic Motion & GSAP Experience</option>
                  <option value="Consulting & SEO" className="bg-[#D8D0A8] text-foreground">Performance & SEO Engineering</option>
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
                  placeholder="Tell us about your brand, what you're looking to build, and any target launch dates..."
                  className="w-full px-4 py-3 rounded-xl liquid-glass text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-primary/20"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

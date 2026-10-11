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
    <section id="contact" className="relative py-28 sm:py-36 w-full z-10 bg-[#040711] text-white overflow-hidden">
      {/* Orange Horizon Beacon Atmosphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-t from-[#f46a06]/20 via-[#f46a06]/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Contact Us"
          title="Ready to build something"
          highlight="truly exceptional?"
          subtitle="Tell us about your brand, goals, and timeline. We'll get back to you within 24 hours with a comprehensive evaluation."
          dark={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Studio Details Card */}
          <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-slate-900/60 border border-slate-800/90 backdrop-blur-md flex flex-col justify-between shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#f46a06]/10 text-[#f46a06] border border-[#f46a06]/25 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f46a06] animate-pulse" />
                Accepting 2 new client projects
              </div>

              <h3
                className="text-3xl sm:text-4xl text-white font-normal mb-4"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Let's craft your digital benchmark.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
                Whether you need a complete ground-up website redesign, an interactive product launch, or a dedicated frontend engineering team, we're here to make it happen.
              </p>

              <div className="space-y-5 border-t border-slate-800/80 pt-6">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f46a06]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>hello@armslyn.tech</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f46a06]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Global Client Collaborations</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Timezone: UTC+5:30 (Global)</span>
              <span>Response: &lt; 24h</span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-2xl">
            {submitted ? (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#f46a06]/20 border border-[#f46a06]/40 flex items-center justify-center text-[#f46a06] mb-6 animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4
                  className="text-3xl text-white font-normal mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Inquiry Received
                </h4>
                <p className="text-slate-300 text-sm max-w-sm">
                  Thank you for reaching out. A partner from Armslyn Tech will review your project and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/40 transition-all text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/40 transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/40 transition-all text-sm font-sans"
                  >
                    <option value="Web Development" className="bg-slate-900">Bespoke Web Development</option>
                    <option value="Web Apps" className="bg-slate-900">High-Performance Web App</option>
                    <option value="Motion & 3D" className="bg-slate-900">Cinematic Motion & GSAP Experience</option>
                    <option value="Consulting & SEO" className="bg-slate-900">Performance & SEO Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand, what you're looking to build, and any target launch dates..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f46a06] focus:ring-1 focus:ring-[#f46a06]/40 transition-all text-sm font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#f46a06] to-[#ff8c3a] text-black font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#f46a06]/20"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

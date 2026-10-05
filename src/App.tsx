const BRAND_NAME = "Armslyn Tech"
const VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex flex-col selection:bg-white/20 selection:text-white">
      {/* Fullscreen Looping Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={VIDEO_SRC}
      />

      {/* Navigation Bar */}
      <header className="relative z-10 w-full">
        <nav
          className="relative z-10 flex row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="text-3xl tracking-tight text-foreground transition-opacity hover:opacity-90 inline-flex items-baseline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>{BRAND_NAME}</span>
            <sup className="text-xs ml-0.5 font-sans">®</sup>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-sm font-medium text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#work"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Navbar CTA Button */}
          <div>
            <a
              href="#contact"
              className="liquid-glass inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
            >
              Start a Project
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto w-full">
        {/* Main Heading */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          We <em className="not-italic text-muted-foreground">build websites</em> that{" "}
          <em className="not-italic text-muted-foreground">hold attention.</em>
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          {BRAND_NAME} is a small web development studio. We design and build fast,
          clean websites and web apps for businesses that want their online
          presence to actually work.
        </p>

        {/* Hero CTA Button */}
        <div>
          <a
            href="#contact"
            className="liquid-glass inline-flex items-center justify-center rounded-full px-14 py-5 text-base text-foreground mt-12 transition-transform duration-300 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 font-medium"
          >
            Start a Project
          </a>
        </div>
      </main>
    </div>
  )
}

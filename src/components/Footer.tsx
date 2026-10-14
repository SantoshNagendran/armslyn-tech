import { DitheredFooter, type FooterColumn, type FooterSocial } from "./ui/dithered-footer"

interface FooterProps {
  onScrollToTop: () => void
  onNavigate: (id: string) => void
}

const svgIcon = (path: string, viewBox = "0 0 24 24") => (
  <svg viewBox={viewBox} className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
)

export function Footer({ onScrollToTop, onNavigate }: FooterProps) {
  const columns: FooterColumn[] = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#hero" },
        { label: "Process", href: "#process" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Selected Work", href: "#work" },
        { label: "Why Us", href: "#why-us" },
        { label: "Client Reviews", href: "#reviews" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "High-Performance Web", href: "#services" },
        { label: "Creative 3D & GSAP", href: "#services" },
        { label: "Design Systems & UI", href: "#services" },
        { label: "Full-Stack Development", href: "#services" },
        { label: "Speed & Technical SEO", href: "#services" },
        { label: "Direct Founder Access", href: "#why-us" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Start a Project", href: "#contact" },
        { label: "Founder Slack / WhatsApp", href: "#contact" },
        { label: "contact@armslyntech.com", href: "mailto:contact@armslyntech.com" },
        { label: "Staging Link from Week 1", href: "#why-us" },
        { label: "Flat-Rate Pricing", href: "#why-us" },
      ],
    },
  ]

  const socials: FooterSocial[] = [
    {
      label: "GitHub",
      href: "https://github.com",
      icon: svgIcon(
        "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5"
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: svgIcon(
        "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      ),
    },
    {
      label: "X (Twitter)",
      href: "https://x.com",
      icon: svgIcon(
        "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919488339462",
      icon: svgIcon(
        "M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.06 7.42C8.89 7.42 8.62 7.48 8.38 7.74C8.15 8 7.5 8.61 7.5 9.85C7.5 11.09 8.4 12.28 8.53 12.45C8.66 12.62 10.3 15.13 12.79 16.21C13.38 16.47 13.84 16.62 14.2 16.74C14.79 16.93 15.33 16.9 15.76 16.84C16.24 16.77 17.24 16.23 17.45 15.65C17.65 15.07 17.65 14.57 17.59 14.47C17.53 14.37 17.37 14.31 17.13 14.19C16.88 14.07 15.67 13.48 15.44 13.4C15.22 13.31 15.06 13.27 14.89 13.52C14.73 13.76 14.25 14.31 14.11 14.47C13.97 14.64 13.83 14.66 13.58 14.54C13.34 14.42 12.55 14.16 11.62 13.33C10.89 12.68 10.4 11.88 10.26 11.63C10.12 11.39 10.25 11.26 10.37 11.14C10.48 11.03 10.62 10.85 10.74 10.71C10.86 10.57 10.9 10.47 10.98 10.31C11.06 10.15 11.02 10.01 10.96 9.89C10.9 9.77 10.44 8.64 10.25 8.19C10.06 7.74 9.88 7.8 9.74 7.79C9.61 7.79 9.45 7.78 9.28 7.78C9.12 7.78 9.06 7.42 9.06 7.42Z"
      ),
    },
  ]

  const legal = [
    { label: "Privacy Policy", href: "#hero" },
    { label: "Terms of Service", href: "#hero" },
    { label: "Direct-to-Engineer Guarantee", href: "#why-us" },
  ]

  return (
    <DitheredFooter
      brand="Armslyn Tech"
      brandHref="#hero"
      tagline="High-performance engineering studio. We build websites that hold attention with zero middlemen."
      columns={columns}
      socials={socials}
      legal={legal}
      copyright={`© ${new Date().getFullYear()} Armslyn Tech. All rights reserved.`}
      status={{ label: "Accepting projects for Q4", href: "#contact" }}
      accent="#f46a06"
      newsletterLabel="Subscribe for studio release notes & engineering teardowns"
      onSubscribe={async () => {
        await new Promise((resolve) => setTimeout(resolve, 600))
      }}
      onNavigate={onNavigate}
      onScrollToTop={onScrollToTop}
    />
  )
}

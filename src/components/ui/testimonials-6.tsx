import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Efferd is so polished I might just retire and become a full-time potato farmer. The ecosystem is in safe hands.",
    image: "https://cdn.21st.dev/assets/mirror/51/513d06f542692036ff0bb17938f04b3efd60567ba2cae08049469d21f18e0524.jpg",
    name: "Shadcn",
    role: "Founder",
    company: "Shadcn UI",
  },
  {
    quote:
      "Efferd is why I still have hair. No more pulling it out over centering divs or fighting with CSS grid.",
    image: "https://cdn.21st.dev/assets/mirror/fa/fa600e6e3f008d0a54390646f123fcd1c952304522185e7b85837595eacb74db.jpg",
    name: "Guillermo Rauch",
    role: "CEO",
    company: "Vercel",
  },
  {
    quote:
      "I tried to buy Efferd but they wouldn't sell. So I just bought Twitter instead to complain about it.",
    image: "https://unavatar.io/x/elonmusk",
    name: "Elon Musk",
    role: "CEO",
    company: "X.com",
  },
  {
    quote:
      "We just acquired Efferd for 3 gazillion dollars. We're calling it iEfferd. It's our best product yet.",
    image: "https://unavatar.io/x/tim_cook",
    name: "Tim Cook",
    role: "CEO",
    company: "Apple",
  },
  {
    quote:
      "I'm considering shipping Efferd components with Prime delivery. 2-day shipping on beautiful UIs? Done.",
    image: "https://unavatar.io/x/JeffBezos",
    name: "Jeff Bezos",
    role: "Founder",
    company: "Amazon",
  },
  {
    quote:
      "We're rewriting OpenAI's entire frontend in Efferd. The AGI told us it's the only logical choice.",
    image: "https://unavatar.io/x/sama",
    name: "Sam Altman",
    role: "CEO",
    company: "OpenAI",
  },
  {
    quote:
      "We processed 100 petabytes of data to find the perfect UI library. The algorithm returned 'Efferd' with 99.9% confidence.",
    image: "https://unavatar.io/x/sundarpichai",
    name: "Sundar Pichai",
    role: "CEO",
    company: "Google",
  },
  {
    quote:
      "Our links might 404 sometimes, but thanks to Efferd, at least the 404 page looks absolutely stunning.",
    image: "https://cdn.21st.dev/assets/mirror/f4/f4913839b819c1ff0504a29fcaa228f16bfafc248be78282d14556dabcc1e131.jpg",
    name: "Steven Tey",
    role: "Founder",
    company: "Dub.co",
  },
  {
    quote:
      "It's so fast, I finished my UI sprint before my next meeting even started. Open source for the win.",
    image: "https://unavatar.io/x/peer_rich",
    name: "Peer Richelsen",
    role: "Co-Founder",
    company: "Cal.com",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section id="reviews" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
      <div className="mx-auto max-w-5xl">
        {/* Header with pill badge REMOVED per user request */}
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3 mb-10 text-center">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#0f233a] font-normal leading-[1.08] tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What our users say
          </h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base font-light max-w-md">
            See what our customers have to say about us.
          </p>
        </div>

        <div
          className={cn(
            "mt-10 flex h-[580px] max-h-[640px] justify-center gap-6 overflow-hidden",
            "[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]",
            "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          )}
        >
          <InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
            {firstColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden md:block"
            direction="vertical"
            speed={50}
            speedOnHover={25}
          >
            {secondColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden lg:block"
            direction="vertical"
            speed={35}
            speedOnHover={17}
          >
            {thirdColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  const { quote, image, name, role, company } = testimonial;
  return (
    <figure
      className={cn(
        "w-full max-w-xs rounded-3xl glass-card border border-[#0f233a]/15 p-6 sm:p-7 shadow-lg shadow-[#0f233a]/5 transition-all duration-300 hover:border-[#f46a06]/40 hover:shadow-xl hover:shadow-[#f46a06]/10",
        className,
      )}
      {...props}
    >
      <blockquote className="text-[#0f233a] text-sm sm:text-[15px] leading-relaxed font-light">
        "{quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-[#0f233a]/10">
        <Avatar className="h-9 w-9 rounded-full ring-2 ring-[#f46a06]/20">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback className="bg-[#0f233a] text-white font-mono text-xs">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-semibold text-sm text-[#0f233a] not-italic leading-5 tracking-tight">
            {name}
          </cite>
          <span className="text-muted-foreground text-xs leading-5 tracking-tight font-mono">
            {role} {company && `, ${company}`}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;

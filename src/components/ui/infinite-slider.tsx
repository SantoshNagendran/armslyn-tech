import { cn } from "@/lib/utils";
import { motion, useMotionValue, animate } from "framer-motion";
import { useState, useEffect, useRef, type ReactNode } from "react";

export type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState(0);
  const translation = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const size =
          direction === "horizontal"
            ? containerRef.current.scrollWidth / 2
            : containerRef.current.scrollHeight / 2;
        if (size > 0) {
          setContentSize(size);
        }
      }
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [direction, children, gap]);

  useEffect(() => {
    if (!contentSize || contentSize <= 0) return;

    const from = reverse ? -contentSize : 0;
    const to = reverse ? 0 : -contentSize;
    const distance = Math.abs(to - from);
    const duration = distance / (currentSpeed || 30);

    const controls = animate(translation, [from, to], {
      ease: "linear",
      duration: Math.max(duration, 0.1),
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      onRepeat: () => {
        translation.set(from);
      },
    });

    return () => controls.stop();
  }, [currentSpeed, contentSize, direction, reverse, translation]);

  return (
    <div
      className={cn("overflow-hidden select-none", className)}
      onMouseEnter={() => speedOnHover && setCurrentSpeed(speedOnHover)}
      onMouseLeave={() => setCurrentSpeed(speed)}
    >
      <motion.div
        ref={containerRef}
        className={cn("flex", direction === "vertical" ? "flex-col" : "flex-row")}
        style={{
          [direction === "horizontal" ? "x" : "y"]: translation,
          gap: `${gap}px`,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default InfiniteSlider;

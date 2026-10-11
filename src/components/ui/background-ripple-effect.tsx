"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundCellsProps {
  children?: React.ReactNode;
  className?: string;
  gridClassName?: string;
  rippleColor?: string;
}

export const BackgroundCells = ({
  children,
  className,
  gridClassName,
  rippleColor = "rgba(244, 106, 6, 0.45)",
}: BackgroundCellsProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 600, y: 350 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative min-h-[850px] w-full overflow-hidden bg-[#030712] text-white selection:bg-[#f46a06]/30",
        className
      )}
    >
      <BackgroundCellCore
        mousePosition={mousePosition}
        gridClassName={gridClassName}
        rippleColor={rippleColor}
      />
      {children && (
        <div className="relative z-20 w-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
};

interface BackgroundCellCoreProps {
  mousePosition: { x: number; y: number };
  gridClassName?: string;
  rippleColor?: string;
}

export const BackgroundCellCore = ({
  mousePosition,
  gridClassName,
  rippleColor = "rgba(244, 106, 6, 0.45)",
}: BackgroundCellCoreProps) => {
  const size = 480;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      {/* Ambient background glow following mouse */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500 blur-3xl opacity-35"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${mousePosition.x - size / 2}px`,
          top: `${mousePosition.y - size / 2}px`,
          background: "radial-gradient(circle, rgba(244,106,6,0.3) 0%, rgba(14,165,233,0.15) 50%, transparent 70%)",
        }}
      />

      {/* Masked highlight pattern layer */}
      <div
        className="absolute inset-0 z-10"
        style={{
          maskImage: `radial-gradient(${size / 2}px circle at center, white 20%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(${size / 2}px circle at center, white 20%, transparent 80%)`,
          WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
          WebkitMaskSize: `${size}px ${size}px`,
          maskSize: `${size}px ${size}px`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <Pattern
          className={cn("opacity-100", gridClassName)}
          cellClassName="border-[#f46a06]/60 shadow-[inset_0_0_12px_rgba(244,106,6,0.1)]"
          rippleColor={rippleColor}
        />
      </div>

      {/* Base ambient grid layer */}
      <Pattern
        className={cn("opacity-40", gridClassName)}
        cellClassName="border-slate-800/80"
        rippleColor={rippleColor}
      />

      {/* Gradient vignette overlays for seamless top/bottom blending */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030712] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none z-10" />
    </div>
  );
};

interface PatternProps {
  className?: string;
  cellClassName?: string;
  rippleColor?: string;
}

interface CellProps {
  rowIdx: number;
  colIdx: number;
  clickedCell: [number, number] | null;
  cellClassName?: string;
  rippleColor?: string;
  onClick: () => void;
}

const Cell = React.memo(
  ({ rowIdx, colIdx, clickedCell, cellClassName, rippleColor, onClick }: CellProps) => {
    const controls = useAnimation();

    useEffect(() => {
      if (clickedCell) {
        const distance = Math.sqrt(
          Math.pow(clickedCell[0] - rowIdx, 2) + Math.pow(clickedCell[1] - colIdx, 2)
        );
        controls.start({
          opacity: [0, Math.max(0, 1 - distance * 0.1), 0],
          transition: { duration: distance * 0.14 },
        });
      }
    }, [clickedCell, rowIdx, colIdx, controls]);

    return (
      <div
        className={cn(
          "bg-transparent border-l border-b transition-colors duration-200 cursor-crosshair",
          cellClassName
        )}
        onClick={onClick}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: [0, 1, 0.7] }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          animate={controls}
          style={{ backgroundColor: rippleColor }}
          className="h-12 w-12"
        />
      </div>
    );
  }
);
Cell.displayName = "Cell";

const Pattern = ({ className, cellClassName, rippleColor }: PatternProps) => {
  const rows = 36;
  const cols = 28;
  const matrix = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => [i, j])
  );
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div className={cn("flex flex-row relative justify-center w-full min-w-full select-none", className)}>
      {matrix.map((row, rowIdx) => (
        <div key={`matrix-row-${rowIdx}`} className="flex flex-col relative border-b border-slate-800/80">
          {row.map((_, colIdx) => (
            <Cell
              key={`cell-${rowIdx}-${colIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              clickedCell={clickedCell}
              cellClassName={cellClassName}
              rippleColor={rippleColor}
              onClick={() => setClickedCell([rowIdx, colIdx])}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

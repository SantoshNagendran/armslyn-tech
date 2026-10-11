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
  rippleColor = "rgba(244, 106, 6, 0.35)",
}: BackgroundCellsProps) => {
  return (
    <div className={cn("relative min-h-[600px] w-full flex justify-center overflow-hidden", className)}>
      <BackgroundCellCore gridClassName={gridClassName} rippleColor={rippleColor} />
      {children && (
        <div className="relative z-30 w-full">
          {children}
        </div>
      )}
    </div>
  );
};

interface BackgroundCellCoreProps {
  gridClassName?: string;
  rippleColor?: string;
}

export const BackgroundCellCore = ({
  gridClassName,
  rippleColor = "rgba(244, 106, 6, 0.35)",
}: BackgroundCellCoreProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const size = 320;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full w-full absolute inset-0 pointer-events-auto"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft bottom fade that blends into background */}
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 3.5}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 3.5}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern
            cellClassName="border-[#f46a06]/40 relative z-[100]"
            rippleColor={rippleColor}
            className={gridClassName}
          />
        </div>
        <Pattern
          className={cn("opacity-[0.45]", gridClassName)}
          cellClassName="border-foreground/15"
          rippleColor={rippleColor}
        />
      </div>
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
          opacity: [0, Math.max(0, 1 - distance * 0.12), 0],
          transition: { duration: distance * 0.15 },
        });
      }
    }, [clickedCell, rowIdx, colIdx, controls]);

    return (
      <div
        className={cn(
          "bg-transparent border-l border-b border-foreground/10 cursor-pointer transition-colors",
          cellClassName
        )}
        onClick={onClick}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: [0, 1, 0.6] }}
          transition={{ duration: 0.4, ease: "backOut" }}
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
  const x = new Array(36).fill(0);
  const y = new Array(24).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div className={cn("flex flex-row relative z-30 justify-center w-full", className)}>
      {matrix.map((row, rowIdx) => (
        <div key={`matrix-row-${rowIdx}`} className="flex flex-col relative z-20 border-b border-foreground/10">
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

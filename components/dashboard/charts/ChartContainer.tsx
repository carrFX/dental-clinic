"use client";

interface ChartContainerProps {
  children: React.ReactNode;
  /** Tinggi responsif — default untuk chart kartesian */
  size?: "sm" | "md" | "lg" | "square" | "pie";
  className?: string;
}

const heightClass: Record<NonNullable<ChartContainerProps["size"]>, string> = {
  sm: "h-52 sm:h-56 md:h-60",
  md: "h-56 sm:h-64 md:h-72",
  lg: "h-64 sm:h-72 md:h-80",
  square: "aspect-square w-full max-w-[min(100%,280px)] sm:max-w-xs",
  /** Donut / pie — lebih rendah, tidak memenuhi kartu */
  /** Cukup tinggi agar 6+ item legend tidak wrap ke kolom kedua */
  pie: "mx-auto h-52 w-full max-w-[min(100%,340px)] sm:h-56",
};

export function ChartContainer({
  children,
  size = "md",
  className = "",
}: ChartContainerProps) {
  const isCompact = size === "square" || size === "pie";

  return (
    <div
      className={`chart-canvas-wrap relative min-w-0 ${
        isCompact ? heightClass[size] : `w-full ${heightClass[size]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

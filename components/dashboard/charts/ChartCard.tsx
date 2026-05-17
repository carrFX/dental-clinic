"use client";

interface ChartCardProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  footer,
  className = "",
}: ChartCardProps) {
  return (
    <div
      className={`min-w-0 rounded-2xl surface-card p-4 shadow-sm ring-1 ring-[var(--border)] sm:p-5 ${className}`}
    >
      <h3 className="text-base font-semibold text-[var(--foreground)] sm:text-lg">
        {title}
      </h3>
      {subtitle}
      <div className="mt-2 sm:mt-3">{children}</div>
      {footer}
    </div>
  );
}

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: "blue" | "green" | "orange" | "purple";
}

const colors = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
}: StatCardProps) {
  return (
    <div className="min-w-0 rounded-2xl surface-card p-4 shadow-sm ring-1 ring-[var(--border)] hover-lift sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-[var(--muted)]">{title}</p>
          <p className="mt-1 break-words text-xl font-bold leading-tight text-[var(--foreground)] sm:text-2xl">
            {value}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--muted)]">{subtitle}</p>
          )}
          {trend && (
            <p className="mt-1 text-xs font-medium text-[var(--success)]">{trend}</p>
          )}
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${colors[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

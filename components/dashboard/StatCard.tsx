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
    <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)] hover-lift">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">{title}</p>
          <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-[var(--muted)]">{subtitle}</p>
          )}
          {trend && (
            <p className="mt-1 text-xs font-medium text-[var(--success)]">{trend}</p>
          )}
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

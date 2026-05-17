"use client";

import dynamic from "next/dynamic";

const DashboardCharts = dynamic(
  () =>
    import("@/components/dashboard/charts/DashboardCharts").then(
      (m) => m.DashboardCharts
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[280px] place-items-center rounded-2xl surface-card ring-1 ring-[var(--border)]">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]"
          aria-hidden
        />
      </div>
    ),
  }
);

export function DashboardChartsLazy() {
  return <DashboardCharts />;
}

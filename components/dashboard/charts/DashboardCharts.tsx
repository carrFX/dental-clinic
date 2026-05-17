"use client";

import { useMemo } from "react";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import "./chart-setup";
import { chartColors } from "./chart-setup";
import { ChartCard } from "./ChartCard";
import { ChartContainer } from "./ChartContainer";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { canViewRevenueCharts } from "@/lib/sidebar-access";
import { formatCurrency } from "@/lib/utils";
import {
  aggregateRevenueByMonth,
  aggregateNewPatientsByMonth,
  aggregateAppointmentStatus,
  aggregateTreatmentCategories,
} from "@/lib/chart-analytics";
import {
  lineChartOptions,
  barCurrencyOptions,
  doughnutOptions,
  pieChartOptions,
  barDatasetLayout,
} from "@/lib/chart-options";

const barColors = [
  chartColors.primaryLight,
  chartColors.primary,
  chartColors.primaryDark,
  chartColors.teal,
  chartColors.success,
  chartColors.purple,
  chartColors.warning,
  chartColors.danger,
];

export function DashboardCharts() {
  const { data } = useData();
  const { user } = useAuth();
  const { t } = useLocale();
  const { compact, ready } = useBreakpoint();
  const showRevenue = user ? canViewRevenueCharts(user.role) : false;

  const barLayout = barDatasetLayout(compact);

  const patientGrowth = useMemo(() => {
    const { labels, data: counts } = aggregateNewPatientsByMonth(data.patients);
    return {
      labels,
      datasets: [
        {
          label: t("chart.newPatients"),
          data: counts,
          borderColor: chartColors.primary,
          backgroundColor: `${chartColors.primary}40`,
          fill: true,
          tension: 0.35,
          pointRadius: compact ? 3 : 5,
          pointHoverRadius: compact ? 5 : 7,
        },
      ],
    };
  }, [data.patients, t, compact]);

  const revenueAgg = useMemo(
    () => aggregateRevenueByMonth(data.invoices),
    [data.invoices]
  );

  const revenueData = useMemo(
    () => ({
      labels: revenueAgg.labels,
      datasets: [
        {
          label: t("chart.revenue"),
          data: revenueAgg.data,
          backgroundColor: revenueAgg.labels.map(
            (_, i) => barColors[i % barColors.length]
          ),
          borderRadius: compact ? 6 : 8,
          borderSkipped: false,
          ...barLayout,
        },
      ],
    }),
    [revenueAgg, t, compact, barLayout]
  );

  const appointmentStatus = useMemo(() => {
    const { labels, data: counts } = aggregateAppointmentStatus(data.appointments);
    return {
      labels,
      datasets: [
        {
          label: t("chart.appointments"),
          data: counts,
          backgroundColor: [
            chartColors.warning,
            chartColors.primary,
            chartColors.success,
            chartColors.danger,
          ],
          borderWidth: 0,
          hoverOffset: compact ? 6 : 8,
        },
      ],
    };
  }, [data.appointments, t, compact]);

  const treatmentDist = useMemo(() => {
    const { labels, data: counts } = aggregateTreatmentCategories(data);
    return {
      labels,
      datasets: [
        {
          label: t("chart.treatments"),
          data: counts,
          backgroundColor: barColors.slice(0, labels.length),
          borderWidth: 0,
          hoverOffset: compact ? 6 : 8,
        },
      ],
    };
  }, [data, t, compact]);

  const totalRevenue = data.invoices.reduce((s, i) => s + i.paid, 0);

  if (!ready) {
    return (
      <div className="grid min-h-[280px] place-items-center rounded-2xl surface-card ring-1 ring-[var(--border)]">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div
        className={`grid grid-cols-1 gap-4 min-w-0 sm:gap-6 ${showRevenue ? "lg:grid-cols-2" : ""}`}
      >
        <ChartCard title={t("chart.patientGrowth")}>
          <ChartContainer size="md">
            <Line data={patientGrowth} options={lineChartOptions(compact)} />
          </ChartContainer>
        </ChartCard>

        {showRevenue && (
          <ChartCard
            title={t("chart.monthlyRevenue")}
            subtitle={
              <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
                {t("chart.totalCollected")}: {formatCurrency(totalRevenue)}
              </p>
            }
            footer={
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3 sm:flex sm:flex-wrap sm:gap-x-3 sm:gap-y-2">
                {revenueAgg.labels.map((month, i) => (
                  <span
                    key={month}
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: barColors[i % barColors.length] }}
                    />
                    {month}
                  </span>
                ))}
              </div>
            }
          >
            <ChartContainer size="sm">
              <Bar data={revenueData} options={barCurrencyOptions(compact)} />
            </ChartContainer>
          </ChartCard>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 min-w-0 sm:gap-6 md:grid-cols-2">
        <ChartCard title={t("chart.appointmentStatus")} className="!p-3 sm:!p-4">
          <ChartContainer size="pie">
            <Doughnut
              data={appointmentStatus}
              options={doughnutOptions((v) => `${v}`, compact)}
            />
          </ChartContainer>
        </ChartCard>

        <ChartCard title={t("chart.treatmentCategory")} className="!p-3 sm:!p-4">
          <ChartContainer size="pie">
            <Pie
              data={treatmentDist}
              options={pieChartOptions((v) => `${v}`, compact)}
            />
          </ChartContainer>
        </ChartCard>
      </div>
    </div>
  );
}

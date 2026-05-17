"use client";

import { useMemo } from "react";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import "./chart-setup";
import { chartColors } from "./chart-setup";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
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
  const showRevenue = user ? canViewRevenueCharts(user.role) : false;

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
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }, [data.patients, t]);

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
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    }),
    [revenueAgg, t]
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
          hoverOffset: 8,
        },
      ],
    };
  }, [data.appointments, t]);

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
          hoverOffset: 8,
        },
      ],
    };
  }, [data, t]);

  const totalRevenue = data.invoices.reduce((s, i) => s + i.paid, 0);

  return (
    <div className="space-y-6">
      <div className={`grid gap-6 ${showRevenue ? "lg:grid-cols-2" : ""}`}>
        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold text-[var(--foreground)]">
            {t("chart.patientGrowth")}
          </h3>
          <div className="h-64">
            <Line data={patientGrowth} options={lineChartOptions()} />
          </div>
        </div>

        {showRevenue && (
        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-1 font-semibold text-[var(--foreground)]">
            {t("chart.monthlyRevenue")}
          </h3>
          <p className="mb-3 text-xs text-[var(--muted)]">
            {t("chart.totalCollected")}: {formatCurrency(totalRevenue)}
          </p>
          <div className="h-56">
            <Bar data={revenueData} options={barCurrencyOptions()} />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 border-t border-[var(--border)] pt-3">
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
        </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold text-[var(--foreground)]">
            {t("chart.appointmentStatus")}
          </h3>
          <div className="mx-auto h-64 max-w-xs">
            <Doughnut
              data={appointmentStatus}
              options={doughnutOptions((v) => `${v}`)}
            />
          </div>
        </div>

        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold text-[var(--foreground)]">
            {t("chart.treatmentCategory")}
          </h3>
          <div className="mx-auto h-64 max-w-xs">
            <Pie data={treatmentDist} options={pieChartOptions((v) => `${v}`)} />
          </div>
        </div>
      </div>
    </div>
  );
}

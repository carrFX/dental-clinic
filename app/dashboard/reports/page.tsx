"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import "@/components/dashboard/charts/chart-setup";
import { chartColors } from "@/components/dashboard/charts/chart-setup";
import { ChartCard } from "@/components/dashboard/charts/ChartCard";
import { ChartContainer } from "@/components/dashboard/charts/ChartContainer";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { formatCurrency } from "@/lib/utils";
import { aggregateRevenueByTreatment } from "@/lib/chart-analytics";
import {
  barHorizontalCurrencyOptions,
  barCountOptions,
  barDatasetLayout,
} from "@/lib/chart-options";

export default function ReportsPage() {
  const { data } = useData();
  const { t } = useLocale();
  const { compact, ready } = useBreakpoint();

  const treatmentRevenue = aggregateRevenueByTreatment(data);
  const barLayout = barDatasetLayout(compact);

  const revenueByTreatment = useMemo(
    () => ({
      labels: treatmentRevenue.labels,
      datasets: [
        {
          label: t("reports.chart.revenueService"),
          data: treatmentRevenue.data,
          backgroundColor: chartColors.primary,
          borderRadius: compact ? 4 : 6,
          ...barLayout,
        },
      ],
    }),
    [treatmentRevenue, t, compact, barLayout]
  );

  const patientByGender = useMemo(
    () => ({
      labels: [t("form.genderMale"), t("form.genderFemale")],
      datasets: [
        {
          label: t("reports.chart.patientGender"),
          data: [
            data.patients.filter((p) => p.gender === "Laki-laki").length,
            data.patients.filter((p) => p.gender === "Perempuan").length,
          ],
          backgroundColor: [chartColors.primary, chartColors.purple],
          borderRadius: compact ? 4 : 6,
          ...barLayout,
        },
      ],
    }),
    [data.patients, t, compact, barLayout]
  );

  const totalRevenue = data.invoices.reduce((s, i) => s + i.paid, 0);
  const unpaid = data.invoices
    .filter((i) => i.status !== "Lunas")
    .reduce((s, i) => s + (i.amount - i.paid), 0);

  return (
    <DashboardShell title={t("reports.title")} subtitle={t("reports.subtitle")}>
      <div className="min-w-0 space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 min-w-0 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: t("reports.totalPatients"), value: data.patients.length },
            { label: t("reports.totalRevenue"), value: formatCurrency(totalRevenue) },
            { label: t("reports.receivable"), value: formatCurrency(unpaid) },
          ].map((s) => (
            <div
              key={s.label}
              className="min-w-0 rounded-2xl surface-card p-4 shadow-sm ring-1 ring-[var(--border)] sm:p-5"
            >
              <p className="text-sm text-[var(--muted)]">{s.label}</p>
              <p className="mt-1 break-words text-xl font-bold text-[var(--primary-dark)] sm:text-2xl">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {ready && (
          <div className="grid grid-cols-1 gap-4 min-w-0 sm:gap-6 lg:grid-cols-2">
            <ChartCard title={t("reports.revenueByService")}>
              <ChartContainer size="lg">
                <Bar
                  data={revenueByTreatment}
                  options={barHorizontalCurrencyOptions(compact)}
                />
              </ChartContainer>
            </ChartCard>
            <ChartCard title={t("reports.patientsByGender")}>
              <ChartContainer size="md">
                <Bar data={patientByGender} options={barCountOptions(compact)} />
              </ChartContainer>
            </ChartCard>
          </div>
        )}

        <div className="min-w-0 rounded-2xl surface-card p-4 shadow-sm ring-1 ring-[var(--border)] sm:p-5">
          <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
            {t("reports.inventorySummary")}
          </h3>
          <ul className="space-y-2 text-sm">
            {data.inventory.map((i) => (
              <li
                key={i.id}
                className="flex flex-col gap-1 border-b border-[var(--border)]/50 py-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium">{i.name}</span>
                <span
                  className={
                    i.quantity <= i.minStock
                      ? "font-medium text-[var(--danger)]"
                      : "text-[var(--muted)]"
                  }
                >
                  {i.quantity} {i.unit}
                  {i.quantity <= i.minStock && ` ⚠ ${t("reports.lowStockWarn")}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}

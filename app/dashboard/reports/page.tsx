"use client";

import { Bar } from "react-chartjs-2";
import "@/components/dashboard/charts/chart-setup";
import { chartColors } from "@/components/dashboard/charts/chart-setup";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { formatCurrency } from "@/lib/utils";
import { aggregateRevenueByTreatment } from "@/lib/chart-analytics";
import { barHorizontalCurrencyOptions, barCountOptions } from "@/lib/chart-options";

export default function ReportsPage() {
  const { data } = useData();
  const { t } = useLocale();

  const treatmentRevenue = aggregateRevenueByTreatment(data);

  const revenueByTreatment = {
    labels: treatmentRevenue.labels,
    datasets: [
      {
        label: t("reports.chart.revenueService"),
        data: treatmentRevenue.data,
        backgroundColor: chartColors.primary,
        borderRadius: 6,
      },
    ],
  };

  const patientByGender = {
    labels: [t("form.genderMale"), t("form.genderFemale")],
    datasets: [
      {
        label: t("reports.chart.patientGender"),
        data: [
          data.patients.filter((p) => p.gender === "Laki-laki").length,
          data.patients.filter((p) => p.gender === "Perempuan").length,
        ],
        backgroundColor: [chartColors.primary, chartColors.purple],
        borderRadius: 6,
      },
    ],
  };

  const totalRevenue = data.invoices.reduce((s, i) => s + i.paid, 0);
  const unpaid = data.invoices
    .filter((i) => i.status !== "Lunas")
    .reduce((s, i) => s + (i.amount - i.paid), 0);

  return (
    <DashboardShell title={t("reports.title")} subtitle={t("reports.subtitle")}>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: t("reports.totalPatients"), value: data.patients.length },
          { label: t("reports.totalRevenue"), value: formatCurrency(totalRevenue) },
          { label: t("reports.receivable"), value: formatCurrency(unpaid) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]"
          >
            <p className="text-sm text-[var(--muted)]">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-[var(--primary-dark)]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold">{t("reports.revenueByService")}</h3>
          <div className="h-72">
            <Bar data={revenueByTreatment} options={barHorizontalCurrencyOptions()} />
          </div>
        </div>
        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold">{t("reports.patientsByGender")}</h3>
          <div className="h-72">
            <Bar data={patientByGender} options={barCountOptions()} />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
        <h3 className="mb-4 font-semibold">{t("reports.inventorySummary")}</h3>
        <ul className="space-y-2 text-sm">
          {data.inventory.map((i) => (
            <li key={i.id} className="flex justify-between border-b border-[var(--border)]/50 py-2">
              <span>{i.name}</span>
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
    </DashboardShell>
  );
}

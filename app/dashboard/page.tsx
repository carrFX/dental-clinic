"use client";

import {
  Users,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardChartsLazy } from "@/components/dashboard/charts/DashboardChartsLazy";
import { PatientFlowchart } from "@/components/dashboard/PatientFlowchart";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import {
  canViewFinance,
  canViewInventory,
} from "@/lib/sidebar-access";
import { appointmentStatusKey } from "@/lib/i18n/status-label";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { data } = useData();
  const { user } = useAuth();
  const { t } = useLocale();

  const role = user?.role ?? "dokter";
  const showFinance = canViewFinance(role);
  const showInventory = canViewInventory(role);

  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = data.appointments.filter((a) => a.date === today);
  const totalRevenue = data.invoices.reduce((s, i) => s + i.paid, 0);
  const pendingInvoices = data.invoices.filter(
    (i) => i.status !== "Lunas"
  ).length;
  const lowStock = data.inventory.filter((i) => i.quantity <= i.minStock).length;
  const completedToday = todayAppointments.filter((a) => a.status === "Selesai").length;

  return (
    <DashboardShell
      title={t("dashboard.title")}
      subtitle={t("dashboard.subtitle")}
    >
      <div className="space-y-6">
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            showFinance && showInventory
              ? "xl:grid-cols-4"
              : showFinance || showInventory
                ? "xl:grid-cols-3"
                : "xl:grid-cols-2"
          }`}
        >
          <StatCard
            title={t("dashboard.totalPatients")}
            value={data.patients.length}
            subtitle={t("dashboard.registered")}
            icon={Users}
            trend={showFinance ? t("dashboard.trend") : undefined}
            color="blue"
          />
          <StatCard
            title={t("dashboard.todayAppointments")}
            value={todayAppointments.length}
            subtitle={t("dashboard.completed", { count: completedToday })}
            icon={Calendar}
            color="green"
          />
          {showFinance && (
            <StatCard
              title={t("dashboard.revenue")}
              value={formatCurrency(totalRevenue)}
              subtitle={t("dashboard.pendingInvoices", { count: pendingInvoices })}
              icon={DollarSign}
              color="orange"
            />
          )}
          {showInventory && (
            <StatCard
              title={t("dashboard.lowStock")}
              value={lowStock}
              subtitle={t("dashboard.needRestock")}
              icon={Activity}
              color="purple"
            />
          )}
        </div>

        <PatientFlowchart />

        <DashboardChartsLazy />

        <div className="rounded-2xl surface-card p-5 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold">{t("dashboard.recentAppointments")}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                  <th className="pb-2 pr-4">{t("dashboard.col.patient")}</th>
                  <th className="pb-2 pr-4">{t("dashboard.col.doctor")}</th>
                  <th className="pb-2 pr-4">{t("dashboard.col.date")}</th>
                  <th className="pb-2">{t("dashboard.col.status")}</th>
                </tr>
              </thead>
              <tbody>
                {data.appointments.slice(0, 5).map((a) => (
                  <tr key={a.id} className="border-b border-[var(--border)]/50">
                    <td className="py-3 pr-4 font-medium">{a.patientName}</td>
                    <td className="py-3 pr-4 text-[var(--muted)]">{a.doctorName}</td>
                    <td className="py-3 pr-4 text-[var(--muted)]">
                      {a.date} {a.time}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          a.status === "Selesai"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : a.status === "Diproses"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                              : a.status === "Dibatalkan"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                        }`}
                      >
                        {t(appointmentStatusKey(a.status))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

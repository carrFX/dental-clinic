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
import { StatusBadge } from "@/components/dashboard/StatusBadge";
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
      <div className="min-w-0 space-y-4 sm:space-y-6">
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

        <div className="min-w-0 rounded-2xl surface-card p-4 shadow-sm ring-1 ring-[var(--border)] sm:p-5">
          <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
            {t("dashboard.recentAppointments")}
          </h3>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="w-full min-w-[480px] text-sm sm:min-w-[520px]">
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
                      <StatusBadge status={a.status} type="appointment" />
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

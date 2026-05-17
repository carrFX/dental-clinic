"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import type { UserRole } from "@/lib/auth-users";
import type { TranslationKey } from "@/lib/i18n/types";
import { RotateCcw, Database, Palette } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const roleKeys: Record<UserRole, TranslationKey> = {
  admin: "common.role.admin",
  dokter: "common.role.dokter",
  superadmin: "common.role.superadmin",
};

export default function SettingsPage() {
  const { resetData, data } = useData();
  const { user } = useAuth();
  const { t } = useLocale();
  const { confirm } = useConfirm();

  return (
    <DashboardShell title={t("sidebar.settings")} subtitle={t("dashboard.subtitle")}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl surface-card p-6 shadow-sm ring-1 ring-[var(--border)]">
          <div className="mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="font-semibold">{t("settings.themeTitle")}</h3>
          </div>
          <p className="mb-4 text-sm text-[var(--muted)]">{t("settings.themeDesc")}</p>
          <ThemeToggle />
        </div>

        <div className="rounded-2xl surface-card p-6 shadow-sm ring-1 ring-[var(--border)]">
          <h3 className="mb-4 font-semibold">{t("settings.profileTitle")}</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--muted)]">{t("auth.email")}</dt>
              <dd className="font-medium">{user?.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--muted)]">{t("common.roleLabel")}</dt>
              <dd className="font-medium">{user ? t(roleKeys[user.role]) : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--muted)]">{t("common.displayName")}</dt>
              <dd className="font-medium">{user?.displayName}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl surface-card p-6 shadow-sm ring-1 ring-[var(--border)]">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="font-semibold">{t("settings.dataTitle")}</h3>
          </div>
          <p className="mb-4 text-sm text-[var(--muted)]">{t("settings.dataDesc")}</p>
          <ul className="mb-6 space-y-1 text-sm text-[var(--muted)]">
            <li>{t("settings.countPatients", { count: data.patients.length })}</li>
            <li>{t("settings.countAppointments", { count: data.appointments.length })}</li>
            <li>{t("settings.countTreatments", { count: data.treatments.length })}</li>
            <li>{t("settings.countDoctors", { count: data.doctors.length })}</li>
            <li>{t("settings.countInventory", { count: data.inventory.length })}</li>
            <li>{t("settings.countInvoices", { count: data.invoices.length })}</li>
          </ul>
          <button
            type="button"
            onClick={() =>
              confirm({
                title: t("confirm.title.reset"),
                message: t("confirm.reset.data"),
                confirmLabel: t("confirm.btn.confirm"),
                variant: "danger",
                onConfirm: resetData,
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--danger)] px-4 py-2 text-sm font-semibold text-[var(--danger)] transition hover:bg-[color-mix(in_srgb,var(--danger)_12%,transparent)]"
          >
            <RotateCcw className="h-4 w-4" />
            {t("settings.resetBtn")}
          </button>
        </div>

        <div className="rounded-2xl bg-[var(--accent)] p-6 text-sm text-[var(--muted)]">
          <p className="font-semibold text-[var(--primary-dark)]">{t("settings.versionTitle")}</p>
          <p className="mt-2">{t("settings.versionDesc")}</p>
        </div>
      </div>
    </DashboardShell>
  );
}

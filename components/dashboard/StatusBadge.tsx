"use client";

import { appointmentStatusKey, invoiceStatusKey } from "@/lib/i18n/status-label";
import { useLocale } from "@/contexts/LocaleContext";

const appointmentStyles: Record<string, string> = {
  Menunggu:
    "bg-amber-700 text-white ring-amber-300/70",
  Diproses:
    "bg-sky-700 text-white ring-sky-300/70",
  Selesai:
    "bg-emerald-700 text-white ring-emerald-300/70",
  Dibatalkan:
    "bg-rose-700 text-white ring-rose-300/70",
};

const invoiceStyles: Record<string, string> = {
  Lunas:
    "bg-emerald-700 text-white ring-emerald-300/70",
  Sebagian:
    "bg-amber-700 text-white ring-amber-300/70",
  "Belum Bayar":
    "bg-rose-700 text-white ring-rose-300/70",
};

interface StatusBadgeProps {
  status: string;
  type: "appointment" | "invoice";
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const { t } = useLocale();
  const styles = type === "invoice" ? invoiceStyles : appointmentStyles;
  const labelKey =
    type === "invoice" ? invoiceStatusKey(status) : appointmentStatusKey(status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
        styles[status] ??
        "bg-[var(--accent)] text-[var(--foreground)] ring-[var(--border)]"
      }`}
    >
      {t(labelKey)}
    </span>
  );
}

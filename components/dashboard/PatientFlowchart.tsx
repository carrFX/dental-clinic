"use client";

import {
  UserPlus,
  ClipboardList,
  Stethoscope,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/types";

const stepConfig: {
  icon: typeof UserPlus;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
}[] = [
  {
    icon: UserPlus,
    titleKey: "flow.step1.title",
    descKey: "flow.step1.desc",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: ClipboardList,
    titleKey: "flow.step2.title",
    descKey: "flow.step2.desc",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Stethoscope,
    titleKey: "flow.step3.title",
    descKey: "flow.step3.desc",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: CreditCard,
    titleKey: "flow.step4.title",
    descKey: "flow.step4.desc",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: CheckCircle2,
    titleKey: "flow.step5.title",
    descKey: "flow.step5.desc",
    color: "bg-green-100 text-green-600",
  },
];

export function PatientFlowchart() {
  const { t } = useLocale();

  return (
    <div className="rounded-2xl surface-card p-6 shadow-sm ring-1 ring-[var(--border)]">
      <h3 className="mb-2 font-semibold text-[var(--foreground)]">{t("flow.title")}</h3>
      <p className="mb-6 text-sm text-[var(--muted)]">{t("flow.subtitle")}</p>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
        {stepConfig.map((step, i) => (
          <div
            key={step.titleKey}
            className={`relative flex flex-1 flex-col items-center text-center ${
              i < stepConfig.length - 1 ? "flow-arrow md:pr-6" : ""
            }`}
          >
            <div
              className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${step.color} shadow-sm transition-transform hover:scale-110`}
            >
              <step.icon className="h-7 w-7" />
            </div>
            <h4 className="font-semibold text-[var(--foreground)]">{t(step.titleKey)}</h4>
            <p className="mt-1 max-w-[140px] text-xs text-[var(--muted)]">{t(step.descKey)}</p>
            {i < stepConfig.length - 1 && (
              <span className="mt-2 text-[var(--primary)] md:hidden">↓</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-[var(--accent)] p-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--muted)]">
          <span className="rounded-full surface-card px-3 py-1 font-medium text-[var(--primary)]">
            {t("flow.footer.erp")}
          </span>
          <span>→</span>
          <span>{t("flow.footer.dashboard")}</span>
          <span>→</span>
          <span>{t("flow.footer.analytics")}</span>
        </div>
      </div>
    </div>
  );
}

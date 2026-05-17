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
    <div className="min-w-0 rounded-2xl surface-card p-4 shadow-sm ring-1 ring-[var(--border)] sm:p-6">
      <h3 className="mb-2 text-base font-semibold text-[var(--foreground)] sm:text-lg">
        {t("flow.title")}
      </h3>
      <p className="mb-4 text-sm text-[var(--muted)] sm:mb-6">{t("flow.subtitle")}</p>

      <ol className="flex list-none flex-col gap-4 p-0 md:flex-row md:items-center md:justify-between md:gap-2">
        {stepConfig.map((step, i) => (
          <li
            key={step.titleKey}
            className={`flex items-start gap-4 md:flex-1 md:flex-col md:items-center md:text-center ${
              i < stepConfig.length - 1 ? "flow-arrow md:pr-6" : ""
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm md:mb-3 md:h-14 md:w-14 ${step.color}`}
            >
              <step.icon className="h-6 w-6 md:h-7 md:w-7" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5 md:flex-none md:pt-0">
              <h4 className="font-semibold text-[var(--foreground)]">{t(step.titleKey)}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)] md:max-w-[140px]">
                {t(step.descKey)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl bg-[var(--accent)] p-3 sm:mt-8 sm:p-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--muted)]">
          <span className="rounded-full surface-card px-3 py-1 font-medium text-[var(--primary)]">
            {t("flow.footer.erp")}
          </span>
          <span className="hidden md:inline">→</span>
          <span>{t("flow.footer.dashboard")}</span>
          <span className="hidden md:inline">→</span>
          <span>{t("flow.footer.analytics")}</span>
        </div>
      </div>
    </div>
  );
}

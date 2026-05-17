"use client";

import {
  Sparkles,
  Shield,
  Stethoscope,
  Smile,
  Scissors,
  Activity,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/types";

const serviceConfig: {
  icon: typeof Stethoscope;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  {
    icon: Stethoscope,
    titleKey: "landing.services.s1.title",
    descKey: "landing.services.s1.desc",
  },
  {
    icon: Sparkles,
    titleKey: "landing.services.s2.title",
    descKey: "landing.services.s2.desc",
  },
  {
    icon: Shield,
    titleKey: "landing.services.s3.title",
    descKey: "landing.services.s3.desc",
  },
  {
    icon: Smile,
    titleKey: "landing.services.s4.title",
    descKey: "landing.services.s4.desc",
  },
  {
    icon: Scissors,
    titleKey: "landing.services.s5.title",
    descKey: "landing.services.s5.desc",
  },
  {
    icon: Activity,
    titleKey: "landing.services.s6.title",
    descKey: "landing.services.s6.desc",
  },
];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="layanan" className="py-20 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            {t("landing.services.label")}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            {t("landing.services.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            {t("landing.services.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceConfig.map(({ icon: Icon, titleKey, descKey }) => (
            <article
              key={titleKey}
              className="group rounded-2xl surface-card p-6 shadow-sm ring-1 ring-[var(--border)] transition hover-lift hover:ring-[var(--primary)]/30"
            >
              <div className="service-icon-wrap mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary-dark)]">
                {t(titleKey)}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{t(descKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

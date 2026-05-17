"use client";

import Image from "next/image";
import { Award, Heart, Users } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { images } from "@/lib/images";

export function About() {
  const { t } = useLocale();

  const stats = [
    { icon: Users, value: "15,000+", labelKey: "landing.about.stat1" as const },
    { icon: Award, value: "15+", labelKey: "landing.about.stat2" as const },
    { icon: Heart, value: "98%", labelKey: "landing.about.stat3" as const },
  ];

  return (
    <section id="tentang" className="py-20 bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-square max-w-md overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={images.aboutTeam}
                alt="Arcade Dental team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-48 w-48 overflow-hidden rounded-2xl border-4 border-[var(--card)] shadow-lg sm:block">
              <Image
                src={images.dentalClinic}
                alt="Modern dental equipment"
                fill
                className="object-cover"
                sizes="200px"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t("landing.about.label")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
              {t("landing.about.title")}
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">{t("landing.about.p1")}</p>
            <p className="text-[var(--muted)] leading-relaxed">{t("landing.about.p2")}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map(({ icon: Icon, value, labelKey }) => (
                <div
                  key={labelKey}
                  className="rounded-2xl bg-[var(--accent)] p-4 text-center hover-lift"
                >
                  <Icon className="mx-auto mb-2 h-6 w-6 text-[var(--primary)]" />
                  <p className="text-xl font-bold text-[var(--primary-dark)]">{value}</p>
                  <p className="text-xs text-[var(--muted)]">{t(labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section id="tentang" className="bg-[var(--card)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-5 lg:mx-0 lg:block lg:max-w-none">
            <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl shadow-xl sm:max-w-md">
              <Image
                src={images.aboutTeam}
                alt="Arcade Dental team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[4/3] w-48 overflow-hidden rounded-2xl border-4 border-[var(--card)] shadow-lg sm:w-56 lg:absolute lg:-bottom-6 lg:-right-6 lg:w-48">
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

          <div className="space-y-6 text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t("landing.about.label")}
            </span>
            <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
              {t("landing.about.title")}
            </h2>
            <p className="leading-relaxed text-[var(--muted)]">{t("landing.about.p1")}</p>
            <p className="leading-relaxed text-[var(--muted)]">{t("landing.about.p2")}</p>
            <div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4 sm:pt-4">
              {stats.map(({ icon: Icon, value, labelKey }) => (
                <div
                  key={labelKey}
                  className="rounded-2xl bg-[var(--accent)] p-3 text-center hover-lift sm:p-4"
                >
                  <Icon className="mx-auto mb-2 h-6 w-6 text-[var(--primary)]" />
                  <p className="text-lg font-bold text-[var(--primary-dark)] sm:text-xl">
                    {value}
                  </p>
                  <p className="text-[10px] text-[var(--muted)] sm:text-xs">{t(labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { images } from "@/lib/images";

export function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="beranda"
      className="relative min-h-screen gradient-hero pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[var(--primary-light)]/30 blur-3xl" />
      <div className="absolute bottom-10 -left-20 h-64 w-64 rounded-full bg-[var(--primary)]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-12">
        <div className="animate-fade-in-up space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--glass)] px-4 py-1.5 text-sm font-medium text-[var(--primary-dark)] shadow-sm">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            {t("landing.hero.badge")}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {t("landing.hero.title")}{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
              Arcade Dental
            </span>
          </h1>
          <p className="max-w-lg text-lg text-[var(--muted)] leading-relaxed">
            {t("landing.hero.description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {t("landing.hero.ctaDashboard")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)] bg-[var(--glass)] px-7 py-3.5 font-semibold text-[var(--primary-dark)] transition-all hover:bg-[var(--card)] hover:shadow-md"
            >
              {t("landing.hero.ctaServices")}
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[var(--success)]" />
              <span className="text-sm text-[var(--muted)]">
                {t("landing.hero.accredited")}
              </span>
            </div>
            <div className="h-8 w-px bg-[var(--border)]" />
            <div>
              <p className="text-2xl font-bold text-[var(--primary-dark)]">15K+</p>
              <p className="text-xs text-[var(--muted)]">{t("landing.hero.happyPatients")}</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in-up lg:pl-8" style={{ animationDelay: "0.2s" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/50">
            <Image
              src={images.dentalHero}
              alt="Interior klinik gigi modern Arcade Dental Jakarta — perawatan gigi premium"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-float rounded-2xl glass-card p-4 shadow-xl sm:-left-8">
            <p className="text-3xl font-bold text-[var(--primary)]">98%</p>
            <p className="text-sm text-[var(--muted)]">{t("landing.hero.satisfaction")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

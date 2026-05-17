"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SmilePlus, LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_USERS } from "@/lib/auth-users";
import type { LoginErrorCode, UserRole } from "@/lib/auth-users";
import type { TranslationKey } from "@/lib/i18n/types";
import { images } from "@/lib/images";
import { ThemeToggle } from "@/components/ThemeToggle";

const roleAccessKeys: Record<UserRole, TranslationKey> = {
  superadmin: "auth.roleAccess.superadmin",
  admin: "auth.roleAccess.admin",
  dokter: "auth.roleAccess.dokter",
};

const errorKeys: Record<LoginErrorCode, TranslationKey> = {
  empty: "auth.error.empty",
  invalid_email: "auth.error.invalid_email",
  invalid_credentials: "auth.error.invalid_credentials",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, isLoading } = useAuth();
  const { t } = useLocale();
  const { showError } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard");
  }, [user, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      showError(t(errorKeys[result.code]));
    }
  };

  if (!isLoading && user) return null;

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative gradient-hero items-center justify-center p-12">
        <div className="relative z-10 max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white shadow-lg">
              <SmilePlus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary-dark)]">
                Arcade Dental
              </h1>
              <p className="text-sm text-[var(--muted)]">ERP Klinik Gigi</p>
            </div>
          </div>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            {t("dashboard.subtitle")}
          </p>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={images.dentalHero}
              alt="Dental clinic"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center bg-[var(--card)] px-4 py-12 sm:px-8">
        <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
          <ThemeToggle compact />
        </div>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("common.backHome")}
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white">
              <SmilePlus className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-[var(--primary-dark)]">
              Arcade Dental ERP
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            {t("auth.welcome")}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{t("auth.subtitle")}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium">{t("auth.email")}</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@arcadedental.com"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                {t("auth.password")}
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-[1.02]"
            >
              <LogIn className="h-4 w-4" />
              {t("auth.submit")}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {t("auth.demoAccounts")}
            </p>
            <ul className="space-y-2 text-xs text-[var(--muted)]">
              {MOCK_USERS.map((u) => (
                <li key={u.email} className="space-y-1 border-b border-[var(--border)]/60 pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span className="font-medium text-[var(--foreground)]">{u.email}</span>
                    <span>·</span>
                    <span>{u.password}</span>
                    <span className="rounded bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[var(--primary)]">
                      {u.role}
                    </span>
                  </div>
                  <p className="text-[11px] leading-snug text-[var(--muted)]">
                    {t(roleAccessKeys[u.role])}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

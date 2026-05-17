"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, SmilePlus, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { ProfileMenu } from "@/components/ProfileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { UserRole } from "@/lib/auth-users";
import type { TranslationKey } from "@/lib/i18n/types";

const roleKeys: Record<UserRole, TranslationKey> = {
  admin: "common.role.admin",
  dokter: "common.role.dokter",
  superadmin: "common.role.superadmin",
};

const linkKeys: { href: string; labelKey: TranslationKey }[] = [
  { href: "#beranda", labelKey: "nav.beranda" },
  { href: "#tentang", labelKey: "nav.tentang" },
  { href: "#layanan", labelKey: "nav.layanan" },
  { href: "#tim", labelKey: "nav.tim" },
  { href: "#kontak", labelKey: "nav.kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="group flex min-w-0 shrink items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-primary text-white shadow-md transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
            <SmilePlus className="h-5 w-5" />
          </div>
          <span className="whitespace-nowrap text-base font-bold text-[var(--primary-dark)] sm:text-lg">
            Arcade <span className="text-[var(--primary)]">Dental</span>
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {linkKeys.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
            >
              {t(l.labelKey)}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-[var(--border)] pl-4">
            <LanguageToggle />
            <ThemeToggle compact />
            <ProfileMenu showDashboardLink />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle compact />
          <button
            type="button"
            className="rounded-lg p-2 text-[var(--primary)]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] px-4 py-4 md:hidden animate-fade-in-up">
          {linkKeys.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)]"
            >
              {t(l.labelKey)}
            </a>
          ))}
          {!isLoading && (
            <div className="mt-4 space-y-2 border-t border-[var(--border)] pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-1 py-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
                      {(user.displayName ?? "S")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                        {user.displayName}
                      </p>
                      <p className="truncate text-xs text-[var(--muted)]">
                        {t(roleKeys[user.role])}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent)]"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[var(--primary)]" />
                    {t("sidebar.dashboard")} ERP
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium text-[var(--danger)] transition hover:bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("common.logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-full gradient-primary px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md"
                  >
                    {t("nav.masukErp")}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

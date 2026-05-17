"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { UserRole } from "@/lib/auth-users";
import type { TranslationKey } from "@/lib/i18n/types";

const roleKeys: Record<UserRole, TranslationKey> = {
  admin: "common.role.admin",
  dokter: "common.role.dokter",
  superadmin: "common.role.superadmin",
};

interface ProfileMenuProps {
  showDashboardLink?: boolean;
}

export function ProfileMenu({ showDashboardLink = false }: ProfileMenuProps) {
  const { user, logout, isLoading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  if (isLoading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105 sm:px-5"
      >
        {t("nav.masukErp")}
      </Link>
    );
  }

  const initial = (user.displayName ?? "S")[0].toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] py-1.5 pl-1.5 pr-2.5 shadow-sm transition hover:border-[var(--primary)] hover:shadow-md sm:pr-3"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Profile menu"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
          {initial}
        </div>
        <span className="hidden max-w-[100px] truncate text-sm font-medium text-[var(--foreground)] sm:inline">
          {user.displayName}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right animate-fade-in-down rounded-2xl border border-[var(--border)] bg-[var(--card)] py-2 shadow-xl"
        >
          <div className="border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
                {initial}
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
          </div>

          {showDashboardLink && (
            <Link
              href="/dashboard"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--accent)]"
            >
              <LayoutDashboard className="h-4 w-4 text-[var(--primary)]" />
              {t("sidebar.dashboard")} ERP
            </Link>
          )}

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--danger)] transition hover:bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]"
          >
            <LogOut className="h-4 w-4" />
            {t("common.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  canAccessPath,
  getDefaultPathForRole,
} from "@/lib/sidebar-access";
import { useLocale } from "@/contexts/LocaleContext";
import { useToast } from "@/contexts/ToastContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const { t } = useLocale();
  const { showError } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const deniedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
      return;
    }
    if (user && pathname && !canAccessPath(user.role, pathname)) {
      const fallback = getDefaultPathForRole(user.role);
      if (deniedRef.current !== pathname) {
        deniedRef.current = pathname;
        showError(t("auth.accessDenied"));
      }
      router.replace(fallback);
    } else {
      deniedRef.current = null;
    }
  }, [user, isLoading, router, pathname, showError, t]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
          <p className="text-sm text-[var(--muted)]">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  if (pathname && !canAccessPath(user.role, pathname)) return null;

  return <>{children}</>;
}

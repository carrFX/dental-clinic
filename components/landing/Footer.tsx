"use client";

import Link from "next/link";
import { SmilePlus } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-[var(--border)] surface-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary text-white">
              <SmilePlus className="h-4 w-4" />
            </div>
            <span className="font-bold text-[var(--primary-dark)]">Arcade Dental</span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Arcade Dental. {t("landing.footer.tagline")}
          </p>
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            {t("landing.footer.staffLogin")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Menu, SmilePlus, X } from "lucide-react";
import { useState } from "react";
import { ProfileMenu } from "@/components/ProfileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/types";

const linkKeys: { href: string; labelKey: TranslationKey }[] = [
  { href: "#beranda", labelKey: "nav.beranda" },
  { href: "#tentang", labelKey: "nav.tentang" },
  { href: "#layanan", labelKey: "nav.layanan" },
  { href: "#tim", labelKey: "nav.tim" },
  { href: "#kontak", labelKey: "nav.kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useLocale();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white shadow-md transition-transform group-hover:scale-110">
            <SmilePlus className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-[var(--primary-dark)]">
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

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          {user && <ThemeToggle compact />}
          <ProfileMenu showDashboardLink />
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
          {!user && (
            <div className="mt-3 flex justify-center">
              <ThemeToggle />
            </div>
          )}
        </div>
      )}
    </header>
  );
}

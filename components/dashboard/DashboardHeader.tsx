"use client";

import { Menu } from "lucide-react";
import { ProfileMenu } from "@/components/ProfileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { NotificationDropdown } from "@/components/NotificationDropdown";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export function DashboardHeader({
  title,
  subtitle,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex min-w-0 items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--glass)] px-3 py-3 backdrop-blur-md sm:gap-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="shrink-0 rounded-lg p-2 text-[var(--primary)] hover:bg-[var(--accent)] lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-[var(--foreground)] sm:text-lg md:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden truncate text-xs text-[var(--muted)] sm:block sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <NotificationDropdown />
        <LanguageToggle />
        <ThemeToggle compact />
        <ProfileMenu />
      </div>
    </header>
  );
}

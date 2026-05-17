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
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--glass)] px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[var(--primary)] hover:bg-[var(--accent)] lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[var(--muted)] sm:text-sm">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <NotificationDropdown />
        <LanguageToggle />
        <ThemeToggle compact />
        <ProfileMenu />
      </div>
    </header>
  );
}

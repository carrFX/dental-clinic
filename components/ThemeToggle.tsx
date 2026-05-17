"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "@/contexts/ThemeContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/types";

const options: { value: ThemeMode; labelKey: TranslationKey; icon: typeof Sun }[] = [
  { value: "light", labelKey: "common.light", icon: Sun },
  { value: "dark", labelKey: "common.dark", icon: Moon },
  { value: "system", labelKey: "common.system", icon: Monitor },
];

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();

  if (compact) {
    const cycle: ThemeMode[] = ["light", "dark", "system"];
    const next = cycle[(cycle.indexOf(theme) + 1) % cycle.length];
    const Icon =
      theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="cursor-pointer rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--accent)] hover:text-[var(--primary)]"
        aria-label={t("common.theme")}
        title={`${t("common.theme")}: ${t(theme === "dark" ? "common.dark" : theme === "light" ? "common.light" : "common.system")}`}
      >
        <Icon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div
      className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-sm"
      role="group"
      aria-label={t("common.theme")}
    >
      {options.map(({ value, labelKey, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${
            theme === value
              ? "gradient-primary text-white shadow-sm"
              : "text-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
          }`}
          aria-pressed={theme === value}
        >
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">{t(labelKey)}</span>
        </button>
      ))}
    </div>
  );
}

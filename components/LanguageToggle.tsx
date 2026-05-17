"use client";

import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/i18n/types";

const options: { value: Locale; labelKey: "common.lang.indonesian" | "common.lang.english" }[] = [
  { value: "id", labelKey: "common.lang.indonesian" },
  { value: "en", labelKey: "common.lang.english" },
];

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
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

  const select = (value: Locale) => {
    setLocale(value);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--accent)] hover:text-[var(--primary)]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("common.language")}
      >
        <Languages className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("common.language")}
          className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] origin-top-right animate-fade-in-down overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] py-1 shadow-xl"
        >
          {options.map(({ value, labelKey }) => {
            const active = locale === value;
            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => select(value)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[var(--accent)] ${
                  active
                    ? "font-semibold text-[var(--primary)]"
                    : "text-[var(--foreground)]"
                }`}
              >
                <span>{t(labelKey)}</span>
                {active && <Check className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

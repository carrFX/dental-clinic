"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: TablePaginationProps) {
  const { t } = useLocale();

  if (totalItems === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-3 sm:flex-row sm:px-5">
      <p className="text-center text-xs text-[var(--muted)] sm:text-left sm:text-sm">
        {t("pagination.showing", { from, to, total: totalItems })}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={t("pagination.prev")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t("pagination.prev")}</span>
        </button>
        <span className="min-w-[5rem] text-center text-sm font-medium text-[var(--muted)]">
          {t("pagination.page", { page, total: totalPages })}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={t("pagination.next")}
        >
          <span className="hidden sm:inline">{t("pagination.next")}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

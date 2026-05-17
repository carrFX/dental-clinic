"use client";

import { Pencil, Trash2, Plus } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CrudTableProps<T extends { id: string }> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  emptyMessage?: string;
}

export function CrudTable<T extends { id: string }>({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  emptyMessage,
}: CrudTableProps<T>) {
  const { t } = useLocale();
  const empty = emptyMessage ?? t("common.empty");

  return (
    <div className="rounded-2xl surface-card shadow-sm ring-1 ring-[var(--border)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          {t("common.add")}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--accent)]/50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 font-semibold text-[var(--foreground)]"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold text-[var(--foreground)]">
                {t("crud.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-12 text-center text-[var(--muted)]"
                >
                  {empty}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--border)]/50 transition hover:bg-[var(--accent)]/30"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-[var(--muted)]">
                      {col.render
                        ? col.render(item)
                        : String(
                            (item as Record<string, unknown>)[col.key as string] ?? ""
                          )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-lg p-1.5 text-[var(--primary)] transition hover:bg-[var(--accent)]"
                        aria-label={t("common.edit")}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="rounded-lg p-1.5 text-[var(--danger)] transition hover:bg-red-50 dark:hover:bg-red-950/30"
                        aria-label={t("common.delete")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

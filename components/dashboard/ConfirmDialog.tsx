"use client";

import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onClose: () => void;
  variant?: "danger" | "primary";
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
  variant = "danger",
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              variant === "danger"
                ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"
                : "bg-[var(--accent)] text-[var(--primary)]"
            }`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p className="text-sm leading-relaxed text-[var(--muted)]">{message}</p>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg ${
              variant === "danger"
                ? "bg-[var(--danger)] hover:opacity-90"
                : "gradient-primary"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

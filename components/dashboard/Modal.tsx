"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const { t } = useLocale();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl surface-card shadow-2xl animate-fade-in-up">
        <div className="sticky top-0 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-5 py-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--accent)]"
            aria-label={t("common.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

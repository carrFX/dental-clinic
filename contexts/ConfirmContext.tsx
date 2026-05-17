"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { useLocale } from "@/contexts/LocaleContext";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => void;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
  }, []);

  const close = useCallback(() => setOptions(null), []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        open={!!options}
        title={options?.title ?? ""}
        message={options?.message ?? ""}
        confirmLabel={options?.confirmLabel ?? t("confirm.btn.confirm")}
        cancelLabel={options?.cancelLabel ?? t("common.cancel")}
        variant={options?.variant ?? "danger"}
        onConfirm={() => options?.onConfirm()}
        onClose={close}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}

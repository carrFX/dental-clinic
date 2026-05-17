"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { NotificationReadProvider } from "@/contexts/NotificationReadContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ConfirmProvider } from "@/contexts/ConfirmContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ToastProvider>
          <ConfirmProvider>
            <AuthProvider>
              <DataProvider>
                <NotificationReadProvider>{children}</NotificationReadProvider>
              </DataProvider>
            </AuthProvider>
          </ConfirmProvider>
        </ToastProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

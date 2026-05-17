"use client";

import { createContext, useContext, useState } from "react";

interface DashboardUIContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const DashboardUIContext = createContext<DashboardUIContextValue | null>(null);

export function DashboardUIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardUIContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar: () => setSidebarOpen((o) => !o),
      }}
    >
      {children}
    </DashboardUIContext.Provider>
  );
}

export function useDashboardUI() {
  const ctx = useContext(DashboardUIContext);
  if (!ctx) throw new Error("useDashboardUI must be used within DashboardUIProvider");
  return ctx;
}

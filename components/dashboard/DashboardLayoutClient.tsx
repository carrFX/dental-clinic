"use client";

import { AuthGuard } from "@/components/dashboard/AuthGuard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardUIProvider, useDashboardUI } from "@/contexts/DashboardUIContext";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useDashboardUI();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardUIProvider>
        <DashboardLayoutInner>{children}</DashboardLayoutInner>
      </DashboardUIProvider>
    </AuthGuard>
  );
}

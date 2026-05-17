"use client";

import { DashboardHeader } from "./DashboardHeader";
import { useDashboardUI } from "@/contexts/DashboardUIContext";

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  const { toggleSidebar } = useDashboardUI();

  return (
    <>
      <DashboardHeader
        title={title}
        subtitle={subtitle}
        onMenuClick={toggleSidebar}
      />
      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </>
  );
}

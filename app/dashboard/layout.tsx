import type { Metadata } from "next";
import { DashboardLayoutClient } from "@/components/dashboard/DashboardLayoutClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dashboard ERP",
  description: "Dashboard manajemen klinik Arcade Dental.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}

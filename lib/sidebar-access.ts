import type { UserRole } from "@/lib/auth-users";

/** Rute dashboard — dipakai untuk pengecekan akses & sidebar */
export const DASHBOARD_PATHS = {
  home: "/dashboard",
  appointments: "/dashboard/appointments",
  patients: "/dashboard/patients",
  treatments: "/dashboard/treatments",
  doctors: "/dashboard/doctors",
  inventory: "/dashboard/inventory",
  billing: "/dashboard/billing",
  reports: "/dashboard/reports",
  settings: "/dashboard/settings",
} as const;

/**
 * Matriks akses:
 * - superadmin: semua modul + pengaturan sistem & reset data
 * - admin: operasional klinik penuh (tanpa pengaturan sistem)
 * - dokter: alur klinis (dashboard, janji, pasien, perawatan)
 */
const ADMIN_PATHS: string[] = [
  DASHBOARD_PATHS.home,
  DASHBOARD_PATHS.appointments,
  DASHBOARD_PATHS.patients,
  DASHBOARD_PATHS.treatments,
  DASHBOARD_PATHS.doctors,
  DASHBOARD_PATHS.inventory,
  DASHBOARD_PATHS.billing,
  DASHBOARD_PATHS.reports,
];

const DOKTER_PATHS: string[] = [
  DASHBOARD_PATHS.home,
  DASHBOARD_PATHS.appointments,
  DASHBOARD_PATHS.patients,
  DASHBOARD_PATHS.treatments,
];

function matchesAllowedPath(path: string, allowed: string[]): boolean {
  return allowed.some(
    (base) =>
      path === base ||
      (base !== DASHBOARD_PATHS.home && path.startsWith(`${base}/`)) ||
      (base !== DASHBOARD_PATHS.home && path === base)
  );
}

export function canAccessPath(role: UserRole, path: string): boolean {
  if (!path.startsWith("/dashboard")) return false;
  if (role === "superadmin") return true;
  if (role === "admin") return matchesAllowedPath(path, ADMIN_PATHS);
  if (role === "dokter") return matchesAllowedPath(path, DOKTER_PATHS);
  return false;
}

export function isMenuVisible(role: UserRole, href: string): boolean {
  return canAccessPath(role, href);
}

export function getDefaultPathForRole(_role: UserRole): string {
  return DASHBOARD_PATHS.home;
}

/** Pendapatan, billing, laporan keuangan */
export function canViewFinance(role: UserRole): boolean {
  return role === "superadmin" || role === "admin";
}

/** Stok rendah & inventori di dashboard/notifikasi */
export function canViewInventory(role: UserRole): boolean {
  return role === "superadmin" || role === "admin";
}

/** Chart pendapatan bulanan */
export function canViewRevenueCharts(role: UserRole): boolean {
  return canViewFinance(role);
}

/** Halaman pengaturan & reset data JSON */
export function canAccessSettings(role: UserRole): boolean {
  return role === "superadmin";
}

/** Kelola data dokter/staff */
export function canManageDoctors(role: UserRole): boolean {
  return role === "superadmin" || role === "admin";
}

export function canAccessNotificationHref(role: UserRole, href: string): boolean {
  return canAccessPath(role, href);
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  UserCog,
  Package,
  Receipt,
  BarChart3,
  Settings,
  SmilePlus,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/types";
import { isMenuVisible } from "@/lib/sidebar-access";

interface MenuItem {
  href: string;
  labelKey: TranslationKey;
  icon: typeof LayoutDashboard;
}

interface MenuGroup {
  labelKey: TranslationKey;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    labelKey: "sidebar.utama",
    items: [
      { href: "/dashboard", labelKey: "sidebar.dashboard", icon: LayoutDashboard },
      { href: "/dashboard/appointments", labelKey: "sidebar.appointments", icon: Calendar },
    ],
  },
  {
    labelKey: "sidebar.manajemen",
    items: [
      { href: "/dashboard/patients", labelKey: "sidebar.patients", icon: Users },
      { href: "/dashboard/treatments", labelKey: "sidebar.treatments", icon: Stethoscope },
      { href: "/dashboard/doctors", labelKey: "sidebar.doctors", icon: UserCog },
      { href: "/dashboard/inventory", labelKey: "sidebar.inventory", icon: Package },
    ],
  },
  {
    labelKey: "sidebar.keuangan",
    items: [
      { href: "/dashboard/billing", labelKey: "sidebar.billing", icon: Receipt },
      { href: "/dashboard/reports", labelKey: "sidebar.reports", icon: BarChart3 },
    ],
  },
  {
    labelKey: "sidebar.sistem",
    items: [{ href: "/dashboard/settings", labelKey: "sidebar.settings", icon: Settings }],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLocale();
  const role = user?.role ?? "admin";

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-[min(100vw-3rem,18rem)] flex-col border-r border-[var(--border)] gradient-sidebar shadow-2xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-72 lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="shrink-0 border-b border-[var(--border)] px-4 py-4">
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary text-white shadow-lg transition-transform group-hover:scale-105">
                <SmilePlus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-bold leading-tight text-[var(--foreground)]">
                  Arcade Dental
                </p>
                <p className="text-xs font-medium text-[var(--primary)]">ERP Klinik</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-[var(--muted)] transition hover:bg-[var(--accent)] lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 overscroll-contain"
          aria-label="Navigation menu"
        >
          {menuGroups.map((group) => {
            const visibleItems = group.items.filter((item) =>
              isMenuVisible(role, item.href)
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.labelKey} className="mb-4 last:mb-2">
                <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--gray)]">
                  {t(group.labelKey)}
                </p>
                <ul className="space-y-0.5">
                  {visibleItems.map(({ href, labelKey, icon: Icon }) => {
                    const active = isActive(href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={onClose}
                          className={`sidebar-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                            active ? "active" : ""
                          }`}
                        >
                          <span className="sidebar-icon-wrap">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="flex-1">{t(labelKey)}</span>
                          {active && <ChevronRight className="h-4 w-4 opacity-80" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Package,
  Receipt,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useNotificationRead } from "@/contexts/NotificationReadContext";
import {
  canAccessNotificationHref,
  canViewFinance,
  canViewInventory,
} from "@/lib/sidebar-access";

type NotifType = "appointment" | "inventory" | "billing" | "info";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  href: string;
  unread: boolean;
}

const iconMap = {
  appointment: Calendar,
  inventory: Package,
  billing: Receipt,
  info: AlertTriangle,
};

const colorMap = {
  appointment: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
  inventory: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300",
  billing: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  info: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
};

export function NotificationDropdown() {
  const { data } = useData();
  const { user } = useAuth();
  const { t } = useLocale();
  const role = user?.role ?? "dokter";

  const relativeTime = (dateStr: string, timeStr?: string) => {
    const target = new Date(`${dateStr}T${timeStr ?? "12:00"}:00`);
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t("notif.time.today");
    if (diffDays === 1) return t("notif.time.tomorrow");
    if (diffDays === -1) return t("notif.time.yesterday");
    if (diffDays > 1) return t("notif.time.daysAhead", { days: diffDays });
    return t("notif.time.daysAgo", { days: Math.abs(diffDays) });
  };
  const { readIds, markRead, markAllRead, isReady } = useNotificationRead();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications = useMemo(() => {
    const list: Notification[] = [];
    const today = new Date().toISOString().slice(0, 10);

    data.appointments
      .filter((a) => a.date === today && a.status !== "Dibatalkan")
      .slice(0, 3)
      .forEach((a) => {
        list.push({
          id: `appt-${a.id}`,
          type: "appointment",
          title: t("notif.todayAppointment"),
          message: `${a.patientName} — ${a.treatmentName} (${a.time})`,
          time: relativeTime(a.date, a.time),
          href: "/dashboard/appointments",
          unread: true,
        });
      });

    if (canViewInventory(role)) {
      data.inventory
        .filter((i) => i.quantity <= i.minStock)
        .slice(0, 3)
        .forEach((i) => {
          list.push({
            id: `inv-${i.id}`,
            type: "inventory",
            title: t("notif.lowStock"),
            message: `${i.name}: tersisa ${i.quantity} ${i.unit}`,
            time: t("reports.lowStockWarn"),
            href: "/dashboard/inventory",
            unread: true,
          });
        });
    }

    if (canViewFinance(role)) {
      data.invoices
        .filter((inv) => inv.status !== "Lunas")
        .slice(0, 3)
        .forEach((inv) => {
          list.push({
            id: `bill-${inv.id}`,
            type: "billing",
            title: inv.status === "Belum Bayar" ? t("notif.unpaid") : t("notif.partialPay"),
            message: `${inv.patientName} — ${inv.treatmentName}`,
            time: relativeTime(inv.date),
            href: "/dashboard/billing",
            unread: true,
          });
        });
    }

    const upcoming = data.appointments.filter(
      (a) => a.date > today && a.status === "Menunggu"
    );
    if (upcoming.length > 0) {
      list.push({
        id: "info-upcoming",
        type: "info",
        title: t("notif.upcoming"),
        message: `${upcoming.length} janji temu menunggu konfirmasi`,
        time: t("notif.time.thisWeek"),
        href: "/dashboard/appointments",
        unread: true,
      });
    }

    return list
      .filter((n) => canAccessNotificationHref(role, n.href))
      .slice(0, 8);
  }, [data, t, role]);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    markAllRead(notifications.map((n) => n.id));
  };

  if (!isReady) {
    return (
      <button
        type="button"
        className="relative rounded-lg p-2 text-[var(--muted)]"
        aria-label={t("common.notifications")}
        disabled
      >
        <Bell className="h-5 w-5 opacity-50" />
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--accent)] hover:text-[var(--primary)]"
        aria-expanded={open}
        aria-label={t("common.notifications")}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/25 md:hidden"
            aria-label={t("common.close")}
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-3 right-3 top-[4.25rem] z-50 flex max-h-[min(70vh,24rem)] flex-col animate-fade-in-down overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-[22rem] md:max-w-[min(100vw-2rem,22rem)] md:max-h-80 md:origin-top-right">
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              {t("common.notifications")}
            </h3>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-medium text-[var(--primary)] hover:underline"
              >
                {t("common.markAllRead")}
              </button>
            )}
          </div>

          <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-1">
            {notifications.length === 0 ? (
              <li className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-[var(--success)]" />
                <p className="text-sm text-[var(--muted)]">{t("common.noNotifications")}</p>
              </li>
            ) : (
              notifications.map((n) => {
                const Icon = iconMap[n.type];
                const isUnread = !readIds.has(n.id);
                return (
                  <li key={n.id}>
                    <Link
                      href={n.href}
                      onClick={() => {
                        markRead(n.id);
                        setOpen(false);
                      }}
                      className={`flex gap-3 px-4 py-3 transition hover:bg-[var(--accent)] ${
                        isUnread ? "bg-[var(--accent)]/40" : ""
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--foreground)]">{n.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-[var(--muted)]">
                          {n.message}
                        </p>
                        <p className="mt-1 text-[10px] text-[var(--gray)]">{n.time}</p>
                      </div>
                      {isUnread && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                      )}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>

          <div className="shrink-0 border-t border-[var(--border)] p-2">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block rounded-lg py-2 text-center text-xs font-medium text-[var(--primary)] hover:bg-[var(--accent)]"
            >
              {t("common.viewDashboard")}
            </Link>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

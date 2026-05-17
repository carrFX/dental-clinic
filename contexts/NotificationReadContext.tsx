"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  readStringSet,
  STORAGE_KEYS,
  writeStringSet,
} from "@/lib/client-storage";

interface NotificationReadContextValue {
  readIds: Set<string>;
  isRead: (id: string) => boolean;
  markRead: (id: string) => void;
  markAllRead: (ids: string[]) => void;
  isReady: boolean;
}

const NotificationReadContext =
  createContext<NotificationReadContextValue | null>(null);

export function NotificationReadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setReadIds(readStringSet(STORAGE_KEYS.notificationsRead));
    setIsReady(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setReadIds(next);
    writeStringSet(STORAGE_KEYS.notificationsRead, next);
  }, []);

  const isRead = useCallback((id: string) => readIds.has(id), [readIds]);

  const markRead = useCallback(
    (id: string) => {
      persist(new Set(readIds).add(id));
    },
    [readIds, persist]
  );

  const markAllRead = useCallback(
    (ids: string[]) => {
      const next = new Set(readIds);
      ids.forEach((id) => next.add(id));
      persist(next);
    },
    [readIds, persist]
  );

  return (
    <NotificationReadContext.Provider
      value={{ readIds, isRead, markRead, markAllRead, isReady }}
    >
      {children}
    </NotificationReadContext.Provider>
  );
}

export function useNotificationRead() {
  const ctx = useContext(NotificationReadContext);
  if (!ctx) {
    throw new Error(
      "useNotificationRead must be used within NotificationReadProvider"
    );
  }
  return ctx;
}

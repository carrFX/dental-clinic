/** Kunci localStorage — data per browser, tidak pakai cookies */

export const STORAGE_KEYS = {
  clinicData: "arcade_dental_data",
  auth: "arcade_dental_auth",
  theme: "arcade_dental_theme",
  notificationsRead: "arcade_dental_notifications_read",
  locale: "arcade_dental_locale",
} as const;

export function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function readStringSet(key: string): Set<string> {
  const arr = readStorage<string[]>(key);
  if (!Array.isArray(arr)) return new Set();
  return new Set(arr.filter((id) => typeof id === "string"));
}

export function writeStringSet(key: string, set: Set<string>): void {
  writeStorage(key, Array.from(set));
}

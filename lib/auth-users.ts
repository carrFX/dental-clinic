export type UserRole = "admin" | "dokter" | "superadmin";

export interface MockUser {
  email: string;
  password: string;
  role: UserRole;
  displayName: string;
}

/** Akun demo — login wajib pakai email & password ini */
export const MOCK_USERS: MockUser[] = [
  {
    email: "admin@arcadedental.com",
    password: "admin123",
    role: "admin",
    displayName: "Admin Klinik",
  },
  {
    email: "dokter@arcadedental.com",
    password: "dokter123",
    role: "dokter",
    displayName: "Dr. Sarah Wijaya",
  },
  {
    email: "superadmin@arcadedental.com",
    password: "super123",
    role: "superadmin",
    displayName: "Super Admin",
  },
];

export type LoginErrorCode =
  | "empty"
  | "invalid_email"
  | "invalid_credentials";

export function validateLogin(
  email: string,
  password: string
): { ok: true; user: MockUser } | { ok: false; code: LoginErrorCode } {
  const e = email.trim().toLowerCase();
  const p = password;

  if (!e || !p) return { ok: false, code: "empty" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return { ok: false, code: "invalid_email" };
  }

  const found = MOCK_USERS.find(
    (u) => u.email === e && u.password === p
  );
  if (!found) return { ok: false, code: "invalid_credentials" };

  return { ok: true, user: found };
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { UserRole } from "@/lib/auth-users";
import { validateLogin, type LoginErrorCode } from "@/lib/auth-users";
import { readStorage, removeStorage, STORAGE_KEYS, writeStorage } from "@/lib/client-storage";

export interface AuthUser {
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; code: LoginErrorCode };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = readStorage<AuthUser>(STORAGE_KEYS.auth);
    if (stored?.email && stored.role) setUser(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = validateLogin(email, password);
    if (!result.ok) return { ok: false as const, code: result.code };

    const authUser: AuthUser = {
      email: result.user.email,
      displayName: result.user.displayName,
      role: result.user.role,
    };
    writeStorage(STORAGE_KEYS.auth, authUser);
    setUser(authUser);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    removeStorage(STORAGE_KEYS.auth);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

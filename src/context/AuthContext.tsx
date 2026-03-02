import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { displayNameFromEmail, isStrongPassword, isValidEmail } from "../lib/validation";

type AuthUser = {
  name: string;
  email: string;
  memberSince: number;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (name: string, email: string, password: string, confirmPassword: string) => { ok: boolean; error?: string };
  signOut: () => void;
};

const AUTH_STORAGE_KEY = "gamekey-market-auth-v1";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const name = "name" in parsed ? parsed.name : undefined;
    const email = "email" in parsed ? parsed.email : undefined;
    const memberSince = "memberSince" in parsed ? parsed.memberSince : undefined;

    if (
      typeof name !== "string" ||
      name.trim().length === 0 ||
      typeof email !== "string" ||
      !isValidEmail(email) ||
      typeof memberSince !== "number"
    ) {
      return null;
    }

    return { name, email, memberSince };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const writeUser = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (typeof window === "undefined") {
      return;
    }

    if (nextUser) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const signIn: AuthContextValue["signIn"] = (email, password) => {
    if (!isValidEmail(email)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (!isStrongPassword(password)) {
      return { ok: false, error: "Password must be at least 8 characters." };
    }

    const normalizedEmail = email.trim().toLowerCase();
    writeUser({
      name: displayNameFromEmail(normalizedEmail),
      email: normalizedEmail,
      memberSince: new Date().getFullYear(),
    });
    return { ok: true };
  };

  const signUp: AuthContextValue["signUp"] = (name, email, password, confirmPassword) => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      return { ok: false, error: "Enter your full name." };
    }
    if (!isValidEmail(normalizedEmail)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (!isStrongPassword(password)) {
      return { ok: false, error: "Password must be at least 8 characters." };
    }
    if (password !== confirmPassword) {
      return { ok: false, error: "Passwords do not match." };
    }

    writeUser({
      name: normalizedName,
      email: normalizedEmail,
      memberSince: new Date().getFullYear(),
    });
    return { ok: true };
  };

  const signOut = () => writeUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Demo-only local auth. Accounts are stored in AsyncStorage on-device with
 * no encryption or server verification — this is NOT secure authentication,
 * it only simulates the sign-up/sign-in flow for this prototype.
 */

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type StoredAccount = AuthUser & { password: string };

type Result = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  signUp: (input: { name: string; email: string; password: string; phone?: string }) => Promise<Result>;
  signIn: (input: { email: string; password: string }) => Promise<Result>;
  signOut: () => Promise<void>;
  updateProfile: (input: Partial<Pick<AuthUser, "name" | "phone">>) => Promise<void>;
};

const ACCOUNTS_KEY = "bosphorus.auth.accounts.v1";
const SESSION_KEY = "bosphorus.auth.session.v1";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function readAccounts(): Promise<StoredAccount[]> {
  const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toPublicUser(account: StoredAccount): AuthUser {
  const { password: _password, ...rest } = account;
  return rest;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [sessionId, accounts] = await Promise.all([AsyncStorage.getItem(SESSION_KEY), readAccounts()]);
        if (sessionId) {
          const match = accounts.find((a) => a.id === sessionId);
          if (match) setUser(toPublicUser(match));
        }
      } catch {
        // ignore corrupt storage, start signed out
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const signUp = useCallback<AuthContextValue["signUp"]>(async ({ name, email, password, phone }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = await readAccounts();
    if (accounts.some((a) => a.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const account: StoredAccount = {
      id: `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || undefined,
      password,
    };
    const nextAccounts = [...accounts, account];
    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts));
    await AsyncStorage.setItem(SESSION_KEY, account.id);
    setUser(toPublicUser(account));
    return { ok: true };
  }, []);

  const signIn = useCallback<AuthContextValue["signIn"]>(async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = await readAccounts();
    const match = accounts.find((a) => a.email === normalizedEmail);
    if (!match || match.password !== password) {
      return { ok: false, error: "Incorrect email or password." };
    }
    await AsyncStorage.setItem(SESSION_KEY, match.id);
    setUser(toPublicUser(match));
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>(async (input) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...input };
      (async () => {
        const accounts = await readAccounts();
        const updated = accounts.map((a) => (a.id === prev.id ? { ...a, ...input } : a));
        await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updated));
      })();
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isReady, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

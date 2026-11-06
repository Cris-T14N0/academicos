"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type StudentUser = {
  name: string;
  studentNumber: string;
  email: string;
  course: string;
  school: string;
  year: number;
  semester: string;
  avatarInitials: string;
};

type AuthContextValue = {
  user: StudentUser | null;
  ready: boolean;
  login: (studentNumber: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "ups-academicos-user";

export const DEMO_USER: StudentUser = {
  name: "Mariana Ferreira",
  studentNumber: "2025001",
  email: "mariana.ferreira@aluno.ipsantarem.pt",
  course: "Licenciatura em Engenharia Informática",
  school: "Escola Superior de Gestão e Tecnologia de Santarém",
  year: 2,
  semester: "1.º semestre · 2026/2027",
  avatarInitials: "MF",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StudentUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // Hydrate the persisted session after mount to keep server and client markup in sync.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setUser(JSON.parse(stored) as StudentUser);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  const login = useCallback(async (studentNumber: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    const validNumber = studentNumber.trim().length >= 5;
    const validPassword = password.length >= 4;
    if (!validNumber || !validPassword) {
      return {
        ok: false,
        message:
          "Verifica o número de estudante e a senha. Para a demonstração usa 2025001 / demo1234.",
      };
    }
    const nextUser: StudentUser = {
      ...DEMO_USER,
      studentNumber: studentNumber.trim(),
      email: `${studentNumber.trim()}@aluno.ipsantarem.pt`,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

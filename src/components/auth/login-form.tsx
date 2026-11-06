"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/auth-provider";

export function LoginForm({ redirectTo = "/portal" }: { redirectTo?: string }) {
  const router = useRouter();
  const { login } = useAuth();
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(studentNumber, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.message ?? "Não foi possível iniciar sessão.");
      return;
    }
    toast.success("Sessão iniciada", { description: "Bem-vinda de volta, Mariana." });
    router.push(redirectTo);
  }

  function fillDemo() {
    setStudentNumber("2025001");
    setPassword("demo1234");
    setError(null);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Entrar no portal
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Usa o número de estudante e a senha.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="studentNumber">Número de estudante</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="studentNumber"
              name="studentNumber"
              autoComplete="username"
              inputMode="numeric"
              placeholder="Ex.: 2025001"
              value={studentNumber}
              onChange={(event) => setStudentNumber(event.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link href="/recuperar-password" className="text-xs font-semibold text-primary hover:underline">
              Esqueceste-te da senha?
            </Link>
          </div>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="A tua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="px-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="size-4 rounded border-input accent-brand-600"
          />
          Manter sessão iniciada neste dispositivo
        </label>

        {error ? (
          <p role="alert" className="rounded-xl border border-ember-200 bg-ember-50 px-3 py-2 text-xs leading-relaxed text-ember-700 dark:border-ember-800 dark:bg-ember-900/40 dark:text-ember-200">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <KeyRound className="size-4" />}
          {loading ? "A entrar…" : "Entrar no portal"}
          {!loading ? <ArrowRight className="size-4" /> : null}
        </Button>
      </form>

      <p className="mt-4 text-xs text-muted-foreground">
        Demonstração:{" "}
        <button type="button" onClick={fillDemo} className="font-semibold text-foreground underline underline-offset-4">
          preencher 2025001 / demo1234
        </button>
      </p>

      <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
        Ao entrares aceitas os{" "}
        <Link href="/legislacao" className="font-semibold text-primary hover:underline">
          regulamentos
        </Link>{" "}
        e a{" "}
        <Link href="/privacidade" className="font-semibold text-primary hover:underline">
          privacidade
        </Link>
        .
      </p>
    </div>
  );
}

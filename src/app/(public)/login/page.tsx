import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/site/logo";

export const instant = false;

export const metadata = {
  title: "Iniciar sessão",
  description: "Acede ao Portal do Estudante da UPSantarém.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = next && next.startsWith("/portal") ? next : "/portal";

  return (
    <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden bg-brand-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
        <Logo variant="light" />
        <div className="max-w-sm">
          <h2 className="font-display text-3xl font-semibold leading-tight xl:text-4xl">
            A tua área académica, sem ruído.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Notas, exames, horários e pagamentos num único acesso.
          </p>
        </div>
        <p className="text-xs text-white/40">Protótipo demonstrativo</p>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="size-3.5" />
            Voltar ao site
          </Link>
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}

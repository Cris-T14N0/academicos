"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RecoverForm() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setSent(true);
    toast.success("Pedido registado", {
      description: "Em caso de correspondência, receberás instruções por email.",
    });
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckCircle2 className="size-7" />
        </span>
        <h1 className="font-display mt-4 text-2xl font-semibold">Verifica o teu email</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Se os dados corresponderem a uma conta válida, enviámos instruções para
          redefinir a senha. A ligação é válida durante 30 minutos.
        </p>
        <div className="mt-5 rounded-2xl bg-muted/60 p-3 text-left text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Não recebeste o email?</p>
          <p className="mt-1">
            Verifica a pasta de spam ou contacta o helpdesk InfoCIIPS através de{" "}
            <a href="mailto:infociips@ipsantarem.pt" className="font-semibold text-primary">
              infociips@ipsantarem.pt
            </a>
            .
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <Button onClick={() => setSent(false)} variant="outline">
            Tentar novamente
          </Button>
          <Link href="/login" className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-primary">
            <ArrowLeft className="size-4" />
            Voltar ao início de sessão
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
        <ShieldCheck className="size-5" />
      </span>
      <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight">
        Recuperar senha
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Indica o teu número de estudante ou o email institucional. Enviaremos uma
        ligação para definires uma nova senha.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="identifier">Número de estudante ou email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="identifier"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="2025001 ou nome@aluno.ipsantarem.pt"
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
          {loading ? "A enviar…" : "Enviar ligação de recuperação"}
        </Button>
      </form>

      <Link href="/login" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        <ArrowLeft className="size-4" />
        Voltar ao início de sessão
      </Link>
    </div>
  );
}

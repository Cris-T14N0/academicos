"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Bus,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  Info,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Ticket,
  Utensils,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_USER } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const benefits = [
  { icon: BookOpen, label: "Biblioteca", description: "Empréstimo domiciliário e acesso a bases de dados." },
  { icon: Utensils, label: "Refeitórios", description: "Pagamento de refeições com desconto académico." },
  { icon: Bus, label: "Transportes", description: "Título de transporte e descontos regionais." },
  { icon: Ticket, label: "Cultura e desporto", description: "Acesso a eventos, cinemas e atividades desportivas." },
  { icon: Wallet, label: "Pagamentos", description: "Associação ao Cartão Caixa IU para pagamentos." },
  { icon: ShieldCheck, label: "Identificação", description: "Prova de estatuto de estudante na comunidade." },
];

export function StudentCard() {
  const [flipped, setFlipped] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  const qrCells = useMemo(() => {
    return Array.from({ length: 21 * 21 }, (_, index) => {
      const row = Math.floor(index / 21);
      const col = index % 21;
      const inFinder = (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7);
      if (inFinder) {
        const localRow = row > 13 ? row - 14 : row;
        const localCol = col > 13 ? col - 14 : col;
        return localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6 || (localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4);
      }
      return (row * 7 + col * 13 + row * col) % 5 < 2;
    });
  }, []);

  async function requestSecondCopy() {
    setRequesting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setRequesting(false);
    setRequested(true);
    toast.success("Segunda via solicitada", { description: "Emolumento de 15 € adicionado à conta corrente (demonstração)." });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Cartão de estudante digital</h2>
              <p className="text-xs text-muted-foreground">Clica no cartão para ver o verso.</p>
            </div>
            <Badge variant="success">
              <CheckCircle2 className="size-3.5" />
              Ativo
            </Badge>
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setFlipped((value) => !value)}
              aria-label={flipped ? "Ver frente do cartão" : "Ver verso do cartão"}
              className="group relative aspect-[1.586/1] w-full max-w-md [perspective:1200px]"
            >
              <div
                className={cn(
                  "relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]",
                  flipped && "[transform:rotateY(180deg)]",
                )}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-brand-900 p-5 text-white [backface-visibility:hidden]">
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="grid size-8 place-items-center rounded-lg bg-white/15 font-display text-xs font-bold">UP</span>
                        <div>
                          <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-sand-300">UPSantarém</p>
                          <p className="text-[0.55rem] text-white/50">Cartão de Estudante</p>
                        </div>
                      </div>
                      <span className="rounded-md bg-white/10 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-wide text-white/70">
                        Caixa IU
                      </span>
                    </div>

                    <div>
                      <p className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-sand-300">Nome do titular</p>
                      <p className="font-display text-lg font-semibold">{DEMO_USER.name}</p>
                      <div className="mt-2 flex items-end justify-between">
                        <div>
                          <p className="text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/40">Número de estudante</p>
                          <p className="font-mono text-sm">{DEMO_USER.studentNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/40">Validade</p>
                          <p className="font-mono text-sm">09/2029</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-brand-950 p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-sand-300">
                        {DEMO_USER.course}
                      </p>
                      <span className="text-[0.55rem] text-white/40">{DEMO_USER.school}</span>
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="font-mono text-[0.6rem] tracking-[0.18em] text-white/70">
                          {DEMO_USER.studentNumber}-UPS-2026-2029
                        </p>
                        <div className="mt-2 flex h-8 items-end gap-[2px]">
                          {Array.from({ length: 42 }).map((_, index) => (
                            <span
                              key={index}
                              className="w-[2px] bg-white/80"
                              style={{ height: `${40 + ((index * 17) % 60)}%`, opacity: (index * 7) % 3 === 0 ? 0.35 : 0.9 }}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-[0.5rem] text-white/40">
                          Documento pessoal e intransmissível · UPSantarém
                        </p>
                      </div>
                      <div className="grid shrink-0 gap-px rounded bg-white p-1.5" style={{ gridTemplateColumns: "repeat(21, 2px)" }}>
                        {qrCells.map((on, index) => (
                          <span key={index} className={cn("size-[2px]", on ? "bg-brand-950" : "bg-white")} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button onClick={() => toast.success("Cartão descarregado", { description: "PDF do cartão digital (demonstração)." })}>
              <Download className="size-4" />
              Descarregar cartão
            </Button>
            <Button variant="outline" onClick={() => toast.info("Adicionar à wallet", { description: "Disponível na app móvel oficial (demonstração)." })}>
              <Smartphone className="size-4" />
              Adicionar ao telemóvel
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Benefícios e utilizações</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.label} className="flex items-start gap-3 rounded-2xl border border-border p-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{benefit.label}</p>
                    <p className="text-xs leading-snug text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="font-display text-base font-semibold">Dados do cartão</h2>
          <dl className="mt-3 space-y-2.5 text-sm">
            {[
              ["Titular", DEMO_USER.name],
              ["Número de estudante", DEMO_USER.studentNumber],
              ["Curso", DEMO_USER.course.replace("Licenciatura em ", "")],
              ["Validade", "30 de setembro de 2029"],
              ["Estado", "Ativo"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-3 border-b border-border pb-2 last:border-0 last:pb-0">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-right text-xs font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="size-4 shrink-0" />
            Cartão validado e pronto a usar.
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold">
            <RefreshCw className="size-4 text-brand-500" />
            Segunda via
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Pediste a substituição do cartão? Solicita uma segunda via. O emolumento
            é de 15 €.
          </p>
          <Button
            className="mt-3 w-full"
            variant={requested ? "outline" : "default"}
            onClick={requestSecondCopy}
            disabled={requesting || requested}
          >
            {requesting ? <Loader2 className="size-4 animate-spin" /> : requested ? <CheckCircle2 className="size-4" /> : <CreditCard className="size-4" />}
            {requesting ? "A solicitar…" : requested ? "Segunda via solicitada" : "Pedir segunda via"}
          </Button>
          {requested ? (
            <p className="mt-2 flex items-center gap-1.5 text-[0.7rem] text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              Pedido registado. Acompanha em Documentos.
            </p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-border bg-muted/40 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="size-4 text-brand-500" />
            Apoio ao cartão
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Para problemas com o cartão, contacta os Serviços Académicos ou o
            helpdesk InfoCIIPS.
          </p>
          <p className="mt-2 text-[0.7rem] text-muted-foreground">
            academicos@ipsantarem.pt · 243 309 520
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-2xl border border-sand-300 bg-sand-50 p-4 text-xs leading-relaxed text-sand-900 dark:border-sand-800 dark:bg-sand-900/30 dark:text-sand-200">
          <Info className="mt-0.5 size-4 shrink-0" />
          Se o teu cartão for perdido ou roubado, solicita imediatamente o bloqueio
          junto da Caixa Geral de Depósitos.
        </div>
      </aside>
    </div>
  );
}

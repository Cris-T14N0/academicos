"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  Info,
  Loader2,
  Receipt,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/portal/status-badge";
import { studentSummary, transactions } from "@/lib/data/portal";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const tabs = ["Movimentos", "Plano de pagamentos", "Emolumentos"] as const;

const paymentPlan = [
  { label: "Matrícula e inscrição", amount: 40, due: "2026-09-12", status: "Pago" },
  { label: "1.ª prestação", amount: 697, due: "2026-10-04", status: "Pago" },
  { label: "2.ª prestação", amount: 697, due: "2027-01-15", status: "Pendente" },
  { label: "3.ª prestação", amount: 697, due: "2027-03-15", status: "Pendente" },
];

const fees = [
  { label: "Certidão de frequência", value: 5 },
  { label: "Certidão de conclusão", value: 10 },
  { label: "Inscrição em exame de melhoria", value: 10 },
  { label: "Segunda via do cartão", value: 15 },
  { label: "Declaração com assinatura", value: 3 },
];

export function AccountView() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Movimentos");
  const [status, setStatus] = useState<"Todos" | "Pago" | "Pendente">("Todos");
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<"mbway" | "card" | "reference">("mbway");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const filtered = useMemo(
    () => (status === "Todos" ? transactions : transactions.filter((item) => item.status === status)),
    [status],
  );

  const totalPaid = transactions
    .filter((item) => item.status === "Pago")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalPending = transactions
    .filter((item) => item.status === "Pendente")
    .reduce((sum, item) => sum + item.amount, 0);

  async function pay() {
    setPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setPaying(false);
    setPaid(true);
    toast.success("Pagamento confirmado", { description: "2.ª prestação da propina · 697 € (demonstração)." });
  }

  function copyReference() {
    navigator.clipboard
      .writeText("12345 67890 12345 67890 123 456")
      .then(() => toast.success("Referência copiada"))
      .catch(() => toast.error("Não foi possível copiar"));
  }

  function downloadReceipt(id: string) {
    toast.success("Comprovativo descarregado", { description: `Documento ${id} (demonstração).` });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Saldo atual", value: paid ? "0,00 €" : "Em dia", hint: "Sem dívidas em atraso", icon: Wallet, tone: "text-emerald-600" },
          { label: "Pago em 2026/2027", value: formatCurrency(totalPaid), hint: "2 pagamentos", icon: CheckCircle2, tone: "text-brand-600" },
          { label: "Por pagar", value: formatCurrency(paid ? totalPending - 697 : totalPending), hint: "Até 15 de março de 2027", icon: Receipt, tone: "text-sand-600" },
          { label: "Próximo pagamento", value: paid ? "—" : formatCurrency(697), hint: "2.ª prestação · 15 jan", icon: Banknote, tone: "text-ember-600" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <Icon className={cn("size-4", item.tone)} />
              </div>
              <p className="font-display mt-2 text-xl font-semibold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </div>
          );
        })}
      </div>

      {!paid ? (
        <div className="flex flex-col gap-4 border-y border-sand-300 bg-sand-50 p-5 dark:border-sand-800 dark:bg-sand-900/30 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Banknote className="mt-0.5 size-5 shrink-0 text-brand-700 dark:text-sand-300" />
            <div>
              <p className="text-sm font-semibold">2.ª prestação da propina · {formatCurrency(697)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Vence a {formatDate(studentSummary.nextPayment.due)}. Podes pagar por MB WAY, cartão ou referência.
              </p>
            </div>
          </div>
          <Button onClick={() => setPayOpen(true)} className="shrink-0">
            Pagar agora
            <ArrowRight className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/40">
          <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-sm font-semibold">Pagamento confirmado</p>
            <p className="text-xs text-muted-foreground">A 2.ª prestação foi paga com sucesso. O comprovativo está disponível abaixo.</p>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="scrollbar-thin flex gap-1 overflow-x-auto">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  tab === item ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          {tab === "Movimentos" ? (
            <div className="flex gap-1">
              {(["Todos", "Pago", "Pendente"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(item)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold transition-colors",
                    status === item ? "border-brand-300 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300" : "border-border text-muted-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {tab === "Movimentos" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-5 py-3">Descrição</th>
                  <th className="px-3 py-3">Data</th>
                  <th className="px-3 py-3">Método</th>
                  <th className="px-3 py-3">Valor</th>
                  <th className="px-3 py-3">Estado</th>
                  <th className="px-5 py-3 text-right">Comprovativo</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{item.description}</p>
                      <p className="text-[0.65rem] text-muted-foreground">{item.id}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{formatDate(item.date, { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{item.method ?? "—"}</td>
                    <td className="px-3 py-3 font-semibold">{formatCurrency(item.amount)}</td>
                    <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-5 py-3 text-right">
                      {item.status !== "Pendente" ? (
                        <button
                          type="button"
                          onClick={() => downloadReceipt(item.id)}
                          aria-label={`Descarregar comprovativo ${item.id}`}
                          className="inline-grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Download className="size-3.5" />
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {tab === "Plano de pagamentos" ? (
          <div className="p-5">
            <div className="space-y-3">
              {paymentPlan.map((item, index) => {
                const done = item.status === "Pago" || (paid && index === 2);
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-border p-4">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold",
                        done ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {done ? <CheckCircle2 className="size-4" /> : index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">Vencimento a {formatDate(item.due)}</p>
                    </div>
                    <p className="font-display text-sm font-semibold">{formatCurrency(item.amount)}</p>
                    <StatusBadge status={done ? "Pago" : "Pendente"} />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0" />
              O plano de pagamentos pode ser alterado junto da Tesouraria até 30 dias
              após o início do semestre. O pagamento integral tem um desconto de 2%.
            </div>
          </div>
        ) : null}

        {tab === "Emolumentos" ? (
          <div className="p-5">
            <div className="grid gap-2 sm:grid-cols-2">
              {fees.map((fee) => (
                <div key={fee.label} className="flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{fee.label}</span>
                  <span className="font-semibold">{formatCurrency(fee.value)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Os emolumentos são atualizados anualmente. Estudantes bolseiros podem
              beneficiar de isenções parciais — consulta os Serviços de Ação Social.
            </p>
          </div>
        ) : null}
      </div>

      {payOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm" onClick={() => setPayOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div>
                <h2 className="font-display text-lg font-semibold">Pagar propina</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">2.ª prestação · 2026/2027</p>
              </div>
              <button type="button" onClick={() => setPayOpen(false)} aria-label="Fechar" className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted">
                <X className="size-4" />
              </button>
            </div>
            <div className="p-5">
              <div className="rounded-md bg-brand-700 p-4 text-white">
                <p className="text-xs font-semibold text-sand-200">Total a pagar</p>
                <p className="font-display mt-1 text-3xl font-bold">{formatCurrency(697)}</p>
                <p className="mt-0.5 text-xs text-white/60">Vence a 15 de janeiro de 2027</p>
              </div>

              <p className="mt-4 text-xs font-semibold text-muted-foreground">Método de pagamento</p>
              <div className="mt-2 space-y-2">
                {[
                  { id: "mbway" as const, label: "MB WAY", description: "Pagamento imediato pelo telemóvel", icon: Smartphone },
                  { id: "card" as const, label: "Cartão de débito/crédito", description: "Visa, Mastercard ou MB Net", icon: CreditCard },
                  { id: "reference" as const, label: "Referência Multibanco", description: "Pagamento em qualquer ATM", icon: Banknote },
                ].map((option) => {
                  const Icon = option.icon;
                  const active = method === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setMethod(option.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-3 text-left text-xs transition-colors",
                        active ? "border-brand-400 bg-brand-50 dark:border-brand-700 dark:bg-brand-950" : "border-border hover:border-brand-300",
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", active ? "text-brand-600 dark:text-brand-300" : "text-muted-foreground")} />
                      <span className="flex-1">
                        <span className="block font-semibold">{option.label}</span>
                        <span className="text-muted-foreground">{option.description}</span>
                      </span>
                      <span className={cn("size-4 rounded-full border", active ? "border-brand-600 bg-brand-600 ring-2 ring-brand-200 dark:ring-brand-800" : "border-input")} />
                    </button>
                  );
                })}
              </div>

              {method === "reference" ? (
                <div className="mt-3 rounded-2xl border border-border p-3 text-xs">
                  <p className="font-semibold">Entidade: 21849 · Referência:</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="font-mono tracking-tight">12345 67890 12345 67890 123</span>
                    <button type="button" onClick={copyReference} aria-label="Copiar referência" className="grid size-7 place-items-center rounded-lg hover:bg-muted">
                      <Copy className="size-3.5" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex justify-end gap-2 border-t border-border p-4">
              <Button variant="outline" onClick={() => setPayOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={pay} disabled={paying}>
                {paying ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
                {paying ? "A processar…" : "Confirmar pagamento"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

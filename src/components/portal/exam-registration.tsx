"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock3,
  Info,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/portal/status-badge";
import { examPeriods, examSchedule } from "@/lib/data/exams";
import { cn, formatDate } from "@/lib/utils";

export function ExamRegistration() {
  const [registered, setRegistered] = useState<string[]>(
    examSchedule.filter((exam) => exam.registered).map((exam) => exam.id),
  );
  const [period, setPeriod] = useState<"Normal" | "Recurso" | "Especial">("Normal");

  const exams = useMemo(
    () => examSchedule.filter((exam) => exam.type === period),
    [period],
  );

  const registeredCount = registered.filter((id) => examSchedule.some((exam) => exam.id === id)).length;
  const pending = examSchedule.length - registeredCount;

  function toggle(examId: string, unit: string, type: string) {
    setRegistered((current) => {
      if (current.includes(examId)) {
        toast.info("Inscrição anulada", { description: `${unit} · época ${type.toLowerCase()}` });
        return current.filter((id) => id !== examId);
      }
      toast.success("Inscrição submetida", {
        description: `${unit} · época ${type.toLowerCase()}. Emolumento: ${type === "Normal" ? "isento" : "10 €"}.`,
      });
      return [...current, examId];
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{registeredCount} inscrições ativas · {pending} por inscrever</p>

      <div className="flex items-start gap-3 rounded-2xl border border-sand-300 bg-sand-50 p-4 text-sm dark:border-sand-800 dark:bg-sand-900/30">
        <Info className="mt-0.5 size-4 shrink-0 text-sand-700 dark:text-sand-300" />
        <p className="leading-relaxed text-sand-900 dark:text-sand-200">
          A inscrição é obrigatória em todas as épocas. Deve ser submetida até ao
          final do 3.º dia anterior ao exame. Bolseiros beneficiam de 50% de
          redução na melhoria de nota.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="flex flex-wrap gap-1">
            {(["Normal", "Recurso", "Especial"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPeriod(item)}
                className={cn(
                  "rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  period === item ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                Época {item}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {exams.map((exam) => {
            const isRegistered = registered.includes(exam.id);
            return (
              <div key={exam.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-muted/60 py-2">
                  <span className="font-display text-lg font-bold leading-none">
                    {formatDate(exam.date, { day: "2-digit" }).replace(/\D/g, "")}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {formatDate(exam.date, { month: "short" }).replace(".", "")}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{exam.unit}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock3 className="size-3" />{exam.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3" />Sala {exam.room}</span>
                    <span>{exam.school}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={isRegistered ? "Inscrito" : "Pendente"} />
                  <Button
                    size="sm"
                    variant={isRegistered ? "outline" : "default"}
                    onClick={() => toggle(exam.id, exam.unit, exam.type)}
                  >
                    {isRegistered ? <Check className="size-3.5" /> : <CalendarCheck className="size-3.5" />}
                    {isRegistered ? "Inscrito" : "Inscrever"}
                  </Button>
                  {isRegistered ? (
                    <details className="relative">
                      <summary className="cursor-pointer px-2 text-xs font-semibold text-muted-foreground">Mais</summary>
                      <button type="button" onClick={() => toast.success("Comprovativo gerado", { description: `${exam.unit} · época ${exam.type} (demonstração).` })} className="absolute right-0 top-full z-10 mt-1 whitespace-nowrap rounded border border-border bg-card p-2 text-xs shadow-lg">
                        Descarregar comprovativo
                      </button>
                    </details>
                  ) : null}
                </div>
              </div>
            );
          })}
          {exams.length === 0 ? (
            <div className="p-10 text-center">
              <CheckCircle2 className="mx-auto size-7 text-muted-foreground" />
              <p className="mt-3 text-sm font-semibold">Sem exames nesta época</p>
              <p className="mt-1 text-xs text-muted-foreground">A época especial é reservada a conclusão de curso.</p>
            </div>
          ) : null}
        </div>
      </div>

      <details className="border-t border-border pt-4">
        <summary className="cursor-pointer text-sm font-semibold">Ver regras e taxas das épocas</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
        {examPeriods.map((item) => (
          <div key={item.id} className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">{item.name}</h2>
              <Badge variant={item.fee === "Isenta" ? "success" : "sand"}>{item.fee}</Badge>
            </div>
            <p className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-300">{item.window}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            <ul className="mt-3 space-y-1.5">
              {item.rules.map((rule) => (
                <li key={rule} className="flex gap-1.5 text-[0.7rem] leading-relaxed text-muted-foreground">
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-brand-400" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </details>
    </div>
  );
}

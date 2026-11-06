"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { schedule } from "@/lib/data/portal";
import { cn, formatShortDate } from "@/lib/utils";

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"] as const;
const types = ["Todas", "Teórica", "Prática", "Laboratório", "Tutorial"] as const;

const typeStyles = {
  Teórica: "border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200",
  Prática: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  Laboratório: "border-sand-300 bg-sand-50 text-sand-900 dark:border-sand-800 dark:bg-sand-900/40 dark:text-sand-200",
  Tutorial: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-200",
} as const;

const weekDates: Record<(typeof days)[number], string> = {
  Segunda: "2026-11-02",
  Terça: "2026-11-03",
  Quarta: "2026-11-04",
  Quinta: "2026-11-05",
  Sexta: "2026-11-06",
};

export function ScheduleView() {
  const [view, setView] = useState<"semana" | "lista">("semana");
  const [type, setType] = useState<(typeof types)[number]>("Todas");
  const [weekOffset, setWeekOffset] = useState(0);

  const filtered = useMemo(
    () => (type === "Todas" ? schedule : schedule.filter((item) => item.type === type)),
    [type],
  );

  const weekLabel = useMemo(() => {
    const base = new Date("2026-11-02");
    base.setDate(base.getDate() + weekOffset * 7);
    const end = new Date(base);
    end.setDate(end.getDate() + 4);
    return `${formatShortDate(base.toISOString().slice(0, 10))} – ${formatShortDate(end.toISOString().slice(0, 10))}`;
  }, [weekOffset]);

  function exportCalendar() {
    toast.success("Horário exportado", {
      description: "Ficheiro .ics gerado com as aulas da semana (demonstração).",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekOffset((value) => value - 1)}
            aria-label="Semana anterior"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="text-center">
            <p className="text-xs font-semibold">Semana {weekLabel}</p>
            <p className="text-[0.65rem] text-muted-foreground">
              {weekOffset === 0 ? "Semana atual" : `${Math.abs(weekOffset)} semana(s) ${weekOffset < 0 ? "antes" : "depois"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWeekOffset((value) => value + 1)}
            aria-label="Semana seguinte"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
          {weekOffset !== 0 ? (
            <button type="button" onClick={() => setWeekOffset(0)} className="ml-1 text-[0.7rem] font-semibold text-primary">
              Hoje
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-md bg-muted p-0.5">
            {(["semana", "lista"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={cn(
                  "rounded-sm px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                  view === item ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <details className="relative">
            <summary className="cursor-pointer rounded-md border border-border px-3 py-2 text-xs font-semibold">Mais ações</summary>
            <div className="absolute right-0 top-full z-10 mt-1 flex min-w-36 flex-col rounded-md border border-border bg-card p-1 shadow-lg">
              <button type="button" onClick={exportCalendar} className="rounded px-3 py-2 text-left text-xs hover:bg-muted">Exportar horário</button>
              <button type="button" onClick={() => window.print()} className="rounded px-3 py-2 text-left text-xs hover:bg-muted">Imprimir</button>
            </div>
          </details>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="scrollbar-thin flex gap-1 overflow-x-auto">
          {types.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                type === item ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {view === "semana" ? (
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid grid-cols-5 border-b border-border bg-muted/40">
            {days.map((day) => (
              <div key={day} className="border-r border-border p-3 text-center last:border-r-0">
                <p className="text-xs font-semibold">{day}</p>
                <p className="text-[0.65rem] text-muted-foreground">{formatShortDate(weekDates[day])}</p>
              </div>
            ))}
          </div>
          <div className="grid min-h-[28rem] grid-cols-5 divide-x divide-border">
            {days.map((day) => {
              const items = filtered.filter((item) => item.day === day);
              return (
                <div key={day} className="space-y-1.5 p-2">
                  {items.map((item) => (
                    <div key={item.id} className={cn("rounded-xl border p-2.5", typeStyles[item.type])}>
                      <p className="text-[0.65rem] font-medium opacity-70">{item.start}–{item.end}</p>
                      <p className="mt-1 text-xs font-semibold leading-snug">{item.unit}</p>
                      <p className="mt-1 flex items-center gap-1 text-[0.6rem] opacity-80"><MapPin className="size-2.5" />{item.room}</p>
                      <p className="mt-0.5 text-[0.6rem] opacity-70">{item.type}</p>
                    </div>
                  ))}
                  {items.length === 0 ? (
                    <div className="grid h-20 place-items-center rounded-xl border border-dashed border-border text-[0.6rem] text-muted-foreground">
                      Sem aulas
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {days.map((day) => {
            const items = filtered.filter((item) => item.day === day);
            if (!items.length) return null;
            return (
              <div key={day} className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
                  <p className="text-sm font-semibold">{day}</p>
                  <Badge variant="outline">{items.length} aulas</Badge>
                </div>
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-4">
                      <div className="w-20 shrink-0 text-xs font-semibold">
                        {item.start}
                        <span className="block text-[0.65rem] font-normal text-muted-foreground">até {item.end}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{item.unit}</p>
                        <p className="text-xs text-muted-foreground">{item.room} · {item.type}</p>
                      </div>
                      <span className={cn("rounded-sm border px-2.5 py-0.5 text-[0.6rem] font-semibold", typeStyles[item.type])}>
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="rounded-2xl border border-border bg-card px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Este horário é demonstrativo e pode sofrer alterações ao longo do semestre.
        Confirma sempre a versão oficial publicada pela tua escola.
      </p>
    </div>
  );
}

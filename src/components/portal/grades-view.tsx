"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Calculator,
  Download,
  FileText,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/portal/status-badge";
import { grades, studentSummary } from "@/lib/data/portal";
import { cn, formatShortDate } from "@/lib/utils";

const semesters = ["Todos", "2026/2027 · 1.º S", "2025/2026 · 1.º S"];

const pendingUnits = grades.filter((grade) => grade.status === "Em avaliação");

export function GradesView() {
  const [semester, setSemester] = useState("Todos");
  const [expected, setExpected] = useState<Record<string, number>>(
    Object.fromEntries(pendingUnits.map((unit) => [unit.id, 15])),
  );

  const filtered = useMemo(
    () => (semester === "Todos" ? grades : grades.filter((grade) => grade.semester === semester)),
    [semester],
  );

  const chartData = useMemo(
    () => grades.map((grade) => ({ name: grade.unit.split(" ")[0], nota: grade.grade })),
    [],
  );

  const projected = useMemo(() => {
    const completedEcts = studentSummary.completedEcts;
    const base = studentSummary.average * completedEcts;
    const extra = pendingUnits.reduce((sum, unit) => sum + (expected[unit.id] ?? 0) * unit.ects, 0);
    const extraEcts = pendingUnits.reduce((sum, unit) => sum + unit.ects, 0);
    return (base + extra) / (completedEcts + extraEcts);
  }, [expected]);

  const approvedEcts = grades
    .filter((grade) => grade.status === "Aprovado")
    .reduce((sum, grade) => sum + grade.ects, 0);
  function downloadPauta(name: string) {
    toast.success("Pauta descarregada", { description: `${name} (demonstração).` });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Média atual", value: studentSummary.average.toFixed(1), hint: "Escala 0–20", icon: TrendingUp, tone: "text-brand-600" },
          { label: "ECTS aprovados", value: approvedEcts, hint: "Neste ano letivo", icon: BookOpen, tone: "text-emerald-600" },
          { label: "Em avaliação", value: pendingUnits.length, hint: "Resultados em falta", icon: GraduationCap, tone: "text-ember-600" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <Icon className={cn("size-4", item.tone)} />
              </div>
              <p className="font-display mt-2 text-2xl font-semibold">{item.value}</p>
              <p className="truncate text-xs text-muted-foreground">{item.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Notas por unidade curricular</h2>
              <p className="text-xs text-muted-foreground">Classificações de 2025/2026 e 2026/2027</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {semesters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSemester(item)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-[0.7rem] font-semibold transition-colors",
                    semester === item ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={40} />
                <YAxis domain={[0, 20]} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, color: "var(--foreground)" }}
                  formatter={(value) => [`${value} valores`, "Nota"]}
                />
                <Bar dataKey="nota" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.nota >= 16 ? "#2f8cf5" : entry.nota >= 14 ? "#f2b233" : "#f16a6a"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
              <Calculator className="size-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">Simulador de média</h2>
              <p className="text-[0.7rem] text-muted-foreground">Projeta a média final</p>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            {pendingUnits.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between gap-3">
                <label htmlFor={`expected-${unit.id}`} className="min-w-0 flex-1 truncate text-xs font-medium">
                  {unit.unit}
                </label>
                <Input
                  id={`expected-${unit.id}`}
                  type="number"
                  min={0}
                  max={20}
                  value={expected[unit.id]}
                  onChange={(event) =>
                    setExpected((current) => ({
                      ...current,
                      [unit.id]: Math.min(20, Math.max(0, Number(event.target.value) || 0)),
                    }))
                  }
                  className="h-9 w-16 text-center text-sm"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-brand-700 p-4 text-white">
            <p className="text-xs font-semibold text-sand-200">Média projetada</p>
            <p className="font-display mt-1 text-3xl font-bold">{projected.toFixed(2)}</p>
            <p className="mt-0.5 text-xs text-white/60">
              {projected >= studentSummary.average ? "Acima da média atual" : "Abaixo da média atual"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card">
        <div className="flex flex-col gap-2 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Pautas e classificações</h2>
            <p className="text-xs text-muted-foreground">{filtered.length} unidades curriculares</p>
          </div>
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer">Sobre estes dados</summary>
            <p className="mt-1">Atualizado a {formatShortDate("2026-11-05")}</p>
          </details>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="px-5 py-3">Unidade curricular</th>
                <th className="px-3 py-3">Semestre</th>
                <th className="px-3 py-3">ECTS</th>
                <th className="px-3 py-3">Nota</th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((grade) => (
                <tr key={grade.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium">{grade.unit}</td>
                  <td className="px-3 py-3 text-xs text-muted-foreground">{grade.semester}</td>
                  <td className="px-3 py-3 text-muted-foreground">{grade.ects}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "font-display text-base font-bold",
                        grade.grade >= 16 ? "text-emerald-600 dark:text-emerald-400" : grade.grade >= 10 ? "text-foreground" : "text-ember-600",
                      )}
                    >
                      {grade.grade}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={grade.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            As classificações em avaliação são provisórias e podem ser alteradas.
          </p>
          <details className="text-xs">
            <summary className="cursor-pointer font-semibold text-primary">Mais ações</summary>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => downloadPauta("Pauta do 1.º semestre 2026/2027")}>
                <Download className="size-3.5" /> Descarregar pauta
              </Button>
              <Button size="sm" onClick={() => toast.success("Certidão solicitada", { description: "Fica disponível em Documentos assim que emitida." })}>
                <FileText className="size-3.5" /> Pedir certidão
              </Button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

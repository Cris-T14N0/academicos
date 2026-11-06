"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  GraduationCap,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/portal/status-badge";
import { enrolledUnits } from "@/lib/data/portal";
import { cn } from "@/lib/utils";

const optionalUnits = [
  { code: "ESGT-315", name: "Desenvolvimento Web Avançado", ects: 3, vacancies: 18 },
  { code: "ESGT-316", name: "Introdução à Ciência de Dados", ects: 3, vacancies: 12 },
  { code: "ESGT-317", name: "Empreendedorismo Digital", ects: 3, vacancies: 24 },
];

const history = [
  { year: "2025/2026", yearLabel: "1.º ano", units: 10, ects: 60, average: 15.4, status: "Concluído" },
  { year: "2026/2027", yearLabel: "2.º ano", units: 6, ects: 27, average: 16.0, status: "Em curso" },
];

const documents = [
  "Comprovativo de identificação",
  "Fotografia atualizada",
  "Declaração de situação militar (se aplicável)",
  "Comprovativo de bolsa (se aplicável)",
];

export function EnrollmentView() {
  const [status, setStatus] = useState<"Inscrito" | "Renovada">("Inscrito");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);

  const totalEcts = useMemo(
    () =>
      enrolledUnits.reduce((sum, unit) => sum + unit.ects, 0) +
      optionalUnits.filter((unit) => selected.includes(unit.code)).reduce((sum, unit) => sum + unit.ects, 0),
    [selected],
  );

  function toggleOptional(code: string) {
    setSelected((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code],
    );
  }

  async function confirmEnrollment() {
    setConfirming(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setConfirming(false);
    setStatus("Renovada");
    setDialogOpen(false);
    toast.success("Renovação submetida", {
      description: `${totalEcts} ECTS inscritos em 2026/2027 (demonstração).`,
    });
  }

  function requestDoc(doc: string) {
    toast.success("Documento disponível", { description: `${doc} (demonstração).` });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Estado da inscrição", value: status === "Inscrito" ? "Inscrito" : "Renovada", icon: ClipboardCheck, tone: "text-emerald-600" },
          { label: "Ano curricular", value: "2.º ano", icon: GraduationCap, tone: "text-brand-600" },
          { label: "ECTS inscritos", value: `${totalEcts} ECTS`, icon: CheckCircle2, tone: "text-sand-600" },
          { label: "Prazo de renovação", value: "31 de agosto", icon: CalendarClock, tone: "text-ember-600" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </p>
                <Icon className={cn("size-4", item.tone)} />
              </div>
              <p className="font-display mt-2 text-xl font-semibold">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-border bg-card">
          <div className="flex flex-col gap-2 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Unidades curriculares inscritas</h2>
              <p className="text-xs text-muted-foreground">2026/2027 · 1.º semestre</p>
            </div>
            <Badge variant="success">
              <Check className="size-3.5" />
              Inscrição validada
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="px-5 py-3">Unidade curricular</th>
                  <th className="px-3 py-3">Docente</th>
                  <th className="px-3 py-3">ECTS</th>
                  <th className="px-3 py-3">Assiduidade</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {enrolledUnits.map((unit) => (
                  <tr key={unit.code} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{unit.name}</p>
                      <p className="text-[0.65rem] text-muted-foreground">{unit.code}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{unit.teacher}</td>
                    <td className="px-3 py-3 text-muted-foreground">{unit.ects}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={unit.attendance} className="h-1.5 w-14" />
                        <span className="text-xs text-muted-foreground">{unit.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status="Aprovado" />
                    </td>
                  </tr>
                ))}
                {optionalUnits
                  .filter((unit) => selected.includes(unit.code))
                  .map((unit) => (
                    <tr key={unit.code} className="border-b border-border bg-brand-50/40 last:border-0 dark:bg-brand-950/20">
                      <td className="px-5 py-3">
                        <p className="font-medium">{unit.name}</p>
                        <p className="text-[0.65rem] text-muted-foreground">{unit.code} · opção</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">A designar</td>
                      <td className="px-3 py-3 text-muted-foreground">{unit.ects}</td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">—</td>
                      <td className="px-5 py-3">
                        <StatusBadge status="Pendente" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {enrolledUnits.length + selected.length} unidades · {totalEcts} ECTS
            </p>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <ClipboardCheck className="size-4" />
              {status === "Inscrito" ? "Renovar inscrição" : "Alterar inscrição"}
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold">Renovação de inscrição</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              O prazo decorre de 15 de julho a 31 de agosto. As unidades de opção
              têm vagas limitadas.
            </p>
            <ol className="mt-4 space-y-3">
              {[
                { label: "Dados confirmados", done: true },
                { label: "Unidades selecionadas", done: true },
                { label: "Pagamento da taxa", done: true },
                { label: "Validação dos serviços", done: status === "Renovada" },
              ].map((step) => (
                <li key={step.label} className="flex items-center gap-2.5 text-xs">
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full",
                      step.done ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {step.done ? <Check className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
                  </span>
                  <span className={step.done ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold">
              <FileText className="size-4 text-brand-500" />
              Documentos necessários
            </h2>
            <div className="mt-3 space-y-1.5">
              {documents.map((doc) => (
                <button
                  key={doc}
                  type="button"
                  onClick={() => requestDoc(doc)}
                  className="flex w-full items-center justify-between gap-2 rounded-xl border border-border px-3 py-2 text-left text-xs transition-colors hover:border-brand-300"
                >
                  <span>{doc}</span>
                  <Download className="size-3.5 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-2xl bg-sand-50 p-4 text-xs leading-relaxed text-sand-900 dark:bg-sand-900/30 dark:text-sand-200">
            <Info className="mt-0.5 size-4 shrink-0" />
            A renovação só é considerada concluída após validação pelos serviços
            académicos da tua escola.
          </div>
        </aside>
      </div>

      <div className="rounded-3xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-display text-lg font-semibold">Histórico de inscrições</h2>
          <p className="text-xs text-muted-foreground">Percurso académico na UPSantarém</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="px-5 py-3">Ano letivo</th>
                <th className="px-3 py-3">Ano curricular</th>
                <th className="px-3 py-3">Unidades</th>
                <th className="px-3 py-3">ECTS</th>
                <th className="px-3 py-3">Média</th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.year} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium">{row.year}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.yearLabel}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.units}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.ects}</td>
                  <td className="px-3 py-3 font-semibold">{row.average.toFixed(1)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status === "Concluído" ? "Concluído" : "Em progresso"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialogOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm" onClick={() => setDialogOpen(false)} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div>
                <h2 className="font-display text-lg font-semibold">Renovar inscrição 2026/2027</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Seleciona as unidades de opção que queres frequentar.</p>
              </div>
              <button type="button" onClick={() => setDialogOpen(false)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted" aria-label="Fechar">
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-5">
              <p className="text-xs font-medium text-muted-foreground">Obrigatórias · 27 ECTS</p>
              <div className="mt-2 space-y-1.5">
                {enrolledUnits.map((unit) => (
                  <div key={unit.code} className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-xs">
                    <span>{unit.name}</span>
                    <span className="text-muted-foreground">{unit.ects} ECTS</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-medium text-muted-foreground">Opcionais</p>
              <div className="mt-2 space-y-2">
                {optionalUnits.map((unit) => {
                  const active = selected.includes(unit.code);
                  return (
                    <button
                      key={unit.code}
                      type="button"
                      onClick={() => toggleOptional(unit.code)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-3 text-left text-xs transition-colors",
                        active
                          ? "border-brand-400 bg-brand-50 dark:border-brand-700 dark:bg-brand-950"
                          : "border-border hover:border-brand-300",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-md border",
                          active ? "border-brand-600 bg-brand-600 text-white" : "border-input",
                        )}
                      >
                        {active ? <Check className="size-3" /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{unit.name}</span>
                        <span className="text-muted-foreground">{unit.code} · {unit.vacancies} vagas</span>
                      </span>
                      <span className="text-muted-foreground">{unit.ects} ECTS</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3 text-sm">
                <span className="text-muted-foreground">Total a inscrever</span>
                <span className="font-display font-semibold">{totalEcts} ECTS</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border p-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmEnrollment} disabled={confirming}>
                {confirming ? <Loader2 className="size-4 animate-spin" /> : <ClipboardCheck className="size-4" />}
                {confirming ? "A submeter…" : "Confirmar renovação"}
                {!confirming ? <ArrowRight className="size-4" /> : null}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

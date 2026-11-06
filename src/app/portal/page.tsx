import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
} from "lucide-react";

import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { ProgressChart } from "@/components/portal/progress-chart";
import { StatCard } from "@/components/portal/stat-card";
import { StatusBadge } from "@/components/portal/status-badge";
import { Progress } from "@/components/ui/progress";
import {
  enrolledUnits,
  grades,
  portalRequests,
  schedule,
  studentSummary,
  upcomingEvents,
} from "@/lib/data/portal";
import { formatCurrency, formatDate, formatShortDate } from "@/lib/utils";

export const metadata = {
  title: "Visão geral",
};

const today = "Segunda";

export default function PortalDashboardPage() {
  const todayClasses = schedule.filter((item) => item.day === today);
  const nextClass = todayClasses[0];
  const recentGrades = grades.filter((grade) => grade.status !== "Aprovado").slice(0, 3);
  const ectsProgress = Math.round((studentSummary.completedEcts / studentSummary.totalEcts) * 100);

  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Olá, Mariana"
        description="Ano letivo 2026/2027 · 1.º semestre"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Média atual" value={studentSummary.average.toFixed(1)} hint="Escala de 0 a 20" />
        <StatCard
          label="ECTS concluídos"
          value={`${studentSummary.completedEcts} / ${studentSummary.totalEcts}`}
          hint="do curso"
          progress={ectsProgress}
        />
        <StatCard
          label="Conta corrente"
          value={studentSummary.tuitionBalance === 0 ? "Em dia" : formatCurrency(studentSummary.tuitionBalance)}
          hint={`Próximo pagamento ${formatShortDate(studentSummary.nextPayment.due)}`}
        />
      </div>

      <details className="rounded-3xl border border-border bg-card p-5">
        <summary className="cursor-pointer font-display text-lg font-semibold">Evolução da média</summary>
        <p className="mt-1 text-xs text-muted-foreground">Média ponderada por semestre</p>
        <div className="mt-4">
          <ProgressChart />
        </div>
      </details>

      <div>
        <div className="max-w-lg rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Próxima aula</h2>
            <Link href="/portal/horarios" className="text-xs font-semibold text-primary">
              Horário
            </Link>
          </div>
          {nextClass ? (
            <div className="mt-4 rounded-md bg-brand-700 p-4 text-white">
              <p className="text-xs font-semibold text-sand-200">
                {nextClass.type}
              </p>
              <p className="font-display mt-1 text-lg font-semibold leading-snug">{nextClass.unit}</p>
              <div className="mt-3 space-y-1.5 text-xs text-white/75">
                <p className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-sand-300" />
                  {nextClass.start} — {nextClass.end}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-sand-300" />
                  Sala {nextClass.room}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

        <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Próximos prazos e eventos</h2>
            <Link href="/portal/horarios" className="text-xs font-semibold text-primary">
              Calendário
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {upcomingEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-center dark:bg-brand-950">
                  <span className="text-[0.6rem] font-medium text-brand-600 dark:text-brand-300">
                    {formatShortDate(event.date).split("/")[1]}
                  </span>
                  <span className="font-display text-sm font-bold leading-none text-brand-700 dark:text-brand-200">
                    {formatShortDate(event.date).split("/")[0]}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.category} · {formatDate(event.date, { day: "2-digit", month: "long" })}
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Requerimentos</h2>
            <Link href="/portal/documentos" className="text-xs font-semibold text-primary">
              Ver todos
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {portalRequests.slice(0, 1).map((request) => (
              <div key={request.id} className="rounded-2xl border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold leading-snug">{request.type}</p>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-1 text-[0.65rem] text-muted-foreground">{formatShortDate(request.submitted)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Avaliações em curso</h2>
            <Link href="/portal/notas" className="text-xs font-semibold text-primary">
              Ver notas
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                  <th className="pb-2 pr-3">Unidade curricular</th>
                  <th className="pb-2 pr-3">ECTS</th>
                  <th className="pb-2 pr-3">Nota</th>
                  <th className="pb-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentGrades.map((grade) => (
                  <tr key={grade.id} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-3 font-medium">{grade.unit}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{grade.ects}</td>
                    <td className="py-2.5 pr-3 font-semibold">{grade.grade}</td>
                    <td className="py-2.5">
                      <StatusBadge status={grade.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <details className="rounded-3xl border border-border bg-card p-5">
          <summary className="cursor-pointer font-display text-lg font-semibold">Assiduidade</summary>
          <p className="mt-1 text-xs text-muted-foreground">Presença por unidade curricular</p>
          <div className="mt-4 space-y-3">
            {[...enrolledUnits]
              .sort((a, b) => b.attendance - a.attendance)
              .slice(0, 3)
              .map((unit) => (
                <div key={unit.code}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{unit.name}</span>
                    <span className={unit.attendance < 85 ? "font-semibold text-ember-600 dark:text-ember-400" : "text-muted-foreground"}>
                      {unit.attendance}%
                    </span>
                  </div>
                  <Progress
                    value={unit.attendance}
                    className="mt-1.5 h-1.5"
                    barClassName={unit.attendance < 85 ? "from-ember-400 to-ember-600" : undefined}
                  />
                </div>
              ))}
          </div>
          <Link href="/portal/matriculas" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            Ver inscrições
            <ArrowRight className="size-3.5" />
          </Link>
        </details>
      </div>

    </div>
  );
}

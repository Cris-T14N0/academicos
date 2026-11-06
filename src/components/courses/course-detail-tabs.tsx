"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";

import type { Course } from "@/lib/data/courses";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "apresentacao", label: "Apresentação" },
  { id: "plano", label: "Plano de estudos" },
  { id: "acesso", label: "Acesso" },
  { id: "saidas", label: "Saídas profissionais" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function CourseDetailTabs({ course }: { course: Course }) {
  const [active, setActive] = useState<TabId>("apresentacao");
  const totalEcts = course.curriculum.reduce(
    (sum, year) => sum + year.units.reduce((yearSum, unit) => yearSum + unit.ects, 0),
    0,
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Conteúdo do curso"
        className="scrollbar-thin flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              active === tab.id
                ? "bg-brand-600 text-white shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "apresentacao" ? (
          <div className="space-y-8">
            <div className="prose-institutional max-w-none text-sm leading-relaxed text-muted-foreground">
              <h2 className="!mt-0 font-display text-2xl font-semibold text-foreground">
                Sobre o curso
              </h2>
              <p>{course.description}</p>
              <p>
                O percurso está organizado em torno de competências técnicas,
                projetos práticos e contacto com o contexto profissional. Ao longo
                dos semestres, trabalhas em equipa, desenvolves autonomia e
                constróis um portefólio de aprendizagens.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold">Porquê escolher este curso?</h3>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {course.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex gap-3 border-t border-border py-3"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-start gap-4">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Coordenação
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold">
                    {course.coordinator}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Acompanha o percurso académico, a organização do curso e a
                    ligação aos estudantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {active === "plano" ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold">Plano de estudos</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.duration} · {totalEcts} ECTS no total
                </p>
              </div>
              <Badge variant="outline">
                <Layers3 className="size-3.5" />
                {course.curriculum.length} anos curriculares
              </Badge>
            </div>
            <div className="mt-6 space-y-4">
              {course.curriculum.map((year) => (
                <div
                  key={`${year.year}-${year.semester}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3">
                    <h3 className="font-semibold">
                      {year.year}.º ano · {year.semester}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {year.units.reduce((sum, unit) => sum + unit.ects, 0)} ECTS
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {year.units.map((unit) => (
                      <div
                        key={unit.code}
                        className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[0.68rem] text-muted-foreground">
                            {unit.code}
                          </span>
                          <span className="font-medium">{unit.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={unit.type === "Obrigatória" ? "outline" : "sand"}
                            className="px-2 py-0.5 text-[0.65rem]"
                          >
                            {unit.type}
                          </Badge>
                          <span className="w-12 text-right text-xs text-muted-foreground">
                            {unit.ects} ECTS
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {active === "acesso" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="border-t border-border pt-6">
              <ClipboardList className="size-5 text-primary" />
              <h3 className="font-display mt-4 text-lg font-semibold">
                Condições de acesso
              </h3>
              <ul className="mt-4 space-y-3">
                {course.access.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-6">
              <Sparkles className="size-5 text-muted-foreground" />
              <h3 className="font-display mt-4 text-lg font-semibold">
                Propinas e taxas
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span>Taxa de candidatura</span>
                  <span className="font-semibold text-foreground">40 €</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span>Taxa de inscrição</span>
                  <span className="font-semibold text-foreground">40 €</span>
                </li>
                <li className="flex justify-between gap-3 border-b border-border pb-2">
                  <span>Propina anual</span>
                  <span className="font-semibold text-foreground">697 €</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Seguro escolar</span>
                  <span className="font-semibold text-foreground">Valor anual</span>
                </li>
              </ul>
            </div>
            <div className="border-t border-border pt-6 sm:col-span-2">
              <h3 className="font-display text-lg font-semibold">Documentos necessários</h3>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-3">
                {[
                  "Documento de identificação",
                  "Certificado de habilitações",
                  "Comprovativo de provas de ingresso",
                  "Fotografia atualizada",
                  "Comprovativo de IBAN",
                  "Declaração de compromisso de honra",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 border-t border-border py-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="size-3.5 shrink-0 text-muted-foreground" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {active === "saidas" ? (
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-ember-50 text-ember-700 dark:bg-ember-900/50 dark:text-ember-200">
                <BriefcaseBusiness className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold">Saídas profissionais</h2>
                <p className="text-sm text-muted-foreground">
                  Onde podes trabalhar depois de concluir o curso.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {course.careers.map((career, index) => (
                <div
                  key={career}
                  className="flex items-start gap-4 border-t border-border py-4"
                >
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed">{career}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A UPSantarém mantém uma rede ativa de parcerias com empresas,
                instituições e organizações da região, promovendo estágios,
                projetos e oportunidades de emprego para os seus estudantes.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

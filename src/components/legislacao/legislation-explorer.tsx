"use client";

import { useMemo, useState } from "react";
import {
  BookMarked,
  Download,
  ExternalLink,
  FileText,
  Search,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Law = {
  id: string;
  title: string;
  kind: "Lei" | "Decreto-Lei" | "Portaria" | "Despacho" | "Regulamento";
  reference: string;
  year: number;
  summary: string;
  category: "Acesso e ingresso" | "Graus e diplomas" | "Avaliação" | "Estatutos e organização" | "Apoios sociais";
  href?: string;
};

const laws: Law[] = [
  {
    id: "l1",
    title: "Regime jurídico das instituições de ensino superior",
    kind: "Lei",
    reference: "Lei n.º 62/2007",
    year: 2007,
    summary: "Define o regime jurídico, a autonomia e a organização das instituições de ensino superior.",
    category: "Estatutos e organização",
  },
  {
    id: "l2",
    title: "Regime jurídico dos graus e diplomas do ensino superior",
    kind: "Decreto-Lei",
    reference: "Decreto-Lei n.º 74/2006",
    year: 2006,
    summary: "Estabelece os graus académicos, a estrutura dos ciclos de estudos e o sistema europeu de créditos (ECTS).",
    category: "Graus e diplomas",
  },
  {
    id: "l3",
    title: "Concurso especial para maiores de 23 anos",
    kind: "Decreto-Lei",
    reference: "Decreto-Lei n.º 64/2006",
    year: 2006,
    summary: "Regula as provas de acesso e ingresso no ensino superior para candidatos maiores de 23 anos.",
    category: "Acesso e ingresso",
  },
  {
    id: "l4",
    title: "Regime de acesso e ingresso no ensino superior",
    kind: "Decreto-Lei",
    reference: "Decreto-Lei n.º 296-A/98",
    year: 1998,
    summary: "Define as condições gerais de acesso, provas de ingresso e concurso nacional de acesso.",
    category: "Acesso e ingresso",
  },
  {
    id: "l5",
    title: "Estatutos da Universidade Politécnica de Santarém",
    kind: "Regulamento",
    reference: "Regulamento n.º 621/2021",
    year: 2021,
    summary: "Aprova os estatutos da UPSantarém, incluindo órgãos de governo, escolas e serviços.",
    category: "Estatutos e organização",
  },
  {
    id: "l6",
    title: "Regulamento de avaliação de conhecimentos",
    kind: "Regulamento",
    reference: "Regulamento n.º 412/2024",
    year: 2024,
    summary: "Define as modalidades de avaliação, épocas de exame, classificação e melhoria de nota.",
    category: "Avaliação",
  },
  {
    id: "l7",
    title: "Linhas orientadoras de avaliação",
    kind: "Despacho",
    reference: "Despacho n.º 97/2023",
    year: 2023,
    summary: "Orientações gerais sobre métodos de avaliação e harmonização de práticas entre escolas.",
    category: "Avaliação",
  },
  {
    id: "l8",
    title: "Atribuição de bolsas de estudo no ensino superior",
    kind: "Portaria",
    reference: "Portaria n.º 209/2024",
    year: 2024,
    summary: "Regula a atribuição de bolsas de ação social direta e indireta aos estudantes.",
    category: "Apoios sociais",
  },
  {
    id: "l9",
    title: "Estatuto do estudante com necessidades especiais",
    kind: "Decreto-Lei",
    reference: "Decreto-Lei n.º 198/2001",
    year: 2001,
    summary: "Garante condições de acesso, frequência e avaliação para estudantes com necessidades especiais.",
    category: "Apoios sociais",
  },
  {
    id: "l10",
    title: "Regime de propinas e emolumentos",
    kind: "Lei",
    reference: "Lei n.º 37/2003",
    year: 2003,
    summary: "Estabelece as bases do financiamento do ensino superior e o regime de propinas.",
    category: "Estatutos e organização",
  },
  {
    id: "l11",
    title: "Reconhecimento de qualificações estrangeiras",
    kind: "Decreto-Lei",
    reference: "Decreto-Lei n.º 66/2018",
    year: 2018,
    summary: "Regula o reconhecimento de graus e diplomas estrangeiros de ensino superior em Portugal.",
    category: "Graus e diplomas",
  },
  {
    id: "l12",
    title: "Estatuto do estudante internacional",
    kind: "Decreto-Lei",
    reference: "Decreto-Lei n.º 36/2014",
    year: 2014,
    summary: "Define o regime de acesso de estudantes internacionais às instituições de ensino superior portuguesas.",
    category: "Acesso e ingresso",
  },
];

const categories = [
  "Todos",
  "Acesso e ingresso",
  "Graus e diplomas",
  "Avaliação",
  "Estatutos e organização",
  "Apoios sociais",
] as const;

const kindTone: Record<Law["kind"], string> = {
  Lei: "variant-default",
  "Decreto-Lei": "variant-default",
  Portaria: "variant-sand",
  Despacho: "variant-outline",
  Regulamento: "variant-success",
};

export function LegislationExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");

  const filtered = useMemo(() => {
    const normalised = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return laws.filter((law) => {
      if (category !== "Todos" && law.category !== category) return false;
      if (!normalised) return true;
      return `${law.title} ${law.reference} ${law.summary}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalised);
    });
  }, [query, category]);

  function download(law: Law) {
    toast.success("Documento solicitado", {
      description: `${law.reference} · ${law.title} (demonstração)`,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border-t border-border pt-3">
          <p className="mb-2 flex items-center gap-1.5 px-3 pt-1 text-xs font-medium text-muted-foreground">
            <BookMarked className="size-3.5" />
            Áreas
          </p>
          <div className="space-y-0.5">
            {categories.map((item) => {
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors",
                    category === item
                      ? "bg-brand-600 font-semibold text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Nota</p>
          <p className="mt-1">
            A compilação é meramente informativa. Em caso de divergência, prevalece
            o texto publicado em Diário da República.
          </p>
        </div>
      </aside>

      <div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar por diploma, número ou tema…"
            aria-label="Pesquisar legislação"
            className="pl-10"
          />
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "diploma" : "diplomas"}
          {category !== "Todos" ? ` em ${category}` : ""}
        </div>

        <div className="mt-4 space-y-2">
          {filtered.map((law) => (
            <div key={law.id} className="border-t border-border py-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    kindTone[law.kind] === "variant-sand"
                      ? "sand"
                      : kindTone[law.kind] === "variant-outline"
                        ? "outline"
                        : kindTone[law.kind] === "variant-success"
                          ? "success"
                          : "default"
                  }
                  className="px-2 py-0 text-[0.6rem]"
                >
                  {law.kind}
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground">{law.reference}</span>
              </div>
              <h3 className="font-display mt-2 text-base font-semibold leading-snug">{law.title}</h3>
              <details className="mt-1 text-sm text-muted-foreground">
                <summary className="w-fit cursor-pointer">Resumo</summary>
                <p className="mt-1 leading-relaxed">{law.summary}</p>
              </details>
              <div className="mt-3 flex flex-wrap gap-2">
                {law.href ? (
                  <a
                    href={law.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-semibold transition-colors hover:border-brand-300 hover:text-primary",
                    )}
                  >
                    Abrir diploma
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => download(law)}>
                    <Download className="size-3.5" />
                    Descarregar PDF
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <FileText className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold">Nenhum diploma encontrado</p>
            <p className="mt-1 text-xs text-muted-foreground">Tenta outro termo ou área.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

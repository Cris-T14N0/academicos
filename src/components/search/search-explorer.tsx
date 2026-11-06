"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  FileText,
  GraduationCap,
  Newspaper,
  Search,
  UserRound,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { courses } from "@/lib/data/courses";
import { documents } from "@/lib/data/documents";
import { news } from "@/lib/data/news";
import { schools } from "@/lib/data/schools";
import { cn } from "@/lib/utils";

type SearchKind = "curso" | "documento" | "notícia" | "escola" | "pessoa" | "UC";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SearchKind;
};

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const kindMeta: Record<
  SearchKind,
  { label: string; icon: typeof BookOpen; tone: string }
> = {
  curso: { label: "Cursos", icon: GraduationCap, tone: "bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300" },
  documento: { label: "Documentos", icon: FileText, tone: "bg-sand-100 text-sand-700 dark:bg-sand-900 dark:text-sand-200" },
  "notícia": { label: "Notícias", icon: Newspaper, tone: "bg-ember-50 text-ember-700 dark:bg-ember-900/50 dark:text-ember-200" },
  escola: { label: "Escolas", icon: Building2, tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" },
  pessoa: { label: "Pessoas", icon: UserRound, tone: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
  UC: { label: "Unidades curriculares", icon: BookOpen, tone: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
};

const filters: { label: string; value: SearchKind | "tudo" }[] = [
  { label: "Tudo", value: "tudo" },
  { label: "Cursos", value: "curso" },
  { label: "Documentos", value: "documento" },
  { label: "Notícias", value: "notícia" },
  { label: "Escolas", value: "escola" },
  { label: "Pessoas", value: "pessoa" },
  { label: "Unidades curriculares", value: "UC" },
];

const popular = ["Engenharia Informática", "Enfermagem", "Matrícula", "Exames", "Erasmus"];

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  courses.forEach((course) => {
    const school = schools.find((item) => item.id === course.schoolId);
    results.push({
      id: `curso-${course.slug}-${course.degree}`,
      title: `${course.name} (${course.degree})`,
      description: `${school?.short ?? ""} · ${course.duration} · ${course.ects} ECTS`,
      href: `/cursos/${course.slug}`,
      kind: "curso",
    });
    results.push({
      id: `pessoa-${course.coordinator}-${course.slug}`,
      title: course.coordinator,
      description: `Coordenação de ${course.name}`,
      href: `/cursos/${course.slug}`,
      kind: "pessoa",
    });
    course.curriculum.forEach((year) => {
      year.units.forEach((unit) => {
        results.push({
          id: `uc-${unit.code}-${course.slug}`,
          title: unit.name,
          description: `${course.name} · ${year.year}.º ano · ${unit.ects} ECTS`,
          href: `/cursos/${course.slug}`,
          kind: "UC",
        });
      });
    });
  });

  documents.forEach((doc) => {
    results.push({
      id: doc.id,
      title: doc.title,
      description: `${doc.category} · ${doc.type} · ${doc.size}`,
      href: `/links-documentos?categoria=${encodeURIComponent(doc.category)}`,
      kind: "documento",
    });
  });

  news.forEach((item) => {
    results.push({
      id: `news-${item.slug}`,
      title: item.title,
      description: `${item.category} · ${item.excerpt}`,
      href: `/noticias/${item.slug}`,
      kind: "notícia",
    });
  });

  schools.forEach((school) => {
    results.push({
      id: `school-${school.id}`,
      title: school.name,
      description: school.description,
      href: `/ensino?escola=${school.id}`,
      kind: "escola",
    });
  });

  return results;
}

export function SearchExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchKind | "tudo">("tudo");
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const normalized = normalise(query.trim());
    const filtered = filter === "tudo" ? index : index.filter((item) => item.kind === filter);
    if (!normalized) {
      return filtered.filter((item) => item.kind === "curso").slice(0, 8);
    }
    const tokens = normalized.split(/\s+/).filter(Boolean);
    return filtered
      .map((item) => {
        const haystack = normalise(`${item.title} ${item.description}`);
        const score = tokens.reduce(
          (sum, token) => sum + (haystack.includes(token) ? (item.title.toLowerCase().includes(token) ? 3 : 1) : 0),
          0,
        );
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map((entry) => entry.item);
  }, [index, query, filter]);

  const grouped = useMemo(() => {
    return results.reduce<Record<SearchKind, SearchResult[]>>(
      (acc, result) => {
        acc[result.kind].push(result);
        return acc;
      },
      { curso: [], documento: [], "notícia": [], escola: [], pessoa: [], UC: [] },
    );
  }, [results]);

  return (
    <div>
      <div className="border-y border-border py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar cursos, documentos, pessoas, UCs…"
            aria-label="Pesquisar no portal"
            className="h-13 pl-12 text-base"
          />
        </div>
        <div className="scrollbar-thin mt-3 flex gap-1 overflow-x-auto pb-1">
          {filters.slice(0, 5).map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "shrink-0 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors",
                filter === item.value
                  ? "bg-brand-600 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {!query ? (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs font-medium text-muted-foreground">
            Sugestões
          </span>
          {popular.slice(0, 3).map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand-300 hover:text-primary"
            >
              {term}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "resultado" : "resultados"} para{" "}
          <strong className="text-foreground">“{query}”</strong>
        </p>
      )}

      <div className="mt-6 space-y-8">
        {filter === "tudo" && query
          ? (Object.keys(grouped) as SearchKind[]).map((kind) => {
              const items = grouped[kind];
              if (!items.length) return null;
              const meta = kindMeta[kind];
              const Icon = meta.icon;
              return (
                <section key={kind}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={cn("grid size-8 place-items-center rounded-xl", meta.tone)}>
                      <Icon className="size-4" />
                    </span>
                    <h2 className="font-display text-lg font-semibold">{meta.label}</h2>
                  </div>
                  <div className="space-y-2">
                    {items.slice(0, 6).map((item) => (
                      <ResultRow key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })
          : results.length > 0
            ? (
              <section>
                <div className="space-y-2">
                  {results.map((item) => (
                    <ResultRow key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )
            : (
              <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <Search className="mx-auto size-7 text-muted-foreground" />
                <h2 className="font-display mt-3 text-lg font-semibold">
                  Sem resultados
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tenta outra palavra ou remove o filtro de categoria.
                </p>
              </div>
            )}
      </div>
    </div>
  );
}

function ResultRow({ item }: { item: SearchResult }) {
  const meta = kindMeta[item.kind];
  const Icon = meta.icon;
  return (
    <Link
      href={item.href}
      className="group flex items-center gap-4 border-t border-border py-4"
    >
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-md", meta.tone)}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium leading-snug">{item.title}</p>
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {item.description}
        </p>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

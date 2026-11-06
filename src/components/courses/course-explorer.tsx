"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { degreeOrder, type Course, type Degree } from "@/lib/data/courses";
import { schools } from "@/lib/data/schools";
import { cn } from "@/lib/utils";

export function CourseExplorer({
  courses,
  defaultDegree,
  defaultSchool,
  showDegree = true,
}: {
  courses: Course[];
  defaultDegree?: Degree;
  defaultSchool?: string;
  showDegree?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [degree, setDegree] = useState<string>(defaultDegree ?? "all");
  const [school, setSchool] = useState<string>(defaultSchool ?? "all");
  const [regime, setRegime] = useState<string>("all");
  const [sort, setSort] = useState<string>("name");

  const filtered = useMemo(() => {
    const normalized = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return courses
      .filter((course) => {
        if (degree !== "all" && course.degree !== degree) return false;
        if (school !== "all" && course.schoolId !== school) return false;
        if (regime !== "all" && course.regime !== regime) return false;
        if (!normalized) return true;
        const haystack = `${course.name} ${course.area} ${course.degree}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return haystack.includes(normalized);
      })
      .sort((a, b) => {
        if (sort === "ects") return b.ects - a.ects;
        if (sort === "vacancies") return b.vacancies - a.vacancies;
        return a.name.localeCompare(b.name, "pt");
      });
  }, [courses, query, degree, school, regime, sort]);

  const hasFilters =
    query !== "" ||
    degree !== (defaultDegree ?? "all") ||
    school !== (defaultSchool ?? "all") ||
    regime !== "all";

  function reset() {
    setQuery("");
    setDegree(defaultDegree ?? "all");
    setSchool(defaultSchool ?? "all");
    setRegime("all");
    setSort("name");
  }

  return (
    <div>
      <div className="border-y border-border py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar curso, área ou escola…"
              aria-label="Pesquisar cursos"
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:w-auto">
            {showDegree ? (
              <Select
                value={degree}
                onChange={(event) => setDegree(event.target.value)}
                aria-label="Filtrar por grau"
                className="lg:w-44"
              >
                <option value="all">Todos os graus</option>
                {degreeOrder.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            ) : null}
            <Select
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              aria-label="Filtrar por escola"
              className="lg:w-48"
            >
              <option value="all">Todas as escolas</option>
              {schools.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.short}
                </option>
              ))}
            </Select>
            <Select
              value={regime}
              onChange={(event) => setRegime(event.target.value)}
              aria-label="Filtrar por regime"
              className="lg:w-40"
            >
              <option value="all">Todos os regimes</option>
              <option value="Diurno">Diurno</option>
              <option value="Pós-laboral">Pós-laboral</option>
              <option value="Online">Online</option>
            </Select>
            <Select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Ordenar"
              className="lg:w-40"
            >
              <option value="name">Ordenar: nome</option>
              <option value="ects">Mais ECTS</option>
              <option value="vacancies">Mais vagas</option>
            </Select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <SlidersHorizontal className="size-3.5" />
            {filtered.length} {filtered.length === 1 ? "curso encontrado" : "cursos encontrados"}
          </span>
          {hasFilters ? (
            <button
              type="button"
              onClick={reset}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold text-primary transition-colors hover:bg-brand-50 dark:hover:bg-brand-950",
              )}
            >
              <X className="size-3.5" />
              Limpar filtros
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={`${course.degree}-${course.slug}`} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center border-y border-border px-6 py-16 text-center">
          <Search className="size-6 text-muted-foreground" />
          <h3 className="font-display mt-4 text-lg font-semibold">
            Sem resultados para estes filtros
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Tenta pesquisar por outro termo ou remove alguns filtros para ver mais
            cursos.
          </p>
          <Button variant="outline" className="mt-5" onClick={reset}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}

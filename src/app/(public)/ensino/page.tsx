import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";

import { CourseExplorer } from "@/components/courses/course-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { courses } from "@/lib/data/courses";
import { schools } from "@/lib/data/schools";
import { cn } from "@/lib/utils";

const degreeMeta = [
  {
    degree: "TESP" as const,
    slug: "tesp",
    description: "Formação prática com ligação ao mercado.",
    icon: Layers3,
  },
  {
    degree: "Licenciatura" as const,
    slug: "licenciaturas",
    description: "Uma base sólida para a tua carreira.",
    icon: GraduationCap,
  },
  {
    degree: "Mestrado" as const,
    slug: "mestrados",
    description: "Especialização e investigação aplicada.",
    icon: BookOpen,
  },
  {
    degree: "Pós-graduação" as const,
    slug: "pos-graduacoes",
    description: "Atualiza e aprofunda competências.",
    icon: Sparkles,
  },
  {
    degree: "Microcredencial" as const,
    slug: "microcredenciais",
    description: "Formação flexível e certificada.",
    icon: Compass,
  },
];

export const instant = false;

export const metadata = {
  title: "Ensino",
  description:
    "Oferta formativa da UPSantarém: cursos técnicos, licenciaturas, mestrados, pós-graduações e microcredenciais.",
};

export default async function EnsinoPage({
  searchParams,
}: {
  searchParams: Promise<{ escola?: string }>;
}) {
  const { escola } = await searchParams;

  return (
    <div>
      <PageHero
        title="Ensino com futuro, perto de ti"
        description="Explora cursos técnicos, licenciaturas, mestrados e formações ao longo da vida. Uma oferta que combina conhecimento, prática e ligação ao território."
        breadcrumbs={[{ label: "Ensino" }]}
      >
        <div className="flex flex-wrap gap-2">
          {schools.map((school) => (
            <Link
              key={school.id}
              href={`/ensino?escola=${school.id}#cursos`}
              className={cn(
                "rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                escola === school.id
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-border bg-card text-muted-foreground hover:border-brand-300 hover:text-primary",
              )}
            >
              {school.short}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-14">
        <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {degreeMeta.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/ensino/${item.slug}`}
                className="group flex flex-col border-t border-border py-5"
              >
                <Icon className="size-5 text-primary" />
                <h2 className="font-display mt-4 text-base font-semibold leading-snug">
                  {item.degree === "TESP" ? "Cursos Técnicos (TeSP)" : item.degree}
                </h2>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ArrowRight className="mt-4 size-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>

      <section id="cursos" className="container-page pb-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Todos os cursos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Filtra por grau, escola e regime para encontrares o curso certo.
            </p>
          </div>
        </div>
        <CourseExplorer courses={courses} defaultSchool={escola} />
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-4 rounded-4xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Fala com o Gabinete de Acesso ao Ensino Superior
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Ajudamos-te a comparar cursos, perceber provas de ingresso e preparar
              a candidatura. O apoio é gratuito para candidatos e estudantes.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Link href="/candidaturas" className={buttonVariants()}>
              Ver candidaturas
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              academicos@ipsantarem.pt · 243 309 520
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

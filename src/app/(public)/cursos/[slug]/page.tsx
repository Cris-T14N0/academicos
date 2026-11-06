import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Clock3,
  CreditCard,
  Layers3,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";

import { CourseDetailTabs } from "@/components/courses/course-detail-tabs";
import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { courses, getCourse } from "@/lib/data/courses";
import { getSchool } from "@/lib/data/schools";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  return {
    title: course ? course.name : "Curso",
    description: course?.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const school = getSchool(course.schoolId);

  return (
    <div>
      <PageHero
        title={course.name}
        description={course.description}
        breadcrumbs={[
          { label: "Ensino", href: "/ensino" },
          { label: course.degree === "TESP" ? "TeSP" : course.degree, href: `/ensino/${course.degree === "TESP" ? "tesp" : course.degree === "Licenciatura" ? "licenciaturas" : course.degree === "Mestrado" ? "mestrados" : course.degree === "Pós-graduação" ? "pos-graduacoes" : "microcredenciais"}` },
          { label: course.name },
        ]}
      >
        <p className="text-sm text-white/70">
          {[school?.short, course.duration, `${course.ects} ECTS`, course.regime].filter(Boolean).join(" · ")}
        </p>
      </PageHero>

      <section className="container-page py-10">
        <Link
          href="/ensino"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Voltar à oferta formativa
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <CourseDetailTabs course={course} />

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="border-t border-border pt-6">
              <h2 className="font-display text-lg font-semibold">Resumo do curso</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  { icon: Layers3, label: "Grau", value: course.degree },
                  { icon: Clock3, label: "Duração", value: course.duration },
                  { icon: Users, label: "Vagas", value: `${course.vacancies} vagas` },
                  { icon: MapPin, label: "Regime", value: course.regime },
                  { icon: CreditCard, label: "Propina", value: "697 € / ano" },
                  { icon: CalendarClock, label: "Candidaturas", value: "1.ª fase até abril" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between gap-3 border-b border-border pb-2.5 last:border-0 last:pb-0">
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="size-4 text-brand-500" />
                        {item.label}
                      </dt>
                      <dd className="text-right font-medium">{item.value}</dd>
                    </div>
                  );
                })}
              </dl>
              <Link
                href="/candidaturas"
                className={buttonVariants({ className: "mt-5 w-full" })}
              >
                Candidatar-me
                <ArrowRight className="size-4" />
              </Link>
              <details className="mt-4 text-sm">
                <summary className="cursor-pointer font-medium text-muted-foreground">Documentos de candidatura</summary>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Consulta os documentos necessários na biblioteca.
                </p>
                <Link href="/links-documentos" className="mt-2 inline-flex text-xs font-semibold text-primary">
                  Abrir biblioteca
                </Link>
              </details>
            </div>

            <details className="border-t border-border pt-5">
              <summary className="cursor-pointer font-semibold">Precisas de apoio?</summary>
              <div className="mt-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-sand-300">
                <MessageCircle className="size-5" />
              </span>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Fala com os serviços académicos.
              </p>
              <a href="mailto:academicos@ipsantarem.pt" className="mt-3 inline-flex text-sm font-semibold text-sand-200 underline underline-offset-4">
                academicos@ipsantarem.pt
              </a>
              </div>
            </details>

            <p className="rounded-2xl border border-dashed border-border p-4 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
              Protótipo demonstrativo. Cursos, vagas, propinas e planos de estudos
              são dados fictícios.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

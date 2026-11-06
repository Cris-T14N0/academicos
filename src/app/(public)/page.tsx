import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsCard } from "@/components/news/news-card";
import { getFeaturedCourses } from "@/lib/data/courses";
import { schools } from "@/lib/data/schools";
import { news } from "@/lib/data/news";

export default function HomePage() {
  const featuredCourses = getFeaturedCourses().slice(0, 4);
  const [leadCourse, ...otherCourses] = featuredCourses;
  const latestNews = news.slice(0, 1);

  return (
    <>
      <section className="bg-brand-950 text-white">
        <div className="container-page py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sand-300">Universidade de Santarém</p>
            <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              A tua próxima etapa começa aqui.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Encontra uma formação com espaço para crescer.
            </p>
            <div className="mt-8">
              <Link href="/candidaturas" className={buttonVariants({ size: "lg", variant: "accent" })}>
                Ver candidaturas
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          title="Encontra o teu curso"
          description="Conhece algumas das formações disponíveis."
        />
        {leadCourse ? (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="border-t border-border pt-6">
              <p className="text-sm font-medium text-muted-foreground">{leadCourse.degree}</p>
              <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight">
                <Link href={`/cursos/${leadCourse.slug}`} className="transition-colors hover:text-primary">
                  {leadCourse.name}
                </Link>
              </h3>
              <p className="mt-3 line-clamp-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {leadCourse.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {leadCourse.duration} · {leadCourse.regime}
              </p>
            </article>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-muted-foreground">Outras formações</h3>
              <ul className="mt-2 divide-y divide-border">
                {otherCourses.map((course) => (
                  <li key={`${course.degree}-${course.slug}`}>
                    <Link
                      href={`/cursos/${course.slug}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block text-xs text-muted-foreground">{course.degree}</span>
                        <span className="mt-0.5 block text-base font-semibold leading-snug">
                          {course.name}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <details className="mt-8 border-t border-border pt-5">
          <summary className="w-fit cursor-pointer text-sm font-semibold text-primary">Explorar toda a oferta</summary>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Filtra cursos por grau, escola e regime para encontrares a formação certa.
          </p>
          <Link href="/ensino" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Ver cursos e escolas
            <ArrowRight className="size-4" />
          </Link>
        </details>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <SectionHeading title="Escolas" />
        <div className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {schools.map((school) => (
            <Link
              key={school.id}
              href={`/ensino?escola=${school.id}#cursos`}
              className="group flex items-center justify-between gap-2 border-t border-border py-4 text-sm font-semibold"
            >
              {school.short}
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Já és estudante?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Consulta os teus serviços académicos num só lugar.
              </p>
            </div>
            <Link href="/portal" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Entrar no portal
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading title="Da universidade" />
        <div className="mt-8">
          {latestNews.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}

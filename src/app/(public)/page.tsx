import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
  MoveUpRight,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
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
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-44 -top-64 size-[42rem] rounded-full border border-white/[0.08] sm:-right-28 sm:size-[54rem]" />
          <div className="absolute -right-20 -top-40 size-[34rem] rounded-full border border-white/[0.08] sm:right-0 sm:size-[44rem]" />
          <div className="absolute right-[7%] top-[15%] size-[25rem] rotate-12 border border-sand-300/20 sm:right-[14%] sm:size-[31rem]" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/20 to-transparent" />
          <span className="absolute right-[11%] top-[24%] hidden font-display text-[17rem] font-semibold leading-none text-white/[0.035] lg:block">S</span>
        </div>

        <div className="container-page relative grid min-h-[38rem] items-center gap-10 py-16 sm:min-h-[43rem] sm:py-20 lg:grid-cols-[1fr_0.72fr] lg:gap-12 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-300 sm:text-sm">
              <span className="size-2 rounded-full bg-sand-300" />
              Universidade Politécnica de Santarém
            </p>
            <h1 className="font-display mt-7 max-w-3xl text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-balance sm:text-6xl lg:text-[5.25rem]">
              O futuro não se espera. <span className="text-sand-300">Constrói-se.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Um lugar para aprender fazendo, descobrir o que te move e levar as tuas ideias mais longe.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/ensino" className={buttonVariants({ size: "lg", variant: "accent" })}>
                Descobrir cursos
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/candidaturas" className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white transition-colors hover:text-sand-300">
                Como candidatar-me
                <MoveUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white/45 sm:mt-16">
              <span className="h-px w-10 bg-sand-300/70" />
              Santarém · Rio Maior
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="relative aspect-[0.82] overflow-hidden rounded-t-[48%] border border-white/15 bg-brand-900/70 p-5">
              <div className="absolute inset-5 overflow-hidden rounded-t-[48%] border border-sand-300/25">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(23,105,176,0.05)_15%,rgba(16,42,76,0.82)_85%),repeating-linear-gradient(0deg,transparent,transparent_47px,rgba(255,255,255,0.09)_48px),repeating-linear-gradient(90deg,transparent,transparent_47px,rgba(255,255,255,0.09)_48px)]" />
                <div className="absolute left-[16%] top-[18%] h-[80%] w-[68%] rotate-[-11deg] border border-white/25" />
                <div className="absolute left-[25%] top-[24%] h-[80%] w-[68%] rotate-[8deg] border border-sand-300/45" />
                <div className="absolute bottom-[15%] left-[13%] right-[13%] h-px bg-sand-300/60" />
                <span className="font-display absolute bottom-[18%] left-[13%] text-[8.5rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.12]">UP</span>
                <span className="absolute right-[12%] top-[14%] size-3 rounded-full bg-sand-300 shadow-[0_0_32px_8px_rgba(238,192,84,0.28)]" />
              </div>
              <div className="absolute bottom-11 left-0 flex items-center gap-3 border border-white/15 bg-brand-950/90 px-4 py-3 shadow-soft backdrop-blur">
                <span className="grid size-9 place-items-center rounded-full bg-sand-300 text-brand-950"><Compass className="size-4" /></span>
                <span>
                  <span className="block text-xs font-semibold">Aprender, perto.</span>
                  <span className="mt-0.5 block text-[0.68rem] text-white/55">Ligar talento ao território</span>
                </span>
              </div>
              <span className="absolute right-0 top-8 font-display text-xs uppercase tracking-[0.22em] text-sand-300 [writing-mode:vertical-rl]">Ribatejo, Portugal</span>
            </div>
            <span className="absolute -bottom-9 right-2 font-display text-[0.68rem] uppercase tracking-[0.25em] text-white/40">39°14&apos; N &nbsp; 8°41&apos; W</span>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {[
              ["05", "escolas superiores"],
              ["30+", "cursos e percursos"],
              ["02", "cidades"],
              ["01", "comunidade"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-2 py-4 pr-3 sm:gap-3 sm:py-5 sm:pr-6">
                <span className="font-display text-xl font-semibold text-sand-300 sm:text-2xl">{value}</span>
                <span className="text-[0.65rem] leading-tight text-white/55 sm:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">O próximo passo</p>
            <h2 className="font-display mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
              Uma escolha tua. Mil maneiras de chegar lá.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Cursos feitos de conhecimento, experiência e ligações reais ao mundo à tua volta.
            </p>
            <Link href="/ensino" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Explorar toda a oferta <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {leadCourse ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href={`/cursos/${leadCourse.slug}`} className="group relative flex min-h-[17rem] flex-col justify-between overflow-hidden bg-brand-950 p-6 text-white sm:row-span-2 sm:min-h-[27rem] sm:p-8">
                <span aria-hidden="true" className="font-display absolute -bottom-10 -right-2 text-[13rem] font-semibold leading-none text-white/[0.06]">01</span>
                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-sand-300">Em destaque</span>
                  <ArrowUpRight className="size-5 text-white/50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sand-300" />
                </div>
                <div className="relative">
                  <p className="text-xs text-white/55">{leadCourse.degree} · {leadCourse.duration}</p>
                  <h3 className="font-display mt-3 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{leadCourse.name}</h3>
                  <p className="mt-4 line-clamp-3 max-w-md text-sm leading-relaxed text-white/65">{leadCourse.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sand-300">Conhecer o curso <ArrowRight className="size-4" /></span>
                </div>
              </Link>

              <div className="flex flex-col border-t border-border sm:col-start-2">
                <div className="flex items-center justify-between py-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Também podes explorar</span>
                  <BookOpen className="size-4 text-primary" />
                </div>
                <ul className="divide-y divide-border">
                  {otherCourses.slice(0, 3).map((course, index) => (
                    <li key={`${course.degree}-${course.slug}`}>
                      <Link href={`/cursos/${course.slug}`} className="group flex items-center justify-between gap-4 py-4">
                        <span>
                          <span className="block text-[0.68rem] font-medium uppercase tracking-wider text-muted-foreground">0{index + 2} · {course.degree}</span>
                          <span className="mt-1 block text-sm font-semibold leading-snug sm:text-base">{course.name}</span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-sand-50 py-16 dark:bg-brand-900/40 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Cinco escolas, muitas perspetivas</p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Encontra a tua.</h2>
            </div>
            <Link href="/ensino" className="group inline-flex items-center gap-2 pb-1 text-sm font-semibold text-primary">
              Conhecer as escolas <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {schools.map((school, index) => (
              <Link key={school.id} href={`/ensino?escola=${school.id}#cursos`} className="group flex min-h-48 flex-col justify-between bg-background p-5 transition-colors hover:bg-brand-950 hover:text-white sm:p-6">
                <div className="flex items-start justify-between">
                  <span className="font-display text-xs font-semibold tracking-[0.16em] text-primary group-hover:text-sand-300">0{index + 1}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sand-300" />
                </div>
                <div>
                  <span className="font-display block text-xl font-semibold tracking-tight">{school.short}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground group-hover:text-white/60">{school.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div className="relative overflow-hidden bg-brand-950 p-7 text-white sm:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-24 size-72 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-8 -top-12 size-52 rounded-full border border-sand-300/20" />
            <div className="relative">
              <span className="grid size-11 place-items-center rounded-full bg-sand-300 text-brand-950"><GraduationCap className="size-5" /></span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-sand-300">Vida académica</p>
              <h2 className="font-display mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Já fazes parte da comunidade?</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">Notas, horários, documentos e serviços académicos. Tudo o que precisas para seguir em frente.</p>
              <Link href="/portal" className="mt-7 inline-flex items-center gap-2 bg-sand-300 px-5 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-sand-200">
                Entrar no portal <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Acontece por aqui</p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">Da universidade</h2>
              </div>
              <Link href="/noticias" aria-label="Ver todas as notícias" className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:bg-muted"><ArrowDownRight className="size-4" /></Link>
            </div>
            <div className="mt-2">
              {latestNews.map((item) => <NewsCard key={item.slug} item={item} featured />)}
            </div>
            <Link href="/noticias" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Todas as notícias <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

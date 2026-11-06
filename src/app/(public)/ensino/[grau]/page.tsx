import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import { CourseExplorer } from "@/components/courses/course-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";
import {
  degreeLabels,
  degreeSlugs,
  getCoursesByDegree,
} from "@/lib/data/courses";

const validSegments = [
  ...Object.keys(degreeSlugs),
  "mobilidade",
  "cursos-nao-ativos",
];

export function generateStaticParams() {
  return validSegments.map((grau) => ({ grau }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grau: string }>;
}) {
  const { grau } = await params;
  const degree = degreeSlugs[grau];
  const titles: Record<string, string> = {
    mobilidade: "Mobilidade Internacional",
    "cursos-nao-ativos": "Cursos não ativos",
  };
  return {
    title: degree ? degreeLabels[degree] : (titles[grau] ?? "Ensino"),
    description: degree
      ? `Cursos de ${degreeLabels[degree]} da Universidade Politécnica de Santarém.`
      : "Informação sobre mobilidade internacional e cursos não ativos da UPSantarém.",
  };
}

export default async function GrauPage({
  params,
}: {
  params: Promise<{ grau: string }>;
}) {
  const { grau } = await params;

  if (!validSegments.includes(grau)) notFound();

  if (grau === "mobilidade") return <MobilidadePage />;
  if (grau === "cursos-nao-ativos") return <CursosNaoAtivosPage />;

  const degree = degreeSlugs[grau];
  const degreeCourses = getCoursesByDegree(degree);

  return (
    <div>
      <PageHero
        title={degreeLabels[degree]}
        description={`Explora os ${degreeCourses.length} cursos de ${degreeLabels[degree].toLowerCase()} da UPSantarém, distribuídos pelas cinco escolas.`}
        breadcrumbs={[{ label: "Ensino", href: "/ensino" }, { label: degreeLabels[degree] }]}
      >
        <div className="flex flex-wrap gap-2">
          {Object.entries(degreeSlugs).filter(([slug]) => slug !== grau).map(([slug, item]) => (
            <Link
              key={slug}
              href={`/ensino/${slug}`}
              className={
                item === degree
                  ? buttonVariants({ size: "sm", variant: "default" })
                  : buttonVariants({ size: "sm", variant: "outline" })
              }
            >
              {item === "TESP" ? "TeSP" : item}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-12">
        <CourseExplorer courses={degreeCourses} defaultDegree={degree} showDegree={false} />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-center justify-between gap-4 border-y border-border py-6 sm:flex-row">
          <div>
            <h2 className="font-display text-xl font-semibold">
              Queres candidatar-te a {degreeLabels[degree].toLowerCase()}?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Consulta prazos, requisitos e fases de candidatura.
            </p>
          </div>
          <Link href="/candidaturas" className={buttonVariants()}>
            Ver candidaturas
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function MobilidadePage() {
  return (
    <div>
      <PageHero
        title="Mobilidade internacional e Erasmus+"
        description="Estuda, estagia ou ensina noutro país europeu. A UPSantarém integra a aliança ACE²-EU e uma rede de parcerias em oito países."
        breadcrumbs={[{ label: "Ensino", href: "/ensino" }, { label: "Mobilidade" }]}
      />

      <section className="container-page py-14">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Existem oportunidades de estudo e estágio em várias áreas. A disponibilidade depende dos acordos da tua escola.
        </p>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
              Como começar
            </h2>
            <div className="mt-6">
              {[
                {
                  title: "Escolhe o destino",
                  description:
                    "Consulta os acordos da tua escola e as instituições parceiras disponíveis.",
                },
              ].map((step) => (
                <div key={step.title} className="flex gap-4 border-t border-border py-4">
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Onde podes ir
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Destinos e vagas variam por escola e ano letivo. Consulta as parcerias atuais com o Gabinete de Relações Internacionais.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-center justify-between gap-4 border-y border-brand-900 bg-brand-950 p-6 text-white sm:flex-row sm:p-8">
          <div>
            <h2 className="font-display text-xl font-semibold">Queres saber mais?</h2>
            <p className="mt-1 text-sm text-white/65">
              Contacta o Gabinete de Relações Internacionais.
            </p>
          </div>
          <a href="mailto:ri@ipsantarem.pt" className="text-sm font-semibold text-sand-200 underline underline-offset-4">Contactar relações internacionais</a>
        </div>
      </section>
    </div>
  );
}

const inactiveCourses = [
  { name: "Gestão de Empresas", degree: "Licenciatura", school: "ESGTS", lastYear: "2023/2024" },
  { name: "Tecnologias de Produção Integrada", degree: "TeSP", school: "ESAS", lastYear: "2024/2025" },
  { name: "Secretariado em Saúde", degree: "TeSP", school: "ESSS", lastYear: "2024/2025" },
  { name: "Educação Ambiental e Turismo de Natureza", degree: "Licenciatura", school: "ESES", lastYear: "2023/2024" },
  { name: "Surfing no Treino e na Animação Turística", degree: "TeSP", school: "ESDRM", lastYear: "2024/2025" },
];

function CursosNaoAtivosPage() {
  return (
    <div>
      <PageHero
        title="Cursos não ativos"
        description="Consulta o histórico de cursos que já não têm novas admissões. Os estudantes inscritos mantêm todos os direitos até à conclusão."
        breadcrumbs={[{ label: "Ensino", href: "/ensino" }, { label: "Cursos não ativos" }]}
      />
      <section className="container-page py-14">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-border bg-muted/40 px-6 py-3 text-xs font-medium text-muted-foreground sm:grid">
            <span>Curso</span>
            <span>Grau</span>
            <span>Escola</span>
            <span>Último ano</span>
          </div>
          {inactiveCourses.map((course) => (
            <div
              key={course.name}
              className="grid gap-2 border-b border-border px-6 py-4 text-sm last:border-0 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center sm:gap-4"
            >
              <span className="font-semibold">{course.name}</span>
              <span className="text-muted-foreground">{course.degree}</span>
              <span className="text-muted-foreground">{course.school}</span>
              <span className="text-muted-foreground">{course.lastYear}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-4 text-sm">
          <GraduationCap className="size-5 shrink-0 text-sand-700 dark:text-sand-300" />
          <p className="text-sand-900 dark:text-sand-200">
            Precisa de uma certidão ou do plano de estudos de um curso não ativo?
            Contacta os serviços académicos da tua escola.
          </p>
        </div>
      </section>
    </div>
  );
}

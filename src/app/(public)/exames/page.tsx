import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck2,
  Clock3,
  CreditCard,
  Info,
  Laptop,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { examCalendar, examPeriods } from "@/lib/data/exams";

export const metadata = {
  title: "Exames",
  description:
    "Épocas de exames, inscrições online, calendários e regras de avaliação da UPSantarém.",
};

const steps = [
  {
    title: "Acede ao portal académico",
    description: "Inicia sessão com o número de estudante e a senha.",
  },
  {
    title: "Abre “Inscrições em exames”",
    description: "No menu do lado direito, escolhe a opção de inscrição.",
  },
  {
    title: "Escolhe o exame e a época",
    description: "Seleciona as unidades curriculares e a época pretendida.",
  },
  {
    title: "Confirma e paga",
    description: "Finaliza a inscrição e, quando aplicável, efetua o pagamento.",
  },
];

export default function ExamesPage() {
  return (
    <div>
      <PageHero
        title="Exames e inscrições online"
        description="Consulta as épocas de exames, as regras de inscrição e as taxas aplicáveis. A inscrição é obrigatória em todas as épocas."
        breadcrumbs={[{ label: "Estudantes", href: "/estudantes" }, { label: "Exames" }]}
      >
        <Link href="/portal/exames" className={buttonVariants({ size: "lg" })}>
          Inscrever-me em exames
          <ArrowRight className="size-4" />
        </Link>
      </PageHero>

      <section className="container-page py-12">
        <div className="grid gap-x-10 lg:grid-cols-3">
          {examPeriods.map((period) => (
            <div
              key={period.id}
              className="flex flex-col border-t border-border py-6"
            >
              <CalendarCheck2 className="size-5 text-primary" />
              <h2 className="font-display mt-4 text-xl font-semibold">{period.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                <Clock3 className="size-3.5" />
                {period.window}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {period.description}
              </p>
              <details className="mt-4 border-t border-border pt-3">
                <summary className="cursor-pointer text-xs font-semibold">Taxas e regras</summary>
                <p className="mt-2 text-xs font-medium text-muted-foreground">Taxa: {period.fee}</p>
                <ul className="mt-2 space-y-2">
                  {period.rules.map((rule) => (
                    <li key={rule} className="text-xs leading-relaxed text-muted-foreground">{rule}</li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-semibold">Como inscrever em quatro passos</h2>
            <details className="mt-5 border-t border-border pt-4">
              <summary className="cursor-pointer text-sm font-semibold">Ver instruções detalhadas</summary>
              <ol className="mt-3 space-y-3">
                {steps.map((step) => (
                  <li key={step.title}>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </details>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-brand-50 p-4 text-sm dark:bg-brand-950">
              <Laptop className="mt-0.5 size-5 shrink-0 text-brand-600 dark:text-brand-300" />
              <p className="leading-relaxed text-brand-800 dark:text-brand-200">
                Se não conseguires inscrever-te online, contacta os serviços
                académicos da tua escola e envia o requerimento de inscrição em
                exames.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-semibold">Calendário por escola em 2026/2027</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              <div className="hidden grid-cols-4 gap-3 bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground sm:grid">
                <span>Escola</span>
                <span>Normal</span>
                <span>Recurso</span>
                <span>Especial</span>
              </div>
              {examCalendar.map((row) => (
                <div
                  key={row.school}
                  className="grid gap-1.5 border-t border-border px-4 py-3 text-xs sm:grid-cols-4 sm:items-center sm:gap-3"
                >
                  <span className="font-display font-bold">{row.school}</span>
                  <span className="text-muted-foreground">{row.normal}</span>
                  <span className="text-muted-foreground">{row.recurso}</span>
                  <span className="text-muted-foreground">{row.special}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted/60 p-4">
                <CreditCard className="size-4 text-brand-500" />
                <p className="mt-2 text-sm font-semibold">Emolumentos</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  10 € por inscrição em exame de recurso, especial ou melhoria.
                  Bolseiros têm 50% de redução.
                </p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-4">
                <Info className="size-4 text-brand-500" />
                <p className="mt-2 text-sm font-semibold">Prazo de inscrição</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Até ao final do 3.º dia anterior à data do exame. O pagamento é
                  feito até ao dia seguinte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="flex items-start gap-4 rounded-3xl border border-sand-200 bg-sand-50 p-5 dark:border-sand-800 dark:bg-sand-900/40 sm:p-6">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-sand-700 dark:text-sand-300" />
          <div>
            <h2 className="font-display text-lg font-semibold text-sand-900 dark:text-sand-200">
              Atenção aos prazos
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-sand-800/80 dark:text-sand-200/80">
              A inscrição fora de prazo pode não ser aceite. Verifica sempre o
              calendário da tua escola e, em caso de dúvida, contacta os serviços
              académicos antes da data limite.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  GraduationCap,
  Info,
  Users,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Matrículas e inscrições",
  description:
    "Guia de matrícula, renovação de inscrição, prazos, documentos e pagamentos na UPSantarém.",
};

const scenarios = [
  {
    title: "1.º ano · 1.ª vez",
    description:
      "Para estudantes colocados no concurso nacional ou noutro regime de acesso.",
    deadline: "Conforme o prazo da colocação",
    icon: GraduationCap,
    highlight: true,
  },
  {
    title: "Renovação de inscrição",
    description:
      "Para estudantes que continuam o curso em CTeSP, licenciatura, mestrado ou pós-graduação.",
    deadline: "15 de julho a 31 de agosto de 2026",
    icon: ClipboardCheck,
  },
  {
    title: "Reinscrição · Mestrados",
    description:
      "Para estudantes de mestrado que pretendem reinscrever-se no ano seguinte.",
    deadline: "24 a 28 de julho de 2026",
    icon: FileCheck2,
  },
];

const steps = [
  {
    title: "Valida a tua identidade",
    description:
      "Acede à plataforma de gestão académica com o número de estudante e a senha. Confirma os teus dados pessoais.",
  },
  {
    title: "Confirma o curso e o ano",
    description:
      "Verifica o curso, o plano de estudos e as unidades curriculares disponíveis para o teu ano.",
  },
  {
    title: "Escolhe as unidades curriculares",
    description:
      "Seleciona as UCs obrigatórias e, quando aplicável, as optativas. As vagas são limitadas.",
  },
  {
    title: "Efetua o pagamento",
    description:
      "Paga a taxa de inscrição e a propina pelos meios disponibilizados pela tesouraria.",
  },
  {
    title: "Guarda o comprovativo",
    description:
      "Confirma que a inscrição ficou concluída e descarrega o comprovativo na área do estudante.",
  },
];

export default function MatriculasPage() {
  return (
    <div>
      <PageHero
        title="Matrículas e renovações, passo a passo"
        description="Tudo o que precisas para garantir a tua inscrição no ano letivo 2026/2027, sem falhar prazos nem documentos."
        breadcrumbs={[{ label: "Estudantes", href: "/estudantes" }, { label: "Matrículas" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/portal/matriculas" className={buttonVariants({ size: "lg" })}>
            Abrir no portal
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
          <div className="grid gap-x-10 lg:grid-cols-3">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <div
                key={scenario.title}
                className="border-t border-border py-6"
              >
                <Icon className="size-5 text-primary" />
                <h2 className="font-display mt-4 text-xl font-semibold">
                  {scenario.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {scenario.description}
                </p>
                <p className="mt-4 border-t border-border pt-3 text-xs font-semibold text-primary">
                  <CalendarClock className="size-3.5" />
                  {scenario.deadline}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Como efetuar a matrícula
            </h2>
            <div className="mt-6">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4 border-t border-border py-4">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-t border-border pt-6">
              <CreditCard className="size-5 text-muted-foreground" />
              <h2 className="font-display mt-4 text-xl font-semibold">
                Custos e pagamentos
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Taxa de inscrição", "40 €"],
                  ["Propina anual", "697 €"],
                  ["Seguro escolar", "Valor anual"],
                  ["Emolumentos", "Conforme tabela"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                A propina pode ser paga em prestações. Consulta a tesouraria para
                planos de regularização.
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <Users className="size-5 text-muted-foreground" />
              <h2 className="font-display mt-4 text-xl font-semibold">
                Unidades curriculares de opção
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                As UCs de opção têm vagas limitadas e são preenchidas por ordem de
                matrícula ou reinscrição. Se a opção estiver cheia, poderás ser
                afiliado a outra UC disponível.
              </p>
            </div>

            <div className="flex items-start gap-3 border-t border-border pt-4 text-sm">
              <Info className="mt-0.5 size-5 shrink-0 text-sand-700 dark:text-sand-300" />
              <p className="leading-relaxed text-sand-900 dark:text-sand-200">
                Usa preferencialmente Microsoft Edge ou Google Chrome e permite o
                acesso à câmara, caso seja solicitado para validação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-4xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Documentos a ter contigo</h2>
          <details className="mt-5 border-t border-border pt-4">
            <summary className="cursor-pointer text-sm font-semibold">Ver documentos necessários</summary>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Documento de identificação válido",
                "Certificado de habilitações",
                "Comprovativo de colocação",
                "Fotografia atualizada",
                "Comprovativo de IBAN",
                "Declaração de compromisso de honra",
              ].map((doc) => (
                <div key={doc} className="border-t border-border py-2 text-sm text-muted-foreground">
                  {doc}
                </div>
              ))}
            </div>
            <Link href="/links-documentos" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Abrir biblioteca de documentos <ArrowRight className="size-4" />
            </Link>
          </details>
        </div>
      </section>
    </div>
  );
}

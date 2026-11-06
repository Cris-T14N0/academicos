import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CandidaturaForm } from "@/components/candidaturas/candidatura-form";
import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Candidaturas",
  description: "Candidata-te aos cursos da UPSantarém para 2027/2028.",
};

const phases = [
  ["1.ª fase", "28 jan – 13 abr 2027", "Resultados: 5 mai · Matrículas: 11–15 jun"],
  ["2.ª fase", "17–19 jun 2027", "Resultados: 26 jun · Matrículas: 27–29 jul"],
  ["3.ª fase", "A divulgar", "Datas a confirmar pela instituição"],
];

const requirements = [
  "Ensino secundário ou habilitação equivalente.",
  "Provas de ingresso exigidas pelo curso.",
  "Pré-requisitos, quando aplicáveis.",
];

const documents = [
  "Documento de identificação",
  "Certificado de habilitações",
  "Classificações das provas de ingresso",
  "Comprovativo de pagamento (50 €)",
];

export default function CandidaturasPage() {
  return (
    <div>
      <PageHero
        title="Candidata-te à UPSantarém"
        description="Escolhe o curso e inicia o teu pedido para 2027/2028."
        breadcrumbs={[{ label: "Candidaturas" }]}
      >
        <Link href="#formulario" className={buttonVariants({ size: "lg", variant: "accent" })}>
          Começar candidatura
          <ArrowRight className="size-4" />
        </Link>
      </PageHero>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">Prazo principal</h2>
            <p className="mt-3 text-lg font-semibold">28 de janeiro a 13 de abril de 2027</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Resultados a 5 de maio. Matrículas de 11 a 15 de junho.
            </p>
            <details className="mt-5 border-t border-border pt-4 text-sm">
              <summary className="cursor-pointer font-semibold">Ver outras fases</summary>
              <dl className="mt-3 divide-y divide-border">
                {phases.slice(1).map(([name, period, note]) => (
                  <div key={name} className="py-3">
                    <dt className="font-medium">{name} · {period}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{note}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </div>

          <details className="border-t border-border pt-4 text-sm">
            <summary className="cursor-pointer font-semibold">Requisitos, documentos e taxa</summary>
            <div className="mt-4 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-medium">Requisitos</h3>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  {requirements.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Prepara</h3>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  {documents.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  A taxa não é reembolsável. Candidatos internacionais devem confirmar os requisitos específicos com os serviços académicos.
                </p>
              </div>
            </div>
          </details>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20" id="formulario">
        <div className="mb-6 border-t border-border pt-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Iniciar candidatura</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Três passos, cerca de dois minutos. Este formulário é demonstrativo e não envia dados.
          </p>
        </div>
        <div className="max-w-3xl">
          <CandidaturaForm />
        </div>
      </section>
    </div>
  );
}

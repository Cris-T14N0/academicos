import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { LegislationExplorer } from "@/components/legislacao/legislation-explorer";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Legislação",
  description:
    "Legislação aplicável ao ensino superior e à UPSantarém: acesso, graus, avaliação, estatutos e apoios sociais.",
};

export default function LegislacaoPage() {
  return (
    <div>
      <PageHero
        title="Legislação e regulamentos"
        description="Consulta os diplomas que enquadram o acesso, o funcionamento e a avaliação no ensino superior e na UPSantarém."
        breadcrumbs={[{ label: "Legislação" }]}
      >
        <div>
          <a
            href="https://www.ipsantarem.pt/legislacao-estudantes/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="size-3.5" />
            Página oficial
          </a>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <LegislationExplorer />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-semibold">Precisas de apoio jurídico?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Os serviços académicos esclarecem dúvidas sobre regulamentos e procedimentos.
            </p>
          </div>
          <Link href="/estudantes" className="text-sm font-semibold text-primary">
            Ver contactos
          </Link>
        </div>
      </section>
    </div>
  );
}

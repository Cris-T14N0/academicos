import { PageHero } from "@/components/ui/page-hero";
import { SearchExplorer } from "@/components/search/search-explorer";

export const metadata = {
  title: "Pesquisa",
  description:
    "Pesquisa avançada por cursos, documentos, notícias, escolas, pessoas e unidades curriculares.",
};

export default function PesquisaPage() {
  return (
    <div>
      <PageHero
        title="Encontra o que precisas"
        description="Pesquisa em todo o portal: cursos, documentos, notícias, escolas, pessoas e unidades curriculares."
        breadcrumbs={[{ label: "Pesquisa" }]}
      />
      <section className="container-page py-12">
        <SearchExplorer />
      </section>
    </div>
  );
}

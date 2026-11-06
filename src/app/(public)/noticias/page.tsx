import Link from "next/link";
import { Newspaper } from "lucide-react";

import { NewsCard } from "@/components/news/news-card";
import { PageHero } from "@/components/ui/page-hero";
import { news } from "@/lib/data/news";
import { cn } from "@/lib/utils";

export const instant = false;

export const metadata = {
  title: "Notícias",
  description:
    "Notícias, eventos e destaques da Universidade Politécnica de Santarém.",
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categories = ["Todas", ...Array.from(new Set(news.map((item) => item.category)))];
  const filtered =
    categoria && categoria !== "Todas"
      ? news.filter((item) => item.category === categoria)
      : news;
  const [featured, ...rest] = filtered;

  return (
    <div>
      <PageHero
        title="Notícias e destaques"
        description="Acompanha o que se passa na UPSantarém: ensino, investigação, desporto, cultura e vida académica."
        breadcrumbs={[{ label: "Notícias" }]}
      />

      <section className="container-page py-10">
        <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => {
            const active = (categoria ?? "Todas") === item;
            return (
              <Link
                key={item}
                href={item === "Todas" ? "/noticias" : `/noticias?categoria=${encodeURIComponent(item)}`}
                className={cn(
                  "shrink-0 rounded-md border px-4 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-border bg-card text-muted-foreground hover:border-brand-300 hover:text-primary",
                )}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 border-y border-border px-6 py-16 text-center">
            <Newspaper className="mx-auto size-7 text-muted-foreground" />
            <h2 className="font-display mt-3 text-lg font-semibold">Sem notícias nesta categoria</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Explora todas as notícias ou escolhe outra categoria.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <NewsCard item={featured} featured />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                {categoria && categoria !== "Todas" ? categoria : "Mais recentes"}
              </h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

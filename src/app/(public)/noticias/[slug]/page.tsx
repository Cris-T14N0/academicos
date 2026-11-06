import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight } from "lucide-react";

import { NewsCard } from "@/components/news/news-card";
import { ShareButtons } from "@/components/news/share-buttons";
import { getNews, news } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return { title: "Notícia não encontrada" };
  return { title: item.title, description: item.excerpt };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const related = news
    .filter((entry) => entry.slug !== item.slug)
    .sort((a, b) => {
      const aMatch = a.category === item.category ? 1 : 0;
      const bMatch = b.category === item.category ? 1 : 0;
      return bMatch - aMatch || b.date.localeCompare(a.date);
    })
    .slice(0, 3);

  return (
    <div>
      <section className="border-b border-brand-900 bg-brand-950">
        <div className="container-page py-12 sm:py-16">
          <nav aria-label="Trilho de navegação" className="mb-5 flex flex-wrap items-center gap-1 text-xs text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Início</Link>
            <ChevronRight className="size-3" />
            <Link href="/noticias" className="transition-colors hover:text-white">Notícias</Link>
            <ChevronRight className="size-3" />
            <span className="truncate text-white/90">{item.category}</span>
          </nav>
          <h1 className="font-display max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            {item.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/65">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              <time dateTime={item.date}>{formatDate(item.date)}</time>
            </span>
            <span className="hidden text-white/25 sm:inline">|</span>
            <span>Universidade Politécnica de Santarém</span>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <article>
            <p className="text-lg font-medium leading-relaxed text-foreground">{item.excerpt}</p>
            <div className="prose-institutional mt-6 text-[0.95rem] leading-relaxed text-muted-foreground">
              {item.content.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-5">
              <ShareButtons title={item.title} />
            </div>
          </article>

          <aside className="space-y-5">
            <div className="border-t border-border pt-5">
              <h2 className="font-display text-base font-semibold">Sobre esta notícia</h2>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-3 border-b border-border pb-2">
                  <dt className="text-muted-foreground">Categoria</dt>
                  <dd className="font-medium">{item.category}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-border pb-2">
                  <dt className="text-muted-foreground">Publicado</dt>
                  <dd className="font-medium">{formatDate(item.date)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Fonte</dt>
                  <dd className="font-medium">Gabinete de Comunicação</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Também podes gostar</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((entry) => (
            <NewsCard key={entry.slug} item={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}

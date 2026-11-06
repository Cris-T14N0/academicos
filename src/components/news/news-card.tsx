import Link from "next/link";

import { type NewsItem } from "@/lib/data/news";
import { cn, formatDate } from "@/lib/utils";

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group flex flex-col border-t border-border py-5",
        featured && "lg:grid lg:grid-cols-[14rem_1fr] lg:gap-8 lg:py-8",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{item.category}</span>
        <span aria-hidden="true">/</span>
        <time dateTime={item.date}>{formatDate(item.date)}</time>
      </div>
      <div className={cn(featured && "lg:pt-0", !featured && "mt-2")}>
        <h3
          className={cn(
            "font-display font-semibold leading-snug tracking-tight",
            featured ? "text-2xl sm:text-3xl" : "text-lg",
          )}
        >
          <Link href={`/noticias/${item.slug}`} className="transition-colors hover:text-primary">
            {item.title}
          </Link>
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-muted-foreground",
            !featured && "line-clamp-3",
          )}
        >
          {item.excerpt}
        </p>
      </div>
    </article>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function PageHero({
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-brand-900 bg-brand-950 text-white", className)}>
      <div className="container-page py-12 sm:py-16">
        {breadcrumbs ? (
          <nav
            aria-label="Trilho de navegação"
            className="mb-8 flex flex-wrap items-center gap-1 text-xs text-white/55"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Início
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight className="size-3" />
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <div
          className={cn(
            "grid gap-8",
            children && "lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:items-end",
          )}
        >
          <div className="max-w-3xl">
            <span className="mb-6 block h-px w-12 bg-sand-400" aria-hidden="true" />
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {children ? <div className="text-white">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Menu,
  Search,
  X,
} from "lucide-react";

import { ensinoGroups, mainNav } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const [ensinoOpenPath, setEnsinoOpenPath] = useState<string | null>(null);
  const mobileOpen = mobileOpenPath === pathname;
  const ensinoOpen = ensinoOpenPath === pathname;
  const setMobileOpen = (open: boolean) => setMobileOpenPath(open ? pathname : null);
  const setEnsinoOpen = (open: boolean) => setEnsinoOpenPath(open ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 supports-[backdrop-filter]:bg-background/85">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegação principal">
            <div
              className="relative"
              onMouseEnter={() => setEnsinoOpen(true)}
              onMouseLeave={() => setEnsinoOpen(false)}
            >
              <Link
                href="/ensino"
                className={cn(
                  "flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  pathname.startsWith("/ensino") || pathname.startsWith("/cursos")
                    ? "text-primary"
                    : "text-foreground",
                )}
                aria-expanded={ensinoOpen}
              >
                Ensino
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform",
                    ensinoOpen && "rotate-180",
                  )}
                />
              </Link>
              <div
                className={cn(
                  "absolute left-1/2 top-full w-[42rem] -translate-x-1/2 pt-3 transition-all duration-200",
                  ensinoOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0",
                )}
              >
                <div className="overflow-hidden rounded-lg border border-border bg-card p-2 shadow-lg shadow-brand-950/10">
                  <div className="grid grid-cols-2 gap-2">
                    {ensinoGroups.map((group) => (
                      <div key={group.label} className="p-2">
                        <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
                          {group.label}
                        </p>
                        <div className="space-y-1">
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
                            >
                              <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                              <span>
                                <span className="block text-sm font-semibold leading-tight">
                                  {link.label}
                                </span>
                                {link.description ? (
                                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                    {link.description}
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/ensino"
                    className="mt-2 flex items-center justify-between rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-200 dark:hover:bg-brand-900"
                  >
                    Ver toda a oferta formativa
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {mainNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  pathname.startsWith(item.href) ? "text-primary" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/pesquisa"
              aria-label="Pesquisar"
              className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Search className="size-[1.1rem]" />
            </Link>
            <Link
              href="/candidaturas"
              className={cn(buttonVariants({ size: "sm" }), "hidden h-10 gap-2 px-4 sm:inline-flex")}
            >
              Candidaturas
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-[4.5rem] max-h-[calc(100vh-4.5rem)] overflow-y-auto border-b border-border bg-background p-4">
            <nav className="container-page flex flex-col gap-1">
              <div className="mb-3 flex gap-3">
                <Link href="/login" className="flex-1 rounded-md border border-border px-4 py-3 text-center text-sm font-medium">
                  Portal do Estudante
                </Link>
                <Link href="/candidaturas" className={cn(buttonVariants({ size: "lg" }), "flex-1")}>
                  Candidaturas
                </Link>
              </div>
              <div className="border-y border-border py-2">
                <Link
                  href="/ensino"
                  className="flex items-center justify-between px-2 py-3 text-base font-semibold"
                >
                  Ensino
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
                <div className="grid grid-cols-2 gap-1 px-1 pb-2">
                  {ensinoGroups[0].links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {link.label.replace("Cursos Técnicos Superiores Profissionais", "Cursos Técnicos (TeSP)")}
                    </Link>
                  ))}
                </div>
              </div>
              {mainNav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-3 text-base font-medium transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="container-page flex flex-1 flex-col">
        <div className="py-6">
          <Logo />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="font-display text-7xl font-bold tracking-tight text-brand-200 dark:text-brand-800 sm:text-9xl">
            404
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Página não encontrada
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            A página que procuras pode ter sido movida, eliminada ou o endereço
            pode estar incorreto.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Link href="/" className={buttonVariants()}>
              <ArrowLeft className="size-4" />
              Voltar ao início
            </Link>
            <Link href="/pesquisa" className={buttonVariants({ variant: "outline" })}>
              <Search className="size-4" />
              Pesquisar no portal
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs">
            {[
              { label: "Cursos", href: "/ensino" },
              { label: "Candidaturas", href: "/candidaturas" },
              { label: "Estudantes", href: "/estudantes" },
              { label: "Documentos", href: "/links-documentos" },
              { label: "Notícias", href: "/noticias" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border border-border px-3 py-1.5 font-semibold text-muted-foreground transition-colors hover:border-brand-300 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

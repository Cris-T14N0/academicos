import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Globe2,
  HeartHandshake,
  HelpCircle,
  Library,
  Mail,
  Wallet,
} from "lucide-react";

import { DocumentLibrary } from "@/components/documents/document-library";
import { PageHero } from "@/components/ui/page-hero";
import { documents, quickLinks } from "@/lib/data/documents";

const linkIcons = {
  email: Mail,
  book: BookOpen,
  globe: Globe2,
  heart: HeartHandshake,
  library: Library,
  help: HelpCircle,
  card: CreditCard,
  wallet: Wallet,
};

export const instant = false;

export const metadata = {
  title: "Links úteis e documentos",
  description:
    "Requerimentos, declarações, calendários, guias, regulamentos e ligações úteis para estudantes da UPSantarém.",
};

export default async function LinksDocumentosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  return (
    <div>
      <PageHero
        title="Links úteis e documentos"
        description="Requerimentos, declarações, calendários, guias e regulamentos. Tudo o que precisas para tratar dos teus assuntos académicos."
        breadcrumbs={[{ label: "Links úteis / Documentos" }]}
      >
        <div className="flex flex-wrap gap-2">
          {["Requerimentos", "Declarações", "Calendários", "Guias"].map((item) => (
            <Link
              key={item}
              href={`/links-documentos?categoria=${item}`}
              className="rounded-md border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-brand-300 hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="container-page py-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Plataformas e serviços
          </h2>
        </div>
        <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = linkIcons[link.kind as keyof typeof linkIcons] ?? Globe2;
            const external = link.href.startsWith("http");
            return (
              <Link
                key={link.label}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-3 border-t border-border py-4"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1">
                  <span className="flex items-center gap-1 text-sm font-semibold leading-snug">
                    {link.label}
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                    {link.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Documentos e impressos
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pesquisa por categoria ou nome. Os downloads são simulados neste
            protótipo.
          </p>
        </div>
        <DocumentLibrary documents={documents} initialCategory={categoria} />
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col items-center justify-between gap-4 border-y border-border py-6 sm:flex-row">
          <div>
            <h2 className="font-display text-xl font-semibold">
              Não encontras o documento?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Contacta os serviços académicos da tua escola.
            </p>
          </div>
          <a href="mailto:academicos@ipsantarem.pt" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-700">
            <Mail className="size-4" />
            academicos@ipsantarem.pt
          </a>
        </div>
      </section>
    </div>
  );
}

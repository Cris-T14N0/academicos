"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Link2,
  Search,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  documentCategories,
  type DocumentCategory,
  type DocumentItem,
} from "@/lib/data/documents";
import { cn, formatDate } from "@/lib/utils";

const typeIcons = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  Ligação: Link2,
};

export function DocumentLibrary({
  documents,
  initialCategory,
}: {
  documents: DocumentItem[];
  initialCategory?: string;
}) {
  const validInitial = documentCategories.includes(initialCategory as DocumentCategory)
    ? (initialCategory as DocumentCategory)
    : "Todos";
  const [category, setCategory] = useState<DocumentCategory | "Todos">(validInitial);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return documents.filter((doc) => {
      if (category !== "Todos" && doc.category !== category) return false;
      if (!normalized) return true;
      return `${doc.title} ${doc.category} ${doc.type}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalized);
    });
  }, [documents, category, query]);

  function handleDownload(doc: DocumentItem) {
    toast.success("Download iniciado", {
      description: `${doc.title} · ${doc.size} (demonstração)`,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border-t border-border pt-3">
          <p className="mb-2 flex items-center gap-1.5 px-3 pt-1 text-xs font-medium text-muted-foreground">
            <Filter className="size-3.5" />
            Categorias
          </p>
          <div className="space-y-0.5">
            {(["Todos", ...documentCategories] as const).map((item) => {
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors",
                    category === item
                      ? "bg-brand-600 font-semibold text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar documento, requerimento ou declaração…"
            aria-label="Pesquisar documentos"
            className="pl-10"
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {filtered.length} {filtered.length === 1 ? "documento" : "documentos"}
            {category !== "Todos" ? ` em ${category}` : ""}
          </span>
          {category !== "Todos" || query ? (
            <button
              type="button"
              onClick={() => {
                setCategory("Todos");
                setQuery("");
              }}
              className="font-semibold text-primary hover:underline"
            >
              Limpar
            </button>
          ) : null}
        </div>

        <div className="mt-4 space-y-2">
          {filtered.map((doc) => {
            const Icon = typeIcons[doc.type];
            return (
              <div
                key={doc.id}
                className="group flex flex-col gap-3 border-t border-border py-4 sm:flex-row sm:items-center"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium leading-snug">{doc.title}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {doc.category} · atualizado a {formatDate(doc.updated)}
                  </p>
                  {doc.description ? (
                    <details className="mt-1 text-xs text-muted-foreground">
                      <summary className="w-fit cursor-pointer">Detalhes</summary>
                      <p className="mt-1 leading-relaxed">{doc.description}</p>
                    </details>
                  ) : null}
                </div>
                {doc.href ? (
                  <a
                    href={doc.href}
                    target={doc.href.startsWith("http") ? "_blank" : undefined}
                    rel={doc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-brand-300 hover:text-primary",
                    )}
                  >
                    Abrir
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="size-3.5" />
                    Descarregar
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <Search className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold">Nenhum documento encontrado</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tenta outro termo ou seleciona outra categoria.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

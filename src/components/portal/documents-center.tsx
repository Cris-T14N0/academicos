"use client";

import { useMemo, useState } from "react";
import {
  Download,
  FileCheck2,
  FileText,
  Loader2,
  Plus,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/portal/status-badge";
import { portalRequests, type PortalRequest } from "@/lib/data/portal";
import { cn, formatDate } from "@/lib/utils";

const tabs = ["Os meus pedidos", "Documentos disponíveis", "Novo pedido"] as const;

const requestTypes = [
  "Certidão de frequência",
  "Certidão de notas",
  "Declaração de matrícula",
  "Comprovativo de inscrição",
  "Certidão de conclusão",
  "Justificação de faltas",
  "Creditação de unidade curricular",
  "Segunda via do cartão",
  "Outro",
];

const availableDocs = [
  { name: "Certidão de frequência", description: "Comprova a inscrição no ano letivo em curso.", fee: "5 €" },
  { name: "Certidão de notas", description: "Histórico de classificações por unidade curricular.", fee: "10 €" },
  { name: "Declaração de matrícula", description: "Declaração simples para efeitos diversos.", fee: "3 €" },
  { name: "Comprovativo de inscrição", description: "Unidades curriculares e ECTS inscritos.", fee: "Gratuito" },
];

export function DocumentsCenter() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Os meus pedidos");
  const [requests, setRequests] = useState<PortalRequest[]>(portalRequests);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ type: requestTypes[0], purpose: "", urgency: "Normal", notes: "" });

  const active = useMemo(() => requests.filter((item) => item.status !== "Concluído").length, [requests]);

  function download(name: string) {
    toast.success("Download iniciado", { description: `${name} (demonstração).` });
  }

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const newRequest: PortalRequest = {
      id: `REQ-2026-${132 + requests.length}`,
      type: form.type,
      submitted: new Date().toISOString().slice(0, 10),
      status: "Em análise",
      updated: new Date().toISOString().slice(0, 10),
    };
    setRequests((current) => [newRequest, ...current]);
    setSubmitting(false);
    setForm({ type: requestTypes[0], purpose: "", urgency: "Normal", notes: "" });
    setTab("Os meus pedidos");
    toast.success("Pedido submetido", { description: `${newRequest.id} · ${newRequest.type}` });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{active} pedidos ativos</p>

      <div className="rounded-3xl border border-border bg-card">
        <div className="scrollbar-thin flex gap-1 overflow-x-auto border-b border-border p-3">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors",
                tab === item ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {item === "Novo pedido" ? <Plus className="size-3.5" /> : null}
              {item}
            </button>
          ))}
        </div>

        {tab === "Os meus pedidos" ? (
          <div className="divide-y divide-border">
            {requests.map((request) => (
              <div key={request.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                  <FileText className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{request.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {request.id} · submetido a {formatDate(request.submitted)} · atualizado a {formatDate(request.updated)}
                  </p>
                </div>
                <StatusBadge status={request.status} />
                {request.status === "Concluído" ? (
                  <Button size="sm" variant="outline" onClick={() => download(request.type)}>
                    <Download className="size-3.5" />
                    Download
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => toast.info("Pedido em processamento", { description: `${request.id} · ${request.status}` })}>
                    Detalhes
                  </Button>
                )}
              </div>
            ))}
            {requests.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">Ainda não tens pedidos.</div>
            ) : null}
          </div>
        ) : null}

        {tab === "Documentos disponíveis" ? (
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {availableDocs.map((doc) => (
              <div key={doc.name} className="flex flex-col border-t border-border py-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="size-4 text-brand-500" />
                    <p className="text-sm font-semibold">{doc.name}</p>
                  </div>
                  <Badge variant={doc.fee === "Gratuito" ? "success" : "sand"} className="shrink-0 px-2 py-0 text-[0.6rem]">
                    {doc.fee}
                  </Badge>
                </div>
                <details className="mt-1 text-xs text-muted-foreground">
                  <summary className="w-fit cursor-pointer">Detalhes e custo: {doc.fee}</summary>
                  <p className="mt-1 leading-relaxed">{doc.description}</p>
                </details>
                <Button size="sm" variant="outline" className="mt-3 w-fit" onClick={() => download(doc.name)}>
                  <Download className="size-3.5" />
                  Descarregar
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Novo pedido" ? (
          <form onSubmit={submitRequest} className="p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="requestType">Tipo de pedido</Label>
                <Select id="requestType" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                  {requestTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="urgency">Urgência</Label>
                <Select id="urgency" value={form.urgency} onChange={(event) => setForm({ ...form, urgency: event.target.value })}>
                  <option value="Normal">Normal (3 dias úteis)</option>
                  <option value="Urgente">Urgente (24 horas) · +50%</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="purpose">Finalidade</Label>
                <Input id="purpose" placeholder="Ex.: candidatura a bolsa" value={form.purpose} onChange={(event) => setForm({ ...form, purpose: event.target.value })} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" placeholder="Informação adicional relevante para o pedido…" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>O pedido é enviado aos serviços académicos da tua escola.</p>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                {submitting ? "A enviar…" : "Submeter pedido"}
              </Button>
            </div>
          </form>
        ) : null}
      </div>

    </div>
  );
}

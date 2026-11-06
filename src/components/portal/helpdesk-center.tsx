"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Headphones,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/portal/status-badge";
import { tickets, type Ticket } from "@/lib/data/portal";
import { cn, formatDate } from "@/lib/utils";

const tabs = ["Os meus pedidos", "Novo pedido", "Perguntas frequentes"] as const;

const services = [
  "Serviços Académicos",
  "InfoCIIPS",
  "Biblioteca",
  "Tesouraria",
  "Serviços de Ação Social",
  "Moodle / e-Learn",
];

const faqs = [
  {
    question: "Como recupero a senha de acesso ao portal?",
    answer:
      "Na página de início de sessão, seleciona «Esqueceste-te da senha?». Receberás um email com uma ligação válida durante 30 minutos. Se não receberes, contacta o InfoCIIPS.",
  },
  {
    question: "Não consigo inscrever-me num exame. O que faço?",
    answer:
      "Confirma se o prazo de inscrição está aberto e se não tens dívidas pendentes. Se o problema persistir, abre um pedido para os Serviços Académicos com o nome da unidade curricular.",
  },
  {
    question: "Como peço uma certidão de frequência?",
    answer:
      "Acede a Documentos, escolhe «Novo pedido» e seleciona «Certidão de frequência». O documento fica disponível para download após validação.",
  },
  {
    question: "Onde consulto o meu horário?",
    answer:
      "O horário está disponível na área Horários do portal. Podes exportar para o calendário ou imprimir. Alterações de última hora são comunicadas pela escola.",
  },
  {
    question: "Como funciona o pagamento da propina?",
    answer:
      "Na Conta corrente podes pagar por MB WAY, cartão ou referência Multibanco. O comprovativo fica disponível imediatamente após a confirmação.",
  },
];

export function HelpdeskCenter() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Os meus pedidos");
  const [ticketList, setTicketList] = useState<Ticket[]>(tickets);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ service: services[0], subject: "", priority: "Normal", description: "" });

  const openCount = useMemo(
    () => ticketList.filter((ticket) => ticket.status !== "Resolvido").length,
    [ticketList],
  );

  async function submitTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const newTicket: Ticket = {
      id: `HD-2026-${530 + ticketList.length}`,
      subject: form.subject,
      service: form.service,
      status: "Aberto",
      created: new Date().toISOString().slice(0, 10),
      lastUpdate: new Date().toISOString().slice(0, 10),
    };
    setTicketList((current) => [newTicket, ...current]);
    setSubmitting(false);
    setForm({ service: services[0], subject: "", priority: "Normal", description: "" });
    setTab("Os meus pedidos");
    toast.success("Pedido de apoio criado", { description: `${newTicket.id} · ${newTicket.subject}` });
  }

  function sendReply(id: string) {
    if (!reply.trim()) return;
    setTicketList((current) =>
      current.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: "Em progresso", lastUpdate: new Date().toISOString().slice(0, 10) }
          : ticket,
      ),
    );
    setReply("");
    toast.success("Resposta enviada", { description: "A equipa de apoio foi notificada." });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{openCount} pedidos em acompanhamento</p>

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
            {ticketList.map((ticket) => {
              const isOpen = expanded === ticket.id;
              return (
                <div key={ticket.id}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : ticket.id)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                      <MessageSquare className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{ticket.subject}</span>
                      <span className="block text-xs text-muted-foreground">
                        {ticket.id} · {ticket.service} · atualizado a {formatDate(ticket.lastUpdate)}
                      </span>
                    </span>
                    <StatusBadge status={ticket.status} />
                    <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-border bg-muted/20 px-4 py-4 sm:pl-[4.5rem]">
                      <div className="space-y-3">
                        <div className="max-w-md rounded-2xl rounded-tl-sm bg-card p-3 text-xs leading-relaxed text-muted-foreground">
                          <p className="font-semibold text-foreground">Tu · {formatDate(ticket.created)}</p>
                          <p className="mt-1">
                            {ticket.status === "Resolvido"
                              ? "Obrigada pelo apoio, o problema ficou resolvido."
                              : "Continuo com dificuldade a aceder. Podem verificar, por favor?"}
                          </p>
                        </div>
                        {ticket.status !== "Aberto" ? (
                          <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-brand-600 p-3 text-xs leading-relaxed text-white">
                            <p className="font-semibold">Equipa de apoio · {formatDate(ticket.lastUpdate)}</p>
                            <p className="mt-1 text-white/80">
                              {ticket.status === "Resolvido"
                                ? "O acesso foi restabelecido. Se o problema voltar, responde a este pedido."
                                : "Estamos a analisar a situação. Pedimos desculpa pelo transtorno."}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Input
                          value={reply}
                          onChange={(event) => setReply(event.target.value)}
                          placeholder="Escreve uma resposta…"
                          aria-label="Resposta ao pedido"
                          className="h-10 flex-1"
                        />
                        <Button size="sm" onClick={() => sendReply(ticket.id)}>
                          <Send className="size-3.5" />
                          Enviar
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "Novo pedido" ? (
          <form onSubmit={submitTicket} className="p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="service">Serviço</Label>
                <Select id="service" value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="priority">Prioridade</Label>
                <Select id="priority" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Resume o teu pedido numa frase" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descreve a situação com o máximo de detalhe possível…" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>Obtém resposta em dias úteis, normalmente em menos de 4 horas.</p>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                {submitting ? "A enviar…" : "Criar pedido"}
              </Button>
            </div>
          </form>
        ) : null}

        {tab === "Perguntas frequentes" ? (
          <div className="divide-y divide-border">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                      <BookOpen className="size-4" />
                    </span>
                    <span className="flex-1 text-sm font-semibold">{faq.question}</span>
                    <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
                  </button>
                  {open ? (
                    <p className="border-t border-border bg-muted/20 px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:pl-[3.75rem]">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <details className="text-xs text-muted-foreground">
        <summary className="w-fit cursor-pointer">Contactos e horário</summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Headphones, label: "Helpdesk InfoCIIPS", value: "infociips@ipsantarem.pt", href: "mailto:infociips@ipsantarem.pt" },
          { icon: Phone, label: "Telefone", value: "243 309 520", href: "tel:+351243309520" },
          { icon: Mail, label: "Serviços Académicos", value: "academicos@ipsantarem.pt", href: "mailto:academicos@ipsantarem.pt" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand-300">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-xs font-medium text-muted-foreground">{item.label}</span>
                <span className="mt-0.5 block text-sm font-semibold">{item.value}</span>
              </span>
            </a>
          );
        })}
        </div>
        <p className="mt-3">Dias úteis, 09:00–18:00</p>
      </details>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_USER } from "@/components/providers/auth-provider";
import { grades } from "@/lib/data/portal";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "dados", label: "Dados pessoais", icon: UserRound },
  { id: "percurso", label: "Percurso académico", icon: GraduationCap },
  { id: "contactos", label: "Contactos", icon: Phone },
  { id: "seguranca", label: "Segurança", icon: ShieldCheck },
] as const;

type TabId = (typeof tabs)[number]["id"];

const personalFields = [
  { label: "Nome completo", value: DEMO_USER.name },
  { label: "Número de estudante", value: DEMO_USER.studentNumber },
  { label: "Data de nascimento", value: "12 de maio de 2005" },
  { label: "Nacionalidade", value: "Portuguesa" },
  { label: "Documento de identificação", value: "CC · ••••••• 4 ZX2" },
  { label: "NIF", value: "••• ••• •••" },
];

const academicFields = [
  { label: "Curso", value: DEMO_USER.course },
  { label: "Escola", value: DEMO_USER.school },
  { label: "Grau", value: "Licenciatura" },
  { label: "Ano curricular", value: "2.º ano" },
  { label: "Regime", value: "Diurno" },
  { label: "Estado", value: "Ativo" },
  { label: "Ano de ingresso", value: "2025/2026" },
  { label: "Coordenador de curso", value: "Prof. Doutor Nuno Matos" },
];

export function ProfileTabs() {
  const [tab, setTab] = useState<TabId>("dados");
  const [contacts, setContacts] = useState({
    email: DEMO_USER.email,
    phone: "+351 912 345 678",
    address: "Rua das Flores, 24, 2.º Esq.",
    postal: "2000-117",
    locality: "Santarém",
    emergencyName: "Ana Ferreira",
    emergencyPhone: "+351 934 567 890",
  });
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });

  function saveContacts(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Contactos atualizados", {
      description: "As alterações foram guardadas (demonstração).",
    });
  }

  function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.next.length < 8) {
      toast.error("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password.next !== password.confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setPassword({ current: "", next: "", confirm: "" });
    toast.success("Senha alterada", {
      description: "Usa a nova senha no próximo início de sessão (demonstração).",
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-3xl border border-border bg-card p-5 text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-md bg-brand-700 font-display text-2xl font-bold text-white">
            {DEMO_USER.avatarInitials}
          </span>
          <h2 className="font-display mt-3 text-lg font-semibold">{DEMO_USER.name}</h2>
          <p className="text-xs text-muted-foreground">{DEMO_USER.studentNumber}</p>
          <Badge variant="success" className="mt-3">
            <BadgeCheck className="size-3.5" />
            Conta ativa
          </Badge>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-left text-xs">
            <p className="flex items-start gap-2 text-muted-foreground">
              <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              {DEMO_USER.course.replace("Licenciatura em ", "")}
            </p>
            <p className="flex items-start gap-2 text-muted-foreground">
              <Building2 className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              {DEMO_USER.school}
            </p>
            <p className="flex items-start gap-2 text-muted-foreground">
              <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              {DEMO_USER.semester}
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Perfil completo</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-full rounded-sm bg-emerald-600" />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Todos os dados obrigatórios estão preenchidos.
          </p>
        </div>
      </aside>

      <div className="rounded-3xl border border-border bg-card">
        <div className="scrollbar-thin flex gap-1 overflow-x-auto border-b border-border p-2">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors",
                  tab === item.id
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-selected={tab === item.id}
                role="tab"
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-5 sm:p-6">
          {tab === "dados" ? (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">Dados pessoais</h2>
                  <p className="text-xs text-muted-foreground">
                    Geridos pelos serviços académicos. Para alterar, submete um requerimento.
                  </p>
                </div>
                <Badge variant="outline">Só leitura</Badge>
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {personalFields.map((field) => (
                  <div key={field.label} className="rounded-2xl border border-border p-4">
                    <dt className="text-xs font-medium text-muted-foreground">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{field.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
                <LockKeyhole className="mt-0.5 size-4 shrink-0" />
                Por motivos de segurança, a alteração de nome, documento ou NIF exige
                comprovativo e é validada pelos serviços académicos.
              </div>
              <Button variant="outline" className="mt-4">
                Pedir alteração de dados
              </Button>
            </div>
          ) : null}

          {tab === "percurso" ? (
            <div>
              <div>
                <h2 className="font-display text-lg font-semibold">Percurso académico</h2>
                <p className="text-xs text-muted-foreground">
                  Informação do teu registo académico em 2026/2027.
                </p>
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {academicFields.map((field) => (
                  <div key={field.label} className="rounded-2xl border border-border p-4">
                    <dt className="text-xs font-medium text-muted-foreground">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-snug">{field.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Média atual", "15,4"],
                  ["ECTS concluídos", "60"],
                  ["UCs inscritas", "6"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-brand-50 p-4 dark:bg-brand-950">
                    <p className="text-xs font-medium text-brand-700 dark:text-brand-300">
                      {label}
                    </p>
                    <p className="font-display mt-1 text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
                  <div>
                    <h3 className="text-sm font-semibold">Unidades curriculares e classificações</h3>
                    <p className="text-xs text-muted-foreground">Histórico completo disponível neste registo</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{grades.length} unidades</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium text-muted-foreground">
                        <th className="px-4 py-2.5">Unidade curricular</th>
                        <th className="px-3 py-2.5">Ano letivo · semestre</th>
                        <th className="px-3 py-2.5">ECTS</th>
                        <th className="px-4 py-2.5 text-right">Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade) => (
                        <tr key={grade.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 font-medium">{grade.unit}</td>
                          <td className="px-3 py-3 text-xs text-muted-foreground">{grade.semester}</td>
                          <td className="px-3 py-3 text-muted-foreground">{grade.ects}</td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-display font-bold">{grade.status === "Em avaliação" ? "—" : grade.grade}</span>
                            <span className="ml-2 text-[0.65rem] text-muted-foreground">{grade.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                  As notas das unidades ainda em avaliação serão atualizadas após a publicação das pautas.
                </p>
              </div>
            </div>
          ) : null}

          {tab === "contactos" ? (
            <form onSubmit={saveContacts}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">Contactos</h2>
                  <p className="text-xs text-muted-foreground">
                    Mantém os teus contactos atualizados para receberes comunicações.
                  </p>
                </div>
                <Badge variant="sand">Editável</Badge>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="email">Email institucional</Label>
                  <Input id="email" type="email" value={contacts.email} onChange={(event) => setContacts({ ...contacts, email: event.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telemóvel</Label>
                  <Input id="phone" value={contacts.phone} onChange={(event) => setContacts({ ...contacts, phone: event.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="postal">Código postal</Label>
                  <Input id="postal" value={contacts.postal} onChange={(event) => setContacts({ ...contacts, postal: event.target.value })} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="address">Morada</Label>
                  <Input id="address" value={contacts.address} onChange={(event) => setContacts({ ...contacts, address: event.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="locality">Localidade</Label>
                  <Input id="locality" value={contacts.locality} onChange={(event) => setContacts({ ...contacts, locality: event.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="emergencyName">Contacto de emergência</Label>
                  <Input id="emergencyName" value={contacts.emergencyName} onChange={(event) => setContacts({ ...contacts, emergencyName: event.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="emergencyPhone">Telefone de emergência</Label>
                  <Input id="emergencyPhone" value={contacts.emergencyPhone} onChange={(event) => setContacts({ ...contacts, emergencyPhone: event.target.value })} />
                </div>
              </div>
              <Button type="submit" className="mt-5">
                <Save className="size-4" />
                Guardar alterações
              </Button>
            </form>
          ) : null}

          {tab === "seguranca" ? (
            <div>
              <h2 className="font-display text-lg font-semibold">Segurança da conta</h2>
              <p className="text-xs text-muted-foreground">
                Altera a senha e consulta os acessos recentes.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold">Conta protegida</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Último acesso a 5 de novembro, 09:12.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border p-4">
                  <LockKeyhole className="mt-0.5 size-4 shrink-0 text-brand-500" />
                  <div>
                    <p className="text-sm font-semibold">Autenticação em dois passos</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Recomendada, mas ainda não ativa.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={changePassword} className="mt-6 max-w-md space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <KeyRound className="size-4 text-brand-500" />
                  Alterar senha
                </h3>
                <div className="space-y-1.5">
                  <Label htmlFor="current">Senha atual</Label>
                  <Input id="current" type="password" value={password.current} onChange={(event) => setPassword({ ...password, current: event.target.value })} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="next">Nova senha</Label>
                  <Input id="next" type="password" value={password.next} onChange={(event) => setPassword({ ...password, next: event.target.value })} minLength={8} required />
                  <p className="text-[0.7rem] text-muted-foreground">Mínimo de 8 caracteres, com letras e números.</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirmar nova senha</Label>
                  <Input id="confirm" type="password" value={password.confirm} onChange={(event) => setPassword({ ...password, confirm: event.target.value })} required />
                </div>
                <Button type="submit">
                  <Save className="size-4" />
                  Alterar senha
                </Button>
              </form>

              <div className="mt-6 rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Mail className="size-4 text-brand-500" />
                  Sessões ativas
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-medium">Este dispositivo · Linux</p>
                    <p className="text-muted-foreground">Santarém, Portugal · agora</p>
                  </div>
                  <Badge variant="success">Atual</Badge>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

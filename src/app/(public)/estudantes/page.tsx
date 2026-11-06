import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  Library,
  Mail,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { examCalendar } from "@/lib/data/exams";

const primaryTools = [
  {
    title: "Plataforma de Gestão Académica",
    description: "Matrículas, notas, horários, conta corrente e requerimentos.",
    href: "/portal",
    icon: GraduationCap,
  },
  {
    title: "Exames | Inscrição online",
    description: "Épocas normal, recurso e especial. Consulta regras e taxas.",
    href: "/exames",
    icon: CalendarCheck2,
  },
  {
    title: "Matrículas e inscrições",
    description: "Prazos, documentos e passos para renovar a inscrição.",
    href: "/matriculas",
    icon: ClipboardCheck,
  },
  {
    title: "Links úteis e documentos",
    description: "Requerimentos, declarações, guias e regulamentos.",
    href: "/links-documentos",
    icon: FileText,
  },
];

const supportLinks = [
  {
    title: "Cartão de estudante",
    description: "Cartão Caixa IU, acesso a serviços e manual de utilização.",
    href: "/portal/cartao",
    icon: CreditCard,
  },
  {
    title: "Seguro escolar",
    description: "Procedimentos em caso de acidente escolar.",
    href: "/links-documentos?categoria=Guias",
    icon: ShieldCheck,
  },
  {
    title: "Tesouraria",
    description: "Propinas, taxas, emolumentos e planos de pagamento.",
    href: "/portal/conta-corrente",
    icon: Wallet,
  },
  {
    title: "Serviços de Ação Social",
    description: "Bolsas, refeitórios, residências e apoios sociais.",
    href: "https://www.ipsantarem.pt/servicos-de-acao-social/",
    icon: HeartHandshake,
  },
  {
    title: "Unidade Biblioteca",
    description: "Empréstimos, bases de dados e recursos científicos.",
    href: "https://www.ipsantarem.pt/biblioteca/",
    icon: Library,
  },
  {
    title: "Helpdesk InfoCIIPS",
    description: "Apoio técnico, Wi-Fi, email e plataformas digitais.",
    href: "/portal/helpdesk",
    icon: HelpCircle,
  },
];

const guidelines = [
  {
    step: "01",
    title: "Entra no portal",
    description:
      "Acede à plataforma com o número de estudante e a senha. Se for o primeiro acesso, usa a senha inicial indicada no guia.",
  },
  {
    step: "02",
    title: "Confirma os teus dados",
    description:
      "Verifica o perfil, o curso, o ano curricular e as unidades curriculares em que estás inscrito.",
  },
  {
    step: "03",
    title: "Trata do que precisas",
    description:
      "Inscreve-te em exames, consulta notas, descarrega documentos ou submete requerimentos.",
  },
];

export const metadata = {
  title: "Estudantes",
  description:
    "Serviços e informação para estudantes da UPSantarém: exames, matrículas, documentos, cartão de estudante, apoio social e helpdesk.",
};

export default function EstudantesPage() {
  return (
    <div>
      <PageHero
        title="Tudo o que precisas para o teu percurso"
        description="Consulta exames, matrículas, documentos e apoios. A tua vida académica organizada num só lugar, com acesso rápido aos serviços da Universidade."
        breadcrumbs={[{ label: "Estudantes" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/portal" className={buttonVariants({ size: "lg" })}>
            Entrar na plataforma
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <div className="grid gap-x-10 md:grid-cols-2 xl:grid-cols-4">
          {primaryTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col border-t border-border py-5"
              >
                <Icon className="size-5 text-primary" />
                <h2 className="font-display mt-4 text-lg font-semibold leading-snug">
                  {tool.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Aceder
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-4xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Como usar a plataforma académica
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A plataforma concentra a tua informação académica. Segue estes passos
              para começares.
            </p>
            <div className="mt-6 space-y-3">
              {guidelines.map((item) => (
                <div key={item.step} className="flex gap-4 rounded-2xl bg-muted/50 p-4">
                  <span className="font-display text-xl font-bold text-brand-400">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <details className="mt-5 border-t border-border pt-4 text-sm">
              <summary className="cursor-pointer font-semibold">Credenciais de demonstração</summary>
              <p className="mt-2 text-muted-foreground">
                Número de estudante <strong>2025001</strong> · senha <strong>demo1234</strong>
              </p>
            </details>
          </div>

          <div className="bg-brand-950 p-6 text-white sm:p-8">
            <Mail className="size-5 text-sand-300" />
            <h2 className="font-display mt-5 text-2xl font-semibold tracking-tight">
              Precisas de apoio?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Cada escola tem serviços académicos próprios. Contacta a tua escola
              para assuntos de matrícula, notas, exames ou documentos.
            </p>
            <div className="mt-5 divide-y divide-white/10 border-t border-white/10 text-sm">
              {[
                ["Serviços Centrais", "academicos@ipsantarem.pt"],
                ["ESAS", "servicos.academicos@esa.ipsantarem.pt"],
                ["ESDRM", "academicos@esdrm.ipsantarem.pt"],
                ["ESES", "sa@ese.ipsantarem.pt"],
                ["ESGTS", "academicos@esg.ipsantarem.pt"],
                ["ESSS", "academico@essaude.ipsantarem.pt"],
              ].map(([school, email]) => (
                <div key={school} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="text-white/60">{school}</span>
                  <a href={`mailto:${email}`} className="text-right text-xs font-medium text-sand-200 hover:underline">
                    {email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16" id="exames">
        <SectionHeading
          title="Épocas de exames 2026/2027"
          description="Consulta as datas por escola. A inscrição é obrigatória em todas as épocas."
            action={{ label: "Ver calendário completo", href: "/exames" }}
        />
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="hidden grid-cols-[1fr_1fr_1fr_1fr] gap-4 border-b border-border bg-muted/40 px-6 py-3 text-xs font-medium text-muted-foreground sm:grid">
            <span>Escola</span>
            <span>Normal</span>
            <span>Recurso</span>
            <span>Especial</span>
          </div>
          {examCalendar.map((row) => (
            <div
              key={row.school}
              className="grid gap-2 border-b border-border px-6 py-4 text-sm last:border-0 sm:grid-cols-[1fr_1fr_1fr_1fr] sm:items-center sm:gap-4"
            >
              <span className="font-display font-semibold">{row.school}</span>
              <span className="text-muted-foreground">{row.normal}</span>
              <span className="text-muted-foreground">{row.recurso}</span>
              <span className="text-muted-foreground">{row.special}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16" id="matriculas">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Renovação de inscrição
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              O prazo para renovação de inscrição decorre de 15 de julho a 31 de
              agosto de 2026. As unidades curriculares de opção têm vagas limitadas
              e são preenchidas por ordem de inscrição.
            </p>
            <Link href="/matriculas" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Ver guia de matrícula <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="border-t border-border pt-6" id="tesouraria">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Propinas e pagamentos
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Consulta o valor das propinas, as prestações e os emolumentos. A
              conta corrente mostra todos os movimentos e o estado de cada
              pagamento.
            </p>
            <Link href="/portal/conta-corrente" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Consultar conta corrente <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <SectionHeading
          title="Apoios e serviços"
          description="A Universidade acompanha-te ao longo de todo o percurso, dentro e fora da sala."
        />
        <div className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {supportLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group flex items-start gap-3 border-t border-border py-4"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1">
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    {link.title}
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
        <div className="rounded-4xl border border-border bg-muted/40 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Também queres estudar connosco?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Conhece a oferta formativa e as candidaturas.
              </p>
            </div>
            <Link href="/ensino" className={buttonVariants()}>
              <GraduationCap className="size-4" />
              Ver cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

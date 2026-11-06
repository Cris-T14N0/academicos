import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { schools } from "@/lib/data/schools";

const CURRENT_YEAR = new Date().getFullYear();

const columns = [
  {
    title: "Ensino",
    links: [
      { label: "Cursos Técnicos (TeSP)", href: "/ensino/tesp" },
      { label: "Licenciaturas", href: "/ensino/licenciaturas" },
      { label: "Mestrados", href: "/ensino/mestrados" },
      { label: "Pós-graduações", href: "/ensino/pos-graduacoes" },
      { label: "Microcredenciais", href: "/ensino/microcredenciais" },
    ],
  },
  {
    title: "Estudantes",
    links: [
      { label: "Exames e inscrições", href: "/exames" },
      { label: "Matrículas e renovações", href: "/matriculas" },
      { label: "Links úteis e documentos", href: "/links-documentos" },
      { label: "Portal do estudante", href: "/portal" },
      { label: "Helpdesk", href: "/portal/helpdesk" },
    ],
  },
  {
    title: "Universidade",
    links: [
      { label: "Candidaturas", href: "/candidaturas" },
      { label: "Notícias", href: "/noticias" },
      { label: "Pesquisa", href: "/pesquisa" },
      { label: "Legislação", href: "/legislacao" },
      { label: "Política de privacidade", href: "/privacidade" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-brand-950 text-white">
      <div className="container-page">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Portal académico da Universidade Politécnica de Santarém. Reúne a
              oferta formativa, os serviços de estudante e a informação institucional.
            </p>
            <div className="mt-7 space-y-3 text-sm text-white/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sand-300" />
                Complexo Andaluz, Apartado 279 · 2001-904 Santarém
              </p>
              <a href="mailto:academicos@ipsantarem.pt" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-sand-300" />
                academicos@ipsantarem.pt
              </a>
              <a href="tel:+351243309520" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="size-4 shrink-0 text-sand-300" />
                +351 243 309 520
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-sand-300">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="mb-4 text-sm font-semibold text-sand-300">Escolas</p>
          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
            {schools.map((school) => (
              <Link
                key={school.id}
                href={`/ensino?escola=${school.id}`}
                className="group flex items-center justify-between gap-3 border-t border-white/10 py-3 transition-colors hover:border-white/30"
              >
                <span>
                  <span className="block text-sm font-semibold">{school.short}</span>
                  <span className="mt-0.5 block text-[0.7rem] leading-snug text-white/45">
                    {school.name.replace("Escola Superior ", "")}
                  </span>
                </span>
                <ArrowUpRight className="size-3.5 shrink-0 text-white/30 transition-colors group-hover:text-sand-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} Universidade Politécnica de Santarém. Protótipo demonstrativo.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacidade" className="transition-colors hover:text-white">
              Privacidade
            </Link>
            <Link href="/privacidade#cookies" className="transition-colors hover:text-white">
              Cookies
            </Link>
            <Link href="/legislacao" className="transition-colors hover:text-white">
              Legislação
            </Link>
            <span className="border border-white/15 px-2.5 py-1">Dados fictícios</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

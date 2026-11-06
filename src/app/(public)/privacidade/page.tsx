import Link from "next/link";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { CookiePreferences } from "@/components/privacy/cookie-preferences";
import { PageHero } from "@/components/ui/page-hero";

export const metadata = {
  title: "Privacidade e cookies",
  description:
    "Política de privacidade e cookies do portal académico da UPSantarém: dados recolhidos, finalidades, direitos e contactos.",
};

const sections = [
  { id: "responsavel", label: "Responsável pelo tratamento" },
  { id: "dados", label: "Dados que recolhemos" },
  { id: "finalidades", label: "Finalidades e fundamentos" },
  { id: "conservacao", label: "Prazos de conservação" },
  { id: "partilha", label: "Partilha de dados" },
  { id: "direitos", label: "Os teus direitos" },
  { id: "seguranca", label: "Segurança" },
  { id: "cookies", label: "Cookies" },
  { id: "contactos", label: "Contactos" },
];

export default function PrivacidadePage() {
  return (
    <div>
      <PageHero
        title="Privacidade e cookies"
        description="Sabemos que os teus dados académicos são sensíveis. Esta página explica o que recolhemos, porquê e como podes exercer os teus direitos."
        breadcrumbs={[{ label: "Privacidade" }]}
      >
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            RGPD · Regulamento (UE) 2016/679
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground">
            <LockKeyhole className="size-3.5 text-muted-foreground" />
            Última atualização: 1 de novembro de 2026
          </span>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
              Nesta página
            </p>
            <nav className="space-y-0.5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Nota</p>
              <p className="mt-1">
                Este portal é um protótipo demonstrativo. Todos os dados de
                estudante apresentados são fictícios.
              </p>
            </div>
          </aside>

          <div className="max-w-3xl">
            <div className="prose-institutional text-sm leading-relaxed text-muted-foreground">
              <p>
                A Universidade Politécnica de Santarém (UPSantarém) valoriza a
                proteção dos dados pessoais da sua comunidade académica. Esta
                política aplica-se ao portal Académicos e aos serviços digitais
                associados.
              </p>

              <h2 id="responsavel">Responsável pelo tratamento</h2>
              <p>
                O responsável pelo tratamento é a Universidade Politécnica de
                Santarém, com sede no Complexo Andaluz, Apartado 279, 2001-904
                Santarém. O Encarregado de Proteção de Dados (DPO) pode ser
                contactado através do endereço{" "}
                <a href="mailto:dpo@ipsantarem.pt" className="font-semibold text-primary hover:underline">
                  dpo@ipsantarem.pt
                </a>
                .
              </p>

              <h2 id="dados">Dados que recolhemos</h2>
              <ul>
                <li>Dados de identificação: nome, número de estudante, data de nascimento e documento de identificação.</li>
                <li>Dados de contacto: email institucional, telefone e endereço postal.</li>
                <li>Dados académicos: curso, unidades curriculares, classificações, inscrições e exames.</li>
                <li>Dados financeiros: propinas, taxas, emolumentos e estado dos pagamentos.</li>
                <li>Dados de utilização: registos de acesso, endereço IP e preferências de navegação.</li>
              </ul>

              <h2 id="finalidades">Finalidades e fundamentos de licitude</h2>
              <p>Os dados são tratados para as seguintes finalidades:</p>
              <ul>
                <li>Gestão da relação académica e prestação de serviços de ensino.</li>
                <li>Cumprimento de obrigações legais, designadamente de natureza académica e fiscal.</li>
                <li>Autenticação e segurança das plataformas digitais.</li>
                <li>Comunicação institucional e apoio ao estudante.</li>
                <li>Melhoria contínua dos serviços, com base em dados agregados.</li>
              </ul>

              <h2 id="conservacao">Prazos de conservação</h2>
              <p>
                Os dados são conservados apenas pelo período necessário às
                finalidades que motivaram a sua recolha e de acordo com os prazos
                legais aplicáveis. Os registos académicos são conservados de forma
                permanente, nos termos da legislação em vigor. Os dados de
                utilização são conservados por um período máximo de 12 meses.
              </p>

              <h2 id="partilha">Partilha de dados</h2>
              <p>
                Os dados podem ser comunicados a entidades públicas com
                competências legais nas áreas do ensino superior, ação social e
                financiamento, bem como a prestadores de serviços que atuam em
                nome da UPSantarém, sempre com garantias contratuais adequadas.
              </p>

              <h2 id="direitos">Os teus direitos</h2>
              <p>
                Enquanto titular dos dados, tens direito a aceder, retificar,
                apagar, limitar o tratamento, opor-te e solicitar a portabilidade
                dos teus dados. Podes ainda retirar o consentimento a qualquer
                momento, sem comprometer a licitude do tratamento previamente
                efetuado.
              </p>
              <p>
                Para exercer estes direitos, contacta o DPO. Tens também o direito
                de apresentar reclamação à Comissão Nacional de Proteção de Dados
                (CNPD).
              </p>

              <h2 id="seguranca">Segurança</h2>
              <p>
                A UPSantarém adota medidas técnicas e organizativas adequadas para
                proteger os dados pessoais contra acesso não autorizado, perda ou
                destruição, incluindo autenticação, controlo de acessos, cifra de
                comunicações e registo de atividades.
              </p>
            </div>

            <div className="mt-10" id="cookies">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Como usamos cookies
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Os cookies são pequenos ficheiros guardados no teu dispositivo que
                permitem manter a sessão, recordar preferências e compreender a
                utilização do portal. Podes gerir as tuas preferências abaixo.
              </p>

              <div className="mt-5 overflow-hidden rounded-3xl border border-border">
                <div className="hidden grid-cols-[1fr_1fr_1fr] gap-3 border-b border-border bg-muted/40 px-5 py-3 text-xs font-medium text-muted-foreground sm:grid">
                  <span>Categoria</span>
                  <span>Finalidade</span>
                  <span>Duração</span>
                </div>
                {[
                  ["Essenciais", "Sessão e segurança", "Sessão"],
                  ["Preferências", "Tema e filtros", "12 meses"],
                  ["Analítica", "Estatísticas agregadas", "12 meses"],
                ].map(([category, purpose, duration]) => (
                  <div
                    key={category}
                    className="grid gap-1 border-b border-border px-5 py-4 text-sm last:border-0 sm:grid-cols-[1fr_1fr_1fr] sm:gap-3"
                  >
                    <span className="font-semibold">{category}</span>
                    <span className="text-muted-foreground">{purpose}</span>
                    <span className="text-muted-foreground">{duration}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <CookiePreferences />
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-6" id="contactos">
              <h2 className="font-display text-xl font-semibold">Contactos</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Para questões sobre privacidade ou para exercer os teus direitos,
                contacta o Encarregado de Proteção de Dados.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="mailto:dpo@ipsantarem.pt"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <Mail className="size-4" />
                  dpo@ipsantarem.pt
                </a>
                <Link
                  href="/estudantes"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold"
                >
                  Serviços académicos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

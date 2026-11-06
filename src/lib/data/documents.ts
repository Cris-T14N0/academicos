export type DocumentItem = {
  id: string;
  title: string;
  category: DocumentCategory;
  type: "PDF" | "DOCX" | "XLSX" | "Ligação";
  size: string;
  updated: string;
  description?: string;
  href?: string;
};

export type DocumentCategory =
  | "Calendários"
  | "Requerimentos"
  | "Declarações"
  | "Creditações"
  | "Avaliações"
  | "Guias"
  | "Legislação"
  | "Plataformas";

export const documentCategories: DocumentCategory[] = [
  "Calendários",
  "Requerimentos",
  "Declarações",
  "Creditações",
  "Avaliações",
  "Guias",
  "Legislação",
  "Plataformas",
];

const docs: Omit<DocumentItem, "id">[] = [
  {
    title: "Calendário Académico 2026/2027",
    category: "Calendários",
    type: "PDF",
    size: "420 KB",
    updated: "2026-10-22",
    description: "Períodos letivos, épocas de exames e prazos administrativos.",
  },
  {
    title: "Calendário Académico 2025/2026 — ESDRM",
    category: "Calendários",
    type: "PDF",
    size: "380 KB",
    updated: "2026-09-12",
  },
  {
    title: "Calendário de exames — 1.º semestre 2026/2027",
    category: "Calendários",
    type: "PDF",
    size: "290 KB",
    updated: "2026-10-30",
  },
  {
    title: "Requerimento geral",
    category: "Requerimentos",
    type: "DOCX",
    size: "48 KB",
    updated: "2026-09-05",
    description: "Modelo para pedidos genéricos aos serviços académicos.",
  },
  {
    title: "Requerimento — anulação de matrícula/inscrição",
    category: "Requerimentos",
    type: "DOCX",
    size: "52 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — certidão de frequência e exame",
    category: "Requerimentos",
    type: "DOCX",
    size: "44 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — certidões diversas",
    category: "Requerimentos",
    type: "DOCX",
    size: "46 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — inscrição em exames",
    category: "Requerimentos",
    type: "DOCX",
    size: "51 KB",
    updated: "2026-09-19",
  },
  {
    title: "Requerimento — justificação de faltas",
    category: "Requerimentos",
    type: "DOCX",
    size: "39 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — revisão de prova",
    category: "Requerimentos",
    type: "DOCX",
    size: "41 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — pedido de atribuição de estatuto",
    category: "Requerimentos",
    type: "DOCX",
    size: "47 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — plano de regularização de propinas",
    category: "Requerimentos",
    type: "DOCX",
    size: "43 KB",
    updated: "2026-09-05",
  },
  {
    title: "Requerimento — creditação",
    category: "Creditações",
    type: "DOCX",
    size: "55 KB",
    updated: "2026-09-10",
  },
  {
    title: "Portfólio de creditação",
    category: "Creditações",
    type: "DOCX",
    size: "62 KB",
    updated: "2026-09-10",
  },
  {
    title: "Declaração de identificação",
    category: "Declarações",
    type: "PDF",
    size: "88 KB",
    updated: "2026-08-28",
  },
  {
    title: "Declaração de presença",
    category: "Declarações",
    type: "PDF",
    size: "74 KB",
    updated: "2026-08-28",
  },
  {
    title: "Declaração sob compromisso de honra",
    category: "Declarações",
    type: "PDF",
    size: "91 KB",
    updated: "2026-08-28",
  },
  {
    title: "Passe sub23@superior.tp — ESGT",
    category: "Declarações",
    type: "PDF",
    size: "120 KB",
    updated: "2026-09-02",
  },
  {
    title: "Folha de avaliação pautada",
    category: "Avaliações",
    type: "PDF",
    size: "65 KB",
    updated: "2026-09-01",
  },
  {
    title: "Folha de avaliação quadriculada",
    category: "Avaliações",
    type: "PDF",
    size: "68 KB",
    updated: "2026-09-01",
  },
  {
    title: "Linhas orientadoras de avaliação — Despacho n.º 97/2023",
    category: "Avaliações",
    type: "PDF",
    size: "310 KB",
    updated: "2026-08-20",
  },
  {
    title: "Guia de acolhimento UPSantarém",
    category: "Guias",
    type: "PDF",
    size: "1,4 MB",
    updated: "2026-08-18",
    description: "Tudo o que precisas de saber para começar o ano letivo.",
  },
  {
    title: "Manual do cartão de estudante",
    category: "Guias",
    type: "PDF",
    size: "760 KB",
    updated: "2026-08-18",
  },
  {
    title: "Guia de apoio à matrícula",
    category: "Guias",
    type: "PDF",
    size: "540 KB",
    updated: "2026-08-18",
  },
  {
    title: "Legislação para estudantes",
    category: "Legislação",
    type: "Ligação",
    size: "—",
    updated: "2026-08-01",
    href: "https://www.ipsantarem.pt/legislacao-estudantes/",
  },
  {
    title: "Estatutos da UPSantarém",
    category: "Legislação",
    type: "PDF",
    size: "620 KB",
    updated: "2026-08-01",
  },
  {
    title: "Regulamento de avaliação",
    category: "Legislação",
    type: "PDF",
    size: "410 KB",
    updated: "2026-08-01",
  },
  {
    title: "Moodle UPSantarém",
    category: "Plataformas",
    type: "Ligação",
    size: "—",
    updated: "2026-09-01",
    href: "https://moodle.ipsantarem.pt",
  },
  {
    title: "e-Campus",
    category: "Plataformas",
    type: "Ligação",
    size: "—",
    updated: "2026-09-01",
    href: "https://ecampus.ipsantarem.pt",
  },
  {
    title: "Webmail institucional",
    category: "Plataformas",
    type: "Ligação",
    size: "—",
    updated: "2026-09-01",
  },
  {
    title: "Serviços de Ação Social",
    category: "Plataformas",
    type: "Ligação",
    size: "—",
    updated: "2026-09-01",
    href: "https://www.ipsantarem.pt/servicos-de-acao-social/",
  },
];

export const documents: DocumentItem[] = docs.map((doc, index) => ({
  ...doc,
  id: `doc-${String(index + 1).padStart(3, "0")}`,
}));

export const quickLinks = [
  {
    label: "Webmail institucional",
    description: "Correio eletrónico da UPSantarém",
    href: "https://www.ipsantarem.pt",
    kind: "email",
  },
  {
    label: "Moodle / e-Learn",
    description: "Conteúdos e atividades das unidades curriculares",
    href: "https://moodle.ipsantarem.pt",
    kind: "book",
  },
  {
    label: "e-Campus",
    description: "Campus virtual e serviços digitais",
    href: "https://ecampus.ipsantarem.pt",
    kind: "globe",
  },
  {
    label: "Serviços de Ação Social",
    description: "Bolsas, refeitórios e apoios",
    href: "https://www.ipsantarem.pt/servicos-de-acao-social/",
    kind: "heart",
  },
  {
    label: "Unidade Biblioteca",
    description: "Recursos, empréstimos e bases de dados",
    href: "https://www.ipsantarem.pt/biblioteca/",
    kind: "library",
  },
  {
    label: "Helpdesk InfoCIIPS",
    description: "Apoio técnico e reporte de ocorrências",
    href: "https://infociips.ipsantarem.pt/",
    kind: "help",
  },
  {
    label: "Cartão de estudante",
    description: "Informação e manual do Cartão Caixa IU",
    href: "/links-documentos?categoria=Guias",
    kind: "card",
  },
  {
    label: "Tesouraria",
    description: "Pagamentos, propinas e emolumentos",
    href: "/estudantes#tesouraria",
    kind: "wallet",
  },
];

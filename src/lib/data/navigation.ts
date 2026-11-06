export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

export const ensinoGroups: NavGroup[] = [
  {
    label: "Graus e ciclos",
    links: [
      {
        label: "Cursos Técnicos Superiores Profissionais",
        href: "/ensino/tesp",
        description: "Formação prática de 2 anos, com estágio.",
      },
      {
        label: "Licenciaturas",
        href: "/ensino/licenciaturas",
        description: "3 anos de formação inicial e prática.",
      },
      {
        label: "Mestrados",
        href: "/ensino/mestrados",
        description: "Especialização e investigação aplicada.",
      },
      {
        label: "Pós-graduações",
        href: "/ensino/pos-graduacoes",
        description: "Percursos curtos para profissionais.",
      },
    ],
  },
  {
    label: "Outras ofertas",
    links: [
      {
        label: "Microcredenciais",
        href: "/ensino/microcredenciais",
        description: "Competências certificadas e flexíveis.",
      },
      {
        label: "Mobilidade Internacional",
        href: "/ensino/mobilidade",
        description: "Erasmus+ e experiências internacionais.",
      },
      {
        label: "Cursos não ativos",
        href: "/ensino/cursos-nao-ativos",
        description: "Histórico da oferta formativa.",
      },
      {
        label: "Guia de acolhimento",
        href: "/links-documentos?categoria=Guias",
        description: "Tudo para começar o ano letivo.",
      },
    ],
  },
];

export const mainNav: NavLink[] = [
  { label: "Ensino", href: "/ensino" },
  { label: "Estudantes", href: "/estudantes" },
  { label: "Candidaturas", href: "/candidaturas" },
  { label: "Notícias", href: "/noticias" },
];

export const studentQuickLinks: NavLink[] = [
  { label: "Plataforma de Gestão Académica", href: "/portal" },
  { label: "Exames | Inscrição online", href: "/portal/exames" },
  { label: "Matrículas e inscrições", href: "/portal/matriculas" },
  { label: "Horários e calendário", href: "/portal/horarios" },
  { label: "Notas e pautas", href: "/portal/notas" },
  { label: "Conta corrente", href: "/portal/conta-corrente" },
  { label: "Requerimentos e certidões", href: "/portal/documentos" },
  { label: "Cartão de estudante", href: "/portal/cartao" },
];

export const portalNav = [
  { label: "Visão geral", href: "/portal", icon: "layout-dashboard" },
  { label: "Perfil", href: "/portal/perfil", icon: "user" },
  { label: "Matrículas e inscrições", href: "/portal/matriculas", icon: "clipboard-check" },
  { label: "Inscrições em exames", href: "/portal/exames", icon: "calendar-check" },
  { label: "Notas e pautas", href: "/portal/notas", icon: "graduation-cap" },
  { label: "Horários", href: "/portal/horarios", icon: "calendar-days" },
  { label: "Conta corrente", href: "/portal/conta-corrente", icon: "wallet" },
  { label: "Documentos", href: "/portal/documentos", icon: "file-text" },
  { label: "Cartão de estudante", href: "/portal/cartao", icon: "credit-card" },
  { label: "Helpdesk", href: "/portal/helpdesk", icon: "life-buoy" },
] as const;

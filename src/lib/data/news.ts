export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  content: string[];
};

export const news: NewsItem[] = [
  {
    slug: "upsantarem-recebe-campeonato-nacional-de-padel",
    title: "UPSantarém recebe o Campeonato Nacional Universitário de Padel",
    excerpt:
      "A Universidade Politécnica de Santarém acolhe, de 2 a 4 de novembro, mais uma prova do calendário nacional universitário.",
    date: "2026-10-28",
    category: "Desporto",
    tags: ["ESDRM", "desporto", "campus"],
    content: [
      "A Universidade Politécnica de Santarém (UPSantarém) recebe, entre 2 e 4 de novembro, o Campeonato Nacional Universitário de Padel, uma organização conjunta com a Federação Académica do Desporto Universitário.",
      "A prova reúne estudantes-atletas de várias instituições de ensino superior e decorre nos courts do complexo desportivo de Rio Maior. A entrada é gratuita para a comunidade académica.",
      "Além da competição, o evento inclui ações de sensibilização para a prática desportiva regular e para a conciliação entre o percurso académico e a carreira desportiva.",
    ],
  },
  {
    slug: "novo-calendario-academico-2026-2027",
    title: "Já está disponível o calendário académico de 2026/2027",
    excerpt:
      "Consulta os períodos letivos, as épocas de exames e os prazos de matrícula e renovação de inscrição.",
    date: "2026-10-22",
    category: "Académico",
    tags: ["calendário", "exames", "matrículas"],
    content: [
      "O calendário académico de 2026/2027 foi aprovado e já pode ser consultado na área de Estudantes e na secção de Links úteis e Documentos.",
      "O documento reúne os períodos de aulas, as interrupções letivas, as épocas de avaliação e os prazos administrativos de matrícula, renovação de inscrição e inscrição em exames.",
      "Recomenda-se a consulta regular do calendário e dos avisos das escolas, uma vez que podem existir especificidades por curso e por unidade orgânica.",
    ],
  },
  {
    slug: "ecampus-novos-espacos-de-aprendizagem",
    title: "e-Campus reforça espaços de aprendizagem online",
    excerpt:
      "O campus virtual da UPSantarém passa a integrar novos percursos de formação e ferramentas de apoio ao estudo.",
    date: "2026-10-15",
    category: "Ensino",
    tags: ["e-campus", "moodle", "ensino a distância"],
    content: [
      "O e-Campus da UPSantarém atualizou os seus espaços de aprendizagem, reforçando o apoio a estudantes do ensino presencial e a distância.",
      "O e-Learn continua a ser o ponto de acesso aos conteúdos das unidades curriculares, enquanto o e-Train disponibiliza novos cursos de formação ao longo da vida.",
      "A comunidade académica pode ainda recorrer ao e-Help para esclarecer dúvidas técnicas e ao e-InfoHub para pesquisar recursos científicos.",
    ],
  },
  {
    slug: "semana-da-ciencia-e-inovacao",
    title: "Semana da Ciência e Inovação junta escolas e empresas da região",
    excerpt:
      "Quatro dias de palestras, oficinas e demonstrações de projetos desenvolvidos por estudantes e investigadores.",
    date: "2026-10-09",
    category: "Investigação",
    tags: ["ciência", "inovação", "empresas"],
    content: [
      "A Semana da Ciência e Inovação da UPSantarém reúne, durante quatro dias, investigadores, estudantes e empresas da região do Ribatejo.",
      "O programa inclui palestras sobre transição digital, sustentabilidade e saúde, além de oficinas práticas e demonstrações de projetos em laboratório.",
      "As sessões são abertas à comunidade, mediante inscrição prévia, e decorrem nos vários campi da Universidade.",
    ],
  },
  {
    slug: "programa-de-mentoria-abre-inscricoes",
    title: "Programa de Mentoria abre inscrições para novos mentores",
    excerpt:
      "Estudantes dos anos mais avançados podem acompanhar a integração de colegas que chegam agora à Universidade.",
    date: "2026-09-30",
    category: "Estudantes",
    tags: ["mentoria", "integração", "acolhimento"],
    content: [
      "O Programa de Mentoria da UPSantarém está com inscrições abertas para estudantes mentores. A iniciativa promove o acolhimento, a partilha de experiências e o sucesso académico.",
      "Cada mentor acompanha um pequeno grupo de novos estudantes, apoiando a adaptação ao campus, aos serviços e às plataformas digitais.",
      "A participação é reconhecida com certificado e contribui para o desenvolvimento de competências transversais.",
    ],
  },
  {
    slug: "biblioteca-formacao-em-acesso-aberto",
    title: "Biblioteca promove formação sobre acesso aberto e investigação",
    excerpt:
      "Sessão online apresenta boas práticas de pesquisa, gestão de referências e publicação em acesso aberto.",
    date: "2026-09-24",
    category: "Biblioteca",
    tags: ["biblioteca", "investigação", "acesso aberto"],
    content: [
      "A Unidade Biblioteca da UPSantarém promove uma sessão de formação sobre acesso aberto, dirigida a estudantes e investigadores.",
      "A formação aborda a pesquisa em bases de dados, a gestão de referências bibliográficas e os critérios de qualidade das publicações.",
      "A participação é gratuita e confere certificado de presença.",
    ],
  },
  {
    slug: "novas-microcredenciais-em-competencias-digitais",
    title: "Novas microcredenciais em competências digitais",
    excerpt:
      "A oferta formativa de curta duração reforça áreas como cibersegurança, dados e transformação digital.",
    date: "2026-09-18",
    category: "Formação",
    tags: ["microcredenciais", "formação", "digital"],
    content: [
      "A UPSantarém alargou a oferta de microcredenciais nas áreas das competências digitais, com percursos flexíveis e certificados.",
      "As formações foram desenhadas para responder às necessidades de profissionais e organizações, em regime online e pós-laboral.",
      "A conclusão com aproveitamento confere uma credencial digital verificável.",
    ],
  },
  {
    slug: "candidaturas-2027-2028",
    title: "Candidaturas para 2027/2028: prepara o teu futuro",
    excerpt:
      "Conhece as fases de candidatura, as provas de ingresso e os apoios disponíveis para novos estudantes.",
    date: "2026-09-10",
    category: "Candidaturas",
    tags: ["candidaturas", "acesso", "futuro"],
    content: [
      "A UPSantarém prepara a nova época de candidaturas para 2027/2028, com informação atualizada sobre cursos, vagas e provas de ingresso.",
      "Os candidatos podem contar com apoio do Gabinete de Acesso ao Ensino Superior, que esclarece dúvidas sobre o concurso nacional e os regimes especiais.",
      "Consulta a área de Candidaturas para conhecer prazos, documentação necessária e contactos de apoio.",
    ],
  },
];

export function getNews(slug: string) {
  return news.find((item) => item.slug === slug);
}

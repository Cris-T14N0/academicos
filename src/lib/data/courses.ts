import { slugify } from "@/lib/utils";

export type Degree =
  | "TESP"
  | "Licenciatura"
  | "Mestrado"
  | "Pós-graduação"
  | "Microcredencial";

export type CurriculumUnit = {
  code: string;
  name: string;
  ects: number;
  type: "Obrigatória" | "Opção" | "Projeto";
};

export type CurriculumYear = {
  year: number;
  semester: string;
  units: CurriculumUnit[];
};

export type Course = {
  slug: string;
  name: string;
  degree: Degree;
  schoolId: string;
  area: string;
  duration: string;
  ects: number;
  regime: "Diurno" | "Pós-laboral" | "Misto" | "Online";
  vacancies: number;
  description: string;
  highlights: string[];
  careers: string[];
  access: string[];
  coordinator: string;
  curriculum: CurriculumYear[];
  featured?: boolean;
};

type CourseInput = {
  name: string;
  degree: Degree;
  schoolId: string;
  area: string;
  regime?: Course["regime"];
  vacancies?: number;
  description?: string;
  highlights?: string[];
  careers?: string[];
  access?: string[];
  coordinator?: string;
  featured?: boolean;
};

const curriculumLibrary: Record<string, string[][]> = {
  informatica: [
    ["Programação I", "Arquiteturas de Computadores", "Matemática Discreta", "Sistemas de Informação"],
    ["Programação II", "Bases de Dados", "Redes de Computadores", "Estatística Aplicada"],
    ["Engenharia de Software", "Sistemas Operativos", "Desenvolvimento Web", "Segurança Informática"],
    ["Inteligência Artificial", "Computação em Nuvem", "Gestão de Projetos", "Projeto Final"],
  ],
  gestao: [
    ["Fundamentos de Gestão", "Contabilidade Geral", "Economia", "Matemática Financeira"],
    ["Marketing", "Gestão Financeira", "Direito das Organizações", "Sistemas de Informação"],
    ["Gestão de Recursos Humanos", "Análise de Dados", "Fiscalidade", "Empreendedorismo"],
    ["Estratégia Empresarial", "Auditoria", "Simulação Empresarial", "Projeto Final"],
  ],
  saude: [
    ["Anatomia e Fisiologia", "Fundamentos de Enfermagem", "Microbiologia", "Ética e Deontologia"],
    ["Farmacologia", "Saúde Pública", "Cuidados de Enfermagem I", "Prática Clínica I"],
    ["Cuidados de Enfermagem II", "Saúde Mental", "Enfermagem Comunitária", "Prática Clínica II"],
    ["Investigação em Saúde", "Gestão de Cuidados", "Prática Clínica III", "Projeto Final"],
  ],
  educacao: [
    ["Psicologia da Educação", "Sociologia da Educação", "Didática Geral", "História da Educação"],
    ["Currículo e Avaliação", "Necessidades Educativas Especiais", "Literacias", "Prática Pedagógica I"],
    ["Metodologias de Investigação", "Educação Inclusiva", "Tecnologias Educativas", "Prática Pedagógica II"],
    ["Projeto Educativo", "Ética Profissional", "Seminário de Investigação", "Prática Pedagógica III"],
  ],
  agraria: [
    ["Biologia Vegetal", "Fundamentos de Química", "Solos e Fertilidade", "Ecologia Agrária"],
    ["Produção Agrícola", "Proteção de Plantas", "Zootecnia Geral", "Mecanização Agrícola"],
    ["Tecnologia Alimentar", "Gestão da Exploração", "Qualidade e Segurança", "Experimentação Agrária"],
    ["Agricultura de Precisão", "Sustentabilidade", "Projeto Aplicado", "Estágio"],
  ],
  desporto: [
    ["Anatomia Funcional", "Fisiologia do Exercício", "Metodologia do Treino", "Psicologia do Desporto"],
    ["Biomecânica", "Nutrição Desportiva", "Treino de Força", "Desportos Coletivos"],
    ["Avaliação e Prescrição de Exercício", "Gestão do Desporto", "Desporto de Natureza", "Estágio I"],
    ["Investigação Aplicada", "Empreendedorismo Desportivo", "Projeto Final", "Estágio II"],
  ],
  turismo: [
    ["Fundamentos do Turismo", "Património Cultural", "Geografia do Turismo", "Comunicação"],
    ["Animação Turística", "Turismo de Natureza", "Sustentabilidade", "Gestão de Destinos"],
    ["Marketing Turístico", "Experiências e Eventos", "Inovação Digital", "Estágio"],
    ["Projeto Final", "Ética e Responsabilidade", "Empreendedorismo", "Seminário"],
  ],
};

const areaToLibrary: Record<string, keyof typeof curriculumLibrary> = {
  informatica: "informatica",
  tecnologia: "informatica",
  gestao: "gestao",
  saude: "saude",
  educacao: "educacao",
  agraria: "agraria",
  desporto: "desporto",
  turismo: "turismo",
};

const degreeEcts: Record<Degree, number> = {
  TESP: 120,
  Licenciatura: 180,
  Mestrado: 120,
  "Pós-graduação": 60,
  Microcredencial: 15,
};

const degreeDuration: Record<Degree, string> = {
  TESP: "2 anos · 4 semestres",
  Licenciatura: "3 anos · 6 semestres",
  Mestrado: "2 anos · 4 semestres",
  "Pós-graduação": "1 ano · 2 semestres",
  Microcredencial: "60 horas",
};

function buildCurriculum(input: CourseInput): CurriculumYear[] {
  const library = curriculumLibrary[areaToLibrary[input.area] ?? "gestao"];
  const years = input.degree === "Mestrado" || input.degree === "Pós-graduação" ? 2 : input.degree === "TESP" ? 2 : 3;
  const editions = Array.from({ length: years }, (_, index) => {
    const units = library[index % library.length];
    return {
      year: index + 1,
      semester: index % 2 === 0 ? "1.º semestre" : "2.º semestre",
      units: units.map((name, unitIndex) => ({
        code: `${input.schoolId.toUpperCase()}-${index + 1}${unitIndex + 1}`,
        name,
        ects: input.degree === "Microcredencial" ? 3 : 6,
        type:
          unitIndex === 3
            ? ("Projeto" as const)
            : unitIndex === 2 && index === 2
              ? ("Opção" as const)
              : ("Obrigatória" as const),
      })),
    };
  });
  return editions;
}

function createCourse(input: CourseInput): Course {
  return {
    slug: slugify(input.name),
    name: input.name,
    degree: input.degree,
    schoolId: input.schoolId,
    area: input.area,
    duration: degreeDuration[input.degree],
    ects: degreeEcts[input.degree],
    regime: input.regime ?? "Diurno",
    vacancies: input.vacancies ?? 40,
    description:
      input.description ??
      `O curso de ${input.name} combina uma formação sólida com prática em contexto real. Ao longo do percurso, desenvolves competências técnicas, pensamento crítico e trabalho em equipa, com acompanhamento próximo de docentes e profissionais do setor.`,
    highlights:
      input.highlights ??
      [
        "Formação orientada para a prática e para o mercado de trabalho",
        "Corpo docente com experiência profissional e científica",
        "Laboratórios, projetos e parcerias com organizações da região",
        "Apoio à empregabilidade e à mobilidade internacional",
      ],
    careers:
      input.careers ??
      [
        "Exercício profissional na área do curso",
        "Coordenação e gestão de equipas e projetos",
        "Investigação aplicada e desenvolvimento de soluções",
        "Empreendedorismo e consultoria especializada",
      ],
    access:
      input.access ??
      [
        "Titulares do ensino secundário ou habilitação legalmente equivalente",
        "Aprovação nas provas de ingresso exigidas",
        "Candidatos maiores de 23 anos através das provas M23",
        "Titulares de CTeSP, CET ou de curso superior",
      ],
    coordinator: input.coordinator ?? "Coordenação de curso",
    curriculum: buildCurriculum(input),
    featured: input.featured,
  };
}

const rawCourses: CourseInput[] = [
  {
    name: "Engenharia Informática",
    degree: "Licenciatura",
    schoolId: "esgt",
    area: "informatica",
    vacancies: 60,
    featured: true,
    coordinator: "Prof. Doutor André Santos",
    description:
      "Uma licenciatura para quem quer construir software, sistemas e experiências digitais com impacto. Combina programação, engenharia, dados e segurança com projetos reais.",
    careers: [
      "Desenvolvimento de software e aplicações web",
      "Engenharia de dados e inteligência artificial",
      "Administração de sistemas e cibersegurança",
      "Consultoria tecnológica e empreendedorismo",
    ],
  },
  {
    name: "Tecnologias Web e Dispositivos Móveis",
    degree: "TESP",
    schoolId: "esgt",
    area: "informatica",
    vacancies: 30,
    featured: true,
    coordinator: "Prof.ª Doutora Inês Carvalho",
  },
  {
    name: "Redes e Sistemas Informáticos",
    degree: "TESP",
    schoolId: "esgt",
    area: "informatica",
    vacancies: 30,
  },
  {
    name: "Marketing Digital",
    degree: "TESP",
    schoolId: "esgt",
    area: "gestao",
    vacancies: 30,
  },
  {
    name: "Gestão",
    degree: "Licenciatura",
    schoolId: "esgt",
    area: "gestao",
    vacancies: 80,
    regime: "Diurno",
    featured: true,
  },
  {
    name: "Contabilidade e Fiscalidade",
    degree: "Licenciatura",
    schoolId: "esgt",
    area: "gestao",
    vacancies: 55,
  },
  {
    name: "Gestão de Marketing",
    degree: "Licenciatura",
    schoolId: "esgt",
    area: "gestao",
    vacancies: 45,
  },
  {
    name: "Informática Aplicada",
    degree: "Mestrado",
    schoolId: "esgt",
    area: "informatica",
    vacancies: 30,
    featured: true,
  },
  {
    name: "Gestão",
    degree: "Mestrado",
    schoolId: "esgt",
    area: "gestao",
    vacancies: 30,
  },
  {
    name: "Data Science e Inteligência Artificial",
    degree: "Pós-graduação",
    schoolId: "esgt",
    area: "informatica",
    vacancies: 25,
    regime: "Pós-laboral",
    featured: true,
  },
  {
    name: "Gestão de Projetos",
    degree: "Pós-graduação",
    schoolId: "esgt",
    area: "gestao",
    vacancies: 25,
    regime: "Online",
  },
  {
    name: "Fundamentos de Cibersegurança",
    degree: "Microcredencial",
    schoolId: "esgt",
    area: "informatica",
    vacancies: 20,
    regime: "Online",
  },
  {
    name: "Competências Digitais para Docentes",
    degree: "Microcredencial",
    schoolId: "ese",
    area: "educacao",
    vacancies: 25,
    regime: "Online",
  },
  {
    name: "Enfermagem",
    degree: "Licenciatura",
    schoolId: "esss",
    area: "saude",
    vacancies: 70,
    featured: true,
    coordinator: "Prof.ª Doutora Sofia Rodrigues",
  },
  {
    name: "Fisioterapia",
    degree: "Licenciatura",
    schoolId: "esss",
    area: "saude",
    vacancies: 45,
  },
  {
    name: "Enfermagem Comunitária",
    degree: "Mestrado",
    schoolId: "esss",
    area: "saude",
    vacancies: 20,
  },
  {
    name: "Apoio Domiciliário",
    degree: "TESP",
    schoolId: "esss",
    area: "saude",
    vacancies: 25,
    regime: "Pós-laboral",
  },
  {
    name: "Educação Básica",
    degree: "Licenciatura",
    schoolId: "ese",
    area: "educacao",
    vacancies: 60,
    featured: true,
  },
  {
    name: "Educação Social",
    degree: "Licenciatura",
    schoolId: "ese",
    area: "educacao",
    vacancies: 40,
  },
  {
    name: "Educação Especial e Inclusiva",
    degree: "Mestrado",
    schoolId: "ese",
    area: "educacao",
    vacancies: 25,
  },
  {
    name: "Educação para a Sustentabilidade",
    degree: "Pós-graduação",
    schoolId: "ese",
    area: "educacao",
    vacancies: 20,
    regime: "Online",
  },
  {
    name: "Agronomia",
    degree: "Licenciatura",
    schoolId: "esas",
    area: "agraria",
    vacancies: 50,
    featured: true,
  },
  {
    name: "Enfermagem Veterinária",
    degree: "Licenciatura",
    schoolId: "esas",
    area: "agraria",
    vacancies: 45,
  },
  {
    name: "Produção de Insetos",
    degree: "TESP",
    schoolId: "esas",
    area: "agraria",
    vacancies: 20,
  },
  {
    name: "Engenharia Agronómica",
    degree: "Mestrado",
    schoolId: "esas",
    area: "agraria",
    vacancies: 20,
  },
  {
    name: "Treino Desportivo",
    degree: "Licenciatura",
    schoolId: "esdrm",
    area: "desporto",
    vacancies: 60,
    featured: true,
  },
  {
    name: "Desporto, Condição Física e Saúde",
    degree: "Licenciatura",
    schoolId: "esdrm",
    area: "desporto",
    vacancies: 45,
  },
  {
    name: "Jogos Eletrónicos e Competições Desportivas Digitais",
    degree: "TESP",
    schoolId: "esdrm",
    area: "desporto",
    vacancies: 25,
  },
  {
    name: "Treino Desportivo",
    degree: "Mestrado",
    schoolId: "esdrm",
    area: "desporto",
    vacancies: 25,
  },
  {
    name: "Turismo de Natureza",
    degree: "Microcredencial",
    schoolId: "esdrm",
    area: "turismo",
    vacancies: 20,
    regime: "Online",
  },
];

export const courses: Course[] = rawCourses.map(createCourse);

export const degreeLabels: Record<Degree, string> = {
  TESP: "Cursos Técnicos Superiores Profissionais",
  Licenciatura: "Licenciaturas",
  Mestrado: "Mestrados",
  "Pós-graduação": "Pós-graduações",
  Microcredencial: "Microcredenciais",
};

export const degreeSlugs: Record<string, Degree> = {
  tesp: "TESP",
  licenciaturas: "Licenciatura",
  mestrados: "Mestrado",
  "pos-graduacoes": "Pós-graduação",
  microcredenciais: "Microcredencial",
};

export const degreeOrder: Degree[] = [
  "TESP",
  "Licenciatura",
  "Mestrado",
  "Pós-graduação",
  "Microcredencial",
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByDegree(degree: Degree) {
  return courses.filter((course) => course.degree === degree);
}

export function getFeaturedCourses() {
  return courses.filter((course) => course.featured);
}

export function getAreas() {
  return [...new Set(courses.map((course) => course.area))].sort();
}

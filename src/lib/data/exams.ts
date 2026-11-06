export type ExamPeriod = {
  id: string;
  name: string;
  window: string;
  description: string;
  fee: string;
  rules: string[];
};

export const examPeriods: ExamPeriod[] = [
  {
    id: "normal",
    name: "Época Normal",
    window: "20 de janeiro a 1 de fevereiro de 2027",
    description:
      "Destinada à aprovação das unidades curriculares do 1.º semestre. A inscrição é obrigatória e gratuita.",
    fee: "Isenta",
    rules: [
      "A inscrição é obrigatória e isenta de pagamento.",
      "O pedido deve ser feito até ao final do 3.º dia anterior ao exame.",
      "Para melhoria de nota, o emolumento é de 10 € por unidade curricular.",
      "Estudantes bolseiros beneficiam de 50% de redução na melhoria.",
    ],
  },
  {
    id: "recurso",
    name: "Época de Recurso",
    window: "16 a 28 de junho de 2027",
    description:
      "Permite a aprovação ou melhoria de nota após a época normal. A inscrição é obrigatória.",
    fee: "10 € por UC",
    rules: [
      "A inscrição é obrigatória para exames de recurso e melhoria.",
      "O pedido deve ser feito até ao final do 3.º dia anterior ao exame.",
      "O pagamento deve ser efetuado até ao dia seguinte ao da inscrição.",
      "Estudantes bolseiros beneficiam de 50% de redução.",
    ],
  },
  {
    id: "especial",
    name: "Época Especial",
    window: "13 a 24 de julho de 2027",
    description:
      "Reservada a estudantes em condições de conclusão de curso. Não há lugar a melhoria de nota.",
    fee: "10 € por UC",
    rules: [
      "Apenas para conclusão de curso, não há lugar a melhorias.",
      "A inscrição é obrigatória e sujeita a validação.",
      "O pedido deve ser feito até ao final do 3.º dia anterior ao exame.",
      "Estudantes com dívidas de propinas devem contactar os serviços académicos.",
    ],
  },
];

export type ExamEntry = {
  id: string;
  unit: string;
  date: string;
  time: string;
  room: string;
  school: string;
  type: "Normal" | "Recurso" | "Especial" | "Melhoria";
  registered: boolean;
};

export const examSchedule: ExamEntry[] = [
  {
    id: "ex-01",
    unit: "Bases de Dados",
    date: "2027-01-20",
    time: "09:30",
    room: "B.1.04",
    school: "ESGTS",
    type: "Normal",
    registered: true,
  },
  {
    id: "ex-02",
    unit: "Engenharia de Software",
    date: "2027-01-22",
    time: "14:00",
    room: "B.1.06",
    school: "ESGTS",
    type: "Normal",
    registered: true,
  },
  {
    id: "ex-03",
    unit: "Redes de Computadores",
    date: "2027-01-26",
    time: "09:30",
    room: "B.2.01",
    school: "ESGTS",
    type: "Normal",
    registered: false,
  },
  {
    id: "ex-04",
    unit: "Estatística Aplicada",
    date: "2027-01-28",
    time: "14:00",
    room: "A.0.12",
    school: "ESGTS",
    type: "Normal",
    registered: false,
  },
  {
    id: "ex-05",
    unit: "Programação II",
    date: "2027-01-29",
    time: "09:30",
    room: "B.1.02",
    school: "ESGTS",
    type: "Normal",
    registered: false,
  },
];

export const examCalendar = [
  { school: "ESAS", normal: "20 jan — 1 fev 2027", recurso: "16 — 28 jun 2027", special: "13 — 24 jul 2027" },
  { school: "ESDRM", normal: "20 jan — 1 fev 2027", recurso: "18 — 26 jun 2027", special: "30 jun — 17 jul 2027" },
  { school: "ESES", normal: "20 jan — 1 fev 2027", recurso: "16 — 28 jun 2027", special: "13 — 24 jul 2027" },
  { school: "ESGTS", normal: "20 jan — 1 fev 2027", recurso: "16 — 28 jun 2027", special: "13 — 24 jul 2027" },
  { school: "ESSS", normal: "20 jan — 1 fev 2027", recurso: "16 — 28 jun 2027", special: "13 — 24 jul 2027" },
];

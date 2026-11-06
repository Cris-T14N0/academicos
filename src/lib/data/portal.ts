export type ScheduleItem = {
  id: string;
  day: "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta";
  start: string;
  end: string;
  unit: string;
  room: string;
  type: "Teórica" | "Prática" | "Laboratório" | "Tutorial";
};

export type Grade = {
  id: string;
  unit: string;
  ects: number;
  grade: number;
  status: "Aprovado" | "Em avaliação" | "Reprovado";
  semester: string;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Pago" | "Pendente" | "Regularizado";
  method?: string;
};

export type PortalRequest = {
  id: string;
  type: string;
  submitted: string;
  status: "Em análise" | "Concluído" | "Aguarda documento";
  updated: string;
};

export type Ticket = {
  id: string;
  subject: string;
  service: string;
  status: "Aberto" | "Em progresso" | "Resolvido";
  created: string;
  lastUpdate: string;
};

export const studentSummary = {
  enrolledUnits: 6,
  totalEcts: 180,
  completedEcts: 60,
  average: 15.4,
  tuitionBalance: 0,
  nextPayment: {
    label: "2.ª prestação da propina",
    amount: 697,
    due: "2027-01-15",
  },
};

export const schedule: ScheduleItem[] = [
  { id: "s1", day: "Segunda", start: "09:00", end: "10:30", unit: "Bases de Dados", room: "B.1.04", type: "Teórica" },
  { id: "s2", day: "Segunda", start: "11:00", end: "12:30", unit: "Programação II", room: "Lab. B.0.3", type: "Laboratório" },
  { id: "s3", day: "Segunda", start: "14:00", end: "15:30", unit: "Estatística Aplicada", room: "A.0.12", type: "Teórica" },
  { id: "s4", day: "Terça", start: "09:00", end: "10:30", unit: "Redes de Computadores", room: "B.2.01", type: "Teórica" },
  { id: "s5", day: "Terça", start: "11:00", end: "12:30", unit: "Engenharia de Software", room: "B.1.06", type: "Prática" },
  { id: "s6", day: "Quarta", start: "09:00", end: "10:30", unit: "Bases de Dados", room: "Lab. B.0.2", type: "Laboratório" },
  { id: "s7", day: "Quarta", start: "14:00", end: "15:30", unit: "Redes de Computadores", room: "Lab. B.2.02", type: "Laboratório" },
  { id: "s8", day: "Quinta", start: "11:00", end: "12:30", unit: "Programação II", room: "B.1.02", type: "Teórica" },
  { id: "s9", day: "Quinta", start: "14:00", end: "15:30", unit: "Engenharia de Software", room: "B.1.06", type: "Teórica" },
  { id: "s10", day: "Sexta", start: "09:00", end: "10:30", unit: "Estatística Aplicada", room: "A.0.12", type: "Prática" },
  { id: "s11", day: "Sexta", start: "11:00", end: "12:30", unit: "Tutorial de Curso", room: "B.1.01", type: "Tutorial" },
];

export const grades: Grade[] = [
  { id: "g1", unit: "Programação I", ects: 6, grade: 17, status: "Aprovado", semester: "2025/2026 · 1.º S" },
  { id: "g2", unit: "Arquiteturas de Computadores", ects: 6, grade: 15, status: "Aprovado", semester: "2025/2026 · 1.º S" },
  { id: "g3", unit: "Matemática Discreta", ects: 6, grade: 14, status: "Aprovado", semester: "2025/2026 · 1.º S" },
  { id: "g4", unit: "Sistemas de Informação", ects: 6, grade: 16, status: "Aprovado", semester: "2025/2026 · 1.º S" },
  { id: "g5", unit: "Álgebra Linear", ects: 6, grade: 13, status: "Aprovado", semester: "2025/2026 · 1.º S" },
  { id: "g6", unit: "Programação II", ects: 6, grade: 16, status: "Em avaliação", semester: "2026/2027 · 1.º S" },
  { id: "g7", unit: "Bases de Dados", ects: 6, grade: 18, status: "Em avaliação", semester: "2026/2027 · 1.º S" },
  { id: "g8", unit: "Redes de Computadores", ects: 6, grade: 15, status: "Em avaliação", semester: "2026/2027 · 1.º S" },
  { id: "g9", unit: "Engenharia de Software", ects: 6, grade: 17, status: "Em avaliação", semester: "2026/2027 · 1.º S" },
];

export const transactions: Transaction[] = [
  {
    id: "TRX-2026-0912",
    date: "2026-09-12",
    description: "Matrícula e inscrição 2026/2027",
    amount: 40,
    status: "Pago",
    method: "Referência Multibanco",
  },
  {
    id: "TRX-2026-1004",
    date: "2026-10-04",
    description: "1.ª prestação da propina",
    amount: 697,
    status: "Pago",
    method: "Cartão de débito",
  },
  {
    id: "TRX-2026-1102",
    date: "2026-11-02",
    description: "Inscrição em exame de melhoria",
    amount: 10,
    status: "Pago",
    method: "MB WAY",
  },
  {
    id: "TRX-2027-0115",
    date: "2027-01-15",
    description: "2.ª prestação da propina",
    amount: 697,
    status: "Pendente",
  },
  {
    id: "TRX-2027-0315",
    date: "2027-03-15",
    description: "3.ª prestação da propina",
    amount: 697,
    status: "Pendente",
  },
];

export const portalRequests: PortalRequest[] = [
  {
    id: "REQ-2026-118",
    type: "Certidão de frequência",
    submitted: "2026-10-20",
    status: "Concluído",
    updated: "2026-10-22",
  },
  {
    id: "REQ-2026-124",
    type: "Justificação de faltas",
    submitted: "2026-10-29",
    status: "Em análise",
    updated: "2026-11-02",
  },
  {
    id: "REQ-2026-131",
    type: "Creditação de unidade curricular",
    submitted: "2026-11-04",
    status: "Aguarda documento",
    updated: "2026-11-05",
  },
];

export const tickets: Ticket[] = [
  {
    id: "HD-2026-0451",
    subject: "Acesso ao Moodle após alteração de senha",
    service: "InfoCIIPS",
    status: "Resolvido",
    created: "2026-10-18",
    lastUpdate: "2026-10-19",
  },
  {
    id: "HD-2026-0522",
    subject: "Erro na inscrição em exame de melhoria",
    service: "Serviços Académicos",
    status: "Em progresso",
    created: "2026-11-03",
    lastUpdate: "2026-11-05",
  },
];

export type PortalNotification = {
  id: string;
  title: string;
  description: string;
  date: string;
  kind: "exam" | "payment" | "academic" | "library";
  read: boolean;
};

export const notifications: PortalNotification[] = [
  {
    id: "n1",
    title: "Inscrições em exames abertas",
    description: "A época normal decorre até 1 de fevereiro. Garante a tua inscrição.",
    date: "2026-11-05",
    kind: "exam",
    read: false,
  },
  {
    id: "n2",
    title: "2.ª prestação da propina",
    description: "O pagamento de 697 € vence a 15 de janeiro de 2027.",
    date: "2026-11-01",
    kind: "payment",
    read: false,
  },
  {
    id: "n3",
    title: "Renovação de inscrição confirmada",
    description: "A tua inscrição em 6 unidades curriculares foi validada.",
    date: "2026-09-12",
    kind: "academic",
    read: true,
  },
  {
    id: "n4",
    title: "Novo recurso na Biblioteca",
    description: "A base de dados ACM Digital Library está disponível.",
    date: "2026-09-08",
    kind: "library",
    read: true,
  },
];

export const progressBySemester = [
  { semester: "1.º S", media: 15.0, ects: 30 },
  { semester: "2.º S", media: 15.8, ects: 30 },
  { semester: "3.º S", media: 16.2, ects: 30 },
  { semester: "4.º S", media: 16.0, ects: 0 },
];

export const upcomingEvents = [
  {
    id: "e1",
    title: "Inscrição em exames — época normal",
    date: "2026-12-01",
    endDate: "2027-01-15",
    category: "Exames",
  },
  {
    id: "e2",
    title: "Bases de Dados — exame",
    date: "2027-01-20",
    category: "Exames",
  },
  {
    id: "e3",
    title: "Pagamento da 2.ª prestação",
    date: "2027-01-15",
    category: "Tesouraria",
  },
  {
    id: "e4",
    title: "Workshop: carreira em cibersegurança",
    date: "2026-11-18",
    category: "Eventos",
  },
];

export const enrolledUnits = [
  { code: "ESGT-301", name: "Bases de Dados", ects: 6, teacher: "Prof. Doutor Nuno Matos", attendance: 92 },
  { code: "ESGT-302", name: "Programação II", ects: 6, teacher: "Prof.ª Doutora Inês Carvalho", attendance: 88 },
  { code: "ESGT-303", name: "Redes de Computadores", ects: 6, teacher: "Prof. Doutor Ricardo Lopes", attendance: 84 },
  { code: "ESGT-304", name: "Engenharia de Software", ects: 6, teacher: "Prof.ª Doutora Ana Reis", attendance: 96 },
  { code: "ESGT-305", name: "Estatística Aplicada", ects: 6, teacher: "Prof. Doutor João Almeida", attendance: 79 },
  { code: "ESGT-306", name: "Tutorial de Curso", ects: 3, teacher: "Prof.ª Doutora Sofia Matos", attendance: 100 },
];

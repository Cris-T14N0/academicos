export type School = {
  id: string;
  short: string;
  name: string;
  description: string;
  icon: string;
};

export const schools: School[] = [
  {
    id: "esas",
    short: "ESAS",
    name: "Escola Superior Agrária de Santarém",
    description:
      "Formação ligada ao território, produção alimentar, ambiente e ciências agrárias.",
    icon: "sprout",
  },
  {
    id: "ese",
    short: "ESES",
    name: "Escola Superior de Educação de Santarém",
    description:
      "Educação, intervenção social, artes e tecnologias aplicadas à aprendizagem.",
    icon: "graduation",
  },
  {
    id: "esgt",
    short: "ESGTS",
    name: "Escola Superior de Gestão e Tecnologia de Santarém",
    description:
      "Gestão, contabilidade, marketing, engenharia e tecnologias digitais.",
    icon: "cpu",
  },
  {
    id: "esdrm",
    short: "ESDRM",
    name: "Escola Superior de Desporto de Rio Maior",
    description:
      "Desporto, treino, saúde, natureza, turismo ativo e gestão desportiva.",
    icon: "trophy",
  },
  {
    id: "esss",
    short: "ESSS",
    name: "Escola Superior de Saúde de Santarém",
    description:
      "Enfermagem, fisioterapia e cuidados de saúde centrados na pessoa.",
    icon: "heart",
  },
];

export function getSchool(id: string) {
  return schools.find((school) => school.id === id);
}

import { Badge } from "@/components/ui/badge";

const tones: Record<string, "default" | "sand" | "ember" | "outline" | "success"> = {
  Aprovado: "success",
  Pago: "success",
  Regularizado: "success",
  Concluído: "success",
  Resolvido: "success",
  "Em avaliação": "default",
  "Em análise": "sand",
  "Em progresso": "default",
  Pendente: "sand",
  "Aguarda documento": "ember",
  Reprovado: "ember",
  Aberto: "sand",
  Ativo: "success",
  Rescindido: "outline",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={tones[status] ?? "outline"} className="px-2.5 py-0.5">
      {status}
    </Badge>
  );
}

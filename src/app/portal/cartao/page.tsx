import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { StudentCard } from "@/components/portal/student-card";

export const metadata = {
  title: "Cartão de estudante",
};

export default function CartaoPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Cartão de estudante"
        description="Acede ao teu cartão digital, consulta benefícios e solicita uma segunda via."
      />
      <StudentCard />
    </div>
  );
}

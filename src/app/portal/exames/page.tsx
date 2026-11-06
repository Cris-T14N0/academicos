import { ExamRegistration } from "@/components/portal/exam-registration";
import { PortalPageHeader } from "@/components/portal/portal-page-header";

export const metadata = {
  title: "Inscrições em exames",
};

export default function ExamesPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Inscrições em exames"
        description="Inscreve-te nas épocas de exame e consulta as salas."
      />
      <ExamRegistration />
    </div>
  );
}

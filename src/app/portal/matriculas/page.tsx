
import { EnrollmentView } from "@/components/portal/enrollment-view";
import { PortalPageHeader } from "@/components/portal/portal-page-header";

export const metadata = {
  title: "Matrículas e inscrições",
};

export default function MatriculasPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Matrículas e inscrições"
        description="Renova a tua inscrição e acompanha o processo."
      />
      <EnrollmentView />
    </div>
  );
}

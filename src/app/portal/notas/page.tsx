
import { GradesView } from "@/components/portal/grades-view";
import { PortalPageHeader } from "@/components/portal/portal-page-header";

export const metadata = {
  title: "Notas e pautas",
};

export default function NotasPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Notas e pautas"
        description="Consulta classificações e simula a média."
      />
      <GradesView />
    </div>
  );
}

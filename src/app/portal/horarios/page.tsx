import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { ScheduleView } from "@/components/portal/schedule-view";

export const metadata = {
  title: "Horários",
};

export default function HorariosPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Horários"
        description="Consulta as tuas aulas da semana, salas e docentes. Exporta ou imprime o teu horário."
      />
      <ScheduleView />
    </div>
  );
}

import { HelpdeskCenter } from "@/components/portal/helpdesk-center";
import { PortalPageHeader } from "@/components/portal/portal-page-header";

export const metadata = {
  title: "Helpdesk",
};

export default function HelpdeskPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Helpdesk"
        description="Cria pedidos de apoio, acompanha respostas e consulta as perguntas frequentes."
      />
      <HelpdeskCenter />
    </div>
  );
}

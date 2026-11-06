import { DocumentsCenter } from "@/components/portal/documents-center";
import { PortalPageHeader } from "@/components/portal/portal-page-header";

export const metadata = {
  title: "Documentos",
};

export default function DocumentosPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Documentos e certidões"
        description="Submete pedidos, acompanha o estado e descarrega certidões e declarações."
      />
      <DocumentsCenter />
    </div>
  );
}

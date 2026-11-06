import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { AccountView } from "@/components/portal/account-view";

export const metadata = {
  title: "Conta corrente",
};

export default function ContaCorrentePage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="Conta corrente"
        description="Consulta pagamentos, propinas e emolumentos, e descarrega comprovativos."
      />
      <AccountView />
    </div>
  );
}

import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { ProfileTabs } from "@/components/portal/profile-tabs";

export const metadata = {
  title: "Perfil",
};

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader
        title="O meu perfil"
        description="Consulta e atualiza os teus dados pessoais e de contacto."
      />
      <ProfileTabs />
    </div>
  );
}

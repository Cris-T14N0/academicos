import { PortalShell } from "@/components/portal/portal-shell";

export const metadata = {
  title: {
    default: "Portal do Estudante",
    template: "%s · Portal do Estudante",
  },
};

export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return <PortalShell>{children}</PortalShell>;
}

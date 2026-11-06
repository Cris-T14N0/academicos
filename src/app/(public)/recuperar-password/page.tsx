import Link from "next/link";
import { ArrowLeft, LifeBuoy } from "lucide-react";

import { RecoverForm } from "@/components/auth/recover-form";

export const metadata = {
  title: "Recuperar senha",
  description: "Recupera o acesso ao Portal do Estudante da UPSantarém.",
};

export default function RecuperarPasswordPage() {
  return (
    <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="size-3.5" />
            Voltar ao site
          </Link>
          <RecoverForm />
        </div>
      </div>
      <div className="hidden bg-brand-950 p-10 text-white lg:flex lg:flex-col lg:justify-center xl:p-14">
        <div className="max-w-md">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-sand-300">
            <LifeBuoy className="size-6" />
          </span>
          <h2 className="font-display mt-5 text-3xl font-semibold leading-tight">
            Estamos aqui para ajudar.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Se não conseguires recuperar o acesso, o helpdesk InfoCIIPS apoia-te
            na validação de identidade e no restabelecimento da conta.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-white/60">Email</span>
              <a href="mailto:infociips@ipsantarem.pt" className="font-medium text-sand-200 hover:underline">
                infociips@ipsantarem.pt
              </a>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-white/60">Telefone</span>
              <a href="tel:+351243309520" className="font-medium text-sand-200 hover:underline">
                243 309 520
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

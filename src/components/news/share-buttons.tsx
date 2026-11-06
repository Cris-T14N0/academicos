"use client";

import { Link2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ShareButtons({ title }: { title: string }) {
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Ligação copiada", { description: title });
    } catch {
      toast.error("Não foi possível copiar a ligação");
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        /* partilha cancelada */
      }
      return;
    }
    await copyLink();
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={share}>
        <Share2 className="size-3.5" />
        Partilhar
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        <Link2 className="size-3.5" />
        Copiar ligação
      </Button>
    </div>
  );
}

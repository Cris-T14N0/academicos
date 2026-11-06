"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ups-academicos-cookies";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      const timer = window.setTimeout(() => setVisible(true), 900);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function accept() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:p-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-sand-100 text-sand-700 dark:bg-sand-900 dark:text-sand-200">
          <Cookie className="size-5" />
        </span>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          Utilizamos cookies essenciais para manter a sessão e melhorar a tua
          experiência. Podes saber mais na{" "}
          <Link href="/privacidade" className="font-semibold text-primary underline-offset-4 hover:underline">
            política de privacidade
          </Link>
          .
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={accept}>
            Compreendo e aceito
          </Button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Fechar aviso de cookies"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

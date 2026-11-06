"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Preferences = {
  essential: true;
  analytics: boolean;
  preferences: boolean;
};

const STORAGE_KEY = "ups-academicos-cookie-preferences";

const defaults: Preferences = { essential: true, analytics: false, preferences: true };

export function CookiePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(defaults);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // Load saved cookie choices after mount to keep SSR markup stable.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setPreferences({ ...defaults, ...(JSON.parse(stored) as Partial<Preferences>) });
    } catch {
      /* ignora preferências inválidas */
    }
  }, []);

  function toggle(key: keyof Preferences) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  }

  function save() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    window.localStorage.setItem("ups-academicos-cookies", "accepted");
    toast.success("Preferências de cookies guardadas");
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Cookie className="size-5 text-sand-600" />
        <h3 className="font-display text-lg font-semibold">Preferências de cookies</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Escolhe que categorias de cookies podes aceitar. Os cookies essenciais
        garantem o funcionamento do portal e não podem ser desativados.
      </p>

      <div className="mt-4 space-y-2">
        {[
          {
            key: "essential" as const,
            label: "Essenciais",
            description: "Sessão, autenticação, segurança e preferências de tema.",
            locked: true,
          },
          {
            key: "preferences" as const,
            label: "Preferências",
            description: "Memoriza escolhas como idioma, filtros e acessibilidade.",
            locked: false,
          },
          {
            key: "analytics" as const,
            label: "Analítica",
            description: "Ajuda-nos a compreender a utilização do portal de forma agregada.",
            locked: false,
          },
        ].map((item) => {
          const checked = item.locked ? true : preferences[item.key];
          return (
            <div key={item.key} className="flex items-start justify-between gap-4 rounded-2xl border border-border p-4">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  {item.label}
                  {item.locked ? <ShieldCheck className="size-3.5 text-emerald-500" /> : null}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={`Cookies ${item.label}`}
                disabled={item.locked}
                onClick={() => !item.locked && toggle(item.key)}
                className={cn(
                  "mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                  checked ? "bg-brand-600" : "bg-muted",
                  item.locked && "opacity-60",
                )}
              >
                <span
                  className={cn(
                    "size-5 rounded-full bg-white shadow transition-transform",
                    checked && "translate-x-5",
                  )}
                />
              </button>
            </div>
          );
        })}
      </div>

      <Button onClick={save} className="mt-4 w-full sm:w-auto">
        Guardar preferências
      </Button>
    </div>
  );
}

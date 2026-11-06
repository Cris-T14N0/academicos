"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        resolvedTheme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
      }
      title={resolvedTheme === "dark" ? "Tema claro" : "Tema escuro"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20",
        className,
      )}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

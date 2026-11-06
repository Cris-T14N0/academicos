import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
  compact = false,
}: {
  className?: string;
  variant?: "default" | "light";
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Académicos UPSantarém — página inicial"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-md border border-brand-800 bg-brand-700 text-white">
        <span className="font-display text-sm font-bold tracking-tight">UP</span>
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.05rem] font-semibold tracking-tight",
              variant === "light" ? "text-white" : "text-foreground",
            )}
          >
            Académicos
          </span>
          <span
            className={cn(
              "mt-1 text-[0.7rem] font-medium",
              variant === "light" ? "text-white/60" : "text-muted-foreground",
            )}
          >
            UPSantarém
          </span>
        </span>
      ) : null}
    </Link>
  );
}

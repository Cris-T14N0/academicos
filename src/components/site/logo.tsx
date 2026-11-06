import Link from "next/link";
import Image from "next/image";

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
      <span className="relative size-10 shrink-0 overflow-hidden rounded-md">
        <Image
          src={variant === "light" ? "/logo_dark_bg.png" : "/logo_light_bg.png"}
          alt=""
          fill
          sizes="40px"
          className="object-contain"
        />
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

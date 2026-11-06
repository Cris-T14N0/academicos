import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label="Académicos UPSantarém — página inicial"
    >
      <span className="relative size-10 shrink-0 overflow-hidden">
        <Image
          src={variant === "light" ? "/logo_dark_bg.png" : "/logo_light_bg.png"}
          alt=""
          fill
          sizes="40px"
          className="object-contain"
        />
      </span>
    </Link>
  );
}

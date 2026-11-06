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
      <span className="relative block h-10 w-44 shrink-0 overflow-hidden sm:w-52">
        <Image
          src={variant === "light" ? "/logo_dark_bg.png" : "/logo_light_bg.png"}
          alt=""
          fill
          sizes="(min-width: 640px) 208px, 176px"
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}

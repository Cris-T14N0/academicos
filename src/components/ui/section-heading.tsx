import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  align = "left",
  action,
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t border-border pt-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-brand-700"
        >
          {action.label}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

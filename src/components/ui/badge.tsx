import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200",
        sand: "border-sand-300 bg-sand-100 text-sand-800 dark:border-sand-700 dark:bg-sand-900/60 dark:text-sand-200",
        ember: "border-ember-200 bg-ember-50 text-ember-700 dark:border-ember-800 dark:bg-ember-900/50 dark:text-ember-200",
        outline: "border-border bg-transparent text-muted-foreground",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };

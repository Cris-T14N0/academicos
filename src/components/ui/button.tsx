import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-brand-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-sand-200",
        accent:
          "bg-accent text-accent-foreground hover:bg-sand-300",
        outline:
          "border border-border bg-card text-foreground hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/70",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-ember-700",
        link: "text-primary underline-offset-4 hover:underline",
        dark: "bg-brand-950 text-white hover:bg-brand-900",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };

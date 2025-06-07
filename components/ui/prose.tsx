"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const proseVariants = cva(
  "prose dark:prose-invert",
  {
    variants: {
      variant: {
        default: "prose-slate",
        blog: "prose-slate",
        documentation: "prose-blue",
        minimal: "prose-gray"
      },
      size: {
        sm: "prose-sm",
        base: "prose-base", 
        lg: "prose-lg",
        xl: "prose-xl"
      }
    },
    defaultVariants: {
      variant: "blog",
      size: "lg"
    }
  }
);

export interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {}

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(proseVariants({ variant, size }), "max-w-none", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Prose.displayName = "Prose";

export { Prose, proseVariants };

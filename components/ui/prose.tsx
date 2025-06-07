"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const proseVariants = cva(
  "prose prose-slate dark:prose-invert max-w-none",
  {
    variants: {
      variant: {
        default: "prose-slate",
        blog: "prose-slate prose-lg",
        documentation: "prose-blue prose-sm",
        minimal: "prose-gray prose-sm"
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
        className={cn(proseVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Prose.displayName = "Prose";

export { Prose, proseVariants };

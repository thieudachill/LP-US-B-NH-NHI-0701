"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = {
    primary:
        "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:shadow-lg hover:shadow-blue-500/30 border border-transparent",
    outline:
        "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-blue-50",
    ghost:
        "bg-transparent text-[var(--text-body)] hover:text-[var(--color-primary)] hover:bg-gray-100",
};

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children" | "variant"> {
    variant?: keyof typeof buttonVariants;
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const sizeClasses = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50",
                    buttonVariants[variant],
                    sizeClasses[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

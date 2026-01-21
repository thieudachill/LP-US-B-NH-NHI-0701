import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function H1({ className, as: Component = "h1", ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "text-[48px] leading-[58px] font-bold text-[var(--text-heading)] md:text-[60px] md:leading-[72px]",
                className
            )}
            {...props}
        />
    );
}

export function H2({ className, as: Component = "h2", ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "text-[40px] leading-[48px] font-semibold text-[var(--text-heading)] md:text-[48px] md:leading-[58px]",
                className
            )}
            {...props}
        />
    );
}

export function H3({ className, as: Component = "h3", ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "text-[32px] leading-[38px] font-semibold text-[var(--text-heading)] md:text-[40px] md:leading-[48px]",
                className
            )}
            {...props}
        />
    );
}

export function BodyLg({ className, as: Component = "p", ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "text-[16px] leading-[20px] font-light text-[var(--text-body)] md:text-[20px] md:leading-[24px]",
                className
            )}
            {...props}
        />
    );
}

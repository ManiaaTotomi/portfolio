import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong focus-visible:ring-accent/40",
  secondary:
    "border border-border bg-surface text-text hover:border-accent/50 hover:text-accent focus-visible:ring-accent/30",
  ghost:
    "bg-transparent text-text hover:bg-accent-soft/60 focus-visible:ring-accent/30",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonClassOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      type={type}
      {...props}
    />
  );
}

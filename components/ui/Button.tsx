import { forwardRef } from "react";
import Link from "next/link";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "cyber";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    ButtonBaseProps {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const buttonClasses = (
  variant: ButtonBaseProps["variant"] = "primary",
  size: ButtonBaseProps["size"] = "md",
  className = ""
) => {
  const base =
    "inline-flex items-center justify-center font-display font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--gray-900)] hover:bg-[var(--accent-hover)] active:scale-[0.98]",
    secondary:
      "bg-[var(--gray-100)] text-[var(--foreground)] hover:bg-[var(--gray-200)]",
    ghost:
      "bg-transparent text-[var(--foreground)] hover:bg-[var(--gray-100)]",
    outline:
      "border-2 border-[var(--gray-800)] bg-transparent hover:bg-[var(--gray-100)]",
    cyber:
      "border-2 border-[#00f0ff] bg-transparent text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] focus:ring-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm rounded-[var(--radius)]",
    md: "h-11 px-5 text-base rounded-[var(--radius)]",
    lg: "h-12 px-6 text-lg rounded-[var(--radius-lg)]",
  };
  return `${base} ${variants[variant ?? "primary"]} ${sizes[size]} ${className}`;
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const combined = buttonClasses(variant, size, className);

    if ("href" in props && props.href) {
      const { href, ...rest } = props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combined}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

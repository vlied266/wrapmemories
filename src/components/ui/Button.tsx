import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost-light" | "ghost-dark";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[0.95rem] font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral text-cream hover:bg-[#e05846] active:bg-[#c94a3a] shadow-[0_8px_30px_-8px_rgba(242,107,91,0.55)] hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/25 hover:border-charcoal/60 hover:-translate-y-0.5",
  "ghost-light":
    "bg-transparent text-cream border border-cream/35 hover:border-cream/80 hover:-translate-y-0.5",
  "ghost-dark":
    "bg-transparent text-charcoal border border-charcoal/20 hover:bg-charcoal hover:text-cream",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

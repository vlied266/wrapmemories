import { cn } from "@/lib/utils";

/** Small tracked-out label used above section headlines. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.8rem] font-medium tracking-[0.18em] text-coral",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-coral" />
      {children}
    </span>
  );
}

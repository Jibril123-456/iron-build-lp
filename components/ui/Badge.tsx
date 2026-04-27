import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        variant === "default" && "border-border bg-card text-foreground/80",
        variant === "accent" && "border-accent/30 bg-accent/10 text-accent",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          variant === "accent" ? "bg-accent" : "bg-emerald-500",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

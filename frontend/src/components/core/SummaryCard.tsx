import { cn, formatCurrency } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number | undefined;
  description: string;
  icon: LucideIcon;
  variant?: "income" | "expense" | "neutral";
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "neutral",
}: SummaryCardProps) {
  const variantStyles = {
    income: {
      card: "border-[var(--income)]/20 bg-card",
      iconWrapper: "bg-[var(--income-muted)] text-[var(--income)]",
      value: "text-[var(--income)]",
      accent: "bg-[var(--income)]",
    },
    expense: {
      card: "border-[var(--expense)]/20 bg-card",
      iconWrapper: "bg-[var(--expense-muted)] text-[var(--expense)]",
      value: "text-[var(--expense)]",
      accent: "bg-[var(--expense)]",
    },
    neutral: {
      card: "border-border bg-card",
      iconWrapper: "bg-muted text-foreground",
      value:
        value !== undefined && value >= 0
          ? "text-[var(--income)]"
          : "text-[var(--expense)]",
      accent: "bg-foreground/20",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-sm",
        styles.card,
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-[2px]", styles.accent)} />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3 flex-1">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            {title}
          </p>
          <div
            className={cn(
              "font-numeric text-3xl font-medium leading-none tracking-tight",
              styles.value,
            )}
          >
            {value !== undefined ? (
              formatCurrency(value)
            ) : (
              <span className="text-muted-foreground/40 text-2xl">—</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            styles.iconWrapper,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;

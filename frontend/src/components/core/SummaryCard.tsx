import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number | undefined;
  description: string;
  variant?: "income" | "expense" | "neutral";
  growthRate?: number;
}

function SummaryCard({
  title,
  value,
  description,
  variant = "neutral",
  growthRate,
}: SummaryCardProps) {
  const variantStyles = {
    income: {
      card: "border-[var(--income)]/20 bg-card",
      value: "text-[var(--income)]",
      accent: "bg-[var(--income)]",
    },
    expense: {
      card: "border-[var(--expense)]/20 bg-card",
      value: "text-[var(--expense)]",
      accent: "bg-[var(--expense)]",
    },
    neutral: {
      card: "border-border bg-card",
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

        {growthRate !== undefined && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium font-numeric",
              growthRate === 0
                ? "bg-muted text-muted-foreground"
                : growthRate > 0
                  ? "bg-[var(--income-muted)] text-[var(--income)]"
                  : "bg-[var(--expense-muted)] text-[var(--expense)]",
            )}
          >
            {growthRate === 0 ? (
              <Minus className="h-3 w-3" />
            ) : growthRate > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(growthRate).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;

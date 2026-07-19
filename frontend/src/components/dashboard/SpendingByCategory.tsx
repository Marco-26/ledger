import type { IStatement } from "@ledger/api";
import { formatCurrency } from "@/lib/utils";

interface SpendingByCategoryProps {
  data?: IStatement;
}

export function SpendingByCategory({ data }: SpendingByCategoryProps) {
  const categories = data?.spendingByCategory ?? [];
  const hasData = categories.length > 0;
  const maxValue = hasData
    ? Math.max(...categories.map((category) => category.value))
    : 0;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
          Breakdown
        </p>
        <h2 className="text-base font-semibold text-foreground mt-1">
          Spending by Category
        </h2>
      </div>

      {hasData ? (
        <div className="p-5 space-y-4">
          {categories.map((category) => (
            <div key={category.label} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground truncate">
                  {category.label}
                </span>
                <span className="font-numeric text-sm font-semibold text-[var(--expense)] tabular-nums shrink-0">
                  {formatCurrency(category.value)}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[var(--expense)]"
                  style={{
                    width: `${maxValue > 0 ? (category.value / maxValue) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No spending data available.
        </div>
      )}
    </div>
  );
}

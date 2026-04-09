import { cn, formatCurrency } from "@/lib/utils";
import type { ITransaction } from "@/data/StatementDtos";
import type { ReactElement } from "react";

interface ITopTransactionsCardProps {
  data?: ITransaction[];
  title: string;
  description: string;
  icon: ReactElement;
  variant: "income" | "expense";
}

export function TopTransactionsCard({
  data,
  title,
  description,
  icon,
  variant,
}: ITopTransactionsCardProps) {
  const isIncome = variant === "income";

  const valueColor = isIncome
    ? "text-[var(--income)]"
    : "text-[var(--expense)]";

  const rowHover = isIncome
    ? "hover:bg-[var(--income-muted)]"
    : "hover:bg-[var(--expense-muted)]";

  const rankColor = isIncome ? "text-[var(--income)]" : "text-[var(--expense)]";

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
            isIncome ? "bg-[var(--income-muted)]" : "bg-[var(--expense-muted)]",
          )}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-none text-foreground">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>

      <div className="p-3 space-y-1">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-default",
                rowHover,
              )}
            >
              <span
                className={cn(
                  "font-numeric text-xs font-medium w-4 shrink-0 tabular-nums",
                  rankColor,
                )}
              >
                {index + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium leading-none text-foreground truncate"
                  title={item.description}
                >
                  {item.description}
                </p>
                <p className="font-numeric text-xs text-muted-foreground mt-1">
                  {item.date}
                </p>
              </div>

              <span
                className={cn(
                  "font-numeric text-sm font-semibold shrink-0 tabular-nums",
                  valueColor,
                )}
              >
                {isIncome ? "+" : "-"}
                {formatCurrency(isIncome ? item.credit || 0 : item.debit || 0)}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <p className="text-sm text-muted-foreground">No records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

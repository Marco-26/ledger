import { TransactionType, type ITransaction } from "@ledger/api";
import { cn, formatCurrency } from "@/lib/utils";

interface TransactionTableProps {
  transactions?: ITransaction[];
  type: TransactionType;
  emptyMessage: string;
}

export function TransactionTable({
  transactions,
  type,
  emptyMessage,
}: TransactionTableProps) {
  const isIncome = type === TransactionType.INCOME;
  const amountColorClass = isIncome
    ? "text-[var(--income)]"
    : "text-[var(--expense)]";
  const amountPrefix = isIncome ? "+" : "-";

  const getAmount = (transaction: ITransaction) =>
    isIncome ? transaction.credit : transaction.debit;

  if (!transactions || transactions.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col gap-1 px-5 py-3 hover:bg-muted/40 transition-colors",
            index < transactions.length - 1 && "border-b border-border/50",
          )}
        >
          <span className="text-sm text-foreground truncate">
            {transaction.description}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground tabular-nums">
              {transaction.date.format("DD-MM-YYYY")}
            </span>
            <span
              className={cn(
                "text-sm font-medium tabular-nums",
                amountColorClass,
              )}
            >
              {amountPrefix}
              {formatCurrency(getAmount(transaction) || 0)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

import { TransactionType, type ITransaction } from "@/data/StatementDtos";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const amountColorClass = isIncome ? "text-[var(--income)]" : "text-[var(--expense)]";
  const amountPrefix = isIncome ? "+" : "-";

  const getAmount = (transaction: ITransaction) =>
    isIncome ? transaction.credit : transaction.debit;

  return (
    <div className="rounded-lg border border-border overflow-hidden max-h-96 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]">
      <Table>
        <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground h-9 w-28">
              Date
            </TableHead>
            <TableHead className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground h-9">
              Description
            </TableHead>
            <TableHead className="text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground h-9 text-right w-32">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow
                key={index}
                className="border-b border-border/50 hover:bg-muted/40 transition-colors"
              >
                <TableCell className="font-numeric text-xs text-muted-foreground py-3 w-28">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-sm py-3">
                  {transaction.description}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-numeric text-right text-sm font-medium py-3 tabular-nums w-32",
                    amountColorClass,
                  )}
                >
                  {amountPrefix}{formatCurrency(getAmount(transaction) || 0)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-sm text-muted-foreground py-12"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

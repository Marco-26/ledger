import { TransactionType, type ITransaction } from "@/data/StatementDtos";
import { formatCurrency } from "@/lib/utils";
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
  const amountColorClass = isIncome ? "text-emerald-600" : "text-rose-600";
  const amountPrefix = isIncome ? "+" : "-";

  const getAmount = (transaction: ITransaction) =>
    isIncome ? transaction.credit : transaction.debit;

  return (
    <div className="rounded-md border max-h-96 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:theme(colors.muted.foreground)_transparent]">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell
                  className={`text-right font-medium ${amountColorClass}`}
                >
                  {amountPrefix}
                  {formatCurrency(getAmount(transaction) || 0)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
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

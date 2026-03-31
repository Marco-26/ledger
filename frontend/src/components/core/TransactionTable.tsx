import { TransactionType, type ITransaction } from "@/data/StatementDtos";
import { formatCurrency } from "@/lib/utils";

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
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Description
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="p-4 align-middle">{transaction.date}</td>
                  <td className="p-4 align-middle">
                    {transaction.description}
                  </td>
                  <td
                    className={`p-4 align-middle text-right font-medium ${amountColorClass}`}
                  >
                    {amountPrefix}
                    {formatCurrency(getAmount(transaction) || 0)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-4 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { TransactionType, type ITransaction } from "@ledger/api";

export interface MonthTotals {
  /** 0-based, January = 0. */
  month: number;
  count: number;
  income: number;
  expenses: number;
  net: number;
}

/** Twelve buckets, one per month, whether or not the month has a statement. */
export function getMonthlyTotals(
  transactions: ITransaction[] = [],
): MonthTotals[] {
  const months: MonthTotals[] = Array.from({ length: 12 }, (_, month) => ({
    month,
    count: 0,
    income: 0,
    expenses: 0,
    net: 0,
  }));

  transactions.forEach((transaction) => {
    const bucket = months[transaction.date.month()];
    const amount = Math.abs(transaction.amount);
    bucket.count += 1;
    if (transaction.type === TransactionType.INCOME) bucket.income += amount;
    else bucket.expenses += amount;
  });

  months.forEach((bucket) => (bucket.net = bucket.income - bucket.expenses));
  return months;
}

/** The month with the largest income or expenses, or undefined if there is none. */
export function getPeakMonth(
  months: MonthTotals[],
  field: "income" | "expenses",
): MonthTotals | undefined {
  return months.reduce<MonthTotals | undefined>(
    (peak, bucket) =>
      bucket[field] > 0 && (!peak || bucket[field] > peak[field])
        ? bucket
        : peak,
    undefined,
  );
}

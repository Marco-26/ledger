import { isAxiosError } from "axios";
import { Constants } from "@/utils/constants";
import Toast from "react-native-toast-message";
import { IMonthlySummary } from "@ledger/api/data/StatementDtos";

type ErrorCode = keyof typeof Constants.ERRORS;

/** The API answers 404 for a month (or a whole year) that was never uploaded. */
export function isNotFound(error: unknown): boolean {
  return (
    (error as { response?: { status?: number } } | undefined)?.response
      ?.status === 404
  );
}

export const showToastOnError = (error: Error | null) => {
  if (!error) return;

  const code = isAxiosError<{ code?: string }>(error)
    ? error.response?.data?.code
    : undefined;

  const errorCode = Constants.ERRORS[code as ErrorCode] ?? Constants.ERRORS.GENERAL;

  Toast.show({
    type: "error",
    text1: errorCode.text1,
    text2: errorCode.text2,
  });
}

export const getPeakExpensesMonth = (
  summaries: IMonthlySummary[],
): IMonthlySummary | undefined =>
  summaries.reduce<IMonthlySummary | undefined>(
    (best, month) =>
      month.expenses > 0 && (!best || month.expenses > best.expenses)
        ? month
        : best,
    undefined,
  );

export const getPeakIncomeMonth = (
  summaries: IMonthlySummary[],
): IMonthlySummary | undefined =>
  summaries.reduce<IMonthlySummary | undefined>(
    (best, month) =>
      month.income > 0 && (!best || month.income > best.income) ? month : best,
    undefined,
  );

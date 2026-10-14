import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dayjs, { type Dayjs } from "dayjs";
import {
  useStatementsQuery,
  useYearlyStatementQuery,
  type IStatement,
  type IYearlyStatement,
} from "@ledger/api";
import { Constants } from "@/utils/constants";

export enum SelectedPeriod {
  MONTH = "month",
  YEAR = "year"
}

interface StatementContextValue {
  period: SelectedPeriod;
  setPeriod: (period: SelectedPeriod) => void;
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  canGoToNext: boolean;
  statement?: IStatement | IYearlyStatement;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  isRefetching: boolean;
  refetch: () => void;
  setUploadingFileMonth: (month: string | undefined) => void;
  uploadingFileMonth?: string;
  isYear: boolean;
}

const StatementContext = createContext<StatementContextValue | null>(null);

/** The API answers 404 for a month (or a whole year) that was never uploaded. */
export function isNotFound(error: unknown): boolean {
  return (
    (error as { response?: { status?: number } } | undefined)?.response
      ?.status === 404
  );
}

/**
 * Both tabs read the same period and the same query, so switching tabs never
 * refetches and never shows two different periods. Only the query for the
 * active period runs; the other one stays cached for when the user flips back.
 */
export function StatementProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<SelectedPeriod>(SelectedPeriod.MONTH);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());
  const [uploadingFileMonth, setUploadingFileMonth] = useState<string>();

  const isYear = period === SelectedPeriod.YEAR;

  const monthly = useStatementsQuery({
    selectedMonth: isYear
      ? undefined
      : selectedDate.date(1).format(Constants.UI.DATE_FORMAT),
  });

  const yearly = useYearlyStatementQuery({
    selectedYear: isYear ? selectedDate.year() : undefined,
  });

  const active = isYear ? yearly : monthly;

  const goToPrevious = useCallback(
    () => setSelectedDate((date) => date.subtract(1, period)),
    [period],
  );

  // Never step into the future: a year step from December last year would
  // otherwise land on a month that has not happened yet.
  const goToNext = useCallback(
    () =>
      setSelectedDate((date) => {
        const next = date.add(1, period);
        return next.isAfter(dayjs(), "month") ? dayjs() : next;
      }),
    [period],
  );

  const value = useMemo<StatementContextValue>(
    () => ({
      period,
      setPeriod,
      selectedDate,
      setSelectedDate,
      goToPrevious,
      goToNext,
      canGoToNext: !selectedDate.isSame(dayjs(), period),
      statement: isYear ? yearly.data : monthly.data,
      isLoading: active.isLoading,
      isError: active.isError && !isNotFound(active.error),
      isEmpty: active.isError && isNotFound(active.error),
      isRefetching: active.isRefetching,
      refetch: active.refetch,
      setUploadingFileMonth,
      uploadingFileMonth,
      isYear
    }),
    [
      period,
      selectedDate,
      goToPrevious,
      goToNext,
      monthly.data,
      yearly.data,
      active.isLoading,
      active.isError,
      active.error,
      active.isRefetching,
      active.refetch,
      uploadingFileMonth,
      isYear
    ],
  );

  return (
    <StatementContext.Provider value={value}>
      {children}
    </StatementContext.Provider>
  );
}

export function useStatement(): StatementContextValue {
  const context = useContext(StatementContext);
  if (!context) {
    throw new Error("useStatement must be used inside a StatementProvider");
  }
  return context;
}

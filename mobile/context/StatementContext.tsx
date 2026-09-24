import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dayjs, { type Dayjs } from "dayjs";
import { useStatementsQuery, type IStatement } from "@ledger/api";
import { Constants } from "@/utils/constants";

interface StatementContextValue {
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  /** The current month is the last one worth showing. */
  canGoToNextMonth: boolean;
  statement?: IStatement;
  isLoading: boolean;
  /** A real failure (network, server). */
  isError: boolean;
  /** The month simply has no statement yet — the API answers 404. */
  isEmpty: boolean;
  isRefetching: boolean;
  refetch: () => void;
}

const StatementContext = createContext<StatementContextValue | null>(null);

/** The API answers 404 for a month that was never uploaded. */
function isNotFound(error: unknown): boolean {
  return (
    (error as { response?: { status?: number } } | undefined)?.response
      ?.status === 404
  );
}

/**
 * Both tabs read the same month and the same query, so switching tabs never
 * refetches and never shows two different periods.
 */
export function StatementProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());

  const { data, error, isLoading, isError, isRefetching, refetch } = useStatementsQuery({
    selectedMonth: selectedDate.date(1).format(Constants.UI.DATE_FORMAT),
  });

  const goToPreviousMonth = useCallback(
    () => setSelectedDate((date) => date.subtract(1, "month")),
    [],
  );

  const goToNextMonth = useCallback(
    () =>
      setSelectedDate((date) =>
        date.isSame(dayjs(), "month") ? date : date.add(1, "month"),
      ),
    [],
  );

  const value = useMemo<StatementContextValue>(
    () => ({
      selectedDate,
      setSelectedDate,
      goToPreviousMonth,
      goToNextMonth,
      canGoToNextMonth: !selectedDate.isSame(dayjs(), "month"),
      statement: data,
      isLoading,
      isError: isError && !isNotFound(error),
      isEmpty: isError && isNotFound(error),
      isRefetching,
      refetch,
    }),
    [
      selectedDate,
      goToPreviousMonth,
      goToNextMonth,
      data,
      error,
      isLoading,
      isError,
      isRefetching,
      refetch,
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

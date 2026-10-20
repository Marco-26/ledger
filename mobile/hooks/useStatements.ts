import { Constants } from "@/utils/constants";
import { isNotFound } from "@/utils/utils";
import { IStatement, IYearlyStatement, useStatementsQuery, useYearlyStatementQuery } from "@ledger/api";
import { Dayjs } from "dayjs";

interface IUseCurrentStatementProps {
  isYear: boolean;
  selectedDate: Dayjs;
}

interface IUseCurrentStatement{
  statement?: IStatement | IYearlyStatement;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  isRefetching: boolean;
  refetch: () => void;
}

export function useCurrentStatement({ isYear, selectedDate}: IUseCurrentStatementProps): IUseCurrentStatement {

  const monthly = useStatementsQuery({
    selectedMonth: isYear
      ? undefined
      : selectedDate.date(1).format(Constants.UI.DATE_FORMAT),
  });

  const yearly = useYearlyStatementQuery({
    selectedYear: isYear ? selectedDate.year() : undefined,
  });

  const currentStatement = isYear ? yearly : monthly;
  
  return {
    statement: currentStatement.data,
    isLoading: currentStatement.isLoading,
    isError: currentStatement.isError && !isNotFound(currentStatement.error),
    isEmpty: currentStatement.isError && isNotFound(currentStatement.error),
    isRefetching: currentStatement.isRefetching,
    refetch: currentStatement.refetch
  };
}
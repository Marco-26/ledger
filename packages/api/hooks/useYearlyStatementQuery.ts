import { statementService } from "../service/StatementService";
import { useQuery } from "@tanstack/react-query";
import { Constants } from "../utils/constants";

interface IUseYearlyStatementProps {
  selectedYear?: number;
}

export function useYearlyStatementQuery({ selectedYear }: IUseYearlyStatementProps) {

  return useQuery({
    queryKey: [Constants.API.TANSTACK_QUERIES.YEARLY_STATEMENTS, selectedYear],
    queryFn: () => statementService.fetchYearlyStatement(selectedYear),
    retry: false,
    enabled: !!selectedYear,
  });
}

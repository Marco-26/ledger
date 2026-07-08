import { statementService } from "../service/StatementService";
import {  useQuery } from "@tanstack/react-query";
import { Constants } from "../utils/constants";

interface IUseStatementsProps {
  selectedMonth?: string;
}

export function useStatementsQuery({ selectedMonth }: IUseStatementsProps) {

  return useQuery({
    queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS, selectedMonth],
    queryFn: () => statementService.fetchStatement(selectedMonth),
    retry: false,
    enabled: !!selectedMonth,
  });
}

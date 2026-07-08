import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statementService } from "../service/StatementService";
import { Constants } from "../utils/constants";

export function useCreateStatementQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [Constants.API.TANSTACK_QUERIES.UPLOAD],
    mutationFn: ({
      statementFile,
      date,
    }: {
      statementFile: File;
      date: string;
    }) => statementService.postStatement(statementFile, date),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS, variables.date],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
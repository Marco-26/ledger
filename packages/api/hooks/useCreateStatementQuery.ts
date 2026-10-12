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
    // Keys are matched by prefix, so the month and its year need one call each.
    onSuccess: (_, variables) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS, variables.date],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            Constants.API.TANSTACK_QUERIES.YEARLY_STATEMENTS,
            Number(variables.date.slice(0, 4)),
          ],
        }),
      ]),
  });
}
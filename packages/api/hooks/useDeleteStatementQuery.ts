import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statementService } from "../service/StatementService";
import { Constants } from "../utils/constants";
import { showToastOnError } from "@/utils/utils";

export function useDeleteStatementQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [Constants.API.TANSTACK_QUERIES.DELETE],
    mutationFn: ({ statementId }: { statementId: number; date: string }) =>
      statementService.deleteStatement(statementId),
    onSuccess: (_, { date }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            Constants.API.TANSTACK_QUERIES.YEARLY_STATEMENTS,
            Number(date.slice(0, 4)),
          ],
        }),
      ]),
    onError: (error) => {
      showToastOnError(error)
    }
  });
}

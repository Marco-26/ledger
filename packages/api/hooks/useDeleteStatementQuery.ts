import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statementService } from "../service/StatementService";
import { Constants } from "../utils/constants";

interface IUseDeleteStatementQueryProps{
  onError?: (error: Error) => void;
}

export function useDeleteStatementQuery({onError}: IUseDeleteStatementQueryProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [Constants.API.TANSTACK_QUERIES.DELETE],
    mutationFn: ({ statementId }: { statementId: number; date: string }) =>
      statementService.deleteStatement(statementId),
    // A failed refetch keeps the last data, so the deleted month is reset to
    // drop it. Every other month is refetched: the next one's growth rates
    // were computed against the deleted statement.
    onSuccess: (_, { date }) =>
      Promise.all([
        queryClient.resetQueries({
          queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS, date],
        }),
        queryClient.invalidateQueries({
          queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS],
          predicate: (query) => query.queryKey[1] !== date,
        }),
        queryClient.invalidateQueries({
          queryKey: [
            Constants.API.TANSTACK_QUERIES.YEARLY_STATEMENTS,
            Number(date.slice(0, 4)),
          ],
        }),
      ]),
    onError: onError
  });
}

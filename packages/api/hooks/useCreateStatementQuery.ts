import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statementService } from "../service/StatementService";
import { Constants } from "../utils/constants";

interface IUseCreateStatementQueryProps{
  onError?: (error: Error) => void;
}

export function useCreateStatementQuery({onError} : IUseCreateStatementQueryProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [Constants.API.TANSTACK_QUERIES.UPLOAD],
    mutationFn: ({ statementFile }: { statementFile: File }) =>
      statementService.postStatement(statementFile),
    // The month comes back from the backend. Keys are matched by prefix, so the
    // month and its year need one call each.
    onSuccess: (upload) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            Constants.API.TANSTACK_QUERIES.STATEMENTS,
            upload.date.format("YYYY-MM-DD"),
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            Constants.API.TANSTACK_QUERIES.YEARLY_STATEMENTS,
            upload.date.year(),
          ],
        }),
      ]),
    onError: onError
  });
}
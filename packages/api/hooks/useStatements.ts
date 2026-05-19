import type { IStatement } from "../data/StatementDtos";
import { statementService } from "../service/StatementService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Constants } from "../utils/constants";

interface IUseStatementsProps {
  selectedMonth?: string;
}

export function useStatements({ selectedMonth }: IUseStatementsProps) {
  const queryClient = useQueryClient();

  const fetchStatement = async (month?: string): Promise<IStatement> => {
    if (!month) {
      return Promise.reject();
    }

    const statement = await statementService.fetchStatement(month);

    return statement;
  };

  const { data, error } = useQuery({
    queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS, selectedMonth],
    queryFn: () => fetchStatement(selectedMonth),
    retry: (failureCount, error) => {
      if (
        error instanceof AxiosError &&
        error.response?.status &&
        error.response.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
    enabled: !!selectedMonth,
  });

  const { mutateAsync: uploadStatement, isPending: isUploading } = useMutation({
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

  return {
    data,
    error,
    isUploading,
    uploadStatement,
  };
}

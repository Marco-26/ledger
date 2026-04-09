import type { IStatement } from "@/data/StatementDtos";
import { statementService } from "@/service/StatementService";
import { Constants } from "@/utils/Constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

interface IUseStatementsProps {
  selectedMonth?: string;
}

export function useStatements({ selectedMonth }: IUseStatementsProps) {
  const queryClient = useQueryClient();

  const fetchStatement = (month?: string): Promise<IStatement> => {
    if (!month) {
      return Promise.reject();
    }

    return statementService.fetchStatement(month);
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
        toast.error("No statement available for this month");
        return false;
      }
      return failureCount < 3;
    },
    enabled: !!selectedMonth,
  });

  const {
    mutateAsync: uploadStatement,
    isPending: isUploading,
    error: uploadError,
  } = useMutation({
    mutationKey: [Constants.API.TANSTACK_QUERIES.UPLOAD],
    mutationFn: ({
      statementFile,
      date,
    }: {
      statementFile: File;
      date: string;
    }) => statementService.generateStatement(statementFile, date),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [Constants.API.TANSTACK_QUERIES.STATEMENTS, variables.date],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (uploadError) {
      toast.error(uploadError.message);
    }
  }, [uploadError]);

  return {
    data,
    error,
    isUploading,
    uploadStatement,
    fetchStatement,
  };
}

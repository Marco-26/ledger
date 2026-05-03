import type { IStatement } from "@/data/StatementDtos";
import { statementService } from "@/service/StatementService";
import { Constants } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";

interface IUseStatementsProps {
  selectedMonth?: string;
}

const verifyStatementDate = (statementDate: string, selectedMonth: string) => {
  if (statementDate !== selectedMonth) {
    // toast.warning(
    //   `Statement date (${dayjs(statementDate).format("MMMM YYYY")}) does not match the selected month (${dayjs(selectedMonth).format("MMMM YYYY")}).`,
    // );
  }
};

export function useStatements({ selectedMonth }: IUseStatementsProps) {
  const queryClient = useQueryClient();

  const fetchStatement = async (month?: string): Promise<IStatement> => {
    if (!month) {
      return Promise.reject();
    }

    const statement = await statementService.fetchStatement(month);

    verifyStatementDate(
      statement.transactionListFiltered[0].date.format(
        Constants.UI.DATE_FORMAT,
      ),
      month,
    );

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
        // toast.error("No statement available for this month");
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
      // toast.error(error.message);
    },
  });

  return {
    data,
    error,
    isUploading,
    uploadStatement,
  };
}

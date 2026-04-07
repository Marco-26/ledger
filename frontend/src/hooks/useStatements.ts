import type { IStatement } from "@/data/StatementDtos";
import { statementService } from "@/service/StatementService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useStatements() {
  const [statement, setStatement] = useState<IStatement>();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");

  const uploadStatement = useCallback(async (file: File, date: string) => {
    const data = await statementService.generateStatement(file, date);
    setStatement(data);
  }, []);

  const handleStatementUpload = useCallback(
    async (file: File, date: string) => {
      setIsUploading(true);

      try {
        await uploadStatement(file, date);
      } catch (error) {
        console.error("Error generating statement:", error);
        setError("Error generating statement, please try again later");
      } finally {
        setIsUploading(false);
      }
    },
    [uploadStatement],
  );

  const fetchStatement = useCallback(async (month: string) => {
    try {
      const data = await statementService.fetchStatement(month);
      setStatement(data);
    } catch (error) {
      setStatement(undefined);
      setError("Error fetching statement, please try again later");
      console.error("Error fetching statement:", error);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  return {
    statement,
    error,
    isUploading,
    handleStatementUpload,
    fetchStatement,
  };
}

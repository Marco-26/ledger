import type { IStatement } from "@/data/StatementDtos";
import { statementService } from "@/service/StatementService";
import { useCallback, useState } from "react";

export function useStatements() {
  const [statement, setStatement] = useState<IStatement>();
  const [isUploading, setIsUploading] = useState(false);

  const uploadStatement = useCallback(async (file: File) => {
    const data = await statementService.generateStatement(file);
    setStatement(data);
  }, []);

  const handleStatementUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);

      try {
        await uploadStatement(file);
      } catch (error) {
        console.error("Error generating statement:", error);
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
      console.error("Error fetching statement:", error);
    }
  }, []);

  return {
    statement,
    isUploading,
    handleStatementUpload,
    fetchStatement,
  };
}

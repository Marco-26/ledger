import { useCallback, useState } from "react";

import { Dashboard } from "./components/Dashboard";
import { Spinner } from "./components/ui/spinner";
import type { IStatement } from "./data/StatementDtos";
import { statementService } from "./service/StatementService";

function App() {
  const [statement, setStatement] = useState<IStatement>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();

  const loadStatement = useCallback(async (file: File) => {
    const data = await statementService.generateStatement(file);
    setStatement(data);
  }, []);

  const handleStatementUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setUploadError(undefined);

      try {
        await loadStatement(file);
      } catch (error) {
        console.error("Error generating statement:", error);
        setUploadError(
          "Unable to upload that statement. Please try another PDF.",
        );
      } finally {
        setIsUploading(false);
      }
    },
    [loadStatement],
  );

  if (isUploading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-10 text-foreground" />
      </div>
    );
  }

  return (
    <Dashboard
      data={statement}
      isUploading={isUploading}
      uploadError={uploadError}
      onUploadStatement={handleStatementUpload}
    />
  );
}

export default App;

import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { statementService } from "./service/StatementService";
import type { IStatement } from "./data/StatementDtos";
import statementPdf from "./statement.pdf";

function App() {
  const [statement, setStatement] = useState<IStatement>();

  useEffect(() => {
    const loadStatement = async () => {
      try {
        const response = await fetch(statementPdf);
        const blob = await response.blob();
        const file = new File([blob], "statement.pdf", {
          type: blob.type || "application/pdf",
        });

        const data = await statementService.generateStatement(file);
        setStatement(data);
      } catch (error) {
        console.error("Error generating statement:", error);
      }
    };

    loadStatement();
  }, []);

  if (!statement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium animate-pulse">Loading financial statement...</div>
      </div>
    );
  }

  return (
    <Dashboard data={statement} />
  );
}

export default App;

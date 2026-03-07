import { useEffect, useState } from "react";
import { ChartAreaInteractive } from "./components/Chart";
import { statementService } from "./service/StatementService";
import type { IStatement } from "./data/StatementDtos";
import statementPdf from "./statement.pdf";

function App() {
  const [statement, setStatement] = useState<IStatement | null>(null);

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

  useEffect(() => {
    if (!statement) return;

    console.log("Generated statement:", statement);
  }, [statement]);

  return <ChartAreaInteractive />;
}

export default App;

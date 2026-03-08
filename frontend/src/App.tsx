import { useEffect, useState } from "react";
import { ChartAreaInteractive } from "./components/Chart";
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

  useEffect(() => {
    console.log("Statement updated:", statement);
  }, [statement]);

  return (
    <ChartAreaInteractive
      transactionList={statement?.transactionListFiltered}
    />
  );
}

export default App;

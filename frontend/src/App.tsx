import { useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useStatements } from "./hooks/useStatements";
import dayjs from "dayjs";
import { Toaster } from "sonner";

function App() {
  const [monthSelected, setMonthSelected] = useState<string>();

  const { statement, isUploading, handleStatementUpload, fetchStatement } =
    useStatements();

  const handleMonthChange = (month: string) => {
    setMonthSelected(month);
    fetchStatement(month);
  };

  return (
    <>
      <Toaster />
      <Dashboard
        data={statement}
        isUploading={isUploading}
        onUploadStatement={handleStatementUpload}
        onMonthChange={handleMonthChange}
        selectedMonth={dayjs(monthSelected)}
      />
    </>
  );
}

export default App;

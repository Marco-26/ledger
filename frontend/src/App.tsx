import { useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Spinner } from "./components/ui/spinner";
import { useStatements } from "./hooks/useStatements";
import dayjs from "dayjs";

function App() {
  const [monthSelected, setMonthSelected] = useState<string>();

  const { statement, isUploading, handleStatementUpload, fetchStatement } =
    useStatements();

  if (isUploading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-10 text-foreground" />
      </div>
    );
  }

  const handleMonthChange = (month: string) => {
    setMonthSelected(month);
    fetchStatement(month);
  };

  return (
    <Dashboard
      data={statement}
      isUploading={isUploading}
      onUploadStatement={handleStatementUpload}
      onMonthChange={handleMonthChange}
      selectedMonth={dayjs(monthSelected)}
    />
  );
}

export default App;

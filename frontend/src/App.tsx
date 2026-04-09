import { useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useStatements } from "./hooks/useStatements";
import dayjs from "dayjs";
import { Toaster } from "sonner";

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format("YYYY-MM"),
  );

  const { data, isUploading, uploadStatement } = useStatements({
    selectedMonth: selectedMonth,
  });

  return (
    <>
      <Toaster />
      <Dashboard
        data={data}
        isUploading={isUploading}
        onUploadStatement={(file, date) =>
          uploadStatement({ statementFile: file, date: date })
        }
        onMonthChange={setSelectedMonth}
        selectedMonth={dayjs(selectedMonth)}
      />
    </>
  );
}

export default App;

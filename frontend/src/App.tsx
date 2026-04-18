import { useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useStatements } from "./hooks/useStatements";
import dayjs from "dayjs";
import { Toaster } from "sonner";

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().date(1).format("YYYY-MM-DD"),
  );

  const { data, isUploading, uploadStatement } = useStatements({
    selectedMonth: selectedMonth,
  });

  return (
    <>
      <Toaster position="top-right" />
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

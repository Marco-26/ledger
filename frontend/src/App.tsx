import { useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import dayjs from "dayjs";
import { Toaster } from "sonner";
import { useStatementsQuery } from "@ledger/api/hooks/useStatementsQuery";
import { useCreateStatementQuery } from "@ledger/api";

function App() {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().date(1).format("YYYY-MM-DD"),
  );

  const { data } = useStatementsQuery({
    selectedMonth: selectedMonth,
  });

  const { mutateAsync: uploadStatement, isPending } = useCreateStatementQuery();

  return (
    <>
      <Toaster position="top-right" />
      <Dashboard
        data={data}
        isUploading={isPending}
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

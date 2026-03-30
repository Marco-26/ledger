import { Dashboard } from "./components/dashboard/Dashboard";
import { Spinner } from "./components/ui/spinner";
import { useStatements } from "./hooks/useStatements";

function App() {
  const { statement, isUploading, handleStatementUpload } = useStatements();

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
      onUploadStatement={handleStatementUpload}
    />
  );
}

export default App;

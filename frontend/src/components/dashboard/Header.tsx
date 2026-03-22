import { useRef, type ChangeEvent } from "react";
import { Upload } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";

interface IHeaderProps {
  isUploading: boolean;
  uploadError?: string;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

export function Header({
  isUploading,
  uploadError,
  onFileChange,
}: IHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of your financial statement and recent activity.
        </p>
        {uploadError ? (
          <p className="text-sm text-destructive">{uploadError}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onFileChange}
        />

        <Button
          type="button"
          size="lg"
          className="w-full md:ml-auto md:w-auto hover:cursor-pointer"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload />
          {isUploading ? "Uploading..." : "Upload Statement"}
        </Button>

        <ThemeToggle />
      </div>
    </div>
  );
}

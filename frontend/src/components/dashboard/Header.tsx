import { useRef, type ChangeEvent } from "react";
import { Upload } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MonthNavigator } from "../core/MonthNavigator";

interface IHeaderProps {
  isUploading: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

export function Header({ isUploading, onFileChange }: IHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your financial statement and recent activity.
          </p>
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

      <MonthNavigator
        onChange={(month: Date) => console.log("New data, ", month)}
      />
    </div>
  );
}

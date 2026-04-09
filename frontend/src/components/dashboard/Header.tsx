import { useRef, type ChangeEvent } from "react";
import { Loader, Upload } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { MonthNavigator } from "../core/MonthNavigator";
import type { Dayjs } from "dayjs";
import { Constants } from "@/utils/Constants";

interface IHeaderProps {
  isUploading: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onMonthChange: (month: string) => void;
  selectedMonth: Dayjs;
}

export function Header({
  isUploading,
  onFileChange,
  onMonthChange,
  selectedMonth,
}: IHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Title row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Personal Finance
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ledger
          </h1>
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
            size="sm"
            variant="outline"
            className="hover:cursor-pointer gap-2 font-medium text-xs tracking-wide uppercase border-border/80 hover:bg-muted/60 transition-all"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            <span>{isUploading ? "Processing…" : "Upload Statement"}</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      <MonthNavigator
        onChange={(month) =>
          onMonthChange(month.date(1).format(Constants.UI.DATE_FORMAT))
        }
        selectedMonth={selectedMonth}
      />
    </div>
  );
}

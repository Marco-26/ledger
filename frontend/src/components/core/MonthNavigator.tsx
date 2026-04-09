import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dayjs } from "dayjs";

interface MonthNavigatorProps {
  onChange: (month: Dayjs) => void;
  minMonth?: Dayjs;
  maxMonth?: Dayjs;
  selectedMonth: Dayjs;
}

export function MonthNavigator({
  onChange,
  minMonth,
  maxMonth,
  selectedMonth,
}: MonthNavigatorProps) {
  const canGoPrevious =
    !minMonth ||
    !selectedMonth.subtract(1, "month").isBefore(minMonth, "month");

  const canGoNext =
    !maxMonth || !selectedMonth.add(1, "month").isAfter(maxMonth, "month");

  const handlePrevious = () => {
    if (!canGoPrevious) return;
    onChange(selectedMonth.subtract(1, "month"));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    onChange(selectedMonth.add(1, "month"));
  };

  return (
    <div className="flex items-center gap-0 w-full rounded-lg border border-border bg-muted/40 overflow-hidden">
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        aria-label="Previous month"
        className="flex h-9 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      <div className="h-9 w-px bg-border shrink-0" />

      <span className="font-numeric flex-1 text-center text-sm font-medium px-3 tabular-nums">
        {selectedMonth.format("MMMM YYYY")}
      </span>

      <div className="h-9 w-px bg-border shrink-0" />

      <button
        onClick={handleNext}
        disabled={!canGoNext}
        aria-label="Next month"
        className="flex h-9 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

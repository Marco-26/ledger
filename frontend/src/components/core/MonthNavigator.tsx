import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="flex items-center gap-1 rounded-lg bg-muted px-1 py-0.5 justify-between">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        aria-label="Previous month"
        className="hover:cursor-pointer"
      >
        <ChevronLeft />
      </Button>

      <span className="min-w-[130px] text-center text-base font-semibold tabular-nums">
        {selectedMonth.format("MMMM YYYY")}
      </span>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleNext}
        disabled={!canGoNext}
        aria-label="Next month"
        className="hover:cursor-pointer"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Constants } from "@/utils/Constants";
import { useState } from "react";

interface MonthNavigatorProps {
  onChange: (month: Date) => void;
  minMonth?: Date;
  maxMonth?: Date;
}

export function MonthNavigator({
  onChange,
  minMonth,
  maxMonth,
}: MonthNavigatorProps) {
  const [monthSelected, setMonthSelected] = useState(new Date());

  const canGoPrevious =
    !minMonth ||
    new Date(monthSelected.getFullYear(), monthSelected.getMonth() - 1) >=
      new Date(minMonth.getFullYear(), minMonth.getMonth());

  const canGoNext =
    !maxMonth ||
    new Date(monthSelected.getFullYear(), monthSelected.getMonth() + 1) <=
      new Date(maxMonth.getFullYear(), maxMonth.getMonth());

  const handlePrevious = () => {
    if (!canGoPrevious) return;
    const newMonth = new Date(
      monthSelected.getFullYear(),
      monthSelected.getMonth() - 1,
    );
    setMonthSelected(newMonth);
    onChange(newMonth);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    const newMonth = new Date(
      monthSelected.getFullYear(),
      monthSelected.getMonth() + 1,
    );
    setMonthSelected(newMonth);
    onChange(newMonth);
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
        {Constants.UI.MONTHS[monthSelected.getMonth()]}{" "}
        {monthSelected.getFullYear()}
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

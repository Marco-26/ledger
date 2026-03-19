import { cn, formatCurrency } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SummaryCardProps {
  title: string;
  value: number | undefined;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
  valuePositive?: boolean;
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  valueColor,
  valuePositive,
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", iconColor)} />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold",
            valueColor ??
              (valuePositive !== undefined && valuePositive
                ? "text-primary"
                : "text-rose-600"),
          )}
        >
          {formatCurrency(value)}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;

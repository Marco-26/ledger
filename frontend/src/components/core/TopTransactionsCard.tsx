import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import type { ITransaction } from "@/data/StatementDtos";
import type { ReactElement } from "react";

interface ITopTransactionsCardProps {
  data?: ITransaction[];
  title: string;
  description: string;
  icon: ReactElement;
}

export function TopTransactionsCard({
  data,
  title,
  description,
  icon,
}: ITopTransactionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {/* <TrendingUp className="h-5 w-5 text-emerald-500" /> */}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors"
            >
              <div className="grid gap-1">
                <p
                  className="text-sm font-medium leading-none "
                  title={item.description}
                >
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <div className="font-bold text-emerald-600">
                +{formatCurrency(item.credit || 0)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No income records found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

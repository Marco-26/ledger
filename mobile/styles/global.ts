import { Colors } from "./tokens";
import { TransactionType } from "@/utils/sharedTypes";

export const ICON_COLOR_MAPPER: Record<TransactionType, string> = {
  income:  Colors.income,
  expense: Colors.expense,
  neutral: Colors.brand,
};

import type { Ionicons } from "@expo/vector-icons";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

/** Category keys as returned by the API (see backend/constants.py). */
export const INCOME_CATEGORY_KEYS = ["salary", "other_income"] as const;

export const EXPENSE_CATEGORY_KEYS = [
  "groceries",
  "restaurants",
  "transportation",
  "utilities",
  "entertainment",
  "healthcare",
  "shopping",
  "rent",
  "other",
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  salary: "Salary",
  other_income: "Other income",
  groceries: "Groceries",
  restaurants: "Restaurants",
  transportation: "Transport",
  utilities: "Utilities",
  entertainment: "Entertainment",
  healthcare: "Healthcare",
  shopping: "Shopping",
  rent: "Rent",
  other: "Other",
};

export const CATEGORY_ICONS: Record<string, IconName> = {
  salary: "briefcase-outline",
  other_income: "pricetag-outline",
  groceries: "cart-outline",
  restaurants: "restaurant-outline",
  transportation: "car-outline",
  utilities: "flash-outline",
  entertainment: "film-outline",
  healthcare: "medkit-outline",
  shopping: "bag-handle-outline",
  rent: "home-outline",
  other: "ellipsis-horizontal-circle-outline",
};

const FALLBACK_ICON: IconName = "ellipse-outline";

export function categoryLabel(key?: string | null): string {
  if (!key) return "Uncategorised";
  return CATEGORY_LABELS[key];
}

export function categoryIcon(key?: string | null): IconName {
  if (!key) return FALLBACK_ICON;
  return CATEGORY_ICONS[key] ?? FALLBACK_ICON;
}

export function formatCurrency(amount?: number): string {
  if (amount === undefined || amount === null) return "€0.00";
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

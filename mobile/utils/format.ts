import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

/** Single place to change how money reads across the app. */
export const LOCALE = "pt-PT";
export const CURRENCY = "EUR";

export function formatCurrency(amount?: number): string {
  const value =
    amount === undefined || amount === null || Number.isNaN(amount) ? 0 : amount;

  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}

export interface CurrencyParts {
  /** "+", "-" or "" */
  sign: string;
  /** Currency symbol on its own, so it can be set smaller than the digits. */
  symbol: string;
  /** Digits before the decimal separator, grouped. */
  integer: string;
  /** Decimal separator followed by the cents, e.g. ",00". */
  fraction: string;
  /** True when the locale puts the symbol before the digits. */
  symbolFirst: boolean;
}

const EMPTY_PARTS: CurrencyParts = {
  sign: "",
  symbol: "€",
  integer: "0",
  fraction: ",00",
  symbolFirst: false,
};

/**
 * Splits a formatted amount so a headline can set the digits large and the
 * symbol and cents quietly beside them. Always formats the magnitude: pass the
 * sign you want through `sign`.
 */
export function splitCurrency(amount?: number): CurrencyParts {
  if (amount === undefined || amount === null || Number.isNaN(amount)) {
    return EMPTY_PARTS;
  }

  const formatter = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  });

  const sign = amount < 0 ? "-" : "";

  if (typeof formatter.formatToParts !== "function") {
    return { ...EMPTY_PARTS, sign, integer: formatter.format(Math.abs(amount)) };
  }

  const parts = formatter.formatToParts(Math.abs(amount));

  let symbol = "€";
  let integer = "";
  let fraction = "";
  let seenDecimal = false;
  let symbolFirst = false;
  let seenDigit = false;

  for (const part of parts) {
    switch (part.type) {
      case "currency":
        symbol = part.value;
        if (!seenDigit) symbolFirst = true;
        break;
      case "integer":
      case "group":
        integer += part.value;
        seenDigit = true;
        break;
      case "decimal":
        seenDecimal = true;
        fraction += part.value;
        break;
      case "fraction":
        fraction += part.value;
        break;
      default:
        break;
    }
  }

  return {
    sign,
    symbol,
    integer: integer || "0",
    fraction: seenDecimal ? fraction : "",
    symbolFirst,
  };
}

/** Prefixes the amount with its direction: "+1 200,00 €" / "-84,20 €". */
export function formatSignedCurrency(amount: number, isIncome: boolean): string {
  return `${isIncome ? "+" : "-"}${formatCurrency(Math.abs(amount))}`;
}

export function formatPercent(value?: number, fractionDigits = 0): string {
  if (value === undefined || value === null || Number.isNaN(value)) return "0%";
  return `${value.toFixed(fractionDigits)}%`;
}

/** "+12,4%" / "-3,1%" / "0%" — used for month-over-month deltas. */
export function formatDelta(value?: number): string {
  const rate = value ?? 0;
  if (rate === 0) return "0%";
  return `${rate > 0 ? "+" : "−"}${Math.abs(rate).toFixed(1)}%`;
}

export function getGreeting(now: Dayjs = dayjs()): string {
  const hour = now.hour();
  if (hour < 12) return "Good morning";
  if (hour < 19) return "Good afternoon";
  return "Good evening";
}

/** "September 2025" */
export function formatMonthLabel(date: Dayjs): string {
  return date.format("MMMM YYYY");
}

/** "Sep 2025" — for narrow screens where the full month name does not fit. */
export function formatMonthShort(date: Dayjs): string {
  return date.format("MMM YYYY");
}

/** "Today" / "Yesterday" / "12 Sep" — for list group headers. */
export function formatDayLabel(date: Dayjs, now: Dayjs = dayjs()): string {
  if (date.isSame(now, "day")) return "Today";
  if (date.isSame(now.subtract(1, "day"), "day")) return "Yesterday";
  return date.isSame(now, "year")
    ? date.format("D MMM")
    : date.format("D MMM YYYY");
}

/** "12 Sep" — compact inline date for rows. */
export function formatShortDate(date: Dayjs): string {
  return date.format("D MMM");
}

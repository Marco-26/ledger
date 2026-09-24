// ─── Ledger Design Tokens ─────────────────────────────────────────────────────
// "Quiet Ledger": private-bank restraint. Paper-warm neutrals, hairline rules
// instead of heavy cards, oversized numerals as the hero, micro-caps labels with
// wide tracking, and a single warm brass accent used sparingly.
// Semantic colour appears only where money changes direction.

import type { TextStyle } from "react-native";

export type ColorScheme = "light" | "dark";

export interface ThemeColors {
  // ── Surfaces ──────────────────────────────────────────────────────────────
  background: string;
  surface: string;
  surfaceAlt: string;
  surfaceSunken: string;

  // ── Text ──────────────────────────────────────────────────────────────────
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // ── Lines ─────────────────────────────────────────────────────────────────
  border: string;
  borderStrong: string;

  // ── Semantic (money) ──────────────────────────────────────────────────────
  income: string;
  expense: string;
  incomeSoft: string;
  expenseSoft: string;

  // ── Accents ───────────────────────────────────────────────────────────────
  accent: string;
  accentSoft: string;
  brass: string;

  // ── Utility ───────────────────────────────────────────────────────────────
  skeleton: string;
  shadow: string;
}

export const LightColors: ThemeColors = {
  background: "#F6F5F2",
  surface: "#FFFFFF",
  surfaceAlt: "#EFEEE9",
  surfaceSunken: "#E7E5DF",

  textPrimary: "#14120F",
  textSecondary: "#6B675F",
  textTertiary: "#9B968C",
  textInverse: "#FBFAF8",

  border: "#E4E1D9",
  borderStrong: "#D2CEC3",

  income: "#0F6F58",
  expense: "#AF4A30",
  incomeSoft: "rgba(15,111,88,0.09)",
  expenseSoft: "rgba(175,74,48,0.09)",

  accent: "#14120F",
  accentSoft: "rgba(20,18,15,0.06)",
  brass: "#A6803C",

  skeleton: "#E7E5DF",
  shadow: "#14120F",
};

export const DarkColors: ThemeColors = {
  background: "#0A0B0C",
  surface: "#131416",
  surfaceAlt: "#1B1D20",
  surfaceSunken: "#0F1012",

  textPrimary: "#F3F1EC",
  textSecondary: "#A3A098",
  textTertiary: "#6E6B64",
  textInverse: "#14120F",

  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.16)",

  income: "#4FC9A2",
  expense: "#E98A6E",
  incomeSoft: "rgba(79,201,162,0.12)",
  expenseSoft: "rgba(233,138,110,0.12)",

  accent: "#F3F1EC",
  accentSoft: "rgba(255,255,255,0.08)",
  brass: "#C9A868",

  skeleton: "#1B1D20",
  shadow: "#000000",
};

export const Palettes: Record<ColorScheme, ThemeColors> = {
  light: LightColors,
  dark: DarkColors,
};

export const FontFamily = {
  sans: "Geist",
} as const;

export const FontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const satisfies Record<string, TextStyle["fontWeight"]>;

export const FontSize = {
  "2xs": 10,
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 22,
  "2xl": 26,
  "3xl": 32,
  "4xl": 40,
} as const;

export const Spacing = {
  0.5: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 26,
  full: 9999,
} as const;

export const Duration = {
  fast: 140,
  base: 220,
  slow: 420,
} as const;

/**
 * Financial rows stop being readable when they stretch across a tablet, so the
 * content keeps a phone-like measure and centres itself on wide screens.
 */
export const MAX_CONTENT_WIDTH = 560;

/** Minimum comfortable touch target (iOS HIG / Material). */
export const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;
export const TOUCH_TARGET = 44;

// ─── Type presets ─────────────────────────────────────────────────────────────
// Colour is deliberately omitted: it always comes from the active theme.
// Numerals use tabular figures so columns of money line up.

const numeric: TextStyle = { fontVariant: ["tabular-nums"] };

export const Type = {
  /** The one number that owns the screen. */
  hero: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize["4xl"],
    fontWeight: FontWeight.bold,
    letterSpacing: -1.6,
    lineHeight: 46,
    ...numeric,
  },
  /** Secondary financial figures (income / expense split). */
  figure: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.6,
    lineHeight: 28,
    ...numeric,
  },
  /** Amounts inside lists. */
  amount: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.2,
    ...numeric,
  },
  greeting: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.semibold,
    letterSpacing: -0.7,
    lineHeight: 32,
  },
  /** Micro-caps section label with wide tracking. */
  section: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  /** Primary row text (a transaction description). */
  body: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    letterSpacing: -0.1,
  },
  /** Labels under figures. */
  label: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  /** Dates, categories, counts. */
  meta: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    letterSpacing: 0.1,
  },
  metaSmall: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.2,
  },
  tab: {
    fontFamily: FontFamily.sans,
    fontSize: FontSize["2xs"],
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.6,
  },
} as const satisfies Record<string, TextStyle>;

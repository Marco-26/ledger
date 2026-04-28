export const Colors = {
  // Surfaces
  background: "#0E1117",     // oklch(0.14 0.015 255)
  card: "#141A24",           // oklch(0.18 0.018 255)
  muted: "#1A2133",          // oklch(0.22 0.02 255)

  // Text
  foreground: "#EDE9E0",     // oklch(0.93 0.008 80) — warm off-white
  mutedForeground: "#6B7A99",// oklch(0.58 0.015 255)

  // Borders
  border: "rgba(255,255,255,0.09)",

  // Accent — income (mint green) / expense (coral)
  income: "#4ADE80",         // oklch(0.72 0.16 155) — bright mint
  expense: "#F87171",        // oklch(0.72 0.18 25)  — warm coral
  incomeMuted: "rgba(74,222,128,0.12)",
  expenseMuted: "rgba(248,113,113,0.12)",
} as const;

export const FontFamily = {
  sans: "Geist",
  display: "Playfair Display",
  mono: "Geist",
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 38,
} as const;

export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
} as const;

// ─── Obsidian Ledger Design Tokens ────────────────────────────────────────────
// Premium dark financial aesthetic.
// Deep obsidian surfaces · warm off-white text · gold brand accent
// Mint green for income · coral for expenses · sharp and architectural.

export const Colors = {
  // ── Surfaces ──────────────────────────────────────────────────────────────
  background:      "#080B10",
  card:            "#0D1219",
  cardElevated:    "#121A24",
  muted:           "#161D28",
  overlay:         "#1C2535",

  // ── Text ──────────────────────────────────────────────────────────────────
  foreground:      "#F0EAE0",
  foregroundMid:   "#BDB5A8",
  mutedForeground: "#566070",

  // ── Brand (warm gold) ────────────────────────────────────────────────────
  brand:        "#C8A96E",
  brandMuted:   "rgba(200,169,110,0.12)",
  brandBright:  "#E2C98A",

  // ── Semantic ──────────────────────────────────────────────────────────────
  income:       "#3DD68C",
  expense:      "#F06B6B",
  incomeMuted:  "rgba(61,214,140,0.10)",
  expenseMuted: "rgba(240,107,107,0.10)",
  incomeGlow:   "rgba(61,214,140,0.18)",
  expenseGlow:  "rgba(240,107,107,0.18)",

  // ── Borders ───────────────────────────────────────────────────────────────
  border:       "rgba(255,255,255,0.07)",
  borderMid:    "rgba(255,255,255,0.11)",
  borderStrong: "rgba(255,255,255,0.18)",
} as const;

export const FontFamily = {
  display: "Playfair Display",
  sans:    "Geist",
  mono:    "Geist",
} as const;

export const FontSize = {
  "2xs":  9,
  xs:    11,
  sm:    13,
  base:  15,
  lg:    17,
  xl:    20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 38,
  "5xl": 50,
} as const;

export const Spacing = {
  0.5:  2,
  1:    4,
  2:    8,
  3:   12,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  10:  40,
  12:  48,
} as const;

export const Radius = {
  xs:    4,
  sm:    8,
  md:   12,
  lg:   16,
  xl:   20,
  "2xl": 26,
  full: 9999,
} as const;

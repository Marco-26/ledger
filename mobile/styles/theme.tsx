import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { Palettes, type ColorScheme, type ThemeColors } from "./tokens";

interface Theme {
  scheme: ColorScheme;
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<Theme>({
  scheme: "light",
  colors: Palettes.light,
  isDark: false,
});

interface ThemeProviderProps {
  children: ReactNode;
  /** Pin the palette instead of following the OS setting. */
  scheme?: ColorScheme;
}

export function ThemeProvider({ children, scheme }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const active: ColorScheme = scheme ?? (systemScheme === "dark" ? "dark" : "light");

  const value = useMemo<Theme>(
    () => ({
      scheme: active,
      colors: Palettes[active],
      isDark: active === "dark",
    }),
    [active],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

/**
 * Builds a stylesheet from the active palette and rebuilds it only when the
 * palette changes, so light/dark swaps cost one recompute per screen.
 */
export function useThemedStyles<T>(factory: (colors: ThemeColors) => T): T {
  const { colors, scheme } = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(colors), [scheme]);
}

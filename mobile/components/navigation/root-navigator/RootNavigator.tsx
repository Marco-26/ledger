import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/styles/theme";

/**
 * Lives below the theme provider so the stack background and the status bar
 * follow the active palette.
 */
export default function RootNavigator() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </>
  );
}

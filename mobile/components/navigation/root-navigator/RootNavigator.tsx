import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTheme } from "@/styles/theme";

/**
 * Lives below the theme provider so the stack background and the status bar
 * follow the active palette, and below the auth provider so it can guard the
 * screens on the session.
 */
export default function RootNavigator() {
  const { colors, isDark } = useTheme();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="Login" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

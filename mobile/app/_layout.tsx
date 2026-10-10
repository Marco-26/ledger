import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import RootNavigator from "@/components/navigation/root-navigator/RootNavigator";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "@/styles/theme";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Geist: require("../assets/fonts/Geist.ttf"),
  });

  // The splash stays up until RootNavigator has also resolved the session.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </ThemeProvider>
        <Toast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

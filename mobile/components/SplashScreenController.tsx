import { useAuthContext } from "@/hooks/useAuthContext";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { claims, isLoading } = useAuthContext();

  // `claims` stays undefined until the stored session has been read (null means
  // signed out). Waiting for it avoids flashing the Login screen on launch.
  if (!isLoading && claims !== undefined) {
    SplashScreen.hideAsync();
  }

  return null;
}

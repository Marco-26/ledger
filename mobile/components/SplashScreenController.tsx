import { useAuthClaims, useAuthIsLoading } from "@/stores/authStore";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const claims = useAuthClaims();
  const isLoading = useAuthIsLoading();

  // `claims` stays undefined until the stored session has been read (null means
  // signed out). Waiting for it avoids flashing the Login screen on launch.
  if (!isLoading && claims !== undefined) {
    SplashScreen.hideAsync();
  }

  return null;
}

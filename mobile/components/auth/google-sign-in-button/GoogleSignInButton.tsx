import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import Toast from "react-native-toast-message";
import { expo } from "@/app.json";
import { supabase } from "@/lib/supabase";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { createStyles } from "./GoogleSignInButton.styles";

WebBrowser.maybeCompleteAuthSession();

const REDIRECT_URL = `${expo.scheme}://google-auth`;
const GOOGLE_LOGO_URL = "https://developers.google.com/identity/images/g-logo.png";

function extractParamsFromUrl(url: string) {
  const parsedUrl = new URL(url);
  const hash = parsedUrl.hash.substring(1); // Remove the leading '#'
  const params = new URLSearchParams(hash);

  return {
    access_token: params.get("access_token"),
    refresh_token: params.get("refresh_token"),
  };
}

function showSignInError() {
  Toast.show({
    type: "error",
    text1: "Couldn't sign in with Google",
    text2: "Please try again.",
  });
}

export default function GoogleSignInButton() {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: REDIRECT_URL,
        queryParams: { prompt: "consent" },
        skipBrowserRedirect: true,
      },
    });

    if (error || !data.url) {
      console.error("Google sign-in: no OAuth URL", error);
      showSignInError();
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(data.url, REDIRECT_URL, {
      showInRecents: true,
    });

    // Closing the browser sheet is a normal outcome, not a failure.
    if (result.type !== "success") return;

    const { access_token, refresh_token } = extractParamsFromUrl(result.url);
    if (!access_token || !refresh_token) {
      console.error("Google sign-in: tokens missing from redirect");
      showSignInError();
      return;
    }

    // On success the auth guard swaps to the tabs and unmounts this screen.
    const { error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (sessionError) {
      console.error("Google sign-in: setSession failed", sessionError);
      showSignInError();
    }
  }

  async function onPress() {
    setIsLoading(true);
    try {
      await signIn();
    } catch (error) {
      console.error("Google sign-in failed", error);
      showSignInError();
    } finally {
      setIsLoading(false);
    }
  }

  // Warm up the browser so the sign-in sheet opens without a delay.
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      accessibilityState={{ disabled: isLoading, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.textInverse} />
      ) : (
        <>
          <View style={styles.logoDisc}>
            <Image source={{ uri: GOOGLE_LOGO_URL }} style={styles.logo} />
          </View>
          <Text style={styles.label}>Continue with Google</Text>
        </>
      )}
    </Pressable>
  );
}

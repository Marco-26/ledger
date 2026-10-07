import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import GoogleSignInButton from "@/components/auth/google-sign-in-button/GoogleSignInButton";
import LedgerSpecimen from "@/components/auth/ledger-specimen/LedgerLoginExample";
import { useThemedStyles } from "@/styles/theme";
import { Duration } from "@/styles/tokens";
import { createStyles } from "@/styles/screens/LoginScreen.styles";

// The copy arrives after the specimen rows have settled.
const COPY_DELAY = Duration.slow + Duration.base;

export default function LoginScreen() {
  const styles = useThemedStyles(createStyles);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.screen}>
      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(Duration.slow)} style={styles.masthead}>
          <View style={styles.brassDot} />
          <Text style={styles.wordmark} accessibilityRole="header">
            Ledger
          </Text>
        </Animated.View>

        <View style={styles.specimen}>
          <LedgerSpecimen />
        </View>

        <Animated.View entering={FadeInDown.delay(COPY_DELAY).duration(Duration.slow)}>
          <Text style={styles.headline}>
            Upload once.{"\n"}
            <Text style={styles.headlineMuted}>See it all.</Text>
          </Text>
          <View style={styles.brassRule} />
          <Text style={styles.body}>
            Drop in a statement PDF. Ledger reads every line, totals the month and
            sorts each movement for you — no typing it all in.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(COPY_DELAY + Duration.base).duration(Duration.slow)}
          style={styles.actions}
        >
          <GoogleSignInButton />
          <Text style={styles.footnote}>No bank connection. Just the statements you upload.</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

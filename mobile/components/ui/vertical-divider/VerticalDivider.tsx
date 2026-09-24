import { StyleSheet, View } from "react-native";
import { useTheme } from "@/styles/theme";
import { Spacing } from "@/styles/tokens";

/** Hairline that splits two figures standing side by side. */
export default function VerticalDivider() {
  const { colors } = useTheme();
  return <View style={[styles.rule, { backgroundColor: colors.border }]} />;
}

const styles = StyleSheet.create({
  rule: {
    width: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    marginVertical: Spacing[1],
  },
});

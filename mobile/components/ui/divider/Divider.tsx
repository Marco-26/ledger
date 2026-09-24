import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "@/styles/theme";

interface DividerProps {
  /** Pull the rule in from both ends so it reads as a light separator. */
  inset?: number;
  style?: ViewStyle;
}

export default function Divider({ inset = 0, style }: DividerProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.rule,
        { backgroundColor: colors.border, marginHorizontal: inset },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  rule: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});

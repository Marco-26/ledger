import { StyleSheet } from "react-native";
import {
  FontWeight,
  Radius,
  Spacing,
  Type,
  TOUCH_TARGET,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      minHeight: TOUCH_TARGET + Spacing[3],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing[3],
      paddingHorizontal: Spacing[5],
      borderRadius: Radius.full,
      backgroundColor: colors.accent,
    },
    buttonPressed: {
      opacity: 0.88,
      transform: [{ scale: 0.985 }],
    },
    logoDisc: {
      width: 26,
      height: 26,
      borderRadius: Radius.full,
      alignItems: "center",
      justifyContent: "center",
      // Google's mark must sit on white in both themes.
      backgroundColor: "#FFFFFF",
    },
    logo: {
      width: 16,
      height: 16,
    },
    label: {
      ...Type.body,
      fontWeight: FontWeight.semibold,
      color: colors.textInverse,
    },
  });

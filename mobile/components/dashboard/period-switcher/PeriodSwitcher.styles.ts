import { StyleSheet } from "react-native";
import { Spacing, type ThemeColors } from "@/styles/tokens";

const TOGGLE_WIDTH = 132;

export const createStyles = (_colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[2],
    },
    toggle: {
      width: TOGGLE_WIDTH,
    },
    stepper: {
      flex: 1,
      alignSelf: "stretch",
    },
  });

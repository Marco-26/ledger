import { StyleSheet } from "react-native";
import {
  Radius,
  Spacing,
  Type,
  TOUCH_TARGET,
  type ThemeColors,
} from "@/styles/tokens";

const MENU_WIDTH = 220;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    dismissArea: {
      flex: 1,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.shadow,
    },
    card: {
      position: "absolute",
      width: MENU_WIDTH,
      backgroundColor: colors.surface,
      borderRadius: Radius.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderStrong,
      // The menu grows out of the "⋯" it hangs from.
      transformOrigin: "top right",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.14,
      shadowRadius: 28,
      elevation: 10,
    },
    action: {
      minHeight: TOUCH_TARGET + Spacing[1],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing[4],
      margin: Spacing[1],
      borderRadius: Radius.md,
    },
    actionPressed: {
      backgroundColor: colors.expenseSoft,
    },
    actionLabel: {
      ...Type.body,
      color: colors.expense,
    },
  });

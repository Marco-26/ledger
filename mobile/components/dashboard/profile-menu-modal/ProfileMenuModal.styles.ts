import { StyleSheet } from "react-native";
import {
  FontWeight,
  Radius,
  Spacing,
  Type,
  TOUCH_TARGET,
  type ThemeColors,
} from "@/styles/tokens";

const MENU_WIDTH = 256;

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
      // The menu grows out of the avatar it hangs from.
      transformOrigin: "top right",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.14,
      shadowRadius: 28,
      elevation: 10,
    },
    identity: {
      paddingHorizontal: Spacing[4],
      paddingTop: Spacing[4],
      paddingBottom: Spacing[3],
      gap: Spacing[1],
    },
    name: {
      ...Type.body,
      fontWeight: FontWeight.semibold,
      color: colors.textPrimary,
    },
    email: {
      ...Type.meta,
      color: colors.textSecondary,
    },
    rule: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginHorizontal: Spacing[4],
    },
    action: {
      minHeight: TOUCH_TARGET + Spacing[1],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing[4],
      marginVertical: Spacing[1],
      marginHorizontal: Spacing[1],
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

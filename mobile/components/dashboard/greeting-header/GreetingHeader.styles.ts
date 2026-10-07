import { StyleSheet } from "react-native";
import {
  FontWeight,
  Radius,
  Spacing,
  Type,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing[4],
      paddingTop: Spacing[3],
      paddingBottom: Spacing[7],
    },
    text: {
      flex: 1,
      gap: Spacing[0.5],
    },
    salutation: {
      ...Type.label,
      color: colors.textSecondary,
    },
    name: {
      ...Type.greeting,
      color: colors.textPrimary,
    },
    monogram: {
      width: 42,
      height: 42,
      borderRadius: Radius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderStrong,
      overflow: "hidden",
    },
    // Brass ring while the account menu hangs from the avatar.
    monogramActive: {
      borderWidth: 1.5,
      borderColor: colors.brass,
    },
    monogramPressed: {
      opacity: 0.8,
    },
    initials: {
      ...Type.label,
      fontWeight: FontWeight.semibold,
      letterSpacing: 0.6,
      color: colors.textSecondary,
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
  });

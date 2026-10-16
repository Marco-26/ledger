import { StyleSheet } from "react-native";
import {
  FontWeight,
  MAX_CONTENT_WIDTH,
  Radius,
  Spacing,
  Type,
  TOUCH_TARGET,
  type ThemeColors,
} from "@/styles/tokens";

const HOLD_BUTTON_HEIGHT = TOUCH_TARGET + Spacing[3];

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "flex-end",
    },
    dismissArea: {
      flex: 1,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.shadow,
    },
    sheet: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      backgroundColor: colors.surface,
      borderTopLeftRadius: Radius["2xl"],
      borderTopRightRadius: Radius["2xl"],
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: colors.borderStrong,
      paddingHorizontal: Spacing[5],
      paddingTop: Spacing[3],
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: -8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 16,
    },
    grabber: {
      alignSelf: "center",
      width: 36,
      height: 4,
      borderRadius: Radius.full,
      backgroundColor: colors.borderStrong,
      marginBottom: Spacing[5],
    },

    // ── Heading ───────────────────────────────────────────────────────────────
    eyebrow: {
      ...Type.section,
      color: colors.expense,
      marginBottom: Spacing[2],
    },
    title: {
      ...Type.greeting,
      color: colors.textPrimary,
    },
    message: {
      ...Type.meta,
      color: colors.textSecondary,
      lineHeight: 19,
      marginTop: Spacing[2],
    },

    // ── Void slip: what is about to go ────────────────────────────────────────
    slip: {
      marginTop: Spacing[5],
      paddingVertical: Spacing[1],
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderStyle: "dashed",
    },
    slipRow: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      paddingVertical: Spacing[2],
    },
    slipLabel: {
      ...Type.meta,
      color: colors.textSecondary,
    },
    slipValue: {
      ...Type.amount,
      color: colors.textPrimary,
      textDecorationLine: "line-through",
      textDecorationColor: colors.expense,
    },

    // ── Actions ───────────────────────────────────────────────────────────────
    actions: {
      marginTop: Spacing[6],
      gap: Spacing[2],
    },
    holdButton: {
      height: HOLD_BUTTON_HEIGHT,
      borderRadius: Radius.md,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.expenseSoft,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.expense,
    },
    // Ink spreads from the left edge, like a pen striking the entry out. The
    // fill clips an inverse copy of the label so the text stays legible as the
    // colour passes underneath it.
    holdFill: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      overflow: "hidden",
      backgroundColor: colors.expense,
    },
    holdFillContent: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    holdContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[2],
    },
    holdLabel: {
      ...Type.body,
      fontWeight: FontWeight.semibold,
    },
    cancelButton: {
      height: TOUCH_TARGET,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Radius.md,
    },
    cancelPressed: {
      backgroundColor: colors.accentSoft,
    },
    cancelLabel: {
      ...Type.body,
      color: colors.textSecondary,
    },
  });

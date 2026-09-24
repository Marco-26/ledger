import { Text, View } from "react-native";
import type { ReactNode } from "react";
import { useThemedStyles } from "@/styles/theme";
import { createStyles } from "./SectionHeading.styles";

interface SectionHeadingProps {
  title: string;
  /** Optional control aligned to the right of the rule, e.g. a month stepper. */
  accessory?: ReactNode;
}

export default function SectionHeading({
  title,
  accessory,
}: SectionHeadingProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
        {title}
      </Text>
      {accessory}
    </View>
  );
}

import { Text, TouchableOpacity } from "react-native";
import { useThemedStyles } from "@/styles/theme";
import { createStyles } from "./FilterChip.styles";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

/** A single category in the transactions filter row. */
export default function FilterChip({
  label,
  isActive,
  onPress,
}: FilterChipProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
    >
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

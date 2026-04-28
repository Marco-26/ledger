import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./MonthNavigatorStyles";
import { Colors } from "@/styles/tokens";
import { MONTHS } from "@/utils/constants";

interface MonthNavigatorProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}

export default function MonthNavigator({ year, month, onChange }: MonthNavigatorProps) {
  const handlePrev = () => {
    if (month === 0) {
      onChange(year - 1, 11);
    } else {
      onChange(year, month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      onChange(year + 1, 0);
    } else {
      onChange(year, month + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chevronBtn}
        onPress={handlePrev}
        activeOpacity={0.6}
      >
        <Ionicons name="chevron-back" size={14} color={Colors.mutedForeground} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.label}>
        {MONTHS[month]} {year}
      </Text>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.chevronBtn}
        onPress={handleNext}
        activeOpacity={0.6}
      >
        <Ionicons name="chevron-forward" size={14} color={Colors.mutedForeground} />
      </TouchableOpacity>
    </View>
  );
}

import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./MonthNavigatorStyles";
import { Colors } from "@/styles/tokens";
import { Constants } from "@/utils/constants";
import { Dayjs } from "dayjs";

interface MonthNavigatorProps {
  selectedDate: Dayjs;
  onChange: (newDate: Dayjs) => void;
}

export default function MonthNavigator({
  selectedDate,
  onChange,
}: MonthNavigatorProps) {
  const handlePrev = () => {
    if (!selectedDate) return;
    onChange(selectedDate.subtract(1, "month"));
  };

  const handleNext = () => {
    if (!selectedDate) return;
    onChange(selectedDate.add(1, "month"));
  };

  const month = selectedDate.month();
  const year = selectedDate.year();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chevronBtn}
        onPress={handlePrev}
        activeOpacity={0.6}
      >
        <Ionicons
          name="chevron-back"
          size={14}
          color={Colors.mutedForeground}
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.label}>
        {Constants.UI.MONTHS[month]} {year}
      </Text>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.chevronBtn}
        onPress={handleNext}
        activeOpacity={0.6}
      >
        <Ionicons
          name="chevron-forward"
          size={14}
          color={Colors.mutedForeground}
        />
      </TouchableOpacity>
    </View>
  );
}

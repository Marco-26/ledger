import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthNavigator from "@/components/month-navigator/MonthNavigator";
import { styles } from "./HeaderStyles";
import { Typography } from "@/styles/global";
import { Dayjs } from "dayjs";

interface HeaderProps {
  selectedDate: Dayjs;
  onDateChange: (newDate: Dayjs) => void;
}

export default function Header({ selectedDate, onDateChange }: HeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <Text style={Typography.label}>Personal Finance</Text>
          <Text style={styles.title}>Ledger</Text>
        </View>

        <View style={styles.divider} />

        <MonthNavigator selectedDate={selectedDate} onChange={onDateChange} />
      </View>
    </SafeAreaView>
  );
}

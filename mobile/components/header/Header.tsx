import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthNavigator from "@/components/month-navigator/MonthNavigator";
import { styles } from "./HeaderStyles";
import { Typography } from "@/styles/global";

interface HeaderProps {
  year: number;
  month: number;
  onMonthChange: (year: number, month: number) => void;
}

export default function Header({ year, month, onMonthChange }: HeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <Text style={Typography.label}>Personal Finance</Text>
          <Text style={styles.title}>Ledger</Text>
        </View>

        <View style={styles.divider} />

        <MonthNavigator year={year} month={month} onChange={onMonthChange} />
      </View>
    </SafeAreaView>
  );
}

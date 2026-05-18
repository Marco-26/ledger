import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthNavigator from "@/components/month-navigator/MonthNavigator";
import { styles } from "./Header.styles";
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
          <Text style={styles.eyebrow}>Personal Finance</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>
              Ledger<Text style={styles.titleAccent}>.</Text>
            </Text>
            <View style={styles.brandDot} />
          </View>
        </View>

        <View style={styles.divider} />

        <MonthNavigator selectedDate={selectedDate} onChange={onDateChange} />
      </View>
    </SafeAreaView>
  );
}
